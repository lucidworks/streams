from bottle import route, run, template

@route('/api/')
def api():
    from bottle import response
    from json import dumps
    response.content_type = 'application/json'
    res = {'x': 1}
    return template(dumps(res))

run(host='0.0.0.0', port=8081)
