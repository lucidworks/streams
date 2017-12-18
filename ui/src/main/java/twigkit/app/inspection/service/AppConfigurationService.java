package twigkit.app.inspection.service;

import com.google.inject.Inject;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import twigkit.app.inspection.AppSettings;
import twigkit.editor.service.io.config.ConfigService;
import twigkit.search.fusion.FusionPlatform;
import twigkit.search.fusion.builder.FusionUrlBuilder;

import java.util.HashMap;
import java.util.Map;

/**
 * Updates the state of the search app.
 *
 * @author bjarkih
 */
public class AppConfigurationService {

    private static final Logger logger = LoggerFactory.getLogger(AppConfigurationService.class);

    @Inject
    private ConfigService configService;

    public void updateStatus(boolean initialized) {
        Map<String, Object> parameters = new HashMap<>();
        parameters.put(AppSettings.FLAG_INITIALISED, initialized);
        parameters.put(AppSettings.FLAG_MARKUP, false);
        configService.write(parameters, true, "app");
        logger.debug("Updated app configuration");

    }

    private void addParameter(String parameter, Map<String, Object> data, Map<String, Object> parameters) {
        if (data.containsKey(parameter)) {
            parameters.put(parameter, data.get(parameter).toString());
        }
    }

}
