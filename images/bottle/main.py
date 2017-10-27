from bottle import route, run, template, static_file, response, get, request
from json import dumps, loads
import requests


@route('/api/')
def api_root():
	response.content_type = 'application/json'
	res = {'response': "up"}
	return template(dumps(res))

@route('/api/search')
def search():
	try:
		query = request.query['q']
	except:
		query = "*"

	# request to the API
	url = "http://35.184.245.255:8764/api/apollo/query-pipelines/default/collections/default/select?wt=json&rows=10&q=%s" % query

	username = 'admin'
	password = 'f00bar222'
	output = requests.get(url, auth=(username, password))
	obj = loads(output.content)
	oi = obj['response']['docs']

	foo = {'response': [], 'results': 0}
	for i, entry in enumerate(oi):
		foo['response'].append({"id": entry['id'], "score": entry['score']})
		foo['results'] = i+1

	response.content_type = 'application/json'
	return template(dumps(foo))

@route('/api/<method>')
def api(method="root"):
    response.content_type = 'application/json'
    res = {'response': 'up'}
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
