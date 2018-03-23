import os

from json import dumps, loads
import requests

from bottle import route, run, template, static_file, response, get, request, TEMPLATE_PATH

from clarifai import rest
from clarifai.rest import ClarifaiApp

TEMPLATE_PATH.insert(0, '/app/views/')

@route('/demo/')
@route('/demo/<q>')
def demo(q='wood'):
    return template('demo.tpl', q=q)

@route('/api/')
def api_root():
    response.content_type = 'application/json'
    res = {'response': 'ok'}
    return template(dumps(res))

@route('/api/splunk', method='POST')
def splunk():
    try:
        query = "*"
    except:
        query = "*"
    return template(dumps(query))

@route('/api/search')
def search():
    try:
        query = request.query['q']
    except:
        query = "*"

    print "foo"
    # request to the API
    # docs for wisdom proxy: https://wisdom.sh/docs
    url = "https://api.wisdom.sh/fusion/api/apollo/query-pipelines/default/collections/default/select?wt=json&rows=50&q=%s" % query
 
    username = 'admin'
    password = 'f00bar222'
    output = requests.get(url, auth=(username, password))

    obj = loads(output.content)
    oi = obj['response']['docs']

    foo = {'response': [], 'results': 0}
    for i, entry in enumerate(oi):
        try:
            foo['response'].append({"id": entry['id'], "score": entry['score'], "tags": entry['tags'], "image": entry['image_s']})
            foo['results'] = i+1
        except:
            pass # some key missing

    response.content_type = 'application/json'
    return template(dumps(foo))

@route('/api/crawl', method='POST')
def crawl():
    response.content_type = 'application/json'
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

run(host='0.0.0.0', port=8082)
