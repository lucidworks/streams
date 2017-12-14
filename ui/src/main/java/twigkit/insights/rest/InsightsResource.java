package twigkit.insights.rest;

import com.google.inject.Inject;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import twigkit.conf.ConfiguredPlatformProvider;
import twigkit.insights.InsightFactoryImpl;
import twigkit.insights.model.Insight;
import twigkit.model.Query;
import twigkit.platform.Platform;
import twigkit.search.QueryFactory;
import twigkit.security.SecurityProvider;
import twigkit.service.rest.platform.PlatformResource;
import twigkit.service.rest.util.JAXUtils;

import javax.ws.rs.GET;
import javax.ws.rs.Path;
import javax.ws.rs.PathParam;
import javax.ws.rs.Produces;
import javax.ws.rs.core.Context;
import javax.ws.rs.core.MediaType;
import javax.ws.rs.core.UriInfo;

@Path(InsightsResource.SERVICE_URL)
public class InsightsResource extends PlatformResource {

    public static final String SERVICE_URL = "/insights";

    private static final Logger logger = LoggerFactory.getLogger(InsightsResource.class);

    @Inject
    private ConfiguredPlatformProvider platformProvider;

    @Inject
    private QueryFactory queryFactory;

    @Inject(optional = true)
    private SecurityProvider securityProvider;

    @GET
    @Path("/{platform}")
    @Produces({MediaType.APPLICATION_JSON})
    public Insight insight(@Context UriInfo uriInfo, @PathParam("platform") String platformName) {
        Query query = queryFactory.fromParameters(JAXUtils.getQueryParameters(uriInfo));
        if (securityProvider != null) {
            logger.trace("Adding user [{}] to query", securityProvider.getUser());
            query.setUser(securityProvider.getUser());
        } else {
            logger.trace("No SecurityProvider available");
        }
        Platform platform = platformProvider.get(platformName);

        return new InsightFactoryImpl(platform, query).insight();
    }
}
