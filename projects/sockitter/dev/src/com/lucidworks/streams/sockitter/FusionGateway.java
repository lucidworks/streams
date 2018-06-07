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
 * lookupUsersByIDs: GET http://localhost:8780/sockitter-editor/api/lookupUsersByIDs?id=1138371924
 * lookupUsersByScreenNames: GET http://localhost:8780/sockitter-editor/api/lookupUsersByScreenNames?screen_name=erikhatcher
 * get followers: GET http://localhost:8780/sockitter-editor/api/follow?ds_name=tweets
 * add (append) followers: POST http://localhost:8780/sockitter-editor/api/add?ds_name=tweets&screen_name=stackgeek&screen_name=erikhatcher
 * update (replace) followers: POST http://localhost:8780/sockitter-editor/api/follow?ds_name=tweets&screen_name=stackgeek&screen_name=erikhatcher
 *
 */
public class FusionGateway extends HttpServlet {
  static {
    // without this, NoClassDefFound error (due to slf4j not on classpath?)
    System.setProperty("twitter4j.loggerFactory", "twitter4j.NullLoggerFactory");
  }

  public static int TWITTER_USER_BATCH_SIZE=99;

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
      case "/add":
        String ds_name = request.getParameter("ds_name");
        if (ds_name == null) {
          throw new ServletException("ds_name must be provided");
        }
        if (!"POST".equals(method)) {
          throw new ServletException("Can only /add with POST");
        }
        String[] screen_names = request.getParameterValues("screen_name");
        if (screen_names != null && screen_names.length > 0) {
          updateScreenNames(ds_name, screen_names, true);
        }
        data.put("screen_names", screen_names);
        break;

      case "/follow":
        ds_name = request.getParameter("ds_name");
        if (ds_name == null) {
          throw new ServletException("ds_name must be provided");
        }

        if ("POST".equals(method)) {
          screen_names = request.getParameterValues("screen_name");
          updateScreenNames(ds_name, screen_names, false);
          data.put("screen_names", screen_names);
        } else { // GET or otherwise
          JsonObject ds = loadDatasource(ds_name);
          JsonObject properties = ds.getAsJsonObject("properties");
          JsonArray filter_follow = properties.getAsJsonArray("filter_follow");

          long[] ids = new long[filter_follow.size()];
          for (int i = 0; i < filter_follow.size(); i++) {
            ids[i] = Long.parseLong(filter_follow.get(i).getAsString());
          }

          if (ids.length > 0) {
            ResponseList<User> users = lookupUsersByIDs(ids);
            data.put("response", users);

            screen_names = new String[users.size()];
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
        screen_names = request.getParameterValues("screen_name");
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

    ResponseList<User> users = null;

    try {
      int batches = (screen_names.length + TWITTER_USER_BATCH_SIZE - 1) / TWITTER_USER_BATCH_SIZE;

      for (int batch=0; batch < batches; batch++) {
        int from = batch*TWITTER_USER_BATCH_SIZE;
        String[] sn_batch = Arrays.copyOfRange(screen_names,from, Math.min(from+TWITTER_USER_BATCH_SIZE, screen_names.length));
        ResponseList<User> users_batch = twitter.lookupUsers(sn_batch);
        if (users == null) {
          users = users_batch;
        } else {
          users.addAll(users_batch);
        }
      }
    } catch (TwitterException e) {
      throw new IOException(e);
    }

    return users;
  }

  private static ResponseList<User> lookupUsersByIDs(long[] ids) throws IOException {
    Twitter twitter = getTwitter();

    ResponseList<User> users = null;

    try {
      int batches = (ids.length + TWITTER_USER_BATCH_SIZE - 1) / TWITTER_USER_BATCH_SIZE;

      for (int batch=0; batch < batches; batch++) {
        int from = batch*TWITTER_USER_BATCH_SIZE;
        long[] id_batch = Arrays.copyOfRange(ids,from, Math.min(from+TWITTER_USER_BATCH_SIZE, ids.length));
        ResponseList<User> users_batch = twitter.lookupUsers(id_batch);
        if (users == null) {
          users = users_batch;
        } else {
          users.addAll(users_batch);
        }
      }
    } catch (TwitterException e) {
      throw new IOException(e);
    }

    return users;
  }

  private static Twitter getTwitter() throws IOException {

    ConfigurationBuilder cb = new ConfigurationBuilder();

    // Fetch Twitter keys the sneaky stash of them in a disabled "sockitter-data" stage of
    // the query pipeline: http://localhost:8765/api/v1/query-pipelines/sockitter

    HttpClient client = HttpClientBuilder.create().build();
    HttpGet request = new HttpGet("http://localhost:8765/api/v1/query-pipelines/sockitter");
    HttpResponse response = client.execute(request);
    InputStream content = response.getEntity().getContent();
    Scanner s = new Scanner(content).useDelimiter("\\A");
    String json = s.hasNext() ? s.next() : "";
    JsonParser parser = new JsonParser();
    JsonObject pipeline = parser.parse(json).getAsJsonObject();

    JsonArray stages = pipeline.getAsJsonArray("stages");


    String consumer_key = null;
    String consumer_secret = null;
    String token = null;
    String token_secret = null;

    for (JsonElement e : stages) {
      String id = e.getAsJsonObject().get("id").getAsString();
// e = {"type":"set-params","id":"sockitter-data","params":[{"key":"twitter_consumer_key","value":"...","policy":"default"},{"key":"twitter_consumer_secret","value":"...",...
      if ("sockitter-data".equals(id)) {
        JsonArray params = e.getAsJsonObject().getAsJsonArray("params");
        for (int i = 0; i < params.size(); i++) {
          JsonObject param = params.get(i).getAsJsonObject();
          String key = param.get("key").getAsString();
          String value = param.get("value").getAsString();

          switch(key) {
            case "twitter_consumer_key":
              consumer_key = value;
              break;

            case "twitter_consumer_secret":
              consumer_secret = value;
              break;

            case "twitter_token":
              token = value;
              break;

            case "twitter_token_secret":
              token_secret = value;
              break;

            default:
              // no worries, only pick off the ones we want above
              break;
          }
        }

        break;
      }
    }

    if ((consumer_key == null) || (consumer_secret == null) || (token == null) || (token_secret) == null) {
      throw new IOException("Twitter credentials incomplete");
    }

    cb.setDebugEnabled(true)
        .setOAuthConsumerKey(consumer_key)
        .setOAuthConsumerSecret(consumer_secret)
        .setOAuthAccessToken(token)
        .setOAuthAccessTokenSecret(token_secret);

    TwitterFactory tf = new TwitterFactory(cb.build());
    return tf.getInstance();
  }

  private static void debug(JsonObject o) {
    Gson gson = new GsonBuilder().setPrettyPrinting().create();
    System.out.println("\n\n========\n\n");
    gson.toJson(o, System.out);
  }

  public static void main(String[] args) {
    // scratch space for dev debugging

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

//    try {
//      // 1138371924
//      System.out.println(lookupUsersByIDs(new long[]{1138371924}));
//      // addScreenNames("tweets", new String[]{"stackgeek","erikhatcher", "kordless"});
//    } catch (IOException e) {
//      e.printStackTrace();
//    }

    try {
      Twitter twitter = getTwitter();
    } catch (IOException e) {
      e.printStackTrace();
    }
  }
}
