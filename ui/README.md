# Fusion Search Application

Twigkit makes building rich search-based applications quicker and easier than ever before. This template was built on top of a Fusion search index but can be adapted for any Twigkit supported data source. 

## License

The application comes with a 30-day license key in `twigkit.lic`. Once this expires, you can download a new license key by visiting our [developer portal](https://dev.twigkit.net/settings/keys/).


## Basic configuration

Before you start up the application, a couple of configurations need to be made.

Firstly, edit `src/main/resources/conf/platforms/fusion/fusion.conf` to specify which Fusion collection and pipeline to use:

```
host: YOUR_HOST
collection: YOUR_COLLECTION
pipeline: YOUR_QUERY_PIPELINE
```

Secondly, you need to edit `src/main/resources/conf/security/fusion/fusion.conf` and specify the URL of your Fusion authentication endpoint:

```
session-host: YOUR_FUSION_URL_WITH_PORT # Fusion session host in the format http://my.organisation.com:8764
realm-name: native # Specify which Fusion security realm to use
```

## Running the application
The only dependency required to run this Twigkit package is Oracle Java JDK 1.8+ The application will run in an embedded Jetty servlet, by default on port 8080.

### Using a proxy
If using a proxy to connect to the internet you will need to configure your environment to pull the Twigkit dependencies.

Create a new environment variable

name: `MAVEN_OPTS`

value: `-Dhttps.proxyHost=myHost -Dhttps.proxyPort=myPort -Dhttps.proxyUser=myDomain\myUsername -Dhttps.proxyPassword=myPassword`

### On Linux/OSX
Run `sh twigkit start` from the package root directory to start the application. To stop the process, you run `sh twigkit stop` from the package root directory.

Run `sh twigkit` to see available run parameters.

### On Windows
Run `twigkit.bat start` from the package root directory to start the application. To stop the process, you run `twigkit.bat stop` from the package root directory.

Run `twigkit.bat` to see available run parameters

## Key files and folders

This package provides all you need to run a starter search application. It is made up of a handful of files and folders.


### `/src/main/webapp/views`

This is generally where the magic happens. The views are created with our flexible markup which makes it easy to describe even complex user interaction. Each view is automatically given a pretty URL and within it you use our tags to connect to a data provider, choose what to show and how. In this application, `search.html` is the main search page. Additional pages can be created as needed.

### `/src/main/resources/conf`

Twigkit uses configuration files to define endpoints for obtaining data (data providers, data processors and other middleware type operations. This allows you centrally manage these things ensuring that not too much of this ends up in the view layer.

### `/src/main/webapp/styles`

Your application comes with a sample theme. You can easily remove the style settings and set your own such as colours, fonts, and layout. Put any custom styling into `includes/custom.less`.

### `/src/main/webapp/scripts`

In this folder you will find a few JavaScript files responsible for conducting the orchestra. These will just do their thing, so you will generally know if you need to work with them, e.g. define your own controllers etc.

### `/src/main/webapp/assets`

This folder contains supporting downloadable assets like images.


## A typical page

Twigkit offers an array of custom elements or tags that handle all the complexities of connecting to a data provider like Fusion and visualising the data that comes back. Each widget will automatically know how to show the data and request new data based on user interaction.

In this section we will walk you through all the tags that make up a typical page like the one you will find in `app/views/search.html`.

### Connecting to a data provider

Twigkit handles all the nuances of efficiently communicating with a data provider like Fusion. It will adapt our standardised way of declaring user questions to something Fusion (or other providers) will understand, and map the response to a generic format our widgets can work with.

There are three components to a particular request/response. First, you define which provider to use, then create a query from the URL or any parameters you explicitly declare, and finally send the query to the platform and obtain a response.


Below you will see all the tags needed to declare a data provider, build a query, and obtain a response.

```
<search:platform var="platform" conf="platforms.fusion"></search:platform>
<search:query var="query" parameters="*"></search:query>
<search:response var="response" platform="platform" query="query"></search:response>
```

#### The Platform Tag

For every data provider there is a configuration file and an endpoint. The platform tag determines which endpoint is used to obtain data.

In this case we declare a data provider (platform) for a particular Fusion collection and set of parameters to search through an index.

```
<search:platform var="platform" conf="platforms.fusion"></search:platform>
```

#### The Query Tag

The Query tag constructs a Twigkit query object. You can choose to build a query from scratch by passing in the parameters you want or you can have it automatically created from the page URL.

Here's how you build a query using all query string parameters, and default to 12 results per page:

```
<search:query var="query" parameters='*' results-per-page="12"></search:query>
```

Conversely, if you didn't want the user to be able to specify results per page you would simply omit that parameter when building a query from the URL:

```
<search:query var="query" parameters='*,-rpp' results-per-page="12"></search:query>
```

#### The Response Tag

Finally the Response tag brings the two together, the Platform (or data provider) and the query.

In the example below we refer to the previously defined platform and query by variable name:

```
<search:response var="response" platform="platform" query="query"></search:response>
```

### Controlling page layout

Built into Twigkit are tags to determine the layout and structure of the page. Using these ensures that the application will work equally well on desktops, mobiles and other devices (like high-resolution screens).

Twigkit uses the generally accepted grid layout to control how large sections appear on the screen, and how they behave when the visible area or resolution changes.

A simple grid:

```
<layout:grid>
  <layout:block small="1-2" large="1-4">
    Narrow section on large screens.
  </layout:block>
  <layout:block small="1-2" large="3-4">
    Wide on large screens.
  </layout:block>
</layout:grid>
```

## Packaging the application for distribution

Once you are ready to deploy your application or share it with a customer or prospect, you have two options when it comes to packaging:
 
- Package as a stand-alone application
- Package as a Web Application Archive (WAR file)


### Package as a stand-alone application

You can package the application as a self-contained archive that contains an embedded Tomcat application server and makes no requirements on the runtime environment apart from a Java Runtime Environment (Sun Oracle Java 8+). 

To generate a self-contained application archige, you run the `twigkit` script with the `dist` command:

- On Linux/OSX, you run: `sh twigkit dist`
- On Windows, you run: `twigkit.bat dist`

This packages the Twigkit middleware services and all front-end resources to `dist/${project.name}-standalone/`. This folder also contains scripts for stopping and starting the application server. Consult `README_STANDALONE.md` for more details.


### Package as a Web Application Archive (WAR file)

To package the application as a WAR file you can run the `twigkit` script with the `package` command:

- On Linux/OSX, you run: `sh twigkit package`
- On Windows, you run: `twigkit.bat package`

This builds a new WAR and places it in `dist/${project.name}.war`. The WAR file can be deployed in any standard Java application server, for example Tomcat or Jetty.


#### Customising the build
If you want to have more control over the Twigkit environment (versions, dependencies, etc.) you can run using your own installation of [Maven 3.0+](https://maven.apache.org/download.cgi). You will need to add the `bin/settings.xml` file from this package to your Maven profile (usually `<USER HOME>/.m2/`)


### Front end dependencies

If you wish to be able to update/modify bower dependencies you will need to install [Bower](https://bower.io/#install-bower), [Node.js and NPM](http://blog.npmjs.org/post/85484771375/how-to-install-npm)


## More information

For more information see our developer portal (http://dev.twigkit.net) or our (beta) Twigkit.io (http://beta.twigkit.io) site (log in using beta/$pring2017!) for information about JavaScript tags and styling.
