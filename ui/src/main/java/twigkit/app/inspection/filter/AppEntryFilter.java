package twigkit.app.inspection.filter;

import com.google.inject.Singleton;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import twigkit.app.inspection.AppSettings;
import twigkit.ui.jsp.service.WebServicesUtils;

import javax.servlet.*;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;

/**
 * Checks the app status and redirects the user to a setup screen if the
 * application has not been fully initialised.
 *
 * @author bjarkih
 */
@Singleton
public class AppEntryFilter implements Filter {

    private static final Logger logger = LoggerFactory.getLogger(AppEntryFilter.class);

    public static final String SETUP_PATH = "/setup/";

    @Override
    public void init(FilterConfig filterConfig) throws ServletException {
    }

    @Override
    public void doFilter(ServletRequest servletRequest, ServletResponse servletResponse, FilterChain filterChain) throws IOException, ServletException {
        HttpServletRequest httpServletRequest = (HttpServletRequest) servletRequest;
        if (!AppSettings.initialised()) {

            logger.debug(httpServletRequest.getRequestURI());
            if (httpServletRequest.getRequestURI().startsWith(SETUP_PATH) || httpServletRequest.getRequestURI().startsWith(WebServicesUtils.API_URL)) {
                filterChain.doFilter(servletRequest, servletResponse); // allow requests to the setup screen to go through
                return;
            }

            logger.debug("Application has not been initialised - redirecting to setup screen");
            ((HttpServletResponse) servletResponse).sendRedirect(httpServletRequest.getContextPath() + SETUP_PATH);
            return;
        } else {
            if (SETUP_PATH.equalsIgnoreCase(httpServletRequest.getRequestURI())) {
                ((HttpServletResponse) servletResponse).sendRedirect(httpServletRequest.getContextPath() + "/"); // restrict access to setup screen once app has been initialised
                return;
            }
        }
        filterChain.doFilter(servletRequest, servletResponse);
    }

    @Override
    public void destroy() {
    }
}
