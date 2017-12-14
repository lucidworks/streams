package twigkit.app.inspection.service;

import com.google.inject.Inject;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import twigkit.editor.content.file.FileHandle;
import twigkit.editor.service.io.config.ConfigService;
import twigkit.editor.service.io.file.FileService;
import twigkit.model.Parameters;
import twigkit.search.fusion.FusionPlatform;
import twigkit.search.fusion.builder.FusionUrlBuilder;
import twigkit.security.fusion.FusionAuthenticationProvider;

import java.io.ByteArrayInputStream;
import java.io.InputStream;
import java.nio.charset.StandardCharsets;
import java.util.HashMap;
import java.util.Map;

/**
 * Changes the theme LESS files.
 *
 * @author stefan
 */
public class ThemeService {

    private static final Logger logger = LoggerFactory.getLogger(ThemeService.class);

    @Inject
    private FileService fileService;

    public void write(Map<String, Object> data) {
        // Setting color
        Object color = data.get("color");
        Object appName = data.get("application_name");

        String theme = String.format("@color-primary: %s;", color);

        InputStream content = new ByteArrayInputStream(theme.getBytes(StandardCharsets.UTF_8));

        fileService.write(content, "styles", "includes", "theme.less");

        FileHandle appJs = fileService.read("scripts", "app.js");
        String appJsContents = appJs.getContents();
        appJsContents = appJsContents.replaceAll("(?s)\"Application\";", String.format("\"%s\";", appName));
        content = new ByteArrayInputStream(appJsContents.getBytes(StandardCharsets.UTF_8));
        fileService.write(content, "scripts", "app.js");

        logger.debug("Updated app.js with application name: {}", appName);
        logger.debug("Updated theme with color: {}", color);
    }

}
