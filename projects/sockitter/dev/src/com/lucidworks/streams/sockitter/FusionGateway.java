package com.lucidworks.streams.sockitter;

import com.google.gson.*;
import org.apache.http.HttpResponse;
import org.apache.http.client.HttpClient;
import org.apache.http.client.methods.HttpGet;
import org.apache.http.client.methods.HttpPut;
import org.apache.http.entity.ContentType;
import org.apache.http.entity.StringEntity;
import org.apache.http.impl.client.HttpClientBuilder;
import twitter4j.ResponseList;
import twitter4j.Twitter;
import twitter4j.TwitterException;
import twitter4j.TwitterFactory;
import twitter4j.User;
import twitter4j.conf.ConfigurationBuilder;

import javax.servlet.ServletException;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.io.InputStream;
import java.io.PrintWriter;
import java.util.*;

/**
 * Fusion's twitter stream data source is configured with Twitter `id`s.  This servlet provides endpoints
 * to add Twitter accounts to follow by screen name rather than `id`.
 * <p>
 * This service encapsulates the Fusion connector API along with use of the 3rd party Twitter4j API to look up `id`s
 * by screen names, de-duplicating the list.
 * <p>
 * Examples:
 * lookupUsersByIDs: http://localhost:8780/sockitter-editor/lookupUsersByIDs?id=1138371924
 * lookupUsersByScreenNames: http://localhost:8780/sockitter-editor/lookupUsersByScreenNames?screen_name=erikhatcher
 * add: http://localhost:8780/sockitter-editor/add?ds_name=tweets&screen_name=erikhatcher
 */
public class FusionGateway extends HttpServlet {
  static {
    // without this, NoClassDefFound error (due to slf4j not on classpath?)
    System.setProperty("twitter4j.loggerFactory", "twitter4j.NullLoggerFactory");
  }

  @Override
  protected void service(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {

    response.setContentType("application/json");
    String method = request.getMethod();

    Map data = new HashMap();
    data.put("uri", request.getRequestURI());
    data.put("context_path", request.getContextPath());
    data.put("servlet_path", request.getServletPath());
    data.put("method", method);

    int endpoint_pos = request.getContextPath().length() + request.getServletPath().length();
    String endpoint = request.getRequestURI().substring(endpoint_pos);
    data.put("endpoint", endpoint);


    switch (endpoint) {
      case "/config":
        if (!"POST".equals(method)) {
          throw new ServletException("Method " + method + " not supoorted at this endpoint.  Must use POST");
        }

        String ds_name = request.getParameter("ds_name");
        if (ds_name == null) {
          throw new ServletException("ds_name must be provided");
        }

        JsonObject ds = loadDatasource(ds_name);

        // TODO:
        //   - update JSON blob with creds    (or application scope?)
        //   - update datasource with creds
        //   - update index pipeline with google vision key
        break;

      case "/follow":
        ds_name = request.getParameter("ds_name");
        if (ds_name == null) {
          throw new ServletException("ds_name must be provided");
        }

        if ("POST".equals(method)) {
          String[] screen_names = request.getParameterValues("screen_name");
          updateScreenNames(ds_name, screen_names, false);
          data.put("screen_names", screen_names);
        } else {
          ds = loadDatasource(ds_name);
          JsonObject properties = ds.getAsJsonObject("properties");
          JsonArray filter_follow = properties.getAsJsonArray("filter_follow");

          long[] ids = new long[filter_follow.size()];
          for (int i = 0; i < filter_follow.size(); i++) {
            ids[i] = Long.parseLong(filter_follow.get(i).getAsString());
          }

          if (ids.length > 0) {
            ResponseList<User> users = lookupUsersByIDs(ids);
            data.put("response", users);

            String[] screen_names = new String[users.size()];
            for (int i = 0; i < users.size(); i++) {
              screen_names[i] = users.get(i).getScreenName();
            }
            data.put("screen_names", screen_names);
          } else {
            data.put("message", "No ids being followed");
          }
        }
        break;

      case "/lookupUsersByScreenNames":
        String[] screen_names = request.getParameterValues("screen_name");
        data.put("response", lookupUsersByScreenNames(screen_names));
        break;

      case "/lookupUsersByIDs":
        String[] str_ids = request.getParameterValues("id");
        long[] ids = new long[str_ids.length];
        for (int i = 0; i < str_ids.length; i++) {
          ids[i] = Long.parseLong(str_ids[i]);
        }
        data.put("response", lookupUsersByIDs(ids));
        break;

      default:
        data.put("error", "Path " + endpoint + " not supported");
        break;
    }

    PrintWriter out = response.getWriter();
    Gson gson = new GsonBuilder().create();
    gson.toJson(data, out);
  }

  private static void updateScreenNames(String ds_name, String[] screen_names, boolean append) throws IOException {
    ResponseList<User> users = lookupUsersByScreenNames(screen_names);
    JsonObject ds = loadDatasource(ds_name);

    JsonObject properties = ds.getAsJsonObject("properties");
    JsonArray filter_follow = properties.getAsJsonArray("filter_follow");

    // dedupe and replace the id list; probably cleaner ways to do this
    Set<String> following = new HashSet<String>();

    if (append) { // include existing ones
      for (JsonElement f : filter_follow) {
        following.add(f.getAsString());
      }
    }
    for (User user : users) {
      following.add("" + user.getId());
    }
    properties.remove("filter_follow");
    JsonArray ja = new JsonArray();
    for (String s : following) {
      ja.add(s);
    }
    properties.add("filter_follow", ja);

    // debug(ds);

    saveDatasource(ds_name, ds);
  }

  private static void saveDatasource(String name, JsonObject ds) throws IOException {
    HttpClient client = HttpClientBuilder.create().build();
    HttpPut request = new HttpPut("http://localhost:8984/connectors/v1/connectors/datasources/" + name);

    Gson gson = new GsonBuilder().create();
    StringEntity body = new StringEntity(gson.toJson(ds), ContentType.APPLICATION_JSON);
    request.setEntity(body);

    client.execute(request);
  }

  private static JsonObject loadDatasource(String name) throws IOException {
    HttpClient client = HttpClientBuilder.create().build();

    // TODO: don't hardcode this url?
    // http://localhost:8984/connectors/v1/connectors/datasources/tweets
    HttpGet request = new HttpGet("http://localhost:8984/connectors/v1/connectors/datasources/" + name);

    HttpResponse response = client.execute(request);
    InputStream content = response.getEntity().getContent();
    Scanner s = new Scanner(content).useDelimiter("\\A");
    String json = s.hasNext() ? s.next() : "";

    JsonParser parser = new JsonParser();

    return parser.parse(json).getAsJsonObject();
  }

  private static ResponseList<User> lookupUsersByScreenNames(String[] screen_names) throws IOException {
    Twitter twitter = getTwitter();

    try {
      return twitter.lookupUsers(screen_names);
    } catch (TwitterException e) {
      throw new IOException(e);
    }
  }

  private static ResponseList<User> lookupUsersByIDs(long[] ids) throws IOException {
    Twitter twitter = getTwitter();

    try {
      return twitter.lookupUsers(ids);
    } catch (TwitterException e) {
      throw new IOException(e);
    }
  }

  private static Twitter getTwitter() {
    ConfigurationBuilder cb = new ConfigurationBuilder();

    // TODO: have this info fed in after app launch by user
    cb.setDebugEnabled(true)
        .setOAuthConsumerKey("@app.tweets.consumer_key@")
        .setOAuthConsumerSecret("@app.tweets.consumer_secret@")
        .setOAuthAccessToken("@app.tweets.token@")
        .setOAuthAccessTokenSecret("@app.tweets.token_secret@");

    TwitterFactory tf = new TwitterFactory(cb.build());
    return tf.getInstance();
  }

  private static void debug(JsonObject o) {
    Gson gson = new GsonBuilder().setPrettyPrinting().create();
    System.out.println("\n\n========\n\n");
    gson.toJson(o, System.out);
  }

  public static void main(String[] args) {
//    try {
//      ResponseList<User> users = lookupUsersByScreenNames(new String[]{"stackgeek","erikhatcher"});
//
//      Gson gson = new GsonBuilder().setPrettyPrinting().create();
//      gson.toJson(users, System.out);
//
//      System.out.println("\n\n========\n\n");
//      for (User user : users) {
//        System.out.println(user.getScreenName() + " = " + user.getId());
//      }
//
//      JsonObject tweets = loadDatasource("tweets");
//
//      System.out.println("\n\n========\n\n");
//      gson.toJson(tweets, System.out);
//
//      JsonObject properties = tweets.getAsJsonObject("properties");
//      for (User user : users) {
//        properties.getAsJsonArray("filter_follow").add("" + user.getId());
//      }
//      System.out.println("\n\n========\n\n");
//      gson.toJson(tweets, System.out);
//
//      saveDatasource("tweets", tweets);
//    } catch (Exception e) {
//      e.printStackTrace();
//    }

    try {
      // 1138371924
      System.out.println(lookupUsersByIDs(new long[]{1138371924}));
      // addScreenNames("tweets", new String[]{"stackgeek","erikhatcher", "kordless"});
    } catch (IOException e) {
      e.printStackTrace();
    }
  }
}
