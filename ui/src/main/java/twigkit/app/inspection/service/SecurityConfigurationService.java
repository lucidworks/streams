package twigkit.app.inspection.service;

import com.google.inject.Inject;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import twigkit.editor.service.io.config.ConfigService;
import twigkit.model.Parameters;
import twigkit.search.fusion.FusionPlatform;
import twigkit.search.fusion.builder.FusionUrlBuilder;
import twigkit.security.fusion.FusionAuthenticationProvider;

import java.util.HashMap;
import java.util.Map;

/**
 * Updates the Fusion security configuration with the given parameters.
 *
 * @author bjarkih
 */
public class SecurityConfigurationService {

    private static final Logger logger = LoggerFactory.getLogger(SecurityConfigurationService.class);

    @Inject
    private ConfigService configService;

    public void write(Map<String, Object> data) {
        Map<String, Object> parameters = new HashMap<>();

        String realm = (data.containsKey("realm")) ? data.get("realm").toString() : "native";
        parameters.put(FusionAuthenticationProvider.FUSION_SESSION_REALM_NAME, realm);

        Parameters params = new Parameters();
                data.forEach((k,v) -> {
            params.setParameterValue(k, v);
        });
        String url = (data.containsKey(FusionUrlBuilder.PROTOCOL) ? data.get(FusionUrlBuilder.PROTOCOL).toString() : "http") + "://"
                + data.get(FusionPlatform.HOST) + ":"
                + (data.containsKey(FusionUrlBuilder.PORT) ? data.get(FusionUrlBuilder.PORT).toString() : "8764");
        parameters.put(FusionAuthenticationProvider.FUSION_SESSION_HOST, url);

        configService.write(parameters, true, "security", "fusion");
        logger.debug("Updated security configuration for security.fusion");
    }

}
