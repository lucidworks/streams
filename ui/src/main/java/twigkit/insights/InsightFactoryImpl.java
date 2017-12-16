package twigkit.insights;

import twigkit.insights.model.Insight;
import twigkit.model.Query;
import twigkit.model.Response;
import twigkit.model.Result;
import twigkit.platform.Platform;

import java.lang.reflect.Field;
import java.net.MalformedURLException;
import java.net.URL;
import java.util.Comparator;

public class InsightFactoryImpl implements InsightFactory {

    private Insight insight;

    public InsightFactoryImpl(Platform platform, Query query) {
        insight = new Insight();

        Response response = platform.search(query);
        response(response);
    }

    public Insight insight() {
        return insight;
    }

    private void response(Response response) {
        insight.sample_count(response.getResults().size());
        insight.hits(response.getHits().getActual());

        response.getFacets().values().forEach(insight::facet);
        response.getResults().forEach(this::result);

        insight.fields().entrySet().stream()
                .filter(e -> e.getValue().cardinality() <= 0.25)
                .filter(e -> !(e.getValue().distinct() == 1))
                .filter(e -> !(e.getValue().occurrences() == e.getValue().distinct()))
                .filter(e -> !insight.facets().containsKey(e.getKey()))
                .forEach(e -> insight.facet_suggestions().add(e.getKey()));

        insight.fields().entrySet().stream()
                .filter(e -> e.getValue().cardinality() == 1)
                .filter(e -> e.getValue().occurrences() == insight.sample_count())
                .forEach(e -> insight.unique_fields().add(e.getKey()));

        // Suggest titles
        insight.fields().values().stream()
                .filter(f -> f.cardinality() > 0.90)
                .filter(f -> (f.occurrences()/insight.sample_count()) > 0.8)
                .filter(f -> f.types().size() == 1)
                .filter(f -> f.types().contains(String.class.getTypeName()))
                .forEach((Insight.Field f) -> {
                    int urlCount = 0;
                    int titleCharCount = 0;
                    for (String value : f.all_values()) {
                        try {
                            // Checking for characters that indicate a title
                            if (value.contains(" ")) {
                                titleCharCount++;
                            }
                            // Check if value is a URL
                            new URL(value);
                            urlCount++;
                        } catch (MalformedURLException e) {}
                    }
                    if ((double)(urlCount / f.all_values().size()) > 0.9) {
                        insight.url_fields().add(f.name());
                        insight.title_suggestions().remove(f.name());
                    }

                    if (((double)titleCharCount / f.all_values().size()) > 0.5) {
                        if (!insight.title_suggestions().contains(f.name().replaceAll("_[A-z]{1,3}$", ""))) {
                            insight.title_suggestions().add(f.name());
                        }
                    }
                });

        // Suggest descriptions
        insight.fields().values().stream()
                .filter(f -> f.cardinality() > 0.5)
                .filter(f -> f.types().size() == 1)
                .filter(f -> f.types().contains(String.class.getTypeName()))
                .forEach(f -> {
                    if (f.average_length() > 200) {
                        if (!insight.description_suggestions().contains(f.name().replaceAll("_[A-z]{1,3}$", ""))) {
                            insight.description_suggestions().add(f.name());
                        }
                    }

                    if (f.name().toLowerCase().equals("body") ||
                            f.name().toLowerCase().equals("description") ||
                            f.name().toLowerCase().equals("text") ||
                            f.name().toLowerCase().equals("summary")) {
                        insight.description_suggestions().add(f.name());
                    }
                });
    }

    private void result(Result result) {
        result.getFields().values().stream()
                .filter(f -> !insight.facets().containsKey(f.getName()))
                .filter(f -> !f.getName().startsWith("_lw_"))
                .filter(f -> !f.getName().startsWith("access_permission"))
                .sorted((f1, f2) -> f1.getName().compareTo(f2.getName()))
                .forEach( f -> insight.field(f));
    }
}
