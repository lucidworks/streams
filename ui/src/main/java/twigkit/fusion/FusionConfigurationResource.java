package twigkit.fusion;


import com.google.inject.Singleton;
import org.codehaus.jettison.json.JSONArray;
import org.codehaus.jettison.json.JSONObject;

import javax.ws.rs.*;
import javax.ws.rs.core.Context;
import javax.ws.rs.core.MediaType;
import javax.ws.rs.core.Response;
import javax.ws.rs.core.UriInfo;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@Path("/setup")
@Singleton
public class FusionConfigurationResource {

    public static final String HOST = "host";


    private Map<String, FusionClient> sessions;

    public FusionConfigurationResource() {
        this.sessions = new HashMap<>();
    }

    @GET
    @Path("/realms/{host}")
    @Produces({MediaType.APPLICATION_JSON, MediaType.APPLICATION_XML})
    public List<String> realms(@Context UriInfo uriInfo, @PathParam(HOST) String host) throws Exception {
        return FusionClient.realms(host);
    }

    @GET
    @Path("/session/{host}")
    @Produces({MediaType.APPLICATION_JSON, MediaType.APPLICATION_XML})
    public Map<String, String> session(@Context UriInfo uriInfo, @PathParam(HOST) String host, @QueryParam("user") String user, @QueryParam("password") String password, @QueryParam("realm") String realm) throws Exception {
        FusionClient client = FusionClient.session(host, realm, user, password);
        sessions.put(client.getSessionId(), client);

        Map<String, String> session = new HashMap<>();
        session.put("session", client.getSessionId());

        return session;
    }

    @GET
    @Path("/collections")
    @Produces({MediaType.APPLICATION_JSON, MediaType.APPLICATION_XML})
    public Response collections(@Context UriInfo uriInfo, @QueryParam("session") String session) throws Exception {
        FusionClient fusionClient = sessions.get(session);

        if (fusionClient != null) {
            String response = fusionClient.request("/api/apollo/collections");
            if (response != null) {
                JSONArray collections = new JSONArray(response);

                JSONArray col = new JSONArray();

                for (int i = 0; i < collections.length(); i++) {
                    JSONObject collection = collections.getJSONObject(i);
                    if (collection.getString("type").equals("DATA")) {
                        String id = collection.getString("id");
                        col.put(id);
                    }
                }

                return Response.ok(col.toString()).build();
            }
        }

        throw new Exception(String.format("No session found for %s", session));
    }

    @GET
    @Path("/query-pipelines")
    @Produces({MediaType.APPLICATION_JSON, MediaType.APPLICATION_XML})
    public Response queryPipelines(@Context UriInfo uriInfo, @QueryParam("session") String session) throws Exception {
        FusionClient fusionClient = sessions.get(session);

        if (fusionClient != null) {
            String response = fusionClient.request("/api/apollo/query-pipelines");
            if (response != null) {
                JSONArray queryPipelines = new JSONArray();

                JSONArray pipelines = new JSONArray(response);
                for (int i = 0; i < pipelines.length(); i++) {
                    JSONObject collection = pipelines.getJSONObject(i);
                    String id = collection.getString("id");
                    queryPipelines.put(id);
                }

                return Response.ok(queryPipelines.toString()).build();
            }
        }

        return Response.serverError().build();
    }
}
