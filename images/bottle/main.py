from bottle import route, run, template, static_file, response, get, request
from json import dumps, loads
import requests
from clarifai import rest
from clarifai.rest import ClarifaiApp

@route('/api/')
def api_root():
	response.content_type = 'application/json'
	res = {'response': 'ok'}
	return template(dumps(res))

@route('/api/search')
def search():
	try:
		query = request.query['q']
	except:
		query = "*"

	# request to the API
	url = "https://api.wisdom.sh/lucidlabs/api/apollo/query-pipelines/default/collections/default/select?wt=json&rows=10&q=%s" % query
 
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

@route('/api/crawl', method='POST')
def crawl():
    response.content_type = 'application/json'
    print request.json
    return template(dumps({'response': 'ok'}))

@route('/api/perceive', method='POST')
def perceive():
    response.content_type = 'application/json'
    try:
        image_url = request.query['image']
        doc_id = request.query['id']
    except:
        return template(dumps({'response': 'need parameters for doc [id], and [image] url'}))

    # connect to the general model
    app = ClarifaiApp(api_key='c6de746c05d2417589ea19e458154f22')
    model = app.models.get("general-v1.3")
	
    itsays = model.predict_by_url(url=image_url)
    output = {'response': []}
    for item in itsays['outputs'][0]['data']['concepts']:
         output['response'].append(item['name'])
    return template(dumps(output))

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

run(host='0.0.0.0', port=8080)
