package twigkit.insights.model;

import twigkit.model.DataObject;
import twigkit.model.Key;

import java.util.HashSet;
import java.util.LinkedHashMap;
import java.util.Map;
import java.util.Set;

public class Insight extends DataObject {

    @Key
    private int sample_count;

    @Key
    private long hits;

    @Key
    private Set<String> unique_fields;

    @Key
    private Set<String> url_fields;

    @Key
    private Set<String> title_suggestions;

    @Key
    private Set<String> description_suggestions;

    @Key
    private Set<String> facet_suggestions;

    @Key
    private Map<String, Field> fields;

    @Key
    private Map<String, Field> facets;

    public Insight() {
        fields = new LinkedHashMap<>();
        unique_fields = new HashSet<>();
        url_fields = new HashSet<>();
        facets = new LinkedHashMap<>();
        title_suggestions = new HashSet<>();
        description_suggestions = new HashSet<>();
        facet_suggestions = new HashSet<>();
    }

    public void field(twigkit.model.Field field) {
        if (!fields.containsKey(field.getName())) {
            fields.put(field.getName(), new Field(this, field.getName()));
        }

        Insight.Field fi = fields.get(field.getName());
        for (Object obj : field.getValues()) {
            fi.value(field.getValue().getActual());
        }
    }

    public void facet(twigkit.model.Facet facet) {
        Insight.Field fi = new Field(this, facet.getField());
        fi.distinct(facet.getFilters().size());
        fi.occurrences((int) facet.getSumOfCounts());
        fi.cardinality((float) fi.occurrences() / hits());

        facet.getFilters().stream().map(facetFilter -> facetFilter.getValue().getActualAsString()).mapToInt(String::length).average().ifPresent(fi::average_length);
        facet.getFilters().forEach(facetFilter -> fi.types(facetFilter.getValue().getActual().getClass().getTypeName()));
        facet.getFilters().stream().filter(facetFilter -> facetFilter.getValue().getActualAsString().length() > 0).limit(5).forEach(facetFilter -> fi.sample().add(facetFilter.getValue().getActual()));

        facets.put(facet.getField(), fi);
    }

    public Set<String> unique_fields() {
        return unique_fields;
    }

    public Set<String> url_fields() {
        return url_fields;
    }

    public Set<String> facet_suggestions() {
        return facet_suggestions;
    }

    public Set<String> title_suggestions() {
        return title_suggestions;
    }

    public Set<String> description_suggestions() {
        return description_suggestions;
    }

    public Map<String, Field> fields() {
        return fields;
    }

    public Map<String, Field> facets() {
        return facets;
    }

    public int sample_count() {
        return sample_count;
    }

    public Insight sample_count(int count) {
        this.sample_count = count;
        return this;
    }

    public long hits() {
        return hits;
    }

    public Insight hits(long hits) {
        this.hits = hits;
        return this;
    }

    public class Field extends DataObject {

        private Insight insight;
        private Set<String> all_values;

        @Key
        private String name;

        @Key
        private Set<String> types;

        @Key
        private Set<Object> sample;

        @Key
        private int occurrences;

        @Key
        private int distinct;

        @Key
        private float cardinality;

        @Key
        private int average_length;

        Field(Insight insight, String name) {
            this.insight = insight;
            this.name = name;
            all_values = new HashSet<>();
            types = new HashSet<>();
            sample = new HashSet<>();
        }

        public String name() {
            return name;
        }

        public Set<String> types() {
            return types;
        }

        public Set<Object> sample() {
            return sample;
        }

        public Field types(String types) {
            this.types.add(types);
            return this;
        }

        public int occurrences() {
            return occurrences;
        }

        public Field occurrences(int occurrences) {
            this.occurrences = occurrences;
            return this;
        }

        public int distinct() {
            return distinct;
        }

        public Field distinct(int distinct) {
            this.distinct = distinct;
            return this;
        }

        public float cardinality() {
            return cardinality;
        }

        public Field cardinality(float cardinality) {
            this.cardinality = cardinality;
            return this;
        }

        public int average_length() {
            return average_length;
        }

        public Field average_length(double average_length) {
            this.average_length = (int) average_length;
            return this;
        }

        public Set<String> all_values() {
            return all_values;
        }

        Field value(Object value) {
            if (value.toString().length() > 0) {
                all_values.add(value.toString());

                if (sample().size() < 6) {
                    sample().add(value);
                }

                types.add(value.getClass().getTypeName());
                occurrences++;
                distinct = all_values.size();
                cardinality = (float) distinct / occurrences();

                average_length = (int) all_values.stream().mapToInt(String::length).average().getAsDouble();
            }
            return this;
        }
    }
}
