
<!doctype html>
<!--[if lt IE 7]><html class="no-js ie6 oldie" lang="en"><![endif]-->
<!--[if IE 7]><html class="no-js ie7 oldie" lang="en"> <![endif]-->
<!--[if IE 8]><html class="no-js ie8 oldie" lang="en"> <![endif]-->
<!--[if gt IE 8]><!--> 
<html class="no-js" lang="en"> <!--<![endif]-->
  <head>
    <meta charset="utf-8">
    <title>Lucidworks Labs::Searching Image Content</title>


    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    
    <!-- Google Fonts -->
    <link href="//fonts.googleapis.com/css?family=Open+Sans:400,300,600,700,800" rel="stylesheet" type="text/css">
    
    <!-- Grab Google CDN's jQuery, with a protocol relative URL; fall back to local if offline -->
    <script src="//ajax.googleapis.com/ajax/libs/jquery/1.10.2/jquery.min.js"></script>
    <script>window.jQuery || document.write('<script src="/static/js/jquery.min.js"><\/script>')</script>

    <!-- Bootstrap CSS -->
    <link href="/static/css/bootstrap.css" rel="stylesheet">

    <!-- Bootflat CSS -->
    <link href="/static/css/bootflat.css" rel="stylesheet">

    <!-- Alert Styles -->
    <link rel="stylesheet" href="/static/css/alertify-core.css" />
    <link rel="stylesheet" href="/static/css/alertify-default.css" />
    <link rel="stylesheet" href="/static/css/alertify-bootstrap.css" />

    <!-- Page Styles -->
    <link href="/static/css/style.css" rel="stylesheet">
    
    <!-- Favicons -->
    <link href="/static/img/favicon.ico" rel="shortcut icon">

    <!-- The HTML5 shim, for IE6-8 support of HTML5 elements -->
    <!--[if lt IE 9]>
      <script src="/js/html5shiv.js"></script>
    <![endif]-->
  </head>
  <body>
    <h1>{{q}}</h1>
    <div id="images">
    </div>

    <script src="/static/js/bootstrap.min.js"></script>
    <script src="/static/js/alertify.min.js"></script>
    <script type="text/javascript">
      $().ready(function() {
        console.log("base online");

        var json = $.getJSON( "/api/search?q={{q}}", function( data ) {
            var items = [];
            console.log(data);
            var i = 0;
            $.each( data['response'], function( ) {
                console.log(data['response'][i]['image']);
                $('<div id='+i+'><img title="'+data['response'][i]['tags']+'" src="'+data['response'][i]['image']+'"/></div>').appendTo("#images");
                i = i + 1;
            });
        });

        json.complete(function() {
            $('#images div img').click(function () {
                var title = this.title;
                var terms = title.split(',');
                var rterm = terms[Math.floor(Math.random()*terms.length)];
                window.location.href = "/demo/"+rterm;
            });
        });



        alertify.log("Welcome to Searching Image Content!");
      });
    </script>
  </body>
</html>