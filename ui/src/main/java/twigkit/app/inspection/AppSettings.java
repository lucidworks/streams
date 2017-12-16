package twigkit.app.inspection;

import twigkit.fig.Config;
import twigkit.fig.Fig;
import twigkit.util.FigUtils;

/**
 * Application settings and meta-data.
 *
 * @author bjarkih
 */
public class AppSettings {

    public static final String FLAG_INITIALISED = "initialised";
    public static final String FLAG_MARKUP = "markup";

    private static boolean initialised = false;
    private static boolean markup = false;

    public static boolean initialised() {
        if (initialised) {
            return true; // once initialised, no further checks to the config are necessary
        }
        Fig fig = Fig.getInstance(FigUtils.getApplicationLoader());
        if (fig != null) {
            Config appConfig = fig.get("app");
            initialised = appConfig != null && appConfig.has(FLAG_INITIALISED) && appConfig.value(FLAG_INITIALISED).as_boolean();
            markup = appConfig != null && appConfig.has(FLAG_MARKUP) && appConfig.value(FLAG_MARKUP).as_boolean();
        }
        return initialised;
    }

    public static boolean markup() {
        if (markup) {
            return true; // once initialised, no further checks to the config are necessary
        }
        Fig fig = Fig.getInstance(FigUtils.getApplicationLoader());
        if (fig != null) {
            Config appConfig = fig.get("app");
            markup = appConfig != null && appConfig.has(FLAG_MARKUP) && appConfig.value(FLAG_MARKUP).as_boolean();
        }
        return markup;
    }
}
