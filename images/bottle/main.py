from bottle import route, run, template, static_file, response, get
from json import dumps
import urllib2

auth_handler = urllib2.HTTPBasicAuthHandler()
auth_handler.add_password(realm='Fusion Server',
                          uri='http://104.155.151.237:8764/',
                          user='admin',
                          passwd='f00bar222')
opener = urllib2.build_opener(auth_handler)
urllib2.install_opener(opener)

@route('/api/')
def api_root():
	response.content_type = 'application/json'
	res = {'x': 1}
	return template(dumps(res))

@route('/api/<method>')
def api(method="root"):
    response.content_type = 'application/json'
    res = {'x': 1, 'method': method}
    return template(dumps(res))

# Static Routes
@get("/static/css/<filepath:re:.*\.css>")
def css(filepath):
    return static_file(filepath, root="static/css")

@get("/static/font/<filepath:re:.*\.(eot|otf|svg|ttf|woff|woff2?)>")
def font(filepath):
    return static_file(filepath, root="static/font")

@get("/static/img/<filepath:re:.*\.(jpg|png|gif|ico|svg)>")
def img(filepath):
    return static_file(filepath, root="static/img")

@get("/static/js/<filepath:re:.*\.js>")
def js(filepath):
    return static_file(filepath, root="static/js")

run(host='0.0.0.0', port=8081)
