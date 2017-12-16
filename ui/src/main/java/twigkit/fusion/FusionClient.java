package twigkit.fusion;

import org.apache.commons.io.IOUtils;
import org.apache.http.HttpResponse;
import org.apache.http.client.CookieStore;
import org.apache.http.client.methods.HttpGet;
import org.apache.http.client.methods.HttpPost;
import org.apache.http.client.protocol.HttpClientContext;
import org.apache.http.client.utils.URIBuilder;
import org.apache.http.cookie.Cookie;
import org.apache.http.entity.ContentType;
import org.apache.http.entity.StringEntity;
import org.apache.http.impl.client.CloseableHttpClient;
import org.codehaus.jettison.json.JSONArray;
import org.codehaus.jettison.json.JSONObject;
import twigkit.http.util.HttpClientFactory;

import java.io.IOException;
import java.util.ArrayList;
import java.util.List;

/**
 * Fusion API client.
 *
 * @author stefan@lucidworks.com
 */
public class FusionClient {

    public static final String HTTP = "http";
    public static final String ID = "id";
    public static final String USERNAME = "username";
    public static final String PASSWORD = "password";

    public static final String API_ENDPOINT = "/api";
    public static final String SESSION_ENDPOINT = "/api/session";
    public static final String REALM_PARAMETER = "realmName";

    public static final String ENABLED_REALMS = "enabledRealms";

    private CloseableHttpClient httpClient;
    private String sessionId;
    private String host;

    private FusionClient(CloseableHttpClient httpClient) {
        this.httpClient = httpClient;
    }

    public CloseableHttpClient getHttpClient() {
        return httpClient;
    }

    public String getSessionId() {
        return sessionId;
    }

    public String getHost() {
        return host;
    }

    /**
     * Get a list of authentication realms for a given Fusion instance before attempting authentication.
     *
     * @param host
     * @return
     * @throws Exception
     */
    public static List<String> realms(String host) throws Exception {
        List<String> realms = new ArrayList<>();
        try (CloseableHttpClient httpClient = HttpClientFactory.get()) {

            URIBuilder uri = new URIBuilder();
            uri.setScheme(HTTP).setHost(host).setPort(8764).setPath(API_ENDPOINT);

            final HttpGet realmRequest = new HttpGet(uri.build());
            HttpResponse realmResponse = httpClient.execute(realmRequest);
            JSONObject json = new JSONObject(IOUtils.toString(realmResponse.getEntity().getContent()));

            JSONArray enabledRealms = json.getJSONArray(ENABLED_REALMS);
            for (int i = 0; i < enabledRealms.length(); i++) {
                realms.add(enabledRealms.getJSONObject(i).getString("name"));
            }
        }

        return realms;
    }

    /**
     * Get a session from Fusion for subsequent API calls.
     *
     * @param host
     * @param realm
     * @param user
     * @param password
     * @return
     * @throws Exception
     */
    public static FusionClient session(String host, String realm, String user, String password) throws Exception {
        FusionClient fusionClient = new FusionClient(HttpClientFactory.get());
        fusionClient.host = host;

        HttpClientContext context = HttpClientContext.create();

        URIBuilder uri = new URIBuilder();
        uri.setScheme(HTTP).setHost(host).setPort(8764).setPath(SESSION_ENDPOINT).setParameter(REALM_PARAMETER, realm);

        final HttpPost sessionRequest = new HttpPost(uri.build());

        JSONObject payload = new JSONObject();
        payload.put(USERNAME, user);
        payload.put(PASSWORD, password);

        sessionRequest.setEntity(new StringEntity(payload.toString(), ContentType.APPLICATION_JSON));

        String response = IOUtils.toString(fusionClient.getHttpClient().execute(sessionRequest, context).getEntity().getContent());

        CookieStore cookieStore = context.getCookieStore();
        for (Cookie cookie : cookieStore.getCookies()) {
            if (cookie.getName().equals(ID)) {
                fusionClient.sessionId = cookie.getValue();
                return fusionClient;
            }
        }

        throw new IOException(response);
    }

    /**
     * Make a request to a Fusion Endpoint.
     *
     * @param endpoint
     * @return
     * @throws Exception
     */
    public String request(String endpoint) throws Exception {
        URIBuilder uri = new URIBuilder();
        uri.setScheme(HTTP).setHost(host).setPort(8764).setPath(endpoint);

        final HttpGet request = new HttpGet(uri.build());

            HttpResponse httpResponse = httpClient.execute(request);

            String json = IOUtils.toString(httpResponse.getEntity().getContent());

            if (httpResponse.getStatusLine().getStatusCode() == 200) {
                return json;
            }

            throw new IOException(json);
    }

    public void close() throws IOException {
        httpClient.close();
    }
}
