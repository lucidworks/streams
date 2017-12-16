/*
 Highstock JS v5.0.7 (2017-01-17)

 (c) 2009-2016 Torstein Honsi

 License: www.highcharts.com/license
*/
(function(J,a){"object"===typeof module&&module.exports?module.exports=J.document?a(J):a:J.Highcharts=a(J)})("undefined"!==typeof window?window:this,function(J){J=function(){var a=window,C=a.document,A=a.navigator&&a.navigator.userAgent||"",D=C&&C.createElementNS&&!!C.createElementNS("http://www.w3.org/2000/svg","svg").createSVGRect,F=/(edge|msie|trident)/i.test(A)&&!window.opera,u=!D,h=/Firefox/.test(A),n=h&&4>parseInt(A.split("Firefox/")[1],10);return a.Highcharts?a.Highcharts.error(16,!0):{product:"Highstock",
version:"5.0.7",deg2rad:2*Math.PI/360,doc:C,hasBidiBug:n,hasTouch:C&&void 0!==C.documentElement.ontouchstart,isMS:F,isWebKit:/AppleWebKit/.test(A),isFirefox:h,isTouchDevice:/(Mobile|Android|Windows Phone)/.test(A),SVG_NS:"http://www.w3.org/2000/svg",chartCount:0,seriesTypes:{},symbolSizes:{},svg:D,vml:u,win:a,charts:[],marginNames:["plotTop","marginRight","marginBottom","plotLeft"],noop:function(){}}}();(function(a){var C=[],A=a.charts,D=a.doc,F=a.win;a.error=function(u,h){u=a.isNumber(u)?"Highcharts error #"+
u+": www.highcharts.com/errors/"+u:u;if(h)throw Error(u);F.console&&console.log(u)};a.Fx=function(a,h,n){this.options=h;this.elem=a;this.prop=n};a.Fx.prototype={dSetter:function(){var a=this.paths[0],h=this.paths[1],n=[],m=this.now,q=a.length,k;if(1===m)n=this.toD;else if(q===h.length&&1>m)for(;q--;)k=parseFloat(a[q]),n[q]=isNaN(k)?a[q]:m*parseFloat(h[q]-k)+k;else n=h;this.elem.attr("d",n,null,!0)},update:function(){var a=this.elem,h=this.prop,n=this.now,m=this.options.step;if(this[h+"Setter"])this[h+
"Setter"]();else a.attr?a.element&&a.attr(h,n,null,!0):a.style[h]=n+this.unit;m&&m.call(a,n,this)},run:function(a,h,n){var m=this,q=function(a){return q.stopped?!1:m.step(a)},k;this.startTime=+new Date;this.start=a;this.end=h;this.unit=n;this.now=this.start;this.pos=0;q.elem=this.elem;q.prop=this.prop;q()&&1===C.push(q)&&(q.timerId=setInterval(function(){for(k=0;k<C.length;k++)C[k]()||C.splice(k--,1);C.length||clearInterval(q.timerId)},13))},step:function(a){var h=+new Date,n,m=this.options;n=this.elem;
var q=m.complete,k=m.duration,d=m.curAnim,b;if(n.attr&&!n.element)n=!1;else if(a||h>=k+this.startTime){this.now=this.end;this.pos=1;this.update();a=d[this.prop]=!0;for(b in d)!0!==d[b]&&(a=!1);a&&q&&q.call(n);n=!1}else this.pos=m.easing((h-this.startTime)/k),this.now=this.start+(this.end-this.start)*this.pos,this.update(),n=!0;return n},initPath:function(u,h,n){function m(a){var f,c;for(t=a.length;t--;)f="M"===a[t]||"L"===a[t],c=/[a-zA-Z]/.test(a[t+3]),f&&c&&a.splice(t+1,0,a[t+1],a[t+2],a[t+1],a[t+
2])}function q(a,f){for(;a.length<e;){a[0]=f[e-a.length];var c=a.slice(0,r);[].splice.apply(a,[0,0].concat(c));x&&(c=a.slice(a.length-r),[].splice.apply(a,[a.length,0].concat(c)),t--)}a[0]="M"}function k(a,f){for(var c=(e-a.length)/r;0<c&&c--;)p=a.slice().splice(a.length/l-r,r*l),p[0]=f[e-r-c*r],B&&(p[r-6]=p[r-2],p[r-5]=p[r-1]),[].splice.apply(a,[a.length/l,0].concat(p)),x&&c--}h=h||"";var d,b=u.startX,v=u.endX,B=-1<h.indexOf("C"),r=B?7:3,e,p,t;h=h.split(" ");n=n.slice();var x=u.isArea,l=x?2:1,I;
B&&(m(h),m(n));if(b&&v){for(t=0;t<b.length;t++)if(b[t]===v[0]){d=t;break}else if(b[0]===v[v.length-b.length+t]){d=t;I=!0;break}void 0===d&&(h=[])}h.length&&a.isNumber(d)&&(e=n.length+d*l*r,I?(q(h,n),k(n,h)):(q(n,h),k(h,n)));return[h,n]}};a.extend=function(a,h){var n;a||(a={});for(n in h)a[n]=h[n];return a};a.merge=function(){var u,h=arguments,n,m={},q=function(k,d){var b,v;"object"!==typeof k&&(k={});for(v in d)d.hasOwnProperty(v)&&(b=d[v],a.isObject(b,!0)&&"renderTo"!==v&&"number"!==typeof b.nodeType?
k[v]=q(k[v]||{},b):k[v]=d[v]);return k};!0===h[0]&&(m=h[1],h=Array.prototype.slice.call(h,2));n=h.length;for(u=0;u<n;u++)m=q(m,h[u]);return m};a.pInt=function(a,h){return parseInt(a,h||10)};a.isString=function(a){return"string"===typeof a};a.isArray=function(a){a=Object.prototype.toString.call(a);return"[object Array]"===a||"[object Array Iterator]"===a};a.isObject=function(u,h){return u&&"object"===typeof u&&(!h||!a.isArray(u))};a.isNumber=function(a){return"number"===typeof a&&!isNaN(a)};a.erase=
function(a,h){for(var n=a.length;n--;)if(a[n]===h){a.splice(n,1);break}};a.defined=function(a){return void 0!==a&&null!==a};a.attr=function(u,h,n){var m,q;if(a.isString(h))a.defined(n)?u.setAttribute(h,n):u&&u.getAttribute&&(q=u.getAttribute(h));else if(a.defined(h)&&a.isObject(h))for(m in h)u.setAttribute(m,h[m]);return q};a.splat=function(u){return a.isArray(u)?u:[u]};a.syncTimeout=function(a,h,n){if(h)return setTimeout(a,h,n);a.call(0,n)};a.pick=function(){var a=arguments,h,n,m=a.length;for(h=
0;h<m;h++)if(n=a[h],void 0!==n&&null!==n)return n};a.css=function(u,h){a.isMS&&!a.svg&&h&&void 0!==h.opacity&&(h.filter="alpha(opacity\x3d"+100*h.opacity+")");a.extend(u.style,h)};a.createElement=function(u,h,n,m,q){u=D.createElement(u);var k=a.css;h&&a.extend(u,h);q&&k(u,{padding:0,border:"none",margin:0});n&&k(u,n);m&&m.appendChild(u);return u};a.extendClass=function(u,h){var n=function(){};n.prototype=new u;a.extend(n.prototype,h);return n};a.pad=function(a,h,n){return Array((h||2)+1-String(a).length).join(n||
0)+a};a.relativeLength=function(a,h){return/%$/.test(a)?h*parseFloat(a)/100:parseFloat(a)};a.wrap=function(a,h,n){var m=a[h];a[h]=function(){var a=Array.prototype.slice.call(arguments),k=arguments,d=this;d.proceed=function(){m.apply(d,arguments.length?arguments:k)};a.unshift(m);a=n.apply(this,a);d.proceed=null;return a}};a.getTZOffset=function(u){var h=a.Date;return 6E4*(h.hcGetTimezoneOffset&&h.hcGetTimezoneOffset(u)||h.hcTimezoneOffset||0)};a.dateFormat=function(u,h,n){if(!a.defined(h)||isNaN(h))return a.defaultOptions.lang.invalidDate||
"";u=a.pick(u,"%Y-%m-%d %H:%M:%S");var m=a.Date,q=new m(h-a.getTZOffset(h)),k,d=q[m.hcGetHours](),b=q[m.hcGetDay](),v=q[m.hcGetDate](),B=q[m.hcGetMonth](),r=q[m.hcGetFullYear](),e=a.defaultOptions.lang,p=e.weekdays,t=e.shortWeekdays,x=a.pad,m=a.extend({a:t?t[b]:p[b].substr(0,3),A:p[b],d:x(v),e:x(v,2," "),w:b,b:e.shortMonths[B],B:e.months[B],m:x(B+1),y:r.toString().substr(2,2),Y:r,H:x(d),k:d,I:x(d%12||12),l:d%12||12,M:x(q[m.hcGetMinutes]()),p:12>d?"AM":"PM",P:12>d?"am":"pm",S:x(q.getSeconds()),L:x(Math.round(h%
1E3),3)},a.dateFormats);for(k in m)for(;-1!==u.indexOf("%"+k);)u=u.replace("%"+k,"function"===typeof m[k]?m[k](h):m[k]);return n?u.substr(0,1).toUpperCase()+u.substr(1):u};a.formatSingle=function(u,h){var n=/\.([0-9])/,m=a.defaultOptions.lang;/f$/.test(u)?(n=(n=u.match(n))?n[1]:-1,null!==h&&(h=a.numberFormat(h,n,m.decimalPoint,-1<u.indexOf(",")?m.thousandsSep:""))):h=a.dateFormat(u,h);return h};a.format=function(u,h){for(var n="{",m=!1,q,k,d,b,v=[],B;u;){n=u.indexOf(n);if(-1===n)break;q=u.slice(0,
n);if(m){q=q.split(":");k=q.shift().split(".");b=k.length;B=h;for(d=0;d<b;d++)B=B[k[d]];q.length&&(B=a.formatSingle(q.join(":"),B));v.push(B)}else v.push(q);u=u.slice(n+1);n=(m=!m)?"}":"{"}v.push(u);return v.join("")};a.getMagnitude=function(a){return Math.pow(10,Math.floor(Math.log(a)/Math.LN10))};a.normalizeTickInterval=function(u,h,n,m,q){var k,d=u;n=a.pick(n,1);k=u/n;h||(h=q?[1,1.2,1.5,2,2.5,3,4,5,6,8,10]:[1,2,2.5,5,10],!1===m&&(1===n?h=a.grep(h,function(a){return 0===a%1}):.1>=n&&(h=[1/n])));
for(m=0;m<h.length&&!(d=h[m],q&&d*n>=u||!q&&k<=(h[m]+(h[m+1]||h[m]))/2);m++);return d=a.correctFloat(d*n,-Math.round(Math.log(.001)/Math.LN10))};a.stableSort=function(a,h){var n=a.length,m,q;for(q=0;q<n;q++)a[q].safeI=q;a.sort(function(a,d){m=h(a,d);return 0===m?a.safeI-d.safeI:m});for(q=0;q<n;q++)delete a[q].safeI};a.arrayMin=function(a){for(var h=a.length,n=a[0];h--;)a[h]<n&&(n=a[h]);return n};a.arrayMax=function(a){for(var h=a.length,n=a[0];h--;)a[h]>n&&(n=a[h]);return n};a.destroyObjectProperties=
function(a,h){for(var n in a)a[n]&&a[n]!==h&&a[n].destroy&&a[n].destroy(),delete a[n]};a.discardElement=function(u){var h=a.garbageBin;h||(h=a.createElement("div"));u&&h.appendChild(u);h.innerHTML=""};a.correctFloat=function(a,h){return parseFloat(a.toPrecision(h||14))};a.setAnimation=function(u,h){h.renderer.globalAnimation=a.pick(u,h.options.chart.animation,!0)};a.animObject=function(u){return a.isObject(u)?a.merge(u):{duration:u?500:0}};a.timeUnits={millisecond:1,second:1E3,minute:6E4,hour:36E5,
day:864E5,week:6048E5,month:24192E5,year:314496E5};a.numberFormat=function(u,h,n,m){u=+u||0;h=+h;var q=a.defaultOptions.lang,k=(u.toString().split(".")[1]||"").length,d,b;-1===h?h=Math.min(k,20):a.isNumber(h)||(h=2);b=(Math.abs(u)+Math.pow(10,-Math.max(h,k)-1)).toFixed(h);k=String(a.pInt(b));d=3<k.length?k.length%3:0;n=a.pick(n,q.decimalPoint);m=a.pick(m,q.thousandsSep);u=(0>u?"-":"")+(d?k.substr(0,d)+m:"");u+=k.substr(d).replace(/(\d{3})(?=\d)/g,"$1"+m);h&&(u+=n+b.slice(-h));return u};Math.easeInOutSine=
function(a){return-.5*(Math.cos(Math.PI*a)-1)};a.getStyle=function(u,h){return"width"===h?Math.min(u.offsetWidth,u.scrollWidth)-a.getStyle(u,"padding-left")-a.getStyle(u,"padding-right"):"height"===h?Math.min(u.offsetHeight,u.scrollHeight)-a.getStyle(u,"padding-top")-a.getStyle(u,"padding-bottom"):(u=F.getComputedStyle(u,void 0))&&a.pInt(u.getPropertyValue(h))};a.inArray=function(a,h){return h.indexOf?h.indexOf(a):[].indexOf.call(h,a)};a.grep=function(a,h){return[].filter.call(a,h)};a.find=function(a,
h){return[].find.call(a,h)};a.map=function(a,h){for(var n=[],m=0,q=a.length;m<q;m++)n[m]=h.call(a[m],a[m],m,a);return n};a.offset=function(a){var h=D.documentElement;a=a.getBoundingClientRect();return{top:a.top+(F.pageYOffset||h.scrollTop)-(h.clientTop||0),left:a.left+(F.pageXOffset||h.scrollLeft)-(h.clientLeft||0)}};a.stop=function(a,h){for(var n=C.length;n--;)C[n].elem!==a||h&&h!==C[n].prop||(C[n].stopped=!0)};a.each=function(a,h,n){return Array.prototype.forEach.call(a,h,n)};a.addEvent=function(u,
h,n){function m(a){a.target=a.srcElement||F;n.call(u,a)}var q=u.hcEvents=u.hcEvents||{};u.addEventListener?u.addEventListener(h,n,!1):u.attachEvent&&(u.hcEventsIE||(u.hcEventsIE={}),u.hcEventsIE[n.toString()]=m,u.attachEvent("on"+h,m));q[h]||(q[h]=[]);q[h].push(n);return function(){a.removeEvent(u,h,n)}};a.removeEvent=function(u,h,n){function m(a,b){u.removeEventListener?u.removeEventListener(a,b,!1):u.attachEvent&&(b=u.hcEventsIE[b.toString()],u.detachEvent("on"+a,b))}function q(){var a,b;if(u.nodeName)for(b in h?
(a={},a[h]=!0):a=d,a)if(d[b])for(a=d[b].length;a--;)m(b,d[b][a])}var k,d=u.hcEvents,b;d&&(h?(k=d[h]||[],n?(b=a.inArray(n,k),-1<b&&(k.splice(b,1),d[h]=k),m(h,n)):(q(),d[h]=[])):(q(),u.hcEvents={}))};a.fireEvent=function(u,h,n,m){var q;q=u.hcEvents;var k,d;n=n||{};if(D.createEvent&&(u.dispatchEvent||u.fireEvent))q=D.createEvent("Events"),q.initEvent(h,!0,!0),a.extend(q,n),u.dispatchEvent?u.dispatchEvent(q):u.fireEvent(h,q);else if(q)for(q=q[h]||[],k=q.length,n.target||a.extend(n,{preventDefault:function(){n.defaultPrevented=
!0},target:u,type:h}),h=0;h<k;h++)(d=q[h])&&!1===d.call(u,n)&&n.preventDefault();m&&!n.defaultPrevented&&m(n)};a.animate=function(u,h,n){var m,q="",k,d,b;a.isObject(n)||(m=arguments,n={duration:m[2],easing:m[3],complete:m[4]});a.isNumber(n.duration)||(n.duration=400);n.easing="function"===typeof n.easing?n.easing:Math[n.easing]||Math.easeInOutSine;n.curAnim=a.merge(h);for(b in h)a.stop(u,b),d=new a.Fx(u,n,b),k=null,"d"===b?(d.paths=d.initPath(u,u.d,h.d),d.toD=h.d,m=0,k=1):u.attr?m=u.attr(b):(m=parseFloat(a.getStyle(u,
b))||0,"opacity"!==b&&(q="px")),k||(k=h[b]),k.match&&k.match("px")&&(k=k.replace(/px/g,"")),d.run(m,k,q)};a.seriesType=function(u,h,n,m,q){var k=a.getOptions(),d=a.seriesTypes;k.plotOptions[u]=a.merge(k.plotOptions[h],n);d[u]=a.extendClass(d[h]||function(){},m);d[u].prototype.type=u;q&&(d[u].prototype.pointClass=a.extendClass(a.Point,q));return d[u]};a.uniqueKey=function(){var a=Math.random().toString(36).substring(2,9),h=0;return function(){return"highcharts-"+a+"-"+h++}}();F.jQuery&&(F.jQuery.fn.highcharts=
function(){var u=[].slice.call(arguments);if(this[0])return u[0]?(new (a[a.isString(u[0])?u.shift():"Chart"])(this[0],u[0],u[1]),this):A[a.attr(this[0],"data-highcharts-chart")]});D&&!D.defaultView&&(a.getStyle=function(u,h){var n={width:"clientWidth",height:"clientHeight"}[h];if(u.style[h])return a.pInt(u.style[h]);"opacity"===h&&(h="filter");if(n)return u.style.zoom=1,Math.max(u[n]-2*a.getStyle(u,"padding"),0);u=u.currentStyle[h.replace(/\-(\w)/g,function(a,h){return h.toUpperCase()})];"filter"===
h&&(u=u.replace(/alpha\(opacity=([0-9]+)\)/,function(a,h){return h/100}));return""===u?1:a.pInt(u)});Array.prototype.forEach||(a.each=function(a,h,n){for(var m=0,q=a.length;m<q;m++)if(!1===h.call(n,a[m],m,a))return m});Array.prototype.indexOf||(a.inArray=function(a,h){var n,m=0;if(h)for(n=h.length;m<n;m++)if(h[m]===a)return m;return-1});Array.prototype.filter||(a.grep=function(a,h){for(var n=[],m=0,q=a.length;m<q;m++)h(a[m],m)&&n.push(a[m]);return n});Array.prototype.find||(a.find=function(a,h){var n,
m=a.length;for(n=0;n<m;n++)if(h(a[n],n))return a[n]})})(J);(function(a){var C=a.each,A=a.isNumber,D=a.map,F=a.merge,u=a.pInt;a.Color=function(h){if(!(this instanceof a.Color))return new a.Color(h);this.init(h)};a.Color.prototype={parsers:[{regex:/rgba\(\s*([0-9]{1,3})\s*,\s*([0-9]{1,3})\s*,\s*([0-9]{1,3})\s*,\s*([0-9]?(?:\.[0-9]+)?)\s*\)/,parse:function(a){return[u(a[1]),u(a[2]),u(a[3]),parseFloat(a[4],10)]}},{regex:/#([a-fA-F0-9]{2})([a-fA-F0-9]{2})([a-fA-F0-9]{2})/,parse:function(a){return[u(a[1],
16),u(a[2],16),u(a[3],16),1]}},{regex:/rgb\(\s*([0-9]{1,3})\s*,\s*([0-9]{1,3})\s*,\s*([0-9]{1,3})\s*\)/,parse:function(a){return[u(a[1]),u(a[2]),u(a[3]),1]}}],names:{white:"#ffffff",black:"#000000"},init:function(h){var n,m,q,k;if((this.input=h=this.names[h]||h)&&h.stops)this.stops=D(h.stops,function(d){return new a.Color(d[1])});else for(q=this.parsers.length;q--&&!m;)k=this.parsers[q],(n=k.regex.exec(h))&&(m=k.parse(n));this.rgba=m||[]},get:function(a){var h=this.input,m=this.rgba,q;this.stops?
(q=F(h),q.stops=[].concat(q.stops),C(this.stops,function(k,d){q.stops[d]=[q.stops[d][0],k.get(a)]})):q=m&&A(m[0])?"rgb"===a||!a&&1===m[3]?"rgb("+m[0]+","+m[1]+","+m[2]+")":"a"===a?m[3]:"rgba("+m.join(",")+")":h;return q},brighten:function(a){var h,m=this.rgba;if(this.stops)C(this.stops,function(h){h.brighten(a)});else if(A(a)&&0!==a)for(h=0;3>h;h++)m[h]+=u(255*a),0>m[h]&&(m[h]=0),255<m[h]&&(m[h]=255);return this},setOpacity:function(a){this.rgba[3]=a;return this}};a.color=function(h){return new a.Color(h)}})(J);
(function(a){var C,A,D=a.addEvent,F=a.animate,u=a.attr,h=a.charts,n=a.color,m=a.css,q=a.createElement,k=a.defined,d=a.deg2rad,b=a.destroyObjectProperties,v=a.doc,B=a.each,r=a.extend,e=a.erase,p=a.grep,t=a.hasTouch,x=a.inArray,l=a.isArray,I=a.isFirefox,H=a.isMS,f=a.isObject,c=a.isString,z=a.isWebKit,y=a.merge,w=a.noop,G=a.pick,g=a.pInt,E=a.removeEvent,N=a.splat,P=a.stop,Q=a.svg,R=a.SVG_NS,L=a.symbolSizes,O=a.win;C=a.SVGElement=function(){return this};C.prototype={opacity:1,SVG_NS:R,textProps:"direction fontSize fontWeight fontFamily fontStyle color lineHeight width textDecoration textOverflow textOutline".split(" "),
init:function(a,g){this.element="span"===g?q(g):v.createElementNS(this.SVG_NS,g);this.renderer=a},animate:function(g,c,E){c=a.animObject(G(c,this.renderer.globalAnimation,!0));0!==c.duration?(E&&(c.complete=E),F(this,g,c)):this.attr(g,null,E);return this},colorGradient:function(g,c,E){var K=this.renderer,f,e,b,w,p,z,r,t,G,d,x,M=[],v;g.linearGradient?e="linearGradient":g.radialGradient&&(e="radialGradient");if(e){b=g[e];p=K.gradients;r=g.stops;d=E.radialReference;l(b)&&(g[e]=b={x1:b[0],y1:b[1],x2:b[2],
y2:b[3],gradientUnits:"userSpaceOnUse"});"radialGradient"===e&&d&&!k(b.gradientUnits)&&(w=b,b=y(b,K.getRadialAttr(d,w),{gradientUnits:"userSpaceOnUse"}));for(x in b)"id"!==x&&M.push(x,b[x]);for(x in r)M.push(r[x]);M=M.join(",");p[M]?d=p[M].attr("id"):(b.id=d=a.uniqueKey(),p[M]=z=K.createElement(e).attr(b).add(K.defs),z.radAttr=w,z.stops=[],B(r,function(g){0===g[1].indexOf("rgba")?(f=a.color(g[1]),t=f.get("rgb"),G=f.get("a")):(t=g[1],G=1);g=K.createElement("stop").attr({offset:g[0],"stop-color":t,
"stop-opacity":G}).add(z);z.stops.push(g)}));v="url("+K.url+"#"+d+")";E.setAttribute(c,v);E.gradient=M;g.toString=function(){return v}}},applyTextOutline:function(a){var g=this.element,c,E,f,K;-1!==a.indexOf("contrast")&&(a=a.replace(/contrast/g,this.renderer.getContrast(g.style.fill)));this.fakeTS=!0;this.ySetter=this.xSetter;c=[].slice.call(g.getElementsByTagName("tspan"));a=a.split(" ");E=a[a.length-1];(f=a[0])&&"none"!==f&&(f=f.replace(/(^[\d\.]+)(.*?)$/g,function(a,g,c){return 2*g+c}),B(c,function(a){"highcharts-text-outline"===
a.getAttribute("class")&&e(c,g.removeChild(a))}),K=g.firstChild,B(c,function(a,c){0===c&&(a.setAttribute("x",g.getAttribute("x")),c=g.getAttribute("y"),a.setAttribute("y",c||0),null===c&&g.setAttribute("y",0));a=a.cloneNode(1);u(a,{"class":"highcharts-text-outline",fill:E,stroke:E,"stroke-width":f,"stroke-linejoin":"round"});g.insertBefore(a,K)}))},attr:function(a,g,c,E){var f,K=this.element,b,e=this,l;"string"===typeof a&&void 0!==g&&(f=a,a={},a[f]=g);if("string"===typeof a)e=(this[a+"Getter"]||
this._defaultGetter).call(this,a,K);else{for(f in a)g=a[f],l=!1,E||P(this,f),this.symbolName&&/^(x|y|width|height|r|start|end|innerR|anchorX|anchorY)/.test(f)&&(b||(this.symbolAttr(a),b=!0),l=!0),!this.rotation||"x"!==f&&"y"!==f||(this.doTransform=!0),l||(l=this[f+"Setter"]||this._defaultSetter,l.call(this,g,f,K));this.doTransform&&(this.updateTransform(),this.doTransform=!1)}c&&c();return e},addClass:function(a,g){var c=this.attr("class")||"";-1===c.indexOf(a)&&(g||(a=(c+(c?" ":"")+a).replace("  ",
" ")),this.attr("class",a));return this},hasClass:function(a){return-1!==u(this.element,"class").indexOf(a)},removeClass:function(a){u(this.element,"class",(u(this.element,"class")||"").replace(a,""));return this},symbolAttr:function(a){var g=this;B("x y r start end width height innerR anchorX anchorY".split(" "),function(c){g[c]=G(a[c],g[c])});g.attr({d:g.renderer.symbols[g.symbolName](g.x,g.y,g.width,g.height,g)})},clip:function(a){return this.attr("clip-path",a?"url("+this.renderer.url+"#"+a.id+
")":"none")},crisp:function(a,g){var c,f={},E;g=g||a.strokeWidth||0;E=Math.round(g)%2/2;a.x=Math.floor(a.x||this.x||0)+E;a.y=Math.floor(a.y||this.y||0)+E;a.width=Math.floor((a.width||this.width||0)-2*E);a.height=Math.floor((a.height||this.height||0)-2*E);k(a.strokeWidth)&&(a.strokeWidth=g);for(c in a)this[c]!==a[c]&&(this[c]=f[c]=a[c]);return f},css:function(a){var c=this.styles,f={},E=this.element,b,e,K="";b=!c;var l=["textOverflow","width"];a&&a.color&&(a.fill=a.color);if(c)for(e in a)a[e]!==c[e]&&
(f[e]=a[e],b=!0);if(b){b=this.textWidth=a&&a.width&&"text"===E.nodeName.toLowerCase()&&g(a.width)||this.textWidth;c&&(a=r(c,f));this.styles=a;b&&!Q&&this.renderer.forExport&&delete a.width;if(H&&!Q)m(this.element,a);else{c=function(a,g){return"-"+g.toLowerCase()};for(e in a)-1===x(e,l)&&(K+=e.replace(/([A-Z])/g,c)+":"+a[e]+";");K&&u(E,"style",K)}this.added&&(b&&this.renderer.buildText(this),a&&a.textOutline&&this.applyTextOutline(a.textOutline))}return this},getStyle:function(a){return O.getComputedStyle(this.element||
this,"").getPropertyValue(a)},strokeWidth:function(){var a=this.getStyle("stroke-width"),c;a.indexOf("px")===a.length-2?a=g(a):(c=v.createElementNS(R,"rect"),u(c,{width:a,"stroke-width":0}),this.element.parentNode.appendChild(c),a=c.getBBox().width,c.parentNode.removeChild(c));return a},on:function(a,g){var c=this,f=c.element;t&&"click"===a?(f.ontouchstart=function(a){c.touchEventFired=Date.now();a.preventDefault();g.call(f,a)},f.onclick=function(a){(-1===O.navigator.userAgent.indexOf("Android")||
1100<Date.now()-(c.touchEventFired||0))&&g.call(f,a)}):f["on"+a]=g;return this},setRadialReference:function(a){var g=this.renderer.gradients[this.element.gradient];this.element.radialReference=a;g&&g.radAttr&&g.animate(this.renderer.getRadialAttr(a,g.radAttr));return this},translate:function(a,g){return this.attr({translateX:a,translateY:g})},invert:function(a){this.inverted=a;this.updateTransform();return this},updateTransform:function(){var a=this.translateX||0,g=this.translateY||0,c=this.scaleX,
f=this.scaleY,E=this.inverted,e=this.rotation,b=this.element;E&&(a+=this.width,g+=this.height);a=["translate("+a+","+g+")"];E?a.push("rotate(90) scale(-1,1)"):e&&a.push("rotate("+e+" "+(b.getAttribute("x")||0)+" "+(b.getAttribute("y")||0)+")");(k(c)||k(f))&&a.push("scale("+G(c,1)+" "+G(f,1)+")");a.length&&b.setAttribute("transform",a.join(" "))},toFront:function(){var a=this.element;a.parentNode.appendChild(a);return this},align:function(a,g,f){var E,b,l,K,p={};b=this.renderer;l=b.alignedObjects;
var w,z;if(a){if(this.alignOptions=a,this.alignByTranslate=g,!f||c(f))this.alignTo=E=f||"renderer",e(l,this),l.push(this),f=null}else a=this.alignOptions,g=this.alignByTranslate,E=this.alignTo;f=G(f,b[E],b);E=a.align;b=a.verticalAlign;l=(f.x||0)+(a.x||0);K=(f.y||0)+(a.y||0);"right"===E?w=1:"center"===E&&(w=2);w&&(l+=(f.width-(a.width||0))/w);p[g?"translateX":"x"]=Math.round(l);"bottom"===b?z=1:"middle"===b&&(z=2);z&&(K+=(f.height-(a.height||0))/z);p[g?"translateY":"y"]=Math.round(K);this[this.placed?
"animate":"attr"](p);this.placed=!0;this.alignAttr=p;return this},getBBox:function(a,g){var c,f=this.renderer,E,b=this.element,e=this.styles,l,p=this.textStr,w,z=f.cache,K=f.cacheKeys,y;g=G(g,this.rotation);E=g*d;l=b&&C.prototype.getStyle.call(b,"font-size");void 0!==p&&(y=p.toString(),-1===y.indexOf("\x3c")&&(y=y.replace(/[0-9]/g,"0")),y+=["",g||0,l,e&&e.width,e&&e.textOverflow].join());y&&!a&&(c=z[y]);if(!c){if(b.namespaceURI===this.SVG_NS||f.forExport){try{(w=this.fakeTS&&function(a){B(b.querySelectorAll(".highcharts-text-outline"),
function(g){g.style.display=a})})&&w("none"),c=b.getBBox?r({},b.getBBox()):{width:b.offsetWidth,height:b.offsetHeight},w&&w("")}catch(T){}if(!c||0>c.width)c={width:0,height:0}}else c=this.htmlGetBBox();f.isSVG&&(a=c.width,f=c.height,e&&"11px"===e.fontSize&&17===Math.round(f)&&(c.height=f=14),g&&(c.width=Math.abs(f*Math.sin(E))+Math.abs(a*Math.cos(E)),c.height=Math.abs(f*Math.cos(E))+Math.abs(a*Math.sin(E))));if(y&&0<c.height){for(;250<K.length;)delete z[K.shift()];z[y]||K.push(y);z[y]=c}}return c},
show:function(a){return this.attr({visibility:a?"inherit":"visible"})},hide:function(){return this.attr({visibility:"hidden"})},fadeOut:function(a){var g=this;g.animate({opacity:0},{duration:a||150,complete:function(){g.attr({y:-9999})}})},add:function(a){var g=this.renderer,c=this.element,f;a&&(this.parentGroup=a);this.parentInverted=a&&a.inverted;void 0!==this.textStr&&g.buildText(this);this.added=!0;if(!a||a.handleZ||this.zIndex)f=this.zIndexSetter();f||(a?a.element:g.box).appendChild(c);if(this.onAdd)this.onAdd();
return this},safeRemoveChild:function(a){var g=a.parentNode;g&&g.removeChild(a)},destroy:function(){var a=this.element||{},g=this.renderer.isSVG&&"SPAN"===a.nodeName&&this.parentGroup,c,f;a.onclick=a.onmouseout=a.onmouseover=a.onmousemove=a.point=null;P(this);this.clipPath&&(this.clipPath=this.clipPath.destroy());if(this.stops){for(f=0;f<this.stops.length;f++)this.stops[f]=this.stops[f].destroy();this.stops=null}for(this.safeRemoveChild(a);g&&g.div&&0===g.div.childNodes.length;)a=g.parentGroup,this.safeRemoveChild(g.div),
delete g.div,g=a;this.alignTo&&e(this.renderer.alignedObjects,this);for(c in this)delete this[c];return null},xGetter:function(a){"circle"===this.element.nodeName&&("x"===a?a="cx":"y"===a&&(a="cy"));return this._defaultGetter(a)},_defaultGetter:function(a){a=G(this[a],this.element?this.element.getAttribute(a):null,0);/^[\-0-9\.]+$/.test(a)&&(a=parseFloat(a));return a},dSetter:function(a,g,c){a&&a.join&&(a=a.join(" "));/(NaN| {2}|^$)/.test(a)&&(a="M 0 0");c.setAttribute(g,a);this[g]=a},alignSetter:function(a){this.element.setAttribute("text-anchor",
{left:"start",center:"middle",right:"end"}[a])},opacitySetter:function(a,g,c){this[g]=a;c.setAttribute(g,a)},titleSetter:function(a){var g=this.element.getElementsByTagName("title")[0];g||(g=v.createElementNS(this.SVG_NS,"title"),this.element.appendChild(g));g.firstChild&&g.removeChild(g.firstChild);g.appendChild(v.createTextNode(String(G(a),"").replace(/<[^>]*>/g,"")))},textSetter:function(a){a!==this.textStr&&(delete this.bBox,this.textStr=a,this.added&&this.renderer.buildText(this))},fillSetter:function(a,
g,c){"string"===typeof a?c.setAttribute(g,a):a&&this.colorGradient(a,g,c)},visibilitySetter:function(a,g,c){"inherit"===a?c.removeAttribute(g):c.setAttribute(g,a)},zIndexSetter:function(a,c){var f=this.renderer,E=this.parentGroup,b=(E||f).element||f.box,e,l=this.element,w;e=this.added;var p;k(a)&&(l.zIndex=a,a=+a,this[c]===a&&(e=!1),this[c]=a);if(e){(a=this.zIndex)&&E&&(E.handleZ=!0);c=b.childNodes;for(p=0;p<c.length&&!w;p++)E=c[p],e=E.zIndex,E!==l&&(g(e)>a||!k(a)&&k(e)||0>a&&!k(e)&&b!==f.box)&&(b.insertBefore(l,
E),w=!0);w||b.appendChild(l)}return w},_defaultSetter:function(a,g,c){c.setAttribute(g,a)}};C.prototype.yGetter=C.prototype.xGetter;C.prototype.translateXSetter=C.prototype.translateYSetter=C.prototype.rotationSetter=C.prototype.verticalAlignSetter=C.prototype.scaleXSetter=C.prototype.scaleYSetter=function(a,g){this[g]=a;this.doTransform=!0};A=a.SVGRenderer=function(){this.init.apply(this,arguments)};A.prototype={Element:C,SVG_NS:R,init:function(a,g,c,f,E,b){var e;f=this.createElement("svg").attr({version:"1.1",
"class":"highcharts-root"});e=f.element;a.appendChild(e);-1===a.innerHTML.indexOf("xmlns")&&u(e,"xmlns",this.SVG_NS);this.isSVG=!0;this.box=e;this.boxWrapper=f;this.alignedObjects=[];this.url=(I||z)&&v.getElementsByTagName("base").length?O.location.href.replace(/#.*?$/,"").replace(/<[^>]*>/g,"").replace(/([\('\)])/g,"\\$1").replace(/ /g,"%20"):"";this.createElement("desc").add().element.appendChild(v.createTextNode("Created with Highstock 5.0.7"));this.defs=this.createElement("defs").add();this.allowHTML=
b;this.forExport=E;this.gradients={};this.cache={};this.cacheKeys=[];this.imgCount=0;this.setSize(g,c,!1);var l;I&&a.getBoundingClientRect&&(g=function(){m(a,{left:0,top:0});l=a.getBoundingClientRect();m(a,{left:Math.ceil(l.left)-l.left+"px",top:Math.ceil(l.top)-l.top+"px"})},g(),this.unSubPixelFix=D(O,"resize",g))},definition:function(a){function g(a,f){var E;B(N(a),function(a){var b=c.createElement(a.tagName),e,l={};for(e in a)"tagName"!==e&&"children"!==e&&"textContent"!==e&&(l[e]=a[e]);b.attr(l);
b.add(f||c.defs);a.textContent&&b.element.appendChild(v.createTextNode(a.textContent));g(a.children||[],b);E=b});return E}var c=this;return g(a)},isHidden:function(){return!this.boxWrapper.getBBox().width},destroy:function(){var a=this.defs;this.box=null;this.boxWrapper=this.boxWrapper.destroy();b(this.gradients||{});this.gradients=null;a&&(this.defs=a.destroy());this.unSubPixelFix&&this.unSubPixelFix();return this.alignedObjects=null},createElement:function(a){var g=new this.Element;g.init(this,
a);return g},draw:w,getRadialAttr:function(a,g){return{cx:a[0]-a[2]/2+g.cx*a[2],cy:a[1]-a[2]/2+g.cy*a[2],r:g.r*a[2]}},buildText:function(a){var c=a.element,f=this,E=f.forExport,b=G(a.textStr,"").toString(),e=-1!==b.indexOf("\x3c"),l=c.childNodes,w,z,y,r,t=u(c,"x"),d=a.styles,x=a.textWidth,k=d&&d.lineHeight,K=d&&d.textOutline,N=d&&"ellipsis"===d.textOverflow,h=d&&"nowrap"===d.whiteSpace,I=l.length,L=x&&!a.added&&this.box,q=function(a){return k?g(k):f.fontMetrics(void 0,a.getAttribute("style")?a:c).h},
d=[b,N,h,k,K,d&&d.fontSize,x].join();if(d!==a.textCache){for(a.textCache=d;I--;)c.removeChild(l[I]);e||K||N||x||-1!==b.indexOf(" ")?(w=/<.*class="([^"]+)".*>/,z=/<.*style="([^"]+)".*>/,y=/<.*href="(http[^"]+)".*>/,L&&L.appendChild(c),b=e?b.replace(/<(b|strong)>/g,'\x3cspan style\x3d"font-weight:bold"\x3e').replace(/<(i|em)>/g,'\x3cspan style\x3d"font-style:italic"\x3e').replace(/<a/g,"\x3cspan").replace(/<\/(b|strong|i|em|a)>/g,"\x3c/span\x3e").split(/<br.*?>/g):[b],b=p(b,function(a){return""!==a}),
B(b,function(g,b){var e,l=0;g=g.replace(/^\s+|\s+$/g,"").replace(/<span/g,"|||\x3cspan").replace(/<\/span>/g,"\x3c/span\x3e|||");e=g.split("|||");B(e,function(g){if(""!==g||1===e.length){var p={},d=v.createElementNS(f.SVG_NS,"tspan"),G,B;w.test(g)&&(G=g.match(w)[1],u(d,"class",G));z.test(g)&&(B=g.match(z)[1].replace(/(;| |^)color([ :])/,"$1fill$2"),u(d,"style",B));y.test(g)&&!E&&(u(d,"onclick",'location.href\x3d"'+g.match(y)[1]+'"'),m(d,{cursor:"pointer"}));g=(g.replace(/<(.|\n)*?>/g,"")||" ").replace(/&lt;/g,
"\x3c").replace(/&gt;/g,"\x3e");if(" "!==g){d.appendChild(v.createTextNode(g));l?p.dx=0:b&&null!==t&&(p.x=t);u(d,p);c.appendChild(d);!l&&b&&(!Q&&E&&m(d,{display:"block"}),u(d,"dy",q(d)));if(x){p=g.replace(/([^\^])-/g,"$1- ").split(" ");G=1<e.length||b||1<p.length&&!h;for(var k,K,L=[],I=q(d),P=a.rotation,n=g,H=n.length;(G||N)&&(p.length||L.length);)a.rotation=0,k=a.getBBox(!0),K=k.width,!Q&&f.forExport&&(K=f.measureSpanWidth(d.firstChild.data,a.styles)),k=K>x,void 0===r&&(r=k),N&&r?(H/=2,""===n||!k&&
.5>H?p=[]:(n=g.substring(0,n.length+(k?-1:1)*Math.ceil(H)),p=[n+(3<x?"\u2026":"")],d.removeChild(d.firstChild))):k&&1!==p.length?(d.removeChild(d.firstChild),L.unshift(p.pop())):(p=L,L=[],p.length&&!h&&(d=v.createElementNS(R,"tspan"),u(d,{dy:I,x:t}),B&&u(d,"style",B),c.appendChild(d)),K>x&&(x=K)),p.length&&d.appendChild(v.createTextNode(p.join(" ").replace(/- /g,"-")));a.rotation=P}l++}}})}),r&&a.attr("title",a.textStr),L&&L.removeChild(c),K&&a.applyTextOutline&&a.applyTextOutline(K)):c.appendChild(v.createTextNode(b.replace(/&lt;/g,
"\x3c").replace(/&gt;/g,"\x3e")))}},getContrast:function(a){a=n(a).rgba;return 510<a[0]+a[1]+a[2]?"#000000":"#FFFFFF"},button:function(a,g,c,f,E,b,e,l,p){var w=this.label(a,g,c,p,null,null,null,null,"button"),z=0;w.attr(y({padding:8,r:2},E));D(w.element,H?"mouseover":"mouseenter",function(){3!==z&&w.setState(1)});D(w.element,H?"mouseout":"mouseleave",function(){3!==z&&w.setState(z)});w.setState=function(a){1!==a&&(w.state=z=a);w.removeClass(/highcharts-button-(normal|hover|pressed|disabled)/).addClass("highcharts-button-"+
["normal","hover","pressed","disabled"][a||0])};return w.on("click",function(a){3!==z&&f.call(w,a)})},crispLine:function(a,g){a[1]===a[4]&&(a[1]=a[4]=Math.round(a[1])-g%2/2);a[2]===a[5]&&(a[2]=a[5]=Math.round(a[2])+g%2/2);return a},path:function(a){var g={};l(a)?g.d=a:f(a)&&r(g,a);return this.createElement("path").attr(g)},circle:function(a,g,c){a=f(a)?a:{x:a,y:g,r:c};g=this.createElement("circle");g.xSetter=g.ySetter=function(a,g,c){c.setAttribute("c"+g,a)};return g.attr(a)},arc:function(a,g,c,E,
b,e){f(a)&&(g=a.y,c=a.r,E=a.innerR,b=a.start,e=a.end,a=a.x);a=this.symbol("arc",a||0,g||0,c||0,c||0,{innerR:E||0,start:b||0,end:e||0});a.r=c;return a},rect:function(a,g,c,E,b,e){b=f(a)?a.r:b;e=this.createElement("rect");a=f(a)?a:void 0===a?{}:{x:a,y:g,width:Math.max(c,0),height:Math.max(E,0)};b&&(a.r=b);e.rSetter=function(a,g,c){u(c,{rx:a,ry:a})};return e.attr(a)},setSize:function(a,g,c){var f=this.alignedObjects,E=f.length;this.width=a;this.height=g;for(this.boxWrapper.animate({width:a,height:g},
{step:function(){this.attr({viewBox:"0 0 "+this.attr("width")+" "+this.attr("height")})},duration:G(c,!0)?void 0:0});E--;)f[E].align()},g:function(a){var g=this.createElement("g");return a?g.attr({"class":"highcharts-"+a}):g},image:function(a,g,c,f,E){var b={preserveAspectRatio:"none"};1<arguments.length&&r(b,{x:g,y:c,width:f,height:E});b=this.createElement("image").attr(b);b.element.setAttributeNS?b.element.setAttributeNS("http://www.w3.org/1999/xlink","href",a):b.element.setAttribute("hc-svg-href",
a);return b},symbol:function(a,g,c,f,E,b){var e=this,l,p=this.symbols[a],w=k(g)&&p&&this.symbols[a](Math.round(g),Math.round(c),f,E,b),z=/^url\((.*?)\)$/,y,d;p?(l=this.path(w),r(l,{symbolName:a,x:g,y:c,width:f,height:E}),b&&r(l,b)):z.test(a)&&(y=a.match(z)[1],l=this.image(y),l.imgwidth=G(L[y]&&L[y].width,b&&b.width),l.imgheight=G(L[y]&&L[y].height,b&&b.height),d=function(){l.attr({width:l.width,height:l.height})},B(["width","height"],function(a){l[a+"Setter"]=function(a,g){var c={},f=this["img"+g],
E="width"===g?"translateX":"translateY";this[g]=a;k(f)&&(this.element&&this.element.setAttribute(g,f),this.alignByTranslate||(c[E]=((this[g]||0)-f)/2,this.attr(c)))}}),k(g)&&l.attr({x:g,y:c}),l.isImg=!0,k(l.imgwidth)&&k(l.imgheight)?d():(l.attr({width:0,height:0}),q("img",{onload:function(){var a=h[e.chartIndex];0===this.width&&(m(this,{position:"absolute",top:"-999em"}),v.body.appendChild(this));L[y]={width:this.width,height:this.height};l.imgwidth=this.width;l.imgheight=this.height;l.element&&d();
this.parentNode&&this.parentNode.removeChild(this);e.imgCount--;if(!e.imgCount&&a&&a.onload)a.onload()},src:y}),this.imgCount++));return l},symbols:{circle:function(a,g,c,f){return this.arc(a+c/2,g+f/2,c/2,f/2,{start:0,end:2*Math.PI,open:!1})},square:function(a,g,c,f){return["M",a,g,"L",a+c,g,a+c,g+f,a,g+f,"Z"]},triangle:function(a,g,c,f){return["M",a+c/2,g,"L",a+c,g+f,a,g+f,"Z"]},"triangle-down":function(a,g,c,f){return["M",a,g,"L",a+c,g,a+c/2,g+f,"Z"]},diamond:function(a,g,c,f){return["M",a+c/2,
g,"L",a+c,g+f/2,a+c/2,g+f,a,g+f/2,"Z"]},arc:function(a,g,c,f,E){var b=E.start,e=E.r||c,l=E.r||f||c,p=E.end-.001;c=E.innerR;f=E.open;var w=Math.cos(b),z=Math.sin(b),y=Math.cos(p),p=Math.sin(p);E=E.end-b<Math.PI?0:1;e=["M",a+e*w,g+l*z,"A",e,l,0,E,1,a+e*y,g+l*p];k(c)&&e.push(f?"M":"L",a+c*y,g+c*p,"A",c,c,0,E,0,a+c*w,g+c*z);e.push(f?"":"Z");return e},callout:function(a,g,c,f,E){var b=Math.min(E&&E.r||0,c,f),e=b+6,l=E&&E.anchorX;E=E&&E.anchorY;var p;p=["M",a+b,g,"L",a+c-b,g,"C",a+c,g,a+c,g,a+c,g+b,"L",
a+c,g+f-b,"C",a+c,g+f,a+c,g+f,a+c-b,g+f,"L",a+b,g+f,"C",a,g+f,a,g+f,a,g+f-b,"L",a,g+b,"C",a,g,a,g,a+b,g];l&&l>c?E>g+e&&E<g+f-e?p.splice(13,3,"L",a+c,E-6,a+c+6,E,a+c,E+6,a+c,g+f-b):p.splice(13,3,"L",a+c,f/2,l,E,a+c,f/2,a+c,g+f-b):l&&0>l?E>g+e&&E<g+f-e?p.splice(33,3,"L",a,E+6,a-6,E,a,E-6,a,g+b):p.splice(33,3,"L",a,f/2,l,E,a,f/2,a,g+b):E&&E>f&&l>a+e&&l<a+c-e?p.splice(23,3,"L",l+6,g+f,l,g+f+6,l-6,g+f,a+b,g+f):E&&0>E&&l>a+e&&l<a+c-e&&p.splice(3,3,"L",l-6,g,l,g-6,l+6,g,c-b,g);return p}},clipRect:function(g,
c,f,E){var b=a.uniqueKey(),e=this.createElement("clipPath").attr({id:b}).add(this.defs);g=this.rect(g,c,f,E,0).add(e);g.id=b;g.clipPath=e;g.count=0;return g},text:function(a,g,c,f){var E=!Q&&this.forExport,b={};if(f&&(this.allowHTML||!this.forExport))return this.html(a,g,c);b.x=Math.round(g||0);c&&(b.y=Math.round(c));if(a||0===a)b.text=a;a=this.createElement("text").attr(b);E&&a.css({position:"absolute"});f||(a.xSetter=function(a,g,c){var f=c.getElementsByTagName("tspan"),E,b=c.getAttribute(g),e;
for(e=0;e<f.length;e++)E=f[e],E.getAttribute(g)===b&&E.setAttribute(g,a);c.setAttribute(g,a)});return a},fontMetrics:function(a,c){a=c&&C.prototype.getStyle.call(c,"font-size");a=/px/.test(a)?g(a):/em/.test(a)?parseFloat(a)*(c?this.fontMetrics(null,c.parentNode).f:16):12;c=24>a?a+3:Math.round(1.2*a);return{h:c,b:Math.round(.8*c),f:a}},rotCorr:function(a,g,c){var f=a;g&&c&&(f=Math.max(f*Math.cos(g*d),4));return{x:-a/3*Math.sin(g*d),y:f}},label:function(a,g,c,f,b,e,l,p,w){var z=this,d=z.g("button"!==
w&&"label"),t=d.text=z.text("",0,0,l).attr({zIndex:1}),G,x,v=0,N=3,h=0,L,m,I,q,P,n={},H,Q=/^url\((.*?)\)$/.test(f),O=Q,K,u,R,M;w&&d.addClass("highcharts-"+w);O=!0;K=function(){return G.strokeWidth()%2/2};u=function(){var a=t.element.style,g={};x=(void 0===L||void 0===m||P)&&k(t.textStr)&&t.getBBox();d.width=(L||x.width||0)+2*N+h;d.height=(m||x.height||0)+2*N;H=N+z.fontMetrics(a&&a.fontSize,t).b;O&&(G||(d.box=G=z.symbols[f]||Q?z.symbol(f):z.rect(),G.addClass(("button"===w?"":"highcharts-label-box")+
(w?" highcharts-"+w+"-box":"")),G.add(d),a=K(),g.x=a,g.y=(p?-H:0)+a),g.width=Math.round(d.width),g.height=Math.round(d.height),G.attr(r(g,n)),n={})};R=function(){var a=h+N,g;g=p?0:H;k(L)&&x&&("center"===P||"right"===P)&&(a+={center:.5,right:1}[P]*(L-x.width));if(a!==t.x||g!==t.y)t.attr("x",a),void 0!==g&&t.attr("y",g);t.x=a;t.y=g};M=function(a,g){G?G.attr(a,g):n[a]=g};d.onAdd=function(){t.add(d);d.attr({text:a||0===a?a:"",x:g,y:c});G&&k(b)&&d.attr({anchorX:b,anchorY:e})};d.widthSetter=function(a){L=
a};d.heightSetter=function(a){m=a};d["text-alignSetter"]=function(a){P=a};d.paddingSetter=function(a){k(a)&&a!==N&&(N=d.padding=a,R())};d.paddingLeftSetter=function(a){k(a)&&a!==h&&(h=a,R())};d.alignSetter=function(a){a={left:0,center:.5,right:1}[a];a!==v&&(v=a,x&&d.attr({x:I}))};d.textSetter=function(a){void 0!==a&&t.textSetter(a);u();R()};d["stroke-widthSetter"]=function(a,g){a&&(O=!0);this["stroke-width"]=a;M(g,a)};d.rSetter=function(a,g){M(g,a)};d.anchorXSetter=function(a,g){b=a;M(g,Math.round(a)-
K()-I)};d.anchorYSetter=function(a,g){e=a;M(g,a-q)};d.xSetter=function(a){d.x=a;v&&(a-=v*((L||x.width)+2*N));I=Math.round(a);d.attr("translateX",I)};d.ySetter=function(a){q=d.y=Math.round(a);d.attr("translateY",q)};var S=d.css;return r(d,{css:function(a){if(a){var g={};a=y(a);B(d.textProps,function(c){void 0!==a[c]&&(g[c]=a[c],delete a[c])});t.css(g)}return S.call(d,a)},getBBox:function(){return{width:x.width+2*N,height:x.height+2*N,x:x.x-N,y:x.y-N}},destroy:function(){E(d.element,"mouseenter");E(d.element,
"mouseleave");t&&(t=t.destroy());G&&(G=G.destroy());C.prototype.destroy.call(d);d=z=u=R=M=null}})}};a.Renderer=A})(J);(function(a){var C=a.attr,A=a.createElement,D=a.css,F=a.defined,u=a.each,h=a.extend,n=a.isFirefox,m=a.isMS,q=a.isWebKit,k=a.pInt,d=a.SVGRenderer,b=a.win,v=a.wrap;h(a.SVGElement.prototype,{htmlCss:function(a){var b=this.element;if(b=a&&"SPAN"===b.tagName&&a.width)delete a.width,this.textWidth=b,this.updateTransform();a&&"ellipsis"===a.textOverflow&&(a.whiteSpace="nowrap",a.overflow=
"hidden");this.styles=h(this.styles,a);D(this.element,a);return this},htmlGetBBox:function(){var a=this.element;"text"===a.nodeName&&(a.style.position="absolute");return{x:a.offsetLeft,y:a.offsetTop,width:a.offsetWidth,height:a.offsetHeight}},htmlUpdateTransform:function(){if(this.added){var a=this.renderer,b=this.element,e=this.x||0,p=this.y||0,d=this.textAlign||"left",x={left:0,center:.5,right:1}[d],l=this.styles;D(b,{marginLeft:this.translateX||0,marginTop:this.translateY||0});this.inverted&&u(b.childNodes,
function(c){a.invertChild(c,b)});if("SPAN"===b.tagName){var v=this.rotation,h=k(this.textWidth),f=l&&l.whiteSpace,c=[v,d,b.innerHTML,this.textWidth,this.textAlign].join();c!==this.cTT&&(l=a.fontMetrics(b.style.fontSize).b,F(v)&&this.setSpanRotation(v,x,l),D(b,{width:"",whiteSpace:f||"nowrap"}),b.offsetWidth>h&&/[ \-]/.test(b.textContent||b.innerText)&&D(b,{width:h+"px",display:"block",whiteSpace:f||"normal"}),this.getSpanCorrection(b.offsetWidth,l,x,v,d));D(b,{left:e+(this.xCorr||0)+"px",top:p+(this.yCorr||
0)+"px"});q&&(l=b.offsetHeight);this.cTT=c}}else this.alignOnAdd=!0},setSpanRotation:function(a,d,e){var p={},t=m?"-ms-transform":q?"-webkit-transform":n?"MozTransform":b.opera?"-o-transform":"";p[t]=p.transform="rotate("+a+"deg)";p[t+(n?"Origin":"-origin")]=p.transformOrigin=100*d+"% "+e+"px";D(this.element,p)},getSpanCorrection:function(a,b,e){this.xCorr=-a*e;this.yCorr=-b}});h(d.prototype,{html:function(a,b,e){var p=this.createElement("span"),d=p.element,r=p.renderer,l=r.isSVG,k=function(a,f){u(["opacity",
"visibility"],function(c){v(a,c+"Setter",function(a,c,b,e){a.call(this,c,b,e);f[b]=c})})};p.textSetter=function(a){a!==d.innerHTML&&delete this.bBox;d.innerHTML=this.textStr=a;p.htmlUpdateTransform()};l&&k(p,p.element.style);p.xSetter=p.ySetter=p.alignSetter=p.rotationSetter=function(a,f){"align"===f&&(f="textAlign");p[f]=a;p.htmlUpdateTransform()};p.attr({text:a,x:Math.round(b),y:Math.round(e)}).css({position:"absolute"});d.style.whiteSpace="nowrap";p.css=p.htmlCss;l&&(p.add=function(a){var f,c=
r.box.parentNode,b=[];if(this.parentGroup=a){if(f=a.div,!f){for(;a;)b.push(a),a=a.parentGroup;u(b.reverse(),function(a){var e,l=C(a.element,"class");l&&(l={className:l});f=a.div=a.div||A("div",l,{position:"absolute",left:(a.translateX||0)+"px",top:(a.translateY||0)+"px",display:a.display,opacity:a.opacity,pointerEvents:a.styles&&a.styles.pointerEvents},f||c);e=f.style;h(a,{on:function(){p.on.apply({element:b[0].div},arguments);return a},translateXSetter:function(g,c){e.left=g+"px";a[c]=g;a.doTransform=
!0},translateYSetter:function(g,c){e.top=g+"px";a[c]=g;a.doTransform=!0}});k(a,e)})}}else f=c;f.appendChild(d);p.added=!0;p.alignOnAdd&&p.htmlUpdateTransform();return p});return p}})})(J);(function(a){function C(){var h=a.defaultOptions.global,q=n.moment;if(h.timezone){if(q)return function(a){return-q.tz(a,h.timezone).utcOffset()};a.error(25)}return h.useUTC&&h.getTimezoneOffset}function A(){var m=a.defaultOptions.global,q,k=m.useUTC,d=k?"getUTC":"get",b=k?"setUTC":"set";a.Date=q=m.Date||n.Date;q.hcTimezoneOffset=
k&&m.timezoneOffset;q.hcGetTimezoneOffset=C();q.hcMakeTime=function(a,b,d,e,p,t){var r;k?(r=q.UTC.apply(0,arguments),r+=F(r)):r=(new q(a,b,h(d,1),h(e,0),h(p,0),h(t,0))).getTime();return r};D("Minutes Hours Day Date Month FullYear".split(" "),function(a){q["hcGet"+a]=d+a});D("Milliseconds Seconds Minutes Hours Date Month FullYear".split(" "),function(a){q["hcSet"+a]=b+a})}var D=a.each,F=a.getTZOffset,u=a.merge,h=a.pick,n=a.win;a.defaultOptions={symbols:["circle","diamond","square","triangle","triangle-down"],
lang:{loading:"Loading...",months:"January February March April May June July August September October November December".split(" "),shortMonths:"Jan Feb Mar Apr May Jun Jul Aug Sep Oct Nov Dec".split(" "),weekdays:"Sunday Monday Tuesday Wednesday Thursday Friday Saturday".split(" "),decimalPoint:".",numericSymbols:"kMGTPE".split(""),resetZoom:"Reset zoom",resetZoomTitle:"Reset zoom level 1:1",thousandsSep:" "},global:{useUTC:!0},chart:{borderRadius:0,colorCount:10,defaultSeriesType:"line",ignoreHiddenSeries:!0,
spacing:[10,10,15,10],resetZoomButton:{theme:{zIndex:20},position:{align:"right",x:-10,y:10}},width:null,height:null},title:{text:"Chart title",align:"center",margin:15,widthAdjust:-44},subtitle:{text:"",align:"center",widthAdjust:-44},plotOptions:{},labels:{style:{position:"absolute",color:"#333333"}},legend:{enabled:!0,align:"center",layout:"horizontal",labelFormatter:function(){return this.name},borderColor:"#999999",borderRadius:0,navigation:{},itemCheckboxStyle:{position:"absolute",width:"13px",
height:"13px"},squareSymbol:!0,symbolPadding:5,verticalAlign:"bottom",x:0,y:0,title:{}},loading:{},tooltip:{enabled:!0,animation:a.svg,borderRadius:3,dateTimeLabelFormats:{millisecond:"%A, %b %e, %H:%M:%S.%L",second:"%A, %b %e, %H:%M:%S",minute:"%A, %b %e, %H:%M",hour:"%A, %b %e, %H:%M",day:"%A, %b %e, %Y",week:"Week from %A, %b %e, %Y",month:"%B %Y",year:"%Y"},footerFormat:"",padding:8,snap:a.isTouchDevice?25:10,headerFormat:'\x3cspan class\x3d"highcharts-header"\x3e{point.key}\x3c/span\x3e\x3cbr/\x3e',
pointFormat:'\x3cspan class\x3d"highcharts-color-{point.colorIndex}"\x3e\u25cf\x3c/span\x3e {series.name}: \x3cb\x3e{point.y}\x3c/b\x3e\x3cbr/\x3e'},credits:{enabled:!0,href:"http://www.highcharts.com",position:{align:"right",x:-10,verticalAlign:"bottom",y:-5},text:"Highcharts.com"}};a.setOptions=function(h){a.defaultOptions=u(!0,a.defaultOptions,h);A();return a.defaultOptions};a.getOptions=function(){return a.defaultOptions};a.defaultPlotOptions=a.defaultOptions.plotOptions;A()})(J);(function(a){var C=
a.arrayMax,A=a.arrayMin,D=a.defined,F=a.destroyObjectProperties,u=a.each,h=a.erase,n=a.merge,m=a.pick;a.PlotLineOrBand=function(a,k){this.axis=a;k&&(this.options=k,this.id=k.id)};a.PlotLineOrBand.prototype={render:function(){var a=this,k=a.axis,d=k.horiz,b=a.options,v=b.label,B=a.label,r=b.to,e=b.from,p=b.value,t=D(e)&&D(r),x=D(p),l=a.svgElem,h=!l,H=[],f,c=m(b.zIndex,0),z=b.events,H={"class":"highcharts-plot-"+(t?"band ":"line ")+(b.className||"")},y={},w=k.chart.renderer,G=t?"bands":"lines",g;g=
k.log2lin;k.isLog&&(e=g(e),r=g(r),p=g(p));y.zIndex=c;G+="-"+c;(g=k[G])||(k[G]=g=w.g("plot-"+G).attr(y).add());h&&(a.svgElem=l=w.path().attr(H).add(g));if(x)H=k.getPlotLinePath(p,l.strokeWidth());else if(t)H=k.getPlotBandPath(e,r,b);else return;if(h&&H&&H.length){if(l.attr({d:H}),z)for(f in b=function(g){l.on(g,function(c){z[g].apply(a,[c])})},z)b(f)}else l&&(H?(l.show(),l.animate({d:H})):(l.hide(),B&&(a.label=B=B.destroy())));v&&D(v.text)&&H&&H.length&&0<k.width&&0<k.height&&!H.flat?(v=n({align:d&&
t&&"center",x:d?!t&&4:10,verticalAlign:!d&&t&&"middle",y:d?t?16:10:t?6:-4,rotation:d&&!t&&90},v),this.renderLabel(v,H,t,c)):B&&B.hide();return a},renderLabel:function(a,k,d,b){var v=this.label,B=this.axis.chart.renderer;v||(v={align:a.textAlign||a.align,rotation:a.rotation,"class":"highcharts-plot-"+(d?"band":"line")+"-label "+(a.className||"")},v.zIndex=b,this.label=v=B.text(a.text,0,0,a.useHTML).attr(v).add());b=[k[1],k[4],d?k[6]:k[1]];k=[k[2],k[5],d?k[7]:k[2]];d=A(b);B=A(k);v.align(a,!1,{x:d,y:B,
width:C(b)-d,height:C(k)-B});v.show()},destroy:function(){h(this.axis.plotLinesAndBands,this);delete this.axis;F(this)}};a.AxisPlotLineOrBandExtension={getPlotBandPath:function(a,k){k=this.getPlotLinePath(k,null,null,!0);(a=this.getPlotLinePath(a,null,null,!0))&&k?(a.flat=a.toString()===k.toString(),a.push(k[4],k[5],k[1],k[2],"z")):a=null;return a},addPlotBand:function(a){return this.addPlotBandOrLine(a,"plotBands")},addPlotLine:function(a){return this.addPlotBandOrLine(a,"plotLines")},addPlotBandOrLine:function(h,
k){var d=(new a.PlotLineOrBand(this,h)).render(),b=this.userOptions;d&&(k&&(b[k]=b[k]||[],b[k].push(h)),this.plotLinesAndBands.push(d));return d},removePlotBandOrLine:function(a){for(var k=this.plotLinesAndBands,d=this.options,b=this.userOptions,v=k.length;v--;)k[v].id===a&&k[v].destroy();u([d.plotLines||[],b.plotLines||[],d.plotBands||[],b.plotBands||[]],function(b){for(v=b.length;v--;)b[v].id===a&&h(b,b[v])})}}})(J);(function(a){var C=a.correctFloat,A=a.defined,D=a.destroyObjectProperties,F=a.isNumber,
u=a.pick,h=a.deg2rad;a.Tick=function(a,h,q,k){this.axis=a;this.pos=h;this.type=q||"";this.isNew=!0;q||k||this.addLabel()};a.Tick.prototype={addLabel:function(){var a=this.axis,h=a.options,q=a.chart,k=a.categories,d=a.names,b=this.pos,v=h.labels,B=a.tickPositions,r=b===B[0],e=b===B[B.length-1],d=k?u(k[b],d[b],b):b,k=this.label,B=B.info,p;a.isDatetimeAxis&&B&&(p=h.dateTimeLabelFormats[B.higherRanks[b]||B.unitName]);this.isFirst=r;this.isLast=e;h=a.labelFormatter.call({axis:a,chart:q,isFirst:r,isLast:e,
dateTimeLabelFormat:p,value:a.isLog?C(a.lin2log(d)):d});A(k)?k&&k.attr({text:h}):(this.labelLength=(this.label=k=A(h)&&v.enabled?q.renderer.text(h,0,0,v.useHTML).add(a.labelGroup):null)&&k.getBBox().width,this.rotation=0)},getLabelSize:function(){return this.label?this.label.getBBox()[this.axis.horiz?"height":"width"]:0},handleOverflow:function(a){var m=this.axis,n=a.x,k=m.chart.chartWidth,d=m.chart.spacing,b=u(m.labelLeft,Math.min(m.pos,d[3])),d=u(m.labelRight,Math.max(m.pos+m.len,k-d[1])),v=this.label,
B=this.rotation,r={left:0,center:.5,right:1}[m.labelAlign],e=v.getBBox().width,p=m.getSlotWidth(),t=p,x=1,l,I={};if(B)0>B&&n-r*e<b?l=Math.round(n/Math.cos(B*h)-b):0<B&&n+r*e>d&&(l=Math.round((k-n)/Math.cos(B*h)));else if(k=n+(1-r)*e,n-r*e<b?t=a.x+t*(1-r)-b:k>d&&(t=d-a.x+t*r,x=-1),t=Math.min(p,t),t<p&&"center"===m.labelAlign&&(a.x+=x*(p-t-r*(p-Math.min(e,t)))),e>t||m.autoRotation&&(v.styles||{}).width)l=t;l&&(I.width=l,(m.options.labels.style||{}).textOverflow||(I.textOverflow="ellipsis"),v.css(I))},
getPosition:function(a,h,q,k){var d=this.axis,b=d.chart,v=k&&b.oldChartHeight||b.chartHeight;return{x:a?d.translate(h+q,null,null,k)+d.transB:d.left+d.offset+(d.opposite?(k&&b.oldChartWidth||b.chartWidth)-d.right-d.left:0),y:a?v-d.bottom+d.offset-(d.opposite?d.height:0):v-d.translate(h+q,null,null,k)-d.transB}},getLabelPosition:function(a,m,q,k,d,b,v,B){var r=this.axis,e=r.transA,p=r.reversed,t=r.staggerLines,x=r.tickRotCorr||{x:0,y:0},l=d.y;A(l)||(l=0===r.side?q.rotation?-8:-q.getBBox().height:2===
r.side?x.y+8:Math.cos(q.rotation*h)*(x.y-q.getBBox(!1,0).height/2));a=a+d.x+x.x-(b&&k?b*e*(p?-1:1):0);m=m+l-(b&&!k?b*e*(p?1:-1):0);t&&(q=v/(B||1)%t,r.opposite&&(q=t-q-1),m+=r.labelOffset/t*q);return{x:a,y:Math.round(m)}},getMarkPath:function(a,h,q,k,d,b){return b.crispLine(["M",a,h,"L",a+(d?0:-q),h+(d?q:0)],k)},render:function(a,h,q){var k=this.axis,d=k.options,b=k.chart.renderer,v=k.horiz,B=this.type,r=this.label,e=this.pos,p=d.labels,t=this.gridLine,x=k.tickSize(B?B+"Tick":"tick"),l=this.mark,I=
!l,m=p.step,f={},c=!0,z=k.tickmarkOffset,y=this.getPosition(v,e,z,h),w=y.x,y=y.y,G=v&&w===k.pos+k.len||!v&&y===k.pos?-1:1;q=u(q,1);this.isActive=!0;t||(B||(f.zIndex=1),h&&(f.opacity=0),this.gridLine=t=b.path().attr(f).addClass("highcharts-"+(B?B+"-":"")+"grid-line").add(k.gridGroup));if(!h&&t&&(e=k.getPlotLinePath(e+z,t.strokeWidth()*G,h,!0)))t[this.isNew?"attr":"animate"]({d:e,opacity:q});x&&(k.opposite&&(x[0]=-x[0]),I&&(this.mark=l=b.path().addClass("highcharts-"+(B?B+"-":"")+"tick").add(k.axisGroup)),
l[I?"attr":"animate"]({d:this.getMarkPath(w,y,x[0],l.strokeWidth()*G,v,b),opacity:q}));r&&F(w)&&(r.xy=y=this.getLabelPosition(w,y,r,v,p,z,a,m),this.isFirst&&!this.isLast&&!u(d.showFirstLabel,1)||this.isLast&&!this.isFirst&&!u(d.showLastLabel,1)?c=!1:!v||k.isRadial||p.step||p.rotation||h||0===q||this.handleOverflow(y),m&&a%m&&(c=!1),c&&F(y.y)?(y.opacity=q,r[this.isNew?"attr":"animate"](y)):r.attr("y",-9999),this.isNew=!1)},destroy:function(){D(this,this.axis)}}})(J);(function(a){var C=a.addEvent,A=
a.animObject,D=a.arrayMax,F=a.arrayMin,u=a.AxisPlotLineOrBandExtension,h=a.correctFloat,n=a.defaultOptions,m=a.defined,q=a.deg2rad,k=a.destroyObjectProperties,d=a.each,b=a.extend,v=a.fireEvent,B=a.format,r=a.getMagnitude,e=a.grep,p=a.inArray,t=a.isArray,x=a.isNumber,l=a.isString,I=a.merge,H=a.normalizeTickInterval,f=a.pick,c=a.PlotLineOrBand,z=a.removeEvent,y=a.splat,w=a.syncTimeout,G=a.Tick;a.Axis=function(){this.init.apply(this,arguments)};a.Axis.prototype={defaultOptions:{dateTimeLabelFormats:{millisecond:"%H:%M:%S.%L",
second:"%H:%M:%S",minute:"%H:%M",hour:"%H:%M",day:"%e. %b",week:"%e. %b",month:"%b '%y",year:"%Y"},endOnTick:!1,labels:{enabled:!0,x:0},minPadding:.01,maxPadding:.01,minorTickLength:2,minorTickPosition:"outside",startOfWeek:1,startOnTick:!1,tickLength:10,tickmarkPlacement:"between",tickPixelInterval:100,tickPosition:"outside",title:{align:"middle"},type:"linear"},defaultYAxisOptions:{endOnTick:!0,tickPixelInterval:72,showLastLabel:!0,labels:{x:-8},maxPadding:.05,minPadding:.05,startOnTick:!0,title:{rotation:270,
text:"Values"},stackLabels:{enabled:!1,formatter:function(){return a.numberFormat(this.total,-1)}}},defaultLeftAxisOptions:{labels:{x:-15},title:{rotation:270}},defaultRightAxisOptions:{labels:{x:15},title:{rotation:90}},defaultBottomAxisOptions:{labels:{autoRotation:[-45],x:0},title:{rotation:0}},defaultTopAxisOptions:{labels:{autoRotation:[-45],x:0},title:{rotation:0}},init:function(a,c){var g=c.isX;this.chart=a;this.horiz=a.inverted?!g:g;this.isXAxis=g;this.coll=this.coll||(g?"xAxis":"yAxis");
this.opposite=c.opposite;this.side=c.side||(this.horiz?this.opposite?0:2:this.opposite?1:3);this.setOptions(c);var b=this.options,E=b.type;this.labelFormatter=b.labels.formatter||this.defaultLabelFormatter;this.userOptions=c;this.minPixelPadding=0;this.reversed=b.reversed;this.visible=!1!==b.visible;this.zoomEnabled=!1!==b.zoomEnabled;this.hasNames="category"===E||!0===b.categories;this.categories=b.categories||this.hasNames;this.names=this.names||[];this.isLog="logarithmic"===E;this.isDatetimeAxis=
"datetime"===E;this.isLinked=m(b.linkedTo);this.ticks={};this.labelEdge=[];this.minorTicks={};this.plotLinesAndBands=[];this.alternateBands={};this.len=0;this.minRange=this.userMinRange=b.minRange||b.maxZoom;this.range=b.range;this.offset=b.offset||0;this.stacks={};this.oldStacks={};this.stacksTouched=0;this.min=this.max=null;this.crosshair=f(b.crosshair,y(a.options.tooltip.crosshairs)[g?0:1],!1);var e;c=this.options.events;-1===p(this,a.axes)&&(g?a.axes.splice(a.xAxis.length,0,this):a.axes.push(this),
a[this.coll].push(this));this.series=this.series||[];a.inverted&&g&&void 0===this.reversed&&(this.reversed=!0);this.removePlotLine=this.removePlotBand=this.removePlotBandOrLine;for(e in c)C(this,e,c[e]);this.isLog&&(this.val2lin=this.log2lin,this.lin2val=this.lin2log)},setOptions:function(a){this.options=I(this.defaultOptions,"yAxis"===this.coll&&this.defaultYAxisOptions,[this.defaultTopAxisOptions,this.defaultRightAxisOptions,this.defaultBottomAxisOptions,this.defaultLeftAxisOptions][this.side],
I(n[this.coll],a))},defaultLabelFormatter:function(){var g=this.axis,c=this.value,f=g.categories,b=this.dateTimeLabelFormat,e=n.lang,l=e.numericSymbols,e=e.numericSymbolMagnitude||1E3,p=l&&l.length,w,d=g.options.labels.format,g=g.isLog?c:g.tickInterval;if(d)w=B(d,this);else if(f)w=c;else if(b)w=a.dateFormat(b,c);else if(p&&1E3<=g)for(;p--&&void 0===w;)f=Math.pow(e,p+1),g>=f&&0===10*c%f&&null!==l[p]&&0!==c&&(w=a.numberFormat(c/f,-1)+l[p]);void 0===w&&(w=1E4<=Math.abs(c)?a.numberFormat(c,-1):a.numberFormat(c,
-1,void 0,""));return w},getSeriesExtremes:function(){var a=this,c=a.chart;a.hasVisibleSeries=!1;a.dataMin=a.dataMax=a.threshold=null;a.softThreshold=!a.isXAxis;a.buildStacks&&a.buildStacks();d(a.series,function(g){if(g.visible||!c.options.chart.ignoreHiddenSeries){var b=g.options,E=b.threshold,l;a.hasVisibleSeries=!0;a.isLog&&0>=E&&(E=null);if(a.isXAxis)b=g.xData,b.length&&(g=F(b),x(g)||g instanceof Date||(b=e(b,function(a){return x(a)}),g=F(b)),a.dataMin=Math.min(f(a.dataMin,b[0]),g),a.dataMax=
Math.max(f(a.dataMax,b[0]),D(b)));else if(g.getExtremes(),l=g.dataMax,g=g.dataMin,m(g)&&m(l)&&(a.dataMin=Math.min(f(a.dataMin,g),g),a.dataMax=Math.max(f(a.dataMax,l),l)),m(E)&&(a.threshold=E),!b.softThreshold||a.isLog)a.softThreshold=!1}})},translate:function(a,c,f,b,e,l){var g=this.linkedParent||this,E=1,p=0,w=b?g.oldTransA:g.transA;b=b?g.oldMin:g.min;var d=g.minPixelPadding;e=(g.isOrdinal||g.isBroken||g.isLog&&e)&&g.lin2val;w||(w=g.transA);f&&(E*=-1,p=g.len);g.reversed&&(E*=-1,p-=E*(g.sector||g.len));
c?(a=(a*E+p-d)/w+b,e&&(a=g.lin2val(a))):(e&&(a=g.val2lin(a)),a=E*(a-b)*w+p+E*d+(x(l)?w*l:0));return a},toPixels:function(a,c){return this.translate(a,!1,!this.horiz,null,!0)+(c?0:this.pos)},toValue:function(a,c){return this.translate(a-(c?0:this.pos),!0,!this.horiz,null,!0)},getPlotLinePath:function(a,c,b,e,l){var g=this.chart,E=this.left,p=this.top,w,d,z=b&&g.oldChartHeight||g.chartHeight,y=b&&g.oldChartWidth||g.chartWidth,t;w=this.transB;var G=function(a,g,c){if(a<g||a>c)e?a=Math.min(Math.max(g,
a),c):t=!0;return a};l=f(l,this.translate(a,null,null,b));a=b=Math.round(l+w);w=d=Math.round(z-l-w);x(l)?this.horiz?(w=p,d=z-this.bottom,a=b=G(a,E,E+this.width)):(a=E,b=y-this.right,w=d=G(w,p,p+this.height)):t=!0;return t&&!e?null:g.renderer.crispLine(["M",a,w,"L",b,d],c||1)},getLinearTickPositions:function(a,c,b){var g,f=h(Math.floor(c/a)*a),E=h(Math.ceil(b/a)*a),e=[];if(c===b&&x(c))return[c];for(c=f;c<=E;){e.push(c);c=h(c+a);if(c===g)break;g=c}return e},getMinorTickPositions:function(){var a=this.options,
c=this.tickPositions,b=this.minorTickInterval,f=[],e,l=this.pointRangePadding||0;e=this.min-l;var l=this.max+l,p=l-e;if(p&&p/b<this.len/3)if(this.isLog)for(l=c.length,e=1;e<l;e++)f=f.concat(this.getLogTickPositions(b,c[e-1],c[e],!0));else if(this.isDatetimeAxis&&"auto"===a.minorTickInterval)f=f.concat(this.getTimeTicks(this.normalizeTimeTickInterval(b),e,l,a.startOfWeek));else for(c=e+(c[0]-e)%b;c<=l&&c!==f[0];c+=b)f.push(c);0!==f.length&&this.trimTicks(f,a.startOnTick,a.endOnTick);return f},adjustForMinRange:function(){var a=
this.options,c=this.min,b=this.max,e,l=this.dataMax-this.dataMin>=this.minRange,p,w,z,y,t,G;this.isXAxis&&void 0===this.minRange&&!this.isLog&&(m(a.min)||m(a.max)?this.minRange=null:(d(this.series,function(a){y=a.xData;for(w=t=a.xIncrement?1:y.length-1;0<w;w--)if(z=y[w]-y[w-1],void 0===p||z<p)p=z}),this.minRange=Math.min(5*p,this.dataMax-this.dataMin)));b-c<this.minRange&&(G=this.minRange,e=(G-b+c)/2,e=[c-e,f(a.min,c-e)],l&&(e[2]=this.isLog?this.log2lin(this.dataMin):this.dataMin),c=D(e),b=[c+G,f(a.max,
c+G)],l&&(b[2]=this.isLog?this.log2lin(this.dataMax):this.dataMax),b=F(b),b-c<G&&(e[0]=b-G,e[1]=f(a.min,b-G),c=D(e)));this.min=c;this.max=b},getClosest:function(){var a;this.categories?a=1:d(this.series,function(g){var c=g.closestPointRange,b=g.visible||!g.chart.options.chart.ignoreHiddenSeries;!g.noSharedTooltip&&m(c)&&b&&(a=m(a)?Math.min(a,c):c)});return a},nameToX:function(a){var c=t(this.categories),g=c?this.categories:this.names,b=a.options.x,f;a.series.requireSorting=!1;m(b)||(b=!1===this.options.uniqueNames?
a.series.autoIncrement():p(a.name,g));-1===b?c||(f=g.length):f=b;this.names[f]=a.name;return f},updateNames:function(){var a=this;0<this.names.length&&(this.names.length=0,this.minRange=void 0,d(this.series||[],function(c){c.xIncrement=null;if(!c.points||c.isDirtyData)c.processData(),c.generatePoints();d(c.points,function(g,b){var f;g.options&&(f=a.nameToX(g),f!==g.x&&(g.x=f,c.xData[b]=f))})}))},setAxisTranslation:function(a){var c=this,g=c.max-c.min,b=c.axisPointRange||0,e,p=0,w=0,z=c.linkedParent,
y=!!c.categories,t=c.transA,G=c.isXAxis;if(G||y||b)e=c.getClosest(),z?(p=z.minPointOffset,w=z.pointRangePadding):d(c.series,function(a){var g=y?1:G?f(a.options.pointRange,e,0):c.axisPointRange||0;a=a.options.pointPlacement;b=Math.max(b,g);c.single||(p=Math.max(p,l(a)?0:g/2),w=Math.max(w,"on"===a?0:g))}),z=c.ordinalSlope&&e?c.ordinalSlope/e:1,c.minPointOffset=p*=z,c.pointRangePadding=w*=z,c.pointRange=Math.min(b,g),G&&(c.closestPointRange=e);a&&(c.oldTransA=t);c.translationSlope=c.transA=t=c.len/(g+
w||1);c.transB=c.horiz?c.left:c.bottom;c.minPixelPadding=t*p},minFromRange:function(){return this.max-this.range},setTickInterval:function(c){var g=this,b=g.chart,e=g.options,l=g.isLog,p=g.log2lin,w=g.isDatetimeAxis,z=g.isXAxis,y=g.isLinked,t=e.maxPadding,G=e.minPadding,k=e.tickInterval,B=e.tickPixelInterval,I=g.categories,n=g.threshold,q=g.softThreshold,u,A,C,D;w||I||y||this.getTickAmount();C=f(g.userMin,e.min);D=f(g.userMax,e.max);y?(g.linkedParent=b[g.coll][e.linkedTo],b=g.linkedParent.getExtremes(),
g.min=f(b.min,b.dataMin),g.max=f(b.max,b.dataMax),e.type!==g.linkedParent.options.type&&a.error(11,1)):(!q&&m(n)&&(g.dataMin>=n?(u=n,G=0):g.dataMax<=n&&(A=n,t=0)),g.min=f(C,u,g.dataMin),g.max=f(D,A,g.dataMax));l&&(!c&&0>=Math.min(g.min,f(g.dataMin,g.min))&&a.error(10,1),g.min=h(p(g.min),15),g.max=h(p(g.max),15));g.range&&m(g.max)&&(g.userMin=g.min=C=Math.max(g.min,g.minFromRange()),g.userMax=D=g.max,g.range=null);v(g,"foundExtremes");g.beforePadding&&g.beforePadding();g.adjustForMinRange();!(I||g.axisPointRange||
g.usePercentage||y)&&m(g.min)&&m(g.max)&&(p=g.max-g.min)&&(!m(C)&&G&&(g.min-=p*G),!m(D)&&t&&(g.max+=p*t));x(e.floor)?g.min=Math.max(g.min,e.floor):x(e.softMin)&&(g.min=Math.min(g.min,e.softMin));x(e.ceiling)?g.max=Math.min(g.max,e.ceiling):x(e.softMax)&&(g.max=Math.max(g.max,e.softMax));q&&m(g.dataMin)&&(n=n||0,!m(C)&&g.min<n&&g.dataMin>=n?g.min=n:!m(D)&&g.max>n&&g.dataMax<=n&&(g.max=n));g.tickInterval=g.min===g.max||void 0===g.min||void 0===g.max?1:y&&!k&&B===g.linkedParent.options.tickPixelInterval?
k=g.linkedParent.tickInterval:f(k,this.tickAmount?(g.max-g.min)/Math.max(this.tickAmount-1,1):void 0,I?1:(g.max-g.min)*B/Math.max(g.len,B));z&&!c&&d(g.series,function(a){a.processData(g.min!==g.oldMin||g.max!==g.oldMax)});g.setAxisTranslation(!0);g.beforeSetTickPositions&&g.beforeSetTickPositions();g.postProcessTickInterval&&(g.tickInterval=g.postProcessTickInterval(g.tickInterval));g.pointRange&&!k&&(g.tickInterval=Math.max(g.pointRange,g.tickInterval));c=f(e.minTickInterval,g.isDatetimeAxis&&g.closestPointRange);
!k&&g.tickInterval<c&&(g.tickInterval=c);w||l||k||(g.tickInterval=H(g.tickInterval,null,r(g.tickInterval),f(e.allowDecimals,!(.5<g.tickInterval&&5>g.tickInterval&&1E3<g.max&&9999>g.max)),!!this.tickAmount));this.tickAmount||(g.tickInterval=g.unsquish());this.setTickPositions()},setTickPositions:function(){var a=this.options,c,b=a.tickPositions,f=a.tickPositioner,e=a.startOnTick,l=a.endOnTick,p;this.tickmarkOffset=this.categories&&"between"===a.tickmarkPlacement&&1===this.tickInterval?.5:0;this.minorTickInterval=
"auto"===a.minorTickInterval&&this.tickInterval?this.tickInterval/5:a.minorTickInterval;this.tickPositions=c=b&&b.slice();!c&&(c=this.isDatetimeAxis?this.getTimeTicks(this.normalizeTimeTickInterval(this.tickInterval,a.units),this.min,this.max,a.startOfWeek,this.ordinalPositions,this.closestPointRange,!0):this.isLog?this.getLogTickPositions(this.tickInterval,this.min,this.max):this.getLinearTickPositions(this.tickInterval,this.min,this.max),c.length>this.len&&(c=[c[0],c.pop()]),this.tickPositions=
c,f&&(f=f.apply(this,[this.min,this.max])))&&(this.tickPositions=c=f);this.trimTicks(c,e,l);this.isLinked||(this.min===this.max&&m(this.min)&&!this.tickAmount&&(p=!0,this.min-=.5,this.max+=.5),this.single=p,b||f||this.adjustTickAmount())},trimTicks:function(a,c,b){var g=a[0],f=a[a.length-1],e=this.minPointOffset||0;if(!this.isLinked){if(c)this.min=g;else for(;this.min-e>a[0];)a.shift();if(b)this.max=f;else for(;this.max+e<a[a.length-1];)a.pop();0===a.length&&m(g)&&a.push((f+g)/2)}},alignToOthers:function(){var a=
{},c,b=this.options;!1===this.chart.options.chart.alignTicks||!1===b.alignTicks||this.isLog||d(this.chart[this.coll],function(g){var b=g.options,b=[g.horiz?b.left:b.top,b.width,b.height,b.pane].join();g.series.length&&(a[b]?c=!0:a[b]=1)});return c},getTickAmount:function(){var a=this.options,c=a.tickAmount,b=a.tickPixelInterval;!m(a.tickInterval)&&this.len<b&&!this.isRadial&&!this.isLog&&a.startOnTick&&a.endOnTick&&(c=2);!c&&this.alignToOthers()&&(c=Math.ceil(this.len/b)+1);4>c&&(this.finalTickAmt=
c,c=5);this.tickAmount=c},adjustTickAmount:function(){var a=this.tickInterval,c=this.tickPositions,b=this.tickAmount,f=this.finalTickAmt,e=c&&c.length;if(e<b){for(;c.length<b;)c.push(h(c[c.length-1]+a));this.transA*=(e-1)/(b-1);this.max=c[c.length-1]}else e>b&&(this.tickInterval*=2,this.setTickPositions());if(m(f)){for(a=b=c.length;a--;)(3===f&&1===a%2||2>=f&&0<a&&a<b-1)&&c.splice(a,1);this.finalTickAmt=void 0}},setScale:function(){var a,c;this.oldMin=this.min;this.oldMax=this.max;this.oldAxisLength=
this.len;this.setAxisSize();c=this.len!==this.oldAxisLength;d(this.series,function(c){if(c.isDirtyData||c.isDirty||c.xAxis.isDirty)a=!0});c||a||this.isLinked||this.forceRedraw||this.userMin!==this.oldUserMin||this.userMax!==this.oldUserMax||this.alignToOthers()?(this.resetStacks&&this.resetStacks(),this.forceRedraw=!1,this.getSeriesExtremes(),this.setTickInterval(),this.oldUserMin=this.userMin,this.oldUserMax=this.userMax,this.isDirty||(this.isDirty=c||this.min!==this.oldMin||this.max!==this.oldMax)):
this.cleanStacks&&this.cleanStacks()},setExtremes:function(a,c,e,l,p){var g=this,w=g.chart;e=f(e,!0);d(g.series,function(a){delete a.kdTree});p=b(p,{min:a,max:c});v(g,"setExtremes",p,function(){g.userMin=a;g.userMax=c;g.eventArgs=p;e&&w.redraw(l)})},zoom:function(a,c){var g=this.dataMin,b=this.dataMax,e=this.options,l=Math.min(g,f(e.min,g)),e=Math.max(b,f(e.max,b));if(a!==this.min||c!==this.max)this.allowZoomOutside||(m(g)&&(a<l&&(a=l),a>e&&(a=e)),m(b)&&(c<l&&(c=l),c>e&&(c=e))),this.displayBtn=void 0!==
a||void 0!==c,this.setExtremes(a,c,!1,void 0,{trigger:"zoom"});return!0},setAxisSize:function(){var a=this.chart,c=this.options,b=c.offsets||[0,0,0,0],e=this.horiz,l=f(c.width,a.plotWidth-b[3]+b[1]),p=f(c.height,a.plotHeight-b[0]+b[2]),w=f(c.top,a.plotTop+b[0]),c=f(c.left,a.plotLeft+b[3]),b=/%$/;b.test(p)&&(p=Math.round(parseFloat(p)/100*a.plotHeight));b.test(w)&&(w=Math.round(parseFloat(w)/100*a.plotHeight+a.plotTop));this.left=c;this.top=w;this.width=l;this.height=p;this.bottom=a.chartHeight-p-
w;this.right=a.chartWidth-l-c;this.len=Math.max(e?l:p,0);this.pos=e?c:w},getExtremes:function(){var a=this.isLog,c=this.lin2log;return{min:a?h(c(this.min)):this.min,max:a?h(c(this.max)):this.max,dataMin:this.dataMin,dataMax:this.dataMax,userMin:this.userMin,userMax:this.userMax}},getThreshold:function(a){var c=this.isLog,g=this.lin2log,b=c?g(this.min):this.min,c=c?g(this.max):this.max;null===a?a=b:b>a?a=b:c<a&&(a=c);return this.translate(a,0,1,0,1)},autoLabelAlign:function(a){a=(f(a,0)-90*this.side+
720)%360;return 15<a&&165>a?"right":195<a&&345>a?"left":"center"},tickSize:function(a){var c=this.options,g=c[a+"Length"],b=f(c[a+"Width"],"tick"===a&&this.isXAxis?1:0);if(b&&g)return"inside"===c[a+"Position"]&&(g=-g),[g,b]},labelMetrics:function(){return this.chart.renderer.fontMetrics(this.options.labels.style&&this.options.labels.style.fontSize,this.ticks[0]&&this.ticks[0].label)},unsquish:function(){var a=this.options.labels,c=this.horiz,b=this.tickInterval,e=b,l=this.len/(((this.categories?1:
0)+this.max-this.min)/b),p,w=a.rotation,z=this.labelMetrics(),y,t=Number.MAX_VALUE,G,r=function(a){a/=l||1;a=1<a?Math.ceil(a):1;return a*b};c?(G=!a.staggerLines&&!a.step&&(m(w)?[w]:l<f(a.autoRotationLimit,80)&&a.autoRotation))&&d(G,function(a){var c;if(a===w||a&&-90<=a&&90>=a)y=r(Math.abs(z.h/Math.sin(q*a))),c=y+Math.abs(a/360),c<t&&(t=c,p=a,e=y)}):a.step||(e=r(z.h));this.autoRotation=G;this.labelRotation=f(p,w);return e},getSlotWidth:function(){var a=this.chart,c=this.horiz,b=this.options.labels,
f=Math.max(this.tickPositions.length-(this.categories?0:1),1),e=a.margin[3];return c&&2>(b.step||0)&&!b.rotation&&(this.staggerLines||1)*this.len/f||!c&&(e&&e-a.spacing[3]||.33*a.chartWidth)},renderUnsquish:function(){var a=this.chart,c=a.renderer,b=this.tickPositions,f=this.ticks,e=this.options.labels,p=this.horiz,w=this.getSlotWidth(),z=Math.max(1,Math.round(w-2*(e.padding||5))),y={},t=this.labelMetrics(),G=e.style&&e.style.textOverflow,r,x=0,k,h;l(e.rotation)||(y.rotation=e.rotation||0);d(b,function(a){(a=
f[a])&&a.labelLength>x&&(x=a.labelLength)});this.maxLabelLength=x;if(this.autoRotation)x>z&&x>t.h?y.rotation=this.labelRotation:this.labelRotation=0;else if(w&&(r={width:z+"px"},!G))for(r.textOverflow="clip",k=b.length;!p&&k--;)if(h=b[k],z=f[h].label)z.styles&&"ellipsis"===z.styles.textOverflow?z.css({textOverflow:"clip"}):f[h].labelLength>w&&z.css({width:w+"px"}),z.getBBox().height>this.len/b.length-(t.h-t.f)&&(z.specCss={textOverflow:"ellipsis"});y.rotation&&(r={width:(x>.5*a.chartHeight?.33*a.chartHeight:
a.chartHeight)+"px"},G||(r.textOverflow="ellipsis"));if(this.labelAlign=e.align||this.autoLabelAlign(this.labelRotation))y.align=this.labelAlign;d(b,function(a){var c=(a=f[a])&&a.label;c&&(c.attr(y),r&&c.css(I(r,c.specCss)),delete c.specCss,a.rotation=y.rotation)});this.tickRotCorr=c.rotCorr(t.b,this.labelRotation||0,0!==this.side)},hasData:function(){return this.hasVisibleSeries||m(this.min)&&m(this.max)&&!!this.tickPositions},addTitle:function(a){var c=this.chart.renderer,g=this.horiz,b=this.opposite,
f=this.options.title,e;this.axisTitle||((e=f.textAlign)||(e=(g?{low:"left",middle:"center",high:"right"}:{low:b?"right":"left",middle:"center",high:b?"left":"right"})[f.align]),this.axisTitle=c.text(f.text,0,0,f.useHTML).attr({zIndex:7,rotation:f.rotation||0,align:e}).addClass("highcharts-axis-title").add(this.axisGroup),this.axisTitle.isNew=!0);this.axisTitle[a?"show":"hide"](!0)},generateTick:function(a){var c=this.ticks;c[a]?c[a].addLabel():c[a]=new G(this,a)},getOffset:function(){var a=this,c=
a.chart,b=c.renderer,e=a.options,l=a.tickPositions,p=a.ticks,w=a.horiz,z=a.side,y=c.inverted?[1,0,3,2][z]:z,t,G,r=0,x,k=0,h=e.title,B=e.labels,v=0,I=c.axisOffset,c=c.clipOffset,n=[-1,1,1,-1][z],H,q=e.className,u=a.axisParent,A=this.tickSize("tick");t=a.hasData();a.showAxis=G=t||f(e.showEmpty,!0);a.staggerLines=a.horiz&&B.staggerLines;a.axisGroup||(a.gridGroup=b.g("grid").attr({zIndex:e.gridZIndex||1}).addClass("highcharts-"+this.coll.toLowerCase()+"-grid "+(q||"")).add(u),a.axisGroup=b.g("axis").attr({zIndex:e.zIndex||
2}).addClass("highcharts-"+this.coll.toLowerCase()+" "+(q||"")).add(u),a.labelGroup=b.g("axis-labels").attr({zIndex:B.zIndex||7}).addClass("highcharts-"+a.coll.toLowerCase()+"-labels "+(q||"")).add(u));if(t||a.isLinked)d(l,function(c,g){a.generateTick(c,g)}),a.renderUnsquish(),!1===B.reserveSpace||0!==z&&2!==z&&{1:"left",3:"right"}[z]!==a.labelAlign&&"center"!==a.labelAlign||d(l,function(a){v=Math.max(p[a].getLabelSize(),v)}),a.staggerLines&&(v*=a.staggerLines,a.labelOffset=v*(a.opposite?-1:1));else for(H in p)p[H].destroy(),
delete p[H];h&&h.text&&!1!==h.enabled&&(a.addTitle(G),G&&(r=a.axisTitle.getBBox()[w?"height":"width"],x=h.offset,k=m(x)?0:f(h.margin,w?5:10)));a.renderLine();a.offset=n*f(e.offset,I[z]);a.tickRotCorr=a.tickRotCorr||{x:0,y:0};b=0===z?-a.labelMetrics().h:2===z?a.tickRotCorr.y:0;k=Math.abs(v)+k;v&&(k=k-b+n*(w?f(B.y,a.tickRotCorr.y+8*n):B.x));a.axisTitleMargin=f(x,k);I[z]=Math.max(I[z],a.axisTitleMargin+r+n*a.offset,k,t&&l.length&&A?A[0]:0);e=e.offset?0:2*Math.floor(a.axisLine.strokeWidth()/2);c[y]=Math.max(c[y],
e)},getLinePath:function(a){var c=this.chart,g=this.opposite,b=this.offset,f=this.horiz,e=this.left+(g?this.width:0)+b,b=c.chartHeight-this.bottom-(g?this.height:0)+b;g&&(a*=-1);return c.renderer.crispLine(["M",f?this.left:e,f?b:this.top,"L",f?c.chartWidth-this.right:e,f?b:c.chartHeight-this.bottom],a)},renderLine:function(){this.axisLine||(this.axisLine=this.chart.renderer.path().addClass("highcharts-axis-line").add(this.axisGroup))},getTitlePosition:function(){var a=this.horiz,c=this.left,b=this.top,
f=this.len,e=this.options.title,l=a?c:b,p=this.opposite,w=this.offset,z=e.x||0,d=e.y||0,y=this.chart.renderer.fontMetrics(e.style&&e.style.fontSize,this.axisTitle).f,f={low:l+(a?0:f),middle:l+f/2,high:l+(a?f:0)}[e.align],c=(a?b+this.height:c)+(a?1:-1)*(p?-1:1)*this.axisTitleMargin+(2===this.side?y:0);return{x:a?f+z:c+(p?this.width:0)+w+z,y:a?c+d-(p?this.height:0)+w:f+d}},renderMinorTick:function(a){var c=this.chart.hasRendered&&x(this.oldMin),g=this.minorTicks;g[a]||(g[a]=new G(this,a,"minor"));c&&
g[a].isNew&&g[a].render(null,!0);g[a].render(null,!1,1)},renderTick:function(a,c){var g=this.isLinked,b=this.ticks,f=this.chart.hasRendered&&x(this.oldMin);if(!g||a>=this.min&&a<=this.max)b[a]||(b[a]=new G(this,a)),f&&b[a].isNew&&b[a].render(c,!0,.1),b[a].render(c)},render:function(){var a=this,b=a.chart,f=a.options,e=a.isLog,l=a.lin2log,p=a.isLinked,z=a.tickPositions,y=a.axisTitle,t=a.ticks,r=a.minorTicks,x=a.alternateBands,k=f.stackLabels,h=f.alternateGridColor,B=a.tickmarkOffset,v=a.axisLine,I=
a.showAxis,m=A(b.renderer.globalAnimation),n,H;a.labelEdge.length=0;a.overlap=!1;d([t,r,x],function(a){for(var c in a)a[c].isActive=!1});if(a.hasData()||p)a.minorTickInterval&&!a.categories&&d(a.getMinorTickPositions(),function(c){a.renderMinorTick(c)}),z.length&&(d(z,function(c,g){a.renderTick(c,g)}),B&&(0===a.min||a.single)&&(t[-1]||(t[-1]=new G(a,-1,null,!0)),t[-1].render(-1))),h&&d(z,function(g,f){H=void 0!==z[f+1]?z[f+1]+B:a.max-B;0===f%2&&g<a.max&&H<=a.max+(b.polar?-B:B)&&(x[g]||(x[g]=new c(a)),
n=g+B,x[g].options={from:e?l(n):n,to:e?l(H):H,color:h},x[g].render(),x[g].isActive=!0)}),a._addedPlotLB||(d((f.plotLines||[]).concat(f.plotBands||[]),function(c){a.addPlotBandOrLine(c)}),a._addedPlotLB=!0);d([t,r,x],function(a){var c,g,f=[],e=m.duration;for(c in a)a[c].isActive||(a[c].render(c,!1,0),a[c].isActive=!1,f.push(c));w(function(){for(g=f.length;g--;)a[f[g]]&&!a[f[g]].isActive&&(a[f[g]].destroy(),delete a[f[g]])},a!==x&&b.hasRendered&&e?e:0)});v&&(v[v.isPlaced?"animate":"attr"]({d:this.getLinePath(v.strokeWidth())}),
v.isPlaced=!0,v[I?"show":"hide"](!0));y&&I&&(y[y.isNew?"attr":"animate"](a.getTitlePosition()),y.isNew=!1);k&&k.enabled&&a.renderStackTotals();a.isDirty=!1},redraw:function(){this.visible&&(this.render(),d(this.plotLinesAndBands,function(a){a.render()}));d(this.series,function(a){a.isDirty=!0})},keepProps:"extKey hcEvents names series userMax userMin".split(" "),destroy:function(a){var c=this,g=c.stacks,b,f=c.plotLinesAndBands,e;a||z(c);for(b in g)k(g[b]),g[b]=null;d([c.ticks,c.minorTicks,c.alternateBands],
function(a){k(a)});if(f)for(a=f.length;a--;)f[a].destroy();d("stackTotalGroup axisLine axisTitle axisGroup gridGroup labelGroup cross".split(" "),function(a){c[a]&&(c[a]=c[a].destroy())});for(e in c)c.hasOwnProperty(e)&&-1===p(e,c.keepProps)&&delete c[e]},drawCrosshair:function(a,c){var g,b=this.crosshair,e=f(b.snap,!0),l,p=this.cross;a||(a=this.cross&&this.cross.e);this.crosshair&&!1!==(m(c)||!e)?(e?m(c)&&(l=this.isXAxis?c.plotX:this.len-c.plotY):l=a&&(this.horiz?a.chartX-this.pos:this.len-a.chartY+
this.pos),m(l)&&(g=this.getPlotLinePath(c&&(this.isXAxis?c.x:f(c.stackY,c.y)),null,null,null,l)||null),m(g)?(c=this.categories&&!this.isRadial,p||(this.cross=p=this.chart.renderer.path().addClass("highcharts-crosshair highcharts-crosshair-"+(c?"category ":"thin ")+b.className).attr({zIndex:f(b.zIndex,2)}).add()),p.show().attr({d:g}),c&&!b.width&&p.attr({"stroke-width":this.transA}),this.cross.e=a):this.hideCrosshair()):this.hideCrosshair()},hideCrosshair:function(){this.cross&&this.cross.hide()}};
b(a.Axis.prototype,u)})(J);(function(a){var C=a.Axis,A=a.Date,D=a.dateFormat,F=a.defaultOptions,u=a.defined,h=a.each,n=a.extend,m=a.getMagnitude,q=a.getTZOffset,k=a.normalizeTickInterval,d=a.pick,b=a.timeUnits;C.prototype.getTimeTicks=function(a,k,r,e){var p=[],t={},x=F.global.useUTC,l,v=new A(k-q(k)),B=A.hcMakeTime,f=a.unitRange,c=a.count,z;if(u(k)){v[A.hcSetMilliseconds](f>=b.second?0:c*Math.floor(v.getMilliseconds()/c));if(f>=b.second)v[A.hcSetSeconds](f>=b.minute?0:c*Math.floor(v.getSeconds()/
c));if(f>=b.minute)v[A.hcSetMinutes](f>=b.hour?0:c*Math.floor(v[A.hcGetMinutes]()/c));if(f>=b.hour)v[A.hcSetHours](f>=b.day?0:c*Math.floor(v[A.hcGetHours]()/c));if(f>=b.day)v[A.hcSetDate](f>=b.month?1:c*Math.floor(v[A.hcGetDate]()/c));f>=b.month&&(v[A.hcSetMonth](f>=b.year?0:c*Math.floor(v[A.hcGetMonth]()/c)),l=v[A.hcGetFullYear]());if(f>=b.year)v[A.hcSetFullYear](l-l%c);if(f===b.week)v[A.hcSetDate](v[A.hcGetDate]()-v[A.hcGetDay]()+d(e,1));l=v[A.hcGetFullYear]();e=v[A.hcGetMonth]();var y=v[A.hcGetDate](),
w=v[A.hcGetHours]();if(A.hcTimezoneOffset||A.hcGetTimezoneOffset)z=(!x||!!A.hcGetTimezoneOffset)&&(r-k>4*b.month||q(k)!==q(r)),v=v.getTime(),v=new A(v+q(v));x=v.getTime();for(k=1;x<r;)p.push(x),x=f===b.year?B(l+k*c,0):f===b.month?B(l,e+k*c):!z||f!==b.day&&f!==b.week?z&&f===b.hour?B(l,e,y,w+k*c):x+f*c:B(l,e,y+k*c*(f===b.day?1:7)),k++;p.push(x);f<=b.hour&&1E4>p.length&&h(p,function(a){0===a%18E5&&"000000000"===D("%H%M%S%L",a)&&(t[a]="day")})}p.info=n(a,{higherRanks:t,totalRange:f*c});return p};C.prototype.normalizeTimeTickInterval=
function(a,d){var r=d||[["millisecond",[1,2,5,10,20,25,50,100,200,500]],["second",[1,2,5,10,15,30]],["minute",[1,2,5,10,15,30]],["hour",[1,2,3,4,6,8,12]],["day",[1,2]],["week",[1,2]],["month",[1,2,3,4,6]],["year",null]];d=r[r.length-1];var e=b[d[0]],p=d[1],t;for(t=0;t<r.length&&!(d=r[t],e=b[d[0]],p=d[1],r[t+1]&&a<=(e*p[p.length-1]+b[r[t+1][0]])/2);t++);e===b.year&&a<5*e&&(p=[1,2,5]);a=k(a/e,p,"year"===d[0]?Math.max(m(a/e),1):1);return{unitRange:e,count:a,unitName:d[0]}}})(J);(function(a){var C=a.Axis,
A=a.getMagnitude,D=a.map,F=a.normalizeTickInterval,u=a.pick;C.prototype.getLogTickPositions=function(a,n,m,q){var k=this.options,d=this.len,b=this.lin2log,v=this.log2lin,h=[];q||(this._minorAutoInterval=null);if(.5<=a)a=Math.round(a),h=this.getLinearTickPositions(a,n,m);else if(.08<=a)for(var d=Math.floor(n),r,e,p,t,x,k=.3<a?[1,2,4]:.15<a?[1,2,4,6,8]:[1,2,3,4,5,6,7,8,9];d<m+1&&!x;d++)for(e=k.length,r=0;r<e&&!x;r++)p=v(b(d)*k[r]),p>n&&(!q||t<=m)&&void 0!==t&&h.push(t),t>m&&(x=!0),t=p;else n=b(n),m=
b(m),a=k[q?"minorTickInterval":"tickInterval"],a=u("auto"===a?null:a,this._minorAutoInterval,k.tickPixelInterval/(q?5:1)*(m-n)/((q?d/this.tickPositions.length:d)||1)),a=F(a,null,A(a)),h=D(this.getLinearTickPositions(a,n,m),v),q||(this._minorAutoInterval=a/5);q||(this.tickInterval=a);return h};C.prototype.log2lin=function(a){return Math.log(a)/Math.LN10};C.prototype.lin2log=function(a){return Math.pow(10,a)}})(J);(function(a){var C=a.dateFormat,A=a.each,D=a.extend,F=a.format,u=a.isNumber,h=a.map,n=
a.merge,m=a.pick,q=a.splat,k=a.syncTimeout,d=a.timeUnits;a.Tooltip=function(){this.init.apply(this,arguments)};a.Tooltip.prototype={init:function(a,d){this.chart=a;this.options=d;this.crosshairs=[];this.now={x:0,y:0};this.isHidden=!0;this.split=d.split&&!a.inverted;this.shared=d.shared||this.split},cleanSplit:function(a){A(this.chart.series,function(b){var d=b&&b.tt;d&&(!d.isActive||a?b.tt=d.destroy():d.isActive=!1)})},applyFilter:function(){var a=this.chart;a.renderer.definition({tagName:"filter",
id:"drop-shadow-"+a.index,opacity:.5,children:[{tagName:"feGaussianBlur",in:"SourceAlpha",stdDeviation:1},{tagName:"feOffset",dx:1,dy:1},{tagName:"feComponentTransfer",children:[{tagName:"feFuncA",type:"linear",slope:.3}]},{tagName:"feMerge",children:[{tagName:"feMergeNode"},{tagName:"feMergeNode",in:"SourceGraphic"}]}]});a.renderer.definition({tagName:"style",textContent:".highcharts-tooltip-"+a.index+"{filter:url(#drop-shadow-"+a.index+")}"})},getLabel:function(){var a=this.chart.renderer,d=this.options;
this.label||(this.label=this.split?a.g("tooltip"):a.label("",0,0,d.shape||"callout",null,null,d.useHTML,null,"tooltip").attr({padding:d.padding,r:d.borderRadius}),this.applyFilter(),this.label.addClass("highcharts-tooltip-"+this.chart.index),this.label.attr({zIndex:8}).add());return this.label},update:function(a){this.destroy();this.init(this.chart,n(!0,this.options,a))},destroy:function(){this.label&&(this.label=this.label.destroy());this.split&&this.tt&&(this.cleanSplit(this.chart,!0),this.tt=this.tt.destroy());
clearTimeout(this.hideTimer);clearTimeout(this.tooltipTimeout)},move:function(a,d,k,r){var b=this,p=b.now,t=!1!==b.options.animation&&!b.isHidden&&(1<Math.abs(a-p.x)||1<Math.abs(d-p.y)),x=b.followPointer||1<b.len;D(p,{x:t?(2*p.x+a)/3:a,y:t?(p.y+d)/2:d,anchorX:x?void 0:t?(2*p.anchorX+k)/3:k,anchorY:x?void 0:t?(p.anchorY+r)/2:r});b.getLabel().attr(p);t&&(clearTimeout(this.tooltipTimeout),this.tooltipTimeout=setTimeout(function(){b&&b.move(a,d,k,r)},32))},hide:function(a){var b=this;clearTimeout(this.hideTimer);
a=m(a,this.options.hideDelay,500);this.isHidden||(this.hideTimer=k(function(){b.getLabel()[a?"fadeOut":"hide"]();b.isHidden=!0},a))},getAnchor:function(a,d){var b,r=this.chart,e=r.inverted,p=r.plotTop,t=r.plotLeft,x=0,l=0,k,v;a=q(a);b=a[0].tooltipPos;this.followPointer&&d&&(void 0===d.chartX&&(d=r.pointer.normalize(d)),b=[d.chartX-r.plotLeft,d.chartY-p]);b||(A(a,function(a){k=a.series.yAxis;v=a.series.xAxis;x+=a.plotX+(!e&&v?v.left-t:0);l+=(a.plotLow?(a.plotLow+a.plotHigh)/2:a.plotY)+(!e&&k?k.top-
p:0)}),x/=a.length,l/=a.length,b=[e?r.plotWidth-l:x,this.shared&&!e&&1<a.length&&d?d.chartY-p:e?r.plotHeight-x:l]);return h(b,Math.round)},getPosition:function(a,d,k){var b=this.chart,e=this.distance,p={},t=k.h||0,x,l=["y",b.chartHeight,d,k.plotY+b.plotTop,b.plotTop,b.plotTop+b.plotHeight],h=["x",b.chartWidth,a,k.plotX+b.plotLeft,b.plotLeft,b.plotLeft+b.plotWidth],v=!this.followPointer&&m(k.ttBelow,!b.inverted===!!k.negative),f=function(a,c,g,b,f,l){var w=g<b-e,d=b+e+g<c,z=b-e-g;b+=e;if(v&&d)p[a]=
b;else if(!v&&w)p[a]=z;else if(w)p[a]=Math.min(l-g,0>z-t?z:z-t);else if(d)p[a]=Math.max(f,b+t+g>c?b:b+t);else return!1},c=function(a,c,g,b){var f;b<e||b>c-e?f=!1:p[a]=b<g/2?1:b>c-g/2?c-g-2:b-g/2;return f},z=function(a){var c=l;l=h;h=c;x=a},y=function(){!1!==f.apply(0,l)?!1!==c.apply(0,h)||x||(z(!0),y()):x?p.x=p.y=0:(z(!0),y())};(b.inverted||1<this.len)&&z();y();return p},defaultFormatter:function(a){var b=this.points||q(this),d;d=[a.tooltipFooterHeaderFormatter(b[0])];d=d.concat(a.bodyFormatter(b));
d.push(a.tooltipFooterHeaderFormatter(b[0],!0));return d},refresh:function(a,d){var b=this.chart,r,e,p,t={},x=[];r=this.options.formatter||this.defaultFormatter;var t=b.hoverPoints,l=this.shared;clearTimeout(this.hideTimer);this.followPointer=q(a)[0].series.tooltipOptions.followPointer;p=this.getAnchor(a,d);d=p[0];e=p[1];!l||a.series&&a.series.noSharedTooltip?t=a.getLabelConfig():(b.hoverPoints=a,t&&A(t,function(a){a.setState()}),A(a,function(a){a.setState("hover");x.push(a.getLabelConfig())}),t=
{x:a[0].category,y:a[0].y},t.points=x,a=a[0]);this.len=x.length;t=r.call(t,this);l=a.series;this.distance=m(l.tooltipOptions.distance,16);!1===t?this.hide():(r=this.getLabel(),this.isHidden&&r.attr({opacity:1}).show(),this.split?this.renderSplit(t,b.hoverPoints):(r.attr({text:t&&t.join?t.join(""):t}),r.removeClass(/highcharts-color-[\d]+/g).addClass("highcharts-color-"+m(a.colorIndex,l.colorIndex)),this.updatePosition({plotX:d,plotY:e,negative:a.negative,ttBelow:a.ttBelow,h:p[2]||0})),this.isHidden=
!1)},renderSplit:function(b,d){var k=this,r=[],e=this.chart,p=e.renderer,t=!0,x=this.options,l,h=this.getLabel();A(b.slice(0,d.length+1),function(a,b){b=d[b-1]||{isHeader:!0,plotX:d[0].plotX};var c=b.series||k,f=c.tt,y="highcharts-color-"+m(b.colorIndex,(b.series||{}).colorIndex,"none");f||(c.tt=f=p.label(null,null,null,"callout").addClass("highcharts-tooltip-box "+y).attr({padding:x.padding,r:x.borderRadius}).add(h));f.isActive=!0;f.attr({text:a});a=f.getBBox();y=a.width+f.strokeWidth();b.isHeader?
(l=a.height,y=Math.max(0,Math.min(b.plotX+e.plotLeft-y/2,e.chartWidth-y))):y=b.plotX+e.plotLeft-m(x.distance,16)-y;0>y&&(t=!1);a=(b.series&&b.series.yAxis&&b.series.yAxis.pos)+(b.plotY||0);a-=e.plotTop;r.push({target:b.isHeader?e.plotHeight+l:a,rank:b.isHeader?1:0,size:c.tt.getBBox().height+1,point:b,x:y,tt:f})});this.cleanSplit();a.distribute(r,e.plotHeight+l);A(r,function(a){var b=a.point,c=b.series;a.tt.attr({visibility:void 0===a.pos?"hidden":"inherit",x:t||b.isHeader?a.x:b.plotX+e.plotLeft+m(x.distance,
16),y:a.pos+e.plotTop,anchorX:b.isHeader?b.plotX+e.plotLeft:b.plotX+c.xAxis.pos,anchorY:b.isHeader?a.pos+e.plotTop-15:b.plotY+c.yAxis.pos})})},updatePosition:function(a){var b=this.chart,d=this.getLabel(),d=(this.options.positioner||this.getPosition).call(this,d.width,d.height,a);this.move(Math.round(d.x),Math.round(d.y||0),a.plotX+b.plotLeft,a.plotY+b.plotTop)},getDateFormat:function(a,k,h,r){var b=C("%m-%d %H:%M:%S.%L",k),p,t,x={millisecond:15,second:12,minute:9,hour:6,day:3},l="millisecond";for(t in d){if(a===
d.week&&+C("%w",k)===h&&"00:00:00.000"===b.substr(6)){t="week";break}if(d[t]>a){t=l;break}if(x[t]&&b.substr(x[t])!=="01-01 00:00:00.000".substr(x[t]))break;"week"!==t&&(l=t)}t&&(p=r[t]);return p},getXDateFormat:function(a,d,k){d=d.dateTimeLabelFormats;var b=k&&k.closestPointRange;return(b?this.getDateFormat(b,a.x,k.options.startOfWeek,d):d.day)||d.year},tooltipFooterHeaderFormatter:function(a,d){var b=d?"footer":"header";d=a.series;var k=d.tooltipOptions,e=k.xDateFormat,p=d.xAxis,t=p&&"datetime"===
p.options.type&&u(a.key),b=k[b+"Format"];t&&!e&&(e=this.getXDateFormat(a,k,p));t&&e&&(b=b.replace("{point.key}","{point.key:"+e+"}"));return F(b,{point:a,series:d})},bodyFormatter:function(a){return h(a,function(a){var b=a.series.tooltipOptions;return(b.pointFormatter||a.point.tooltipFormatter).call(a.point,b.pointFormat)})}}})(J);(function(a){var C=a.addEvent,A=a.attr,D=a.charts,F=a.css,u=a.defined,h=a.doc,n=a.each,m=a.extend,q=a.fireEvent,k=a.offset,d=a.pick,b=a.removeEvent,v=a.splat,B=a.Tooltip,
r=a.win;a.Pointer=function(a,b){this.init(a,b)};a.Pointer.prototype={init:function(a,b){this.options=b;this.chart=a;this.runChartClick=b.chart.events&&!!b.chart.events.click;this.pinchDown=[];this.lastValidTouch={};B&&b.tooltip.enabled&&(a.tooltip=new B(a,b.tooltip),this.followTouchMove=d(b.tooltip.followTouchMove,!0));this.setDOMEvents()},zoomOption:function(a){var b=this.chart,e=b.options.chart,k=e.zoomType||"",b=b.inverted;/touch/.test(a.type)&&(k=d(e.pinchType,k));this.zoomX=a=/x/.test(k);this.zoomY=
k=/y/.test(k);this.zoomHor=a&&!b||k&&b;this.zoomVert=k&&!b||a&&b;this.hasZoom=a||k},normalize:function(a,b){var e,d;a=a||r.event;a.target||(a.target=a.srcElement);d=a.touches?a.touches.length?a.touches.item(0):a.changedTouches[0]:a;b||(this.chartPosition=b=k(this.chart.container));void 0===d.pageX?(e=Math.max(a.x,a.clientX-b.left),b=a.y):(e=d.pageX-b.left,b=d.pageY-b.top);return m(a,{chartX:Math.round(e),chartY:Math.round(b)})},getCoordinates:function(a){var b={xAxis:[],yAxis:[]};n(this.chart.axes,
function(e){b[e.isXAxis?"xAxis":"yAxis"].push({axis:e,value:e.toValue(a[e.horiz?"chartX":"chartY"])})});return b},runPointActions:function(b){var e=this.chart,t=e.series,k=e.tooltip,l=k?k.shared:!1,r=!0,v=e.hoverPoint,f=e.hoverSeries,c,z,y,w=[],G;if(!l&&!f)for(c=0;c<t.length;c++)if(t[c].directTouch||!t[c].options.stickyTracking)t=[];f&&(l?f.noSharedTooltip:f.directTouch)&&v?w=[v]:(l||!f||f.options.stickyTracking||(t=[f]),n(t,function(a){z=a.noSharedTooltip&&l;y=!l&&a.directTouch;a.visible&&!z&&!y&&
d(a.options.enableMouseTracking,!0)&&(G=a.searchPoint(b,!z&&1===a.kdDimensions))&&G.series&&w.push(G)}),w.sort(function(a,c){var b=a.distX-c.distX,g=a.dist-c.dist,f=(c.series.group&&c.series.group.zIndex)-(a.series.group&&a.series.group.zIndex);return 0!==b&&l?b:0!==g?g:0!==f?f:a.series.index>c.series.index?-1:1}));if(l)for(c=w.length;c--;)(w[c].x!==w[0].x||w[c].series.noSharedTooltip)&&w.splice(c,1);if(w[0]&&(w[0]!==this.prevKDPoint||k&&k.isHidden)){if(l&&!w[0].series.noSharedTooltip){for(c=0;c<
w.length;c++)w[c].onMouseOver(b,w[c]!==(f&&f.directTouch&&v||w[0]));w.length&&k&&k.refresh(w.sort(function(a,c){return a.series.index-c.series.index}),b)}else if(k&&k.refresh(w[0],b),!f||!f.directTouch)w[0].onMouseOver(b);this.prevKDPoint=w[0];r=!1}r&&(t=f&&f.tooltipOptions.followPointer,k&&t&&!k.isHidden&&(t=k.getAnchor([{}],b),k.updatePosition({plotX:t[0],plotY:t[1]})));this.unDocMouseMove||(this.unDocMouseMove=C(h,"mousemove",function(c){if(D[a.hoverChartIndex])D[a.hoverChartIndex].pointer.onDocumentMouseMove(c)}));
n(l?w:[d(v,w[0])],function(a){n(e.axes,function(c){(!a||a.series&&a.series[c.coll]===c)&&c.drawCrosshair(b,a)})})},reset:function(a,b){var e=this.chart,d=e.hoverSeries,l=e.hoverPoint,p=e.hoverPoints,k=e.tooltip,f=k&&k.shared?p:l;a&&f&&n(v(f),function(c){c.series.isCartesian&&void 0===c.plotX&&(a=!1)});if(a)k&&f&&(k.refresh(f),l&&(l.setState(l.state,!0),n(e.axes,function(a){a.crosshair&&a.drawCrosshair(null,l)})));else{if(l)l.onMouseOut();p&&n(p,function(a){a.setState()});if(d)d.onMouseOut();k&&k.hide(b);
this.unDocMouseMove&&(this.unDocMouseMove=this.unDocMouseMove());n(e.axes,function(a){a.hideCrosshair()});this.hoverX=this.prevKDPoint=e.hoverPoints=e.hoverPoint=null}},scaleGroups:function(a,b){var e=this.chart,d;n(e.series,function(l){d=a||l.getPlotBox();l.xAxis&&l.xAxis.zoomEnabled&&l.group&&(l.group.attr(d),l.markerGroup&&(l.markerGroup.attr(d),l.markerGroup.clip(b?e.clipRect:null)),l.dataLabelsGroup&&l.dataLabelsGroup.attr(d))});e.clipRect.attr(b||e.clipBox)},dragStart:function(a){var b=this.chart;
b.mouseIsDown=a.type;b.cancelClick=!1;b.mouseDownX=this.mouseDownX=a.chartX;b.mouseDownY=this.mouseDownY=a.chartY},drag:function(a){var b=this.chart,e=b.options.chart,d=a.chartX,l=a.chartY,k=this.zoomHor,r=this.zoomVert,f=b.plotLeft,c=b.plotTop,z=b.plotWidth,y=b.plotHeight,w,G=this.selectionMarker,g=this.mouseDownX,h=this.mouseDownY,v=e.panKey&&a[e.panKey+"Key"];G&&G.touch||(d<f?d=f:d>f+z&&(d=f+z),l<c?l=c:l>c+y&&(l=c+y),this.hasDragged=Math.sqrt(Math.pow(g-d,2)+Math.pow(h-l,2)),10<this.hasDragged&&
(w=b.isInsidePlot(g-f,h-c),b.hasCartesianSeries&&(this.zoomX||this.zoomY)&&w&&!v&&!G&&(this.selectionMarker=G=b.renderer.rect(f,c,k?1:z,r?1:y,0).attr({"class":"highcharts-selection-marker",zIndex:7}).add()),G&&k&&(d-=g,G.attr({width:Math.abs(d),x:(0<d?0:d)+g})),G&&r&&(d=l-h,G.attr({height:Math.abs(d),y:(0<d?0:d)+h})),w&&!G&&e.panning&&b.pan(a,e.panning)))},drop:function(a){var b=this,e=this.chart,d=this.hasPinched;if(this.selectionMarker){var l={originalEvent:a,xAxis:[],yAxis:[]},k=this.selectionMarker,
r=k.attr?k.attr("x"):k.x,f=k.attr?k.attr("y"):k.y,c=k.attr?k.attr("width"):k.width,z=k.attr?k.attr("height"):k.height,y;if(this.hasDragged||d)n(e.axes,function(e){if(e.zoomEnabled&&u(e.min)&&(d||b[{xAxis:"zoomX",yAxis:"zoomY"}[e.coll]])){var w=e.horiz,g="touchend"===a.type?e.minPixelPadding:0,p=e.toValue((w?r:f)+g),w=e.toValue((w?r+c:f+z)-g);l[e.coll].push({axis:e,min:Math.min(p,w),max:Math.max(p,w)});y=!0}}),y&&q(e,"selection",l,function(a){e.zoom(m(a,d?{animation:!1}:null))});this.selectionMarker=
this.selectionMarker.destroy();d&&this.scaleGroups()}e&&(F(e.container,{cursor:e._cursor}),e.cancelClick=10<this.hasDragged,e.mouseIsDown=this.hasDragged=this.hasPinched=!1,this.pinchDown=[])},onContainerMouseDown:function(a){a=this.normalize(a);this.zoomOption(a);a.preventDefault&&a.preventDefault();this.dragStart(a)},onDocumentMouseUp:function(b){D[a.hoverChartIndex]&&D[a.hoverChartIndex].pointer.drop(b)},onDocumentMouseMove:function(a){var b=this.chart,e=this.chartPosition;a=this.normalize(a,e);
!e||this.inClass(a.target,"highcharts-tracker")||b.isInsidePlot(a.chartX-b.plotLeft,a.chartY-b.plotTop)||this.reset()},onContainerMouseLeave:function(b){var e=D[a.hoverChartIndex];e&&(b.relatedTarget||b.toElement)&&(e.pointer.reset(),e.pointer.chartPosition=null)},onContainerMouseMove:function(b){var e=this.chart;u(a.hoverChartIndex)&&D[a.hoverChartIndex]&&D[a.hoverChartIndex].mouseIsDown||(a.hoverChartIndex=e.index);b=this.normalize(b);b.returnValue=!1;"mousedown"===e.mouseIsDown&&this.drag(b);!this.inClass(b.target,
"highcharts-tracker")&&!e.isInsidePlot(b.chartX-e.plotLeft,b.chartY-e.plotTop)||e.openMenu||this.runPointActions(b)},inClass:function(a,b){for(var e;a;){if(e=A(a,"class")){if(-1!==e.indexOf(b))return!0;if(-1!==e.indexOf("highcharts-container"))return!1}a=a.parentNode}},onTrackerMouseOut:function(a){var b=this.chart.hoverSeries;a=a.relatedTarget||a.toElement;if(!(!b||!a||b.options.stickyTracking||this.inClass(a,"highcharts-tooltip")||this.inClass(a,"highcharts-series-"+b.index)&&this.inClass(a,"highcharts-tracker")))b.onMouseOut()},
onContainerClick:function(a){var b=this.chart,e=b.hoverPoint,d=b.plotLeft,l=b.plotTop;a=this.normalize(a);b.cancelClick||(e&&this.inClass(a.target,"highcharts-tracker")?(q(e.series,"click",m(a,{point:e})),b.hoverPoint&&e.firePointEvent("click",a)):(m(a,this.getCoordinates(a)),b.isInsidePlot(a.chartX-d,a.chartY-l)&&q(b,"click",a)))},setDOMEvents:function(){var b=this,d=b.chart.container;d.onmousedown=function(a){b.onContainerMouseDown(a)};d.onmousemove=function(a){b.onContainerMouseMove(a)};d.onclick=
function(a){b.onContainerClick(a)};C(d,"mouseleave",b.onContainerMouseLeave);1===a.chartCount&&C(h,"mouseup",b.onDocumentMouseUp);a.hasTouch&&(d.ontouchstart=function(a){b.onContainerTouchStart(a)},d.ontouchmove=function(a){b.onContainerTouchMove(a)},1===a.chartCount&&C(h,"touchend",b.onDocumentTouchEnd))},destroy:function(){var e;b(this.chart.container,"mouseleave",this.onContainerMouseLeave);a.chartCount||(b(h,"mouseup",this.onDocumentMouseUp),b(h,"touchend",this.onDocumentTouchEnd));clearInterval(this.tooltipTimeout);
for(e in this)this[e]=null}}})(J);(function(a){var C=a.charts,A=a.each,D=a.extend,F=a.map,u=a.noop,h=a.pick;D(a.Pointer.prototype,{pinchTranslate:function(a,h,q,k,d,b){this.zoomHor&&this.pinchTranslateDirection(!0,a,h,q,k,d,b);this.zoomVert&&this.pinchTranslateDirection(!1,a,h,q,k,d,b)},pinchTranslateDirection:function(a,h,q,k,d,b,v,B){var r=this.chart,e=a?"x":"y",p=a?"X":"Y",t="chart"+p,x=a?"width":"height",l=r["plot"+(a?"Left":"Top")],n,m,f=B||1,c=r.inverted,z=r.bounds[a?"h":"v"],y=1===h.length,
w=h[0][t],G=q[0][t],g=!y&&h[1][t],E=!y&&q[1][t],u;q=function(){!y&&20<Math.abs(w-g)&&(f=B||Math.abs(G-E)/Math.abs(w-g));m=(l-G)/f+w;n=r["plot"+(a?"Width":"Height")]/f};q();h=m;h<z.min?(h=z.min,u=!0):h+n>z.max&&(h=z.max-n,u=!0);u?(G-=.8*(G-v[e][0]),y||(E-=.8*(E-v[e][1])),q()):v[e]=[G,E];c||(b[e]=m-l,b[x]=n);b=c?1/f:f;d[x]=n;d[e]=h;k[c?a?"scaleY":"scaleX":"scale"+p]=f;k["translate"+p]=b*l+(G-b*w)},pinch:function(a){var m=this,n=m.chart,k=m.pinchDown,d=a.touches,b=d.length,v=m.lastValidTouch,B=m.hasZoom,
r=m.selectionMarker,e={},p=1===b&&(m.inClass(a.target,"highcharts-tracker")&&n.runTrackerClick||m.runChartClick),t={};1<b&&(m.initiated=!0);B&&m.initiated&&!p&&a.preventDefault();F(d,function(a){return m.normalize(a)});"touchstart"===a.type?(A(d,function(a,b){k[b]={chartX:a.chartX,chartY:a.chartY}}),v.x=[k[0].chartX,k[1]&&k[1].chartX],v.y=[k[0].chartY,k[1]&&k[1].chartY],A(n.axes,function(a){if(a.zoomEnabled){var b=n.bounds[a.horiz?"h":"v"],e=a.minPixelPadding,d=a.toPixels(h(a.options.min,a.dataMin)),
f=a.toPixels(h(a.options.max,a.dataMax)),c=Math.max(d,f);b.min=Math.min(a.pos,Math.min(d,f)-e);b.max=Math.max(a.pos+a.len,c+e)}}),m.res=!0):m.followTouchMove&&1===b?this.runPointActions(m.normalize(a)):k.length&&(r||(m.selectionMarker=r=D({destroy:u,touch:!0},n.plotBox)),m.pinchTranslate(k,d,e,r,t,v),m.hasPinched=B,m.scaleGroups(e,t),m.res&&(m.res=!1,this.reset(!1,0)))},touch:function(n,m){var q=this.chart,k,d;if(q.index!==a.hoverChartIndex)this.onContainerMouseLeave({relatedTarget:!0});a.hoverChartIndex=
q.index;1===n.touches.length?(n=this.normalize(n),(d=q.isInsidePlot(n.chartX-q.plotLeft,n.chartY-q.plotTop))&&!q.openMenu?(m&&this.runPointActions(n),"touchmove"===n.type&&(m=this.pinchDown,k=m[0]?4<=Math.sqrt(Math.pow(m[0].chartX-n.chartX,2)+Math.pow(m[0].chartY-n.chartY,2)):!1),h(k,!0)&&this.pinch(n)):m&&this.reset()):2===n.touches.length&&this.pinch(n)},onContainerTouchStart:function(a){this.zoomOption(a);this.touch(a,!0)},onContainerTouchMove:function(a){this.touch(a)},onDocumentTouchEnd:function(h){C[a.hoverChartIndex]&&
C[a.hoverChartIndex].pointer.drop(h)}})})(J);(function(a){var C=a.addEvent,A=a.charts,D=a.css,F=a.doc,u=a.extend,h=a.noop,n=a.Pointer,m=a.removeEvent,q=a.win,k=a.wrap;if(q.PointerEvent||q.MSPointerEvent){var d={},b=!!q.PointerEvent,v=function(){var a,b=[];b.item=function(a){return this[a]};for(a in d)d.hasOwnProperty(a)&&b.push({pageX:d[a].pageX,pageY:d[a].pageY,target:d[a].target});return b},B=function(b,e,d,k){"touch"!==b.pointerType&&b.pointerType!==b.MSPOINTER_TYPE_TOUCH||!A[a.hoverChartIndex]||
(k(b),k=A[a.hoverChartIndex].pointer,k[e]({type:d,target:b.currentTarget,preventDefault:h,touches:v()}))};u(n.prototype,{onContainerPointerDown:function(a){B(a,"onContainerTouchStart","touchstart",function(a){d[a.pointerId]={pageX:a.pageX,pageY:a.pageY,target:a.currentTarget}})},onContainerPointerMove:function(a){B(a,"onContainerTouchMove","touchmove",function(a){d[a.pointerId]={pageX:a.pageX,pageY:a.pageY};d[a.pointerId].target||(d[a.pointerId].target=a.currentTarget)})},onDocumentPointerUp:function(a){B(a,
"onDocumentTouchEnd","touchend",function(a){delete d[a.pointerId]})},batchMSEvents:function(a){a(this.chart.container,b?"pointerdown":"MSPointerDown",this.onContainerPointerDown);a(this.chart.container,b?"pointermove":"MSPointerMove",this.onContainerPointerMove);a(F,b?"pointerup":"MSPointerUp",this.onDocumentPointerUp)}});k(n.prototype,"init",function(a,b,d){a.call(this,b,d);this.hasZoom&&D(b.container,{"-ms-touch-action":"none","touch-action":"none"})});k(n.prototype,"setDOMEvents",function(a){a.apply(this);
(this.hasZoom||this.followTouchMove)&&this.batchMSEvents(C)});k(n.prototype,"destroy",function(a){this.batchMSEvents(m);a.call(this)})}})(J);(function(a){var C,A=a.addEvent,D=a.css,F=a.discardElement,u=a.defined,h=a.each,n=a.extend,m=a.isFirefox,q=a.marginNames,k=a.merge,d=a.pick,b=a.setAnimation,v=a.stableSort,B=a.win,r=a.wrap;C=a.Legend=function(a,b){this.init(a,b)};C.prototype={init:function(a,b){this.chart=a;this.setOptions(b);b.enabled&&(this.render(),A(this.chart,"endResize",function(){this.legend.positionCheckboxes()}))},
setOptions:function(a){var b=d(a.padding,8);this.options=a;this.itemMarginTop=a.itemMarginTop||0;this.initialItemX=this.padding=b;this.initialItemY=b-5;this.itemHeight=this.maxItemWidth=0;this.symbolWidth=d(a.symbolWidth,16);this.pages=[]},update:function(a,b){var e=this.chart;this.setOptions(k(!0,this.options,a));this.destroy();e.isDirtyLegend=e.isDirtyBox=!0;d(b,!0)&&e.redraw()},colorizeItem:function(a,b){a.legendGroup[b?"removeClass":"addClass"]("highcharts-legend-item-hidden")},positionItem:function(a){var b=
this.options,e=b.symbolPadding,b=!b.rtl,d=a._legendItemPos,l=d[0],d=d[1],k=a.checkbox;(a=a.legendGroup)&&a.element&&a.translate(b?l:this.legendWidth-l-2*e-4,d);k&&(k.x=l,k.y=d)},destroyItem:function(a){var b=a.checkbox;h(["legendItem","legendLine","legendSymbol","legendGroup"],function(b){a[b]&&(a[b]=a[b].destroy())});b&&F(a.checkbox)},destroy:function(){function a(a){this[a]&&(this[a]=this[a].destroy())}h(this.getAllItems(),function(b){h(["legendItem","legendGroup"],a,b)});h(["box","title","group"],
a,this);this.display=null},positionCheckboxes:function(a){var b=this.group&&this.group.alignAttr,e,d=this.clipHeight||this.legendHeight,l=this.titleHeight;b&&(e=b.translateY,h(this.allItems,function(k){var p=k.checkbox,f;p&&(f=e+l+p.y+(a||0)+3,D(p,{left:b.translateX+k.checkboxOffset+p.x-20+"px",top:f+"px",display:f>e-6&&f<e+d-6?"":"none"}))}))},renderTitle:function(){var a=this.padding,b=this.options.title,d=0;b.text&&(this.title||(this.title=this.chart.renderer.label(b.text,a-3,a-4,null,null,null,
null,null,"legend-title").attr({zIndex:1}).add(this.group)),a=this.title.getBBox(),d=a.height,this.offsetWidth=a.width,this.contentGroup.attr({translateY:d}));this.titleHeight=d},setText:function(b){var e=this.options;b.legendItem.attr({text:e.labelFormat?a.format(e.labelFormat,b):e.labelFormatter.call(b)})},renderItem:function(a){var b=this.chart,e=b.renderer,k=this.options,l="horizontal"===k.layout,h=this.symbolWidth,r=k.symbolPadding,f=this.padding,c=l?d(k.itemDistance,20):0,z=!k.rtl,y=k.width,
w=k.itemMarginBottom||0,G=this.itemMarginTop,g=this.initialItemX,v=a.legendItem,m=!a.series,n=!m&&a.series.drawLegendSymbol?a.series:a,B=n.options,B=this.createCheckboxForItem&&B&&B.showCheckbox,q=k.useHTML;v||(a.legendGroup=e.g("legend-item").addClass("highcharts-"+n.type+"-series highcharts-color-"+a.colorIndex+(a.options.className?" "+a.options.className:"")+(m?" highcharts-series-"+a.index:"")).attr({zIndex:1}).add(this.scrollGroup),a.legendItem=v=e.text("",z?h+r:-r,this.baseline||0,q).attr({align:z?
"left":"right",zIndex:2}).add(a.legendGroup),this.baseline||(this.fontMetrics=e.fontMetrics(12,v),this.baseline=this.fontMetrics.f+3+G,v.attr("y",this.baseline)),this.symbolHeight=k.symbolHeight||this.fontMetrics.f,n.drawLegendSymbol(this,a),this.setItemEvents&&this.setItemEvents(a,v,q),B&&this.createCheckboxForItem(a));this.colorizeItem(a,a.visible);this.setText(a);e=v.getBBox();h=a.checkboxOffset=k.itemWidth||a.legendItemWidth||h+r+e.width+c+(B?20:0);this.itemHeight=r=Math.round(a.legendItemHeight||
e.height);l&&this.itemX-g+h>(y||b.chartWidth-2*f-g-k.x)&&(this.itemX=g,this.itemY+=G+this.lastLineHeight+w,this.lastLineHeight=0);this.maxItemWidth=Math.max(this.maxItemWidth,h);this.lastItemY=G+this.itemY+w;this.lastLineHeight=Math.max(r,this.lastLineHeight);a._legendItemPos=[this.itemX,this.itemY];l?this.itemX+=h:(this.itemY+=G+r+w,this.lastLineHeight=r);this.offsetWidth=y||Math.max((l?this.itemX-g-c:h)+f,this.offsetWidth)},getAllItems:function(){var a=[];h(this.chart.series,function(b){var e=b&&
b.options;b&&d(e.showInLegend,u(e.linkedTo)?!1:void 0,!0)&&(a=a.concat(b.legendItems||("point"===e.legendType?b.data:b)))});return a},adjustMargins:function(a,b){var e=this.chart,k=this.options,l=k.align.charAt(0)+k.verticalAlign.charAt(0)+k.layout.charAt(0);k.floating||h([/(lth|ct|rth)/,/(rtv|rm|rbv)/,/(rbh|cb|lbh)/,/(lbv|lm|ltv)/],function(p,h){p.test(l)&&!u(a[h])&&(e[q[h]]=Math.max(e[q[h]],e.legend[(h+1)%2?"legendHeight":"legendWidth"]+[1,-1,-1,1][h]*k[h%2?"x":"y"]+d(k.margin,12)+b[h]))})},render:function(){var a=
this,b=a.chart,d=b.renderer,k=a.group,l,r,m,f,c=a.box,z=a.options,y=a.padding;a.itemX=a.initialItemX;a.itemY=a.initialItemY;a.offsetWidth=0;a.lastItemY=0;k||(a.group=k=d.g("legend").attr({zIndex:7}).add(),a.contentGroup=d.g().attr({zIndex:1}).add(k),a.scrollGroup=d.g().add(a.contentGroup));a.renderTitle();l=a.getAllItems();v(l,function(a,c){return(a.options&&a.options.legendIndex||0)-(c.options&&c.options.legendIndex||0)});z.reversed&&l.reverse();a.allItems=l;a.display=r=!!l.length;a.lastLineHeight=
0;h(l,function(c){a.renderItem(c)});m=(z.width||a.offsetWidth)+y;f=a.lastItemY+a.lastLineHeight+a.titleHeight;f=a.handleOverflow(f);f+=y;c||(a.box=c=d.rect().addClass("highcharts-legend-box").attr({r:z.borderRadius}).add(k),c.isNew=!0);0<m&&0<f&&(c[c.isNew?"attr":"animate"](c.crisp({x:0,y:0,width:m,height:f},c.strokeWidth())),c.isNew=!1);c[r?"show":"hide"]();"none"===k.getStyle("display")&&(m=f=0);a.legendWidth=m;a.legendHeight=f;h(l,function(c){a.positionItem(c)});r&&k.align(n({width:m,height:f},
z),!0,"spacingBox");b.isResizing||this.positionCheckboxes()},handleOverflow:function(a){var b=this,e=this.chart,k=e.renderer,l=this.options,r=l.y,e=e.spacingBox.height+("top"===l.verticalAlign?-r:r)-this.padding,r=l.maxHeight,v,f=this.clipRect,c=l.navigation,z=d(c.animation,!0),y=c.arrowSize||12,w=this.nav,G=this.pages,g=this.padding,m,B=this.allItems,n=function(a){a?f.attr({height:a}):f&&(b.clipRect=f.destroy(),b.contentGroup.clip());b.contentGroup.div&&(b.contentGroup.div.style.clip=a?"rect("+g+
"px,9999px,"+(g+a)+"px,0)":"auto")};"horizontal"!==l.layout||"middle"===l.verticalAlign||l.floating||(e/=2);r&&(e=Math.min(e,r));G.length=0;a>e&&!1!==c.enabled?(this.clipHeight=v=Math.max(e-20-this.titleHeight-g,0),this.currentPage=d(this.currentPage,1),this.fullHeight=a,h(B,function(a,c){var b=a._legendItemPos[1];a=Math.round(a.legendItem.getBBox().height);var g=G.length;if(!g||b-G[g-1]>v&&(m||b)!==G[g-1])G.push(m||b),g++;c===B.length-1&&b+a-G[g-1]>v&&G.push(b);b!==m&&(m=b)}),f||(f=b.clipRect=k.clipRect(0,
g,9999,0),b.contentGroup.clip(f)),n(v),w||(this.nav=w=k.g().attr({zIndex:1}).add(this.group),this.up=k.symbol("triangle",0,0,y,y).on("click",function(){b.scroll(-1,z)}).add(w),this.pager=k.text("",15,10).addClass("highcharts-legend-navigation").add(w),this.down=k.symbol("triangle-down",0,0,y,y).on("click",function(){b.scroll(1,z)}).add(w)),b.scroll(0),a=e):w&&(n(),w.hide(),this.scrollGroup.attr({translateY:1}),this.clipHeight=0);return a},scroll:function(a,d){var e=this.pages,k=e.length;a=this.currentPage+
a;var l=this.clipHeight,p=this.pager,r=this.padding;a>k&&(a=k);0<a&&(void 0!==d&&b(d,this.chart),this.nav.attr({translateX:r,translateY:l+this.padding+7+this.titleHeight,visibility:"visible"}),this.up.attr({"class":1===a?"highcharts-legend-nav-inactive":"highcharts-legend-nav-active"}),p.attr({text:a+"/"+k}),this.down.attr({x:18+this.pager.getBBox().width,"class":a===k?"highcharts-legend-nav-inactive":"highcharts-legend-nav-active"}),d=-e[a-1]+this.initialItemY,this.scrollGroup.animate({translateY:d}),
this.currentPage=a,this.positionCheckboxes(d))}};a.LegendSymbolMixin={drawRectangle:function(a,b){var e=a.symbolHeight,k=a.options.squareSymbol;b.legendSymbol=this.chart.renderer.rect(k?(a.symbolWidth-e)/2:0,a.baseline-e+1,k?e:a.symbolWidth,e,d(a.options.symbolRadius,e/2)).addClass("highcharts-point").attr({zIndex:3}).add(b.legendGroup)},drawLineMarker:function(a){var b=this.options.marker,e,r=a.symbolWidth,l=a.symbolHeight;e=l/2;var h=this.chart.renderer,v=this.legendGroup;a=a.baseline-Math.round(.3*
a.fontMetrics.b);this.legendLine=h.path(["M",0,a,"L",r,a]).addClass("highcharts-graph").attr({}).add(v);b&&!1!==b.enabled&&(e=Math.min(d(b.radius,e),e),0===this.symbol.indexOf("url")&&(b=k(b,{width:l,height:l}),e=0),this.legendSymbol=b=h.symbol(this.symbol,r/2-e,a-e,2*e,2*e,b).addClass("highcharts-point").add(v),b.isMarker=!0)}};(/Trident\/7\.0/.test(B.navigator.userAgent)||m)&&r(C.prototype,"positionItem",function(a,b){var d=this,e=function(){b._legendItemPos&&a.call(d,b)};e();setTimeout(e)})})(J);
(function(a){var C=a.addEvent,A=a.animObject,D=a.attr,F=a.doc,u=a.Axis,h=a.createElement,n=a.defaultOptions,m=a.discardElement,q=a.charts,k=a.css,d=a.defined,b=a.each,v=a.extend,B=a.find,r=a.fireEvent,e=a.getStyle,p=a.grep,t=a.isNumber,x=a.isObject,l=a.isString,I=a.Legend,H=a.marginNames,f=a.merge,c=a.Pointer,z=a.pick,y=a.pInt,w=a.removeEvent,G=a.seriesTypes,g=a.splat,E=a.svg,N=a.syncTimeout,P=a.win,Q=a.Renderer,R=a.Chart=function(){this.getArgs.apply(this,arguments)};a.chart=function(a,c,b){return new R(a,
c,b)};R.prototype={callbacks:[],getArgs:function(){var a=[].slice.call(arguments);if(l(a[0])||a[0].nodeName)this.renderTo=a.shift();this.init(a[0],a[1])},init:function(c,b){var g,d=c.series;c.series=null;g=f(n,c);g.series=c.series=d;this.userOptions=c;this.respRules=[];c=g.chart;d=c.events;this.margin=[];this.spacing=[];this.bounds={h:{},v:{}};this.callback=b;this.isResizing=0;this.options=g;this.axes=[];this.series=[];this.hasCartesianSeries=c.showAxes;var l;this.index=q.length;q.push(this);a.chartCount++;
if(d)for(l in d)C(this,l,d[l]);this.xAxis=[];this.yAxis=[];this.pointCount=this.colorCounter=this.symbolCounter=0;this.firstRender()},initSeries:function(c){var b=this.options.chart;(b=G[c.type||b.type||b.defaultSeriesType])||a.error(17,!0);b=new b;b.init(this,c);return b},orderSeries:function(a){var c=this.series;for(a=a||0;a<c.length;a++)c[a]&&(c[a].index=a,c[a].name=c[a].name||"Series "+(c[a].index+1))},isInsidePlot:function(a,c,b){var g=b?c:a;a=b?a:c;return 0<=g&&g<=this.plotWidth&&0<=a&&a<=this.plotHeight},
redraw:function(c){var g=this.axes,f=this.series,d=this.pointer,l=this.legend,e=this.isDirtyLegend,w,z,k=this.hasCartesianSeries,y=this.isDirtyBox,G=f.length,p=G,h=this.renderer,t=h.isHidden(),m=[];this.setResponsive&&this.setResponsive(!1);a.setAnimation(c,this);t&&this.cloneRenderTo();for(this.layOutTitles();p--;)if(c=f[p],c.options.stacking&&(w=!0,c.isDirty)){z=!0;break}if(z)for(p=G;p--;)c=f[p],c.options.stacking&&(c.isDirty=!0);b(f,function(a){a.isDirty&&"point"===a.options.legendType&&(a.updateTotals&&
a.updateTotals(),e=!0);a.isDirtyData&&r(a,"updatedData")});e&&l.options.enabled&&(l.render(),this.isDirtyLegend=!1);w&&this.getStacks();k&&b(g,function(a){a.updateNames();a.setScale()});this.getMargins();k&&(b(g,function(a){a.isDirty&&(y=!0)}),b(g,function(a){var c=a.min+","+a.max;a.extKey!==c&&(a.extKey=c,m.push(function(){r(a,"afterSetExtremes",v(a.eventArgs,a.getExtremes()));delete a.eventArgs}));(y||w)&&a.redraw()}));y&&this.drawChartBox();r(this,"predraw");b(f,function(a){(y||a.isDirty)&&a.visible&&
a.redraw();a.isDirtyData=!1});d&&d.reset(!0);h.draw();r(this,"redraw");r(this,"render");t&&this.cloneRenderTo(!0);b(m,function(a){a.call()})},get:function(a){function c(c){return c.id===a||c.options&&c.options.id===a}var b,g=this.series,f;b=B(this.axes,c)||B(this.series,c);for(f=0;!b&&f<g.length;f++)b=B(g[f].points||[],c);return b},getAxes:function(){var a=this,c=this.options,f=c.xAxis=g(c.xAxis||{}),c=c.yAxis=g(c.yAxis||{});b(f,function(a,c){a.index=c;a.isX=!0});b(c,function(a,c){a.index=c});f=f.concat(c);
b(f,function(c){new u(a,c)})},getSelectedPoints:function(){var a=[];b(this.series,function(c){a=a.concat(p(c.points||[],function(a){return a.selected}))});return a},getSelectedSeries:function(){return p(this.series,function(a){return a.selected})},setTitle:function(a,c,g){var d=this,l=d.options,e;e=l.title=f(l.title,a);l=l.subtitle=f(l.subtitle,c);b([["title",a,e],["subtitle",c,l]],function(a,c){var b=a[0],g=d[b],f=a[1];a=a[2];g&&f&&(d[b]=g=g.destroy());a&&a.text&&!g&&(d[b]=d.renderer.text(a.text,
0,0,a.useHTML).attr({align:a.align,"class":"highcharts-"+b,zIndex:a.zIndex||4}).add(),d[b].update=function(a){d.setTitle(!c&&a,c&&a)})});d.layOutTitles(g)},layOutTitles:function(a){var c=0,g,f=this.renderer,d=this.spacingBox;b(["title","subtitle"],function(a){var b=this[a],g=this.options[a],l;b&&(l=f.fontMetrics(l,b).b,b.css({width:(g.width||d.width+g.widthAdjust)+"px"}).align(v({y:c+l+("title"===a?-3:2)},g),!1,"spacingBox"),g.floating||g.verticalAlign||(c=Math.ceil(c+b.getBBox().height)))},this);
g=this.titleOffset!==c;this.titleOffset=c;!this.isDirtyBox&&g&&(this.isDirtyBox=g,this.hasRendered&&z(a,!0)&&this.isDirtyBox&&this.redraw())},getChartSize:function(){var a=this.options.chart,c=a.width,a=a.height,b=this.renderToClone||this.renderTo;d(c)||(this.containerWidth=e(b,"width"));d(a)||(this.containerHeight=e(b,"height"));this.chartWidth=Math.max(0,c||this.containerWidth||600);this.chartHeight=Math.max(0,a||this.containerHeight||400)},cloneRenderTo:function(a){var c=this.renderToClone,b=this.container;
if(a){if(c){for(;c.childNodes.length;)this.renderTo.appendChild(c.firstChild);m(c);delete this.renderToClone}}else b&&b.parentNode===this.renderTo&&this.renderTo.removeChild(b),this.renderToClone=c=this.renderTo.cloneNode(0),k(c,{position:"absolute",top:"-9999px",display:"block"}),c.style.setProperty&&c.style.setProperty("display","block","important"),F.body.appendChild(c),b&&c.appendChild(b)},setClassName:function(a){this.container.className="highcharts-container "+(a||"")},getContainer:function(){var c,
b=this.options,g=b.chart,f,d;c=this.renderTo;var e=a.uniqueKey(),w;c||(this.renderTo=c=g.renderTo);l(c)&&(this.renderTo=c=F.getElementById(c));c||a.error(13,!0);f=y(D(c,"data-highcharts-chart"));t(f)&&q[f]&&q[f].hasRendered&&q[f].destroy();D(c,"data-highcharts-chart",this.index);c.innerHTML="";g.skipClone||c.offsetWidth||this.cloneRenderTo();this.getChartSize();f=this.chartWidth;d=this.chartHeight;this.container=c=h("div",{id:e},void 0,this.renderToClone||c);this._cursor=c.style.cursor;this.renderer=
new (a[g.renderer]||Q)(c,f,d,null,g.forExport,b.exporting&&b.exporting.allowHTML);this.setClassName(g.className);for(w in b.defs)this.renderer.definition(b.defs[w]);this.renderer.chartIndex=this.index},getMargins:function(a){var c=this.spacing,b=this.margin,g=this.titleOffset;this.resetMargins();g&&!d(b[0])&&(this.plotTop=Math.max(this.plotTop,g+this.options.title.margin+c[0]));this.legend.display&&this.legend.adjustMargins(b,c);this.extraMargin&&(this[this.extraMargin.type]=(this[this.extraMargin.type]||
0)+this.extraMargin.value);this.extraTopMargin&&(this.plotTop+=this.extraTopMargin);a||this.getAxisMargins()},getAxisMargins:function(){var a=this,c=a.axisOffset=[0,0,0,0],g=a.margin;a.hasCartesianSeries&&b(a.axes,function(a){a.visible&&a.getOffset()});b(H,function(b,f){d(g[f])||(a[b]+=c[f])});a.setChartSize()},reflow:function(a){var c=this,b=c.options.chart,g=c.renderTo,f=d(b.width),l=b.width||e(g,"width"),b=b.height||e(g,"height"),g=a?a.target:P;if(!f&&!c.isPrinting&&l&&b&&(g===P||g===F)){if(l!==
c.containerWidth||b!==c.containerHeight)clearTimeout(c.reflowTimeout),c.reflowTimeout=N(function(){c.container&&c.setSize(void 0,void 0,!1)},a?100:0);c.containerWidth=l;c.containerHeight=b}},initReflow:function(){var a=this,c;c=C(P,"resize",function(c){a.reflow(c)});C(a,"destroy",c)},setSize:function(c,g,f){var d=this,l=d.renderer;d.isResizing+=1;a.setAnimation(f,d);d.oldChartHeight=d.chartHeight;d.oldChartWidth=d.chartWidth;void 0!==c&&(d.options.chart.width=c);void 0!==g&&(d.options.chart.height=
g);d.getChartSize();d.setChartSize(!0);l.setSize(d.chartWidth,d.chartHeight,f);b(d.axes,function(a){a.isDirty=!0;a.setScale()});d.isDirtyLegend=!0;d.isDirtyBox=!0;d.layOutTitles();d.getMargins();d.redraw(f);d.oldChartHeight=null;r(d,"resize");N(function(){d&&r(d,"endResize",null,function(){--d.isResizing})},A(void 0).duration)},setChartSize:function(a){var c=this.inverted,g=this.renderer,f=this.chartWidth,d=this.chartHeight,l=this.options.chart,e=this.spacing,w=this.clipOffset,z,k,y,G;this.plotLeft=
z=Math.round(this.plotLeft);this.plotTop=k=Math.round(this.plotTop);this.plotWidth=y=Math.max(0,Math.round(f-z-this.marginRight));this.plotHeight=G=Math.max(0,Math.round(d-k-this.marginBottom));this.plotSizeX=c?G:y;this.plotSizeY=c?y:G;this.plotBorderWidth=l.plotBorderWidth||0;this.spacingBox=g.spacingBox={x:e[3],y:e[0],width:f-e[3]-e[1],height:d-e[0]-e[2]};this.plotBox=g.plotBox={x:z,y:k,width:y,height:G};f=2*Math.floor(this.plotBorderWidth/2);c=Math.ceil(Math.max(f,w[3])/2);g=Math.ceil(Math.max(f,
w[0])/2);this.clipBox={x:c,y:g,width:Math.floor(this.plotSizeX-Math.max(f,w[1])/2-c),height:Math.max(0,Math.floor(this.plotSizeY-Math.max(f,w[2])/2-g))};a||b(this.axes,function(a){a.setAxisSize();a.setAxisTranslation()})},resetMargins:function(){var a=this,c=a.options.chart;b(["margin","spacing"],function(g){var f=c[g],d=x(f)?f:[f,f,f,f];b(["Top","Right","Bottom","Left"],function(b,f){a[g][f]=z(c[g+b],d[f])})});b(H,function(c,b){a[c]=z(a.margin[b],a.spacing[b])});a.axisOffset=[0,0,0,0];a.clipOffset=
[0,0,0,0]},drawChartBox:function(){var a=this.options.chart,c=this.renderer,b=this.chartWidth,g=this.chartHeight,f=this.chartBackground,d=this.plotBackground,l=this.plotBorder,e,w,z=this.plotLeft,k=this.plotTop,y=this.plotWidth,G=this.plotHeight,p=this.plotBox,r=this.clipRect,h=this.clipBox,v="animate";f||(this.chartBackground=f=c.rect().addClass("highcharts-background").add(),v="attr");e=w=f.strokeWidth();f[v]({x:w/2,y:w/2,width:b-w-e%2,height:g-w-e%2,r:a.borderRadius});v="animate";d||(v="attr",
this.plotBackground=d=c.rect().addClass("highcharts-plot-background").add());d[v](p);r?r.animate({width:h.width,height:h.height}):this.clipRect=c.clipRect(h);v="animate";l||(v="attr",this.plotBorder=l=c.rect().addClass("highcharts-plot-border").attr({zIndex:1}).add());l[v](l.crisp({x:z,y:k,width:y,height:G},-l.strokeWidth()));this.isDirtyBox=!1},propFromSeries:function(){var a=this,c=a.options.chart,g,f=a.options.series,d,l;b(["inverted","angular","polar"],function(b){g=G[c.type||c.defaultSeriesType];
l=c[b]||g&&g.prototype[b];for(d=f&&f.length;!l&&d--;)(g=G[f[d].type])&&g.prototype[b]&&(l=!0);a[b]=l})},linkSeries:function(){var a=this,c=a.series;b(c,function(a){a.linkedSeries.length=0});b(c,function(c){var b=c.options.linkedTo;l(b)&&(b=":previous"===b?a.series[c.index-1]:a.get(b))&&b.linkedParent!==c&&(b.linkedSeries.push(c),c.linkedParent=b,c.visible=z(c.options.visible,b.options.visible,c.visible))})},renderSeries:function(){b(this.series,function(a){a.translate();a.render()})},renderLabels:function(){var a=
this,c=a.options.labels;c.items&&b(c.items,function(b){var g=v(c.style,b.style),f=y(g.left)+a.plotLeft,d=y(g.top)+a.plotTop+12;delete g.left;delete g.top;a.renderer.text(b.html,f,d).attr({zIndex:2}).css(g).add()})},render:function(){var a=this.axes,c=this.renderer,g=this.options,f,d,l;this.setTitle();this.legend=new I(this,g.legend);this.getStacks&&this.getStacks();this.getMargins(!0);this.setChartSize();g=this.plotWidth;f=this.plotHeight-=21;b(a,function(a){a.setScale()});this.getAxisMargins();d=
1.1<g/this.plotWidth;l=1.05<f/this.plotHeight;if(d||l)b(a,function(a){(a.horiz&&d||!a.horiz&&l)&&a.setTickInterval(!0)}),this.getMargins();this.drawChartBox();this.hasCartesianSeries&&b(a,function(a){a.visible&&a.render()});this.seriesGroup||(this.seriesGroup=c.g("series-group").attr({zIndex:3}).add());this.renderSeries();this.renderLabels();this.addCredits();this.setResponsive&&this.setResponsive();this.hasRendered=!0},addCredits:function(a){var c=this;a=f(!0,this.options.credits,a);a.enabled&&!this.credits&&
(this.credits=this.renderer.text(a.text+(this.mapCredits||""),0,0).addClass("highcharts-credits").on("click",function(){a.href&&(P.location.href=a.href)}).attr({align:a.position.align,zIndex:8}).add().align(a.position),this.credits.update=function(a){c.credits=c.credits.destroy();c.addCredits(a)})},destroy:function(){var c=this,g=c.axes,f=c.series,d=c.container,l,e=d&&d.parentNode;r(c,"destroy");q[c.index]=void 0;a.chartCount--;c.renderTo.removeAttribute("data-highcharts-chart");w(c);for(l=g.length;l--;)g[l]=
g[l].destroy();this.scroller&&this.scroller.destroy&&this.scroller.destroy();for(l=f.length;l--;)f[l]=f[l].destroy();b("title subtitle chartBackground plotBackground plotBGImage plotBorder seriesGroup clipRect credits pointer rangeSelector legend resetZoomButton tooltip renderer".split(" "),function(a){var b=c[a];b&&b.destroy&&(c[a]=b.destroy())});d&&(d.innerHTML="",w(d),e&&m(d));for(l in c)delete c[l]},isReadyToRender:function(){var a=this;return E||P!=P.top||"complete"===F.readyState?!0:(F.attachEvent("onreadystatechange",
function(){F.detachEvent("onreadystatechange",a.firstRender);"complete"===F.readyState&&a.firstRender()}),!1)},firstRender:function(){var a=this,g=a.options;if(a.isReadyToRender()){a.getContainer();r(a,"init");a.resetMargins();a.setChartSize();a.propFromSeries();a.getAxes();b(g.series||[],function(c){a.initSeries(c)});a.linkSeries();r(a,"beforeRender");c&&(a.pointer=new c(a,g));a.render();if(!a.renderer.imgCount&&a.onload)a.onload();a.cloneRenderTo(!0)}},onload:function(){b([this.callback].concat(this.callbacks),
function(a){a&&void 0!==this.index&&a.apply(this,[this])},this);r(this,"load");r(this,"render");d(this.index)&&!1!==this.options.chart.reflow&&this.initReflow();this.onload=null}}})(J);(function(a){var C,A=a.each,D=a.extend,F=a.erase,u=a.fireEvent,h=a.format,n=a.isArray,m=a.isNumber,q=a.pick,k=a.removeEvent;C=a.Point=function(){};C.prototype={init:function(a,b,k){var d=a.chart.options.chart.colorCount;this.series=a;this.applyOptions(b,k);a.options.colorByPoint?(b=a.colorCounter,a.colorCounter++,a.colorCounter===
d&&(a.colorCounter=0)):b=a.colorIndex;this.colorIndex=q(this.colorIndex,b);a.chart.pointCount++;return this},applyOptions:function(a,b){var d=this.series,k=d.options.pointValKey||d.pointValKey;a=C.prototype.optionsToObject.call(this,a);D(this,a);this.options=this.options?D(this.options,a):a;a.group&&delete this.group;k&&(this.y=this[k]);this.isNull=q(this.isValid&&!this.isValid(),null===this.x||!m(this.y,!0));this.selected&&(this.state="select");"name"in this&&void 0===b&&d.xAxis&&d.xAxis.hasNames&&
(this.x=d.xAxis.nameToX(this));void 0===this.x&&d&&(this.x=void 0===b?d.autoIncrement(this):b);return this},optionsToObject:function(a){var b={},d=this.series,k=d.options.keys,h=k||d.pointArrayMap||["y"],e=h.length,p=0,t=0;if(m(a)||null===a)b[h[0]]=a;else if(n(a))for(!k&&a.length>e&&(d=typeof a[0],"string"===d?b.name=a[0]:"number"===d&&(b.x=a[0]),p++);t<e;)k&&void 0===a[p]||(b[h[t]]=a[p]),p++,t++;else"object"===typeof a&&(b=a,a.dataLabels&&(d._hasPointLabels=!0),a.marker&&(d._hasPointMarkers=!0));
return b},getClassName:function(){return"highcharts-point"+(this.selected?" highcharts-point-select":"")+(this.negative?" highcharts-negative":"")+(this.isNull?" highcharts-null-point":"")+(void 0!==this.colorIndex?" highcharts-color-"+this.colorIndex:"")+(this.options.className?" "+this.options.className:"")+(this.zone&&this.zone.className?" "+this.zone.className.replace("highcharts-negative",""):"")},getZone:function(){var a=this.series,b=a.zones,a=a.zoneAxis||"y",k=0,h;for(h=b[k];this[a]>=h.value;)h=
b[++k];h&&h.color&&!this.options.color&&(this.color=h.color);return h},destroy:function(){var a=this.series.chart,b=a.hoverPoints,h;a.pointCount--;b&&(this.setState(),F(b,this),b.length||(a.hoverPoints=null));if(this===a.hoverPoint)this.onMouseOut();if(this.graphic||this.dataLabel)k(this),this.destroyElements();this.legendItem&&a.legend.destroyItem(this);for(h in this)this[h]=null},destroyElements:function(){for(var a=["graphic","dataLabel","dataLabelUpper","connector","shadowGroup"],b,k=6;k--;)b=
a[k],this[b]&&(this[b]=this[b].destroy())},getLabelConfig:function(){return{x:this.category,y:this.y,color:this.color,colorIndex:this.colorIndex,key:this.name||this.category,series:this.series,point:this,percentage:this.percentage,total:this.total||this.stackTotal}},tooltipFormatter:function(a){var b=this.series,d=b.tooltipOptions,k=q(d.valueDecimals,""),r=d.valuePrefix||"",e=d.valueSuffix||"";A(b.pointArrayMap||["y"],function(b){b="{point."+b;if(r||e)a=a.replace(b+"}",r+b+"}"+e);a=a.replace(b+"}",
b+":,."+k+"f}")});return h(a,{point:this,series:this.series})},firePointEvent:function(a,b,k){var d=this,h=this.series.options;(h.point.events[a]||d.options&&d.options.events&&d.options.events[a])&&this.importEvents();"click"===a&&h.allowPointSelect&&(k=function(a){d.select&&d.select(null,a.ctrlKey||a.metaKey||a.shiftKey)});u(this,a,b,k)},visible:!0}})(J);(function(a){var C=a.addEvent,A=a.animObject,D=a.arrayMax,F=a.arrayMin,u=a.correctFloat,h=a.Date,n=a.defaultOptions,m=a.defined,q=a.each,k=a.erase,
d=a.extend,b=a.fireEvent,v=a.grep,B=a.isArray,r=a.isNumber,e=a.isString,p=a.merge,t=a.pick,x=a.removeEvent,l=a.splat,I=a.SVGElement,H=a.syncTimeout,f=a.win;a.Series=a.seriesType("line",null,{allowPointSelect:!1,showCheckbox:!1,animation:{duration:1E3},events:{},marker:{radius:4,states:{hover:{animation:{duration:50},enabled:!0,radiusPlus:2}}},point:{events:{}},dataLabels:{align:"center",formatter:function(){return null===this.y?"":a.numberFormat(this.y,-1)},verticalAlign:"bottom",x:0,y:0,padding:5},
cropThreshold:300,pointRange:0,softThreshold:!0,states:{hover:{lineWidthPlus:1,marker:{},halo:{size:10}},select:{marker:{}}},stickyTracking:!0,turboThreshold:1E3},{isCartesian:!0,pointClass:a.Point,sorted:!0,requireSorting:!0,directTouch:!1,axisTypes:["xAxis","yAxis"],colorCounter:0,parallelArrays:["x","y"],coll:"series",init:function(a,b){var c=this,f,l,g=a.series,e;c.chart=a;c.options=b=c.setOptions(b);c.linkedSeries=[];c.bindAxes();d(c,{name:b.name,state:"",visible:!1!==b.visible,selected:!0===
b.selected});l=b.events;for(f in l)C(c,f,l[f]);if(l&&l.click||b.point&&b.point.events&&b.point.events.click||b.allowPointSelect)a.runTrackerClick=!0;c.getColor();c.getSymbol();q(c.parallelArrays,function(a){c[a+"Data"]=[]});c.setData(b.data,!1);c.isCartesian&&(a.hasCartesianSeries=!0);g.length&&(e=g[g.length-1]);c._i=t(e&&e._i,-1)+1;a.orderSeries(this.insert(g))},insert:function(a){var c=this.options.index,b;if(r(c)){for(b=a.length;b--;)if(c>=t(a[b].options.index,a[b]._i)){a.splice(b+1,0,this);break}-1===
b&&a.unshift(this);b+=1}else a.push(this);return t(b,a.length-1)},bindAxes:function(){var c=this,b=c.options,f=c.chart,d;q(c.axisTypes||[],function(l){q(f[l],function(a){d=a.options;if(b[l]===d.index||void 0!==b[l]&&b[l]===d.id||void 0===b[l]&&0===d.index)c.insert(a.series),c[l]=a,a.isDirty=!0});c[l]||c.optionalAxis===l||a.error(18,!0)})},updateParallelArrays:function(a,b){var c=a.series,f=arguments,d=r(b)?function(g){var f="y"===g&&c.toYData?c.toYData(a):a[g];c[g+"Data"][b]=f}:function(a){Array.prototype[b].apply(c[a+
"Data"],Array.prototype.slice.call(f,2))};q(c.parallelArrays,d)},autoIncrement:function(){var a=this.options,b=this.xIncrement,f,d=a.pointIntervalUnit,b=t(b,a.pointStart,0);this.pointInterval=f=t(this.pointInterval,a.pointInterval,1);d&&(a=new h(b),"day"===d?a=+a[h.hcSetDate](a[h.hcGetDate]()+f):"month"===d?a=+a[h.hcSetMonth](a[h.hcGetMonth]()+f):"year"===d&&(a=+a[h.hcSetFullYear](a[h.hcGetFullYear]()+f)),f=a-b);this.xIncrement=b+f;return b},setOptions:function(a){var c=this.chart,b=c.options.plotOptions,
c=c.userOptions||{},f=c.plotOptions||{},d=b[this.type];this.userOptions=a;b=p(d,b.series,a);this.tooltipOptions=p(n.tooltip,n.plotOptions[this.type].tooltip,c.tooltip,f.series&&f.series.tooltip,f[this.type]&&f[this.type].tooltip,a.tooltip);null===d.marker&&delete b.marker;this.zoneAxis=b.zoneAxis;a=this.zones=(b.zones||[]).slice();!b.negativeColor&&!b.negativeFillColor||b.zones||a.push({value:b[this.zoneAxis+"Threshold"]||b.threshold||0,className:"highcharts-negative"});a.length&&m(a[a.length-1].value)&&
a.push({});return b},getCyclic:function(a,b,f){var c,d=this.chart,g=this.userOptions,l=a+"Index",e=a+"Counter",k=f?f.length:t(d.options.chart[a+"Count"],d[a+"Count"]);b||(c=t(g[l],g["_"+l]),m(c)||(d.series.length||(d[e]=0),g["_"+l]=c=d[e]%k,d[e]+=1),f&&(b=f[c]));void 0!==c&&(this[l]=c);this[a]=b},getColor:function(){this.getCyclic("color")},getSymbol:function(){this.getCyclic("symbol",this.options.marker.symbol,this.chart.options.symbols)},drawLegendSymbol:a.LegendSymbolMixin.drawLineMarker,setData:function(c,
b,f,d){var l=this,g=l.points,k=g&&g.length||0,w,z=l.options,h=l.chart,p=null,y=l.xAxis,v=z.turboThreshold,m=this.xData,n=this.yData,x=(w=l.pointArrayMap)&&w.length;c=c||[];w=c.length;b=t(b,!0);if(!1!==d&&w&&k===w&&!l.cropped&&!l.hasGroupedData&&l.visible)q(c,function(a,c){g[c].update&&a!==z.data[c]&&g[c].update(a,!1,null,!1)});else{l.xIncrement=null;l.colorCounter=0;q(this.parallelArrays,function(a){l[a+"Data"].length=0});if(v&&w>v){for(f=0;null===p&&f<w;)p=c[f],f++;if(r(p))for(f=0;f<w;f++)m[f]=this.autoIncrement(),
n[f]=c[f];else if(B(p))if(x)for(f=0;f<w;f++)p=c[f],m[f]=p[0],n[f]=p.slice(1,x+1);else for(f=0;f<w;f++)p=c[f],m[f]=p[0],n[f]=p[1];else a.error(12)}else for(f=0;f<w;f++)void 0!==c[f]&&(p={series:l},l.pointClass.prototype.applyOptions.apply(p,[c[f]]),l.updateParallelArrays(p,f));e(n[0])&&a.error(14,!0);l.data=[];l.options.data=l.userOptions.data=c;for(f=k;f--;)g[f]&&g[f].destroy&&g[f].destroy();y&&(y.minRange=y.userMinRange);l.isDirty=h.isDirtyBox=!0;l.isDirtyData=!!g;f=!1}"point"===z.legendType&&(this.processData(),
this.generatePoints());b&&h.redraw(f)},processData:function(c){var b=this.xData,f=this.yData,d=b.length,l;l=0;var g,e,k=this.xAxis,h,p=this.options;h=p.cropThreshold;var r=this.getExtremesFromAll||p.getExtremesFromAll,t=this.isCartesian,p=k&&k.val2lin,v=k&&k.isLog,m,n;if(t&&!this.isDirty&&!k.isDirty&&!this.yAxis.isDirty&&!c)return!1;k&&(c=k.getExtremes(),m=c.min,n=c.max);if(t&&this.sorted&&!r&&(!h||d>h||this.forceCrop))if(b[d-1]<m||b[0]>n)b=[],f=[];else if(b[0]<m||b[d-1]>n)l=this.cropData(this.xData,
this.yData,m,n),b=l.xData,f=l.yData,l=l.start,g=!0;for(h=b.length||1;--h;)d=v?p(b[h])-p(b[h-1]):b[h]-b[h-1],0<d&&(void 0===e||d<e)?e=d:0>d&&this.requireSorting&&a.error(15);this.cropped=g;this.cropStart=l;this.processedXData=b;this.processedYData=f;this.closestPointRange=e},cropData:function(a,b,f,d){var c=a.length,g=0,l=c,e=t(this.cropShoulder,1),k;for(k=0;k<c;k++)if(a[k]>=f){g=Math.max(0,k-e);break}for(f=k;f<c;f++)if(a[f]>d){l=f+e;break}return{xData:a.slice(g,l),yData:b.slice(g,l),start:g,end:l}},
generatePoints:function(){var a=this.options.data,b=this.data,f,d=this.processedXData,e=this.processedYData,g=this.pointClass,k=d.length,h=this.cropStart||0,p,r=this.hasGroupedData,t,v=[],m;b||r||(b=[],b.length=a.length,b=this.data=b);for(m=0;m<k;m++)p=h+m,r?(t=(new g).init(this,[d[m]].concat(l(e[m]))),t.dataGroup=this.groupMap[m]):(t=b[p])||void 0===a[p]||(b[p]=t=(new g).init(this,a[p],d[m])),t.index=p,v[m]=t;if(b&&(k!==(f=b.length)||r))for(m=0;m<f;m++)m!==h||r||(m+=k),b[m]&&(b[m].destroyElements(),
b[m].plotX=void 0);this.data=b;this.points=v},getExtremes:function(a){var c=this.yAxis,b=this.processedXData,f,d=[],g=0;f=this.xAxis.getExtremes();var l=f.min,e=f.max,k,h,p,t;a=a||this.stackedYData||this.processedYData||[];f=a.length;for(t=0;t<f;t++)if(h=b[t],p=a[t],k=(r(p,!0)||B(p))&&(!c.isLog||p.length||0<p),h=this.getExtremesFromAll||this.options.getExtremesFromAll||this.cropped||(b[t+1]||h)>=l&&(b[t-1]||h)<=e,k&&h)if(k=p.length)for(;k--;)null!==p[k]&&(d[g++]=p[k]);else d[g++]=p;this.dataMin=F(d);
this.dataMax=D(d)},translate:function(){this.processedXData||this.processData();this.generatePoints();var a=this.options,b=a.stacking,f=this.xAxis,d=f.categories,l=this.yAxis,g=this.points,e=g.length,k=!!this.modifyValue,p=a.pointPlacement,h="between"===p||r(p),v=a.threshold,n=a.startFromThreshold?v:0,x,q,B,I,H=Number.MAX_VALUE;"between"===p&&(p=.5);r(p)&&(p*=t(a.pointRange||f.pointRange));for(a=0;a<e;a++){var A=g[a],C=A.x,D=A.y;q=A.low;var F=b&&l.stacks[(this.negStacks&&D<(n?0:v)?"-":"")+this.stackKey],
J;l.isLog&&null!==D&&0>=D&&(A.isNull=!0);A.plotX=x=u(Math.min(Math.max(-1E5,f.translate(C,0,0,0,1,p,"flags"===this.type)),1E5));b&&this.visible&&!A.isNull&&F&&F[C]&&(I=this.getStackIndicator(I,C,this.index),J=F[C],D=J.points[I.key],q=D[0],D=D[1],q===n&&I.key===F[C].base&&(q=t(v,l.min)),l.isLog&&0>=q&&(q=null),A.total=A.stackTotal=J.total,A.percentage=J.total&&A.y/J.total*100,A.stackY=D,J.setOffset(this.pointXOffset||0,this.barW||0));A.yBottom=m(q)?l.translate(q,0,1,0,1):null;k&&(D=this.modifyValue(D,
A));A.plotY=q="number"===typeof D&&Infinity!==D?Math.min(Math.max(-1E5,l.translate(D,0,1,0,1)),1E5):void 0;A.isInside=void 0!==q&&0<=q&&q<=l.len&&0<=x&&x<=f.len;A.clientX=h?u(f.translate(C,0,0,0,1,p)):x;A.negative=A.y<(v||0);A.category=d&&void 0!==d[A.x]?d[A.x]:A.x;A.isNull||(void 0!==B&&(H=Math.min(H,Math.abs(x-B))),B=x);A.zone=this.zones.length&&A.getZone()}this.closestPointRangePx=H},getValidPoints:function(a,b){var c=this.chart;return v(a||this.points||[],function(a){return b&&!c.isInsidePlot(a.plotX,
a.plotY,c.inverted)?!1:!a.isNull})},setClip:function(a){var c=this.chart,b=this.options,f=c.renderer,d=c.inverted,g=this.clipBox,l=g||c.clipBox,e=this.sharedClipKey||["_sharedClip",a&&a.duration,a&&a.easing,l.height,b.xAxis,b.yAxis].join(),k=c[e],p=c[e+"m"];k||(a&&(l.width=0,c[e+"m"]=p=f.clipRect(-99,d?-c.plotLeft:-c.plotTop,99,d?c.chartWidth:c.chartHeight)),c[e]=k=f.clipRect(l),k.count={length:0});a&&!k.count[this.index]&&(k.count[this.index]=!0,k.count.length+=1);!1!==b.clip&&(this.group.clip(a||
g?k:c.clipRect),this.markerGroup.clip(p),this.sharedClipKey=e);a||(k.count[this.index]&&(delete k.count[this.index],--k.count.length),0===k.count.length&&e&&c[e]&&(g||(c[e]=c[e].destroy()),c[e+"m"]&&(this.markerGroup.clip(),c[e+"m"]=c[e+"m"].destroy())))},animate:function(a){var c=this.chart,b=A(this.options.animation),f;a?this.setClip(b):(f=this.sharedClipKey,(a=c[f])&&a.animate({width:c.plotSizeX},b),c[f+"m"]&&c[f+"m"].animate({width:c.plotSizeX+99},b),this.animate=null)},afterAnimate:function(){this.setClip();
b(this,"afterAnimate")},drawPoints:function(){var a=this.points,b=this.chart,f,d,l,g,e=this.options.marker,k,p,h,m,v=this.markerGroup,n=t(e.enabled,this.xAxis.isRadial?!0:null,this.closestPointRangePx>2*e.radius);if(!1!==e.enabled||this._hasPointMarkers)for(d=0;d<a.length;d++)l=a[d],f=l.plotY,g=l.graphic,k=l.marker||{},p=!!l.marker,h=n&&void 0===k.enabled||k.enabled,m=l.isInside,h&&r(f)&&null!==l.y?(f=t(k.symbol,this.symbol),l.hasImage=0===f.indexOf("url"),h=this.markerAttribs(l,l.selected&&"select"),
g?g[m?"show":"hide"](!0).animate(h):m&&(0<h.width||l.hasImage)&&(l.graphic=g=b.renderer.symbol(f,h.x,h.y,h.width,h.height,p?k:e).add(v)),g&&g.addClass(l.getClassName(),!0)):g&&(l.graphic=g.destroy())},markerAttribs:function(a,b){var c=this.options.marker,f=a.marker||{},d=t(f.radius,c.radius);b&&(c=c.states[b],b=f.states&&f.states[b],d=t(b&&b.radius,c&&c.radius,d+(c&&c.radiusPlus||0)));a.hasImage&&(d=0);a={x:Math.floor(a.plotX)-d,y:a.plotY-d};d&&(a.width=a.height=2*d);return a},destroy:function(){var a=
this,d=a.chart,l=/AppleWebKit\/533/.test(f.navigator.userAgent),e,p=a.data||[],g,h,r;b(a,"destroy");x(a);q(a.axisTypes||[],function(c){(r=a[c])&&r.series&&(k(r.series,a),r.isDirty=r.forceRedraw=!0)});a.legendItem&&a.chart.legend.destroyItem(a);for(e=p.length;e--;)(g=p[e])&&g.destroy&&g.destroy();a.points=null;clearTimeout(a.animationTimeout);for(h in a)a[h]instanceof I&&!a[h].survive&&(e=l&&"group"===h?"hide":"destroy",a[h][e]());d.hoverSeries===a&&(d.hoverSeries=null);k(d.series,a);d.orderSeries();
for(h in a)delete a[h]},getGraphPath:function(a,b,f){var c=this,d=c.options,g=d.step,l,e=[],k=[],h;a=a||c.points;(l=a.reversed)&&a.reverse();(g={right:1,center:2}[g]||g&&3)&&l&&(g=4-g);!d.connectNulls||b||f||(a=this.getValidPoints(a));q(a,function(l,w){var p=l.plotX,r=l.plotY,z=a[w-1];(l.leftCliff||z&&z.rightCliff)&&!f&&(h=!0);l.isNull&&!m(b)&&0<w?h=!d.connectNulls:l.isNull&&!b?h=!0:(0===w||h?w=["M",l.plotX,l.plotY]:c.getPointSpline?w=c.getPointSpline(a,l,w):g?(w=1===g?["L",z.plotX,r]:2===g?["L",
(z.plotX+p)/2,z.plotY,"L",(z.plotX+p)/2,r]:["L",p,z.plotY],w.push("L",p,r)):w=["L",p,r],k.push(l.x),g&&k.push(l.x),e.push.apply(e,w),h=!1)});e.xMap=k;return c.graphPath=e},drawGraph:function(){var a=this,b=(this.gappedPath||this.getGraphPath).call(this),f=[["graph","highcharts-graph"]];q(this.zones,function(a,c){f.push(["zone-graph-"+c,"highcharts-graph highcharts-zone-graph-"+c+" "+(a.className||"")])});q(f,function(c,f){f=c[0];var g=a[f];g?(g.endX=b.xMap,g.animate({d:b})):b.length&&(a[f]=a.chart.renderer.path(b).addClass(c[1]).attr({zIndex:1}).add(a.group));
g&&(g.startX=b.xMap,g.isArea=b.isArea)})},applyZones:function(){var a=this,b=this.chart,f=b.renderer,d=this.zones,l,g,e=this.clips||[],k,h=this.graph,p=this.area,r=Math.max(b.chartWidth,b.chartHeight),m=this[(this.zoneAxis||"y")+"Axis"],v,n,x=b.inverted,B,I,H,u,A=!1;d.length&&(h||p)&&m&&void 0!==m.min&&(n=m.reversed,B=m.horiz,h&&h.hide(),p&&p.hide(),v=m.getExtremes(),q(d,function(c,d){l=n?B?b.plotWidth:0:B?0:m.toPixels(v.min);l=Math.min(Math.max(t(g,l),0),r);g=Math.min(Math.max(Math.round(m.toPixels(t(c.value,
v.max),!0)),0),r);A&&(l=g=m.toPixels(v.max));I=Math.abs(l-g);H=Math.min(l,g);u=Math.max(l,g);m.isXAxis?(k={x:x?u:H,y:0,width:I,height:r},B||(k.x=b.plotHeight-k.x)):(k={x:0,y:x?u:H,width:r,height:I},B&&(k.y=b.plotWidth-k.y));e[d]?e[d].animate(k):(e[d]=f.clipRect(k),h&&a["zone-graph-"+d].clip(e[d]),p&&a["zone-area-"+d].clip(e[d]));A=c.value>v.max}),this.clips=e)},invertGroups:function(a){function b(){q(["group","markerGroup"],function(b){c[b]&&(c[b].width=c.yAxis.len,c[b].height=c.xAxis.len,c[b].invert(a))})}
var c=this,f;c.xAxis&&(f=C(c.chart,"resize",b),C(c,"destroy",f),b(a),c.invertGroups=b)},plotGroup:function(a,b,f,d,l){var c=this[a],e=!c;e&&(this[a]=c=this.chart.renderer.g(b).attr({zIndex:d||.1}).add(l),c.addClass("highcharts-series-"+this.index+" highcharts-"+this.type+"-series highcharts-color-"+this.colorIndex+" "+(this.options.className||"")));c.attr({visibility:f})[e?"attr":"animate"](this.getPlotBox());return c},getPlotBox:function(){var a=this.chart,b=this.xAxis,f=this.yAxis;a.inverted&&(b=
f,f=this.xAxis);return{translateX:b?b.left:a.plotLeft,translateY:f?f.top:a.plotTop,scaleX:1,scaleY:1}},render:function(){var a=this,b=a.chart,f,d=a.options,l=!!a.animate&&b.renderer.isSVG&&A(d.animation).duration,g=a.visible?"inherit":"hidden",e=d.zIndex,k=a.hasRendered,h=b.seriesGroup,p=b.inverted;f=a.plotGroup("group","series",g,e,h);a.markerGroup=a.plotGroup("markerGroup","markers",g,e,h);l&&a.animate(!0);f.inverted=a.isCartesian?p:!1;a.drawGraph&&(a.drawGraph(),a.applyZones());a.drawDataLabels&&
a.drawDataLabels();a.visible&&a.drawPoints();a.drawTracker&&!1!==a.options.enableMouseTracking&&a.drawTracker();a.invertGroups(p);!1===d.clip||a.sharedClipKey||k||f.clip(b.clipRect);l&&a.animate();k||(a.animationTimeout=H(function(){a.afterAnimate()},l));a.isDirty=!1;a.hasRendered=!0},redraw:function(){var a=this.chart,b=this.isDirty||this.isDirtyData,f=this.group,d=this.xAxis,l=this.yAxis;f&&(a.inverted&&f.attr({width:a.plotWidth,height:a.plotHeight}),f.animate({translateX:t(d&&d.left,a.plotLeft),
translateY:t(l&&l.top,a.plotTop)}));this.translate();this.render();b&&delete this.kdTree},kdDimensions:1,kdAxisArray:["clientX","plotY"],searchPoint:function(a,b){var c=this.xAxis,f=this.yAxis,d=this.chart.inverted;return this.searchKDTree({clientX:d?c.len-a.chartY+c.pos:a.chartX-c.pos,plotY:d?f.len-a.chartX+f.pos:a.chartY-f.pos},b)},buildKDTree:function(){function a(c,f,g){var d,l;if(l=c&&c.length)return d=b.kdAxisArray[f%g],c.sort(function(a,b){return a[d]-b[d]}),l=Math.floor(l/2),{point:c[l],left:a(c.slice(0,
l),f+1,g),right:a(c.slice(l+1),f+1,g)}}this.buildingKdTree=!0;var b=this,f=b.kdDimensions;delete b.kdTree;H(function(){b.kdTree=a(b.getValidPoints(null,!b.directTouch),f,f);b.buildingKdTree=!1},b.options.kdNow?0:1)},searchKDTree:function(a,b){function c(a,b,e,k){var h=b.point,p=f.kdAxisArray[e%k],w,r,z=h;r=m(a[d])&&m(h[d])?Math.pow(a[d]-h[d],2):null;w=m(a[g])&&m(h[g])?Math.pow(a[g]-h[g],2):null;w=(r||0)+(w||0);h.dist=m(w)?Math.sqrt(w):Number.MAX_VALUE;h.distX=m(r)?Math.sqrt(r):Number.MAX_VALUE;p=
a[p]-h[p];w=0>p?"left":"right";r=0>p?"right":"left";b[w]&&(w=c(a,b[w],e+1,k),z=w[l]<z[l]?w:h);b[r]&&Math.sqrt(p*p)<z[l]&&(a=c(a,b[r],e+1,k),z=a[l]<z[l]?a:z);return z}var f=this,d=this.kdAxisArray[0],g=this.kdAxisArray[1],l=b?"distX":"dist";this.kdTree||this.buildingKdTree||this.buildKDTree();if(this.kdTree)return c(a,this.kdTree,this.kdDimensions,this.kdDimensions)}})})(J);(function(a){function C(a,d,b,h,m){var k=a.chart.inverted;this.axis=a;this.isNegative=b;this.options=d;this.x=h;this.total=null;
this.points={};this.stack=m;this.rightCliff=this.leftCliff=0;this.alignOptions={align:d.align||(k?b?"left":"right":"center"),verticalAlign:d.verticalAlign||(k?"middle":b?"bottom":"top"),y:q(d.y,k?4:b?14:-6),x:q(d.x,k?b?-6:6:0)};this.textAlign=d.textAlign||(k?b?"right":"left":"center")}var A=a.Axis,D=a.Chart,F=a.correctFloat,u=a.defined,h=a.destroyObjectProperties,n=a.each,m=a.format,q=a.pick;a=a.Series;C.prototype={destroy:function(){h(this,this.axis)},render:function(a){var d=this.options,b=d.format,
b=b?m(b,this):d.formatter.call(this);this.label?this.label.attr({text:b,visibility:"hidden"}):this.label=this.axis.chart.renderer.text(b,null,null,d.useHTML).css(d.style).attr({align:this.textAlign,rotation:d.rotation,visibility:"hidden"}).add(a)},setOffset:function(a,d){var b=this.axis,k=b.chart,h=k.inverted,r=b.reversed,r=this.isNegative&&!r||!this.isNegative&&r,e=b.translate(b.usePercentage?100:this.total,0,0,0,1),b=b.translate(0),b=Math.abs(e-b);a=k.xAxis[0].translate(this.x)+a;var p=k.plotHeight,
h={x:h?r?e:e-b:a,y:h?p-a-d:r?p-e-b:p-e,width:h?b:d,height:h?d:b};if(d=this.label)d.align(this.alignOptions,null,h),h=d.alignAttr,d[!1===this.options.crop||k.isInsidePlot(h.x,h.y)?"show":"hide"](!0)}};D.prototype.getStacks=function(){var a=this;n(a.yAxis,function(a){a.stacks&&a.hasVisibleSeries&&(a.oldStacks=a.stacks)});n(a.series,function(d){!d.options.stacking||!0!==d.visible&&!1!==a.options.chart.ignoreHiddenSeries||(d.stackKey=d.type+q(d.options.stack,""))})};A.prototype.buildStacks=function(){var a=
this.series,d,b=q(this.options.reversedStacks,!0),h=a.length,m;if(!this.isXAxis){this.usePercentage=!1;for(m=h;m--;)a[b?m:h-m-1].setStackedPoints();for(m=h;m--;)d=a[b?m:h-m-1],d.setStackCliffs&&d.setStackCliffs();if(this.usePercentage)for(m=0;m<h;m++)a[m].setPercentStacks()}};A.prototype.renderStackTotals=function(){var a=this.chart,d=a.renderer,b=this.stacks,h,m,r=this.stackTotalGroup;r||(this.stackTotalGroup=r=d.g("stack-labels").attr({visibility:"visible",zIndex:6}).add());r.translate(a.plotLeft,
a.plotTop);for(h in b)for(m in a=b[h],a)a[m].render(r)};A.prototype.resetStacks=function(){var a=this.stacks,d,b;if(!this.isXAxis)for(d in a)for(b in a[d])a[d][b].touched<this.stacksTouched?(a[d][b].destroy(),delete a[d][b]):(a[d][b].total=null,a[d][b].cum=null)};A.prototype.cleanStacks=function(){var a,d,b;if(!this.isXAxis)for(d in this.oldStacks&&(a=this.stacks=this.oldStacks),a)for(b in a[d])a[d][b].cum=a[d][b].total};a.prototype.setStackedPoints=function(){if(this.options.stacking&&(!0===this.visible||
!1===this.chart.options.chart.ignoreHiddenSeries)){var a=this.processedXData,d=this.processedYData,b=[],h=d.length,m=this.options,r=m.threshold,e=m.startFromThreshold?r:0,p=m.stack,m=m.stacking,t=this.stackKey,n="-"+t,l=this.negStacks,I=this.yAxis,H=I.stacks,f=I.oldStacks,c,z,y,w,G,g,E;I.stacksTouched+=1;for(G=0;G<h;G++)g=a[G],E=d[G],c=this.getStackIndicator(c,g,this.index),w=c.key,y=(z=l&&E<(e?0:r))?n:t,H[y]||(H[y]={}),H[y][g]||(f[y]&&f[y][g]?(H[y][g]=f[y][g],H[y][g].total=null):H[y][g]=new C(I,
I.options.stackLabels,z,g,p)),y=H[y][g],null!==E&&(y.points[w]=y.points[this.index]=[q(y.cum,e)],u(y.cum)||(y.base=w),y.touched=I.stacksTouched,0<c.index&&!1===this.singleStacks&&(y.points[w][0]=y.points[this.index+","+g+",0"][0])),"percent"===m?(z=z?t:n,l&&H[z]&&H[z][g]?(z=H[z][g],y.total=z.total=Math.max(z.total,y.total)+Math.abs(E)||0):y.total=F(y.total+(Math.abs(E)||0))):y.total=F(y.total+(E||0)),y.cum=q(y.cum,e)+(E||0),null!==E&&(y.points[w].push(y.cum),b[G]=y.cum);"percent"===m&&(I.usePercentage=
!0);this.stackedYData=b;I.oldStacks={}}};a.prototype.setPercentStacks=function(){var a=this,d=a.stackKey,b=a.yAxis.stacks,h=a.processedXData,m;n([d,"-"+d],function(d){for(var e=h.length,k,r;e--;)if(k=h[e],m=a.getStackIndicator(m,k,a.index,d),k=(r=b[d]&&b[d][k])&&r.points[m.key])r=r.total?100/r.total:0,k[0]=F(k[0]*r),k[1]=F(k[1]*r),a.stackedYData[e]=k[1]})};a.prototype.getStackIndicator=function(a,d,b,h){!u(a)||a.x!==d||h&&a.key!==h?a={x:d,index:0,key:h}:a.index++;a.key=[b,d,a.index].join();return a}})(J);
(function(a){var C=a.addEvent,A=a.Axis,D=a.createElement,F=a.css,u=a.defined,h=a.each,n=a.erase,m=a.extend,q=a.fireEvent,k=a.inArray,d=a.isNumber,b=a.isObject,v=a.merge,B=a.pick,r=a.Point,e=a.Series,p=a.seriesTypes,t=a.setAnimation,x=a.splat;m(a.Chart.prototype,{addSeries:function(a,b,d){var f,c=this;a&&(b=B(b,!0),q(c,"addSeries",{options:a},function(){f=c.initSeries(a);c.isDirtyLegend=!0;c.linkSeries();b&&c.redraw(d)}));return f},addAxis:function(a,b,d,f){var c=b?"xAxis":"yAxis",l=this.options;a=
v(a,{index:this[c].length,isX:b});new A(this,a);l[c]=x(l[c]||{});l[c].push(a);B(d,!0)&&this.redraw(f)},showLoading:function(a){var b=this,d=b.options,f=b.loadingDiv,c=function(){f&&F(f,{left:b.plotLeft+"px",top:b.plotTop+"px",width:b.plotWidth+"px",height:b.plotHeight+"px"})};f||(b.loadingDiv=f=D("div",{className:"highcharts-loading highcharts-loading-hidden"},null,b.container),b.loadingSpan=D("span",{className:"highcharts-loading-inner"},null,f),C(b,"redraw",c));f.className="highcharts-loading";
b.loadingSpan.innerHTML=a||d.lang.loading;b.loadingShown=!0;c()},hideLoading:function(){var a=this.loadingDiv;a&&(a.className="highcharts-loading highcharts-loading-hidden");this.loadingShown=!1},propsRequireDirtyBox:"backgroundColor borderColor borderWidth margin marginTop marginRight marginBottom marginLeft spacing spacingTop spacingRight spacingBottom spacingLeft borderRadius plotBackgroundColor plotBackgroundImage plotBorderColor plotBorderWidth plotShadow shadow".split(" "),propsRequireUpdateSeries:"chart.inverted chart.polar chart.ignoreHiddenSeries chart.type colors plotOptions".split(" "),
update:function(a,b){var l,f={credits:"addCredits",title:"setTitle",subtitle:"setSubtitle"},c=a.chart,e,p;if(c){v(!0,this.options.chart,c);"className"in c&&this.setClassName(c.className);if("inverted"in c||"polar"in c)this.propFromSeries(),e=!0;for(l in c)c.hasOwnProperty(l)&&(-1!==k("chart."+l,this.propsRequireUpdateSeries)&&(p=!0),-1!==k(l,this.propsRequireDirtyBox)&&(this.isDirtyBox=!0))}for(l in a){if(this[l]&&"function"===typeof this[l].update)this[l].update(a[l],!1);else if("function"===typeof this[f[l]])this[f[l]](a[l]);
"chart"!==l&&-1!==k(l,this.propsRequireUpdateSeries)&&(p=!0)}a.plotOptions&&v(!0,this.options.plotOptions,a.plotOptions);h(["xAxis","yAxis","series"],function(b){a[b]&&h(x(a[b]),function(a,c){(c=u(a.id)&&this.get(a.id)||this[b][c])&&c.coll===b&&c.update(a,!1)},this)},this);e&&h(this.axes,function(a){a.update({},!1)});p&&h(this.series,function(a){a.update({},!1)});a.loading&&v(!0,this.options.loading,a.loading);l=c&&c.width;c=c&&c.height;d(l)&&l!==this.chartWidth||d(c)&&c!==this.chartHeight?this.setSize(l,
c):B(b,!0)&&this.redraw()},setSubtitle:function(a){this.setTitle(void 0,a)}});m(r.prototype,{update:function(a,d,e,f){function c(){l.applyOptions(a);null===l.y&&h&&(l.graphic=h.destroy());b(a,!0)&&(h&&h.element&&a&&a.marker&&a.marker.symbol&&(l.graphic=h.destroy()),a&&a.dataLabels&&l.dataLabel&&(l.dataLabel=l.dataLabel.destroy()));p=l.index;k.updateParallelArrays(l,p);r.data[p]=b(r.data[p],!0)?l.options:a;k.isDirty=k.isDirtyData=!0;!k.fixedBox&&k.hasCartesianSeries&&(g.isDirtyBox=!0);"point"===r.legendType&&
(g.isDirtyLegend=!0);d&&g.redraw(e)}var l=this,k=l.series,h=l.graphic,p,g=k.chart,r=k.options;d=B(d,!0);!1===f?c():l.firePointEvent("update",{options:a},c)},remove:function(a,b){this.series.removePoint(k(this,this.series.data),a,b)}});m(e.prototype,{addPoint:function(a,b,d,f){var c=this.options,l=this.data,e=this.chart,k=this.xAxis,k=k&&k.hasNames&&k.names,h=c.data,g,p,r=this.xData,m,t;b=B(b,!0);g={series:this};this.pointClass.prototype.applyOptions.apply(g,[a]);t=g.x;m=r.length;if(this.requireSorting&&
t<r[m-1])for(p=!0;m&&r[m-1]>t;)m--;this.updateParallelArrays(g,"splice",m,0,0);this.updateParallelArrays(g,m);k&&g.name&&(k[t]=g.name);h.splice(m,0,a);p&&(this.data.splice(m,0,null),this.processData());"point"===c.legendType&&this.generatePoints();d&&(l[0]&&l[0].remove?l[0].remove(!1):(l.shift(),this.updateParallelArrays(g,"shift"),h.shift()));this.isDirtyData=this.isDirty=!0;b&&e.redraw(f)},removePoint:function(a,b,d){var f=this,c=f.data,l=c[a],e=f.points,k=f.chart,h=function(){e&&e.length===c.length&&
e.splice(a,1);c.splice(a,1);f.options.data.splice(a,1);f.updateParallelArrays(l||{series:f},"splice",a,1);l&&l.destroy();f.isDirty=!0;f.isDirtyData=!0;b&&k.redraw()};t(d,k);b=B(b,!0);l?l.firePointEvent("remove",null,h):h()},remove:function(a,b,d){function f(){c.destroy();l.isDirtyLegend=l.isDirtyBox=!0;l.linkSeries();B(a,!0)&&l.redraw(b)}var c=this,l=c.chart;!1!==d?q(c,"remove",null,f):f()},update:function(a,b){var d=this,f=this.chart,c=this.userOptions,l=this.type,e=a.type||c.type||f.options.chart.type,
k=p[l].prototype,r=["group","markerGroup","dataLabelsGroup"],g;if(e&&e!==l||void 0!==a.zIndex)r.length=0;h(r,function(a){r[a]=d[a];delete d[a]});a=v(c,{animation:!1,index:this.index,pointStart:this.xData[0]},{data:this.options.data},a);this.remove(!1,null,!1);for(g in k)this[g]=void 0;m(this,p[e||l].prototype);h(r,function(a){d[a]=r[a]});this.init(f,a);f.linkSeries();B(b,!0)&&f.redraw(!1)}});m(A.prototype,{update:function(a,b){var d=this.chart;a=d.options[this.coll][this.options.index]=v(this.userOptions,
a);this.destroy(!0);this.init(d,m(a,{events:void 0}));d.isDirtyBox=!0;B(b,!0)&&d.redraw()},remove:function(a){for(var b=this.chart,d=this.coll,f=this.series,c=f.length;c--;)f[c]&&f[c].remove(!1);n(b.axes,this);n(b[d],this);b.options[d].splice(this.options.index,1);h(b[d],function(a,b){a.options.index=b});this.destroy();b.isDirtyBox=!0;B(a,!0)&&b.redraw()},setTitle:function(a,b){this.update({title:a},b)},setCategories:function(a,b){this.update({categories:a},b)}})})(J);(function(a){var C=a.each,A=
a.map,D=a.pick,F=a.Series,u=a.seriesType;u("area","line",{softThreshold:!1,threshold:0},{singleStacks:!1,getStackPoints:function(){var a=[],n=[],m=this.xAxis,q=this.yAxis,k=q.stacks[this.stackKey],d={},b=this.points,v=this.index,B=q.series,r=B.length,e,p=D(q.options.reversedStacks,!0)?1:-1,t,x;if(this.options.stacking){for(t=0;t<b.length;t++)d[b[t].x]=b[t];for(x in k)null!==k[x].total&&n.push(x);n.sort(function(a,b){return a-b});e=A(B,function(){return this.visible});C(n,function(b,h){var l=0,f,c;
if(d[b]&&!d[b].isNull)a.push(d[b]),C([-1,1],function(a){var l=1===a?"rightNull":"leftNull",w=0,m=k[n[h+a]];if(m)for(t=v;0<=t&&t<r;)f=m.points[t],f||(t===v?d[b][l]=!0:e[t]&&(c=k[b].points[t])&&(w-=c[1]-c[0])),t+=p;d[b][1===a?"rightCliff":"leftCliff"]=w});else{for(t=v;0<=t&&t<r;){if(f=k[b].points[t]){l=f[1];break}t+=p}l=q.toPixels(l,!0);a.push({isNull:!0,plotX:m.toPixels(b,!0),plotY:l,yBottom:l})}})}return a},getGraphPath:function(a){var h=F.prototype.getGraphPath,m=this.options,q=m.stacking,k=this.yAxis,
d,b,v=[],B=[],r=this.index,e,p=k.stacks[this.stackKey],t=m.threshold,x=k.getThreshold(m.threshold),l,m=m.connectNulls||"percent"===q,u=function(b,f,c){var d=a[b];b=q&&p[d.x].points[r];var l=d[c+"Null"]||0;c=d[c+"Cliff"]||0;var h,m,d=!0;c||l?(h=(l?b[0]:b[1])+c,m=b[0]+c,d=!!l):!q&&a[f]&&a[f].isNull&&(h=m=t);void 0!==h&&(B.push({plotX:e,plotY:null===h?x:k.getThreshold(h),isNull:d}),v.push({plotX:e,plotY:null===m?x:k.getThreshold(m),doCurve:!1}))};a=a||this.points;q&&(a=this.getStackPoints());for(d=0;d<
a.length;d++)if(b=a[d].isNull,e=D(a[d].rectPlotX,a[d].plotX),l=D(a[d].yBottom,x),!b||m)m||u(d,d-1,"left"),b&&!q&&m||(B.push(a[d]),v.push({x:d,plotX:e,plotY:l})),m||u(d,d+1,"right");d=h.call(this,B,!0,!0);v.reversed=!0;b=h.call(this,v,!0,!0);b.length&&(b[0]="L");b=d.concat(b);h=h.call(this,B,!1,m);b.xMap=d.xMap;this.areaPath=b;return h},drawGraph:function(){this.areaPath=[];F.prototype.drawGraph.apply(this);var a=this,n=this.areaPath,m=this.options,q=[["area","highcharts-area"]];C(this.zones,function(a,
d){q.push(["zone-area-"+d,"highcharts-area highcharts-zone-area-"+d+" "+a.className])});C(q,function(k){var d=k[0],b=a[d];b?(b.endX=n.xMap,b.animate({d:n})):(b=a[d]=a.chart.renderer.path(n).addClass(k[1]).attr({zIndex:0}).add(a.group),b.isArea=!0);b.startX=n.xMap;b.shiftUnit=m.step?2:1})},drawLegendSymbol:a.LegendSymbolMixin.drawRectangle})})(J);(function(a){var C=a.pick;a=a.seriesType;a("spline","line",{},{getPointSpline:function(a,D,F){var u=D.plotX,h=D.plotY,n=a[F-1];F=a[F+1];var m,q,k,d;if(n&&
!n.isNull&&!1!==n.doCurve&&F&&!F.isNull&&!1!==F.doCurve){a=n.plotY;k=F.plotX;F=F.plotY;var b=0;m=(1.5*u+n.plotX)/2.5;q=(1.5*h+a)/2.5;k=(1.5*u+k)/2.5;d=(1.5*h+F)/2.5;k!==m&&(b=(d-q)*(k-u)/(k-m)+h-d);q+=b;d+=b;q>a&&q>h?(q=Math.max(a,h),d=2*h-q):q<a&&q<h&&(q=Math.min(a,h),d=2*h-q);d>F&&d>h?(d=Math.max(F,h),q=2*h-d):d<F&&d<h&&(d=Math.min(F,h),q=2*h-d);D.rightContX=k;D.rightContY=d}D=["C",C(n.rightContX,n.plotX),C(n.rightContY,n.plotY),C(m,u),C(q,h),u,h];n.rightContX=n.rightContY=null;return D}})})(J);
(function(a){var C=a.seriesTypes.area.prototype,A=a.seriesType;A("areaspline","spline",a.defaultPlotOptions.area,{getStackPoints:C.getStackPoints,getGraphPath:C.getGraphPath,setStackCliffs:C.setStackCliffs,drawGraph:C.drawGraph,drawLegendSymbol:a.LegendSymbolMixin.drawRectangle})})(J);(function(a){var C=a.animObject,A=a.each,D=a.extend,F=a.isNumber,u=a.merge,h=a.pick,n=a.Series,m=a.seriesType,q=a.svg;m("column","line",{borderRadius:0,groupPadding:.2,marker:null,pointPadding:.1,minPointLength:0,cropThreshold:50,
pointRange:null,states:{hover:{halo:!1}},dataLabels:{align:null,verticalAlign:null,y:null},softThreshold:!1,startFromThreshold:!0,stickyTracking:!1,tooltip:{distance:6},threshold:0},{cropShoulder:0,directTouch:!0,trackerGroups:["group","dataLabelsGroup"],negStacks:!0,init:function(){n.prototype.init.apply(this,arguments);var a=this,d=a.chart;d.hasRendered&&A(d.series,function(b){b.type===a.type&&(b.isDirty=!0)})},getColumnMetrics:function(){var a=this,d=a.options,b=a.xAxis,m=a.yAxis,n=b.reversed,
r,e={},p=0;!1===d.grouping?p=1:A(a.chart.series,function(b){var d=b.options,f=b.yAxis,c;b.type===a.type&&b.visible&&m.len===f.len&&m.pos===f.pos&&(d.stacking?(r=b.stackKey,void 0===e[r]&&(e[r]=p++),c=e[r]):!1!==d.grouping&&(c=p++),b.columnIndex=c)});var t=Math.min(Math.abs(b.transA)*(b.ordinalSlope||d.pointRange||b.closestPointRange||b.tickInterval||1),b.len),x=t*d.groupPadding,l=(t-2*x)/(p||1),d=Math.min(d.maxPointWidth||b.len,h(d.pointWidth,l*(1-2*d.pointPadding)));a.columnMetrics={width:d,offset:(l-
d)/2+(x+((a.columnIndex||0)+(n?1:0))*l-t/2)*(n?-1:1)};return a.columnMetrics},crispCol:function(a,d,b,h){var k=this.chart,r=this.borderWidth,e=-(r%2?.5:0),r=r%2?.5:1;k.inverted&&k.renderer.isVML&&(r+=1);b=Math.round(a+b)+e;a=Math.round(a)+e;h=Math.round(d+h)+r;e=.5>=Math.abs(d)&&.5<h;d=Math.round(d)+r;h-=d;e&&h&&(--d,h+=1);return{x:a,y:d,width:b-a,height:h}},translate:function(){var a=this,d=a.chart,b=a.options,m=a.dense=2>a.closestPointRange*a.xAxis.transA,m=a.borderWidth=h(b.borderWidth,m?0:1),
q=a.yAxis,r=a.translatedThreshold=q.getThreshold(b.threshold),e=h(b.minPointLength,5),p=a.getColumnMetrics(),t=p.width,x=a.barW=Math.max(t,1+2*m),l=a.pointXOffset=p.offset;d.inverted&&(r-=.5);b.pointPadding&&(x=Math.ceil(x));n.prototype.translate.apply(a);A(a.points,function(b){var k=h(b.yBottom,r),f=999+Math.abs(k),f=Math.min(Math.max(-f,b.plotY),q.len+f),c=b.plotX+l,p=x,m=Math.min(f,k),w,n=Math.max(f,k)-m;Math.abs(n)<e&&e&&(n=e,w=!q.reversed&&!b.negative||q.reversed&&b.negative,m=Math.abs(m-r)>
e?k-e:r-(w?e:0));b.barX=c;b.pointWidth=t;b.tooltipPos=d.inverted?[q.len+q.pos-d.plotLeft-f,a.xAxis.len-c-p/2,n]:[c+p/2,f+q.pos-d.plotTop,n];b.shapeType="rect";b.shapeArgs=a.crispCol.apply(a,b.isNull?[b.plotX,q.len/2,0,0]:[c,m,p,n])})},getSymbol:a.noop,drawLegendSymbol:a.LegendSymbolMixin.drawRectangle,drawGraph:function(){this.group[this.dense?"addClass":"removeClass"]("highcharts-dense-data")},drawPoints:function(){var a=this,d=this.chart,b=d.renderer,h=a.options.animationLimit||250,m;A(a.points,
function(k){var e=k.graphic;if(F(k.plotY)&&null!==k.y)if(m=k.shapeArgs,e)e[d.pointCount<h?"animate":"attr"](u(m));else k.graphic=b[k.shapeType](m).attr({"class":k.getClassName()}).add(k.group||a.group);else e&&(k.graphic=e.destroy())})},animate:function(a){var d=this,b=this.yAxis,k=d.options,h=this.chart.inverted,r={};q&&(a?(r.scaleY=.001,a=Math.min(b.pos+b.len,Math.max(b.pos,b.toPixels(k.threshold))),h?r.translateX=a-b.len:r.translateY=a,d.group.attr(r)):(r[h?"translateX":"translateY"]=b.pos,d.group.animate(r,
D(C(d.options.animation),{step:function(a,b){d.group.attr({scaleY:Math.max(.001,b.pos)})}})),d.animate=null))},remove:function(){var a=this,d=a.chart;d.hasRendered&&A(d.series,function(b){b.type===a.type&&(b.isDirty=!0)});n.prototype.remove.apply(a,arguments)}})})(J);(function(a){a=a.seriesType;a("bar","column",null,{inverted:!0})})(J);(function(a){var C=a.Series;a=a.seriesType;a("scatter","line",{lineWidth:0,marker:{enabled:!0},tooltip:{headerFormat:'\x3cspan class\x3d"highcharts-color-{point.colorIndex}"\x3e\u25cf\x3c/span\x3e \x3cspan class\x3d"highcharts-header"\x3e {series.name}\x3c/span\x3e\x3cbr/\x3e',
pointFormat:"x: \x3cb\x3e{point.x}\x3c/b\x3e\x3cbr/\x3ey: \x3cb\x3e{point.y}\x3c/b\x3e\x3cbr/\x3e"}},{sorted:!1,requireSorting:!1,noSharedTooltip:!0,trackerGroups:["group","markerGroup","dataLabelsGroup"],takeOrdinalPosition:!1,kdDimensions:2,drawGraph:function(){this.options.lineWidth&&C.prototype.drawGraph.call(this)}})})(J);(function(a){var C=a.pick,A=a.relativeLength;a.CenteredSeriesMixin={getCenter:function(){var a=this.options,F=this.chart,u=2*(a.slicedOffset||0),h=F.plotWidth-2*u,F=F.plotHeight-
2*u,n=a.center,n=[C(n[0],"50%"),C(n[1],"50%"),a.size||"100%",a.innerSize||0],m=Math.min(h,F),q,k;for(q=0;4>q;++q)k=n[q],a=2>q||2===q&&/%$/.test(k),n[q]=A(k,[h,F,m,n[2]][q])+(a?u:0);n[3]>n[2]&&(n[3]=n[2]);return n}}})(J);(function(a){var C=a.addEvent,A=a.defined,D=a.each,F=a.extend,u=a.inArray,h=a.noop,n=a.pick,m=a.Point,q=a.Series,k=a.seriesType,d=a.setAnimation;k("pie","line",{center:[null,null],clip:!1,colorByPoint:!0,dataLabels:{distance:30,enabled:!0,formatter:function(){return null===this.y?
void 0:this.point.name},x:0},ignoreHiddenPoint:!0,legendType:"point",marker:null,size:null,showInLegend:!1,slicedOffset:10,stickyTracking:!1,tooltip:{followPointer:!0}},{isCartesian:!1,requireSorting:!1,directTouch:!0,noSharedTooltip:!0,trackerGroups:["group","dataLabelsGroup"],axisTypes:[],pointAttribs:a.seriesTypes.column.prototype.pointAttribs,animate:function(a){var b=this,d=b.points,k=b.startAngleRad;a||(D(d,function(a){var d=a.graphic,e=a.shapeArgs;d&&(d.attr({r:a.startR||b.center[3]/2,start:k,
end:k}),d.animate({r:e.r,start:e.start,end:e.end},b.options.animation))}),b.animate=null)},updateTotals:function(){var a,d=0,k=this.points,h=k.length,e,p=this.options.ignoreHiddenPoint;for(a=0;a<h;a++)e=k[a],0>e.y&&(e.y=null),d+=p&&!e.visible?0:e.y;this.total=d;for(a=0;a<h;a++)e=k[a],e.percentage=0<d&&(e.visible||!p)?e.y/d*100:0,e.total=d},generatePoints:function(){q.prototype.generatePoints.call(this);this.updateTotals()},translate:function(a){this.generatePoints();var b=0,d=this.options,k=d.slicedOffset,
e=k+(d.borderWidth||0),h,m,x,l=d.startAngle||0,q=this.startAngleRad=Math.PI/180*(l-90),l=(this.endAngleRad=Math.PI/180*(n(d.endAngle,l+360)-90))-q,u=this.points,f=d.dataLabels.distance,d=d.ignoreHiddenPoint,c,z=u.length,y;a||(this.center=a=this.getCenter());this.getX=function(b,c){x=Math.asin(Math.min((b-a[1])/(a[2]/2+f),1));return a[0]+(c?-1:1)*Math.cos(x)*(a[2]/2+f)};for(c=0;c<z;c++){y=u[c];h=q+b*l;if(!d||y.visible)b+=y.percentage/100;m=q+b*l;y.shapeType="arc";y.shapeArgs={x:a[0],y:a[1],r:a[2]/
2,innerR:a[3]/2,start:Math.round(1E3*h)/1E3,end:Math.round(1E3*m)/1E3};x=(m+h)/2;x>1.5*Math.PI?x-=2*Math.PI:x<-Math.PI/2&&(x+=2*Math.PI);y.slicedTranslation={translateX:Math.round(Math.cos(x)*k),translateY:Math.round(Math.sin(x)*k)};h=Math.cos(x)*a[2]/2;m=Math.sin(x)*a[2]/2;y.tooltipPos=[a[0]+.7*h,a[1]+.7*m];y.half=x<-Math.PI/2||x>Math.PI/2?1:0;y.angle=x;e=Math.min(e,f/5);y.labelPos=[a[0]+h+Math.cos(x)*f,a[1]+m+Math.sin(x)*f,a[0]+h+Math.cos(x)*e,a[1]+m+Math.sin(x)*e,a[0]+h,a[1]+m,0>f?"center":y.half?
"right":"left",x]}},drawGraph:null,drawPoints:function(){var a=this,d=a.chart.renderer,k,h,e;D(a.points,function(b){null!==b.y&&(h=b.graphic,e=b.shapeArgs,k=b.sliced?b.slicedTranslation:{},h?h.setRadialReference(a.center).animate(F(e,k)):(b.graphic=h=d[b.shapeType](e).addClass(b.getClassName()).setRadialReference(a.center).attr(k).add(a.group),b.visible||h.attr({visibility:"hidden"})))})},searchPoint:h,sortByAngle:function(a,d){a.sort(function(a,b){return void 0!==a.angle&&(b.angle-a.angle)*d})},
drawLegendSymbol:a.LegendSymbolMixin.drawRectangle,getCenter:a.CenteredSeriesMixin.getCenter,getSymbol:h},{init:function(){m.prototype.init.apply(this,arguments);var a=this,d;a.name=n(a.name,"Slice");d=function(b){a.slice("select"===b.type)};C(a,"select",d);C(a,"unselect",d);return a},setVisible:function(a,d){var b=this,k=b.series,e=k.chart,h=k.options.ignoreHiddenPoint;d=n(d,h);a!==b.visible&&(b.visible=b.options.visible=a=void 0===a?!b.visible:a,k.options.data[u(b,k.data)]=b.options,D(["graphic",
"dataLabel","connector","shadowGroup"],function(d){if(b[d])b[d][a?"show":"hide"](!0)}),b.legendItem&&e.legend.colorizeItem(b,a),a||"hover"!==b.state||b.setState(""),h&&(k.isDirty=!0),d&&e.redraw())},slice:function(a,k,h){var b=this.series;d(h,b.chart);n(k,!0);this.sliced=this.options.sliced=a=A(a)?a:!this.sliced;b.options.data[u(this,b.data)]=this.options;this.graphic.animate(a?this.slicedTranslation:{translateX:0,translateY:0})},haloPath:function(a){var b=this.shapeArgs;return this.sliced||!this.visible?
[]:this.series.chart.renderer.symbols.arc(b.x,b.y,b.r+a,b.r+a,{innerR:this.shapeArgs.r,start:b.start,end:b.end})}})})(J);(function(a){var C=a.addEvent,A=a.arrayMax,D=a.defined,F=a.each,u=a.extend,h=a.format,n=a.map,m=a.merge,q=a.noop,k=a.pick,d=a.relativeLength,b=a.Series,v=a.seriesTypes,B=a.stableSort;a.distribute=function(a,b){function d(a,b){return a.target-b.target}var e,k=!0,l=a,h=[],m;m=0;for(e=a.length;e--;)m+=a[e].size;if(m>b){B(a,function(a,b){return(b.rank||0)-(a.rank||0)});for(m=e=0;m<=
b;)m+=a[e].size,e++;h=a.splice(e-1,a.length)}B(a,d);for(a=n(a,function(a){return{size:a.size,targets:[a.target]}});k;){for(e=a.length;e--;)k=a[e],m=(Math.min.apply(0,k.targets)+Math.max.apply(0,k.targets))/2,k.pos=Math.min(Math.max(0,m-k.size/2),b-k.size);e=a.length;for(k=!1;e--;)0<e&&a[e-1].pos+a[e-1].size>a[e].pos&&(a[e-1].size+=a[e].size,a[e-1].targets=a[e-1].targets.concat(a[e].targets),a[e-1].pos+a[e-1].size>b&&(a[e-1].pos=b-a[e-1].size),a.splice(e,1),k=!0)}e=0;F(a,function(a){var b=0;F(a.targets,
function(){l[e].pos=a.pos+b;b+=l[e].size;e++})});l.push.apply(l,h);B(l,d)};b.prototype.drawDataLabels=function(){var a=this,b=a.options,d=b.dataLabels,n=a.points,q,l,v=a.hasRendered||0,u,f,c=k(d.defer,!0),z=a.chart.renderer;if(d.enabled||a._hasPointLabels)a.dlProcessOptions&&a.dlProcessOptions(d),f=a.plotGroup("dataLabelsGroup","data-labels",c&&!v?"hidden":"visible",d.zIndex||6),c&&(f.attr({opacity:+v}),v||C(a,"afterAnimate",function(){a.visible&&f.show(!0);f[b.animation?"animate":"attr"]({opacity:1},
{duration:200})})),l=d,F(n,function(b){var c,e=b.dataLabel,g,p,r,n=b.connector,t=!e;q=b.dlOptions||b.options&&b.options.dataLabels;if(c=k(q&&q.enabled,l.enabled)&&null!==b.y)for(p in d=m(l,q),g=b.getLabelConfig(),u=d.format?h(d.format,g):d.formatter.call(g,d),r=d.rotation,g={r:d.borderRadius||0,rotation:r,padding:d.padding,zIndex:1},g)void 0===g[p]&&delete g[p];!e||c&&D(u)?c&&D(u)&&(e?g.text=u:(e=b.dataLabel=z[r?"text":"label"](u,0,-9999,d.shape,null,null,d.useHTML,null,"data-label"),e.addClass("highcharts-data-label-color-"+
b.colorIndex+" "+(d.className||"")+(d.useHTML?"highcharts-tracker":""))),e.attr(g),e.added||e.add(f),a.alignDataLabel(b,e,d,null,t)):(b.dataLabel=e.destroy(),n&&(b.connector=n.destroy()))})};b.prototype.alignDataLabel=function(a,b,d,h,m){var l=this.chart,e=l.inverted,p=k(a.plotX,-9999),f=k(a.plotY,-9999),c=b.getBBox(),r,n=d.rotation,w=d.align,q=this.visible&&(a.series.forceDL||l.isInsidePlot(p,Math.round(f),e)||h&&l.isInsidePlot(p,e?h.x+1:h.y+h.height-1,e)),g="justify"===k(d.overflow,"justify");q&&
(r=l.renderer.fontMetrics(void 0,b).b,h=u({x:e?l.plotWidth-f:p,y:Math.round(e?l.plotHeight-p:f),width:0,height:0},h),u(d,{width:c.width,height:c.height}),n?(g=!1,e=l.renderer.rotCorr(r,n),e={x:h.x+d.x+h.width/2+e.x,y:h.y+d.y+{top:0,middle:.5,bottom:1}[d.verticalAlign]*h.height},b[m?"attr":"animate"](e).attr({align:w}),p=(n+720)%360,p=180<p&&360>p,"left"===w?e.y-=p?c.height:0:"center"===w?(e.x-=c.width/2,e.y-=c.height/2):"right"===w&&(e.x-=c.width,e.y-=p?0:c.height)):(b.align(d,null,h),e=b.alignAttr),
g?this.justifyDataLabel(b,d,e,c,h,m):k(d.crop,!0)&&(q=l.isInsidePlot(e.x,e.y)&&l.isInsidePlot(e.x+c.width,e.y+c.height)),d.shape&&!n&&b.attr({anchorX:a.plotX,anchorY:a.plotY}));q||(b.attr({y:-9999}),b.placed=!1)};b.prototype.justifyDataLabel=function(a,b,d,k,h,l){var e=this.chart,p=b.align,f=b.verticalAlign,c,m,r=a.box?0:a.padding||0;c=d.x+r;0>c&&("right"===p?b.align="left":b.x=-c,m=!0);c=d.x+k.width-r;c>e.plotWidth&&("left"===p?b.align="right":b.x=e.plotWidth-c,m=!0);c=d.y+r;0>c&&("bottom"===f?b.verticalAlign=
"top":b.y=-c,m=!0);c=d.y+k.height-r;c>e.plotHeight&&("top"===f?b.verticalAlign="bottom":b.y=e.plotHeight-c,m=!0);m&&(a.placed=!l,a.align(b,null,h))};v.pie&&(v.pie.prototype.drawDataLabels=function(){var d=this,e=d.data,h,m=d.chart,q=d.options.dataLabels,l=k(q.connectorPadding,10),v=k(q.connectorWidth,1),u=m.plotWidth,f=m.plotHeight,c,z=q.distance,y=d.center,w=y[2]/2,G=y[1],g=0<z,E,B,C,Q,D=[[],[]],L,O,K,M,J=[0,0,0,0];d.visible&&(q.enabled||d._hasPointLabels)&&(b.prototype.drawDataLabels.apply(d),F(e,
function(a){a.dataLabel&&a.visible&&(D[a.half].push(a),a.dataLabel._pos=null)}),F(D,function(b,c){var g,e,k=b.length,p,r,t;if(k)for(d.sortByAngle(b,c-.5),0<z&&(g=Math.max(0,G-w-z),e=Math.min(G+w+z,m.plotHeight),p=n(b,function(a){if(a.dataLabel)return t=a.dataLabel.getBBox().height||21,{target:a.labelPos[1]-g+t/2,size:t,rank:a.y}}),a.distribute(p,e+t-g)),M=0;M<k;M++)h=b[M],C=h.labelPos,E=h.dataLabel,K=!1===h.visible?"hidden":"inherit",r=C[1],p?void 0===p[M].pos?K="hidden":(Q=p[M].size,O=g+p[M].pos):
O=r,L=q.justify?y[0]+(c?-1:1)*(w+z):d.getX(O<g+2||O>e-2?r:O,c),E._attr={visibility:K,align:C[6]},E._pos={x:L+q.x+({left:l,right:-l}[C[6]]||0),y:O+q.y-10},C.x=L,C.y=O,null===d.options.size&&(B=E.width,L-B<l?J[3]=Math.max(Math.round(B-L+l),J[3]):L+B>u-l&&(J[1]=Math.max(Math.round(L+B-u+l),J[1])),0>O-Q/2?J[0]=Math.max(Math.round(-O+Q/2),J[0]):O+Q/2>f&&(J[2]=Math.max(Math.round(O+Q/2-f),J[2])))}),0===A(J)||this.verifyDataLabelOverflow(J))&&(this.placeDataLabels(),g&&v&&F(this.points,function(a){var b;
c=a.connector;if((E=a.dataLabel)&&E._pos&&a.visible){K=E._attr.visibility;if(b=!c)a.connector=c=m.renderer.path().addClass("highcharts-data-label-connector highcharts-color-"+a.colorIndex).add(d.dataLabelsGroup);c[b?"attr":"animate"]({d:d.connectorPath(a.labelPos)});c.attr("visibility",K)}else c&&(a.connector=c.destroy())}))},v.pie.prototype.connectorPath=function(a){var b=a.x,d=a.y;return k(this.options.dataLabels.softConnector,!0)?["M",b+("left"===a[6]?5:-5),d,"C",b,d,2*a[2]-a[4],2*a[3]-a[5],a[2],
a[3],"L",a[4],a[5]]:["M",b+("left"===a[6]?5:-5),d,"L",a[2],a[3],"L",a[4],a[5]]},v.pie.prototype.placeDataLabels=function(){F(this.points,function(a){var b=a.dataLabel;b&&a.visible&&((a=b._pos)?(b.attr(b._attr),b[b.moved?"animate":"attr"](a),b.moved=!0):b&&b.attr({y:-9999}))})},v.pie.prototype.alignDataLabel=q,v.pie.prototype.verifyDataLabelOverflow=function(a){var b=this.center,k=this.options,h=k.center,m=k.minSize||80,l,r;null!==h[0]?l=Math.max(b[2]-Math.max(a[1],a[3]),m):(l=Math.max(b[2]-a[1]-a[3],
m),b[0]+=(a[3]-a[1])/2);null!==h[1]?l=Math.max(Math.min(l,b[2]-Math.max(a[0],a[2])),m):(l=Math.max(Math.min(l,b[2]-a[0]-a[2]),m),b[1]+=(a[0]-a[2])/2);l<b[2]?(b[2]=l,b[3]=Math.min(d(k.innerSize||0,l),l),this.translate(b),this.drawDataLabels&&this.drawDataLabels()):r=!0;return r});v.column&&(v.column.prototype.alignDataLabel=function(a,d,h,n,q){var l=this.chart.inverted,e=a.series,p=a.dlBox||a.shapeArgs,f=k(a.below,a.plotY>k(this.translatedThreshold,e.yAxis.len)),c=k(h.inside,!!this.options.stacking);
p&&(n=m(p),0>n.y&&(n.height+=n.y,n.y=0),p=n.y+n.height-e.yAxis.len,0<p&&(n.height-=p),l&&(n={x:e.yAxis.len-n.y-n.height,y:e.xAxis.len-n.x-n.width,width:n.height,height:n.width}),c||(l?(n.x+=f?0:n.width,n.width=0):(n.y+=f?n.height:0,n.height=0)));h.align=k(h.align,!l||c?"center":f?"right":"left");h.verticalAlign=k(h.verticalAlign,l||c?"middle":f?"top":"bottom");b.prototype.alignDataLabel.call(this,a,d,h,n,q)})})(J);(function(a){var C=a.Chart,A=a.each,D=a.pick,F=a.addEvent;C.prototype.callbacks.push(function(a){function h(){var h=
[];A(a.series,function(a){var m=a.options.dataLabels,k=a.dataLabelCollections||["dataLabel"];(m.enabled||a._hasPointLabels)&&!m.allowOverlap&&a.visible&&A(k,function(d){A(a.points,function(a){a[d]&&(a[d].labelrank=D(a.labelrank,a.shapeArgs&&a.shapeArgs.height),h.push(a[d]))})})});a.hideOverlappingLabels(h)}h();F(a,"redraw",h)});C.prototype.hideOverlappingLabels=function(a){var h=a.length,n,m,q,k,d,b,v,u,r,e=function(a,b,d,l,e,k,f,c){return!(e>a+d||e+f<a||k>b+l||k+c<b)};for(m=0;m<h;m++)if(n=a[m])n.oldOpacity=
n.opacity,n.newOpacity=1;a.sort(function(a,b){return(b.labelrank||0)-(a.labelrank||0)});for(m=0;m<h;m++)for(q=a[m],n=m+1;n<h;++n)if(k=a[n],q&&k&&q.placed&&k.placed&&0!==q.newOpacity&&0!==k.newOpacity&&(d=q.alignAttr,b=k.alignAttr,v=q.parentGroup,u=k.parentGroup,r=2*(q.box?0:q.padding),d=e(d.x+v.translateX,d.y+v.translateY,q.width-r,q.height-r,b.x+u.translateX,b.y+u.translateY,k.width-r,k.height-r)))(q.labelrank<k.labelrank?q:k).newOpacity=0;A(a,function(a){var b,d;a&&(d=a.newOpacity,a.oldOpacity!==
d&&a.placed&&(d?a.show(!0):b=function(){a.hide()},a.alignAttr.opacity=d,a[a.isOld?"animate":"attr"](a.alignAttr,null,b)),a.isOld=!0)})}})(J);(function(a){var C=a.addEvent,A=a.Chart,D=a.createElement,F=a.css,u=a.defaultOptions,h=a.defaultPlotOptions,n=a.each,m=a.extend,q=a.fireEvent,k=a.hasTouch,d=a.inArray,b=a.isObject,v=a.Legend,B=a.merge,r=a.pick,e=a.Point,p=a.Series,t=a.seriesTypes,x=a.svg;a=a.TrackerMixin={drawTrackerPoint:function(){var a=this,b=a.chart,d=b.pointer,f=function(a){for(var c=a.target,
f;c&&!f;)f=c.point,c=c.parentNode;if(void 0!==f&&f!==b.hoverPoint)f.onMouseOver(a)};n(a.points,function(a){a.graphic&&(a.graphic.element.point=a);a.dataLabel&&(a.dataLabel.div?a.dataLabel.div.point=a:a.dataLabel.element.point=a)});a._hasTracking||(n(a.trackerGroups,function(b){if(a[b]&&(a[b].addClass("highcharts-tracker").on("mouseover",f).on("mouseout",function(a){d.onTrackerMouseOut(a)}),k))a[b].on("touchstart",f)}),a._hasTracking=!0)},drawTrackerGraph:function(){var a=this,b=a.options.trackByArea,
d=[].concat(b?a.areaPath:a.graphPath),f=d.length,c=a.chart,e=c.pointer,h=c.renderer,m=c.options.tooltip.snap,p=a.tracker,g,r=function(){if(c.hoverSeries!==a)a.onMouseOver()},q="rgba(192,192,192,"+(x?.0001:.002)+")";if(f&&!b)for(g=f+1;g--;)"M"===d[g]&&d.splice(g+1,0,d[g+1]-m,d[g+2],"L"),(g&&"M"===d[g]||g===f)&&d.splice(g,0,"L",d[g-2]+m,d[g-1]);p?p.attr({d:d}):a.graph&&(a.tracker=h.path(d).attr({"stroke-linejoin":"round",visibility:a.visible?"visible":"hidden",stroke:q,fill:b?q:"none","stroke-width":a.graph.strokeWidth()+
(b?0:2*m),zIndex:2}).add(a.group),n([a.tracker,a.markerGroup],function(a){a.addClass("highcharts-tracker").on("mouseover",r).on("mouseout",function(a){e.onTrackerMouseOut(a)});if(k)a.on("touchstart",r)}))}};t.column&&(t.column.prototype.drawTracker=a.drawTrackerPoint);t.pie&&(t.pie.prototype.drawTracker=a.drawTrackerPoint);t.scatter&&(t.scatter.prototype.drawTracker=a.drawTrackerPoint);m(v.prototype,{setItemEvents:function(a,b,d){var f=this.chart,c="highcharts-legend-"+(a.series?"point":"series")+
"-active";(d?b:a.legendGroup).on("mouseover",function(){a.setState("hover");f.seriesGroup.addClass(c)}).on("mouseout",function(){f.seriesGroup.removeClass(c);a.setState()}).on("click",function(b){var c=function(){a.setVisible&&a.setVisible()};b={browserEvent:b};a.firePointEvent?a.firePointEvent("legendItemClick",b,c):q(a,"legendItemClick",b,c)})},createCheckboxForItem:function(a){a.checkbox=D("input",{type:"checkbox",checked:a.selected,defaultChecked:a.selected},this.options.itemCheckboxStyle,this.chart.container);
C(a.checkbox,"click",function(b){q(a.series||a,"checkboxClick",{checked:b.target.checked,item:a},function(){a.select()})})}});m(A.prototype,{showResetZoom:function(){var a=this,b=u.lang,d=a.options.chart.resetZoomButton,f=d.theme,c=f.states,e="chart"===d.relativeTo?null:"plotBox";this.resetZoomButton=a.renderer.button(b.resetZoom,null,null,function(){a.zoomOut()},f,c&&c.hover).attr({align:d.position.align,title:b.resetZoomTitle}).addClass("highcharts-reset-zoom").add().align(d.position,!1,e)},zoomOut:function(){var a=
this;q(a,"selection",{resetSelection:!0},function(){a.zoom()})},zoom:function(a){var d,e=this.pointer,f=!1,c;!a||a.resetSelection?n(this.axes,function(a){d=a.zoom()}):n(a.xAxis.concat(a.yAxis),function(a){var b=a.axis;e[b.isXAxis?"zoomX":"zoomY"]&&(d=b.zoom(a.min,a.max),b.displayBtn&&(f=!0))});c=this.resetZoomButton;f&&!c?this.showResetZoom():!f&&b(c)&&(this.resetZoomButton=c.destroy());d&&this.redraw(r(this.options.chart.animation,a&&a.animation,100>this.pointCount))},pan:function(a,b){var d=this,
f=d.hoverPoints,c;f&&n(f,function(a){a.setState()});n("xy"===b?[1,0]:[1],function(b){b=d[b?"xAxis":"yAxis"][0];var f=b.horiz,e=a[f?"chartX":"chartY"],f=f?"mouseDownX":"mouseDownY",l=d[f],g=(b.pointRange||0)/2,k=b.getExtremes(),h=b.toValue(l-e,!0)+g,g=b.toValue(l+b.len-e,!0)-g,m=g<h,l=m?g:h,h=m?h:g,g=Math.min(k.dataMin,k.min)-l,k=h-Math.max(k.dataMax,k.max);b.series.length&&0>g&&0>k&&(b.setExtremes(l,h,!1,!1,{trigger:"pan"}),c=!0);d[f]=e});c&&d.redraw(!1);F(d.container,{cursor:"move"})}});m(e.prototype,
{select:function(a,b){var e=this,f=e.series,c=f.chart;a=r(a,!e.selected);e.firePointEvent(a?"select":"unselect",{accumulate:b},function(){e.selected=e.options.selected=a;f.options.data[d(e,f.data)]=e.options;e.setState(a&&"select");b||n(c.getSelectedPoints(),function(a){a.selected&&a!==e&&(a.selected=a.options.selected=!1,f.options.data[d(a,f.data)]=a.options,a.setState(""),a.firePointEvent("unselect"))})})},onMouseOver:function(a,b){var d=this.series,f=d.chart,c=f.tooltip,e=f.hoverPoint;if(this.series){if(!b){if(e&&
e!==this)e.onMouseOut();if(f.hoverSeries!==d)d.onMouseOver();f.hoverPoint=this}!c||c.shared&&!d.noSharedTooltip?c||this.setState("hover"):(this.setState("hover"),c.refresh(this,a));this.firePointEvent("mouseOver")}},onMouseOut:function(){var a=this.series.chart,b=a.hoverPoints;this.firePointEvent("mouseOut");b&&-1!==d(this,b)||(this.setState(),a.hoverPoint=null)},importEvents:function(){if(!this.hasImportedEvents){var a=B(this.series.options.point,this.options).events,b;this.events=a;for(b in a)C(this,
b,a[b]);this.hasImportedEvents=!0}},setState:function(a,b){var d=Math.floor(this.plotX),f=this.plotY,c=this.series,e=c.options.states[a]||{},l=h[c.type].marker&&c.options.marker,k=l&&!1===l.enabled,m=l&&l.states&&l.states[a]||{},g=!1===m.enabled,p=c.stateMarkerGraphic,n=this.marker||{},q=c.chart,v=c.halo,x,t=l&&c.markerAttribs;a=a||"";if(!(a===this.state&&!b||this.selected&&"select"!==a||!1===e.enabled||a&&(g||k&&!1===m.enabled)||a&&n.states&&n.states[a]&&!1===n.states[a].enabled)){t&&(x=c.markerAttribs(this,
a));if(this.graphic)this.state&&this.graphic.removeClass("highcharts-point-"+this.state),a&&this.graphic.addClass("highcharts-point-"+a),x&&this.graphic.animate(x,r(q.options.chart.animation,m.animation,l.animation)),p&&p.hide();else{if(a&&m)if(l=n.symbol||c.symbol,p&&p.currentSymbol!==l&&(p=p.destroy()),p)p[b?"animate":"attr"]({x:x.x,y:x.y});else l&&(c.stateMarkerGraphic=p=q.renderer.symbol(l,x.x,x.y,x.width,x.height).add(c.markerGroup),p.currentSymbol=l);p&&(p[a&&q.isInsidePlot(d,f,q.inverted)?
"show":"hide"](),p.element.point=this)}(d=e.halo)&&d.size?(v||(c.halo=v=q.renderer.path().add(t?c.markerGroup:c.group)),v[b?"animate":"attr"]({d:this.haloPath(d.size)}),v.attr({"class":"highcharts-halo highcharts-color-"+r(this.colorIndex,c.colorIndex)}),v.point=this):v&&v.point&&v.point.haloPath&&v.animate({d:v.point.haloPath(0)});this.state=a}},haloPath:function(a){return this.series.chart.renderer.symbols.circle(Math.floor(this.plotX)-a,this.plotY-a,2*a,2*a)}});m(p.prototype,{onMouseOver:function(){var a=
this.chart,b=a.hoverSeries;if(b&&b!==this)b.onMouseOut();this.options.events.mouseOver&&q(this,"mouseOver");this.setState("hover");a.hoverSeries=this},onMouseOut:function(){var a=this.options,b=this.chart,d=b.tooltip,f=b.hoverPoint;b.hoverSeries=null;if(f)f.onMouseOut();this&&a.events.mouseOut&&q(this,"mouseOut");!d||a.stickyTracking||d.shared&&!this.noSharedTooltip||d.hide();this.setState()},setState:function(a){var b=this;a=a||"";b.state!==a&&(n([b.group,b.markerGroup],function(d){d&&(b.state&&
d.removeClass("highcharts-series-"+b.state),a&&d.addClass("highcharts-series-"+a))}),b.state=a)},setVisible:function(a,b){var d=this,f=d.chart,c=d.legendItem,e,l=f.options.chart.ignoreHiddenSeries,k=d.visible;e=(d.visible=a=d.options.visible=d.userOptions.visible=void 0===a?!k:a)?"show":"hide";n(["group","dataLabelsGroup","markerGroup","tracker","tt"],function(a){if(d[a])d[a][e]()});if(f.hoverSeries===d||(f.hoverPoint&&f.hoverPoint.series)===d)d.onMouseOut();c&&f.legend.colorizeItem(d,a);d.isDirty=
!0;d.options.stacking&&n(f.series,function(a){a.options.stacking&&a.visible&&(a.isDirty=!0)});n(d.linkedSeries,function(b){b.setVisible(a,!1)});l&&(f.isDirtyBox=!0);!1!==b&&f.redraw();q(d,e)},show:function(){this.setVisible(!0)},hide:function(){this.setVisible(!1)},select:function(a){this.selected=a=void 0===a?!this.selected:a;this.checkbox&&(this.checkbox.checked=a);q(this,a?"select":"unselect")},drawTracker:a.drawTrackerGraph})})(J);(function(a){var C=a.Chart,A=a.each,D=a.inArray,F=a.isObject,u=
a.pick,h=a.splat;C.prototype.setResponsive=function(a){var h=this.options.responsive;h&&h.rules&&A(h.rules,function(h){this.matchResponsiveRule(h,a)},this)};C.prototype.matchResponsiveRule=function(h,m){var n=this.respRules,k=h.condition,d;d=k.callback||function(){return this.chartWidth<=u(k.maxWidth,Number.MAX_VALUE)&&this.chartHeight<=u(k.maxHeight,Number.MAX_VALUE)&&this.chartWidth>=u(k.minWidth,0)&&this.chartHeight>=u(k.minHeight,0)};void 0===h._id&&(h._id=a.uniqueKey());d=d.call(this);!n[h._id]&&
d?h.chartOptions&&(n[h._id]=this.currentOptions(h.chartOptions),this.update(h.chartOptions,m)):n[h._id]&&!d&&(this.update(n[h._id],m),delete n[h._id])};C.prototype.currentOptions=function(a){function m(a,d,b,n){var k,r;for(k in a)if(!n&&-1<D(k,["series","xAxis","yAxis"]))for(a[k]=h(a[k]),b[k]=[],r=0;r<a[k].length;r++)b[k][r]={},m(a[k][r],d[k][r],b[k][r],n+1);else F(a[k])?(b[k]={},m(a[k],d[k]||{},b[k],n+1)):b[k]=d[k]||null}var n={};m(a,this.options,n,0);return n}})(J);(function(a){var C=a.addEvent,
A=a.Axis,D=a.Chart,F=a.css,u=a.dateFormat,h=a.defined,n=a.each,m=a.extend,q=a.noop,k=a.Series,d=a.timeUnits;a=a.wrap;a(k.prototype,"init",function(a){var b;a.apply(this,Array.prototype.slice.call(arguments,1));(b=this.xAxis)&&b.options.ordinal&&C(this,"updatedData",function(){delete b.ordinalIndex})});a(A.prototype,"getTimeTicks",function(a,k,m,n,e,p,q,x){var b=0,r,v,f={},c,z,t,w=[],G=-Number.MAX_VALUE,g=this.options.tickPixelInterval;if(!this.options.ordinal&&!this.options.breaks||!p||3>p.length||
void 0===m)return a.call(this,k,m,n,e);z=p.length;for(r=0;r<z;r++){t=r&&p[r-1]>n;p[r]<m&&(b=r);if(r===z-1||p[r+1]-p[r]>5*q||t){if(p[r]>G){for(v=a.call(this,k,p[b],p[r],e);v.length&&v[0]<=G;)v.shift();v.length&&(G=v[v.length-1]);w=w.concat(v)}b=r+1}if(t)break}a=v.info;if(x&&a.unitRange<=d.hour){r=w.length-1;for(b=1;b<r;b++)u("%d",w[b])!==u("%d",w[b-1])&&(f[w[b]]="day",c=!0);c&&(f[w[0]]="day");a.higherRanks=f}w.info=a;if(x&&h(g)){x=a=w.length;r=[];var E;for(c=[];x--;)b=this.translate(w[x]),E&&(c[x]=
E-b),r[x]=E=b;c.sort();c=c[Math.floor(c.length/2)];c<.6*g&&(c=null);x=w[a-1]>n?a-1:a;for(E=void 0;x--;)b=r[x],n=Math.abs(E-b),E&&n<.8*g&&(null===c||n<.8*c)?(f[w[x]]&&!f[w[x+1]]?(n=x+1,E=b):n=x,w.splice(n,1)):E=b}return w});m(A.prototype,{beforeSetTickPositions:function(){var a,d=[],k=!1,h,e=this.getExtremes(),m=e.min,q=e.max,x,l=this.isXAxis&&!!this.options.breaks,e=this.options.ordinal,u=this.chart.options.chart.ignoreHiddenSeries;if(e||l){n(this.series,function(b,f){if(!(u&&!1===b.visible||!1===
b.takeOrdinalPosition&&!l)&&(d=d.concat(b.processedXData),a=d.length,d.sort(function(a,b){return a-b}),a))for(f=a-1;f--;)d[f]===d[f+1]&&d.splice(f,1)});a=d.length;if(2<a){h=d[1]-d[0];for(x=a-1;x--&&!k;)d[x+1]-d[x]!==h&&(k=!0);!this.options.keepOrdinalPadding&&(d[0]-m>h||q-d[d.length-1]>h)&&(k=!0)}k?(this.ordinalPositions=d,h=this.ordinal2lin(Math.max(m,d[0]),!0),x=Math.max(this.ordinal2lin(Math.min(q,d[d.length-1]),!0),1),this.ordinalSlope=q=(q-m)/(x-h),this.ordinalOffset=m-h*q):this.ordinalPositions=
this.ordinalSlope=this.ordinalOffset=void 0}this.isOrdinal=e&&k;this.groupIntervalFactor=null},val2lin:function(a,d){var b=this.ordinalPositions;if(b){var k=b.length,e,h;for(e=k;e--;)if(b[e]===a){h=e;break}for(e=k-1;e--;)if(a>b[e]||0===e){a=(a-b[e])/(b[e+1]-b[e]);h=e+a;break}d=d?h:this.ordinalSlope*(h||0)+this.ordinalOffset}else d=a;return d},lin2val:function(a,d){var b=this.ordinalPositions;if(b){var k=this.ordinalSlope,e=this.ordinalOffset,h=b.length-1,m;if(d)0>a?a=b[0]:a>h?a=b[h]:(h=Math.floor(a),
m=a-h);else for(;h--;)if(d=k*h+e,a>=d){k=k*(h+1)+e;m=(a-d)/(k-d);break}return void 0!==m&&void 0!==b[h]?b[h]+(m?m*(b[h+1]-b[h]):0):a}return a},getExtendedPositions:function(){var a=this.chart,d=this.series[0].currentDataGrouping,h=this.ordinalIndex,k=d?d.count+d.unitName:"raw",e=this.getExtremes(),m,t;h||(h=this.ordinalIndex={});h[k]||(m={series:[],chart:a,getExtremes:function(){return{min:e.dataMin,max:e.dataMax}},options:{ordinal:!0},val2lin:A.prototype.val2lin},n(this.series,function(b){t={xAxis:m,
xData:b.xData,chart:a,destroyGroupedData:q};t.options={dataGrouping:d?{enabled:!0,forced:!0,approximation:"open",units:[[d.unitName,[d.count]]]}:{enabled:!1}};b.processData.apply(t);m.series.push(t)}),this.beforeSetTickPositions.apply(m),h[k]=m.ordinalPositions);return h[k]},getGroupIntervalFactor:function(a,d,h){var b;h=h.processedXData;var e=h.length,k=[];b=this.groupIntervalFactor;if(!b){for(b=0;b<e-1;b++)k[b]=h[b+1]-h[b];k.sort(function(a,b){return a-b});k=k[Math.floor(e/2)];a=Math.max(a,h[0]);
d=Math.min(d,h[e-1]);this.groupIntervalFactor=b=e*k/(d-a)}return b},postProcessTickInterval:function(a){var b=this.ordinalSlope;return b?this.options.breaks?this.closestPointRange:a/(b/this.closestPointRange):a}});A.prototype.ordinal2lin=A.prototype.val2lin;a(D.prototype,"pan",function(a,d){var b=this.xAxis[0],h=d.chartX,e=!1;if(b.options.ordinal&&b.series.length){var k=this.mouseDownX,m=b.getExtremes(),q=m.dataMax,l=m.min,v=m.max,u=this.hoverPoints,f=b.closestPointRange,k=(k-h)/(b.translationSlope*
(b.ordinalSlope||f)),c={ordinalPositions:b.getExtendedPositions()},f=b.lin2val,z=b.val2lin,y;c.ordinalPositions?1<Math.abs(k)&&(u&&n(u,function(a){a.setState()}),0>k?(u=c,y=b.ordinalPositions?b:c):(u=b.ordinalPositions?b:c,y=c),c=y.ordinalPositions,q>c[c.length-1]&&c.push(q),this.fixedRange=v-l,k=b.toFixedRange(null,null,f.apply(u,[z.apply(u,[l,!0])+k,!0]),f.apply(y,[z.apply(y,[v,!0])+k,!0])),k.min>=Math.min(m.dataMin,l)&&k.max<=Math.max(q,v)&&b.setExtremes(k.min,k.max,!0,!1,{trigger:"pan"}),this.mouseDownX=
h,F(this.container,{cursor:"move"})):e=!0}else e=!0;e&&a.apply(this,Array.prototype.slice.call(arguments,1))});k.prototype.gappedPath=function(){var a=this.options.gapSize,d=this.points.slice(),k=d.length-1;if(a&&0<k)for(;k--;)d[k+1].x-d[k].x>this.closestPointRange*a&&d.splice(k+1,0,{isNull:!0});return this.getGraphPath(d)}})(J);(function(a){function C(){return Array.prototype.slice.call(arguments,1)}function A(a){a.apply(this);this.drawBreaks(this.xAxis,["x"]);this.drawBreaks(this.yAxis,D(this.pointArrayMap,
["y"]))}var D=a.pick,F=a.wrap,u=a.each,h=a.extend,n=a.isArray,m=a.fireEvent,q=a.Axis,k=a.Series;h(q.prototype,{isInBreak:function(a,b){var d=a.repeat||Infinity,k=a.from,h=a.to-a.from;b=b>=k?(b-k)%d:d-(k-b)%d;return a.inclusive?b<=h:b<h&&0!==b},isInAnyBreak:function(a,b){var d=this.options.breaks,k=d&&d.length,h,e,m;if(k){for(;k--;)this.isInBreak(d[k],a)&&(h=!0,e||(e=D(d[k].showPoints,this.isXAxis?!1:!0)));m=h&&b?h&&!e:h}return m}});F(q.prototype,"setTickPositions",function(a){a.apply(this,Array.prototype.slice.call(arguments,
1));if(this.options.breaks){var b=this.tickPositions,d=this.tickPositions.info,k=[],h;for(h=0;h<b.length;h++)this.isInAnyBreak(b[h])||k.push(b[h]);this.tickPositions=k;this.tickPositions.info=d}});F(q.prototype,"init",function(a,b,k){var d=this;k.breaks&&k.breaks.length&&(k.ordinal=!1);a.call(this,b,k);a=this.options.breaks;d.isBroken=n(a)&&!!a.length;d.isBroken&&(d.val2lin=function(a){var b=a,k,h;for(h=0;h<d.breakArray.length;h++)if(k=d.breakArray[h],k.to<=a)b-=k.len;else if(k.from>=a)break;else if(d.isInBreak(k,
a)){b-=a-k.from;break}return b},d.lin2val=function(a){var b,k;for(k=0;k<d.breakArray.length&&!(b=d.breakArray[k],b.from>=a);k++)b.to<a?a+=b.len:d.isInBreak(b,a)&&(a+=b.len);return a},d.setExtremes=function(a,b,d,k,h){for(;this.isInAnyBreak(a);)a-=this.closestPointRange;for(;this.isInAnyBreak(b);)b-=this.closestPointRange;q.prototype.setExtremes.call(this,a,b,d,k,h)},d.setAxisTranslation=function(a){q.prototype.setAxisTranslation.call(this,a);var b=d.options.breaks;a=[];var k=[],h=0,n,l,r=d.userMin||
d.min,v=d.userMax||d.max,f,c;for(c in b)l=b[c],n=l.repeat||Infinity,d.isInBreak(l,r)&&(r+=l.to%n-r%n),d.isInBreak(l,v)&&(v-=v%n-l.from%n);for(c in b){l=b[c];f=l.from;for(n=l.repeat||Infinity;f-n>r;)f-=n;for(;f<r;)f+=n;for(;f<v;f+=n)a.push({value:f,move:"in"}),a.push({value:f+(l.to-l.from),move:"out",size:l.breakSize})}a.sort(function(a,b){return a.value===b.value?("in"===a.move?0:1)-("in"===b.move?0:1):a.value-b.value});b=0;f=r;for(c in a)l=a[c],b+="in"===l.move?1:-1,1===b&&"in"===l.move&&(f=l.value),
0===b&&(k.push({from:f,to:l.value,len:l.value-f-(l.size||0)}),h+=l.value-f-(l.size||0));d.breakArray=k;m(d,"afterBreaks");d.transA*=(v-d.min)/(v-r-h);d.min=r;d.max=v})});F(k.prototype,"generatePoints",function(a){a.apply(this,C(arguments));var b=this.xAxis,d=this.yAxis,k=this.points,h,e=k.length,m=this.options.connectNulls,n;if(b&&d&&(b.options.breaks||d.options.breaks))for(;e--;)h=k[e],n=null===h.y&&!1===m,n||!b.isInAnyBreak(h.x,!0)&&!d.isInAnyBreak(h.y,!0)||(k.splice(e,1),this.data[e]&&this.data[e].destroyElements())});
a.Series.prototype.drawBreaks=function(a,b){var d=this,k=d.points,h,e,n,q;a&&u(b,function(b){h=a.breakArray||[];e=a.isXAxis?a.min:D(d.options.threshold,a.min);u(k,function(d){q=D(d["stack"+b.toUpperCase()],d[b]);u(h,function(b){n=!1;if(e<b.from&&q>b.to||e>b.from&&q<b.from)n="pointBreak";else if(e<b.from&&q>b.from&&q<b.to||e>b.from&&q>b.to&&q<b.from)n="pointInBreak";n&&m(a,n,{point:d,brk:b})})})})};F(a.seriesTypes.column.prototype,"drawPoints",A);F(a.Series.prototype,"drawPoints",A)})(J);(function(a){var C=
a.arrayMax,A=a.arrayMin,D=a.Axis,F=a.defaultPlotOptions,u=a.defined,h=a.each,n=a.extend,m=a.format,q=a.isNumber,k=a.merge,d=a.pick,b=a.Point,v=a.Tooltip,B=a.wrap,r=a.Series.prototype,e=r.processData,p=r.generatePoints,t=r.destroy,x={approximation:"average",groupPixelWidth:2,dateTimeLabelFormats:{millisecond:["%A, %b %e, %H:%M:%S.%L","%A, %b %e, %H:%M:%S.%L","-%H:%M:%S.%L"],second:["%A, %b %e, %H:%M:%S","%A, %b %e, %H:%M:%S","-%H:%M:%S"],minute:["%A, %b %e, %H:%M","%A, %b %e, %H:%M","-%H:%M"],hour:["%A, %b %e, %H:%M",
"%A, %b %e, %H:%M","-%H:%M"],day:["%A, %b %e, %Y","%A, %b %e","-%A, %b %e, %Y"],week:["Week from %A, %b %e, %Y","%A, %b %e","-%A, %b %e, %Y"],month:["%B %Y","%B","-%B %Y"],year:["%Y","%Y","-%Y"]}},l={line:{},spline:{},area:{},areaspline:{},column:{approximation:"sum",groupPixelWidth:10},arearange:{approximation:"range"},areasplinerange:{approximation:"range"},columnrange:{approximation:"range",groupPixelWidth:10},candlestick:{approximation:"ohlc",groupPixelWidth:10},ohlc:{approximation:"ohlc",groupPixelWidth:5}},
I=a.defaultDataGroupingUnits=[["millisecond",[1,2,5,10,20,25,50,100,200,500]],["second",[1,2,5,10,15,30]],["minute",[1,2,5,10,15,30]],["hour",[1,2,3,4,6,8,12]],["day",[1]],["week",[1]],["month",[1,3,6]],["year",null]],H={sum:function(a){var b=a.length,d;if(!b&&a.hasNulls)d=null;else if(b)for(d=0;b--;)d+=a[b];return d},average:function(a){var b=a.length;a=H.sum(a);q(a)&&b&&(a/=b);return a},open:function(a){return a.length?a[0]:a.hasNulls?null:void 0},high:function(a){return a.length?C(a):a.hasNulls?
null:void 0},low:function(a){return a.length?A(a):a.hasNulls?null:void 0},close:function(a){return a.length?a[a.length-1]:a.hasNulls?null:void 0},ohlc:function(a,b,d,e){a=H.open(a);b=H.high(b);d=H.low(d);e=H.close(e);if(q(a)||q(b)||q(d)||q(e))return[a,b,d,e]},range:function(a,b){a=H.low(a);b=H.high(b);if(q(a)||q(b))return[a,b]}};r.groupData=function(a,b,d,e){var c=this.data,f=this.options.data,g=[],k=[],h=[],l=a.length,m,n,p=!!b,r=[[],[],[],[]];e="function"===typeof e?e:H[e];var z=this.pointArrayMap,
x=z&&z.length,t,v=0;for(t=n=0;t<=l&&!(a[t]>=d[0]);t++);for(t;t<=l;t++){for(;(void 0!==d[v+1]&&a[t]>=d[v+1]||t===l)&&(m=d[v],this.dataGroupInfo={start:n,length:r[0].length},n=e.apply(this,r),void 0!==n&&(g.push(m),k.push(n),h.push(this.dataGroupInfo)),n=t,r[0]=[],r[1]=[],r[2]=[],r[3]=[],v+=1,t!==l););if(t===l)break;if(z){m=this.cropStart+t;m=c&&c[m]||this.pointClass.prototype.applyOptions.apply({series:this},[f[m]]);var u,y;for(u=0;u<x;u++)y=m[z[u]],q(y)?r[u].push(y):null===y&&(r[u].hasNulls=!0)}else m=
p?b[t]:null,q(m)?r[0].push(m):null===m&&(r[0].hasNulls=!0)}return[g,k,h]};r.processData=function(){var a=this.chart,b=this.options.dataGrouping,k=!1!==this.allowDG&&b&&d(b.enabled,a.options.isStock),h=this.visible||!a.options.chart.ignoreHiddenSeries,l;this.forceCrop=k;this.groupPixelWidth=null;this.hasProcessed=!0;if(!1!==e.apply(this,arguments)&&k&&h){this.destroyGroupedData();var m=this.processedXData,g=this.processedYData,n=a.plotSizeX,a=this.xAxis,p=a.options.ordinal,q=this.groupPixelWidth=a.getGroupPixelWidth&&
a.getGroupPixelWidth();if(q){this.isDirty=l=!0;h=a.getExtremes();k=h.min;h=h.max;p=p&&a.getGroupIntervalFactor(k,h,this)||1;n=q*(h-k)/n*p;q=a.getTimeTicks(a.normalizeTimeTickInterval(n,b.units||I),Math.min(k,m[0]),Math.max(h,m[m.length-1]),a.options.startOfWeek,m,this.closestPointRange);m=r.groupData.apply(this,[m,g,q,b.approximation]);g=m[0];p=m[1];if(b.smoothed){b=g.length-1;for(g[b]=Math.min(g[b],h);b--&&0<b;)g[b]+=n/2;g[0]=Math.max(g[0],k)}this.currentDataGrouping=q.info;this.closestPointRange=
q.info.totalRange;this.groupMap=m[2];u(g[0])&&g[0]<a.dataMin&&(a.min===a.dataMin&&(a.min=g[0]),a.dataMin=g[0]);this.processedXData=g;this.processedYData=p}else this.currentDataGrouping=this.groupMap=null;this.hasGroupedData=l}};r.destroyGroupedData=function(){var a=this.groupedData;h(a||[],function(b,d){b&&(a[d]=b.destroy?b.destroy():null)});this.groupedData=null};r.generatePoints=function(){p.apply(this);this.destroyGroupedData();this.groupedData=this.hasGroupedData?this.points:null};B(b.prototype,
"update",function(b){this.dataGroup?a.error(24):b.apply(this,[].slice.call(arguments,1))});B(v.prototype,"tooltipFooterHeaderFormatter",function(b,c,d){var f=c.series,e=f.tooltipOptions,k=f.options.dataGrouping,g=e.xDateFormat,h,l=f.xAxis,p=a.dateFormat;return l&&"datetime"===l.options.type&&k&&q(c.key)?(b=f.currentDataGrouping,k=k.dateTimeLabelFormats,b?(l=k[b.unitName],1===b.count?g=l[0]:(g=l[1],h=l[2])):!g&&k&&(g=this.getXDateFormat(c,e,l)),g=p(g,c.key),h&&(g+=p(h,c.key+b.totalRange-1)),m(e[(d?
"footer":"header")+"Format"],{point:n(c.point,{key:g}),series:f})):b.call(this,c,d)});r.destroy=function(){for(var a=this.groupedData||[],b=a.length;b--;)a[b]&&a[b].destroy();t.apply(this)};B(r,"setOptions",function(a,b){a=a.call(this,b);var c=this.type,d=this.chart.options.plotOptions,f=F[c].dataGrouping;l[c]&&(f||(f=k(x,l[c])),a.dataGrouping=k(f,d.series&&d.series.dataGrouping,d[c].dataGrouping,b.dataGrouping));this.chart.options.isStock&&(this.requireSorting=!0);return a});B(D.prototype,"setScale",
function(a){a.call(this);h(this.series,function(a){a.hasProcessed=!1})});D.prototype.getGroupPixelWidth=function(){var a=this.series,b=a.length,d,e=0,k=!1,h;for(d=b;d--;)(h=a[d].options.dataGrouping)&&(e=Math.max(e,h.groupPixelWidth));for(d=b;d--;)(h=a[d].options.dataGrouping)&&a[d].hasProcessed&&(b=(a[d].processedXData||a[d].data).length,a[d].groupPixelWidth||b>this.chart.plotSizeX/e||b&&h.forced)&&(k=!0);return k?e:0};D.prototype.setDataGrouping=function(a,b){var c;b=d(b,!0);a||(a={forced:!1,units:null});
if(this instanceof D)for(c=this.series.length;c--;)this.series[c].update({dataGrouping:a},!1);else h(this.chart.options.series,function(b){b.dataGrouping=a},!1);b&&this.chart.redraw()}})(J);(function(a){var C=a.each,A=a.Point,D=a.seriesType,F=a.seriesTypes;D("ohlc","column",{lineWidth:1,tooltip:{pointFormat:'\x3cspan class\x3d"highcharts-color-{point.colorIndex}"\x3e\u25cf\x3c/span\x3e \x3cb\x3e {series.name}\x3c/b\x3e\x3cbr/\x3eOpen: {point.open}\x3cbr/\x3eHigh: {point.high}\x3cbr/\x3eLow: {point.low}\x3cbr/\x3eClose: {point.close}\x3cbr/\x3e'},
threshold:null},{pointArrayMap:["open","high","low","close"],toYData:function(a){return[a.open,a.high,a.low,a.close]},pointValKey:"high",translate:function(){var a=this,h=a.yAxis,n=!!a.modifyValue,m=["plotOpen","yBottom","plotClose"];F.column.prototype.translate.apply(a);C(a.points,function(q){C([q.open,q.low,q.close],function(k,d){null!==k&&(n&&(k=a.modifyValue(k)),q[m[d]]=h.toPixels(k,!0))})})},drawPoints:function(){var a=this,h=a.chart;C(a.points,function(n){var m,q,k,d,b=n.graphic,v,u=!b;void 0!==
n.plotY&&(b||(n.graphic=b=h.renderer.path().add(a.group)),q=b.strokeWidth()%2/2,v=Math.round(n.plotX)-q,k=Math.round(n.shapeArgs.width/2),d=["M",v,Math.round(n.yBottom),"L",v,Math.round(n.plotY)],null!==n.open&&(m=Math.round(n.plotOpen)+q,d.push("M",v,m,"L",v-k,m)),null!==n.close&&(m=Math.round(n.plotClose)+q,d.push("M",v,m,"L",v+k,m)),b[u?"attr":"animate"]({d:d}).addClass(n.getClassName(),!0))})},animate:null},{getClassName:function(){return A.prototype.getClassName.call(this)+(this.open<this.close?
" highcharts-point-up":" highcharts-point-down")}})})(J);(function(a){var C=a.defaultPlotOptions,A=a.each,D=a.merge;a=a.seriesType;a("candlestick","ohlc",D(C.column,{states:{hover:{lineWidth:2}},tooltip:C.ohlc.tooltip,threshold:null}),{drawPoints:function(){var a=this,u=a.chart;A(a.points,function(h){var n=h.graphic,m,q,k,d,b,v,B,r=!n;void 0!==h.plotY&&(n||(h.graphic=n=u.renderer.path().add(a.group)),b=n.strokeWidth()%2/2,v=Math.round(h.plotX)-b,m=h.plotOpen,q=h.plotClose,k=Math.min(m,q),m=Math.max(m,
q),B=Math.round(h.shapeArgs.width/2),q=Math.round(k)!==Math.round(h.plotY),d=m!==h.yBottom,k=Math.round(k)+b,m=Math.round(m)+b,b=[],b.push("M",v-B,m,"L",v-B,k,"L",v+B,k,"L",v+B,m,"Z","M",v,k,"L",v,q?Math.round(h.plotY):k,"M",v,m,"L",v,d?Math.round(h.yBottom):m),n[r?"attr":"animate"]({d:b}).addClass(h.getClassName(),!0))})}})})(J);(function(a){var C=a.addEvent,A=a.each,D=a.noop,F=a.seriesType,u=a.seriesTypes,h=a.TrackerMixin,n=a.SVGRenderer.prototype.symbols;F("flags","column",{pointRange:0,shape:"flag",
stackDistance:12,textAlign:"center",tooltip:{pointFormat:"{point.text}\x3cbr/\x3e"},threshold:null,y:-30},{sorted:!1,noSharedTooltip:!0,allowDG:!1,takeOrdinalPosition:!1,trackerGroups:["markerGroup"],forceCrop:!0,init:a.Series.prototype.init,translate:function(){u.column.prototype.translate.apply(this);var a=this.options,h=this.chart,k=this.points,d=k.length-1,b,n,B=a.onSeries;b=B&&h.get(B);var a=a.onKey||"y",B=b&&b.options.step,r=b&&b.points,e=r&&r.length,p=this.xAxis,t=p.getExtremes(),x=0,l,C,D;
if(b&&b.visible&&e)for(x=(b.pointXOffset||0)+(b.barW||0)/2,b=b.currentDataGrouping,C=r[e-1].x+(b?b.totalRange:0),k.sort(function(a,b){return a.x-b.x}),a="plot"+a[0].toUpperCase()+a.substr(1);e--&&k[d]&&!(b=k[d],l=r[e],l.x<=b.x&&void 0!==l[a]&&(b.x<=C&&(b.plotY=l[a],l.x<b.x&&!B&&(D=r[e+1])&&void 0!==D[a]&&(b.plotY+=(b.x-l.x)/(D.x-l.x)*(D[a]-l[a]))),d--,e++,0>d)););A(k,function(a,b){var c;void 0===a.plotY&&(a.x>=t.min&&a.x<=t.max?a.plotY=h.chartHeight-p.bottom-(p.opposite?p.height:0)+p.offset-h.plotTop:
a.shapeArgs={});a.plotX+=x;(n=k[b-1])&&n.plotX===a.plotX&&(void 0===n.stackIndex&&(n.stackIndex=0),c=n.stackIndex+1);a.stackIndex=c})},drawPoints:function(){var a=this.points,h=this.chart,k=h.renderer,d,b,n=this.options,u=n.y,r,e,p,t,x,l,A,C=this.yAxis;for(e=a.length;e--;)p=a[e],A=p.plotX>this.xAxis.len,d=p.plotX,t=p.stackIndex,r=p.options.shape||n.shape,b=p.plotY,void 0!==b&&(b=p.plotY+u-(void 0!==t&&t*n.stackDistance)),x=t?void 0:p.plotX,l=t?void 0:p.plotY,t=p.graphic,void 0!==b&&0<=d&&!A?(t||(t=
p.graphic=k.label("",null,null,r,null,null,n.useHTML).attr({align:"flag"===r?"left":"center",width:n.width,height:n.height,"text-align":n.textAlign}).addClass("highcharts-point").add(this.markerGroup)),0<d&&(d-=t.strokeWidth()%2),t.attr({text:p.options.title||n.title||"A",x:d,y:b,anchorX:x,anchorY:l}),p.tooltipPos=h.inverted?[C.len+C.pos-h.plotLeft-b,this.xAxis.len-d]:[d,b]):t&&(p.graphic=t.destroy())},drawTracker:function(){var a=this.points;h.drawTrackerPoint.apply(this);A(a,function(h){var k=h.graphic;
k&&C(k.element,"mouseover",function(){0<h.stackIndex&&!h.raised&&(h._y=k.y,k.attr({y:h._y-8}),h.raised=!0);A(a,function(a){a!==h&&a.raised&&a.graphic&&(a.graphic.attr({y:a._y}),a.raised=!1)})})})},animate:D,buildKDTree:D,setClip:D});n.flag=function(a,h,k,d,b){return["M",b&&b.anchorX||a,b&&b.anchorY||h,"L",a,h+d,a,h,a+k,h,a+k,h+d,a,h+d,"Z"]};A(["circle","square"],function(a){n[a+"pin"]=function(h,k,d,b,m){var q=m&&m.anchorX;m=m&&m.anchorY;"circle"===a&&b>d&&(h-=Math.round((b-d)/2),d=b);h=n[a](h,k,
d,b);q&&m&&h.push("M",q,k>m?k:k+b,"L",q,m);return h}})})(J);(function(a){function C(a,b,d){this.init(a,b,d)}var A=a.addEvent,D=a.Axis,F=a.correctFloat,u=a.defaultOptions,h=a.defined,n=a.destroyObjectProperties,m=a.doc,q=a.each,k=a.fireEvent,d=a.hasTouch,b=a.isTouchDevice,v=a.merge,B=a.pick,r=a.removeEvent,e=a.wrap,p,t={height:b?20:14,barBorderRadius:0,buttonBorderRadius:0,liveRedraw:a.svg&&!b,margin:10,minWidth:6,step:.2,zIndex:3};u.scrollbar=v(!0,t,u.scrollbar);a.swapXY=p=function(a,b){var d=a.length,
e;if(b)for(b=0;b<d;b+=3)e=a[b+1],a[b+1]=a[b+2],a[b+2]=e;return a};C.prototype={init:function(a,b,d){this.scrollbarButtons=[];this.renderer=a;this.userOptions=b;this.options=v(t,b);this.chart=d;this.size=B(this.options.size,this.options.height);b.enabled&&(this.render(),this.initEvents(),this.addEvents())},render:function(){var a=this.renderer,b=this.options,d=this.size,e;this.group=e=a.g("scrollbar").attr({zIndex:b.zIndex,translateY:-99999}).add();this.track=a.rect().addClass("highcharts-scrollbar-track").attr({x:0,
r:b.trackBorderRadius||0,height:d,width:d}).add(e);this.trackBorderWidth=this.track.strokeWidth();this.track.attr({y:-this.trackBorderWidth%2/2});this.scrollbarGroup=a.g().add(e);this.scrollbar=a.rect().addClass("highcharts-scrollbar-thumb").attr({height:d,width:d,r:b.barBorderRadius||0}).add(this.scrollbarGroup);this.scrollbarRifles=a.path(p(["M",-3,d/4,"L",-3,2*d/3,"M",0,d/4,"L",0,2*d/3,"M",3,d/4,"L",3,2*d/3],b.vertical)).addClass("highcharts-scrollbar-rifles").add(this.scrollbarGroup);this.scrollbarStrokeWidth=
this.scrollbar.strokeWidth();this.scrollbarGroup.translate(-this.scrollbarStrokeWidth%2/2,-this.scrollbarStrokeWidth%2/2);this.drawScrollbarButton(0);this.drawScrollbarButton(1)},position:function(a,b,d,e){var f=this.options.vertical,c=0,h=this.rendered?"animate":"attr";this.x=a;this.y=b+this.trackBorderWidth;this.width=d;this.xOffset=this.height=e;this.yOffset=c;f?(this.width=this.yOffset=d=c=this.size,this.xOffset=b=0,this.barWidth=e-2*d,this.x=a+=this.options.margin):(this.height=this.xOffset=
e=b=this.size,this.barWidth=d-2*e,this.y+=this.options.margin);this.group[h]({translateX:a,translateY:this.y});this.track[h]({width:d,height:e});this.scrollbarButtons[1][h]({translateX:f?0:d-b,translateY:f?e-c:0})},drawScrollbarButton:function(a){var b=this.renderer,d=this.scrollbarButtons,e=this.options,f=this.size,c;c=b.g().add(this.group);d.push(c);c=b.rect().addClass("highcharts-scrollbar-button").add(c);c.attr(c.crisp({x:-.5,y:-.5,width:f+1,height:f+1,r:e.buttonBorderRadius},c.strokeWidth()));
b.path(p(["M",f/2+(a?-1:1),f/2-3,"L",f/2+(a?-1:1),f/2+3,"L",f/2+(a?2:-2),f/2],e.vertical)).addClass("highcharts-scrollbar-arrow").add(d[a])},setRange:function(a,b){var d=this.options,e=d.vertical,f=d.minWidth,c=this.barWidth,k,l,m=this.rendered&&!this.hasDragged?"animate":"attr";h(c)&&(a=Math.max(a,0),k=c*a,this.calculatedWidth=l=F(c*Math.min(b,1)-k),l<f&&(k=(c-f+l)*a,l=f),f=Math.floor(k+this.xOffset+this.yOffset),c=l/2-.5,this.from=a,this.to=b,e?(this.scrollbarGroup[m]({translateY:f}),this.scrollbar[m]({height:l}),
this.scrollbarRifles[m]({translateY:c}),this.scrollbarTop=f,this.scrollbarLeft=0):(this.scrollbarGroup[m]({translateX:f}),this.scrollbar[m]({width:l}),this.scrollbarRifles[m]({translateX:c}),this.scrollbarLeft=f,this.scrollbarTop=0),12>=l?this.scrollbarRifles.hide():this.scrollbarRifles.show(!0),!1===d.showFull&&(0>=a&&1<=b?this.group.hide():this.group.show()),this.rendered=!0)},initEvents:function(){var a=this;a.mouseMoveHandler=function(b){var d=a.chart.pointer.normalize(b),e=a.options.vertical?
"chartY":"chartX",f=a.initPositions;!a.grabbedCenter||b.touches&&0===b.touches[0][e]||(d=a.cursorToScrollbarPosition(d)[e],e=a[e],e=d-e,a.hasDragged=!0,a.updatePosition(f[0]+e,f[1]+e),a.hasDragged&&k(a,"changed",{from:a.from,to:a.to,trigger:"scrollbar",DOMType:b.type,DOMEvent:b}))};a.mouseUpHandler=function(b){a.hasDragged&&k(a,"changed",{from:a.from,to:a.to,trigger:"scrollbar",DOMType:b.type,DOMEvent:b});a.grabbedCenter=a.hasDragged=a.chartX=a.chartY=null};a.mouseDownHandler=function(b){b=a.chart.pointer.normalize(b);
b=a.cursorToScrollbarPosition(b);a.chartX=b.chartX;a.chartY=b.chartY;a.initPositions=[a.from,a.to];a.grabbedCenter=!0};a.buttonToMinClick=function(b){var d=F(a.to-a.from)*a.options.step;a.updatePosition(F(a.from-d),F(a.to-d));k(a,"changed",{from:a.from,to:a.to,trigger:"scrollbar",DOMEvent:b})};a.buttonToMaxClick=function(b){var d=(a.to-a.from)*a.options.step;a.updatePosition(a.from+d,a.to+d);k(a,"changed",{from:a.from,to:a.to,trigger:"scrollbar",DOMEvent:b})};a.trackClick=function(b){var d=a.chart.pointer.normalize(b),
e=a.to-a.from,f=a.y+a.scrollbarTop,c=a.x+a.scrollbarLeft;a.options.vertical&&d.chartY>f||!a.options.vertical&&d.chartX>c?a.updatePosition(a.from+e,a.to+e):a.updatePosition(a.from-e,a.to-e);k(a,"changed",{from:a.from,to:a.to,trigger:"scrollbar",DOMEvent:b})}},cursorToScrollbarPosition:function(a){var b=this.options,b=b.minWidth>this.calculatedWidth?b.minWidth:0;return{chartX:(a.chartX-this.x-this.xOffset)/(this.barWidth-b),chartY:(a.chartY-this.y-this.yOffset)/(this.barWidth-b)}},updatePosition:function(a,
b){1<b&&(a=F(1-F(b-a)),b=1);0>a&&(b=F(b-a),a=0);this.from=a;this.to=b},update:function(a){this.destroy();this.init(this.chart.renderer,v(!0,this.options,a),this.chart)},addEvents:function(){var a=this.options.inverted?[1,0]:[0,1],b=this.scrollbarButtons,e=this.scrollbarGroup.element,h=this.mouseDownHandler,f=this.mouseMoveHandler,c=this.mouseUpHandler,a=[[b[a[0]].element,"click",this.buttonToMinClick],[b[a[1]].element,"click",this.buttonToMaxClick],[this.track.element,"click",this.trackClick],[e,
"mousedown",h],[m,"mousemove",f],[m,"mouseup",c]];d&&a.push([e,"touchstart",h],[m,"touchmove",f],[m,"touchend",c]);q(a,function(a){A.apply(null,a)});this._events=a},removeEvents:function(){q(this._events,function(a){r.apply(null,a)});this._events=void 0},destroy:function(){var a=this.chart.scroller;this.removeEvents();q(["track","scrollbarRifles","scrollbar","scrollbarGroup","group"],function(a){this[a]&&this[a].destroy&&(this[a]=this[a].destroy())},this);a&&(a.scrollbar=null,n(a.scrollbarButtons))}};
e(D.prototype,"init",function(a){var b=this;a.apply(b,[].slice.call(arguments,1));b.options.scrollbar&&b.options.scrollbar.enabled&&(b.options.scrollbar.vertical=!b.horiz,b.options.startOnTick=b.options.endOnTick=!1,b.scrollbar=new C(b.chart.renderer,b.options.scrollbar,b.chart),A(b.scrollbar,"changed",function(a){var d=Math.min(B(b.options.min,b.min),b.min,b.dataMin),f=Math.max(B(b.options.max,b.max),b.max,b.dataMax)-d,c;b.horiz&&!b.reversed||!b.horiz&&b.reversed?(c=d+f*this.to,d+=f*this.from):(c=
d+f*(1-this.from),d+=f*(1-this.to));b.setExtremes(d,c,!0,!1,a)}))});e(D.prototype,"render",function(a){var b=Math.min(B(this.options.min,this.min),this.min,this.dataMin),d=Math.max(B(this.options.max,this.max),this.max,this.dataMax),e=this.scrollbar,f;a.apply(this,[].slice.call(arguments,1));e&&(this.horiz?e.position(this.left,this.top+this.height+this.offset+2+(this.opposite?0:this.axisTitleMargin),this.width,this.height):e.position(this.left+this.width+2+this.offset+(this.opposite?this.axisTitleMargin:
0),this.top,this.width,this.height),isNaN(b)||isNaN(d)||!h(this.min)||!h(this.max)?e.setRange(0,0):(f=(this.min-b)/(d-b),b=(this.max-b)/(d-b),this.horiz&&!this.reversed||!this.horiz&&this.reversed?e.setRange(f,b):e.setRange(1-b,1-f)))});e(D.prototype,"getOffset",function(a){var b=this.horiz?2:1,d=this.scrollbar;a.apply(this,[].slice.call(arguments,1));d&&(this.chart.axisOffset[b]+=d.size+d.options.margin)});e(D.prototype,"destroy",function(a){this.scrollbar&&(this.scrollbar=this.scrollbar.destroy());
a.apply(this,[].slice.call(arguments,1))});a.Scrollbar=C})(J);(function(a){function C(a){this.init(a)}var A=a.addEvent,D=a.Axis,F=a.Chart,u=a.defaultOptions,h=a.defined,n=a.destroyObjectProperties,m=a.doc,q=a.each,k=a.erase,d=a.error,b=a.extend,v=a.grep,B=a.hasTouch,r=a.isNumber,e=a.isObject,p=a.merge,t=a.pick,x=a.removeEvent,l=a.Scrollbar,I=a.Series,H=a.seriesTypes,f=a.wrap,c=a.swapXY,z=[].concat(a.defaultDataGroupingUnits),y=function(a){var b=v(arguments,r);if(b.length)return Math[a].apply(0,b)};
z[4]=["day",[1,2,3,4]];z[5]=["week",[1,2,3]];b(u,{navigator:{height:40,margin:25,maskInside:!0,series:{type:void 0===H.areaspline?"line":"areaspline",compare:null,dataGrouping:{approximation:"average",enabled:!0,groupPixelWidth:2,smoothed:!0,units:z},dataLabels:{enabled:!1,zIndex:2},id:"highcharts-navigator-series",className:"highcharts-navigator-series",lineColor:null,marker:{enabled:!1},pointRange:0,shadow:!1,threshold:null},xAxis:{className:"highcharts-navigator-xaxis",tickLength:0,tickPixelInterval:200,
labels:{align:"left",x:3,y:-4},crosshair:!1},yAxis:{className:"highcharts-navigator-yaxis",startOnTick:!1,endOnTick:!1,minPadding:.1,maxPadding:.1,labels:{enabled:!1},crosshair:!1,title:{text:null},tickLength:0,tickWidth:0}}});C.prototype={drawHandle:function(a,b,c,d){this.handles[b][d](c?{translateX:Math.round(this.left+this.height/2-8),translateY:Math.round(this.top+parseInt(a,10)+.5)}:{translateX:Math.round(this.left+parseInt(a,10)),translateY:Math.round(this.top+this.height/2-8)})},getHandlePath:function(a){return c(["M",
-4.5,.5,"L",3.5,.5,"L",3.5,15.5,"L",-4.5,15.5,"L",-4.5,.5,"M",-1.5,4,"L",-1.5,12,"M",.5,4,"L",.5,12],a)},drawOutline:function(a,b,c,d){var g=this.navigatorOptions.maskInside,f=this.outline.strokeWidth()/2,e=this.outlineHeight,h=this.scrollbarHeight,k=this.size,l=this.left-h,m=this.top;c?(l-=f,c=m+b+f,b=m+a+f,a=["M",l+e,m-h-f,"L",l+e,c,"L",l,c,"L",l,b,"L",l+e,b,"L",l+e,m+k+h].concat(g?["M",l+e,c-f,"L",l+e,b+f]:[])):(a+=l+h-f,b+=l+h-f,m+=f,a=["M",l,m,"L",a,m,"L",a,m+e,"L",b,m+e,"L",b,m,"L",l+k+2*h,
m].concat(g?["M",a-f,m,"L",b+f,m]:[]));this.outline[d]({d:a})},drawMasks:function(a,b,c,d){var g=this.left,f=this.top,e=this.height,h,k,l,m;c?(l=[g,g,g],m=[f,f+a,f+b],k=[e,e,e],h=[a,b-a,this.size-b]):(l=[g,g+a,g+b],m=[f,f,f],k=[a,b-a,this.size-b],h=[e,e,e]);q(this.shades,function(a,b){a[d]({x:l[b],y:m[b],width:k[b],height:h[b]})})},renderElements:function(){var a=this,b=a.navigatorOptions.maskInside,c=a.chart,d=c.inverted,f=c.renderer,e;a.navigatorGroup=e=f.g("navigator").attr({zIndex:8,visibility:"hidden"}).add();
q([!b,b,!b],function(b,c){a.shades[c]=f.rect().addClass("highcharts-navigator-mask"+(1===c?"-inside":"-outside")).add(e)});a.outline=f.path().addClass("highcharts-navigator-outline").add(e);q([0,1],function(b){a.handles[b]=f.path(a.getHandlePath(d)).attr({zIndex:7-b}).addClass("highcharts-navigator-handle highcharts-navigator-handle-"+["left","right"][b]).add(e)})},update:function(a){this.destroy();p(!0,this.chart.options.navigator,this.options,a);this.init(this.chart)},render:function(a,b,c,d){var g=
this.chart,f,e,k=this.scrollbarHeight,l,m=this.xAxis;f=this.navigatorEnabled;var n,p=this.rendered;e=g.inverted;var w=g.xAxis[0].minRange;if(!this.hasDragged||h(c)){if(!r(a)||!r(b))if(p)c=0,d=m.width;else return;this.left=t(m.left,g.plotLeft+k);e?(this.size=n=l=t(m.len,g.plotHeight-2*k),g=k):(this.size=n=l=t(m.len,g.plotWidth-2*k),g=l+2*k);c=t(c,m.toPixels(a,!0));d=t(d,m.toPixels(b,!0));r(c)&&Infinity!==Math.abs(c)||(c=0,d=g);a=m.toValue(c,!0);b=m.toValue(d,!0);if(Math.abs(b-a)<w)if(this.grabbedLeft)c=
m.toPixels(b-w,!0);else if(this.grabbedRight)d=m.toPixels(a+w,!0);else return;this.zoomedMax=Math.min(Math.max(c,d,0),n);this.zoomedMin=Math.min(Math.max(this.fixedWidth?this.zoomedMax-this.fixedWidth:Math.min(c,d),0),n);this.range=this.zoomedMax-this.zoomedMin;n=Math.round(this.zoomedMax);c=Math.round(this.zoomedMin);f&&(this.navigatorGroup.attr({visibility:"visible"}),p=p&&!this.hasDragged?"animate":"attr",this.drawMasks(c,n,e,p),this.drawOutline(c,n,e,p),this.drawHandle(c,0,e,p),this.drawHandle(n,
1,e,p));this.scrollbar&&(e?(e=this.top-k,f=this.left-k+(f?0:this.height),k=l+2*k):(e=this.top+(f?this.height:-k),f=this.left-k),this.scrollbar.position(f,e,g,k),this.scrollbar.setRange(c/l,n/l));this.rendered=!0}},addMouseEvents:function(){var a=this,b=a.chart,c=b.container,d=[],f,e;a.mouseMoveHandler=f=function(b){a.onMouseMove(b)};a.mouseUpHandler=e=function(b){a.onMouseUp(b)};d=a.getPartsEvents("mousedown");d.push(A(c,"mousemove",f),A(m,"mouseup",e));B&&(d.push(A(c,"touchmove",f),A(m,"touchend",
e)),d.concat(a.getPartsEvents("touchstart")));a.eventsToUnbind=d;a.series&&a.series[0]&&d.push(A(a.series[0].xAxis,"foundExtremes",function(){b.navigator.modifyNavigatorAxisExtremes()}))},getPartsEvents:function(a){var b=this,c=[];q(["shades","handles"],function(d){q(b[d],function(g,f){c.push(A(g.element,a,function(a){b[d+"Mousedown"](a,f)}))})});return c},shadesMousedown:function(a,b){a=this.chart.pointer.normalize(a);var c=this.chart,d=this.xAxis,f=this.zoomedMin,e=this.left,h=this.size,k=this.range,
l=a.chartX,m;c.inverted&&(l=a.chartY,e=this.top);1===b?(this.grabbedCenter=l,this.fixedWidth=k,this.dragOffset=l-f):(a=l-e-k/2,0===b?a=Math.max(0,a):2===b&&a+k>=h&&(a=h-k,m=this.getUnionExtremes().dataMax),a!==f&&(this.fixedWidth=k,b=d.toFixedRange(a,a+k,null,m),c.xAxis[0].setExtremes(Math.min(b.min,b.max),Math.max(b.min,b.max),!0,null,{trigger:"navigator"})))},handlesMousedown:function(a,b){this.chart.pointer.normalize(a);a=this.chart;var c=a.xAxis[0],d=a.inverted&&!c.reversed||!a.inverted&&c.reversed;
0===b?(this.grabbedLeft=!0,this.otherHandlePos=this.zoomedMax,this.fixedExtreme=d?c.min:c.max):(this.grabbedRight=!0,this.otherHandlePos=this.zoomedMin,this.fixedExtreme=d?c.max:c.min);a.fixedRange=null},onMouseMove:function(a){var b=this,c=b.chart,d=b.left,f=b.navigatorSize,e=b.range,h=b.dragOffset,k=c.inverted;a.touches&&0===a.touches[0].pageX||(a=c.pointer.normalize(a),c=a.chartX,k&&(d=b.top,c=a.chartY),b.grabbedLeft?(b.hasDragged=!0,b.render(0,0,c-d,b.otherHandlePos)):b.grabbedRight?(b.hasDragged=
!0,b.render(0,0,b.otherHandlePos,c-d)):b.grabbedCenter&&(b.hasDragged=!0,c<h?c=h:c>f+h-e&&(c=f+h-e),b.render(0,0,c-h,c-h+e)),b.hasDragged&&b.scrollbar&&b.scrollbar.options.liveRedraw&&(a.DOMType=a.type,setTimeout(function(){b.onMouseUp(a)},0)))},onMouseUp:function(a){var b=this.chart,c=this.xAxis,d,f,e=a.DOMEvent||a;if(this.hasDragged||"scrollbar"===a.trigger)this.zoomedMin===this.otherHandlePos?d=this.fixedExtreme:this.zoomedMax===this.otherHandlePos&&(f=this.fixedExtreme),this.zoomedMax===this.navigatorSize&&
(f=this.getUnionExtremes().dataMax),c=c.toFixedRange(this.zoomedMin,this.zoomedMax,d,f),h(c.min)&&b.xAxis[0].setExtremes(Math.min(c.min,c.max),Math.max(c.min,c.max),!0,this.hasDragged?!1:null,{trigger:"navigator",triggerOp:"navigator-drag",DOMEvent:e});"mousemove"!==a.DOMType&&(this.grabbedLeft=this.grabbedRight=this.grabbedCenter=this.fixedWidth=this.fixedExtreme=this.otherHandlePos=this.hasDragged=this.dragOffset=null)},removeEvents:function(){this.eventsToUnbind&&(q(this.eventsToUnbind,function(a){a()}),
this.eventsToUnbind=void 0);this.removeBaseSeriesEvents()},removeBaseSeriesEvents:function(){var a=this.baseSeries||[];this.navigatorEnabled&&a[0]&&!1!==this.navigatorOptions.adaptToUpdatedData&&(q(a,function(a){x(a,"updatedData",this.updatedDataHandler)},this),a[0].xAxis&&x(a[0].xAxis,"foundExtremes",this.modifyBaseAxisExtremes))},init:function(a){var b=a.options,c=b.navigator,d=c.enabled,e=b.scrollbar,h=e.enabled,b=d?c.height:0,k=h?e.height:0;this.handles=[];this.shades=[];this.chart=a;this.setBaseSeries();
this.height=b;this.scrollbarHeight=k;this.scrollbarEnabled=h;this.navigatorEnabled=d;this.navigatorOptions=c;this.scrollbarOptions=e;this.outlineHeight=b+k;var m=this,d=m.baseSeries,e=a.xAxis.length,h=a.yAxis.length,n=d&&d[0]&&d[0].xAxis||a.xAxis[0];a.extraMargin={type:c.opposite?"plotTop":"marginBottom",value:m.outlineHeight+c.margin};a.inverted&&(a.extraMargin.type=c.opposite?"marginRight":"plotLeft");a.isDirtyBox=!0;m.navigatorEnabled?(m.xAxis=new D(a,p({breaks:n.options.breaks,ordinal:n.options.ordinal},
c.xAxis,{id:"navigator-x-axis",yAxis:"navigator-y-axis",isX:!0,type:"datetime",index:e,offset:0,keepOrdinalPadding:!0,startOnTick:!1,endOnTick:!1,minPadding:0,maxPadding:0,zoomEnabled:!1},a.inverted?{offsets:[k,0,-k,0],width:b}:{offsets:[0,-k,0,k],height:b})),m.yAxis=new D(a,p(c.yAxis,{id:"navigator-y-axis",alignTicks:!1,offset:0,index:h,zoomEnabled:!1},a.inverted?{width:b}:{height:b})),d||c.series.data?m.addBaseSeries():0===a.series.length&&f(a,"redraw",function(b,c){0<a.series.length&&!m.series&&
(m.setBaseSeries(),a.redraw=b);b.call(a,c)}),m.renderElements(),m.addMouseEvents()):m.xAxis={translate:function(b,c){var d=a.xAxis[0],f=d.getExtremes(),g=a.plotWidth-2*k,e=y("min",d.options.min,f.dataMin),d=y("max",d.options.max,f.dataMax)-e;return c?b*d/g+e:g*(b-e)/d},toPixels:function(a){return this.translate(a)},toValue:function(a){return this.translate(a,!0)},toFixedRange:D.prototype.toFixedRange,fake:!0};a.options.scrollbar.enabled&&(a.scrollbar=m.scrollbar=new l(a.renderer,p(a.options.scrollbar,
{margin:m.navigatorEnabled?0:10,vertical:a.inverted}),a),A(m.scrollbar,"changed",function(b){var c=m.size,d=c*this.to,c=c*this.from;m.hasDragged=m.scrollbar.hasDragged;m.render(0,0,c,d);(a.options.scrollbar.liveRedraw||"mousemove"!==b.DOMType)&&setTimeout(function(){m.onMouseUp(b)})}));m.addBaseSeriesEvents();m.addChartEvents()},getUnionExtremes:function(a){var b=this.chart.xAxis[0],c=this.xAxis,d=c.options,f=b.options,e;a&&null===b.dataMin||(e={dataMin:t(d&&d.min,y("min",f.min,b.dataMin,c.dataMin,
c.min)),dataMax:t(d&&d.max,y("max",f.max,b.dataMax,c.dataMax,c.max))});return e},setBaseSeries:function(a){var b=this.chart,c=this.baseSeries=[];a=a||b.options&&b.options.navigator.baseSeries||0;this.series&&(this.removeBaseSeriesEvents(),q(this.series,function(a){a.destroy()}));q(b.series||[],function(b,d){(b.options.showInNavigator||(d===a||b.options.id===a)&&!1!==b.options.showInNavigator)&&c.push(b)});this.xAxis&&!this.xAxis.fake&&this.addBaseSeries()},addBaseSeries:function(){var a=this,b=a.chart,
c=a.series=[],d=a.baseSeries,f,e,h=a.navigatorOptions.series,k,l={enableMouseTracking:!1,index:null,group:"nav",padXAxis:!1,xAxis:"navigator-x-axis",yAxis:"navigator-y-axis",showInLegend:!1,stacking:!1,isInternal:!0,visible:!0};d?q(d,function(d,g){l.name="Navigator "+(g+1);f=d.options||{};k=f.navigatorOptions||{};e=p(f,l,h,k);g=k.data||h.data;a.hasNavigatorData=a.hasNavigatorData||!!g;e.data=g||f.data&&f.data.slice(0);d.navigatorSeries=b.initSeries(e);c.push(d.navigatorSeries)}):(e=p(h,l),e.data=
h.data,a.hasNavigatorData=!!e.data,c.push(b.initSeries(e)));this.addBaseSeriesEvents()},addBaseSeriesEvents:function(){var a=this,c=a.baseSeries||[];c[0]&&c[0].xAxis&&A(c[0].xAxis,"foundExtremes",this.modifyBaseAxisExtremes);!1!==this.navigatorOptions.adaptToUpdatedData&&q(c,function(c){c.xAxis&&(A(c,"updatedData",this.updatedDataHandler),c.userOptions.events=b(c.userOptions.event,{updatedData:this.updatedDataHandler}));A(c,"remove",function(){this.navigatorSeries&&(k(a.series,this.navigatorSeries),
this.navigatorSeries.remove(),delete this.navigatorSeries)})},this)},modifyNavigatorAxisExtremes:function(){var a=this.xAxis,b;a.getExtremes&&(!(b=this.getUnionExtremes(!0))||b.dataMin===a.min&&b.dataMax===a.max||(a.min=b.dataMin,a.max=b.dataMax))},modifyBaseAxisExtremes:function(){var a=this.chart.navigator,b=this.getExtremes(),c=b.dataMin,d=b.dataMax,b=b.max-b.min,f=a.stickToMin,e=a.stickToMax,h,k,l=a.series&&a.series[0],m=!!this.setExtremes;this.eventArgs&&"rangeSelectorButton"===this.eventArgs.trigger||
(f&&(k=c,h=k+b),e&&(h=d,f||(k=Math.max(h-b,l&&l.xData?l.xData[0]:-Number.MAX_VALUE))),m&&(f||e)&&r(k)&&(this.min=this.userMin=k,this.max=this.userMax=h));a.stickToMin=a.stickToMax=null},updatedDataHandler:function(){var a=this.chart.navigator,b=this.navigatorSeries;a.stickToMin=r(this.xAxis.min)&&this.xAxis.min<=this.xData[0];a.stickToMax=Math.round(a.zoomedMax)>=Math.round(a.size);b&&!a.hasNavigatorData&&(b.options.pointStart=this.xData[0],b.setData(this.options.data,!1,null,!1))},addChartEvents:function(){A(this.chart,
"redraw",function(){var a=this.navigator,b=a&&(a.baseSeries&&a.baseSeries[0]&&a.baseSeries[0].xAxis||a.scrollbar&&this.xAxis[0]);b&&a.render(b.min,b.max)})},destroy:function(){this.removeEvents();this.xAxis&&(k(this.chart.xAxis,this.xAxis),k(this.chart.axes,this.xAxis));this.yAxis&&(k(this.chart.yAxis,this.yAxis),k(this.chart.axes,this.yAxis));q(this.series||[],function(a){a.destroy&&a.destroy()});q("series xAxis yAxis shades outline scrollbarTrack scrollbarRifles scrollbarGroup scrollbar navigatorGroup rendered".split(" "),
function(a){this[a]&&this[a].destroy&&this[a].destroy();this[a]=null},this);q([this.handles],function(a){n(a)},this)}};a.Navigator=C;f(D.prototype,"zoom",function(a,b,c){var d=this.chart,f=d.options,g=f.chart.zoomType,e=f.navigator,f=f.rangeSelector,k;this.isXAxis&&(e&&e.enabled||f&&f.enabled)&&("x"===g?d.resetZoomButton="blocked":"y"===g?k=!1:"xy"===g&&(d=this.previousZoom,h(b)?this.previousZoom=[this.min,this.max]:d&&(b=d[0],c=d[1],delete this.previousZoom)));return void 0!==k?k:a.call(this,b,c)});
f(F.prototype,"init",function(a,b,c){A(this,"beforeRender",function(){var a=this.options;if(a.navigator.enabled||a.scrollbar.enabled)this.scroller=this.navigator=new C(this)});a.call(this,b,c)});f(F.prototype,"setChartSize",function(a){var b=this.legend,c=this.navigator,d,f,e,h;a.apply(this,[].slice.call(arguments,1));c&&(f=b.options,e=c.xAxis,h=c.yAxis,d=c.scrollbarHeight,this.inverted?(c.left=c.navigatorOptions.opposite?this.chartWidth-d-c.height:this.spacing[3]+d,c.top=this.plotTop+d):(c.left=
this.plotLeft+d,c.top=c.navigatorOptions.top||this.chartHeight-c.height-d-this.spacing[2]-("bottom"===f.verticalAlign&&f.enabled&&!f.floating?b.legendHeight+t(f.margin,10):0)),e&&h&&(this.inverted?e.options.left=h.options.left=c.left:e.options.top=h.options.top=c.top,e.setAxisSize(),h.setAxisSize()))});f(I.prototype,"addPoint",function(a,b,c,f,h){var g=this.options.turboThreshold;g&&this.xData.length>g&&e(b,!0)&&this.chart.navigator&&d(20,!0);a.call(this,b,c,f,h)});f(F.prototype,"addSeries",function(a,
b,c,d){a=a.call(this,b,!1,d);this.navigator&&this.navigator.setBaseSeries();t(c,!0)&&this.redraw();return a});f(I.prototype,"update",function(a,b,c){a.call(this,b,!1);this.chart.navigator&&this.chart.navigator.setBaseSeries();t(c,!0)&&this.chart.redraw()});F.prototype.callbacks.push(function(a){var b=a.navigator;b&&(a=a.xAxis[0].getExtremes(),b.render(a.min,a.max))})})(J);(function(a){function C(a){this.init(a)}var A=a.addEvent,D=a.Axis,F=a.Chart,u=a.css,h=a.createElement,n=a.dateFormat,m=a.defaultOptions,
q=m.global.useUTC,k=a.defined,d=a.destroyObjectProperties,b=a.discardElement,v=a.each,B=a.extend,r=a.fireEvent,e=a.Date,p=a.isNumber,t=a.merge,x=a.pick,l=a.pInt,I=a.splat,H=a.wrap;B(m,{rangeSelector:{buttonTheme:{"stroke-width":0,width:28,height:18,padding:2,zIndex:7},height:35,inputPosition:{align:"right"}}});m.lang=t(m.lang,{rangeSelectorZoom:"Zoom",rangeSelectorFrom:"From",rangeSelectorTo:"To"});C.prototype={clickButton:function(a,b){var c=this,d=c.chart,f=c.buttonOptions[a],e=d.xAxis[0],g=d.scroller&&
d.scroller.getUnionExtremes()||e||{},h=g.dataMin,k=g.dataMax,l,m=e&&Math.round(Math.min(e.max,x(k,e.max))),n=f.type,r,g=f._range,t,u,B,C=f.dataGrouping;if(null!==h&&null!==k){d.fixedRange=g;C&&(this.forcedDataGrouping=!0,D.prototype.setDataGrouping.call(e||{chart:this.chart},C,!1));if("month"===n||"year"===n)e?(n={range:f,max:m,dataMin:h,dataMax:k},l=e.minFromRange.call(n),p(n.newMax)&&(m=n.newMax)):g=f;else if(g)l=Math.max(m-g,h),m=Math.min(l+g,k);else if("ytd"===n)if(e)void 0===k&&(h=Number.MAX_VALUE,
k=Number.MIN_VALUE,v(d.series,function(a){a=a.xData;h=Math.min(a[0],h);k=Math.max(a[a.length-1],k)}),b=!1),m=c.getYTDExtremes(k,h,q),l=t=m.min,m=m.max;else{A(d,"beforeRender",function(){c.clickButton(a)});return}else"all"===n&&e&&(l=h,m=k);c.setSelected(a);e?e.setExtremes(l,m,x(b,1),null,{trigger:"rangeSelectorButton",rangeSelectorButton:f}):(r=I(d.options.xAxis)[0],B=r.range,r.range=g,u=r.min,r.min=t,A(d,"load",function(){r.range=B;r.min=u}))}},setSelected:function(a){this.selected=this.options.selected=
a},defaultButtons:[{type:"month",count:1,text:"1m"},{type:"month",count:3,text:"3m"},{type:"month",count:6,text:"6m"},{type:"ytd",text:"YTD"},{type:"year",count:1,text:"1y"},{type:"all",text:"All"}],init:function(a){var b=this,d=a.options.rangeSelector,f=d.buttons||[].concat(b.defaultButtons),e=d.selected,h=function(){var a=b.minInput,c=b.maxInput;a&&a.blur&&r(a,"blur");c&&c.blur&&r(c,"blur")};b.chart=a;b.options=d;b.buttons=[];a.extraTopMargin=d.height;b.buttonOptions=f;this.unMouseDown=A(a.container,
"mousedown",h);this.unResize=A(a,"resize",h);v(f,b.computeButtonRange);void 0!==e&&f[e]&&this.clickButton(e,!1);A(a,"load",function(){A(a.xAxis[0],"setExtremes",function(c){this.max-this.min!==a.fixedRange&&"rangeSelectorButton"!==c.trigger&&"updatedData"!==c.trigger&&b.forcedDataGrouping&&this.setDataGrouping(!1,!1)})})},updateButtonStates:function(){var a=this.chart,b=a.xAxis[0],d=Math.round(b.max-b.min),e=!b.hasVisibleSeries,a=a.scroller&&a.scroller.getUnionExtremes()||b,h=a.dataMin,k=a.dataMax,
a=this.getYTDExtremes(k,h,q),g=a.min,l=a.max,m=this.selected,n=p(m),r=this.options.allButtonsEnabled,t=this.buttons;v(this.buttonOptions,function(a,c){var f=a._range,p=a.type,q=a.count||1;a=t[c];var u=0;c=c===m;var v=f>k-h,z=f<b.minRange,w=!1,y=!1,f=f===d;("month"===p||"year"===p)&&d>=864E5*{month:28,year:365}[p]*q&&d<=864E5*{month:31,year:366}[p]*q?f=!0:"ytd"===p?(f=l-g===d,w=!c):"all"===p&&(f=b.max-b.min>=k-h,y=!c&&n&&f);p=!r&&(v||z||y||e);f=c&&f||f&&!n&&!w;p?u=3:f&&(n=!0,u=2);a.state!==u&&a.setState(u)})},
computeButtonRange:function(a){var b=a.type,d=a.count||1,f={millisecond:1,second:1E3,minute:6E4,hour:36E5,day:864E5,week:6048E5};if(f[b])a._range=f[b]*d;else if("month"===b||"year"===b)a._range=864E5*{month:30,year:365}[b]*d},setInputValue:function(a,b){var c=this.chart.options.rangeSelector,d=this[a+"Input"];k(b)&&(d.previousValue=d.HCTime,d.HCTime=b);d.value=n(c.inputEditDateFormat||"%Y-%m-%d",d.HCTime);this[a+"DateBox"].attr({text:n(c.inputDateFormat||"%b %e, %Y",d.HCTime)})},showInput:function(a){var b=
this.inputGroup,d=this[a+"DateBox"];u(this[a+"Input"],{left:b.translateX+d.x+"px",top:b.translateY+"px",width:d.width-2+"px",height:d.height-2+"px",border:"2px solid silver"})},hideInput:function(a){u(this[a+"Input"],{border:0,width:"1px",height:"1px"});this.setInputValue(a)},drawInput:function(a){function b(){var a=r.value,b=(k.inputDateParser||Date.parse)(a),c=f.xAxis[0],e=f.scroller&&f.scroller.xAxis?f.scroller.xAxis:c,g=e.dataMin,e=e.dataMax;b!==r.previousValue&&(r.previousValue=b,p(b)||(b=a.split("-"),
b=Date.UTC(l(b[0]),l(b[1])-1,l(b[2]))),p(b)&&(q||(b+=6E4*(new Date).getTimezoneOffset()),n?b>d.maxInput.HCTime?b=void 0:b<g&&(b=g):b<d.minInput.HCTime?b=void 0:b>e&&(b=e),void 0!==b&&c.setExtremes(n?b:c.min,n?c.max:b,void 0,void 0,{trigger:"rangeSelectorInput"})))}var d=this,f=d.chart,e=f.renderer,k=f.options.rangeSelector,g=d.div,n="min"===a,r,t,u=this.inputGroup;this[a+"Label"]=t=e.label(m.lang[n?"rangeSelectorFrom":"rangeSelectorTo"],this.inputGroup.offset).addClass("highcharts-range-label").attr({padding:2}).add(u);
u.offset+=t.width+5;this[a+"DateBox"]=e=e.label("",u.offset).addClass("highcharts-range-input").attr({padding:2,width:k.inputBoxWidth||90,height:k.inputBoxHeight||17,stroke:k.inputBoxBorderColor||"#cccccc","stroke-width":1,"text-align":"center"}).on("click",function(){d.showInput(a);d[a+"Input"].focus()}).add(u);u.offset+=e.width+(n?10:0);this[a+"Input"]=r=h("input",{name:a,className:"highcharts-range-selector",type:"text"},{top:f.plotTop+"px"},g);r.onfocus=function(){d.showInput(a)};r.onblur=function(){d.hideInput(a)};
r.onchange=b;r.onkeypress=function(a){13===a.keyCode&&b()}},getPosition:function(){var a=this.chart,b=a.options.rangeSelector,a=x((b.buttonPosition||{}).y,a.plotTop-a.axisOffset[0]-b.height);return{buttonTop:a,inputTop:a-10}},getYTDExtremes:function(a,b,d){var c=new e(a),f=c[e.hcGetFullYear]();d=d?e.UTC(f,0,1):+new e(f,0,1);b=Math.max(b||0,d);c=c.getTime();return{max:Math.min(a||c,c),min:b}},render:function(a,b){var c=this,d=c.chart,f=d.renderer,e=d.container,g=d.options,l=g.exporting&&!1!==g.exporting.enabled&&
g.navigation&&g.navigation.buttonOptions,n=g.rangeSelector,p=c.buttons,g=m.lang,q=c.div,q=c.inputGroup,r=n.buttonTheme,t=n.buttonPosition||{},u=n.inputEnabled,A=r&&r.states,C=d.plotLeft,D,F=this.getPosition(),H=c.group,I=c.rendered;!1!==n.enabled&&(I||(c.group=H=f.g("range-selector-buttons").add(),c.zoomText=f.text(g.rangeSelectorZoom,x(t.x,C),15).css(n.labelStyle).add(H),D=x(t.x,C)+c.zoomText.getBBox().width+5,v(c.buttonOptions,function(a,b){p[b]=f.button(a.text,D,0,function(){c.clickButton(b);c.isActive=
!0},r,A&&A.hover,A&&A.select,A&&A.disabled).attr({"text-align":"center"}).add(H);D+=p[b].width+x(n.buttonSpacing,5)}),!1!==u&&(c.div=q=h("div",null,{position:"relative",height:0,zIndex:1}),e.parentNode.insertBefore(q,e),c.inputGroup=q=f.g("input-group").add(),q.offset=0,c.drawInput("min"),c.drawInput("max"))),c.updateButtonStates(),H[I?"animate":"attr"]({translateY:F.buttonTop}),!1!==u&&(q.align(B({y:F.inputTop,width:q.offset,x:l&&F.inputTop<(l.y||0)+l.height-d.spacing[0]?-40:0},n.inputPosition),
!0,d.spacingBox),k(u)||(d=H.getBBox(),q[q.alignAttr.translateX<d.x+d.width+10?"hide":"show"]()),c.setInputValue("min",a),c.setInputValue("max",b)),c.rendered=!0)},update:function(a){var b=this.chart;t(!0,b.options.rangeSelector,a);this.destroy();this.init(b)},destroy:function(){var a=this.minInput,c=this.maxInput,e;this.unMouseDown();this.unResize();d(this.buttons);a&&(a.onfocus=a.onblur=a.onchange=null);c&&(c.onfocus=c.onblur=c.onchange=null);for(e in this)this[e]&&"chart"!==e&&(this[e].destroy?
this[e].destroy():this[e].nodeType&&b(this[e])),this[e]!==C.prototype[e]&&(this[e]=null)}};D.prototype.toFixedRange=function(a,b,d,e){var c=this.chart&&this.chart.fixedRange;a=x(d,this.translate(a,!0,!this.horiz));b=x(e,this.translate(b,!0,!this.horiz));d=c&&(b-a)/c;.7<d&&1.3>d&&(e?a=b-c:b=a+c);p(a)||(a=b=void 0);return{min:a,max:b}};D.prototype.minFromRange=function(){var a=this.range,b={month:"Month",year:"FullYear"}[a.type],d,e=this.max,h,k,g=function(a,c){var d=new Date(a);d["set"+b](d["get"+
b]()+c);return d.getTime()-a};p(a)?(d=e-a,k=a):(d=e+g(e,-a.count),this.chart&&(this.chart.fixedRange=e-d));h=x(this.dataMin,Number.MIN_VALUE);p(d)||(d=h);d<=h&&(d=h,void 0===k&&(k=g(d,a.count)),this.newMax=Math.min(d+k,this.dataMax));p(e)||(d=void 0);return d};H(F.prototype,"init",function(a,b,d){A(this,"init",function(){this.options.rangeSelector.enabled&&(this.rangeSelector=new C(this))});a.call(this,b,d)});F.prototype.callbacks.push(function(a){function b(){d=a.xAxis[0].getExtremes();p(d.min)&&
e.render(d.min,d.max)}var d,e=a.rangeSelector,f,h;e&&(h=A(a.xAxis[0],"afterSetExtremes",function(a){e.render(a.min,a.max)}),f=A(a,"redraw",b),b());A(a,"destroy",function(){e&&(f(),h())})});a.RangeSelector=C})(J);(function(a){var C=a.arrayMax,A=a.arrayMin,D=a.Axis,F=a.Chart,u=a.defined,h=a.each,n=a.format,m=a.inArray,q=a.isNumber,k=a.isString,d=a.map,b=a.merge,v=a.pick,B=a.Point,r=a.Series,e=a.splat,p=a.SVGRenderer,t=a.wrap,x=r.prototype,l=x.init,I=x.processData,H=B.prototype.tooltipFormatter;a.StockChart=
a.stockChart=function(f,c,h){var l=k(f)||f.nodeName,m=arguments[l?1:0],n=m.series,g=a.getOptions(),p,q=v(m.navigator&&m.navigator.enabled,g.navigator.enabled,!0),r=q?{startOnTick:!1,endOnTick:!1}:null,t={marker:{enabled:!1,radius:2}},u={shadow:!1,borderWidth:0};m.xAxis=d(e(m.xAxis||{}),function(a){return b({minPadding:0,maxPadding:0,ordinal:!0,title:{text:null},labels:{overflow:"justify"},showLastLabel:!0},g.xAxis,a,{type:"datetime",categories:null},r)});m.yAxis=d(e(m.yAxis||{}),function(a){p=v(a.opposite,
!0);return b({labels:{y:-2},opposite:p,showLastLabel:!1,title:{text:null}},g.yAxis,a)});m.series=null;m=b({chart:{panning:!0,pinchType:"x"},navigator:{enabled:q},scrollbar:{enabled:v(g.scrollbar.enabled,!0)},rangeSelector:{enabled:v(g.rangeSelector.enabled,!0)},title:{text:null},tooltip:{shared:!0,crosshairs:!0},legend:{enabled:!1},plotOptions:{line:t,spline:t,area:t,areaspline:t,arearange:t,areasplinerange:t,column:u,columnrange:u,candlestick:u,ohlc:u}},m,{isStock:!0});m.series=n;return l?new F(f,
m,h):new F(m,c)};t(D.prototype,"autoLabelAlign",function(a){var b=this.chart,d=this.options,b=b._labelPanes=b._labelPanes||{},e=this.options.labels;return this.chart.options.isStock&&"yAxis"===this.coll&&(d=d.top+","+d.height,!b[d]&&e.enabled)?(15===e.x&&(e.x=0),void 0===e.align&&(e.align="right"),b[d]=1,"right"):a.call(this,[].slice.call(arguments,1))});t(D.prototype,"getPlotLinePath",function(a,b,e,l,n,p){var c=this,f=this.isLinked&&!this.series?this.linkedParent.series:this.series,r=c.chart,t=
r.renderer,w=c.left,x=c.top,z,y,A,B,C=[],D=[],G,F;if("colorAxis"===c.coll)return a.apply(this,[].slice.call(arguments,1));D=function(a){var b="xAxis"===a?"yAxis":"xAxis";a=c.options[b];return q(a)?[r[b][a]]:k(a)?[r.get(a)]:d(f,function(a){return a[b]})}(c.coll);h(c.isXAxis?r.yAxis:r.xAxis,function(a){if(u(a.options.id)?-1===a.options.id.indexOf("navigator"):1){var b=a.isXAxis?"yAxis":"xAxis",b=u(a.options[b])?r[b][a.options[b]]:r[b][0];c===b&&D.push(a)}});G=D.length?[]:[c.isXAxis?r.yAxis[0]:r.xAxis[0]];
h(D,function(a){-1===m(a,G)&&G.push(a)});F=v(p,c.translate(b,null,null,l));q(F)&&(c.horiz?h(G,function(a){var b;y=a.pos;B=y+a.len;z=A=Math.round(F+c.transB);if(z<w||z>w+c.width)n?z=A=Math.min(Math.max(w,z),w+c.width):b=!0;b||C.push("M",z,y,"L",A,B)}):h(G,function(a){var b;z=a.pos;A=z+a.len;y=B=Math.round(x+c.height-F);if(y<x||y>x+c.height)n?y=B=Math.min(Math.max(x,y),c.top+c.height):b=!0;b||C.push("M",z,y,"L",A,B)}));return 0<C.length?t.crispPolyLine(C,e||1):null});D.prototype.getPlotBandPath=function(a,
b){b=this.getPlotLinePath(b,null,null,!0);a=this.getPlotLinePath(a,null,null,!0);var c=[],d;if(a&&b)if(a.toString()===b.toString())c=a,c.flat=!0;else for(d=0;d<a.length;d+=6)c.push("M",a[d+1],a[d+2],"L",a[d+4],a[d+5],b[d+4],b[d+5],b[d+1],b[d+2],"z");else c=null;return c};p.prototype.crispPolyLine=function(a,b){var c;for(c=0;c<a.length;c+=6)a[c+1]===a[c+4]&&(a[c+1]=a[c+4]=Math.round(a[c+1])-b%2/2),a[c+2]===a[c+5]&&(a[c+2]=a[c+5]=Math.round(a[c+2])+b%2/2);return a};t(D.prototype,"hideCrosshair",function(a,
b){a.call(this,b);this.crossLabel&&(this.crossLabel=this.crossLabel.hide())});t(D.prototype,"drawCrosshair",function(a,b,d){var c,e;a.call(this,b,d);if(u(this.crosshair.label)&&this.crosshair.label.enabled&&this.cross){a=this.chart;var f=this.options.crosshair.label,g=this.horiz;c=this.opposite;e=this.left;var h=this.top,k=this.crossLabel,l,m=f.format,p="",q="inside"===this.options.tickPosition,r=!1!==this.crosshair.snap,t=0;b||(b=this.cross&&this.cross.e);l=g?"center":c?"right"===this.labelAlign?
"right":"left":"left"===this.labelAlign?"left":"center";k||(k=this.crossLabel=a.renderer.label(null,null,null,f.shape||"callout").addClass("highcharts-crosshair-label"+(this.series[0]&&" highcharts-color-"+this.series[0].colorIndex)).attr({align:f.align||l,padding:v(f.padding,8),r:v(f.borderRadius,3),zIndex:2}).add(this.labelGroup));g?(l=r?d.plotX+e:b.chartX,h+=c?0:this.height):(l=c?this.width+e:0,h=r?d.plotY+h:b.chartY);m||f.formatter||(this.isDatetimeAxis&&(p="%b %d, %Y"),m="{value"+(p?":"+p:"")+
"}");b=r?d[this.isXAxis?"x":"y"]:this.toValue(g?b.chartX:b.chartY);k.attr({text:m?n(m,{value:b}):f.formatter.call(this,b),x:l,y:h,visibility:"visible"});b=k.getBBox();if(g){if(q&&!c||!q&&c)h=k.y-b.height}else h=k.y-b.height/2;g?(c=e-b.x,e=e+this.width-b.x):(c="left"===this.labelAlign?e:0,e="right"===this.labelAlign?e+this.width:a.chartWidth);k.translateX<c&&(t=c-k.translateX);k.translateX+b.width>=e&&(t=-(k.translateX+b.width-e));k.attr({x:l+t,y:h,anchorX:g?l:this.opposite?0:a.chartWidth,anchorY:g?
this.opposite?a.chartHeight:0:h+b.height/2})}});x.init=function(){l.apply(this,arguments);this.setCompare(this.options.compare)};x.setCompare=function(a){this.modifyValue="value"===a||"percent"===a?function(b,d){var c=this.compareValue;if(void 0!==b&&void 0!==c)return b="value"===a?b-c:b/c*100-(100===this.options.compareBase?0:100),d&&(d.change=b),b}:null;this.userOptions.compare=a;this.chart.hasRendered&&(this.isDirty=!0)};x.processData=function(){var a,b=-1,d,e,h,k;I.apply(this,arguments);if(this.xAxis&&
this.processedYData)for(d=this.processedXData,e=this.processedYData,h=e.length,this.pointArrayMap&&(b=m("close",this.pointArrayMap),-1===b&&(b=m(this.pointValKey||"y",this.pointArrayMap))),a=0;a<h-1;a++)if(k=-1<b?e[a][b]:e[a],q(k)&&d[a+1]>=this.xAxis.min&&0!==k){this.compareValue=k;break}};t(x,"getExtremes",function(a){var b;a.apply(this,[].slice.call(arguments,1));this.modifyValue&&(b=[this.modifyValue(this.dataMin),this.modifyValue(this.dataMax)],this.dataMin=A(b),this.dataMax=C(b))});D.prototype.setCompare=
function(a,b){this.isXAxis||(h(this.series,function(b){b.setCompare(a)}),v(b,!0)&&this.chart.redraw())};B.prototype.tooltipFormatter=function(b){b=b.replace("{point.change}",(0<this.change?"+":"")+a.numberFormat(this.change,v(this.series.tooltipOptions.changeDecimals,2)));return H.apply(this,[b])};t(r.prototype,"render",function(a){this.chart.is3d&&this.chart.is3d()||this.chart.polar||!this.xAxis||this.xAxis.isRadial||(!this.clipBox&&this.animate?(this.clipBox=b(this.chart.clipBox),this.clipBox.width=
this.xAxis.len,this.clipBox.height=this.yAxis.len):this.chart[this.sharedClipKey]?this.chart[this.sharedClipKey].attr({width:this.xAxis.len,height:this.yAxis.len}):this.clipBox&&(this.clipBox.width=this.xAxis.len,this.clipBox.height=this.yAxis.len));a.call(this)})})(J);return J});


/*
 Highcharts JS v5.0.7 (2017-01-17)

 (c) 2009-2016 Torstein Honsi

 License: www.highcharts.com/license
*/
(function(w){"object"===typeof module&&module.exports?module.exports=w:w(Highcharts)})(function(w){(function(a){function k(a,c,e){this.init(a,c,e)}var t=a.each,u=a.extend,g=a.merge,m=a.splat;u(k.prototype,{init:function(a,c,e){var h=this,l=h.defaultOptions;h.chart=c;h.options=a=g(l,c.angular?{background:{}}:void 0,a);(a=a.background)&&t([].concat(m(a)).reverse(),function(c){var b=e.userOptions;c=g(h.defaultBackgroundOptions,c);e.options.plotBands.unshift(c);b.plotBands=b.plotBands||[];b.plotBands!==
e.options.plotBands&&b.plotBands.unshift(c)})},defaultOptions:{center:["50%","50%"],size:"85%",startAngle:0},defaultBackgroundOptions:{className:"highcharts-pane",shape:"circle",from:-Number.MAX_VALUE,innerRadius:0,to:Number.MAX_VALUE,outerRadius:"105%"}});a.Pane=k})(w);(function(a){var k=a.CenteredSeriesMixin,t=a.each,u=a.extend,g=a.map,m=a.merge,q=a.noop,c=a.Pane,e=a.pick,h=a.pInt,l=a.splat,n=a.wrap,b,f,p=a.Axis.prototype;a=a.Tick.prototype;b={getOffset:q,redraw:function(){this.isDirty=!1},render:function(){this.isDirty=
!1},setScale:q,setCategories:q,setTitle:q};f={defaultRadialGaugeOptions:{labels:{align:"center",x:0,y:null},minorGridLineWidth:0,minorTickInterval:"auto",minorTickLength:10,minorTickPosition:"inside",minorTickWidth:1,tickLength:10,tickPosition:"inside",tickWidth:2,title:{rotation:0},zIndex:2},defaultRadialXOptions:{gridLineWidth:1,labels:{align:null,distance:15,x:0,y:null},maxPadding:0,minPadding:0,showLastLabel:!1,tickLength:0},defaultRadialYOptions:{gridLineInterpolation:"circle",labels:{align:"right",
x:-3,y:-2},showLastLabel:!1,title:{x:4,text:null,rotation:90}},setOptions:function(b){b=this.options=m(this.defaultOptions,this.defaultRadialOptions,b);b.plotBands||(b.plotBands=[])},getOffset:function(){p.getOffset.call(this);this.chart.axisOffset[this.side]=0;this.center=this.pane.center=k.getCenter.call(this.pane)},getLinePath:function(b,d){b=this.center;var c=this.chart,r=e(d,b[2]/2-this.offset);this.isCircular||void 0!==d?d=this.chart.renderer.symbols.arc(this.left+b[0],this.top+b[1],r,r,{start:this.startAngleRad,
end:this.endAngleRad,open:!0,innerR:0}):(d=this.postTranslate(this.angleRad,r),d=["M",b[0]+c.plotLeft,b[1]+c.plotTop,"L",d.x,d.y]);return d},setAxisTranslation:function(){p.setAxisTranslation.call(this);this.center&&(this.transA=this.isCircular?(this.endAngleRad-this.startAngleRad)/(this.max-this.min||1):this.center[2]/2/(this.max-this.min||1),this.minPixelPadding=this.isXAxis?this.transA*this.minPointOffset:0)},beforeSetTickPositions:function(){if(this.autoConnect=this.isCircular&&void 0===e(this.userMax,
this.options.max)&&this.endAngleRad-this.startAngleRad===2*Math.PI)this.max+=this.categories&&1||this.pointRange||this.closestPointRange||0},setAxisSize:function(){p.setAxisSize.call(this);this.isRadial&&(this.center=this.pane.center=k.getCenter.call(this.pane),this.isCircular&&(this.sector=this.endAngleRad-this.startAngleRad),this.len=this.width=this.height=this.center[2]*e(this.sector,1)/2)},getPosition:function(b,d){return this.postTranslate(this.isCircular?this.translate(b):this.angleRad,e(this.isCircular?
d:this.translate(b),this.center[2]/2)-this.offset)},postTranslate:function(b,d){var c=this.chart,e=this.center;b=this.startAngleRad+b;return{x:c.plotLeft+e[0]+Math.cos(b)*d,y:c.plotTop+e[1]+Math.sin(b)*d}},getPlotBandPath:function(b,d,c){var f=this.center,r=this.startAngleRad,l=f[2]/2,a=[e(c.outerRadius,"100%"),c.innerRadius,e(c.thickness,10)],n=Math.min(this.offset,0),p=/%$/,v,m=this.isCircular;"polygon"===this.options.gridLineInterpolation?f=this.getPlotLinePath(b).concat(this.getPlotLinePath(d,
!0)):(b=Math.max(b,this.min),d=Math.min(d,this.max),m||(a[0]=this.translate(b),a[1]=this.translate(d)),a=g(a,function(b){p.test(b)&&(b=h(b,10)*l/100);return b}),"circle"!==c.shape&&m?(b=r+this.translate(b),d=r+this.translate(d)):(b=-Math.PI/2,d=1.5*Math.PI,v=!0),a[0]-=n,a[2]-=n,f=this.chart.renderer.symbols.arc(this.left+f[0],this.top+f[1],a[0],a[0],{start:Math.min(b,d),end:Math.max(b,d),innerR:e(a[1],a[0]-a[2]),open:v}));return f},getPlotLinePath:function(b,c){var d=this,e=d.center,f=d.chart,h=d.getPosition(b),
a,r,l;d.isCircular?l=["M",e[0]+f.plotLeft,e[1]+f.plotTop,"L",h.x,h.y]:"circle"===d.options.gridLineInterpolation?(b=d.translate(b))&&(l=d.getLinePath(0,b)):(t(f.xAxis,function(b){b.pane===d.pane&&(a=b)}),l=[],b=d.translate(b),e=a.tickPositions,a.autoConnect&&(e=e.concat([e[0]])),c&&(e=[].concat(e).reverse()),t(e,function(d,c){r=a.getPosition(d,b);l.push(c?"L":"M",r.x,r.y)}));return l},getTitlePosition:function(){var b=this.center,d=this.chart,c=this.options.title;return{x:d.plotLeft+b[0]+(c.x||0),
y:d.plotTop+b[1]-{high:.5,middle:.25,low:0}[c.align]*b[2]+(c.y||0)}}};n(p,"init",function(h,d,a){var r=d.angular,n=d.polar,p=a.isX,v=r&&p,g,q=d.options,k=a.pane||0;if(r){if(u(this,v?b:f),g=!p)this.defaultRadialOptions=this.defaultRadialGaugeOptions}else n&&(u(this,f),this.defaultRadialOptions=(g=p)?this.defaultRadialXOptions:m(this.defaultYAxisOptions,this.defaultRadialYOptions));r||n?(this.isRadial=!0,d.inverted=!1,q.chart.zoomType=null):this.isRadial=!1;h.call(this,d,a);v||!r&&!n||(h=this.options,
d.panes||(d.panes=[]),this.pane=d=d.panes[k]=d.panes[k]||new c(l(q.pane)[k],d,this),d=d.options,this.angleRad=(h.angle||0)*Math.PI/180,this.startAngleRad=(d.startAngle-90)*Math.PI/180,this.endAngleRad=(e(d.endAngle,d.startAngle+360)-90)*Math.PI/180,this.offset=h.offset||0,this.isCircular=g)});n(p,"autoLabelAlign",function(b){if(!this.isRadial)return b.apply(this,[].slice.call(arguments,1))});n(a,"getPosition",function(b,c,e,h,f){var d=this.axis;return d.getPosition?d.getPosition(e):b.call(this,c,
e,h,f)});n(a,"getLabelPosition",function(b,c,h,f,a,l,n,p,m){var d=this.axis,r=l.y,v=20,z=l.align,g=(d.translate(this.pos)+d.startAngleRad+Math.PI/2)/Math.PI*180%360;d.isRadial?(b=d.getPosition(this.pos,d.center[2]/2+e(l.distance,-25)),"auto"===l.rotation?f.attr({rotation:g}):null===r&&(r=d.chart.renderer.fontMetrics(f.styles.fontSize).b-f.getBBox().height/2),null===z&&(d.isCircular?(this.label.getBBox().width>d.len*d.tickInterval/(d.max-d.min)&&(v=0),z=g>v&&g<180-v?"left":g>180+v&&g<360-v?"right":
"center"):z="center",f.attr({align:z})),b.x+=l.x,b.y+=r):b=b.call(this,c,h,f,a,l,n,p,m);return b});n(a,"getMarkPath",function(b,d,c,e,f,h,a){var l=this.axis;l.isRadial?(b=l.getPosition(this.pos,l.center[2]/2+e),d=["M",d,c,"L",b.x,b.y]):d=b.call(this,d,c,e,f,h,a);return d})})(w);(function(a){var k=a.each,t=a.noop,u=a.pick,g=a.Series,m=a.seriesType,q=a.seriesTypes;m("arearange","area",{marker:null,threshold:null,tooltip:{pointFormat:'\x3cspan class\x3d"highcharts-color-{series.colorIndex}"\x3e\u25cf\x3c/span\x3e {series.name}: \x3cb\x3e{point.low}\x3c/b\x3e - \x3cb\x3e{point.high}\x3c/b\x3e\x3cbr/\x3e'},
trackByArea:!0,dataLabels:{align:null,verticalAlign:null,xLow:0,xHigh:0,yLow:0,yHigh:0},states:{hover:{halo:!1}}},{pointArrayMap:["low","high"],dataLabelCollections:["dataLabel","dataLabelUpper"],toYData:function(c){return[c.low,c.high]},pointValKey:"low",deferTranslatePolar:!0,highToXY:function(c){var e=this.chart,h=this.xAxis.postTranslate(c.rectPlotX,this.yAxis.len-c.plotHigh);c.plotHighX=h.x-e.plotLeft;c.plotHigh=h.y-e.plotTop},translate:function(){var c=this,e=c.yAxis,h=!!c.modifyValue;q.area.prototype.translate.apply(c);
k(c.points,function(a){var l=a.low,b=a.high,f=a.plotY;null===b||null===l?a.isNull=!0:(a.plotLow=f,a.plotHigh=e.translate(h?c.modifyValue(b,a):b,0,1,0,1),h&&(a.yBottom=a.plotHigh))});this.chart.polar&&k(this.points,function(e){c.highToXY(e)})},getGraphPath:function(c){var e=[],a=[],l,n=q.area.prototype.getGraphPath,b,f,p;p=this.options;var r=this.chart.polar&&!1!==p.connectEnds,d=p.step;c=c||this.points;for(l=c.length;l--;)b=c[l],b.isNull||r||c[l+1]&&!c[l+1].isNull||a.push({plotX:b.plotX,plotY:b.plotY,
doCurve:!1}),f={polarPlotY:b.polarPlotY,rectPlotX:b.rectPlotX,yBottom:b.yBottom,plotX:u(b.plotHighX,b.plotX),plotY:b.plotHigh,isNull:b.isNull},a.push(f),e.push(f),b.isNull||r||c[l-1]&&!c[l-1].isNull||a.push({plotX:b.plotX,plotY:b.plotY,doCurve:!1});c=n.call(this,c);d&&(!0===d&&(d="left"),p.step={left:"right",center:"center",right:"left"}[d]);e=n.call(this,e);a=n.call(this,a);p.step=d;p=[].concat(c,e);this.chart.polar||"M"!==a[0]||(a[0]="L");this.graphPath=p;this.areaPath=this.areaPath.concat(c,a);
p.isArea=!0;p.xMap=c.xMap;this.areaPath.xMap=c.xMap;return p},drawDataLabels:function(){var c=this.data,e=c.length,a,l=[],n=g.prototype,b=this.options.dataLabels,f=b.align,p=b.verticalAlign,r=b.inside,d,v,m=this.chart.inverted;if(b.enabled||this._hasPointLabels){for(a=e;a--;)if(d=c[a])v=r?d.plotHigh<d.plotLow:d.plotHigh>d.plotLow,d.y=d.high,d._plotY=d.plotY,d.plotY=d.plotHigh,l[a]=d.dataLabel,d.dataLabel=d.dataLabelUpper,d.below=v,m?f||(b.align=v?"right":"left"):p||(b.verticalAlign=v?"top":"bottom"),
b.x=b.xHigh,b.y=b.yHigh;n.drawDataLabels&&n.drawDataLabels.apply(this,arguments);for(a=e;a--;)if(d=c[a])v=r?d.plotHigh<d.plotLow:d.plotHigh>d.plotLow,d.dataLabelUpper=d.dataLabel,d.dataLabel=l[a],d.y=d.low,d.plotY=d._plotY,d.below=!v,m?f||(b.align=v?"left":"right"):p||(b.verticalAlign=v?"bottom":"top"),b.x=b.xLow,b.y=b.yLow;n.drawDataLabels&&n.drawDataLabels.apply(this,arguments)}b.align=f;b.verticalAlign=p},alignDataLabel:function(){q.column.prototype.alignDataLabel.apply(this,arguments)},setStackedPoints:t,
getSymbol:t,drawPoints:t})})(w);(function(a){var k=a.seriesType;k("areasplinerange","arearange",null,{getPointSpline:a.seriesTypes.spline.prototype.getPointSpline})})(w);(function(a){var k=a.defaultPlotOptions,t=a.each,u=a.merge,g=a.noop,m=a.pick,q=a.seriesType,c=a.seriesTypes.column.prototype;q("columnrange","arearange",u(k.column,k.arearange,{lineWidth:1,pointRange:null}),{translate:function(){var a=this,h=a.yAxis,l=a.xAxis,n=l.startAngleRad,b,f=a.chart,p=a.xAxis.isRadial,r;c.translate.apply(a);
t(a.points,function(d){var c=d.shapeArgs,e=a.options.minPointLength,g,k;d.plotHigh=r=h.translate(d.high,0,1,0,1);d.plotLow=d.plotY;k=r;g=m(d.rectPlotY,d.plotY)-r;Math.abs(g)<e?(e-=g,g+=e,k-=e/2):0>g&&(g*=-1,k-=g);p?(b=d.barX+n,d.shapeType="path",d.shapeArgs={d:a.polarArc(k+g,k,b,b+d.pointWidth)}):(c.height=g,c.y=k,d.tooltipPos=f.inverted?[h.len+h.pos-f.plotLeft-k-g/2,l.len+l.pos-f.plotTop-c.x-c.width/2,g]:[l.left-f.plotLeft+c.x+c.width/2,h.pos-f.plotTop+k+g/2,g])})},directTouch:!0,trackerGroups:["group",
"dataLabelsGroup"],drawGraph:g,crispCol:c.crispCol,drawPoints:c.drawPoints,drawTracker:c.drawTracker,getColumnMetrics:c.getColumnMetrics,animate:function(){return c.animate.apply(this,arguments)},polarArc:function(){return c.polarArc.apply(this,arguments)},pointAttribs:c.pointAttribs})})(w);(function(a){var k=a.each,t=a.isNumber,u=a.merge,g=a.pick,m=a.pInt,q=a.Series,c=a.seriesType,e=a.TrackerMixin;c("gauge","line",{dataLabels:{enabled:!0,defer:!1,y:15,borderRadius:3,crop:!1,verticalAlign:"top",zIndex:2},
dial:{},pivot:{},tooltip:{headerFormat:""},showInLegend:!1},{angular:!0,directTouch:!0,drawGraph:a.noop,fixedBox:!0,forceDL:!0,noSharedTooltip:!0,trackerGroups:["group","dataLabelsGroup"],translate:function(){var c=this.yAxis,a=this.options,e=c.center;this.generatePoints();k(this.points,function(b){var f=u(a.dial,b.dial),h=m(g(f.radius,80))*e[2]/200,l=m(g(f.baseLength,70))*h/100,d=m(g(f.rearLength,10))*h/100,n=f.baseWidth||3,k=f.topWidth||1,q=a.overshoot,x=c.startAngleRad+c.translate(b.y,null,null,
null,!0);t(q)?(q=q/180*Math.PI,x=Math.max(c.startAngleRad-q,Math.min(c.endAngleRad+q,x))):!1===a.wrap&&(x=Math.max(c.startAngleRad,Math.min(c.endAngleRad,x)));x=180*x/Math.PI;b.shapeType="path";b.shapeArgs={d:f.path||["M",-d,-n/2,"L",l,-n/2,h,-k/2,h,k/2,l,n/2,-d,n/2,"z"],translateX:e[0],translateY:e[1],rotation:x};b.plotX=e[0];b.plotY=e[1]})},drawPoints:function(){var c=this,a=c.yAxis.center,e=c.pivot,b=c.options,f=b.pivot,p=c.chart.renderer;k(c.points,function(a){var d=a.graphic,e=a.shapeArgs,f=
e.d;u(b.dial,a.dial);d?(d.animate(e),e.d=f):a.graphic=p[a.shapeType](e).attr({rotation:e.rotation,zIndex:1}).addClass("highcharts-dial").add(c.group)});e?e.animate({translateX:a[0],translateY:a[1]}):c.pivot=p.circle(0,0,g(f.radius,5)).attr({zIndex:2}).addClass("highcharts-pivot").translate(a[0],a[1]).add(c.group)},animate:function(c){var a=this;c||(k(a.points,function(c){var b=c.graphic;b&&(b.attr({rotation:180*a.yAxis.startAngleRad/Math.PI}),b.animate({rotation:c.shapeArgs.rotation},a.options.animation))}),
a.animate=null)},render:function(){this.group=this.plotGroup("group","series",this.visible?"visible":"hidden",this.options.zIndex,this.chart.seriesGroup);q.prototype.render.call(this);this.group.clip(this.chart.clipRect)},setData:function(c,a){q.prototype.setData.call(this,c,!1);this.processData();this.generatePoints();g(a,!0)&&this.chart.redraw()},drawTracker:e&&e.drawTrackerPoint},{setState:function(c){this.state=c}})})(w);(function(a){var k=a.each,t=a.noop,u=a.seriesType,g=a.seriesTypes;u("boxplot",
"column",{threshold:null,tooltip:{pointFormat:'\x3cspan class\x3d"highcharts-color-{point.colorIndex}"\x3e\u25cf\x3c/span\x3e \x3cb\x3e {series.name}\x3c/b\x3e\x3cbr/\x3eMaximum: {point.high}\x3cbr/\x3eUpper quartile: {point.q3}\x3cbr/\x3eMedian: {point.median}\x3cbr/\x3eLower quartile: {point.q1}\x3cbr/\x3eMinimum: {point.low}\x3cbr/\x3e'},whiskerLength:"50%"},{pointArrayMap:["low","q1","median","q3","high"],toYData:function(a){return[a.low,a.q1,a.median,a.q3,a.high]},pointValKey:"high",drawDataLabels:t,
translate:function(){var a=this.yAxis,q=this.pointArrayMap;g.column.prototype.translate.apply(this);k(this.points,function(c){k(q,function(e){null!==c[e]&&(c[e+"Plot"]=a.translate(c[e],0,1,0,1))})})},drawPoints:function(){var a=this,g=a.chart.renderer,c,e,h,l,n,b,f=0,p,r,d,v,z=!1!==a.doQuartiles,t,x=a.options.whiskerLength;k(a.points,function(k){var m=k.graphic,q=m?"animate":"attr",u=k.shapeArgs;void 0!==k.plotY&&(p=u.width,r=Math.floor(u.x),d=r+p,v=Math.round(p/2),c=Math.floor(z?k.q1Plot:k.lowPlot),
e=Math.floor(z?k.q3Plot:k.lowPlot),h=Math.floor(k.highPlot),l=Math.floor(k.lowPlot),m||(k.graphic=m=g.g("point").add(a.group),k.stem=g.path().addClass("highcharts-boxplot-stem").add(m),x&&(k.whiskers=g.path().addClass("highcharts-boxplot-whisker").add(m)),z&&(k.box=g.path(void 0).addClass("highcharts-boxplot-box").add(m)),k.medianShape=g.path(void 0).addClass("highcharts-boxplot-median").add(m)),b=k.stem.strokeWidth()%2/2,f=r+v+b,k.stem[q]({d:["M",f,e,"L",f,h,"M",f,c,"L",f,l]}),z&&(b=k.box.strokeWidth()%
2/2,c=Math.floor(c)+b,e=Math.floor(e)+b,r+=b,d+=b,k.box[q]({d:["M",r,e,"L",r,c,"L",d,c,"L",d,e,"L",r,e,"z"]})),x&&(b=k.whiskers.strokeWidth()%2/2,h+=b,l+=b,t=/%$/.test(x)?v*parseFloat(x)/100:x/2,k.whiskers[q]({d:["M",f-t,h,"L",f+t,h,"M",f-t,l,"L",f+t,l]})),n=Math.round(k.medianPlot),b=k.medianShape.strokeWidth()%2/2,n+=b,k.medianShape[q]({d:["M",r,n,"L",d,n]}))})},setStackedPoints:t})})(w);(function(a){var k=a.each,t=a.noop,u=a.seriesType,g=a.seriesTypes;u("errorbar","boxplot",{grouping:!1,linkedTo:":previous",
tooltip:{pointFormat:'\x3cspan style\x3d"color:{point.color}"\x3e\u25cf\x3c/span\x3e {series.name}: \x3cb\x3e{point.low}\x3c/b\x3e - \x3cb\x3e{point.high}\x3c/b\x3e\x3cbr/\x3e'},whiskerWidth:null},{type:"errorbar",pointArrayMap:["low","high"],toYData:function(a){return[a.low,a.high]},pointValKey:"high",doQuartiles:!1,drawDataLabels:g.arearange?function(){var a=this.pointValKey;g.arearange.prototype.drawDataLabels.call(this);k(this.data,function(k){k.y=k[a]})}:t,getColumnMetrics:function(){return this.linkedParent&&
this.linkedParent.columnMetrics||g.column.prototype.getColumnMetrics.call(this)}})})(w);(function(a){var k=a.correctFloat,t=a.isNumber,u=a.pick,g=a.Point,m=a.Series,q=a.seriesType,c=a.seriesTypes;q("waterfall","column",{dataLabels:{inside:!0}},{pointValKey:"y",translate:function(){var a=this.options,h=this.yAxis,l,n,b,f,p,r,d,g,m,q=u(a.minPointLength,5),t=a.threshold,w=a.stacking,A=0,y=0,B;c.column.prototype.translate.apply(this);d=g=t;n=this.points;l=0;for(a=n.length;l<a;l++)b=n[l],r=this.processedYData[l],
f=b.shapeArgs,p=w&&h.stacks[(this.negStacks&&r<t?"-":"")+this.stackKey],B=this.getStackIndicator(B,b.x),m=p?p[b.x].points[this.index+","+l+","+B.index]:[0,r],b.isSum?b.y=k(r):b.isIntermediateSum&&(b.y=k(r-g)),p=Math.max(d,d+b.y)+m[0],f.y=h.toPixels(p,!0),b.isSum?(f.y=h.toPixels(m[1],!0),f.height=Math.min(h.toPixels(m[0],!0),h.len)-f.y+A+y):b.isIntermediateSum?(f.y=h.toPixels(m[1],!0),f.height=Math.min(h.toPixels(g,!0),h.len)-f.y+A+y,g=m[1]):(f.height=0<r?h.toPixels(d,!0)-f.y:h.toPixels(d,!0)-h.toPixels(d-
r,!0),d+=r),0>f.height&&(f.y+=f.height,f.height*=-1),b.plotY=f.y=Math.round(f.y)-this.borderWidth%2/2,f.height=Math.max(Math.round(f.height),.001),b.yBottom=f.y+f.height,f.y-=y,f.height<=q&&!b.isNull&&(f.height=q,0>b.y?y-=q:A+=q),f.y-=A,f=b.plotY-y-A+(b.negative&&0<=y?f.height:0),this.chart.inverted?b.tooltipPos[0]=h.len-f:b.tooltipPos[1]=f},processData:function(a){var c=this.yData,e=this.options.data,n,b=c.length,f,p,r,d,g,q;p=f=r=d=this.options.threshold||0;for(q=0;q<b;q++)g=c[q],n=e&&e[q]?e[q]:
{},"sum"===g||n.isSum?c[q]=k(p):"intermediateSum"===g||n.isIntermediateSum?c[q]=k(f):(p+=g,f+=g),r=Math.min(p,r),d=Math.max(p,d);m.prototype.processData.call(this,a);this.dataMin=r;this.dataMax=d},toYData:function(a){return a.isSum?0===a.x?null:"sum":a.isIntermediateSum?0===a.x?null:"intermediateSum":a.y},getGraphPath:function(){return["M",0,0]},getCrispPath:function(){var a=this.data,c=a.length,l=this.graph.strokeWidth()+this.borderWidth,l=Math.round(l)%2/2,n=[],b,f,p;for(p=1;p<c;p++)f=a[p].shapeArgs,
b=a[p-1].shapeArgs,f=["M",b.x+b.width,b.y+l,"L",f.x,b.y+l],0>a[p-1].y&&(f[2]+=b.height,f[5]+=b.height),n=n.concat(f);return n},drawGraph:function(){m.prototype.drawGraph.call(this);this.graph.attr({d:this.getCrispPath()})},getExtremes:a.noop},{getClassName:function(){var a=g.prototype.getClassName.call(this);this.isSum?a+=" highcharts-sum":this.isIntermediateSum&&(a+=" highcharts-intermediate-sum");return a},isValid:function(){return t(this.y,!0)||this.isSum||this.isIntermediateSum}})})(w);(function(a){var k=
a.Series,t=a.seriesType,u=a.seriesTypes;t("polygon","scatter",{marker:{enabled:!1,states:{hover:{enabled:!1}}},stickyTracking:!1,tooltip:{followPointer:!0,pointFormat:""},trackByArea:!0},{type:"polygon",getGraphPath:function(){for(var a=k.prototype.getGraphPath.call(this),m=a.length+1;m--;)(m===a.length||"M"===a[m])&&0<m&&a.splice(m,0,"z");return this.areaPath=a},drawGraph:function(){u.area.prototype.drawGraph.call(this)},drawLegendSymbol:a.LegendSymbolMixin.drawRectangle,drawTracker:k.prototype.drawTracker,
setStackedPoints:a.noop})})(w);(function(a){var k=a.arrayMax,t=a.arrayMin,u=a.Axis,g=a.each,m=a.isNumber,q=a.noop,c=a.pick,e=a.pInt,h=a.Point,l=a.seriesType,n=a.seriesTypes;l("bubble","scatter",{dataLabels:{formatter:function(){return this.point.z},inside:!0,verticalAlign:"middle"},marker:{radius:null,states:{hover:{radiusPlus:0}},symbol:"circle"},minSize:8,maxSize:"20%",softThreshold:!1,states:{hover:{halo:{size:5}}},tooltip:{pointFormat:"({point.x}, {point.y}), Size: {point.z}"},turboThreshold:0,
zThreshold:0,zoneAxis:"z"},{pointArrayMap:["y","z"],parallelArrays:["x","y","z"],trackerGroups:["markerGroup","dataLabelsGroup"],bubblePadding:!0,zoneAxis:"z",getRadii:function(a,c,e,l){var b,f,h,n=this.zData,p=[],r=this.options,k="width"!==r.sizeBy,g=r.zThreshold,m=c-a;f=0;for(b=n.length;f<b;f++)h=n[f],r.sizeByAbsoluteValue&&null!==h&&(h=Math.abs(h-g),c=Math.max(c-g,Math.abs(a-g)),a=0),null===h?h=null:h<a?h=e/2-1:(h=0<m?(h-a)/m:.5,k&&0<=h&&(h=Math.sqrt(h)),h=Math.ceil(e+h*(l-e))/2),p.push(h);this.radii=
p},animate:function(a){var b=this.options.animation;a||(g(this.points,function(a){var c=a.graphic,d;c&&c.width&&(d={x:c.x,y:c.y,width:c.width,height:c.height},c.attr({x:a.plotX,y:a.plotY,width:1,height:1}),c.animate(d,b))}),this.animate=null)},translate:function(){var a,c=this.data,e,h,d=this.radii;n.scatter.prototype.translate.call(this);for(a=c.length;a--;)e=c[a],h=d?d[a]:0,m(h)&&h>=this.minPxSize/2?(e.marker={radius:h,width:2*h,height:2*h},e.dlBox={x:e.plotX-h,y:e.plotY-h,width:2*h,height:2*h}):
e.shapeArgs=e.plotY=e.dlBox=void 0},alignDataLabel:n.column.prototype.alignDataLabel,buildKDTree:q,applyZones:q},{haloPath:function(a){return h.prototype.haloPath.call(this,0===a?0:this.marker.radius+a)},ttBelow:!1});u.prototype.beforePadding=function(){var a=this,f=this.len,h=this.chart,l=0,d=f,n=this.isXAxis,q=n?"xData":"yData",u=this.min,x={},w=Math.min(h.plotWidth,h.plotHeight),A=Number.MAX_VALUE,y=-Number.MAX_VALUE,B=this.max-u,C=f/B,D=[];g(this.series,function(b){var d=b.options;!b.bubblePadding||
!b.visible&&h.options.chart.ignoreHiddenSeries||(a.allowZoomOutside=!0,D.push(b),n&&(g(["minSize","maxSize"],function(a){var b=d[a],c=/%$/.test(b),b=e(b);x[a]=c?w*b/100:b}),b.minPxSize=x.minSize,b.maxPxSize=Math.max(x.maxSize,x.minSize),b=b.zData,b.length&&(A=c(d.zMin,Math.min(A,Math.max(t(b),!1===d.displayNegative?d.zThreshold:-Number.MAX_VALUE))),y=c(d.zMax,Math.max(y,k(b))))))});g(D,function(b){var c=b[q],e=c.length,f;n&&b.getRadii(A,y,b.minPxSize,b.maxPxSize);if(0<B)for(;e--;)m(c[e])&&a.dataMin<=
c[e]&&c[e]<=a.dataMax&&(f=b.radii[e],l=Math.min((c[e]-u)*C-f,l),d=Math.max((c[e]-u)*C+f,d))});D.length&&0<B&&!this.isLog&&(d-=f,C*=(f+l-d)/f,g([["min","userMin",l],["max","userMax",d]],function(b){void 0===c(a.options[b[0]],a[b[1]])&&(a[b[0]]+=b[2]/C)}))}})(w);(function(a){function k(a,e){var c=this.chart,l=this.options.animation,n=this.group,b=this.markerGroup,f=this.xAxis.center,g=c.plotLeft,k=c.plotTop;c.polar?c.renderer.isSVG&&(!0===l&&(l={}),e?(a={translateX:f[0]+g,translateY:f[1]+k,scaleX:.001,
scaleY:.001},n.attr(a),b&&b.attr(a)):(a={translateX:g,translateY:k,scaleX:1,scaleY:1},n.animate(a,l),b&&b.animate(a,l),this.animate=null)):a.call(this,e)}var t=a.each,u=a.pick,g=a.seriesTypes,m=a.wrap,q=a.Series.prototype;a=a.Pointer.prototype;q.searchPointByAngle=function(a){var c=this.chart,h=this.xAxis.pane.center;return this.searchKDTree({clientX:180+-180/Math.PI*Math.atan2(a.chartX-h[0]-c.plotLeft,a.chartY-h[1]-c.plotTop)})};m(q,"buildKDTree",function(a){this.chart.polar&&(this.kdByAngle?this.searchPoint=
this.searchPointByAngle:this.kdDimensions=2);a.apply(this)});q.toXY=function(a){var c,h=this.chart,l=a.plotX;c=a.plotY;a.rectPlotX=l;a.rectPlotY=c;c=this.xAxis.postTranslate(a.plotX,this.yAxis.len-c);a.plotX=a.polarPlotX=c.x-h.plotLeft;a.plotY=a.polarPlotY=c.y-h.plotTop;this.kdByAngle?(h=(l/Math.PI*180+this.xAxis.pane.options.startAngle)%360,0>h&&(h+=360),a.clientX=h):a.clientX=a.plotX};g.spline&&m(g.spline.prototype,"getPointSpline",function(a,e,h,l){var c,b,f,g,k,d,m;this.chart.polar?(c=h.plotX,
b=h.plotY,a=e[l-1],f=e[l+1],this.connectEnds&&(a||(a=e[e.length-2]),f||(f=e[1])),a&&f&&(g=a.plotX,k=a.plotY,e=f.plotX,d=f.plotY,g=(1.5*c+g)/2.5,k=(1.5*b+k)/2.5,f=(1.5*c+e)/2.5,m=(1.5*b+d)/2.5,e=Math.sqrt(Math.pow(g-c,2)+Math.pow(k-b,2)),d=Math.sqrt(Math.pow(f-c,2)+Math.pow(m-b,2)),g=Math.atan2(k-b,g-c),k=Math.atan2(m-b,f-c),m=Math.PI/2+(g+k)/2,Math.abs(g-m)>Math.PI/2&&(m-=Math.PI),g=c+Math.cos(m)*e,k=b+Math.sin(m)*e,f=c+Math.cos(Math.PI+m)*d,m=b+Math.sin(Math.PI+m)*d,h.rightContX=f,h.rightContY=m),
l?(h=["C",a.rightContX||a.plotX,a.rightContY||a.plotY,g||c,k||b,c,b],a.rightContX=a.rightContY=null):h=["M",c,b]):h=a.call(this,e,h,l);return h});m(q,"translate",function(a){var c=this.chart;a.call(this);if(c.polar&&(this.kdByAngle=c.tooltip&&c.tooltip.shared,!this.preventPostTranslate))for(a=this.points,c=a.length;c--;)this.toXY(a[c])});m(q,"getGraphPath",function(a,e){var c=this,l,g;if(this.chart.polar){e=e||this.points;for(l=0;l<e.length;l++)if(!e[l].isNull){g=l;break}!1!==this.options.connectEnds&&
void 0!==g&&(this.connectEnds=!0,e.splice(e.length,0,e[g]));t(e,function(a){void 0===a.polarPlotY&&c.toXY(a)})}return a.apply(this,[].slice.call(arguments,1))});m(q,"animate",k);g.column&&(g=g.column.prototype,g.polarArc=function(a,e,h,l){var c=this.xAxis.center,b=this.yAxis.len;return this.chart.renderer.symbols.arc(c[0],c[1],b-e,null,{start:h,end:l,innerR:b-u(a,b)})},m(g,"animate",k),m(g,"translate",function(a){var c=this.xAxis,h=c.startAngleRad,l,g,b;this.preventPostTranslate=!0;a.call(this);if(c.isRadial)for(l=
this.points,b=l.length;b--;)g=l[b],a=g.barX+h,g.shapeType="path",g.shapeArgs={d:this.polarArc(g.yBottom,g.plotY,a,a+g.pointWidth)},this.toXY(g),g.tooltipPos=[g.plotX,g.plotY],g.ttBelow=g.plotY>c.center[1]}),m(g,"alignDataLabel",function(a,e,h,g,k,b){this.chart.polar?(a=e.rectPlotX/Math.PI*180,null===g.align&&(g.align=20<a&&160>a?"left":200<a&&340>a?"right":"center"),null===g.verticalAlign&&(g.verticalAlign=45>a||315<a?"bottom":135<a&&225>a?"top":"middle"),q.alignDataLabel.call(this,e,h,g,k,b)):a.call(this,
e,h,g,k,b)}));m(a,"getCoordinates",function(a,e){var c=this.chart,g={xAxis:[],yAxis:[]};c.polar?t(c.axes,function(a){var b=a.isXAxis,f=a.center,h=e.chartX-f[0]-c.plotLeft,f=e.chartY-f[1]-c.plotTop;g[b?"xAxis":"yAxis"].push({axis:a,value:a.translate(b?Math.PI-Math.atan2(h,f):Math.sqrt(Math.pow(h,2)+Math.pow(f,2)),!0)})}):g=a.call(this,e);return g})})(w)});


/*
 Highcharts JS v5.0.7 (2017-01-17)

 3D features for Highcharts JS

 @license: www.highcharts.com/license
*/
(function(F){"object"===typeof module&&module.exports?module.exports=F:F(Highcharts)})(function(F){(function(a){var r=a.deg2rad,k=a.pick;a.perspective=function(n,m,u){var p=m.options.chart.options3d,f=u?m.inverted:!1,g=m.plotWidth/2,q=m.plotHeight/2,d=p.depth/2,e=k(p.depth,1)*k(p.viewDistance,0),c=m.scale3d||1,b=r*p.beta*(f?-1:1),p=r*p.alpha*(f?-1:1),h=Math.cos(p),w=Math.cos(-b),y=Math.sin(p),z=Math.sin(-b);u||(g+=m.plotLeft,q+=m.plotTop);return a.map(n,function(b){var a,p;p=(f?b.y:b.x)-g;var m=(f?
b.x:b.y)-q,k=(b.z||0)-d;a=w*p-z*k;b=-y*z*p+h*m-w*y*k;p=h*z*p+y*m+h*w*k;m=0<e&&e<Number.POSITIVE_INFINITY?e/(p+d+e):1;a=a*m*c+g;b=b*m*c+q;return{x:f?b:a,y:f?a:b,z:p*c+d}})};a.pointCameraDistance=function(a,m){var n=m.options.chart.options3d,p=m.plotWidth/2;m=m.plotHeight/2;n=k(n.depth,1)*k(n.viewDistance,0)+n.depth;return Math.sqrt(Math.pow(p-a.plotX,2)+Math.pow(m-a.plotY,2)+Math.pow(n-a.plotZ,2))}})(F);(function(a){function r(b){var c=0,l,x;for(l=0;l<b.length;l++)x=(l+1)%b.length,c+=b[l].x*b[x].y-
b[x].x*b[l].y;return c/2}function k(b){var c=0,l;for(l=0;l<b.length;l++)c+=b[l].z;return b.length?c/b.length:0}function n(b,c,l,x,a,h,d,e){var D=[],f=h-a;return h>a&&h-a>Math.PI/2+.0001?(D=D.concat(n(b,c,l,x,a,a+Math.PI/2,d,e)),D=D.concat(n(b,c,l,x,a+Math.PI/2,h,d,e))):h<a&&a-h>Math.PI/2+.0001?(D=D.concat(n(b,c,l,x,a,a-Math.PI/2,d,e)),D=D.concat(n(b,c,l,x,a-Math.PI/2,h,d,e))):["C",b+l*Math.cos(a)-l*t*f*Math.sin(a)+d,c+x*Math.sin(a)+x*t*f*Math.cos(a)+e,b+l*Math.cos(h)+l*t*f*Math.sin(h)+d,c+x*Math.sin(h)-
x*t*f*Math.cos(h)+e,b+l*Math.cos(h)+d,c+x*Math.sin(h)+e]}var m=Math.cos,u=Math.PI,p=Math.sin,f=a.animObject,g=a.charts,q=a.color,d=a.defined,e=a.deg2rad,c=a.each,b=a.extend,h=a.inArray,w=a.map,y=a.merge,z=a.perspective,G=a.pick,B=a.SVGElement,H=a.SVGRenderer,C=a.wrap,t=4*(Math.sqrt(2)-1)/3/(u/2);H.prototype.toLinePath=function(b,a){var h=[];c(b,function(b){h.push("L",b.x,b.y)});b.length&&(h[0]="M",a&&h.push("Z"));return h};H.prototype.cuboid=function(b){var c=this.g(),h=c.destroy;b=this.cuboidPath(b);
c.attr({"stroke-linejoin":"round"});c.front=this.path(b[0]).attr({"class":"highcharts-3d-front",zIndex:b[3]}).add(c);c.top=this.path(b[1]).attr({"class":"highcharts-3d-top",zIndex:b[4]}).add(c);c.side=this.path(b[2]).attr({"class":"highcharts-3d-side",zIndex:b[5]}).add(c);c.fillSetter=function(b){this.front.attr({fill:b});this.top.attr({fill:q(b).brighten(.1).get()});this.side.attr({fill:q(b).brighten(-.1).get()});this.color=b;return this};c.opacitySetter=function(b){this.front.attr({opacity:b});
this.top.attr({opacity:b});this.side.attr({opacity:b});return this};c.attr=function(b){if(b.shapeArgs||d(b.x))b=this.renderer.cuboidPath(b.shapeArgs||b),this.front.attr({d:b[0],zIndex:b[3]}),this.top.attr({d:b[1],zIndex:b[4]}),this.side.attr({d:b[2],zIndex:b[5]});else return a.SVGElement.prototype.attr.call(this,b);return this};c.animate=function(b,c,a){d(b.x)&&d(b.y)?(b=this.renderer.cuboidPath(b),this.front.attr({zIndex:b[3]}).animate({d:b[0]},c,a),this.top.attr({zIndex:b[4]}).animate({d:b[1]},
c,a),this.side.attr({zIndex:b[5]}).animate({d:b[2]},c,a),this.attr({zIndex:-b[6]})):b.opacity?(this.front.animate(b,c,a),this.top.animate(b,c,a),this.side.animate(b,c,a)):B.prototype.animate.call(this,b,c,a);return this};c.destroy=function(){this.front.destroy();this.top.destroy();this.side.destroy();return h.call(this)};c.attr({zIndex:-b[6]});return c};H.prototype.cuboidPath=function(b){function c(b){return q[b]}var a=b.x,h=b.y,d=b.z,e=b.height,D=b.width,f=b.depth,q=[{x:a,y:h,z:d},{x:a+D,y:h,z:d},
{x:a+D,y:h+e,z:d},{x:a,y:h+e,z:d},{x:a,y:h+e,z:d+f},{x:a+D,y:h+e,z:d+f},{x:a+D,y:h,z:d+f},{x:a,y:h,z:d+f}],q=z(q,g[this.chartIndex],b.insidePlotArea),d=function(b,a){var h=[];b=w(b,c);a=w(a,c);0>r(b)?h=b:0>r(a)&&(h=a);return h};b=d([3,2,1,0],[7,6,5,4]);a=[4,5,2,3];h=d([1,6,7,0],a);d=d([1,2,5,6],[0,7,4,3]);return[this.toLinePath(b,!0),this.toLinePath(h,!0),this.toLinePath(d,!0),k(b),k(h),k(d),9E9*k(w(a,c))]};a.SVGRenderer.prototype.arc3d=function(a){function d(b){var a=!1,c={},d;for(d in b)-1!==h(d,
p)&&(c[d]=b[d],delete b[d],a=!0);return a?c:!1}var l=this.g(),x=l.renderer,p="x y r innerR start end".split(" ");a=y(a);a.alpha*=e;a.beta*=e;l.top=x.path();l.side1=x.path();l.side2=x.path();l.inn=x.path();l.out=x.path();l.onAdd=function(){var b=l.parentGroup,a=l.attr("class");l.top.add(l);c(["out","inn","side1","side2"],function(c){l[c].addClass(a+" highcharts-3d-side").add(b)})};l.setPaths=function(b){var a=l.renderer.arc3dPath(b),c=100*a.zTop;l.attribs=b;l.top.attr({d:a.top,zIndex:a.zTop});l.inn.attr({d:a.inn,
zIndex:a.zInn});l.out.attr({d:a.out,zIndex:a.zOut});l.side1.attr({d:a.side1,zIndex:a.zSide1});l.side2.attr({d:a.side2,zIndex:a.zSide2});l.zIndex=c;l.attr({zIndex:c});b.center&&(l.top.setRadialReference(b.center),delete b.center)};l.setPaths(a);l.fillSetter=function(b){var a=q(b).brighten(-.1).get();this.fill=b;this.side1.attr({fill:a});this.side2.attr({fill:a});this.inn.attr({fill:a});this.out.attr({fill:a});this.top.attr({fill:b});return this};c(["opacity","translateX","translateY","visibility"],
function(b){l[b+"Setter"]=function(b,a){l[a]=b;c(["out","inn","side1","side2","top"],function(c){l[c].attr(a,b)})}});C(l,"attr",function(a,c){var h;"object"===typeof c&&(h=d(c))&&(b(l.attribs,h),l.setPaths(l.attribs));return a.apply(this,[].slice.call(arguments,1))});C(l,"animate",function(b,a,c,h){var l,e=this.attribs,q;delete a.center;delete a.z;delete a.depth;delete a.alpha;delete a.beta;q=f(G(c,this.renderer.globalAnimation));q.duration&&(a=y(a),l=d(a),a.dummy=1,l&&(q.step=function(b,a){function c(b){return e[b]+
(G(l[b],e[b])-e[b])*a.pos}"dummy"===a.prop&&a.elem.setPaths(y(e,{x:c("x"),y:c("y"),r:c("r"),innerR:c("innerR"),start:c("start"),end:c("end")}))}),c=q);return b.call(this,a,c,h)});l.destroy=function(){this.top.destroy();this.out.destroy();this.inn.destroy();this.side1.destroy();this.side2.destroy();B.prototype.destroy.call(this)};l.hide=function(){this.top.hide();this.out.hide();this.inn.hide();this.side1.hide();this.side2.hide()};l.show=function(){this.top.show();this.out.show();this.inn.show();this.side1.show();
this.side2.show()};return l};H.prototype.arc3dPath=function(b){function a(b){b%=2*Math.PI;b>Math.PI&&(b=2*Math.PI-b);return b}var c=b.x,h=b.y,d=b.start,e=b.end-.00001,f=b.r,q=b.innerR,w=b.depth,g=b.alpha,k=b.beta,y=Math.cos(d),r=Math.sin(d);b=Math.cos(e);var z=Math.sin(e),v=f*Math.cos(k),f=f*Math.cos(g),t=q*Math.cos(k),C=q*Math.cos(g),q=w*Math.sin(k),A=w*Math.sin(g),w=["M",c+v*y,h+f*r],w=w.concat(n(c,h,v,f,d,e,0,0)),w=w.concat(["L",c+t*b,h+C*z]),w=w.concat(n(c,h,t,C,e,d,0,0)),w=w.concat(["Z"]),G=
0<k?Math.PI/2:0,k=0<g?0:Math.PI/2,G=d>-G?d:e>-G?-G:d,E=e<u-k?e:d<u-k?u-k:e,B=2*u-k,g=["M",c+v*m(G),h+f*p(G)],g=g.concat(n(c,h,v,f,G,E,0,0));e>B&&d<B?(g=g.concat(["L",c+v*m(E)+q,h+f*p(E)+A]),g=g.concat(n(c,h,v,f,E,B,q,A)),g=g.concat(["L",c+v*m(B),h+f*p(B)]),g=g.concat(n(c,h,v,f,B,e,0,0)),g=g.concat(["L",c+v*m(e)+q,h+f*p(e)+A]),g=g.concat(n(c,h,v,f,e,B,q,A)),g=g.concat(["L",c+v*m(B),h+f*p(B)]),g=g.concat(n(c,h,v,f,B,E,0,0))):e>u-k&&d<u-k&&(g=g.concat(["L",c+v*Math.cos(E)+q,h+f*Math.sin(E)+A]),g=g.concat(n(c,
h,v,f,E,e,q,A)),g=g.concat(["L",c+v*Math.cos(e),h+f*Math.sin(e)]),g=g.concat(n(c,h,v,f,e,E,0,0)));g=g.concat(["L",c+v*Math.cos(E)+q,h+f*Math.sin(E)+A]);g=g.concat(n(c,h,v,f,E,G,q,A));g=g.concat(["Z"]);k=["M",c+t*y,h+C*r];k=k.concat(n(c,h,t,C,d,e,0,0));k=k.concat(["L",c+t*Math.cos(e)+q,h+C*Math.sin(e)+A]);k=k.concat(n(c,h,t,C,e,d,q,A));k=k.concat(["Z"]);y=["M",c+v*y,h+f*r,"L",c+v*y+q,h+f*r+A,"L",c+t*y+q,h+C*r+A,"L",c+t*y,h+C*r,"Z"];c=["M",c+v*b,h+f*z,"L",c+v*b+q,h+f*z+A,"L",c+t*b+q,h+C*z+A,"L",c+t*
b,h+C*z,"Z"];z=Math.atan2(A,-q);h=Math.abs(e+z);b=Math.abs(d+z);d=Math.abs((d+e)/2+z);h=a(h);b=a(b);d=a(d);d*=1E5;e=1E5*b;h*=1E5;return{top:w,zTop:1E5*Math.PI+1,out:g,zOut:Math.max(d,e,h),inn:k,zInn:Math.max(d,e,h),side1:y,zSide1:.99*h,side2:c,zSide2:.99*e}}})(F);(function(a){function r(a,d){var e=a.plotLeft,c=a.plotWidth+e,b=a.plotTop,h=a.plotHeight+b,f=e+a.plotWidth/2,g=b+a.plotHeight/2,q=Number.MAX_VALUE,k=-Number.MAX_VALUE,p=Number.MAX_VALUE,m=-Number.MAX_VALUE,r,t=1;r=[{x:e,y:b,z:0},{x:e,y:b,
z:d}];n([0,1],function(b){r.push({x:c,y:r[b].y,z:r[b].z})});n([0,1,2,3],function(b){r.push({x:r[b].x,y:h,z:r[b].z})});r=u(r,a,!1);n(r,function(b){q=Math.min(q,b.x);k=Math.max(k,b.x);p=Math.min(p,b.y);m=Math.max(m,b.y)});e>q&&(t=Math.min(t,1-Math.abs((e+f)/(q+f))%1));c<k&&(t=Math.min(t,(c-f)/(k-f)));b>p&&(t=0>p?Math.min(t,(b+g)/(-p+b+g)):Math.min(t,1-(b+g)/(p+g)%1));h<m&&(t=Math.min(t,Math.abs((h-g)/(m-g))));return t}var k=a.Chart,n=a.each,m=a.merge,u=a.perspective,p=a.pick,f=a.wrap;k.prototype.is3d=
function(){return this.options.chart.options3d&&this.options.chart.options3d.enabled};k.prototype.propsRequireDirtyBox.push("chart.options3d");k.prototype.propsRequireUpdateSeries.push("chart.options3d");a.wrap(a.Chart.prototype,"isInsidePlot",function(a){return this.is3d()||a.apply(this,[].slice.call(arguments,1))});var g=a.getOptions();m(!0,g,{chart:{options3d:{enabled:!1,alpha:0,beta:0,depth:100,fitToPlot:!0,viewDistance:25,frame:{bottom:{size:1},side:{size:1},back:{size:1}}}}});f(k.prototype,
"setClassName",function(a){a.apply(this,[].slice.call(arguments,1));this.is3d()&&(this.container.className+=" highcharts-3d-chart")});a.wrap(a.Chart.prototype,"setChartSize",function(a){var d=this.options.chart.options3d;a.apply(this,[].slice.call(arguments,1));if(this.is3d()){var e=this.inverted,c=this.clipBox,b=this.margin;c[e?"y":"x"]=-(b[3]||0);c[e?"x":"y"]=-(b[0]||0);c[e?"height":"width"]=this.chartWidth+(b[3]||0)+(b[1]||0);c[e?"width":"height"]=this.chartHeight+(b[0]||0)+(b[2]||0);this.scale3d=
1;!0===d.fitToPlot&&(this.scale3d=r(this,d.depth))}});f(k.prototype,"redraw",function(a){this.is3d()&&(this.isDirtyBox=!0);a.apply(this,[].slice.call(arguments,1))});f(k.prototype,"renderSeries",function(a){var d=this.series.length;if(this.is3d())for(;d--;)a=this.series[d],a.translate(),a.render();else a.call(this)});k.prototype.retrieveStacks=function(a){var d=this.series,e={},c,b=1;n(this.series,function(h){c=p(h.options.stack,a?0:d.length-1-h.index);e[c]?e[c].series.push(h):(e[c]={series:[h],position:b},
b++)});e.totalStacks=b+1;return e}})(F);(function(a){var r,k=a.Axis,n=a.Chart,m=a.each,u=a.extend,p=a.merge,f=a.perspective,g=a.pick,q=a.splat,d=a.Tick,e=a.wrap;e(k.prototype,"setOptions",function(a,b){a.call(this,b);this.chart.is3d()&&(a=this.options,a.tickWidth=g(a.tickWidth,0),a.gridLineWidth=g(a.gridLineWidth,1))});e(k.prototype,"render",function(a){a.apply(this,[].slice.call(arguments,1));if(this.chart.is3d()){var b=this.chart,c=b.renderer,d=b.options.chart.options3d,e=d.frame,f=e.bottom,g=e.back,
e=e.side,k=d.depth,q=this.height,p=this.width,m=this.left,n=this.top;this.isZAxis||(this.horiz?(g={x:m,y:n+(b.xAxis[0].opposite?-f.size:q),z:0,width:p,height:f.size,depth:k,insidePlotArea:!1},this.bottomFrame?this.bottomFrame.animate(g):(this.bottomFrame=c.cuboid(g).attr({"class":"highcharts-3d-frame highcharts-3d-frame-bottom",zIndex:b.yAxis[0].reversed&&0<d.alpha?4:-1}).add(),this.bottomFrame.attr({fill:f.color||"none",stroke:f.color||"none"}))):(d={x:m+(b.yAxis[0].opposite?0:-e.size),y:n+(b.xAxis[0].opposite?
-f.size:0),z:k,width:p+e.size,height:q+f.size,depth:g.size,insidePlotArea:!1},this.backFrame?this.backFrame.animate(d):(this.backFrame=c.cuboid(d).attr({"class":"highcharts-3d-frame highcharts-3d-frame-back",zIndex:-3}).add(),this.backFrame.attr({fill:g.color||"none",stroke:g.color||"none"})),b={x:m+(b.yAxis[0].opposite?p:-e.size),y:n+(b.xAxis[0].opposite?-f.size:0),z:0,width:e.size,height:q+f.size,depth:k,insidePlotArea:!1},this.sideFrame?this.sideFrame.animate(b):(this.sideFrame=c.cuboid(b).attr({"class":"highcharts-3d-frame highcharts-3d-frame-side",
zIndex:-2}).add(),this.sideFrame.attr({fill:e.color||"none",stroke:e.color||"none"}))))}});e(k.prototype,"getPlotLinePath",function(a){var b=a.apply(this,[].slice.call(arguments,1));if(!this.chart.is3d()||null===b)return b;var c=this.chart,d=c.options.chart.options3d,c=this.isZAxis?c.plotWidth:d.depth,d=this.opposite;this.horiz&&(d=!d);b=[this.swapZ({x:b[1],y:b[2],z:d?c:0}),this.swapZ({x:b[1],y:b[2],z:c}),this.swapZ({x:b[4],y:b[5],z:c}),this.swapZ({x:b[4],y:b[5],z:d?0:c})];b=f(b,this.chart,!1);return b=
this.chart.renderer.toLinePath(b,!1)});e(k.prototype,"getLinePath",function(a){return this.chart.is3d()?[]:a.apply(this,[].slice.call(arguments,1))});e(k.prototype,"getPlotBandPath",function(a){if(!this.chart.is3d())return a.apply(this,[].slice.call(arguments,1));var b=arguments,c=b[1],b=this.getPlotLinePath(b[2]);(c=this.getPlotLinePath(c))&&b?c.push("L",b[10],b[11],"L",b[7],b[8],"L",b[4],b[5],"L",b[1],b[2]):c=null;return c});e(d.prototype,"getMarkPath",function(a){var b=a.apply(this,[].slice.call(arguments,
1));if(!this.axis.chart.is3d())return b;b=[this.axis.swapZ({x:b[1],y:b[2],z:0}),this.axis.swapZ({x:b[4],y:b[5],z:0})];b=f(b,this.axis.chart,!1);return b=["M",b[0].x,b[0].y,"L",b[1].x,b[1].y]});e(d.prototype,"getLabelPosition",function(a){var b=a.apply(this,[].slice.call(arguments,1));this.axis.chart.is3d()&&(b=f([this.axis.swapZ({x:b.x,y:b.y,z:0})],this.axis.chart,!1)[0]);return b});a.wrap(k.prototype,"getTitlePosition",function(a){var b=this.chart.is3d(),c,d;b&&(d=this.axisTitleMargin,this.axisTitleMargin=
0);c=a.apply(this,[].slice.call(arguments,1));b&&(c=f([this.swapZ({x:c.x,y:c.y,z:0})],this.chart,!1)[0],c[this.horiz?"y":"x"]+=(this.horiz?1:-1)*(this.opposite?-1:1)*d,this.axisTitleMargin=d);return c});e(k.prototype,"drawCrosshair",function(a){var b=arguments;this.chart.is3d()&&b[2]&&(b[2]={plotX:b[2].plotXold||b[2].plotX,plotY:b[2].plotYold||b[2].plotY});a.apply(this,[].slice.call(b,1))});e(k.prototype,"destroy",function(a){m(["backFrame","bottomFrame","sideFrame"],function(b){this[b]&&(this[b]=
this[b].destroy())},this);a.apply(this,[].slice.call(arguments,1))});k.prototype.swapZ=function(a,b){if(this.isZAxis){b=b?0:this.chart.plotLeft;var c=this.chart;return{x:b+(c.yAxis[0].opposite?a.z:c.xAxis[0].width-a.z),y:a.y,z:a.x-b}}return a};r=a.ZAxis=function(){this.isZAxis=!0;this.init.apply(this,arguments)};u(r.prototype,k.prototype);u(r.prototype,{setOptions:function(a){a=p({offset:0,lineWidth:0},a);k.prototype.setOptions.call(this,a);this.coll="zAxis"},setAxisSize:function(){k.prototype.setAxisSize.call(this);
this.width=this.len=this.chart.options.chart.options3d.depth;this.right=this.chart.chartWidth-this.width-this.left},getSeriesExtremes:function(){var a=this,b=a.chart;a.hasVisibleSeries=!1;a.dataMin=a.dataMax=a.ignoreMinPadding=a.ignoreMaxPadding=null;a.buildStacks&&a.buildStacks();m(a.series,function(c){if(c.visible||!b.options.chart.ignoreHiddenSeries)a.hasVisibleSeries=!0,c=c.zData,c.length&&(a.dataMin=Math.min(g(a.dataMin,c[0]),Math.min.apply(null,c)),a.dataMax=Math.max(g(a.dataMax,c[0]),Math.max.apply(null,
c)))})}});e(n.prototype,"getAxes",function(a){var b=this,c=this.options,c=c.zAxis=q(c.zAxis||{});a.call(this);b.is3d()&&(this.zAxis=[],m(c,function(a,c){a.index=c;a.isX=!0;(new r(b,a)).setScale()}))})})(F);(function(a){function r(a){var d=a.apply(this,[].slice.call(arguments,1));this.chart.is3d()&&(d.stroke=this.options.edgeColor||d.fill,d["stroke-width"]=u(this.options.edgeWidth,1));return d}function k(a){if(this.chart.is3d()){var d=this.chart.options.plotOptions.column.grouping;void 0===d||d||void 0===
this.group.zIndex||this.zIndexSet||(this.group.attr({zIndex:10*this.group.zIndex}),this.zIndexSet=!0)}a.apply(this,[].slice.call(arguments,1))}var n=a.each,m=a.perspective,u=a.pick,p=a.Series,f=a.seriesTypes,g=a.svg;a=a.wrap;a(f.column.prototype,"translate",function(a){a.apply(this,[].slice.call(arguments,1));if(this.chart.is3d()){var d=this.chart,e=this.options,c=e.depth||25,b=(e.stacking?e.stack||0:this._i)*(c+(e.groupZPadding||1));!1!==e.grouping&&(b=0);b+=e.groupZPadding||1;n(this.data,function(a){if(null!==
a.y){var e=a.shapeArgs,h=a.tooltipPos;a.shapeType="cuboid";e.z=b;e.depth=c;e.insidePlotArea=!0;h=m([{x:h[0],y:h[1],z:b}],d,!0)[0];a.tooltipPos=[h.x,h.y]}});this.z=b}});a(f.column.prototype,"animate",function(a){if(this.chart.is3d()){var d=arguments[1],e=this.yAxis,c=this,b=this.yAxis.reversed;g&&(d?n(c.data,function(a){null!==a.y&&(a.height=a.shapeArgs.height,a.shapey=a.shapeArgs.y,a.shapeArgs.height=1,b||(a.shapeArgs.y=a.stackY?a.plotY+e.translate(a.stackY):a.plotY+(a.negative?-a.height:a.height)))}):
(n(c.data,function(a){null!==a.y&&(a.shapeArgs.height=a.height,a.shapeArgs.y=a.shapey,a.graphic&&a.graphic.animate(a.shapeArgs,c.options.animation))}),this.drawDataLabels(),c.animate=null))}else a.apply(this,[].slice.call(arguments,1))});a(f.column.prototype,"init",function(a){a.apply(this,[].slice.call(arguments,1));if(this.chart.is3d()){var d=this.options,e=d.grouping,c=d.stacking,b=u(this.yAxis.options.reversedStacks,!0),f=0;if(void 0===e||e){e=this.chart.retrieveStacks(c);f=d.stack||0;for(c=0;c<
e[f].series.length&&e[f].series[c]!==this;c++);f=10*(e.totalStacks-e[f].position)+(b?c:-c);this.xAxis.reversed||(f=10*e.totalStacks-f)}d.zIndex=f}});a(f.column.prototype,"pointAttribs",r);f.columnrange&&a(f.columnrange.prototype,"pointAttribs",r);a(p.prototype,"alignDataLabel",function(a){if(this.chart.is3d()&&("column"===this.type||"columnrange"===this.type)){var d=arguments[4],e={x:d.x,y:d.y,z:this.z},e=m([e],this.chart,!0)[0];d.x=e.x;d.y=e.y}a.apply(this,[].slice.call(arguments,1))});f.columnrange&&
a(f.columnrange.prototype,"drawPoints",k);a(f.column.prototype,"drawPoints",k)})(F);(function(a){var r=a.deg2rad,k=a.each,n=a.pick,m=a.seriesTypes,u=a.svg;a=a.wrap;a(m.pie.prototype,"translate",function(a){a.apply(this,[].slice.call(arguments,1));if(this.chart.is3d()){var f=this,g=f.options,p=g.depth||0,d=f.chart.options.chart.options3d,e=d.alpha,c=d.beta,b=g.stacking?(g.stack||0)*p:f._i*p,b=b+p/2;!1!==g.grouping&&(b=0);k(f.data,function(a){var d=a.shapeArgs;a.shapeType="arc3d";d.z=b;d.depth=.75*
p;d.alpha=e;d.beta=c;d.center=f.center;d=(d.end+d.start)/2;a.slicedTranslation={translateX:Math.round(Math.cos(d)*g.slicedOffset*Math.cos(e*r)),translateY:Math.round(Math.sin(d)*g.slicedOffset*Math.cos(e*r))}})}});a(m.pie.prototype.pointClass.prototype,"haloPath",function(a){var f=arguments;return this.series.chart.is3d()?[]:a.call(this,f[1])});a(m.pie.prototype,"pointAttribs",function(a,f,g){a=a.call(this,f,g);g=this.options;this.chart.is3d()&&(a.stroke=g.edgeColor||f.color||this.color,a["stroke-width"]=
n(g.edgeWidth,1));return a});a(m.pie.prototype,"drawPoints",function(a){a.apply(this,[].slice.call(arguments,1));this.chart.is3d()&&k(this.points,function(a){var f=a.graphic;if(f)f[a.y&&a.visible?"show":"hide"]()})});a(m.pie.prototype,"drawDataLabels",function(a){if(this.chart.is3d()){var f=this.chart.options.chart.options3d;k(this.data,function(a){var g=a.shapeArgs,d=g.r,e=(g.start+g.end)/2,c=a.labelPos,b=-d*(1-Math.cos((g.alpha||f.alpha)*r))*Math.sin(e),h=d*(Math.cos((g.beta||f.beta)*r)-1)*Math.cos(e);
k([0,2,4],function(a){c[a]+=h;c[a+1]+=b})})}a.apply(this,[].slice.call(arguments,1))});a(m.pie.prototype,"addPoint",function(a){a.apply(this,[].slice.call(arguments,1));this.chart.is3d()&&this.update(this.userOptions,!0)});a(m.pie.prototype,"animate",function(a){if(this.chart.is3d()){var f=arguments[1],g=this.options.animation,k=this.center,d=this.group,e=this.markerGroup;u&&(!0===g&&(g={}),f?(d.oldtranslateX=d.translateX,d.oldtranslateY=d.translateY,f={translateX:k[0],translateY:k[1],scaleX:.001,
scaleY:.001},d.attr(f),e&&(e.attrSetters=d.attrSetters,e.attr(f))):(f={translateX:d.oldtranslateX,translateY:d.oldtranslateY,scaleX:1,scaleY:1},d.animate(f,g),e&&e.animate(f,g),this.animate=null))}else a.apply(this,[].slice.call(arguments,1))})})(F);(function(a){var r=a.perspective,k=a.pick,n=a.Point,m=a.seriesTypes,u=a.wrap;u(m.scatter.prototype,"translate",function(a){a.apply(this,[].slice.call(arguments,1));if(this.chart.is3d()){var f=this.chart,g=k(this.zAxis,f.options.zAxis[0]),m=[],d,e,c;for(c=
0;c<this.data.length;c++)d=this.data[c],e=g.isLog&&g.val2lin?g.val2lin(d.z):d.z,d.plotZ=g.translate(e),d.isInside=d.isInside?e>=g.min&&e<=g.max:!1,m.push({x:d.plotX,y:d.plotY,z:d.plotZ});f=r(m,f,!0);for(c=0;c<this.data.length;c++)d=this.data[c],g=f[c],d.plotXold=d.plotX,d.plotYold=d.plotY,d.plotZold=d.plotZ,d.plotX=g.x,d.plotY=g.y,d.plotZ=g.z}});u(m.scatter.prototype,"init",function(a,f,g){f.is3d()&&(this.axisTypes=["xAxis","yAxis","zAxis"],this.pointArrayMap=["x","y","z"],this.parallelArrays=["x",
"y","z"],this.directTouch=!0);a=a.apply(this,[f,g]);this.chart.is3d()&&(this.tooltipOptions.pointFormat=this.userOptions.tooltip?this.userOptions.tooltip.pointFormat||"x: \x3cb\x3e{point.x}\x3c/b\x3e\x3cbr/\x3ey: \x3cb\x3e{point.y}\x3c/b\x3e\x3cbr/\x3ez: \x3cb\x3e{point.z}\x3c/b\x3e\x3cbr/\x3e":"x: \x3cb\x3e{point.x}\x3c/b\x3e\x3cbr/\x3ey: \x3cb\x3e{point.y}\x3c/b\x3e\x3cbr/\x3ez: \x3cb\x3e{point.z}\x3c/b\x3e\x3cbr/\x3e");return a});u(m.scatter.prototype,"pointAttribs",function(k,f){var g=k.apply(this,
[].slice.call(arguments,1));this.chart.is3d()&&f&&(g.zIndex=a.pointCameraDistance(f,this.chart));return g});u(n.prototype,"applyOptions",function(a){var f=a.apply(this,[].slice.call(arguments,1));this.series.chart.is3d()&&void 0===f.z&&(f.z=0);return f})})(F);(function(a){var r=a.Axis,k=a.SVGRenderer,n=a.VMLRenderer;n&&(a.setOptions({animate:!1}),n.prototype.cuboid=k.prototype.cuboid,n.prototype.cuboidPath=k.prototype.cuboidPath,n.prototype.toLinePath=k.prototype.toLinePath,n.prototype.createElement3D=
k.prototype.createElement3D,n.prototype.arc3d=function(a){a=k.prototype.arc3d.call(this,a);a.css({zIndex:a.zIndex});return a},a.VMLRenderer.prototype.arc3dPath=a.SVGRenderer.prototype.arc3dPath,a.wrap(r.prototype,"render",function(a){a.apply(this,[].slice.call(arguments,1));this.sideFrame&&(this.sideFrame.css({zIndex:0}),this.sideFrame.front.attr({fill:this.sideFrame.color}));this.bottomFrame&&(this.bottomFrame.css({zIndex:1}),this.bottomFrame.front.attr({fill:this.bottomFrame.color}));this.backFrame&&
(this.backFrame.css({zIndex:0}),this.backFrame.front.attr({fill:this.backFrame.color}))}))})(F)});


/*
 Highcharts JS v5.0.7 (2017-01-17)
 Exporting module

 (c) 2010-2016 Torstein Honsi

 License: www.highcharts.com/license
*/
(function(k){"object"===typeof module&&module.exports?module.exports=k:k(Highcharts)})(function(k){(function(f){var k=f.defaultOptions,u=f.doc,A=f.Chart,x=f.addEvent,G=f.removeEvent,E=f.fireEvent,w=f.createElement,B=f.discardElement,F=f.css,v=f.merge,C=f.pick,t=f.each,y=f.extend,z=f.win,D=f.SVGRenderer,H=f.Renderer.prototype.symbols;y(k.lang,{printChart:"Print chart",downloadPNG:"Download PNG image",downloadJPEG:"Download JPEG image",downloadPDF:"Download PDF document",downloadSVG:"Download SVG vector image",
contextButtonTitle:"Chart context menu"});k.navigation={buttonOptions:{theme:{},symbolSize:14,symbolX:12.5,symbolY:10.5,align:"right",buttonSpacing:3,height:22,verticalAlign:"top",width:24}};k.exporting={type:"image/png",url:"https://export.highcharts.com/",printMaxWidth:780,scale:2,buttons:{contextButton:{className:"highcharts-contextbutton",menuClassName:"highcharts-contextmenu",symbol:"menu",_titleKey:"contextButtonTitle",menuItems:[{textKey:"printChart",onclick:function(){this.print()}},{separator:!0},
{textKey:"downloadPNG",onclick:function(){this.exportChart()}},{textKey:"downloadJPEG",onclick:function(){this.exportChart({type:"image/jpeg"})}},{textKey:"downloadPDF",onclick:function(){this.exportChart({type:"application/pdf"})}},{textKey:"downloadSVG",onclick:function(){this.exportChart({type:"image/svg+xml"})}}]}}};f.post=function(a,b,c){var d;a=w("form",v({method:"post",action:a,enctype:"multipart/form-data"},c),{display:"none"},u.body);for(d in b)w("input",{type:"hidden",name:d,value:b[d]},
null,a);a.submit();B(a)};y(A.prototype,{sanitizeSVG:function(a,b){if(b&&b.exporting&&b.exporting.allowHTML){var c=a.match(/<\/svg>(.*?$)/);c&&(c='\x3cforeignObject x\x3d"0" y\x3d"0" width\x3d"'+b.chart.width+'" height\x3d"'+b.chart.height+'"\x3e\x3cbody xmlns\x3d"http://www.w3.org/1999/xhtml"\x3e'+c[1]+"\x3c/body\x3e\x3c/foreignObject\x3e",a=a.replace("\x3c/svg\x3e",c+"\x3c/svg\x3e"))}return a=a.replace(/zIndex="[^"]+"/g,"").replace(/isShadow="[^"]+"/g,"").replace(/symbolName="[^"]+"/g,"").replace(/jQuery[0-9]+="[^"]+"/g,
"").replace(/url\(("|&quot;)(\S+)("|&quot;)\)/g,"url($2)").replace(/url\([^#]+#/g,"url(#").replace(/<svg /,'\x3csvg xmlns:xlink\x3d"http://www.w3.org/1999/xlink" ').replace(/ (NS[0-9]+\:)?href=/g," xlink:href\x3d").replace(/\n/," ").replace(/<\/svg>.*?$/,"\x3c/svg\x3e").replace(/(fill|stroke)="rgba\(([ 0-9]+,[ 0-9]+,[ 0-9]+),([ 0-9\.]+)\)"/g,'$1\x3d"rgb($2)" $1-opacity\x3d"$3"').replace(/&nbsp;/g,"\u00a0").replace(/&shy;/g,"\u00ad")},getChartHTML:function(){this.inlineStyles();return this.container.innerHTML},
getSVG:function(a){var b,c,d,q,m,g=v(this.options,a);u.createElementNS||(u.createElementNS=function(a,b){return u.createElement(b)});c=w("div",null,{position:"absolute",top:"-9999em",width:this.chartWidth+"px",height:this.chartHeight+"px"},u.body);d=this.renderTo.style.width;m=this.renderTo.style.height;d=g.exporting.sourceWidth||g.chart.width||/px$/.test(d)&&parseInt(d,10)||600;m=g.exporting.sourceHeight||g.chart.height||/px$/.test(m)&&parseInt(m,10)||400;y(g.chart,{animation:!1,renderTo:c,forExport:!0,
renderer:"SVGRenderer",width:d,height:m});g.exporting.enabled=!1;delete g.data;g.series=[];t(this.series,function(a){q=v(a.userOptions,{animation:!1,enableMouseTracking:!1,showCheckbox:!1,visible:a.visible});q.isInternal||g.series.push(q)});t(this.axes,function(a){a.userOptions.internalKey=f.uniqueKey()});b=new f.Chart(g,this.callback);a&&t(["xAxis","yAxis","series"],function(d){var e={};a[d]&&(e[d]=a[d],b.update(e))});t(this.axes,function(a){var d=f.find(b.axes,function(b){return b.options.internalKey===
a.userOptions.internalKey}),e=a.getExtremes(),c=e.userMin,e=e.userMax;!d||void 0===c&&void 0===e||d.setExtremes(c,e,!0,!1)});d=b.getChartHTML();d=this.sanitizeSVG(d,g);g=null;b.destroy();B(c);return d},getSVGForExport:function(a,b){var c=this.options.exporting;return this.getSVG(v({chart:{borderRadius:0}},c.chartOptions,b,{exporting:{sourceWidth:a&&a.sourceWidth||c.sourceWidth,sourceHeight:a&&a.sourceHeight||c.sourceHeight}}))},exportChart:function(a,b){b=this.getSVGForExport(a,b);a=v(this.options.exporting,
a);f.post(a.url,{filename:a.filename||"chart",type:a.type,width:a.width||0,scale:a.scale,svg:b},a.formAttributes)},print:function(){var a=this,b=a.container,c=[],d=b.parentNode,f=u.body,m=f.childNodes,g=a.options.exporting.printMaxWidth,e,p;if(!a.isPrinting){a.isPrinting=!0;a.pointer.reset(null,0);E(a,"beforePrint");if(p=g&&a.chartWidth>g)e=[a.options.chart.width,void 0,!1],a.setSize(g,void 0,!1);t(m,function(a,b){1===a.nodeType&&(c[b]=a.style.display,a.style.display="none")});f.appendChild(b);z.focus();
z.print();setTimeout(function(){d.appendChild(b);t(m,function(a,b){1===a.nodeType&&(a.style.display=c[b])});a.isPrinting=!1;p&&a.setSize.apply(a,e);E(a,"afterPrint")},1E3)}},contextMenu:function(a,b,c,d,f,m,g){var e=this,p=e.chartWidth,h=e.chartHeight,l="cache-"+a,n=e[l],q=Math.max(f,m),r,k;n||(e[l]=n=w("div",{className:a},{position:"absolute",zIndex:1E3,padding:q+"px"},e.container),r=w("div",{className:"highcharts-menu"},null,n),k=function(){F(n,{display:"none"});g&&g.setState(0);e.openMenu=!1},
x(n,"mouseleave",function(){n.hideTimer=setTimeout(k,500)}),x(n,"mouseenter",function(){clearTimeout(n.hideTimer)}),l=x(u,"mouseup",function(b){e.pointer.inClass(b.target,a)||k()}),x(e,"destroy",l),t(b,function(a){if(a){var b;b=a.separator?w("hr",null,null,r):w("div",{className:"highcharts-menu-item",onclick:function(b){b&&b.stopPropagation();k();a.onclick&&a.onclick.apply(e,arguments)},innerHTML:a.text||e.options.lang[a.textKey]},null,r);e.exportDivElements.push(b)}}),e.exportDivElements.push(r,
n),e.exportMenuWidth=n.offsetWidth,e.exportMenuHeight=n.offsetHeight);b={display:"block"};c+e.exportMenuWidth>p?b.right=p-c-f-q+"px":b.left=c-q+"px";d+m+e.exportMenuHeight>h&&"top"!==g.alignOptions.verticalAlign?b.bottom=h-d-q+"px":b.top=d+m-q+"px";F(n,b);e.openMenu=!0},addButton:function(a){var b=this,c=b.renderer,d=v(b.options.navigation.buttonOptions,a),f=d.onclick,m=d.menuItems,g,e,p=d.symbolSize||12;b.btnCount||(b.btnCount=0);b.exportDivElements||(b.exportDivElements=[],b.exportSVGElements=[]);
if(!1!==d.enabled){var h=d.theme,l=h.states,n=l&&l.hover,l=l&&l.select,k;delete h.states;f?k=function(a){a.stopPropagation();f.call(b,a)}:m&&(k=function(){b.contextMenu(e.menuClassName,m,e.translateX,e.translateY,e.width,e.height,e);e.setState(2)});d.text&&d.symbol?h.paddingLeft=C(h.paddingLeft,25):d.text||y(h,{width:d.width,height:d.height,padding:0});e=c.button(d.text,0,0,k,h,n,l).addClass(a.className).attr({title:b.options.lang[d._titleKey],zIndex:3});e.menuClassName=a.menuClassName||"highcharts-menu-"+
b.btnCount++;d.symbol&&(g=c.symbol(d.symbol,d.symbolX-p/2,d.symbolY-p/2,p,p).addClass("highcharts-button-symbol").attr({zIndex:1}).add(e));e.add().align(y(d,{width:e.width,x:C(d.x,b.buttonOffset)}),!0,"spacingBox");b.buttonOffset+=(e.width+d.buttonSpacing)*("right"===d.align?-1:1);b.exportSVGElements.push(e,g)}},destroyExport:function(a){var b=a?a.target:this;a=b.exportSVGElements;var c=b.exportDivElements;a&&(t(a,function(a,c){a&&(a.onclick=a.ontouchstart=null,b.exportSVGElements[c]=a.destroy())}),
a.length=0);c&&(t(c,function(a,c){clearTimeout(a.hideTimer);G(a,"mouseleave");b.exportDivElements[c]=a.onmouseout=a.onmouseover=a.ontouchstart=a.onclick=null;B(a)}),c.length=0)}});D.prototype.inlineToAttributes="fill stroke strokeLinecap strokeLinejoin strokeWidth textAnchor x y".split(" ");D.prototype.inlineBlacklist=[/-/,/^(clipPath|cssText|d|height|width)$/,/^font$/,/[lL]ogical(Width|Height)$/,/perspective/,/TapHighlightColor/,/^transition/];D.prototype.unstyledElements=["clipPath","defs","desc"];
A.prototype.inlineStyles=function(){function a(a){return a.replace(/([A-Z])/g,function(a,b){return"-"+b.toLowerCase()})}function b(c){var h,l,n,p="",r,q;if(1===c.nodeType&&-1===m.indexOf(c.nodeName)){l=z.getComputedStyle(c,null);n="svg"===c.nodeName?{}:z.getComputedStyle(c.parentNode,null);g[c.nodeName]||(e||(e=u.createElementNS(f.SVG_NS,"svg"),e.setAttribute("version","1.1"),u.body.appendChild(e)),r=u.createElementNS(c.namespaceURI,c.nodeName),e.appendChild(r),g[c.nodeName]=v(z.getComputedStyle(r,
null)),e.removeChild(r));for(h in l){r=!1;for(q=k.length;q--&&!r;)r=k[q].test(h)||"function"===typeof l[h];r||n[h]!==l[h]&&g[c.nodeName][h]!==l[h]&&(-1!==d.indexOf(h)?c.setAttribute(a(h),l[h]):p+=a(h)+":"+l[h]+";")}p&&(h=c.getAttribute("style"),c.setAttribute("style",(h?h+";":"")+p));"text"!==c.nodeName&&t(c.children||c.childNodes,b)}}var c=this.renderer,d=c.inlineToAttributes,k=c.inlineBlacklist,m=c.unstyledElements,g={},e;b(this.container.querySelector("svg"));e.parentNode.removeChild(e)};H.menu=
function(a,b,c,d){return["M",a,b+2.5,"L",a+c,b+2.5,"M",a,b+d/2+.5,"L",a+c,b+d/2+.5,"M",a,b+d-1.5,"L",a+c,b+d-1.5]};A.prototype.renderExporting=function(){var a,b=this.options.exporting,c=b.buttons,d=this.isDirtyExporting||!this.exportSVGElements;this.buttonOffset=0;this.isDirtyExporting&&this.destroyExport();if(d&&!1!==b.enabled){for(a in c)this.addButton(c[a]);this.isDirtyExporting=!1}x(this,"destroy",this.destroyExport)};A.prototype.callbacks.push(function(a){a.renderExporting();x(a,"redraw",a.renderExporting);
t(["exporting","navigation"],function(b){a[b]={update:function(c,d){a.isDirtyExporting=!0;v(!0,a.options[b],c);C(d,!0)&&a.redraw()}}})})})(k)});


/*
  Highcharts JS v5.0.7 (2017-01-17)
 Solid angular gauge module

 (c) 2010-2016 Torstein Honsi

 License: www.highcharts.com/license
*/
(function(l){"object"===typeof module&&module.exports?module.exports=l:l(Highcharts)})(function(l){(function(e){var l=e.pInt,t=e.pick,m=e.each,v=e.isNumber,n;n={initDataClasses:function(a){var c=this,d=this.chart,f,u=0,h=this.options;this.dataClasses=f=[];m(a.dataClasses,function(g,b){g=e.merge(g);f.push(g);g.color||("category"===h.dataClassColor?(b=d.options.colors,g.color=b[u++],u===b.length&&(u=0)):g.color=c.tweenColors(e.color(h.minColor),e.color(h.maxColor),b/(a.dataClasses.length-1)))})},initStops:function(a){this.stops=
a.stops||[[0,this.options.minColor],[1,this.options.maxColor]];m(this.stops,function(a){a.color=e.color(a[1])})},toColor:function(a,c){var d=this.stops,f,e,h=this.dataClasses,g,b;if(h)for(b=h.length;b--;){if(g=h[b],f=g.from,d=g.to,(void 0===f||a>=f)&&(void 0===d||a<=d)){e=g.color;c&&(c.dataClass=b);break}}else{this.isLog&&(a=this.val2lin(a));a=1-(this.max-a)/(this.max-this.min);for(b=d.length;b--&&!(a>d[b][0]););f=d[b]||d[b+1];d=d[b+1]||f;a=1-(d[0]-a)/(d[0]-f[0]||1);e=this.tweenColors(f.color,d.color,
a)}return e},tweenColors:function(a,c,d){var f;c.rgba.length&&a.rgba.length?(a=a.rgba,c=c.rgba,f=1!==c[3]||1!==a[3],a=(f?"rgba(":"rgb(")+Math.round(c[0]+(a[0]-c[0])*(1-d))+","+Math.round(c[1]+(a[1]-c[1])*(1-d))+","+Math.round(c[2]+(a[2]-c[2])*(1-d))+(f?","+(c[3]+(a[3]-c[3])*(1-d)):"")+")"):a=c.input||"none";return a}};m(["fill","stroke"],function(a){e.Fx.prototype[a+"Setter"]=function(){this.elem.attr(a,n.tweenColors(e.color(this.start),e.color(this.end),this.pos),null,!0)}});e.seriesType("solidgauge",
"gauge",{colorByPoint:!0},{translate:function(){var a=this.yAxis;e.extend(a,n);!a.dataClasses&&a.options.dataClasses&&a.initDataClasses(a.options);a.initStops(a.options);e.seriesTypes.gauge.prototype.translate.call(this)},drawPoints:function(){var a=this,c=a.yAxis,d=c.center,f=a.options,e=a.chart.renderer,h=f.overshoot,g=v(h)?h/180*Math.PI:0,b;v(f.threshold)&&(b=c.startAngleRad+c.translate(f.threshold,null,null,null,!0));this.thresholdAngleRad=t(b,c.startAngleRad);m(a.points,function(b){var h=b.graphic,
k=c.startAngleRad+c.translate(b.y,null,null,null,!0),m=l(t(b.options.radius,f.radius,100))*d[2]/200,p=l(t(b.options.innerRadius,f.innerRadius,60))*d[2]/200,q=c.toColor(b.y,b),r=Math.min(c.startAngleRad,c.endAngleRad),n=Math.max(c.startAngleRad,c.endAngleRad);"none"===q&&(q=b.color||a.color||"none");"none"!==q&&(b.color=q);k=Math.max(r-g,Math.min(n+g,k));!1===f.wrap&&(k=Math.max(r,Math.min(n,k)));r=Math.min(k,a.thresholdAngleRad);k=Math.max(k,a.thresholdAngleRad);k-r>2*Math.PI&&(k=r+2*Math.PI);b.shapeArgs=
p={x:d[0],y:d[1],r:m,innerR:p,start:r,end:k,fill:q};b.startR=m;h?(b=p.d,h.animate(p),b&&(p.d=b)):b.graphic=e.arc(p).addClass("highcharts-point").attr({fill:q,"sweep-flag":0}).add(a.group)})},animate:function(a){a||(this.startAngleRad=this.thresholdAngleRad,e.seriesTypes.pie.prototype.animate.call(this,a))}})})(l)});


/*
 Highmaps JS v5.0.7 (2017-01-17)
 Highmaps as a plugin for Highcharts 4.1.x or Highstock 2.1.x (x being the patch version of this file)

 (c) 2011-2016 Torstein Honsi

 License: www.highcharts.com/license
*/
(function(w){"object"===typeof module&&module.exports?module.exports=w:w(Highcharts)})(function(w){(function(a){var k=a.Axis,n=a.each,g=a.pick;a=a.wrap;a(k.prototype,"getSeriesExtremes",function(a){var e=this.isXAxis,p,u,r=[],l;e&&n(this.series,function(b,a){b.useMapGeometry&&(r[a]=b.xData,b.xData=[])});a.call(this);e&&(p=g(this.dataMin,Number.MAX_VALUE),u=g(this.dataMax,-Number.MAX_VALUE),n(this.series,function(a,f){a.useMapGeometry&&(p=Math.min(p,g(a.minX,p)),u=Math.max(u,g(a.maxX,p)),a.xData=r[f],
l=!0)}),l&&(this.dataMin=p,this.dataMax=u))});a(k.prototype,"setAxisTranslation",function(a){var e=this.chart,p=e.plotWidth/e.plotHeight,e=e.xAxis[0],g;a.call(this);"yAxis"===this.coll&&void 0!==e.transA&&n(this.series,function(a){a.preserveAspectRatio&&(g=!0)});if(g&&(this.transA=e.transA=Math.min(this.transA,e.transA),a=p/((e.max-e.min)/(this.max-this.min)),a=1>a?this:e,p=(a.max-a.min)*a.transA,a.pixelPadding=a.len-p,a.minPixelPadding=a.pixelPadding/2,p=a.fixTo)){p=p[1]-a.toValue(p[0],!0);p*=a.transA;
if(Math.abs(p)>a.minPixelPadding||a.min===a.dataMin&&a.max===a.dataMax)p=0;a.minPixelPadding-=p}});a(k.prototype,"render",function(a){a.call(this);this.fixTo=null})})(w);(function(a){var k=a.Axis,n=a.Chart,g=a.color,e,t=a.each,p=a.extend,u=a.isNumber,r=a.Legend,l=a.LegendSymbolMixin,b=a.noop,f=a.merge,h=a.pick,q=a.wrap;e=a.ColorAxis=function(){this.init.apply(this,arguments)};p(e.prototype,k.prototype);p(e.prototype,{defaultColorAxisOptions:{lineWidth:0,minPadding:0,maxPadding:0,gridLineWidth:1,tickPixelInterval:72,
startOnTick:!0,endOnTick:!0,offset:0,marker:{animation:{duration:50},width:.01},labels:{overflow:"justify",rotation:0},minColor:"#e6ebf5",maxColor:"#003399",tickLength:5,showInLegend:!0},keepProps:["legendGroup","legendItem","legendSymbol"].concat(k.prototype.keepProps),init:function(a,c){var d="vertical"!==a.options.legend.layout,m;this.coll="colorAxis";m=f(this.defaultColorAxisOptions,{side:d?2:1,reversed:!d},c,{opposite:!d,showEmpty:!1,title:null});k.prototype.init.call(this,a,m);c.dataClasses&&
this.initDataClasses(c);this.initStops(c);this.horiz=d;this.zoomEnabled=!1;this.defaultLegendLength=200},tweenColors:function(a,c,d){var m;c.rgba.length&&a.rgba.length?(a=a.rgba,c=c.rgba,m=1!==c[3]||1!==a[3],a=(m?"rgba(":"rgb(")+Math.round(c[0]+(a[0]-c[0])*(1-d))+","+Math.round(c[1]+(a[1]-c[1])*(1-d))+","+Math.round(c[2]+(a[2]-c[2])*(1-d))+(m?","+(c[3]+(a[3]-c[3])*(1-d)):"")+")"):a=c.input||"none";return a},initDataClasses:function(a){var c=this,d,m=0,b=this.chart.options.chart.colorCount,l=this.options,
h=a.dataClasses.length;this.dataClasses=d=[];this.legendItems=[];t(a.dataClasses,function(a,x){a=f(a);d.push(a);a.color||("category"===l.dataClassColor?(a.colorIndex=m,m++,m===b&&(m=0)):a.color=c.tweenColors(g(l.minColor),g(l.maxColor),2>h?.5:x/(h-1)))})},initStops:function(a){this.stops=a.stops||[[0,this.options.minColor],[1,this.options.maxColor]];t(this.stops,function(a){a.color=g(a[1])})},setOptions:function(a){k.prototype.setOptions.call(this,a);this.options.crosshair=this.options.marker},setAxisSize:function(){var a=
this.legendSymbol,c=this.chart,d=c.options.legend||{},b,f;a?(this.left=d=a.attr("x"),this.top=b=a.attr("y"),this.width=f=a.attr("width"),this.height=a=a.attr("height"),this.right=c.chartWidth-d-f,this.bottom=c.chartHeight-b-a,this.len=this.horiz?f:a,this.pos=this.horiz?d:b):this.len=(this.horiz?d.symbolWidth:d.symbolHeight)||this.defaultLegendLength},toColor:function(a,c){var d=this.stops,b,m,f=this.dataClasses,l,h;if(f)for(h=f.length;h--;){if(l=f[h],b=l.from,d=l.to,(void 0===b||a>=b)&&(void 0===
d||a<=d)){m=l.color;c&&(c.dataClass=h,c.colorIndex=l.colorIndex);break}}else{this.isLog&&(a=this.val2lin(a));a=1-(this.max-a)/(this.max-this.min||1);for(h=d.length;h--&&!(a>d[h][0]););b=d[h]||d[h+1];d=d[h+1]||b;a=1-(d[0]-a)/(d[0]-b[0]||1);m=this.tweenColors(b.color,d.color,a)}return m},getOffset:function(){var a=this.legendGroup,c=this.chart.axisOffset[this.side];a&&(this.axisParent=a,k.prototype.getOffset.call(this),this.added||(this.added=!0,this.labelLeft=0,this.labelRight=this.width),this.chart.axisOffset[this.side]=
c)},setLegendColor:function(){var a,c=this.options,d=this.reversed;a=d?1:0;d=d?0:1;a=this.horiz?[a,0,d,0]:[0,d,0,a];this.legendColor={linearGradient:{x1:a[0],y1:a[1],x2:a[2],y2:a[3]},stops:c.stops||[[0,c.minColor],[1,c.maxColor]]}},drawLegendSymbol:function(a,c){var d=a.padding,b=a.options,f=this.horiz,l=h(b.symbolWidth,f?this.defaultLegendLength:12),m=h(b.symbolHeight,f?12:this.defaultLegendLength),e=h(b.labelPadding,f?16:30),b=h(b.itemDistance,10);this.setLegendColor();c.legendSymbol=this.chart.renderer.rect(0,
a.baseline-11,l,m).attr({zIndex:1}).add(c.legendGroup);this.legendItemWidth=l+d+(f?b:e);this.legendItemHeight=m+d+(f?e:0)},setState:b,visible:!0,setVisible:b,getSeriesExtremes:function(){var a=this.series,c=a.length;this.dataMin=Infinity;for(this.dataMax=-Infinity;c--;)void 0!==a[c].valueMin&&(this.dataMin=Math.min(this.dataMin,a[c].valueMin),this.dataMax=Math.max(this.dataMax,a[c].valueMax))},drawCrosshair:function(a,c){var d=c&&c.plotX,b=c&&c.plotY,f,l=this.pos,h=this.len;c&&(f=this.toPixels(c[c.series.colorKey]),
f<l?f=l-2:f>l+h&&(f=l+h+2),c.plotX=f,c.plotY=this.len-f,k.prototype.drawCrosshair.call(this,a,c),c.plotX=d,c.plotY=b,this.cross&&this.cross.addClass("highcharts-coloraxis-marker").add(this.legendGroup))},getPlotLinePath:function(a,c,d,b,f){return u(f)?this.horiz?["M",f-4,this.top-6,"L",f+4,this.top-6,f,this.top,"Z"]:["M",this.left,f,"L",this.left-6,f+6,this.left-6,f-6,"Z"]:k.prototype.getPlotLinePath.call(this,a,c,d,b)},update:function(a,c){var d=this.chart,b=d.legend;t(this.series,function(a){a.isDirtyData=
!0});a.dataClasses&&b.allItems&&(t(b.allItems,function(a){a.isDataClass&&a.legendGroup.destroy()}),d.isDirtyLegend=!0);d.options[this.coll]=f(this.userOptions,a);k.prototype.update.call(this,a,c);this.legendItem&&(this.setLegendColor(),b.colorizeItem(this,!0))},getDataClassLegendSymbols:function(){var f=this,c=this.chart,d=this.legendItems,h=c.options.legend,e=h.valueDecimals,q=h.valueSuffix||"",g;d.length||t(this.dataClasses,function(h,m){var x=!0,v=h.from,n=h.to;g="";void 0===v?g="\x3c ":void 0===
n&&(g="\x3e ");void 0!==v&&(g+=a.numberFormat(v,e)+q);void 0!==v&&void 0!==n&&(g+=" - ");void 0!==n&&(g+=a.numberFormat(n,e)+q);d.push(p({chart:c,name:g,options:{},drawLegendSymbol:l.drawRectangle,visible:!0,setState:b,isDataClass:!0,setVisible:function(){x=this.visible=!x;t(f.series,function(a){t(a.points,function(a){a.dataClass===m&&a.setVisible(x)})});c.legend.colorizeItem(this,x)}},h))});return d},name:""});t(["fill","stroke"],function(b){a.Fx.prototype[b+"Setter"]=function(){this.elem.attr(b,
e.prototype.tweenColors(g(this.start),g(this.end),this.pos),null,!0)}});q(n.prototype,"getAxes",function(a){var c=this.options.colorAxis;a.call(this);this.colorAxis=[];c&&new e(this,c)});q(r.prototype,"getAllItems",function(a){var c=[],d=this.chart.colorAxis[0];d&&d.options&&(d.options.showInLegend&&(d.options.dataClasses?c=c.concat(d.getDataClassLegendSymbols()):c.push(d)),t(d.series,function(a){a.options.showInLegend=!1}));return c.concat(a.call(this))});q(r.prototype,"colorizeItem",function(a,
c,d){a.call(this,c,d);d&&c.legendColor&&c.legendSymbol.attr({fill:c.legendColor})})})(w);(function(a){var k=a.defined,n=a.each,g=a.noop;a.colorPointMixin={isValid:function(){return null!==this.value},setVisible:function(a){var e=this,g=a?"show":"hide";n(["graphic","dataLabel"],function(a){if(e[a])e[a][g]()})},setState:function(e){a.Point.prototype.setState.call(this,e);this.graphic&&this.graphic.attr({zIndex:"hover"===e?1:0})}};a.colorSeriesMixin={pointArrayMap:["value"],axisTypes:["xAxis","yAxis",
"colorAxis"],optionalAxis:"colorAxis",trackerGroups:["group","markerGroup","dataLabelsGroup"],getSymbol:g,parallelArrays:["x","y","value"],colorKey:"value",translateColors:function(){var a=this,t=this.options.nullColor,g=this.colorAxis,k=this.colorKey;n(this.data,function(e){var l=e[k];if(l=e.options.color||(e.isNull?t:g&&void 0!==l?g.toColor(l,e):e.color||a.color))e.color=l})},colorAttribs:function(a){var e={};k(a.color)&&(e[this.colorProp||"fill"]=a.color);return e}}})(w);(function(a){function k(a){a&&
(a.preventDefault&&a.preventDefault(),a.stopPropagation&&a.stopPropagation(),a.cancelBubble=!0)}var n=a.addEvent,g=a.Chart,e=a.doc,t=a.each,p=a.extend,u=a.merge,r=a.pick;a=a.wrap;p(g.prototype,{renderMapNavigation:function(){var a=this,b=this.options.mapNavigation,f=b.buttons,h,e,m,c=function(d){this.handler.call(a,d);k(d)};if(r(b.enableButtons,b.enabled)&&!a.renderer.forExport)for(h in a.mapNavButtons=[],f)f.hasOwnProperty(h)&&(m=u(b.buttonOptions,f[h]),e=a.renderer.button(m.text,0,0,c,void 0,void 0,
void 0,0,"zoomIn"===h?"topbutton":"bottombutton").addClass("highcharts-map-navigation").attr({width:m.width,height:m.height,title:a.options.lang[h],padding:m.padding,zIndex:5}).add(),e.handler=m.onclick,e.align(p(m,{width:e.width,height:2*e.height}),null,m.alignTo),n(e.element,"dblclick",k),a.mapNavButtons.push(e))},fitToBox:function(a,b){t([["x","width"],["y","height"]],function(f){var h=f[0];f=f[1];a[h]+a[f]>b[h]+b[f]&&(a[f]>b[f]?(a[f]=b[f],a[h]=b[h]):a[h]=b[h]+b[f]-a[f]);a[f]>b[f]&&(a[f]=b[f]);
a[h]<b[h]&&(a[h]=b[h])});return a},mapZoom:function(a,b,f,h,e){var m=this.xAxis[0],c=m.max-m.min,d=r(b,m.min+c/2),l=c*a,c=this.yAxis[0],v=c.max-c.min,q=r(f,c.min+v/2),v=v*a,d=this.fitToBox({x:d-l*(h?(h-m.pos)/m.len:.5),y:q-v*(e?(e-c.pos)/c.len:.5),width:l,height:v},{x:m.dataMin,y:c.dataMin,width:m.dataMax-m.dataMin,height:c.dataMax-c.dataMin}),l=d.x<=m.dataMin&&d.width>=m.dataMax-m.dataMin&&d.y<=c.dataMin&&d.height>=c.dataMax-c.dataMin;h&&(m.fixTo=[h-m.pos,b]);e&&(c.fixTo=[e-c.pos,f]);void 0===a||
l?(m.setExtremes(void 0,void 0,!1),c.setExtremes(void 0,void 0,!1)):(m.setExtremes(d.x,d.x+d.width,!1),c.setExtremes(d.y,d.y+d.height,!1));this.redraw()}});a(g.prototype,"render",function(a){var b=this,f=b.options.mapNavigation;b.renderMapNavigation();a.call(b);(r(f.enableDoubleClickZoom,f.enabled)||f.enableDoubleClickZoomTo)&&n(b.container,"dblclick",function(a){b.pointer.onContainerDblClick(a)});r(f.enableMouseWheelZoom,f.enabled)&&n(b.container,void 0===e.onmousewheel?"DOMMouseScroll":"mousewheel",
function(a){b.pointer.onContainerMouseWheel(a);k(a);return!1})})})(w);(function(a){var k=a.extend,n=a.pick,g=a.Pointer;a=a.wrap;k(g.prototype,{onContainerDblClick:function(a){var e=this.chart;a=this.normalize(a);e.options.mapNavigation.enableDoubleClickZoomTo?e.pointer.inClass(a.target,"highcharts-tracker")&&e.hoverPoint&&e.hoverPoint.zoomTo():e.isInsidePlot(a.chartX-e.plotLeft,a.chartY-e.plotTop)&&e.mapZoom(.5,e.xAxis[0].toValue(a.chartX),e.yAxis[0].toValue(a.chartY),a.chartX,a.chartY)},onContainerMouseWheel:function(a){var e=
this.chart,g;a=this.normalize(a);g=a.detail||-(a.wheelDelta/120);e.isInsidePlot(a.chartX-e.plotLeft,a.chartY-e.plotTop)&&e.mapZoom(Math.pow(e.options.mapNavigation.mouseWheelSensitivity,g),e.xAxis[0].toValue(a.chartX),e.yAxis[0].toValue(a.chartY),a.chartX,a.chartY)}});a(g.prototype,"zoomOption",function(a){var e=this.chart.options.mapNavigation;n(e.enableTouchZoom,e.enabled)&&(this.chart.options.chart.pinchType="xy");a.apply(this,[].slice.call(arguments,1))});a(g.prototype,"pinchTranslate",function(a,
g,n,k,r,l,b){a.call(this,g,n,k,r,l,b);"map"===this.chart.options.chart.type&&this.hasZoom&&(a=k.scaleX>k.scaleY,this.pinchTranslateDirection(!a,g,n,k,r,l,b,a?k.scaleX:k.scaleY))})})(w);(function(a){var k=a.colorPointMixin,n=a.each,g=a.extend,e=a.isNumber,t=a.map,p=a.merge,u=a.noop,r=a.pick,l=a.isArray,b=a.Point,f=a.Series,h=a.seriesType,q=a.seriesTypes,m=a.splat,c=void 0!==a.doc.documentElement.style.vectorEffect;h("map","scatter",{allAreas:!0,animation:!1,nullColor:"#f7f7f7",borderColor:"#cccccc",
borderWidth:1,marker:null,stickyTracking:!1,joinBy:"hc-key",dataLabels:{formatter:function(){return this.point.value},inside:!0,verticalAlign:"middle",crop:!1,overflow:!1,padding:0},turboThreshold:0,tooltip:{followPointer:!0,pointFormat:"{point.name}: {point.value}\x3cbr/\x3e"},states:{normal:{animation:!0},hover:{brightness:.2,halo:null},select:{color:"#cccccc"}}},p(a.colorSeriesMixin,{type:"map",supportsDrilldown:!0,getExtremesFromAll:!0,useMapGeometry:!0,forceDL:!0,searchPoint:u,directTouch:!0,
preserveAspectRatio:!0,pointArrayMap:["value"],getBox:function(d){var c=Number.MAX_VALUE,b=-c,f=c,h=-c,l=c,m=c,q=this.xAxis,g=this.yAxis,k;n(d||[],function(d){if(d.path){"string"===typeof d.path&&(d.path=a.splitPath(d.path));var v=d.path||[],q=v.length,x=!1,g=-c,n=c,p=-c,A=c,t=d.properties;if(!d._foundBox){for(;q--;)e(v[q])&&(x?(g=Math.max(g,v[q]),n=Math.min(n,v[q])):(p=Math.max(p,v[q]),A=Math.min(A,v[q])),x=!x);d._midX=n+(g-n)*(d.middleX||t&&t["hc-middle-x"]||.5);d._midY=A+(p-A)*(d.middleY||t&&t["hc-middle-y"]||
.5);d._maxX=g;d._minX=n;d._maxY=p;d._minY=A;d.labelrank=r(d.labelrank,(g-n)*(p-A));d._foundBox=!0}b=Math.max(b,d._maxX);f=Math.min(f,d._minX);h=Math.max(h,d._maxY);l=Math.min(l,d._minY);m=Math.min(d._maxX-d._minX,d._maxY-d._minY,m);k=!0}});k&&(this.minY=Math.min(l,r(this.minY,c)),this.maxY=Math.max(h,r(this.maxY,-c)),this.minX=Math.min(f,r(this.minX,c)),this.maxX=Math.max(b,r(this.maxX,-c)),q&&void 0===q.options.minRange&&(q.minRange=Math.min(5*m,(this.maxX-this.minX)/5,q.minRange||c)),g&&void 0===
g.options.minRange&&(g.minRange=Math.min(5*m,(this.maxY-this.minY)/5,g.minRange||c)))},getExtremes:function(){f.prototype.getExtremes.call(this,this.valueData);this.chart.hasRendered&&this.isDirtyData&&this.getBox(this.options.data);this.valueMin=this.dataMin;this.valueMax=this.dataMax;this.dataMin=this.minY;this.dataMax=this.maxY},translatePath:function(a){var d=!1,c=this.xAxis,b=this.yAxis,f=c.min,h=c.transA,c=c.minPixelPadding,m=b.min,l=b.transA,b=b.minPixelPadding,q,g=[];if(a)for(q=a.length;q--;)e(a[q])?
(g[q]=d?(a[q]-f)*h+c:(a[q]-m)*l+b,d=!d):g[q]=a[q];return g},setData:function(d,c,b,h){var q=this.options,g=this.chart.options.chart,v=g&&g.map,x=q.mapData,k=q.joinBy,r=null===k,u=q.keys||this.pointArrayMap,y=[],C={},z,B=this.chart.mapTransforms;!x&&v&&(x="string"===typeof v?a.maps[v]:v);r&&(k="_i");k=this.joinBy=m(k);k[1]||(k[1]=k[0]);d&&n(d,function(a,c){var b=0;if(e(a))d[c]={value:a};else if(l(a)){d[c]={};!q.keys&&a.length>u.length&&"string"===typeof a[0]&&(d[c]["hc-key"]=a[0],++b);for(var f=0;f<
u.length;++f,++b)u[f]&&(d[c][u[f]]=a[b])}r&&(d[c]._i=c)});this.getBox(d);if(this.chart.mapTransforms=B=g&&g.mapTransforms||x&&x["hc-transform"]||B)for(z in B)B.hasOwnProperty(z)&&z.rotation&&(z.cosAngle=Math.cos(z.rotation),z.sinAngle=Math.sin(z.rotation));if(x){"FeatureCollection"===x.type&&(this.mapTitle=x.title,x=a.geojson(x,this.type,this));this.mapData=x;this.mapMap={};for(z=0;z<x.length;z++)g=x[z],v=g.properties,g._i=z,k[0]&&v&&v[k[0]]&&(g[k[0]]=v[k[0]]),C[g[k[0]]]=g;this.mapMap=C;d&&k[1]&&
n(d,function(a){C[a[k[1]]]&&y.push(C[a[k[1]]])});q.allAreas?(this.getBox(x),d=d||[],k[1]&&n(d,function(a){y.push(a[k[1]])}),y="|"+t(y,function(a){return a&&a[k[0]]}).join("|")+"|",n(x,function(a){k[0]&&-1!==y.indexOf("|"+a[k[0]]+"|")||(d.push(p(a,{value:null})),h=!1)})):this.getBox(y)}f.prototype.setData.call(this,d,c,b,h)},drawGraph:u,drawDataLabels:u,doFullTranslate:function(){return this.isDirtyData||this.chart.isResizing||this.chart.renderer.isVML||!this.baseTrans},translate:function(){var a=
this,c=a.xAxis,b=a.yAxis,f=a.doFullTranslate();a.generatePoints();n(a.data,function(d){d.plotX=c.toPixels(d._midX,!0);d.plotY=b.toPixels(d._midY,!0);f&&(d.shapeType="path",d.shapeArgs={d:a.translatePath(d.path)})});a.translateColors()},pointAttribs:function(a,b){b=this.colorAttribs(a);a.isFading&&delete b.fill;c?b["vector-effect"]="non-scaling-stroke":b["stroke-width"]="inherit";return b},drawPoints:function(){var a=this,b=a.xAxis,f=a.yAxis,h=a.group,m=a.chart,l=m.renderer,e,g,k,p,t=this.baseTrans,
y,r,u,B,w;a.transformGroup||(a.transformGroup=l.g().attr({scaleX:1,scaleY:1}).add(h),a.transformGroup.survive=!0);a.doFullTranslate()?(a.group=a.transformGroup,q.column.prototype.drawPoints.apply(a),a.group=h,n(a.points,function(d){d.graphic&&(d.name&&d.graphic.addClass("highcharts-name-"+d.name.replace(/ /g,"-").toLowerCase()),d.properties&&d.properties["hc-key"]&&d.graphic.addClass("highcharts-key-"+d.properties["hc-key"].toLowerCase()),d.graphic.css(a.pointAttribs(d,d.selected&&"select")))}),this.baseTrans=
{originX:b.min-b.minPixelPadding/b.transA,originY:f.min-f.minPixelPadding/f.transA+(f.reversed?0:f.len/f.transA),transAX:b.transA,transAY:f.transA},this.transformGroup.animate({translateX:0,translateY:0,scaleX:1,scaleY:1})):(e=b.transA/t.transAX,g=f.transA/t.transAY,k=b.toPixels(t.originX,!0),p=f.toPixels(t.originY,!0),.99<e&&1.01>e&&.99<g&&1.01>g&&(g=e=1,k=Math.round(k),p=Math.round(p)),y=this.transformGroup,m.renderer.globalAnimation?(r=y.attr("translateX"),u=y.attr("translateY"),B=y.attr("scaleX"),
w=y.attr("scaleY"),y.attr({animator:0}).animate({animator:1},{step:function(a,d){y.attr({translateX:r+(k-r)*d.pos,translateY:u+(p-u)*d.pos,scaleX:B+(e-B)*d.pos,scaleY:w+(g-w)*d.pos})}})):y.attr({translateX:k,translateY:p,scaleX:e,scaleY:g}));c||a.group.element.setAttribute("stroke-width",a.options[a.pointAttrToOptions&&a.pointAttrToOptions["stroke-width"]||"borderWidth"]/(e||1));this.drawMapDataLabels()},drawMapDataLabels:function(){f.prototype.drawDataLabels.call(this);this.dataLabelsGroup&&this.dataLabelsGroup.clip(this.chart.clipRect)},
render:function(){var a=this,c=f.prototype.render;a.chart.renderer.isVML&&3E3<a.data.length?setTimeout(function(){c.call(a)}):c.call(a)},animate:function(a){var d=this.options.animation,c=this.group,b=this.xAxis,f=this.yAxis,h=b.pos,m=f.pos;this.chart.renderer.isSVG&&(!0===d&&(d={duration:1E3}),a?c.attr({translateX:h+b.len/2,translateY:m+f.len/2,scaleX:.001,scaleY:.001}):(c.animate({translateX:h,translateY:m,scaleX:1,scaleY:1},d),this.animate=null))},animateDrilldown:function(a){var d=this.chart.plotBox,
c=this.chart.drilldownLevels[this.chart.drilldownLevels.length-1],b=c.bBox,f=this.chart.options.drilldown.animation;a||(a=Math.min(b.width/d.width,b.height/d.height),c.shapeArgs={scaleX:a,scaleY:a,translateX:b.x,translateY:b.y},n(this.points,function(a){a.graphic&&a.graphic.attr(c.shapeArgs).animate({scaleX:1,scaleY:1,translateX:0,translateY:0},f)}),this.animate=null)},drawLegendSymbol:a.LegendSymbolMixin.drawRectangle,animateDrillupFrom:function(a){q.column.prototype.animateDrillupFrom.call(this,
a)},animateDrillupTo:function(a){q.column.prototype.animateDrillupTo.call(this,a)}}),g({applyOptions:function(a,c){a=b.prototype.applyOptions.call(this,a,c);c=this.series;var d=c.joinBy;c.mapData&&((d=void 0!==a[d[1]]&&c.mapMap[a[d[1]]])?(c.xyFromShape&&(a.x=d._midX,a.y=d._midY),g(a,d)):a.value=a.value||null);return a},onMouseOver:function(a){clearTimeout(this.colorInterval);if(null!==this.value)b.prototype.onMouseOver.call(this,a);else this.series.onMouseOut(a)},zoomTo:function(){var a=this.series;
a.xAxis.setExtremes(this._minX,this._maxX,!1);a.yAxis.setExtremes(this._minY,this._maxY,!1);a.chart.redraw()}},k))})(w);(function(a){var k=a.seriesType;k("mapline","map",{},{type:"mapline",colorProp:"stroke",drawLegendSymbol:a.seriesTypes.line.prototype.drawLegendSymbol})})(w);(function(a){var k=a.merge,n=a.Point;a=a.seriesType;a("mappoint","scatter",{dataLabels:{enabled:!0,formatter:function(){return this.point.name},crop:!1,defer:!1,overflow:!1,style:{color:"#000000"}}},{type:"mappoint",forceDL:!0},
{applyOptions:function(a,e){a=void 0!==a.lat&&void 0!==a.lon?k(a,this.series.chart.fromLatLonToPoint(a)):a;return n.prototype.applyOptions.call(this,a,e)}})})(w);(function(a){var k=a.arrayMax,n=a.arrayMin,g=a.Axis,e=a.each,t=a.isNumber,p=a.noop,u=a.pick,r=a.pInt,l=a.Point,b=a.seriesType,f=a.seriesTypes;b("bubble","scatter",{dataLabels:{formatter:function(){return this.point.z},inside:!0,verticalAlign:"middle"},marker:{radius:null,states:{hover:{radiusPlus:0}},symbol:"circle"},minSize:8,maxSize:"20%",
softThreshold:!1,states:{hover:{halo:{size:5}}},tooltip:{pointFormat:"({point.x}, {point.y}), Size: {point.z}"},turboThreshold:0,zThreshold:0,zoneAxis:"z"},{pointArrayMap:["y","z"],parallelArrays:["x","y","z"],trackerGroups:["markerGroup","dataLabelsGroup"],bubblePadding:!0,zoneAxis:"z",getRadii:function(a,b,f,c){var d,h,e,m=this.zData,l=[],g=this.options,q="width"!==g.sizeBy,k=g.zThreshold,n=b-a;h=0;for(d=m.length;h<d;h++)e=m[h],g.sizeByAbsoluteValue&&null!==e&&(e=Math.abs(e-k),b=Math.max(b-k,Math.abs(a-
k)),a=0),null===e?e=null:e<a?e=f/2-1:(e=0<n?(e-a)/n:.5,q&&0<=e&&(e=Math.sqrt(e)),e=Math.ceil(f+e*(c-f))/2),l.push(e);this.radii=l},animate:function(a){var b=this.options.animation;a||(e(this.points,function(a){var c=a.graphic,d;c&&c.width&&(d={x:c.x,y:c.y,width:c.width,height:c.height},c.attr({x:a.plotX,y:a.plotY,width:1,height:1}),c.animate(d,b))}),this.animate=null)},translate:function(){var a,b=this.data,e,c,d=this.radii;f.scatter.prototype.translate.call(this);for(a=b.length;a--;)e=b[a],c=d?d[a]:
0,t(c)&&c>=this.minPxSize/2?(e.marker={radius:c,width:2*c,height:2*c},e.dlBox={x:e.plotX-c,y:e.plotY-c,width:2*c,height:2*c}):e.shapeArgs=e.plotY=e.dlBox=void 0},alignDataLabel:f.column.prototype.alignDataLabel,buildKDTree:p,applyZones:p},{haloPath:function(a){return l.prototype.haloPath.call(this,0===a?0:this.marker.radius+a)},ttBelow:!1});g.prototype.beforePadding=function(){var a=this,b=this.len,f=this.chart,c=0,d=b,l=this.isXAxis,g=l?"xData":"yData",p=this.min,w={},H=Math.min(f.plotWidth,f.plotHeight),
E=Number.MAX_VALUE,F=-Number.MAX_VALUE,A=this.max-p,D=b/A,G=[];e(this.series,function(b){var c=b.options;!b.bubblePadding||!b.visible&&f.options.chart.ignoreHiddenSeries||(a.allowZoomOutside=!0,G.push(b),l&&(e(["minSize","maxSize"],function(a){var b=c[a],d=/%$/.test(b),b=r(b);w[a]=d?H*b/100:b}),b.minPxSize=w.minSize,b.maxPxSize=Math.max(w.maxSize,w.minSize),b=b.zData,b.length&&(E=u(c.zMin,Math.min(E,Math.max(n(b),!1===c.displayNegative?c.zThreshold:-Number.MAX_VALUE))),F=u(c.zMax,Math.max(F,k(b))))))});
e(G,function(b){var f=b[g],e=f.length,h;l&&b.getRadii(E,F,b.minPxSize,b.maxPxSize);if(0<A)for(;e--;)t(f[e])&&a.dataMin<=f[e]&&f[e]<=a.dataMax&&(h=b.radii[e],c=Math.min((f[e]-p)*D-h,c),d=Math.max((f[e]-p)*D+h,d))});G.length&&0<A&&!this.isLog&&(d-=b,D*=(b+c-d)/b,e([["min","userMin",c],["max","userMax",d]],function(b){void 0===u(a.options[b[0]],a[b[1]])&&(a[b[0]]+=b[2]/D)}))}})(w);(function(a){var k=a.merge,n=a.Point,g=a.seriesType,e=a.seriesTypes;e.bubble&&g("mapbubble","bubble",{animationLimit:500,
tooltip:{pointFormat:"{point.name}: {point.z}"}},{xyFromShape:!0,type:"mapbubble",pointArrayMap:["z"],getMapData:e.map.prototype.getMapData,getBox:e.map.prototype.getBox,setData:e.map.prototype.setData},{applyOptions:function(a,g){return a&&void 0!==a.lat&&void 0!==a.lon?n.prototype.applyOptions.call(this,k(a,this.series.chart.fromLatLonToPoint(a)),g):e.map.prototype.pointClass.prototype.applyOptions.call(this,a,g)},ttBelow:!1})})(w);(function(a){var k=a.colorPointMixin,n=a.each,g=a.merge,e=a.noop,
t=a.pick,p=a.Series,u=a.seriesType,r=a.seriesTypes;u("heatmap","scatter",{animation:!1,borderWidth:0,dataLabels:{formatter:function(){return this.point.value},inside:!0,verticalAlign:"middle",crop:!1,overflow:!1,padding:0},marker:null,pointRange:null,tooltip:{pointFormat:"{point.x}, {point.y}: {point.value}\x3cbr/\x3e"},states:{normal:{animation:!0},hover:{halo:!1,brightness:.2}}},g(a.colorSeriesMixin,{pointArrayMap:["y","value"],hasPointSpecificOptions:!0,supportsDrilldown:!0,getExtremesFromAll:!0,
directTouch:!0,init:function(){var a;r.scatter.prototype.init.apply(this,arguments);a=this.options;a.pointRange=t(a.pointRange,a.colsize||1);this.yAxis.axisPointRange=a.rowsize||1},translate:function(){var a=this.options,b=this.xAxis,f=this.yAxis,e=function(a,b,c){return Math.min(Math.max(b,a),c)};this.generatePoints();n(this.points,function(h){var l=(a.colsize||1)/2,c=(a.rowsize||1)/2,d=e(Math.round(b.len-b.translate(h.x-l,0,1,0,1)),-b.len,2*b.len),l=e(Math.round(b.len-b.translate(h.x+l,0,1,0,1)),
-b.len,2*b.len),g=e(Math.round(f.translate(h.y-c,0,1,0,1)),-f.len,2*f.len),c=e(Math.round(f.translate(h.y+c,0,1,0,1)),-f.len,2*f.len);h.plotX=h.clientX=(d+l)/2;h.plotY=(g+c)/2;h.shapeType="rect";h.shapeArgs={x:Math.min(d,l),y:Math.min(g,c),width:Math.abs(l-d),height:Math.abs(c-g)}});this.translateColors()},drawPoints:function(){r.column.prototype.drawPoints.call(this);n(this.points,function(a){a.graphic.css(this.colorAttribs(a))},this)},animate:e,getBox:e,drawLegendSymbol:a.LegendSymbolMixin.drawRectangle,
alignDataLabel:r.column.prototype.alignDataLabel,getExtremes:function(){p.prototype.getExtremes.call(this,this.valueData);this.valueMin=this.dataMin;this.valueMax=this.dataMax;p.prototype.getExtremes.call(this)}}),k)})(w);(function(a){function k(a,b){var f,e,g,l=!1,c=a.x,d=a.y;a=0;for(f=b.length-1;a<b.length;f=a++)e=b[a][1]>d,g=b[f][1]>d,e!==g&&c<(b[f][0]-b[a][0])*(d-b[a][1])/(b[f][1]-b[a][1])+b[a][0]&&(l=!l);return l}var n=a.Chart,g=a.each,e=a.extend,t=a.format,p=a.merge,u=a.win,r=a.wrap;n.prototype.transformFromLatLon=
function(e,b){if(void 0===u.proj4)return a.error(21),{x:0,y:null};e=u.proj4(b.crs,[e.lon,e.lat]);var f=b.cosAngle||b.rotation&&Math.cos(b.rotation),h=b.sinAngle||b.rotation&&Math.sin(b.rotation);e=b.rotation?[e[0]*f+e[1]*h,-e[0]*h+e[1]*f]:e;return{x:((e[0]-(b.xoffset||0))*(b.scale||1)+(b.xpan||0))*(b.jsonres||1)+(b.jsonmarginX||0),y:(((b.yoffset||0)-e[1])*(b.scale||1)+(b.ypan||0))*(b.jsonres||1)-(b.jsonmarginY||0)}};n.prototype.transformToLatLon=function(e,b){if(void 0===u.proj4)a.error(21);else{e=
{x:((e.x-(b.jsonmarginX||0))/(b.jsonres||1)-(b.xpan||0))/(b.scale||1)+(b.xoffset||0),y:((-e.y-(b.jsonmarginY||0))/(b.jsonres||1)+(b.ypan||0))/(b.scale||1)+(b.yoffset||0)};var f=b.cosAngle||b.rotation&&Math.cos(b.rotation),h=b.sinAngle||b.rotation&&Math.sin(b.rotation);b=u.proj4(b.crs,"WGS84",b.rotation?{x:e.x*f+e.y*-h,y:e.x*h+e.y*f}:e);return{lat:b.y,lon:b.x}}};n.prototype.fromPointToLatLon=function(e){var b=this.mapTransforms,f;if(b){for(f in b)if(b.hasOwnProperty(f)&&b[f].hitZone&&k({x:e.x,y:-e.y},
b[f].hitZone.coordinates[0]))return this.transformToLatLon(e,b[f]);return this.transformToLatLon(e,b["default"])}a.error(22)};n.prototype.fromLatLonToPoint=function(e){var b=this.mapTransforms,f,h;if(!b)return a.error(22),{x:0,y:null};for(f in b)if(b.hasOwnProperty(f)&&b[f].hitZone&&(h=this.transformFromLatLon(e,b[f]),k({x:h.x,y:-h.y},b[f].hitZone.coordinates[0])))return h;return this.transformFromLatLon(e,b["default"])};a.geojson=function(a,b,f){var h=[],k=[],m=function(a){var b,c=a.length;k.push("M");
for(b=0;b<c;b++)1===b&&k.push("L"),k.push(a[b][0],-a[b][1])};b=b||"map";g(a.features,function(a){var c=a.geometry,f=c.type,c=c.coordinates;a=a.properties;var l;k=[];"map"===b||"mapbubble"===b?("Polygon"===f?(g(c,m),k.push("Z")):"MultiPolygon"===f&&(g(c,function(a){g(a,m)}),k.push("Z")),k.length&&(l={path:k})):"mapline"===b?("LineString"===f?m(c):"MultiLineString"===f&&g(c,m),k.length&&(l={path:k})):"mappoint"===b&&"Point"===f&&(l={x:c[0],y:-c[1]});l&&h.push(e(l,{name:a.name||a.NAME,properties:a}))});
f&&a.copyrightShort&&(f.chart.mapCredits=t(f.chart.options.credits.mapText,{geojson:a}),f.chart.mapCreditsFull=t(f.chart.options.credits.mapTextFull,{geojson:a}));return h};r(n.prototype,"addCredits",function(a,b){b=p(!0,this.options.credits,b);this.mapCredits&&(b.href=null);a.call(this,b);this.credits&&this.mapCreditsFull&&this.credits.attr({title:this.mapCreditsFull})})})(w);(function(a){function k(a,b,e,g,c,d,k,l){return["M",a+c,b,"L",a+e-d,b,"C",a+e-d/2,b,a+e,b+d/2,a+e,b+d,"L",a+e,b+g-k,"C",a+
e,b+g-k/2,a+e-k/2,b+g,a+e-k,b+g,"L",a+l,b+g,"C",a+l/2,b+g,a,b+g-l/2,a,b+g-l,"L",a,b+c,"C",a,b+c/2,a+c/2,b,a+c,b,"Z"]}var n=a.Chart,g=a.defaultOptions,e=a.each,t=a.extend,p=a.merge,u=a.pick,r=a.Renderer,l=a.SVGRenderer,b=a.VMLRenderer;t(g.lang,{zoomIn:"Zoom in",zoomOut:"Zoom out"});g.mapNavigation={buttonOptions:{alignTo:"plotBox",align:"left",verticalAlign:"top",x:0,width:18,height:18,padding:5},buttons:{zoomIn:{onclick:function(){this.mapZoom(.5)},text:"+",y:0},zoomOut:{onclick:function(){this.mapZoom(2)},
text:"-",y:28}},mouseWheelSensitivity:1.1};a.splitPath=function(a){var b;a=a.replace(/([A-Za-z])/g," $1 ");a=a.replace(/^\s*/,"").replace(/\s*$/,"");a=a.split(/[ ,]+/);for(b=0;b<a.length;b++)/[a-zA-Z]/.test(a[b])||(a[b]=parseFloat(a[b]));return a};a.maps={};l.prototype.symbols.topbutton=function(a,b,e,g,c){return k(a-1,b-1,e,g,c.r,c.r,0,0)};l.prototype.symbols.bottombutton=function(a,b,e,g,c){return k(a-1,b-1,e,g,0,0,c.r,c.r)};r===b&&e(["topbutton","bottombutton"],function(a){b.prototype.symbols[a]=
l.prototype.symbols[a]});a.Map=a.mapChart=function(b,e,g){var f="string"===typeof b||b.nodeName,c=arguments[f?1:0],d={endOnTick:!1,visible:!1,minPadding:0,maxPadding:0,startOnTick:!1},h,k=a.getOptions().credits;h=c.series;c.series=null;c=p({chart:{panning:"xy",type:"map"},credits:{mapText:u(k.mapText,' \u00a9 \x3ca href\x3d"{geojson.copyrightUrl}"\x3e{geojson.copyrightShort}\x3c/a\x3e'),mapTextFull:u(k.mapTextFull,"{geojson.copyright}")},tooltip:{followTouchMove:!1},xAxis:d,yAxis:p(d,{reversed:!0})},
c,{chart:{inverted:!1,alignTicks:!1}});c.series=h;return f?new n(b,c,g):new n(c,e)}})(w)});


/**
 * highcharts-ng
 * @version v0.0.13 - 2016-10-04
 * @link https://github.com/pablojim/highcharts-ng
 * @author Barry Fitzgerald <>
 * @license MIT License, http://www.opensource.org/licenses/MIT
 */

if (typeof module !== 'undefined' && typeof exports !== 'undefined' && module.exports === exports){
  module.exports = 'highcharts-ng';
}

(function () {
  'use strict';
  /*global angular: false, Highcharts: false */


  angular.module('highcharts-ng', [])
    .factory('highchartsNG', ['$q', '$window', highchartsNG])
    .directive('highchart', ['highchartsNG', '$timeout', highchart]);

  //IE8 support
  function indexOf(arr, find, i /*opt*/) {
    if (i === undefined) i = 0;
    if (i < 0) i += arr.length;
    if (i < 0) i = 0;
    for (var n = arr.length; i < n; i++)
      if (i in arr && arr[i] === find)
        return i;
    return -1;
  }

  function prependMethod(obj, method, func) {
    var original = obj[method];
    obj[method] = function () {
      var args = Array.prototype.slice.call(arguments);
      func.apply(this, args);
      if (original) {
        return original.apply(this, args);
      } else {
        return;
      }

    };
  }

  function deepExtend(destination, source) {
    //Slightly strange behaviour in edge cases (e.g. passing in non objects)
    //But does the job for current use cases.
    if (angular.isArray(source)) {
      destination = angular.isArray(destination) ? destination : [];
      for (var i = 0; i < source.length; i++) {
        destination[i] = deepExtend(destination[i] || {}, source[i]);
      }
    } else if (angular.isObject(source)) {
      destination = angular.isObject(destination) ? destination : {};
      for (var property in source) {
        destination[property] = deepExtend(destination[property] || {}, source[property]);
      }
    } else {
      destination = source;
    }
    return destination;
  }

  function highchartsNG($q, $window) {
    var highchartsProm = $q.when($window.Highcharts);

    function getHighchartsOnce() {
      return highchartsProm;
    }

    return {
      getHighcharts: getHighchartsOnce,
      ready: function ready(callback, thisArg) {
        getHighchartsOnce().then(function() {
          callback.call(thisArg);
        });
      }
    };
  }

  function highchart(highchartsNGUtils, $timeout) {

    // acceptable shared state
    var seriesId = 0;
    var ensureIds = function (series) {
      var changed = false;
      angular.forEach(series, function(s) {
        if (!angular.isDefined(s.id)) {
          s.id = 'series-' + seriesId++;
          changed = true;
        }
      });
      return changed;
    };

    // immutable
    var axisNames = [ 'xAxis', 'yAxis' ];
    var chartTypeMap = {
      'stock': 'StockChart',
      'map':   'Map',
      'chart': 'Chart'
    };

    var getMergedOptions = function (scope, element, config) {
      var mergedOptions = {};

      var defaultOptions = {
        chart: {
          events: {}
        },
        title: {},
        subtitle: {},
        series: [],
        credits: {},
        plotOptions: {},
        navigator: {enabled: false},
        xAxis: {
          events: {}
        },
        yAxis: {
          events: {}
        }
      };

      if (config.options) {
        mergedOptions = deepExtend(defaultOptions, config.options);
      } else {
        mergedOptions = defaultOptions;
      }
      mergedOptions.chart.renderTo = element[0];

      angular.forEach(axisNames, function(axisName) {
        if(angular.isDefined(config[axisName])) {
          mergedOptions[axisName] = deepExtend(mergedOptions[axisName] || {}, config[axisName]);

          if(angular.isDefined(config[axisName].currentMin) ||
              angular.isDefined(config[axisName].currentMax)) {

            prependMethod(mergedOptions.chart.events, 'selection', function(e){
              var thisChart = this;
              if (e[axisName]) {
                scope.$apply(function () {
                  scope.config[axisName].currentMin = e[axisName][0].min;
                  scope.config[axisName].currentMax = e[axisName][0].max;
                });
              } else {
                //handle reset button - zoom out to all
                scope.$apply(function () {
                  scope.config[axisName].currentMin = thisChart[axisName][0].dataMin;
                  scope.config[axisName].currentMax = thisChart[axisName][0].dataMax;
                });
              }
            });

            prependMethod(mergedOptions.chart.events, 'addSeries', function(e){
              scope.config[axisName].currentMin = this[axisName][0].min || scope.config[axisName].currentMin;
              scope.config[axisName].currentMax = this[axisName][0].max || scope.config[axisName].currentMax;
            });
            prependMethod(mergedOptions[axisName].events, 'setExtremes', function (e) {
              if (e.trigger && e.trigger !== 'zoom') { // zoom trigger is handled by selection event
                $timeout(function () {
                  scope.config[axisName].currentMin = e.min;
                  scope.config[axisName].currentMax = e.max;
                  scope.config[axisName].min = e.min; // set min and max to adjust scrollbar/navigator
                  scope.config[axisName].max = e.max;
                }, 0);
              }
            });
          }
        }
      });

      if(config.title) {
        mergedOptions.title = config.title;
      }
      if (config.subtitle) {
        mergedOptions.subtitle = config.subtitle;
      }
      if (config.credits) {
        mergedOptions.credits = config.credits;
      }
      if(config.size) {
        if (config.size.width) {
          mergedOptions.chart.width = config.size.width;
        }
        if (config.size.height) {
          mergedOptions.chart.height = config.size.height;
        }
      }
      return mergedOptions;
    };

    var updateZoom = function (axis, modelAxis) {
      var extremes = axis.getExtremes();
      if(modelAxis.currentMin !== extremes.dataMin || modelAxis.currentMax !== extremes.dataMax) {
        if (axis.setExtremes) {
          axis.setExtremes(modelAxis.currentMin, modelAxis.currentMax, false);
        } else {
          axis.detachedsetExtremes(modelAxis.currentMin, modelAxis.currentMax, false);
        }
      }
    };

    var processExtremes = function(chart, axis, axisName) {
      if(axis.currentMin || axis.currentMax) {
        chart[axisName][0].setExtremes(axis.currentMin, axis.currentMax, true);
      }
    };

    var chartOptionsWithoutEasyOptions = function (options) {
      return angular.extend(
        deepExtend({}, options),
        { data: null, visible: null }
      );
    };

    var getChartType = function(scope) {
      if (scope.config === undefined) return 'Chart';
      return chartTypeMap[('' + scope.config.chartType).toLowerCase()] ||
             (scope.config.useHighStocks ? 'StockChart' : 'Chart');
    };

    function linkWithHighcharts(Highcharts, scope, element, attrs) {
      // We keep some chart-specific variables here as a closure
      // instead of storing them on 'scope'.

      // prevSeriesOptions is maintained by processSeries
      var prevSeriesOptions = {};
      // chart is maintained by initChart
      var chart = false;

      var processSeries = function(series, seriesOld) {
        var i;
        var ids = [];

        if(series) {
          var setIds = ensureIds(series);
          if(setIds && !scope.disableDataWatch) {
            //If we have set some ids this will trigger another digest cycle.
            //In this scenario just return early and let the next cycle take care of changes
            return false;
          }

          //Find series to add or update
          angular.forEach(series, function(s, idx) {
            ids.push(s.id);
            var chartSeries = chart.get(s.id);
            if (chartSeries) {
              if (!angular.equals(prevSeriesOptions[s.id], chartOptionsWithoutEasyOptions(s))) {
                chartSeries.update(angular.copy(s), false);
              } else {
                if (s.visible !== undefined && chartSeries.visible !== s.visible) {
                  chartSeries.setVisible(s.visible, false);
                }
                
                // Make sure the current series index can be accessed in seriesOld
                if (idx < seriesOld.length) {
                  var sOld = seriesOld[idx];
                  var sCopy = angular.copy(sOld);
                  
                  // Get the latest data point from the new series
                  var ptNew = s.data[s.data.length - 1];
                  
                  // Check if the new and old series are identical with the latest data point added
                  // If so, call addPoint without shifting
                  sCopy.data.push(ptNew);
                  if (angular.equals(sCopy, s)) {
                    chartSeries.addPoint(ptNew, false);
                  }
                  
                  // Check if the data change was a push and shift operation
                  // If so, call addPoint WITH shifting
                  else {
                    sCopy.data.shift();
                    if (angular.equals(sCopy, s)) {
                      chartSeries.addPoint(ptNew, false, true);
                    }
                    else {
                      chartSeries.setData(angular.copy(s.data), false);
                    }
                  }
                }
                else {
                  chartSeries.setData(angular.copy(s.data), false);
                }
              }
            } else {
              chart.addSeries(angular.copy(s), false);
            }
            prevSeriesOptions[s.id] = chartOptionsWithoutEasyOptions(s);
          });

          //  Shows no data text if all series are empty
          if(scope.config.noData) {
            var chartContainsData = false;

            for(i = 0; i < series.length; i++) {
              if (series[i].data && series[i].data.length > 0) {
                chartContainsData = true;

                break;
              }
            }

            if (!chartContainsData) {
              chart.showLoading(scope.config.noData);
            } else {
              chart.hideLoading();
            }
          }
        }

        //Now remove any missing series
        for(i = chart.series.length - 1; i >= 0; i--) {
          var s = chart.series[i];
          if (s.options.id !== 'highcharts-navigator-series' && indexOf(ids, s.options.id) < 0) {
            s.remove(false);
          }
        }

        return true;
      };

      var initChart = function() {
        if (chart) chart.destroy();
        prevSeriesOptions = {};
        var config = scope.config || {};
        var mergedOptions = getMergedOptions(scope, element, config);
        var func = config.func || undefined;
        var chartType = getChartType(scope);

        chart = new Highcharts[chartType](mergedOptions, func);

        for (var i = 0; i < axisNames.length; i++) {
          if (config[axisNames[i]]) {
            processExtremes(chart, config[axisNames[i]], axisNames[i]);
          }
        }
        if(config.loading) {
          chart.showLoading();
        }
        config.getHighcharts = function() {
          return chart;
        };

      };
      initChart();


      if(scope.disableDataWatch){
        scope.$watchCollection('config.series', function (newSeries, oldSeries) {
          processSeries(newSeries);
          chart.redraw();
        });
      } else {
        scope.$watch('config.series', function (newSeries, oldSeries) {
          var needsRedraw = processSeries(newSeries, oldSeries);
          if(needsRedraw) {
            chart.redraw();
          }
        }, true);
      }

      scope.$watch('config.title', function (newTitle) {
        chart.setTitle(newTitle, true);
      }, true);

      scope.$watch('config.subtitle', function (newSubtitle) {
        chart.setTitle(true, newSubtitle);
      }, true);

      scope.$watch('config.loading', function (loading) {
        if(loading) {
          chart.showLoading(loading === true ? null : loading);
        } else {
          chart.hideLoading();
        }
      });
      scope.$watch('config.noData', function (noData) {
        if(scope.config && scope.config.loading) {
          chart.showLoading(noData);
        }
      }, true);

      scope.$watch('config.credits.enabled', function (enabled) {
        if (enabled) {
          chart.credits.show();
        } else if (chart.credits) {
          chart.credits.hide();
        }
      });

      scope.$watch(getChartType, function (chartType, oldChartType) {
        if (chartType === oldChartType) return;
        initChart();
      });

      angular.forEach(axisNames, function(axisName) {
        scope.$watch('config.' + axisName, function(newAxes) {
          if (!newAxes) {
            return;
          }

          if (angular.isArray(newAxes)) {

            for (var axisIndex = 0; axisIndex < newAxes.length; axisIndex++) {
              var axis = newAxes[axisIndex];

              if (axisIndex < chart[axisName].length) {
                chart[axisName][axisIndex].update(axis, false);
                updateZoom(chart[axisName][axisIndex], angular.copy(axis));
              }

            }

          } else {
            // update single axis
            chart[axisName][0].update(newAxes, false);
            updateZoom(chart[axisName][0], angular.copy(newAxes));
          }

          chart.redraw();
        }, true);
      });
      scope.$watch('config.options', function (newOptions, oldOptions, scope) {
        //do nothing when called on registration
        if (newOptions === oldOptions) return;
        initChart();
        processSeries(scope.config.series);
        chart.redraw();
      }, true);

      scope.$watch('config.size', function (newSize, oldSize) {
        if(newSize === oldSize) return;
        if(newSize) {
          chart.setSize(newSize.width || chart.chartWidth, newSize.height || chart.chartHeight);
        }
      }, true);

      scope.$on('highchartsng.reflow', function () {
        chart.reflow();
      });

      scope.$on('$destroy', function() {
        if (chart) {
          try{
            chart.destroy();
          }catch(ex){
            // fail silently as highcharts will throw exception if element doesn't exist
          }

          $timeout(function(){
            element.remove();
          }, 0);
        }
      });
    }

    function link(scope, element, attrs) {
      function highchartsCb(Highcharts) {
        linkWithHighcharts(Highcharts, scope, element, attrs);
      }
      highchartsNGUtils
        .getHighcharts()
        .then(highchartsCb);
    }

    return {
      restrict: 'EAC',
      replace: true,
      template: '<div></div>',
      scope: {
        config: '=',
        disableDataWatch: '='
      },
      link: link
    };
  }
}());


(function() {
  'use strict';

  var noop = angular.noop;
  var objectFreeze  = (Object.freeze) ? Object.freeze : noop;
  var objectDefineProperty = Object.defineProperty;
  var isString   = angular.isString;
  var isFunction = angular.isFunction;
  var isDefined  = angular.isDefined;
  var isObject   = angular.isObject;
  var isArray    = angular.isArray;
  var forEach    = angular.forEach;
  var arraySlice = Array.prototype.slice;
  // ie8 wat
  if (!Array.prototype.indexOf) {
    Array.prototype.indexOf = function(elt /*, from*/) {
      var len = this.length >>> 0;
      var from = Number(arguments[1]) || 0;
      from = (from < 0) ? Math.ceil(from) : Math.floor(from);
      if (from < 0) {
        from += len;
      }

      for (; from < len; from++) {
        if (from in this && this[from] === elt) { return from; }
      }
      return -1;
    };
  }

  // $WebSocketProvider.$inject = ['$rootScope', '$q', '$timeout', '$websocketBackend'];
  function $WebSocketProvider($rootScope, $q, $timeout, $websocketBackend) {

    function $WebSocket(url, protocols, options) {
      if (!options && isObject(protocols) && !isArray(protocols)) {
        options = protocols;
        protocols = undefined;
      }

      this.protocols = protocols;
      this.url = url || 'Missing URL';
      this.ssl = /(wss)/i.test(this.url);

      // this.binaryType = '';
      // this.extensions = '';
      // this.bufferedAmount = 0;
      // this.trasnmitting = false;
      // this.buffer = [];

      // TODO: refactor options to use isDefined
      this.scope                       = options && options.scope                      || $rootScope;
      this.rootScopeFailover           = options && options.rootScopeFailover          && true;
      this.useApplyAsync               = options && options.useApplyAsync              || false;
      this.initialTimeout              = options && options.initialTimeout             || 500; // 500ms
      this.maxTimeout                  = options && options.maxTimeout                 || 5 * 60 * 1000; // 5 minutes
      this.reconnectIfNotNormalClose   = options && options.reconnectIfNotNormalClose  || false;

      this._reconnectAttempts = 0;
      this.sendQueue          = [];
      this.onOpenCallbacks    = [];
      this.onMessageCallbacks = [];
      this.onErrorCallbacks   = [];
      this.onCloseCallbacks   = [];

      objectFreeze(this._readyStateConstants);

      if (url) {
        this._connect();
      } else {
        this._setInternalState(0);
      }

    }


    $WebSocket.prototype._readyStateConstants = {
      'CONNECTING': 0,
      'OPEN': 1,
      'CLOSING': 2,
      'CLOSED': 3,
      'RECONNECT_ABORTED': 4
    };

    $WebSocket.prototype._normalCloseCode = 1000;

    $WebSocket.prototype._reconnectableStatusCodes = [
      4000
    ];

    $WebSocket.prototype.safeDigest = function safeDigest(autoApply) {
      if (autoApply && !this.scope.$$phase) {
        this.scope.$digest();
      }
    };

    $WebSocket.prototype.bindToScope = function bindToScope(scope) {
      var self = this;
      if (scope) {
        this.scope = scope;
        if (this.rootScopeFailover) {
          this.scope.$on('$destroy', function() {
            self.scope = $rootScope;
          });
        }
      }
      return self;
    };

    $WebSocket.prototype._connect = function _connect(force) {
      if (force || !this.socket || this.socket.readyState !== this._readyStateConstants.OPEN) {
        this.socket = $websocketBackend.create(this.url, this.protocols);
        this.socket.onmessage = angular.bind(this, this._onMessageHandler);
        this.socket.onopen  = angular.bind(this, this._onOpenHandler);
        this.socket.onerror = angular.bind(this, this._onErrorHandler);
        this.socket.onclose = angular.bind(this, this._onCloseHandler);
      }
    };

    $WebSocket.prototype.fireQueue = function fireQueue() {
      while (this.sendQueue.length && this.socket.readyState === this._readyStateConstants.OPEN) {
        var data = this.sendQueue.shift();

        this.socket.send(
          isString(data.message) ? data.message : JSON.stringify(data.message)
        );
        data.deferred.resolve();
      }
    };

    $WebSocket.prototype.notifyOpenCallbacks = function notifyOpenCallbacks(event) {
      for (var i = 0; i < this.onOpenCallbacks.length; i++) {
        this.onOpenCallbacks[i].call(this, event);
      }
    };

    $WebSocket.prototype.notifyCloseCallbacks = function notifyCloseCallbacks(event) {
      for (var i = 0; i < this.onCloseCallbacks.length; i++) {
        this.onCloseCallbacks[i].call(this, event);
      }
    };

    $WebSocket.prototype.notifyErrorCallbacks = function notifyErrorCallbacks(event) {
      for (var i = 0; i < this.onErrorCallbacks.length; i++) {
        this.onErrorCallbacks[i].call(this, event);
      }
    };

    $WebSocket.prototype.onOpen = function onOpen(cb) {
      this.onOpenCallbacks.push(cb);
      return this;
    };

    $WebSocket.prototype.onClose = function onClose(cb) {
      this.onCloseCallbacks.push(cb);
      return this;
    };

    $WebSocket.prototype.onError = function onError(cb) {
      this.onErrorCallbacks.push(cb);
      return this;
    };


    $WebSocket.prototype.onMessage = function onMessage(callback, options) {
      if (!isFunction(callback)) {
        throw new Error('Callback must be a function');
      }

      if (options && isDefined(options.filter) && !isString(options.filter) && !(options.filter instanceof RegExp)) {
        throw new Error('Pattern must be a string or regular expression');
      }

      this.onMessageCallbacks.push({
        fn: callback,
        pattern: options ? options.filter : undefined,
        autoApply: options ? options.autoApply : true
      });
      return this;
    };

    $WebSocket.prototype._onOpenHandler = function _onOpenHandler(event) {
      this._reconnectAttempts = 0;
      this.notifyOpenCallbacks(event);
      this.fireQueue();
    };

    $WebSocket.prototype._onCloseHandler = function _onCloseHandler(event) {
      var self = this;
      if (self.useApplyAsync) {
        self.scope.$applyAsync(function() {
          self.notifyCloseCallbacks(event);
        });
      } else {
        self.notifyCloseCallbacks(event);
        self.safeDigest(autoApply);
      }
      if ((this.reconnectIfNotNormalClose && event.code !== this._normalCloseCode) || this._reconnectableStatusCodes.indexOf(event.code) > -1) {
        this.reconnect();
      }
    };

    $WebSocket.prototype._onErrorHandler = function _onErrorHandler(event) {
      var self = this;
      if (self.useApplyAsync) {
        self.scope.$applyAsync(function() {
          self.notifyErrorCallbacks(event);
        });
      } else {
        self.notifyErrorCallbacks(event);
        self.safeDigest(autoApply);
      }
    };

    $WebSocket.prototype._onMessageHandler = function _onMessageHandler(message) {
      var pattern;
      var self = this;
      var currentCallback;
      for (var i = 0; i < self.onMessageCallbacks.length; i++) {
        currentCallback = self.onMessageCallbacks[i];
        pattern = currentCallback.pattern;
        if (pattern) {
          if (isString(pattern) && message.data === pattern) {
            applyAsyncOrDigest(currentCallback.fn, currentCallback.autoApply, message);
          }
          else if (pattern instanceof RegExp && pattern.exec(message.data)) {
            applyAsyncOrDigest(currentCallback.fn, currentCallback.autoApply, message);
          }
        }
        else {
          applyAsyncOrDigest(currentCallback.fn, currentCallback.autoApply, message);
        }
      }

      function applyAsyncOrDigest(callback, autoApply, args) {
        args = arraySlice.call(arguments, 2);
        if (self.useApplyAsync) {
          self.scope.$applyAsync(function() {
            callback.apply(self, args);
          });
        } else {
          callback.apply(self, args);
          self.safeDigest(autoApply);
        }
      }

    };

    $WebSocket.prototype.close = function close(force) {
      if (force || !this.socket.bufferedAmount) {
        this.socket.close();
      }
      return this;
    };

    $WebSocket.prototype.send = function send(data) {
      var deferred = $q.defer();
      var self = this;
      var promise = cancelableify(deferred.promise);

      if (self.readyState === self._readyStateConstants.RECONNECT_ABORTED) {
        deferred.reject('Socket connection has been closed');
      }
      else {
        self.sendQueue.push({
          message: data,
          deferred: deferred
        });
        self.fireQueue();
      }

      // Credit goes to @btford
      function cancelableify(promise) {
        promise.cancel = cancel;
        var then = promise.then;
        promise.then = function() {
          var newPromise = then.apply(this, arguments);
          return cancelableify(newPromise);
        };
        return promise;
      }

      function cancel(reason) {
        self.sendQueue.splice(self.sendQueue.indexOf(data), 1);
        deferred.reject(reason);
        return self;
      }

      if ($websocketBackend.isMocked && $websocketBackend.isMocked() &&
              $websocketBackend.isConnected(this.url)) {
        this._onMessageHandler($websocketBackend.mockSend());
      }

      return promise;
    };

    $WebSocket.prototype.reconnect = function reconnect() {
      this.close();

      var backoffDelay = this._getBackoffDelay(++this._reconnectAttempts);

      var backoffDelaySeconds = backoffDelay / 1000;
      console.log('Reconnecting in ' + backoffDelaySeconds + ' seconds');

      $timeout(angular.bind(this, this._connect), backoffDelay);

      return this;
    };
    // Exponential Backoff Formula by Prof. Douglas Thain
    // http://dthain.blogspot.co.uk/2009/02/exponential-backoff-in-distributed.html
    $WebSocket.prototype._getBackoffDelay = function _getBackoffDelay(attempt) {
      var R = Math.random() + 1;
      var T = this.initialTimeout;
      var F = 2;
      var N = attempt;
      var M = this.maxTimeout;

      return Math.floor(Math.min(R * T * Math.pow(F, N), M));
    };

    $WebSocket.prototype._setInternalState = function _setInternalState(state) {
      if (Math.floor(state) !== state || state < 0 || state > 4) {
        throw new Error('state must be an integer between 0 and 4, got: ' + state);
      }

      // ie8 wat
      if (!objectDefineProperty) {
        this.readyState = state || this.socket.readyState;
      }
      this._internalConnectionState = state;


      forEach(this.sendQueue, function(pending) {
        pending.deferred.reject('Message cancelled due to closed socket connection');
      });
    };

    // Read only .readyState
    if (objectDefineProperty) {
      objectDefineProperty($WebSocket.prototype, 'readyState', {
        get: function() {
          return this._internalConnectionState || this.socket.readyState;
        },
        set: function() {
          throw new Error('The readyState property is read-only');
        }
      });
    }

    return function(url, protocols, options) {
      return new $WebSocket(url, protocols, options);
    };
  }

  // $WebSocketBackendProvider.$inject = ['$window', '$log'];
  function $WebSocketBackendProvider($window, $log) {
    this.create = function create(url, protocols) {
      var match = /wss?:\/\//.exec(url);
      var Socket, ws;
      if (!match) {
        throw new Error('Invalid url provided');
      }

      // CommonJS
      if (typeof exports === 'object' && require) {
        try {
          ws = require('ws');
          Socket = (ws.Client || ws.client || ws);
        } catch(e) {}
      }

      // Browser
      Socket = Socket || $window.WebSocket || $window.MozWebSocket;

      if (protocols) {
        return new Socket(url, protocols);
      }

      return new Socket(url);
    };
    this.createWebSocketBackend = function createWebSocketBackend(url, protocols) {
      $log.warn('Deprecated: Please use .create(url, protocols)');
      return this.create(url, protocols);
    };
  }

  angular.module('ngWebSocket', [])
  .factory('$websocket', ['$rootScope', '$q', '$timeout', '$websocketBackend', $WebSocketProvider])
  .factory('WebSocket',  ['$rootScope', '$q', '$timeout', 'WebsocketBackend',  $WebSocketProvider])
  .service('$websocketBackend', ['$window', '$log', $WebSocketBackendProvider])
  .service('WebSocketBackend',  ['$window', '$log', $WebSocketBackendProvider]);


  angular.module('angular-websocket', ['ngWebSocket']);

  if (typeof module === 'object' && typeof define !== 'function') {
    module.exports = angular.module('ngWebSocket');
  }
}());


/*! angularjs-slider - v2.10.4 - 
 (c) Rafal Zajac <rzajac@gmail.com>, Valentin Hervieu <valentin@hervieu.me>, Jussi Saarivirta <jusasi@gmail.com>, Angelin Sirbu <angelin.sirbu@gmail.com> - 
 https://github.com/angular-slider/angularjs-slider - 
 2016-03-16 */
/*jslint unparam: true */
/*global angular: false, console: false, define, module */
(function(root, factory) {
  'use strict';
  /* istanbul ignore next */
  if (typeof define === 'function' && define.amd) {
    // AMD. Register as an anonymous module.
    define(['angular'], factory);
  } else if (typeof module === 'object' && module.exports) {
    // Node. Does not work with strict CommonJS, but
    // only CommonJS-like environments that support module.exports,
    // like Node.
    // to support bundler like browserify
    module.exports = factory(require('angular'));
  } else {
    // Browser globals (root is window)
    factory(root.angular);
  }

}(this, function(angular) {
  'use strict';
  var module = angular.module('rzModule', [])

  .factory('RzSliderOptions', function() {
    var defaultOptions = {
      floor: 0,
      ceil: null, //defaults to rz-slider-model
      step: 1,
      precision: 0,
      minRange: 0,
      id: null,
      translate: null,
      stepsArray: null,
      draggableRange: false,
      draggableRangeOnly: false,
      showSelectionBar: false,
      showSelectionBarEnd: false,
      showSelectionBarFromValue: null,
      hideLimitLabels: false,
      readOnly: false,
      disabled: false,
      interval: 350,
      showTicks: false,
      showTicksValues: false,
      ticksTooltip: null,
      ticksValuesTooltip: null,
      vertical: false,
      getSelectionBarColor: null,
      getPointerColor: null,
      keyboardSupport: true,
      scale: 1,
      enforceStep: true,
      enforceRange: false,
      noSwitching: false,
      onlyBindHandles: false,
      onStart: null,
      onChange: null,
      onEnd: null,
      rightToLeft: false
    };
    var globalOptions = {};

    var factory = {};
    /**
     * `options({})` allows global configuration of all sliders in the
     * application.
     *
     *   var app = angular.module( 'App', ['rzModule'], function( RzSliderOptions ) {
     *     // show ticks for all sliders
     *     RzSliderOptions.options( { showTicks: true } );
     *   });
     */
    factory.options = function(value) {
      angular.extend(globalOptions, value);
    };

    factory.getOptions = function(options) {
      return angular.extend({}, defaultOptions, globalOptions, options);
    };

    return factory;
  })

  .factory('rzThrottle', ['$timeout', function($timeout) {
    /**
     * rzThrottle
     *
     * Taken from underscore project
     *
     * @param {Function} func
     * @param {number} wait
     * @param {ThrottleOptions} options
     * @returns {Function}
     */
    return function(func, wait, options) {
      'use strict';
      /* istanbul ignore next */
      var getTime = (Date.now || function() {
        return new Date().getTime();
      });
      var context, args, result;
      var timeout = null;
      var previous = 0;
      options = options || {};
      var later = function() {
        previous = getTime();
        timeout = null;
        result = func.apply(context, args);
        context = args = null;
      };
      return function() {
        var now = getTime();
        var remaining = wait - (now - previous);
        context = this;
        args = arguments;
        if (remaining <= 0) {
          $timeout.cancel(timeout);
          timeout = null;
          previous = now;
          result = func.apply(context, args);
          context = args = null;
        } else if (!timeout && options.trailing !== false) {
          timeout = $timeout(later, remaining);
        }
        return result;
      };
    }
  }])

  .factory('RzSlider', ['$timeout', '$document', '$window', '$compile', 'RzSliderOptions', 'rzThrottle', function($timeout, $document, $window, $compile, RzSliderOptions, rzThrottle) {
    'use strict';

    /**
     * Slider
     *
     * @param {ngScope} scope            The AngularJS scope
     * @param {Element} sliderElem The slider directive element wrapped in jqLite
     * @constructor
     */
    var Slider = function(scope, sliderElem) {
      /**
       * The slider's scope
       *
       * @type {ngScope}
       */
      this.scope = scope;

      /**
       * Slider element wrapped in jqLite
       *
       * @type {jqLite}
       */
      this.sliderElem = sliderElem;

      /**
       * Slider type
       *
       * @type {boolean} Set to true for range slider
       */
      this.range = this.scope.rzSliderModel !== undefined && this.scope.rzSliderHigh !== undefined;

      /**
       * Values recorded when first dragging the bar
       *
       * @type {Object}
       */
      this.dragging = {
        active: false,
        value: 0,
        difference: 0,
        offset: 0,
        lowLimit: 0,
        highLimit: 0
      };

      /**
       * property that handle position (defaults to left for horizontal)
       * @type {string}
       */
      this.positionProperty = 'left';

      /**
       * property that handle dimension (defaults to width for horizontal)
       * @type {string}
       */
      this.dimensionProperty = 'width';

      /**
       * Half of the width or height of the slider handles
       *
       * @type {number}
       */
      this.handleHalfDim = 0;

      /**
       * Maximum position the slider handle can have
       *
       * @type {number}
       */
      this.maxPos = 0;

      /**
       * Precision
       *
       * @type {number}
       */
      this.precision = 0;

      /**
       * Step
       *
       * @type {number}
       */
      this.step = 1;

      /**
       * The name of the handle we are currently tracking
       *
       * @type {string}
       */
      this.tracking = '';

      /**
       * Minimum value (floor) of the model
       *
       * @type {number}
       */
      this.minValue = 0;

      /**
       * Maximum value (ceiling) of the model
       *
       * @type {number}
       */
      this.maxValue = 0;


      /**
       * The delta between min and max value
       *
       * @type {number}
       */
      this.valueRange = 0;

      /**
       * Set to true if init method already executed
       *
       * @type {boolean}
       */
      this.initHasRun = false;

      /**
       * Internal flag to prevent watchers to be called when the sliders value are modified internally.
       * @type {boolean}
       */
      this.internalChange = false;

      // Slider DOM elements wrapped in jqLite
      this.fullBar = null; // The whole slider bar
      this.selBar = null; // Highlight between two handles
      this.minH = null; // Left slider handle
      this.maxH = null; // Right slider handle
      this.flrLab = null; // Floor label
      this.ceilLab = null; // Ceiling label
      this.minLab = null; // Label above the low value
      this.maxLab = null; // Label above the high value
      this.cmbLab = null; // Combined label
      this.ticks = null; // The ticks

      // Initialize slider
      this.init();
    };

    // Add instance methods
    Slider.prototype = {

      /**
       * Initialize slider
       *
       * @returns {undefined}
       */
      init: function() {
        var thrLow, thrHigh,
          self = this;

        var calcDimFn = function() {
          self.calcViewDimensions();
        };

        this.applyOptions();
        this.initElemHandles();
        this.manageElementsStyle();
        this.setDisabledState();
        this.calcViewDimensions();
        this.setMinAndMax();
        this.addAccessibility();
        this.updateCeilLab();
        this.updateFloorLab();
        this.initHandles();
        this.manageEventsBindings();

        // Recalculate slider view dimensions
        this.scope.$on('reCalcViewDimensions', calcDimFn);

        // Recalculate stuff if view port dimensions have changed
        angular.element($window).on('resize', calcDimFn);

        this.initHasRun = true;

        // Watch for changes to the model
        thrLow = rzThrottle(function() {
          self.onLowHandleChange();
        }, self.options.interval);

        thrHigh = rzThrottle(function() {
          self.onHighHandleChange();
        }, self.options.interval);

        this.scope.$on('rzSliderForceRender', function() {
          self.resetLabelsValue();
          thrLow();
          if (self.range) {
            thrHigh();
          }
          self.resetSlider();
        });

        // Watchers (order is important because in case of simultaneous change,
        // watchers will be called in the same order)
        this.scope.$watch('rzSliderOptions()', function(newValue, oldValue) {
          if (newValue === oldValue)
            return;
          self.applyOptions();
          self.resetSlider();
        }, true);

        this.scope.$watch('rzSliderModel', function(newValue, oldValue) {
          if (self.internalChange)
            return;
          if (newValue === oldValue)
            return;
          thrLow();
        });

        this.scope.$watch('rzSliderHigh', function(newValue, oldValue) {
          if (self.internalChange)
            return;
          if (newValue === oldValue)
            return;
          if (newValue != null)
            thrHigh();
          if (self.range && newValue == null || !self.range && newValue != null) {
            self.applyOptions();
            self.resetSlider();
          }
        });

        this.scope.$on('$destroy', function() {
          self.unbindEvents();
          angular.element($window).off('resize', calcDimFn);
        });
      },

      /*
       * Reflow the slider when the low handle changes (called with throttle)
       */
      onLowHandleChange: function() {
        this.setMinAndMax();
        this.updateLowHandle(this.valueToOffset(this.scope.rzSliderModel));
        this.updateSelectionBar();
        this.updateTicksScale();
        this.updateAriaAttributes();
        if (this.range) {
          this.updateCmbLabel();
        }
      },

      /*
       * Reflow the slider when the high handle changes (called with throttle)
       */
      onHighHandleChange: function() {
        this.setMinAndMax();
        this.updateHighHandle(this.valueToOffset(this.scope.rzSliderHigh));
        this.updateSelectionBar();
        this.updateTicksScale();
        this.updateCmbLabel();
        this.updateAriaAttributes();
      },

      /**
       * Read the user options and apply them to the slider model
       */
      applyOptions: function() {
        var sliderOptions;
        if (this.scope.rzSliderOptions)
          sliderOptions = this.scope.rzSliderOptions();
        else
          sliderOptions = {};

        this.options = RzSliderOptions.getOptions(sliderOptions);

        if (this.options.step <= 0)
          this.options.step = 1;

        this.range = this.scope.rzSliderModel !== undefined && this.scope.rzSliderHigh !== undefined;
        this.options.draggableRange = this.range && this.options.draggableRange;
        this.options.draggableRangeOnly = this.range && this.options.draggableRangeOnly;
        if (this.options.draggableRangeOnly) {
          this.options.draggableRange = true;
        }

        this.options.showTicks = this.options.showTicks || this.options.showTicksValues;
        this.scope.showTicks = this.options.showTicks; //scope is used in the template

        this.options.showSelectionBar = this.options.showSelectionBar || this.options.showSelectionBarEnd
          || this.options.showSelectionBarFromValue !== null;

        if (this.options.stepsArray) {
          this.options.floor = 0;
          this.options.ceil = this.options.stepsArray.length - 1;
          this.options.step = 1;
          this.customTrFn = function(value) {
            return this.options.stepsArray[value];
          };
        } else if (this.options.translate)
          this.customTrFn = this.options.translate;
        else
          this.customTrFn = function(value) {
            return String(value);
          };

        if (this.options.vertical) {
          this.positionProperty = 'bottom';
          this.dimensionProperty = 'height';
        }
      },

      /**
       * Resets slider
       *
       * @returns {undefined}
       */
      resetSlider: function() {
        this.manageElementsStyle();
        this.addAccessibility();
        this.setMinAndMax();
        this.updateCeilLab();
        this.updateFloorLab();
        this.unbindEvents();
        this.manageEventsBindings();
        this.setDisabledState();
        this.calcViewDimensions();
      },

      /**
       * Set the slider children to variables for easy access
       *
       * Run only once during initialization
       *
       * @returns {undefined}
       */
      initElemHandles: function() {
        // Assign all slider elements to object properties for easy access
        angular.forEach(this.sliderElem.children(), function(elem, index) {
          var jElem = angular.element(elem);

          switch (index) {
            case 0:
              this.fullBar = jElem;
              break;
            case 1:
              this.selBar = jElem;
              break;
            case 2:
              this.minH = jElem;
              break;
            case 3:
              this.maxH = jElem;
              break;
            case 4:
              this.flrLab = jElem;
              break;
            case 5:
              this.ceilLab = jElem;
              break;
            case 6:
              this.minLab = jElem;
              break;
            case 7:
              this.maxLab = jElem;
              break;
            case 8:
              this.cmbLab = jElem;
              break;
            case 9:
              this.ticks = jElem;
              break;
          }

        }, this);

        // Initialize offset cache properties
        this.selBar.rzsp = 0;
        this.minH.rzsp = 0;
        this.maxH.rzsp = 0;
        this.flrLab.rzsp = 0;
        this.ceilLab.rzsp = 0;
        this.minLab.rzsp = 0;
        this.maxLab.rzsp = 0;
        this.cmbLab.rzsp = 0;
      },

      /**
       * Update each elements style based on options
       */
      manageElementsStyle: function() {

        if (!this.range)
          this.maxH.css('display', 'none');
        else
          this.maxH.css('display', '');

        this.alwaysHide(this.flrLab, this.options.showTicksValues || this.options.hideLimitLabels);
        this.alwaysHide(this.ceilLab, this.options.showTicksValues || this.options.hideLimitLabels);
        this.alwaysHide(this.minLab, this.options.showTicksValues);
        this.alwaysHide(this.maxLab, this.options.showTicksValues || !this.range);
        this.alwaysHide(this.cmbLab, this.options.showTicksValues || !this.range);
        this.alwaysHide(this.selBar, !this.range && !this.options.showSelectionBar);

        if (this.options.vertical)
          this.sliderElem.addClass('rz-vertical');

        if (this.options.draggableRange)
          this.selBar.addClass('rz-draggable');
        else
          this.selBar.removeClass('rz-draggable');
      },

      alwaysHide: function(el, hide) {
        el.rzAlwaysHide = hide;
        if (hide)
          this.hideEl(el);
        else
          this.showEl(el)
      },

      /**
       * Manage the events bindings based on readOnly and disabled options
       *
       * @returns {undefined}
       */
      manageEventsBindings: function() {
        if (this.options.disabled || this.options.readOnly)
          this.unbindEvents();
        else
          this.bindEvents();
      },

      /**
       * Set the disabled state based on rzSliderDisabled
       *
       * @returns {undefined}
       */
      setDisabledState: function() {
        if (this.options.disabled) {
          this.sliderElem.attr('disabled', 'disabled');
        } else {
          this.sliderElem.attr('disabled', null);
        }
      },

      /**
       * Reset label values
       *
       * @return {undefined}
       */
      resetLabelsValue: function() {
        this.minLab.rzsv = undefined;
        this.maxLab.rzsv = undefined;
      },

      /**
       * Initialize slider handles positions and labels
       *
       * Run only once during initialization and every time view port changes size
       *
       * @returns {undefined}
       */
      initHandles: function() {
        this.updateLowHandle(this.valueToOffset(this.scope.rzSliderModel));

        /*
         the order here is important since the selection bar should be
         updated after the high handle but before the combined label
         */
        if (this.range)
          this.updateHighHandle(this.valueToOffset(this.scope.rzSliderHigh));
        this.updateSelectionBar();
        if (this.range)
          this.updateCmbLabel();

        this.updateTicksScale();
      },

      /**
       * Translate value to human readable format
       *
       * @param {number|string} value
       * @param {jqLite} label
       * @param {boolean} [useCustomTr]
       * @returns {undefined}
       */
      translateFn: function(value, label, which, useCustomTr) {
        useCustomTr = useCustomTr === undefined ? true : useCustomTr;

        var valStr = String((useCustomTr ? this.customTrFn(value, this.options.id, which) : value)),
          getDimension = false;

        if (label.rzsv === undefined || label.rzsv.length !== valStr.length || (label.rzsv.length > 0 && label.rzsd === 0)) {
          getDimension = true;
          label.rzsv = valStr;
        }

        label.html(valStr);

        // Update width only when length of the label have changed
        if (getDimension) {
          this.getDimension(label);
        }
      },

      /**
       * Set maximum and minimum values for the slider and ensure the model and high
       * value match these limits
       * @returns {undefined}
       */
      setMinAndMax: function() {

        this.step = +this.options.step;
        this.precision = +this.options.precision;

        this.minValue = this.options.floor;

        if (this.options.enforceStep) {
          this.scope.rzSliderModel = this.roundStep(this.scope.rzSliderModel);
          if (this.range)
            this.scope.rzSliderHigh = this.roundStep(this.scope.rzSliderHigh);
        }

        if (this.options.ceil != null)
          this.maxValue = this.options.ceil;
        else
          this.maxValue = this.options.ceil = this.range ? this.scope.rzSliderHigh : this.scope.rzSliderModel;

        if (this.options.enforceRange) {
          this.scope.rzSliderModel = this.sanitizeValue(this.scope.rzSliderModel);
          if (this.range)
            this.scope.rzSliderHigh = this.sanitizeValue(this.scope.rzSliderHigh);
        }

        this.valueRange = this.maxValue - this.minValue;
      },

      /**
       * Adds accessibility attributes
       *
       * Run only once during initialization
       *
       * @returns {undefined}
       */
      addAccessibility: function() {
        this.minH.attr('role', 'slider');
        this.updateAriaAttributes();
        if (this.options.keyboardSupport && !(this.options.readOnly || this.options.disabled))
          this.minH.attr('tabindex', '0');
        else
          this.minH.attr('tabindex', '');
        if (this.options.vertical)
          this.minH.attr('aria-orientation', 'vertical');

        if (this.range) {
          this.maxH.attr('role', 'slider');
          if (this.options.keyboardSupport && !(this.options.readOnly || this.options.disabled))
            this.maxH.attr('tabindex', '0');
          else
            this.maxH.attr('tabindex', '');
          if (this.options.vertical)
            this.maxH.attr('aria-orientation', 'vertical');
        }
      },

      /**
       * Updates aria attributes according to current values
       */
      updateAriaAttributes: function() {
        this.minH.attr({
          'aria-valuenow': this.scope.rzSliderModel,
          'aria-valuetext': this.customTrFn(this.scope.rzSliderModel, this.options.id, 'model'),
          'aria-valuemin': this.minValue,
          'aria-valuemax': this.maxValue
        });
        if (this.range) {
          this.maxH.attr({
            'aria-valuenow': this.scope.rzSliderHigh,
            'aria-valuetext': this.customTrFn(this.scope.rzSliderHigh, this.options.id, 'high'),
            'aria-valuemin': this.minValue,
            'aria-valuemax': this.maxValue
          });
        }
      },

      /**
       * Calculate dimensions that are dependent on view port size
       *
       * Run once during initialization and every time view port changes size.
       *
       * @returns {undefined}
       */
      calcViewDimensions: function() {
        var handleWidth = this.getDimension(this.minH);

        this.handleHalfDim = handleWidth / 2;
        this.barDimension = this.getDimension(this.fullBar);

        this.maxPos = this.barDimension - handleWidth;

        this.getDimension(this.sliderElem);
        this.sliderElem.rzsp = this.sliderElem[0].getBoundingClientRect()[this.positionProperty];

        if (this.initHasRun) {
          this.updateFloorLab();
          this.updateCeilLab();
          this.initHandles();
        }
      },

      /**
       * Update the ticks position
       *
       * @returns {undefined}
       */
      updateTicksScale: function() {
        if (!this.options.showTicks) return;

        var positions = '',
          ticksCount = Math.round((this.maxValue - this.minValue) / this.step) + 1;
        this.scope.ticks = [];
        for (var i = 0; i < ticksCount; i++) {
          var value = this.roundStep(this.minValue + i * this.step);
          var tick = {
            selected: this.isTickSelected(value)
          };
          if (tick.selected && this.options.getSelectionBarColor) {
            tick.style = {
              'background-color': this.getSelectionBarColor()
            };
          }
          if (this.options.ticksTooltip) {
            tick.tooltip = this.options.ticksTooltip(value);
            tick.tooltipPlacement = this.options.vertical ? 'right' : 'top';
          }
          if (this.options.showTicksValues) {
            tick.value = this.getDisplayValue(value, 'tick-value');
            if (this.options.ticksValuesTooltip) {
              tick.valueTooltip = this.options.ticksValuesTooltip(value);
              tick.valueTooltipPlacement = this.options.vertical ? 'right' : 'top';
            }
          }
          if (!this.options.rightToLeft) {
            this.scope.ticks.push(tick);
          } else {
            this.scope.ticks.unshift(tick);
          }
        }
      },

      isTickSelected: function(value) {
        if (!this.range) {
          if (this.options.showSelectionBarFromValue !== null) {
            var center = this.options.showSelectionBarFromValue;
            if (this.scope.rzSliderModel > center && value >= center && value <= this.scope.rzSliderModel)
              return true;
            else if (this.scope.rzSliderModel < center && value <= center && value >= this.scope.rzSliderModel)
              return true;
          }
          else if (this.options.showSelectionBarEnd) {
            if (value >= this.scope.rzSliderModel)
              return true;
          }
          else if (this.options.showSelectionBar && value <= this.scope.rzSliderModel)
            return true;
        }
        if (this.range && value >= this.scope.rzSliderModel && value <= this.scope.rzSliderHigh)
          return true;
        return false;
      },

      /**
       * Update position of the floor label
       *
       * @returns {undefined}
       */
      updateFloorLab: function() {
        this.translateFn(this.minValue, this.flrLab, 'floor');
        this.getDimension(this.flrLab);
        var position = this.options.rightToLeft ? this.barDimension - this.flrLab.rzsd : 0;
        this.setPosition(this.flrLab, position);
      },

      /**
       * Update position of the ceiling label
       *
       * @returns {undefined}
       */
      updateCeilLab: function() {
        this.translateFn(this.maxValue, this.ceilLab, 'ceil');
        this.getDimension(this.ceilLab);
        var position = this.options.rightToLeft ? 0 : this.barDimension - this.ceilLab.rzsd;
        this.setPosition(this.ceilLab, position);
      },

      /**
       * Update slider handles and label positions
       *
       * @param {string} which
       * @param {number} newOffset
       */
      updateHandles: function(which, newOffset) {
        if (which === 'rzSliderModel')
          this.updateLowHandle(newOffset);
        else
          this.updateHighHandle(newOffset);

        this.updateSelectionBar();
        this.updateTicksScale();
        if (this.range)
          this.updateCmbLabel();
      },

      /**
       * Helper function to work out the position for handle labels depending on RTL or not
       *
       * @param {string} labelName maxLab or minLab
       * @param newOffset
       *
       * @returns {number}
       */
      getHandleLabelPos: function(labelName, newOffset) {
        var labelRzsd = this[labelName].rzsd,
          nearHandlePos = newOffset - labelRzsd / 2 + this.handleHalfDim,
          endOfBarPos = this.barDimension - labelRzsd;

        if (this.options.rightToLeft && labelName === 'minLab' || !this.options.rightToLeft && labelName === 'maxLab') {
          return Math.min(nearHandlePos, endOfBarPos);
        } else {
          return Math.min(Math.max(nearHandlePos, 0), endOfBarPos);
        }
      },

      /**
       * Update low slider handle position and label
       *
       * @param {number} newOffset
       * @returns {undefined}
       */
      updateLowHandle: function(newOffset) {
        this.setPosition(this.minH, newOffset);
        this.translateFn(this.scope.rzSliderModel, this.minLab, 'model');
        this.setPosition(this.minLab, this.getHandleLabelPos('minLab', newOffset));

        if (this.options.getPointerColor) {
          var pointercolor = this.getPointerColor('min');
          this.scope.minPointerStyle = {
            backgroundColor: pointercolor
          };
        }

        this.shFloorCeil();
      },

      /**
       * Update high slider handle position and label
       *
       * @param {number} newOffset
       * @returns {undefined}
       */
      updateHighHandle: function(newOffset) {
        this.setPosition(this.maxH, newOffset);
        this.translateFn(this.scope.rzSliderHigh, this.maxLab, 'high');
        this.setPosition(this.maxLab, this.getHandleLabelPos('maxLab', newOffset));

        if (this.options.getPointerColor) {
          var pointercolor = this.getPointerColor('max');
          this.scope.maxPointerStyle = {
            backgroundColor: pointercolor
          };
        }

        this.shFloorCeil();
      },

      /**
       * Show/hide floor/ceiling label
       *
       * @returns {undefined}
       */
      shFloorCeil: function() {
        var flHidden = false,
          clHidden = false,
          isRTL = this.options.rightToLeft,
          flrLabPos = this.flrLab.rzsp,
          flrLabDim = this.flrLab.rzsd,
          minLabPos = this.minLab.rzsp,
          minLabDim = this.minLab.rzsd,
          maxLabPos = this.maxLab.rzsp,
          maxLabDim = this.maxLab.rzsd,
          ceilLabPos = this.ceilLab.rzsp,
          halfHandle = this.handleHalfDim,
          isMinLabAtFloor = isRTL ? minLabPos + minLabDim >= flrLabPos - flrLabDim - 5 : minLabPos <= flrLabPos + flrLabDim + 5,
          isMinLabAtCeil = isRTL ? minLabPos - minLabDim <= ceilLabPos + halfHandle + 10 : minLabPos + minLabDim >= ceilLabPos - halfHandle - 10,
          isMaxLabAtFloor = isRTL ? maxLabPos >= flrLabPos - flrLabDim - halfHandle : maxLabPos <= flrLabPos + flrLabDim + halfHandle,
          isMaxLabAtCeil = isRTL ? maxLabPos - maxLabDim <= ceilLabPos + 10 : maxLabPos + maxLabDim >= ceilLabPos - 10;


        if (isMinLabAtFloor) {
          flHidden = true;
          this.hideEl(this.flrLab);
        } else {
          flHidden = false;
          this.showEl(this.flrLab);
        }

        if (isMinLabAtCeil) {
          clHidden = true;
          this.hideEl(this.ceilLab);
        } else {
          clHidden = false;
          this.showEl(this.ceilLab);
        }

        if (this.range) {
          if (isMaxLabAtCeil) {
            this.hideEl(this.ceilLab);
          } else if (!clHidden) {
            this.showEl(this.ceilLab);
          }

          // Hide or show floor label
          if (isMaxLabAtFloor) {
            this.hideEl(this.flrLab);
          } else if (!flHidden) {
            this.showEl(this.flrLab);
          }
        }
      },

      /**
       * Update slider selection bar, combined label and range label
       *
       * @returns {undefined}
       */
      updateSelectionBar: function() {
        var position = 0,
          dimension = 0,
          isSelectionBarFromRight = this.options.rightToLeft ? !this.options.showSelectionBarEnd : this.options.showSelectionBarEnd,
          positionForRange = this.options.rightToLeft ? this.maxH.rzsp + this.handleHalfDim : this.minH.rzsp + this.handleHalfDim;

        if (this.range) {
          dimension = Math.abs(this.maxH.rzsp - this.minH.rzsp);
          position = positionForRange;
        }
        else {
          if (this.options.showSelectionBarFromValue !== null) {
            var center = this.options.showSelectionBarFromValue,
              centerPosition = this.valueToOffset(center),
              isModelGreaterThanCenter = this.options.rightToLeft ? this.scope.rzSliderModel <= center : this.scope.rzSliderModel > center;
            if (isModelGreaterThanCenter) {
              dimension = this.minH.rzsp - centerPosition;
              position = centerPosition + this.handleHalfDim;
            }
            else {
              dimension = centerPosition - this.minH.rzsp;
              position = this.minH.rzsp + this.handleHalfDim;
            }
          }
          else if (isSelectionBarFromRight) {
            dimension = Math.abs(this.maxPos - this.minH.rzsp) + this.handleHalfDim;
            position = this.minH.rzsp + this.handleHalfDim;
          } else {
            dimension = Math.abs(this.maxH.rzsp - this.minH.rzsp) + this.handleHalfDim;
            position = 0;
          }
        }
        this.setDimension(this.selBar, dimension);
        this.setPosition(this.selBar, position);
        if (this.options.getSelectionBarColor) {
          var color = this.getSelectionBarColor();
          this.scope.barStyle = {
            backgroundColor: color
          };
        }
      },

      /**
       * Wrapper around the getSelectionBarColor of the user to pass to
       * correct parameters
       */
      getSelectionBarColor: function() {
        if (this.range)
          return this.options.getSelectionBarColor(this.scope.rzSliderModel, this.scope.rzSliderHigh);
        return this.options.getSelectionBarColor(this.scope.rzSliderModel);
      },

      /**
       * Wrapper around the getPointerColor of the user to pass to
       * correct parameters
       */
      getPointerColor: function(pointerType) {
        if (pointerType === 'max') {
          return this.options.getPointerColor(this.scope.rzSliderHigh, pointerType);
        }
        return this.options.getPointerColor(this.scope.rzSliderModel, pointerType);
      },

      /**
       * Update combined label position and value
       *
       * @returns {undefined}
       */
      updateCmbLabel: function() {
        var isLabelOverlap = null;
        if (this.options.rightToLeft) {
          isLabelOverlap = this.minLab.rzsp - this.minLab.rzsd - 10 <= this.maxLab.rzsp;
        } else {
          isLabelOverlap = this.minLab.rzsp + this.minLab.rzsd + 10 >= this.maxLab.rzsp;
        }

        if (isLabelOverlap) {
          var lowTr = this.getDisplayValue(this.scope.rzSliderModel, 'model'),
            highTr = this.getDisplayValue(this.scope.rzSliderHigh, 'high'),
            labelVal = '';
          if (lowTr === highTr) {
            labelVal = lowTr;
          } else {
            labelVal = this.options.rightToLeft ? highTr + ' - ' + lowTr : lowTr + ' - ' + highTr;
          }

          this.translateFn(labelVal, this.cmbLab, 'cmb', false);
          var pos = Math.min(
            Math.max(
              this.selBar.rzsp + this.selBar.rzsd / 2 - this.cmbLab.rzsd / 2,
              0
            ),
            this.barDimension - this.cmbLab.rzsd
          );
          this.setPosition(this.cmbLab, pos);
          this.hideEl(this.minLab);
          this.hideEl(this.maxLab);
          this.showEl(this.cmbLab);
        } else {
          this.showEl(this.maxLab);
          this.showEl(this.minLab);
          this.hideEl(this.cmbLab);
        }
      },

      /**
       * Return the translated value if a translate function is provided else the original value
       * @param value
       * @returns {*}
       */
      getDisplayValue: function(value, which) {
        return this.customTrFn(value, this.options.id, which);
      },

      /**
       * Round value to step and precision based on minValue
       *
       * @param {number} value
       * @returns {number}
       */
      roundStep: function(value) {
        var steppedDifference = parseFloat((value - this.minValue) / this.step).toPrecision(12);
        steppedDifference = Math.round(steppedDifference) * this.step;
        var newValue = (this.minValue + steppedDifference).toFixed(this.precision);
        return +newValue;
      },

      /**
       * Hide element
       *
       * @param element
       * @returns {jqLite} The jqLite wrapped DOM element
       */
      hideEl: function(element) {
        return element.css({
          opacity: 0
        });
      },

      /**
       * Show element
       *
       * @param element The jqLite wrapped DOM element
       * @returns {jqLite} The jqLite
       */
      showEl: function(element) {
        if (!!element.rzAlwaysHide) {
          return element;
        }

        return element.css({
          opacity: 1
        });
      },

      /**
       * Set element left/top offset depending on whether slider is horizontal or vertical
       *
       * @param {jqLite} elem The jqLite wrapped DOM element
       * @param {number} pos
       * @returns {number}
       */
      setPosition: function(elem, pos) {
        elem.rzsp = pos;
        var css = {};
        css[this.positionProperty] = pos + 'px';
        elem.css(css);
        return pos;
      },

      /**
       * Get element width/height depending on whether slider is horizontal or vertical
       *
       * @param {jqLite} elem The jqLite wrapped DOM element
       * @returns {number}
       */
      getDimension: function(elem) {
        var val = elem[0].getBoundingClientRect();
        if (this.options.vertical)
          elem.rzsd = (val.bottom - val.top) * this.options.scale;
        else
          elem.rzsd = (val.right - val.left) * this.options.scale;
        return elem.rzsd;
      },

      /**
       * Set element width/height depending on whether slider is horizontal or vertical
       *
       * @param {jqLite} elem  The jqLite wrapped DOM element
       * @param {number} dim
       * @returns {number}
       */
      setDimension: function(elem, dim) {
        elem.rzsd = dim;
        var css = {};
        css[this.dimensionProperty] = dim + 'px';
        elem.css(css);
        return dim;
      },

      /**
       * Translate value to pixel offset
       *
       * @param {number} val
       * @returns {number}
       */
      valueToOffset: function(val) {
        if (this.options.rightToLeft) {
          return (this.maxValue - this.sanitizeValue(val)) * this.maxPos / this.valueRange || 0;
        }
        return (this.sanitizeValue(val) - this.minValue) * this.maxPos / this.valueRange || 0;
      },

      /**
       * Returns a value that is within slider range
       *
       * @param {number} val
       * @returns {number}
       */
      sanitizeValue: function(val) {
        return Math.min(Math.max(val, this.minValue), this.maxValue);
      },

      /**
       * Translate offset to model value
       *
       * @param {number} offset
       * @returns {number}
       */
      offsetToValue: function(offset) {
        if (this.options.rightToLeft) {
          return (1 - (offset / this.maxPos)) * this.valueRange + this.minValue;
        }
        return (offset / this.maxPos) * this.valueRange + this.minValue;
      },

      // Events

      /**
       * Get the X-coordinate or Y-coordinate of an event
       *
       * @param {Object} event  The event
       * @returns {number}
       */
      getEventXY: function(event) {
        /* http://stackoverflow.com/a/12336075/282882 */
        //noinspection JSLint
        var clientXY = this.options.vertical ? 'clientY' : 'clientX';
        if (clientXY in event) {
          return event[clientXY];
        }

        return event.originalEvent === undefined ?
          event.touches[0][clientXY] : event.originalEvent.touches[0][clientXY];
      },

      /**
       * Compute the event position depending on whether the slider is horizontal or vertical
       * @param event
       * @returns {number}
       */
      getEventPosition: function(event) {
        var sliderPos = this.sliderElem.rzsp,
          eventPos = 0;
        if (this.options.vertical)
          eventPos = -this.getEventXY(event) + sliderPos;
        else
          eventPos = this.getEventXY(event) - sliderPos;
        return (eventPos - this.handleHalfDim) * this.options.scale;
      },

      /**
       * Get event names for move and event end
       *
       * @param {Event}    event    The event
       *
       * @return {{moveEvent: string, endEvent: string}}
       */
      getEventNames: function(event) {
        var eventNames = {
          moveEvent: '',
          endEvent: ''
        };

        if (event.touches || (event.originalEvent !== undefined && event.originalEvent.touches)) {
          eventNames.moveEvent = 'touchmove';
          eventNames.endEvent = 'touchend';
        } else {
          eventNames.moveEvent = 'mousemove';
          eventNames.endEvent = 'mouseup';
        }

        return eventNames;
      },

      /**
       * Get the handle closest to an event.
       *
       * @param event {Event} The event
       * @returns {jqLite} The handle closest to the event.
       */
      getNearestHandle: function(event) {
        if (!this.range) {
          return this.minH;
        }
        var offset = this.getEventPosition(event),
          distanceMin = Math.abs(offset - this.minH.rzsp),
          distanceMax = Math.abs(offset - this.maxH.rzsp);
        if (distanceMin < distanceMax)
          return this.minH;
        else if (distanceMin > distanceMax)
          return this.maxH;
        else if (!this.options.rightToLeft)
        //if event is at the same distance from min/max then if it's at left of minH, we return minH else maxH
          return offset < this.minH.rzsp ? this.minH : this.maxH;
        else
        //reverse in rtl
          return offset > this.minH.rzsp ? this.minH : this.maxH;
      },

      /**
       * Wrapper function to focus an angular element
       *
       * @param el {AngularElement} the element to focus
       */
      focusElement: function(el) {
        var DOM_ELEMENT = 0;
        el[DOM_ELEMENT].focus();
      },

      /**
       * Bind mouse and touch events to slider handles
       *
       * @returns {undefined}
       */
      bindEvents: function() {
        var barTracking, barStart, barMove;

        if (this.options.draggableRange) {
          barTracking = 'rzSliderDrag';
          barStart = this.onDragStart;
          barMove = this.onDragMove;
        } else {
          barTracking = 'rzSliderModel';
          barStart = this.onStart;
          barMove = this.onMove;
        }

        if (!this.options.onlyBindHandles) {
          this.selBar.on('mousedown', angular.bind(this, barStart, null, barTracking));
          this.selBar.on('mousedown', angular.bind(this, barMove, this.selBar));
        }

        if (this.options.draggableRangeOnly) {
          this.minH.on('mousedown', angular.bind(this, barStart, null, barTracking));
          this.maxH.on('mousedown', angular.bind(this, barStart, null, barTracking));
        } else {
          this.minH.on('mousedown', angular.bind(this, this.onStart, this.minH, 'rzSliderModel'));
          if (this.range) {
            this.maxH.on('mousedown', angular.bind(this, this.onStart, this.maxH, 'rzSliderHigh'));
          }
          if (!this.options.onlyBindHandles) {
            this.fullBar.on('mousedown', angular.bind(this, this.onStart, null, null));
            this.fullBar.on('mousedown', angular.bind(this, this.onMove, this.fullBar));
            this.ticks.on('mousedown', angular.bind(this, this.onStart, null, null));
            this.ticks.on('mousedown', angular.bind(this, this.onMove, this.ticks));
          }
        }

        if (!this.options.onlyBindHandles) {
          this.selBar.on('touchstart', angular.bind(this, barStart, null, barTracking));
          this.selBar.on('touchstart', angular.bind(this, barMove, this.selBar));
        }
        if (this.options.draggableRangeOnly) {
          this.minH.on('touchstart', angular.bind(this, barStart, null, barTracking));
          this.maxH.on('touchstart', angular.bind(this, barStart, null, barTracking));
        } else {
          this.minH.on('touchstart', angular.bind(this, this.onStart, this.minH, 'rzSliderModel'));
          if (this.range) {
            this.maxH.on('touchstart', angular.bind(this, this.onStart, this.maxH, 'rzSliderHigh'));
          }
          if (!this.options.onlyBindHandles) {
            this.fullBar.on('touchstart', angular.bind(this, this.onStart, null, null));
            this.fullBar.on('touchstart', angular.bind(this, this.onMove, this.fullBar));
            this.ticks.on('touchstart', angular.bind(this, this.onStart, null, null));
            this.ticks.on('touchstart', angular.bind(this, this.onMove, this.ticks));
          }
        }

        if (this.options.keyboardSupport) {
          this.minH.on('focus', angular.bind(this, this.onPointerFocus, this.minH, 'rzSliderModel'));
          if (this.range) {
            this.maxH.on('focus', angular.bind(this, this.onPointerFocus, this.maxH, 'rzSliderHigh'));
          }
        }
      },

      /**
       * Unbind mouse and touch events to slider handles
       *
       * @returns {undefined}
       */
      unbindEvents: function() {
        this.minH.off();
        this.maxH.off();
        this.fullBar.off();
        this.selBar.off();
        this.ticks.off();
      },

      /**
       * onStart event handler
       *
       * @param {?Object} pointer The jqLite wrapped DOM element; if null, the closest handle is used
       * @param {?string} ref     The name of the handle being changed; if null, the closest handle's value is modified
       * @param {Event}   event   The event
       * @returns {undefined}
       */
      onStart: function(pointer, ref, event) {
        var ehMove, ehEnd,
          eventNames = this.getEventNames(event);

        event.stopPropagation();
        event.preventDefault();

        // We have to do this in case the HTML where the sliders are on
        // have been animated into view.
        this.calcViewDimensions();

        if (pointer) {
          this.tracking = ref;
        } else {
          pointer = this.getNearestHandle(event);
          this.tracking = pointer === this.minH ? 'rzSliderModel' : 'rzSliderHigh';
        }

        pointer.addClass('rz-active');

        if (this.options.keyboardSupport)
          this.focusElement(pointer);

        ehMove = angular.bind(this, this.dragging.active ? this.onDragMove : this.onMove, pointer);
        ehEnd = angular.bind(this, this.onEnd, ehMove);

        $document.on(eventNames.moveEvent, ehMove);
        $document.one(eventNames.endEvent, ehEnd);
        this.callOnStart();
      },

      /**
       * onMove event handler
       *
       * @param {jqLite} pointer
       * @param {Event}  event The event
       * @returns {undefined}
       */
      onMove: function(pointer, event) {
        var newOffset = this.getEventPosition(event),
          newValue,
          ceilValue = this.options.rightToLeft ? this.minValue : this.maxValue,
          flrValue = this.options.rightToLeft ? this.maxValue : this.minValue;

        if (newOffset <= 0) {
          newValue = flrValue;
        } else if (newOffset >= this.maxPos) {
          newValue = ceilValue;
        } else {
          newValue = this.offsetToValue(newOffset);
          newValue = this.roundStep(newValue);
        }
        this.positionTrackingHandle(newValue);
      },

      /**
       * onEnd event handler
       *
       * @param {Event}    event    The event
       * @param {Function} ehMove   The the bound move event handler
       * @returns {undefined}
       */
      onEnd: function(ehMove, event) {
        var moveEventName = this.getEventNames(event).moveEvent;

        if (!this.options.keyboardSupport) {
          this.minH.removeClass('rz-active');
          this.maxH.removeClass('rz-active');
          this.tracking = '';
        }
        this.dragging.active = false;

        $document.off(moveEventName, ehMove);
        this.scope.$emit('slideEnded');
        this.callOnEnd();
      },

      onPointerFocus: function(pointer, ref) {
        this.tracking = ref;
        pointer.one('blur', angular.bind(this, this.onPointerBlur, pointer));
        pointer.on('keydown', angular.bind(this, this.onKeyboardEvent));
        pointer.addClass('rz-active');
      },

      onPointerBlur: function(pointer) {
        pointer.off('keydown');
        this.tracking = '';
        pointer.removeClass('rz-active');
      },

      /**
       * Key actions helper function
       *
       * @param {number} currentValue value of the slider
       *
       * @returns {?Object} action value mappings
       */
      getKeyActions: function(currentValue) {
        var increaseStep = currentValue + this.step,
          decreaseStep = currentValue - this.step,
          increasePage = currentValue + this.valueRange / 10,
          decreasePage = currentValue - this.valueRange / 10;

        //Left to right default actions
        var actions = {
          'UP': increaseStep,
          'DOWN': decreaseStep,
          'LEFT': decreaseStep,
          'RIGHT': increaseStep,
          'PAGEUP': increasePage,
          'PAGEDOWN': decreasePage,
          'HOME': this.minValue,
          'END': this.maxValue
        };
        //right to left means swapping right and left arrows
        if (this.options.rightToLeft) {
          actions.LEFT = increaseStep;
          actions.RIGHT = decreaseStep;
          // right to left and vertical means we also swap up and down
          if (this.options.vertical) {
            actions.UP = decreaseStep;
            actions.DOWN = increaseStep;
          }
        }
        return actions;
      },

      onKeyboardEvent: function(event) {
        var currentValue = this.scope[this.tracking],
          keyCode = event.keyCode || event.which,
          keys = {
            38: 'UP',
            40: 'DOWN',
            37: 'LEFT',
            39: 'RIGHT',
            33: 'PAGEUP',
            34: 'PAGEDOWN',
            36: 'HOME',
            35: 'END'
          },
          actions = this.getKeyActions(currentValue),
          key = keys[keyCode],
          action = actions[key];
        if (action == null || this.tracking === '') return;
        event.preventDefault();

        var newValue = this.roundStep(this.sanitizeValue(action));
        if (!this.options.draggableRangeOnly) {
          this.positionTrackingHandle(newValue);
        } else {
          var difference = this.scope.rzSliderHigh - this.scope.rzSliderModel,
            newMinValue, newMaxValue;
          if (this.tracking === 'rzSliderModel') {
            newMinValue = newValue;
            newMaxValue = newValue + difference;
            if (newMaxValue > this.maxValue) {
              newMaxValue = this.maxValue;
              newMinValue = newMaxValue - difference;
            }
          } else {
            newMaxValue = newValue;
            newMinValue = newValue - difference;
            if (newMinValue < this.minValue) {
              newMinValue = this.minValue;
              newMaxValue = newMinValue + difference;
            }
          }
          this.positionTrackingBar(newMinValue, newMaxValue);
        }
      },

      /**
       * onDragStart event handler
       *
       * Handles dragging of the middle bar.
       *
       * @param {Object} pointer The jqLite wrapped DOM element
       * @param {string} ref     One of the refLow, refHigh values
       * @param {Event}  event   The event
       * @returns {undefined}
       */
      onDragStart: function(pointer, ref, event) {
        var offset = this.getEventPosition(event);
        this.dragging = {
          active: true,
          value: this.offsetToValue(offset),
          difference: this.scope.rzSliderHigh - this.scope.rzSliderModel,
          lowLimit: this.options.rightToLeft ? this.minH.rzsp - offset : offset - this.minH.rzsp,
          highLimit: this.options.rightToLeft ? offset - this.maxH.rzsp : this.maxH.rzsp - offset
        };

        this.onStart(pointer, ref, event);
      },

      /**
       * getValue helper function
       *
       * gets max or min value depending on whether the newOffset is outOfBounds above or below the bar and rightToLeft
       *
       * @param {string} type 'max' || 'min' The value we are calculating
       * @param {number} newOffset  The new offset
       * @param {boolean} outOfBounds Is the new offset above or below the max/min?
       * @param {boolean} isAbove Is the new offset above the bar if out of bounds?
       *
       * @returns {number}
       */
      getValue: function(type, newOffset, outOfBounds, isAbove) {
        var isRTL = this.options.rightToLeft,
          value = null;

        if (type === 'min') {
          if (outOfBounds) {
            if (isAbove) {
              value = isRTL ? this.minValue : this.maxValue - this.dragging.difference;
            } else {
              value = isRTL ? this.maxValue - this.dragging.difference : this.minValue;
            }
          } else {
            value = isRTL ? this.offsetToValue(newOffset + this.dragging.lowLimit) : this.offsetToValue(newOffset - this.dragging.lowLimit)
          }
        } else {
          if (outOfBounds) {
            if (isAbove) {
              value = isRTL ? this.minValue + this.dragging.difference : this.maxValue;
            } else {
              value = isRTL ? this.maxValue : this.minValue + this.dragging.difference;
            }
          } else {
            if (isRTL) {
              value = this.offsetToValue(newOffset + this.dragging.lowLimit) + this.dragging.difference
            } else {
              value = this.offsetToValue(newOffset - this.dragging.lowLimit) + this.dragging.difference;
            }
          }
        }
        return this.roundStep(value);
      },

      /**
       * onDragMove event handler
       *
       * Handles dragging of the middle bar.
       *
       * @param {jqLite} pointer
       * @param {Event}  event The event
       * @returns {undefined}
       */
      onDragMove: function(pointer, event) {
        var newOffset = this.getEventPosition(event),
          newMinValue, newMaxValue,
          ceilLimit, flrLimit,
          isUnderFlrLimit, isOverCeilLimit,
          flrH, ceilH;

        if (this.options.rightToLeft) {
          ceilLimit = this.dragging.lowLimit;
          flrLimit = this.dragging.highLimit;
          flrH = this.maxH;
          ceilH = this.minH;
        } else {
          ceilLimit = this.dragging.highLimit;
          flrLimit = this.dragging.lowLimit;
          flrH = this.minH;
          ceilH = this.maxH;
        }
        isUnderFlrLimit = newOffset <= flrLimit;
        isOverCeilLimit = newOffset >= this.maxPos - ceilLimit;

        if (isUnderFlrLimit) {
          if (flrH.rzsp === 0)
            return;
          newMinValue = this.getValue('min', newOffset, true, false);
          newMaxValue = this.getValue('max', newOffset, true, false);
        } else if (isOverCeilLimit) {
          if (ceilH.rzsp === this.maxPos)
            return;
          newMaxValue = this.getValue('max', newOffset, true, true);
          newMinValue = this.getValue('min', newOffset, true, true);
        } else {
          newMinValue = this.getValue('min', newOffset, false);
          newMaxValue = this.getValue('max', newOffset, false);
        }
        this.positionTrackingBar(newMinValue, newMaxValue);
      },

      /**
       * Set the new value and offset for the entire bar
       *
       * @param {number} newMinValue   the new minimum value
       * @param {number} newMaxValue   the new maximum value
       */
      positionTrackingBar: function(newMinValue, newMaxValue) {
        this.scope.rzSliderModel = newMinValue;
        this.scope.rzSliderHigh = newMaxValue;
        this.updateHandles('rzSliderModel', this.valueToOffset(newMinValue));
        this.updateHandles('rzSliderHigh', this.valueToOffset(newMaxValue));
        this.applyModel();
      },

      /**
       * Set the new value and offset to the current tracking handle
       *
       * @param {number} newValue new model value
       */
      positionTrackingHandle: function(newValue) {
        var valueChanged = false;

        if (this.range) {
          newValue = this.applyMinRange(newValue);
          /* This is to check if we need to switch the min and max handles */
          if (this.tracking === 'rzSliderModel' && newValue > this.scope.rzSliderHigh) {
            if (this.options.noSwitching && this.scope.rzSliderHigh !== this.minValue) {
              newValue = this.applyMinRange(this.scope.rzSliderHigh);
            }
            else {
              this.scope[this.tracking] = this.scope.rzSliderHigh;
              this.updateHandles(this.tracking, this.maxH.rzsp);
              this.updateAriaAttributes();
              this.tracking = 'rzSliderHigh';
              this.minH.removeClass('rz-active');
              this.maxH.addClass('rz-active');
              if (this.options.keyboardSupport)
                this.focusElement(this.maxH);
            }
            valueChanged = true;
          } else if (this.tracking === 'rzSliderHigh' && newValue < this.scope.rzSliderModel) {
            if (this.options.noSwitching && this.scope.rzSliderModel !== this.maxValue) {
              newValue = this.applyMinRange(this.scope.rzSliderModel);
            }
            else {
              this.scope[this.tracking] = this.scope.rzSliderModel;
              this.updateHandles(this.tracking, this.minH.rzsp);
              this.updateAriaAttributes();
              this.tracking = 'rzSliderModel';
              this.maxH.removeClass('rz-active');
              this.minH.addClass('rz-active');
              if (this.options.keyboardSupport)
                this.focusElement(this.minH);
            }
            valueChanged = true;
          }
        }

        if (this.scope[this.tracking] !== newValue) {
          this.scope[this.tracking] = newValue;
          this.updateHandles(this.tracking, this.valueToOffset(newValue));
          this.updateAriaAttributes();
          valueChanged = true;
        }

        if (valueChanged)
          this.applyModel();
      },

      applyMinRange: function(newValue) {
        if (this.options.minRange !== 0) {
          var oppositeValue = this.tracking === 'rzSliderModel' ? this.scope.rzSliderHigh : this.scope.rzSliderModel,
            difference = Math.abs(newValue - oppositeValue);

          if (difference < this.options.minRange) {
            if (this.tracking === 'rzSliderModel')
              return this.scope.rzSliderHigh - this.options.minRange;
            else
              return this.scope.rzSliderModel + this.options.minRange;
          }
        }
        return newValue;
      },

      /**
       * Apply the model values using scope.$apply.
       * We wrap it with the internalChange flag to avoid the watchers to be called
       */
      applyModel: function() {
        this.internalChange = true;
        this.scope.$apply();
        this.callOnChange();
        this.internalChange = false;
      },

      /**
       * Call the onStart callback if defined
       * The callback call is wrapped in a $evalAsync to ensure that its result will be applied to the scope.
       *
       * @returns {undefined}
       */
      callOnStart: function() {
        if (this.options.onStart) {
          var self = this;
          this.scope.$evalAsync(function() {
            self.options.onStart(self.options.id, self.scope.rzSliderModel, self.scope.rzSliderHigh);
          });
        }
      },

      /**
       * Call the onChange callback if defined
       * The callback call is wrapped in a $evalAsync to ensure that its result will be applied to the scope.
       *
       * @returns {undefined}
       */
      callOnChange: function() {
        if (this.options.onChange) {
          var self = this;
          this.scope.$evalAsync(function() {
            self.options.onChange(self.options.id, self.scope.rzSliderModel, self.scope.rzSliderHigh);
          });
        }
      },

      /**
       * Call the onEnd callback if defined
       * The callback call is wrapped in a $evalAsync to ensure that its result will be applied to the scope.
       *
       * @returns {undefined}
       */
      callOnEnd: function() {
        if (this.options.onEnd) {
          var self = this;
          this.scope.$evalAsync(function() {
            self.options.onEnd(self.options.id, self.scope.rzSliderModel, self.scope.rzSliderHigh);
          });
        }
      }
    };

    return Slider;
  }])

  .directive('rzslider', ['RzSlider', function(RzSlider) {
    'use strict';

    return {
      restrict: 'E',
      scope: {
        rzSliderModel: '=?',
        rzSliderHigh: '=?',
        rzSliderOptions: '&?',
        rzSliderTplUrl: '@'
      },

      /**
       * Return template URL
       *
       * @param {jqLite} elem
       * @param {Object} attrs
       * @return {string}
       */
      templateUrl: function(elem, attrs) {
        //noinspection JSUnresolvedVariable
        return attrs.rzSliderTplUrl || 'rzSliderTpl.html';
      },

      link: function(scope, elem) {
        scope.slider = new RzSlider(scope, elem); //attach on scope so we can test it
      }
    };
  }]);

  // IDE assist

  /**
   * @name ngScope
   *
   * @property {number} rzSliderModel
   * @property {number} rzSliderHigh
   * @property {Object} rzSliderOptions
   */

  /**
   * @name jqLite
   *
   * @property {number|undefined} rzsp rzslider label position offset
   * @property {number|undefined} rzsd rzslider element dimension
   * @property {string|undefined} rzsv rzslider label value/text
   * @property {Function} css
   * @property {Function} text
   */

  /**
   * @name Event
   * @property {Array} touches
   * @property {Event} originalEvent
   */

  /**
   * @name ThrottleOptions
   *
   * @property {boolean} leading
   * @property {boolean} trailing
   */

  module.run(['$templateCache', function($templateCache) {
  'use strict';

  $templateCache.put('rzSliderTpl.html',
    "<span class=rz-bar-wrapper><span class=rz-bar></span></span> <span class=rz-bar-wrapper><span class=\"rz-bar rz-selection\" ng-style=barStyle></span></span> <span class=\"rz-pointer rz-pointer-min\" ng-style=minPointerStyle></span> <span class=\"rz-pointer rz-pointer-max\" ng-style=maxPointerStyle></span> <span class=\"rz-bubble rz-limit\"></span> <span class=\"rz-bubble rz-limit\"></span> <span class=rz-bubble></span> <span class=rz-bubble></span> <span class=rz-bubble></span><ul ng-show=showTicks class=rz-ticks><li ng-repeat=\"t in ticks track by $index\" class=rz-tick ng-class=\"{'rz-selected': t.selected}\" ng-style=t.style ng-attr-uib-tooltip=\"{{ t.tooltip }}\" ng-attr-tooltip-placement={{t.tooltipPlacement}} ng-attr-tooltip-append-to-body=\"{{ t.tooltip ? true : undefined}}\"><span ng-if=\"t.value != null\" class=rz-tick-value ng-attr-uib-tooltip=\"{{ t.valueTooltip }}\" ng-attr-tooltip-placement={{t.valueTooltipPlacement}}>{{ t.value }}</span></li></ul>"
  );

}]);

  return module
}));
