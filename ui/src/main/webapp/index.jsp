<%-- === Use WRO4J plugin when you want to switch between pre-compiled and dynamic resources === --%>
<%-- === when running Jetty or Tomcat Maven plugins or a WAR file                            === --%>
<%--<%@ taglib prefix="wro" uri="/twigkit/wro" %>--%>

<!doctype html>
<html class="no-js">

<head>
    <base href="${pageContext.request.contextPath}/"/>
    <meta charset="utf-8">
    <title>Fusion Search</title>

    <%-- === Use WRO4J plugin when you want to switch between pre-compiled and dynamic resources === --%>
    <%-- === when running Jetty or Tomcat Maven plugins or a WAR file                            === --%>
    <%--<link rel="stylesheet" href="${wro:resourcePath('main.css', pageContext.request)}">--%>

    <%-- Comment this out if you use the WRO4J plugin above --%>
    <link rel="stylesheet" type="text/css" href="${pageContext.request.contextPath}/wro/css/main.css" />


    <style type="text/css">

        div.rg-top {
            width: auto;
            right: 2.8em;
            margin: 0;
            padding: 0.75em 0 0.95em 0;
        }

        div.rg-top span {
            margin-top: 0px;
            border-bottom-color: #afbbc7;
            border-top-color: rgba(255,255,255,0.725);
            box-shadow: 0px -1px 0px #afbbc7, 0px 1px 0px rgba(255,255,255,0.725);
            height: 5px;
        }

        .inline-editor {
            position: fixed;
            bottom: 0;
            transition: all linear 0.1s;
            width: 100%;
            opacity: 1;
        }

        .inline-editor.ng-hide {
            opacity: 0;
        }

        .inline-editor iframe{
            width: 100%;
            height: 100%;
        }


    </style>

</head>

<body ng-app="twigkitLightApp" ng-keydown="$root.openEditor($event)">

<!-- All views are loaded here -->
<ui-view autoscroll="true"></ui-view>

<%--<div resizable r-directions="['top']" ng-hide="$root.hideInlineEditor" class="inline-editor" ng-class="{'full-screen':$root.fullScreenEditor}" ng-cloak ng-style="{'height':$root.fullScreenEditor != true ? '93.8%' : '100%'}">--%>
    <%--<iframe class="editor-iframe" frameborder="0" ng-src="{{'http://localhost:8080/admin/#/visual-editor?file=' + $root.templateUrl + '&inline=true' | trusted}}"></iframe>--%>
<%--</div>--%>

<div class="tk-stl-notifications"></div>


<%-- === Use WRO4J plugin when you want to switch between pre-compiled and dynamic resources === --%>
<%-- === when running Jetty or Tomcat Maven plugins or a WAR file                            === --%>
<%--<script src="${wro:resourcePath('vendor.js', pageContext.request)}" type="text/javascript"></script>--%>
<%--<script src="${wro:resourcePath('main.js', pageContext.request)}" type="text/javascript"></script>--%>

<%-- Comment this out if you use the WRO4J plugin above --%>
<script type="text/javascript" src="${pageContext.request.contextPath}/wro/js/vendor.js"></script>
<script type="text/javascript" src="${pageContext.request.contextPath}/wro/js/main.js"></script>


<script>
    angular.module('lightning').constant('contextPath', '${pageContext.request.contextPath}');
</script>

</body>
</html>