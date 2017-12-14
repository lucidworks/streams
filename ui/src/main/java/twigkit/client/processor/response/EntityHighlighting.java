package twigkit.client.processor.response;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import twigkit.model.Field;
import twigkit.model.Result;
import twigkit.model.Value;
import twigkit.search.processors.AbstractResultProcessor;

import java.util.*;
import java.util.regex.Matcher;
import java.util.regex.Pattern;

/**
 * @author JohnGUnderwood.
 */
public class EntityHighlighting extends AbstractResultProcessor {

    private static final Logger logger = LoggerFactory.getLogger(EntityHighlighting.class);

    public static final String PARAM_ENTITIES = "entities";
    public static final String PARAM_FIELDS = "fields";

    @Override
    public void processResult(int index, Result result) {
        List<String> entities = Arrays.asList(getParameterStringValue(PARAM_ENTITIES).split(","));
        List<String> fields = Arrays.asList(getParameterStringValue(PARAM_FIELDS).split(","));

        Map<String,List<String>> entityValues = new HashMap<>();
        Map<String,List<String>> entityPatterns = new HashMap<>();

        for(Map.Entry<String,Field> entry : result.getFields().entrySet()){
            String fieldname = entry.getKey();

            if(entities.indexOf(fieldname) > -1 && entry.getValue().hasValue()){
                Field field = entry.getValue();
                List<Value> values = field.getValues();
                List<String> stringValues = new ArrayList<>();
                List<String> stringPatterns = new ArrayList<>();

                for( Value value : values ){
                    List<String> terms = Arrays.asList(value.getActualAsString().split(" "));
                    StringBuilder builder = new StringBuilder();
                    for(String term : terms){
                        if(terms.indexOf(term) > 0 ){
                            builder.append(" ");
                        }
                        builder.append("<em>"+term+"</em>");
                    }

                    if(stringValues.indexOf(value.getActualAsString()) < 0){
                        logger.debug("Adding value {} for entity {}",value.getActualAsString(),fieldname);

                        stringValues.add(value.getActualAsString());
                    }

                    if(stringPatterns.indexOf(builder.toString()) < 0){
                        logger.debug("Adding pattern {} for entity {}",builder.toString(),fieldname);

                        stringPatterns.add(builder.toString());
                    }
                }
                entityValues.put(fieldname,stringValues);
                entityPatterns.put(fieldname,stringPatterns);
            }
        }

        logger.debug("Found {} entities in result {}",entityValues.size(),index);

        for(Map.Entry<String,Field> entry : result.getFields().entrySet()){
            String fieldname = entry.getKey();
            if(fields.indexOf(fieldname) > -1){
                logger.debug("Found field {} to process entities in",fieldname);

                List<Value> newValues = new ArrayList<>();
                Field field = entry.getValue();
                List<Value> values = field.getValues();
                for( Value value : values ){
                    String newStringValue = value.getActualAsString();

                    for(Map.Entry<String, List<String>> entity : entityValues.entrySet()){
                        String entityName = entity.getKey();
                        logger.debug("Entity {} has {} values",entityName,entity.getValue().size());

                        for(int i=0;i<entity.getValue().size()-1;i++){
                            Pattern pattern = Pattern.compile(".*"+entityPatterns.get(entityName).get(i)+".*");
                            Matcher m = pattern.matcher(value.getActualAsString());
                            if(m.matches()){
                                newStringValue = newStringValue.replaceAll(
                                        entityPatterns.get(entityName).get(i),
                                        "<em class=\""+entityName+"\">"+entity.getValue().get(i)+"</em>"
                                );
                                logger.debug("Replacing occurrences of {} with {} in {}",
                                        entityPatterns.get(entityName).get(i),
                                        "<em class=\""+entityName+"\">"+entity.getValue().get(i)+"</em>",
                                        fieldname);

                            }
                        }
                    }
                    newValues.add(new Value(newStringValue));
                }
                field.setValues(newValues);
            }
        }
    }
}


