package twigkit.app.inspection.service;

import com.google.inject.Inject;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import twigkit.app.inspection.ws.AppSetupResource;
import twigkit.conf.ConfiguredPlatformProvider;
import twigkit.crypto.ConfigurationEncryptor;
import twigkit.editor.service.io.config.ConfigService;
import twigkit.search.fusion.FusionPlatform;
import twigkit.search.fusion.builder.FusionUrlBuilder;

import java.util.HashMap;
import java.util.Map;

/**
 * Updates the default Fusion search platform configuration with the given parameters.
 *
 * @author bjarkih
 */
public class PlatformConfigurationService {

    private static final Logger logger = LoggerFactory.getLogger(PlatformConfigurationService.class);

    @Inject
    private ConfigService configService;

    @Inject
    private ConfigurationEncryptor configurationEncryptor;

    public void write(Map<String, Object> data) {
        Map<String, Object> mainPlatform = new HashMap<>();
        addParameter(FusionPlatform.HOST, data, mainPlatform);
        addParameter(FusionUrlBuilder.PIPELINE, data, mainPlatform);
        addParameter(FusionUrlBuilder.COLLECTION, data, mainPlatform);
        addParameter(FusionUrlBuilder.PORT, data, mainPlatform);

        // Update main Fusion platform
        configService.write(mainPlatform, true, "platforms", "fusion", "data");
        logger.debug("Updated platform configuration for platforms.fusion.data");

        if (data.containsKey(FusionUrlBuilder.COLLECTION)) {

            // Update logs platform
            Map<String, Object> logsPlatform = new HashMap<>();
            logsPlatform.put(FusionUrlBuilder.COLLECTION, data.get(FusionUrlBuilder.COLLECTION).toString() + "_logs");
            configService.write(logsPlatform, true, "platforms", "fusion", "data", "logs");
            logger.debug("Updated platform configuration for platforms.fusion.data.logs");

            // Update signals platform
            Map<String, Object> signalsPlatform = new HashMap<>();
            signalsPlatform.put(FusionUrlBuilder.COLLECTION, data.get(FusionUrlBuilder.COLLECTION).toString() + "_signals");
            configService.write(signalsPlatform, true,"platforms", "fusion", "data", "signals");
            logger.debug("Updated platform configuration for platforms.fusion.data.signals");
        }

        if (data.containsKey(FusionPlatform.USER_NAME) && data.containsKey(FusionPlatform.PASSWORD)) {

            // Update impersonation platform
            Map<String, Object> impersonationPlatform = new HashMap<>();
            impersonationPlatform.put(FusionPlatform.USER_NAME, data.get("user").toString());
            impersonationPlatform.put(FusionPlatform.PASSWORD, configurationEncryptor.encrypt(data.get(FusionPlatform.PASSWORD).toString()));
            impersonationPlatform.put(FusionPlatform.IMPERSONATE, true);
            configService.write(impersonationPlatform, true, "platforms", "fusion", "data", "impersonate");
            logger.debug("Updated platform configuration for platforms.fusion.data.impersonate");

        }

    }

    private void addParameter(String parameter, Map<String, Object> data, Map<String, Object> parameters) {
        if (data.containsKey(parameter)) {
            parameters.put(parameter, data.get(parameter).toString());
        }
    }

}
