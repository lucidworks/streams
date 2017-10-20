from bottle import route, run, template

@route('/api/')
def api():
    return template("{'x': 1}")

run(host='0.0.0.0', port=8081)
