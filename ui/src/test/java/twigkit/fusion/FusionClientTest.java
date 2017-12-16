package twigkit.fusion;

import org.codehaus.jettison.json.JSONArray;
import org.junit.Test;

import java.util.List;

import static org.junit.Assert.assertEquals;
import static org.junit.Assert.assertNotNull;
import static org.junit.Assert.assertTrue;

public class FusionClientTest {

    @Test
    public void testRealms() throws Exception {
        List<String> realms = FusionClient.realms("demos.lucidworks.io");
        assertEquals("native", realms.get(1));
    }

    @Test
    public void testSession() throws Exception {
        FusionClient client = FusionClient.session("demos.lucidworks.io", "Corp_Active_Directory", "will1", "searchr0cks");
        assertNotNull(client);
        client.close();
    }

    @Test
    public void testRequestToEndpoint() throws Exception {
        FusionClient client = FusionClient.session("demos.lucidworks.io", "Corp_Active_Directory", "will1", "searchr0cks");
        String response = client.request("/api/apollo/query-pipelines");
        JSONArray pipelines = new JSONArray(response);
        assertTrue(pipelines.length() > 0);
        client.close();
    }
}
