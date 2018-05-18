package com.lucidworks.streams.sockitter;

import com.google.gson.Gson;
import com.google.gson.GsonBuilder;
import twitter4j.Twitter;
import twitter4j.TwitterException;
import twitter4j.TwitterFactory;
import twitter4j.conf.ConfigurationBuilder;

import javax.servlet.ServletException;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.io.PrintWriter;
import java.util.ArrayList;
import java.util.Collections;
import java.util.HashMap;
import java.util.Map;

public class TwitterGateway extends HttpServlet {

  @Override
  protected void doGet(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
    // Set response content type
    response.setContentType("application/json");

    Map<String, String[]> params = request.getParameterMap();
    String[] methods = params.get("method");


    if (methods == null || methods.length != 1) {
      throw new ServletException("One and only one `method` must be provided");
    }

    String method = methods[0];

    ConfigurationBuilder cb = new ConfigurationBuilder();

    // TODO: have this info fed in after app launch by user
    cb.setDebugEnabled(true)
        .setOAuthConsumerKey("YOUR_CONSUMER_KEY")
        .setOAuthConsumerSecret("YOUR_CONSUMER_SECRET")
        .setOAuthAccessToken("YOUR_ACCESS_TOKEN")
        .setOAuthAccessTokenSecret("YOUR_ACCESS_SECRET");

    TwitterFactory tf = new TwitterFactory(cb.build());
    Twitter twitter = tf.getInstance();

    Map data = new HashMap();

    try {
      switch (method) {
        case "lookupUsersByScreenName":
          String[] sns = params.get("screen_name");
          if (sns != null) {
            ArrayList<String> screen_names = new ArrayList<String>();
            Collections.addAll(screen_names, sns);
            data.put("screen_names", sns);
            data.put("response", twitter.lookupUsers((String[]) screen_names.toArray(new String[0])));
          } else {
            data.put("error","`screen_name` not specified");
          }
          break;

        case "lookupUsersByID":
          String[] ids = params.get("id");

          if (ids != null) {
            long[] long_ids = new long[ids.length];
            for (int i = 0; i < ids.length; i++) {
              long_ids[i] = Long.valueOf(ids[i]);
            }

            data.put("ids", ids);
            data.put("response", twitter.lookupUsers(long_ids));
          } else {
            data.put("error","`id` not specified");
          }
          break;

        default:
          data.put("error", "Method " + method + " not supported");
          break;
      }
    } catch (TwitterException e) {
      data.put("exception", e.getMessage());
    }

    // Actual logic goes here.
    PrintWriter out = response.getWriter();

    Gson gson = new GsonBuilder().create();
    gson.toJson(data, out);
  }
}
