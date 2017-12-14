package twigkit.app.inspection;

import org.junit.Test;

public class ThemeServiceTest {

    @Test
    public void testReplacementOfAppJs() throws Exception {
        String appJs = "'use strict';\n" +
                "\n" +
                "/**\n" +
                " * @ngdoc overview\n" +
                " * @name twigkitLightApp\n" +
                " * @description\n" +
                " * # twigkitLightApp\n" +
                " *\n" +
                " * Main module of the application.\n" +
                " */\n" +
                "angular\n" +
                "    .module('twigkitLightApp', [\n" +
                "        'ui.router',\n" +
                "        'lightning',\n" +
                "        'ngAnimate'\n" +
                "    ]);\n" +
                "\n" +
                "angular\n" +
                "    .module(\"twigkitLightApp\")\n" +
                "    .controller(\"ctrl\",\n" +
                "        function ($scope) {\n" +
                "            $scope.application_name = \"Application\";\n" +
                "\n" +
                "            $scope.changedValue = function (item) {\n" +
                "                // TODO: if item not null then activate button\n" +
                "                $scope.topic = item.id;\n" +
                "            }\n" +
                "        });";

        appJs = appJs.replaceAll("(?s)\"Application\";","\"My Application\";");
        System.out.println(appJs);
    }
}
