from bottle import route, run, template, static_file

@route('/api/<method>')
def api(method):
    from bottle import response
    from json import dumps
    response.content_type = 'application/json'
    res = {'x': 1, 'method': method}
    return template(dumps(res))

@route('/static/<filename>')
def server_static(filename):
    return static_file(filename, root='/static')

run(host='0.0.0.0', port=8081)
