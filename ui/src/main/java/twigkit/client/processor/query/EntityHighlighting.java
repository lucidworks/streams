package twigkit.client.processor.query;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import twigkit.model.Filter;
import twigkit.model.Query;
import twigkit.processor.QueryProcessor;

import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;

/**
 * @author JohnGUnderwood.
 */
public class EntityHighlighting extends QueryProcessor{

    private static final Logger logger = LoggerFactory.getLogger(EntityHighlighting.class);
    public static final String PARAM_ENTITIES = "entities";


    @Override
    public Query change(Query query){

        if(hasParameter(PARAM_ENTITIES)) {
            List<String> entities = Arrays.asList(getParameterStringValue(PARAM_ENTITIES).split(","));
            List<Filter> highlightFilters = new ArrayList<>();

            logger.debug("Entities: {}", entities.toString());

            for (Filter filter : query.getFilters()) {
                logger.debug("Query filter: {} = {}",filter.getField(),filter.getValue().getActualAsString());
                if (entities.indexOf(filter.getField()) > -1) {
                    logger.debug("Filter {} is in entities",filter.getField());
                    highlightFilters.add(filter);
                }
            }

            if (!highlightFilters.isEmpty()) {
                logger.debug("Entity filter terms to highlight for: ");
                List<String> highlightTerms = new ArrayList<String>();
                highlightTerms.add(query.getValue().getActualAsString());
                for (Filter filter : highlightFilters) {
                    logger.debug(filter.getValue().getActualAsString());
                    highlightTerms.add('"'+filter.getValue().getActualAsString()+'"');
                }

                query.addCustomParameter("hl.q", String.join(" ",highlightTerms));
                logger.debug("Added customer parameters: {}", query.getCustomParameters());

            }
        }

        return query;
    }

}
