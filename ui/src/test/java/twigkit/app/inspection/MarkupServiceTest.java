package twigkit.app.inspection;

import org.junit.Test;

public class MarkupServiceTest {

    @Test
    public void regex() throws Exception {
        String str = "Angular_ss";
        String org = "Angular";

        System.out.println(str.replaceAll("_[A-z]{1,3}$", ""));
    }

    @Test
    public void testReplacementOfAppJs() throws Exception {
        String appJs = "<!-- -------------------------------------------- -->\n" +
                "<!-- Build the data model                         -->\n" +
                "<!-- -------------------------------------------- -->\n" +
                "\n" +
                "<!-- Define a search platform to fetch data from -->\n" +
                "<search:platform var=\"platform\" conf=\"platforms.fusion.data\"></search:platform>\n" +
                "\n" +
                "<!-- Search query based on the user's input -->\n" +
                "<search:query var=\"query\" parameters=\"*\" results-per-page=\"12\"></search:query>\n" +
                "\n" +
                "<!-- Send query to platform and retrieve documents back -->\n" +
                "<search:response var=\"response\" platform=\"platform\" query=\"query\">\n" +
                "    <widget:spinner></widget:spinner>\n" +
                "</search:response>\n" +
                "\n" +
                "\n" +
                "<!-- -------------------------------------------- -->\n" +
                "<!-- Define the view                              -->\n" +
                "<!-- -------------------------------------------- -->\n" +
                "\n" +
                "<helper:title title=\"Fusion Search\"></helper:title>\n" +
                "\n" +
                "<!-- HEADER -->\n" +
                "<layout:include file=\"views/partials/header.tpl.html\" action=\"search\"></layout:include>\n" +
                "\n" +
                "<!-- CONTENT -->\n" +
                "<layout:grid styling=\"row-offcanvas\">\n" +
                "\n" +
                "    <!-- Animate page when response received -->\n" +
                "    <layout:animate animation=\"animate-fadeInUp\" on=\"response\" layout-grid>\n" +
                "\n" +
                "        <!-- CONTENT > SIDEBAR -->\n" +
                "        <layout:block md=\"1-3\" lg=\"1-4\" drawer=\"left\" id=\"sidebar\" styling=\"blocksidebar-light\">\n" +
                "            <layout:sidebar>\n" +
                "                <layout:box>\n" +
                "\n" +
                "                    <!-- List facets and give them intuitive labels -->\n" +
                "                    <search:facet-list response=\"response\" platform=\"platform\" query=\"query\" styling=\"facet-list facet-list-wrappedheader\" facet-names=\"*\">\n" +
                "                        <search:facet collapsible=\"true\" max-characters=\"40\" show=\"12\" show-more=\"24\"></search:facet>\n" +
                "                    </search:facet-list>\n" +
                "\n" +
                "                </layout:box>\n" +
                "            </layout:sidebar>\n" +
                "        </layout:block>\n" +
                "\n" +
                "        <!-- CONTENT > RESULTS -->\n" +
                "        <layout:block md=\"2-3\" lg=\"3-4\" styling=\"bg-white\">\n" +
                "            <layout:box padding-left=\"2\" padding-right=\"2\">\n" +
                "\n" +
                "                <!-- Results Wrapper -->\n" +
                "                <layout:block>\n" +
                "                    <layout:grid>\n" +
                "\n" +
                "                        <!-- Tabs, View Options, Response Stats, Selected Facets -->\n" +
                "                        <layout:block padding-top=\"1\">\n" +
                "\n" +
                "                            <!--<layout:grid>-->\n" +
                "                                <!--<layout:block md=\"3-4\">-->\n" +
                "                                    <!--&lt;!&ndash; Specify a facet to show tabs from &ndash;&gt;-->\n" +
                "                                    <!--<search:tabs response=\"response\" field-name=\"data_sourceX_s\" all-label=\"All\" platform=\"platform\" query=\"query\"-->\n" +
                "                                                                                     <!--tabs=\"Website,Sharepoint,GoogleDrive,People,Q&A\"></search:tabs>-->\n" +
                "                                <!--</layout:block>-->\n" +
                "                                <!--<layout:block md=\"1-4\" styling=\"center-content sortoptions-block\">-->\n" +
                "                                    <!--<layout:controls class=\"right\">-->\n" +
                "                                        <!--<search:sort response=\"response\" fields=\"field1=Field 1,field2=Field 2\"></search:sort>-->\n" +
                "                                    <!--</layout:controls>-->\n" +
                "                                <!--</layout:block>-->\n" +
                "                            <!--</layout:grid>-->\n" +
                "\n" +
                "                            <div padding-top=\"1\">\n" +
                "                                <search:response-statistics response=\"response\"></search:response-statistics>\n" +
                "                                <p class=\"response-statistics\">(Fusion took {{ response.time }}ms)</p>\n" +
                "                                <search:breadcrumbs query=\"query\" group-by-field=\"true\" exclude=\"tabField\"></search:breadcrumbs>\n" +
                "                            </div>\n" +
                "                        </layout:block>\n" +
                "\n" +
                "                        <!-- Results -->\n" +
                "                        <layout:block>\n" +
                "\n" +
                "                            <!-- SEARCH > RESULTS -->\n" +
                "\n" +
                "                            <!-- Show messages from Fusion -->\n" +
                "                            <search:message-list response=\"response\" title=\"You might also want to look at\"></search:message-list>\n" +
                "\n" +
                "                            <search:result-list response=\"response\"></search:result-list>\n" +
                "\n" +
                "                            <!-- Uncomment the following to choose which fields to show and how to display them -->\n" +
                "\n" +
                "                            <!--<search:result-list response=\"response\" styling=\"cards-sm-1 cards-lg-2 cards-xl-3\" instant-results=\"true\" platform=\"platform\" query=\"query\">-->\n" +
                "                                <!--<search:result>-->\n" +
                "                                    <!--<search:field name=\"title\" styling=\"title\" urlfield=\"url\"></search:field>-->\n" +
                "                                    <!--<search:field name=\"id\" styling=\"url\" label=\"\" urlfield=\"id\" max-characters=\"30\"></search:field>-->\n" +
                "                                    <!--<search:field name=\"body\" styling=\"description\" label=\"\" max-characters=\"200\" show=\"1\"></search:field>-->\n" +
                "                                <!--</search:result>-->\n" +
                "                            <!--</search:result-list>-->\n" +
                "\n" +
                "                            <!-- No results message -->\n" +
                "                            <search:no-results response=\"response\"></search:no-results>\n" +
                "                        </layout:block>\n" +
                "\n" +
                "                    </layout:grid>\n" +
                "                </layout:block>\n" +
                "            </layout:box>\n" +
                "        </layout:block>\n" +
                "        \n" +
                "    </layout:animate>\n" +
                "\n" +
                "</layout:grid>\n" +
                "\n" +
                "\n";

        String replacement = "<search:result-list><search:result><search:field name=\"nameX\" styling=\"title\" url-field=\"urlX\"></search:field><search:field name=\"body\" styling=\"description\"></search:field><search:field name=\"data_sourceX_s\" label=\"Sources\" styling=\"label-left\"></search:field><search:field name=\"authorsX_ss\" label=\"Author\" styling=\"label-left\"></search:field></search:result></search:result-list>";
        String facets = "<search:result-list><search:result><search:field name=\"nameX\" styling=\"title\" url-field=\"urlX\"></search:field><search:field name=\"body\" styling=\"description\"></search:field><search:field name=\"data_sourceX_s\" label=\"Sources\" styling=\"label-left\"></search:field><search:field name=\"authorsX_ss\" label=\"Author\" styling=\"label-left\"></search:field></search:result></search:result-list>";
        appJs = appJs.replaceAll("(?s)<search:result-list .*?></search:result-list>", String.format("%s", replacement));
        appJs = appJs.replaceAll("(?s)<search:facet-list .*?>.*</search:facet-list>", String.format("%s", "--my facets--"));
        System.out.println(appJs);
    }
}
