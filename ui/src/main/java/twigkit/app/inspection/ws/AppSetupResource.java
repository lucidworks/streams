package twigkit.app.inspection.ws;

import com.fasterxml.jackson.databind.SerializationFeature;
import com.fasterxml.jackson.jaxrs.annotation.JacksonFeatures;
import com.google.common.eventbus.EventBus;
import com.google.inject.Inject;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import twigkit.app.inspection.service.*;
import twigkit.conf.event.FigReloadedEvent;
import twigkit.editor.service.io.config.ConfigService;
import twigkit.fig.Config;
import twigkit.fig.Fig;
import twigkit.fig.visitor.ConfigLogger;
import twigkit.model.DataObject;

import javax.ws.rs.POST;
import javax.ws.rs.Path;
import javax.ws.rs.Produces;
import javax.ws.rs.core.MediaType;
import javax.ws.rs.core.Response;

/**
 * Web services to handle application setup.
 *
 * @author scottbrown
 */
@Path(AppSetupResource.SERVICE_URL)
public class AppSetupResource {

    private static final Logger logger = LoggerFactory.getLogger(AppSetupResource.class);

    public static final String SERVICE_URL = "/app/setup";

    @Inject
    private PlatformConfigurationService platformService;

    @Inject
    private SecurityConfigurationService securityService;

    @Inject
    private AppConfigurationService appService;

    @Inject
    private ThemeService themeService;

    @Inject
    private MarkupService markupService;

    @Inject
    private Fig fig;

    @Inject
    private EventBus eventBus;

    /**
     * Initialises the application configuration from the given parameters.
     */
    @POST
    @Produces(MediaType.APPLICATION_JSON)
    @JacksonFeatures(serializationEnable = {SerializationFeature.INDENT_OUTPUT})
    public Response setup(DataObject data) {

        if (logger.isTraceEnabled()) {
            logger.trace("Application setup request from client:");
            data.forEach((k, v) -> {
                logger.trace("\t{} = {}", k, v);
            });
        }

        platformService.write(data);
        securityService.write(data);

        Boolean done = data.getAsBoolean("done");

        if (done) {
            themeService.write(data);
            markupService.write(data);
            appService.updateStatus(true);
        }

        // Reload the configuration hierarchy
        reloadFig();

        return Response
                .status(Response.Status.OK)
                .build();

    }

    protected void reloadFig() {
        logger.debug("Reloading configuration tree");

        fig.reload();

        // Show the newly loaded fig
        if (logger.isTraceEnabled()) {
            for (Config conf : fig.configs()) {
                new ConfigLogger(conf);
            }
        }

        eventBus.post(new FigReloadedEvent(fig));

        logger.debug("Configuration tree successfully reloaded");
    }
}