package twigkit.app.inspection.service;

import com.google.inject.Inject;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import twigkit.editor.content.file.FileHandle;
import twigkit.editor.service.io.file.FileService;

import java.io.ByteArrayInputStream;
import java.io.InputStream;
import java.nio.charset.StandardCharsets;
import java.util.Map;

/**
 * Changes the markup.
 *
 * @author stefan
 */
public class MarkupService {

    private static final Logger logger = LoggerFactory.getLogger(MarkupService.class);

    @Inject
    private FileService fileService;

    public void write(Map<String, Object> data) {
        Object facetList = data.get("facet_list");
        Object resultList = data.get("result_list");

        FileHandle searchHtml = fileService.read("views", "search.html");

        String searchHtmlContents = searchHtml.getContents();
        searchHtmlContents = searchHtmlContents.replaceAll("(?s)<search:facet-list .*?>.*</search:facet-list>", String.format("%s", facetList));
        searchHtmlContents = searchHtmlContents.replaceAll("(?s)<search:result-list .*?></search:result-list>", String.format("%s", resultList));

        System.out.println(searchHtmlContents);

        InputStream content = new ByteArrayInputStream(searchHtmlContents.getBytes(StandardCharsets.UTF_8));

        fileService.write(content, "views", "search.html");

        logger.debug("Updated search.html with markup");
    }

}
