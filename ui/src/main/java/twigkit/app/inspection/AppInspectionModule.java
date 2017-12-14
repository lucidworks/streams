package twigkit.app.inspection;

import com.google.inject.servlet.ServletModule;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import twigkit.AbstractTwigKitModule;
import twigkit.app.inspection.filter.AppEntryFilter;
import twigkit.app.inspection.service.*;
import twigkit.app.inspection.ws.AppSetupResource;
import twigkit.fusion.FusionConfigurationResource;


/**
 * Application module.
 *
 * @author bjarkih
 */
public class AppInspectionModule extends AbstractTwigKitModule {

    private static final Logger logger = LoggerFactory.getLogger(AppInspectionModule.class);

    public AppInspectionModule() {
        super(Priority.LOWEST);
    }

    @Override
    protected void configure() {

        install(new ServletModule() {
            @Override
            protected void configureServlets() {
                filter("*/").through(AppEntryFilter.class);
            }
        });

        bind(FusionConfigurationResource.class);
        bind(AppSetupResource.class);
        bind(PlatformConfigurationService.class);
        bind(SecurityConfigurationService.class);
        bind(AppConfigurationService.class);
        bind(ThemeService.class);
        bind(MarkupService.class);

        logger.info("Application inspection module loaded");
    }
}
