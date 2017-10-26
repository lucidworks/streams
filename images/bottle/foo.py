#!flask/bin/python
from flask import render_template
from flask import Flask, jsonify
import urllib2

app = Flask(__name__)

auth_handler = urllib2.HTTPBasicAuthHandler()
auth_handler.add_password(realm='Fusion Server',
                          uri='http://104.155.151.237:8764/',
                          user='admin',
                          passwd='f00bar222')
opener = urllib2.build_opener(auth_handler)
urllib2.install_opener(opener)

@app.route('/')
def hello():
    return render_template('hello.html')

@app.route('/search')
def search():
	url = "http://104.155.151.237:8764/api/apollo/query-pipelines/default/collections/default/select?wt=json&rows=10&q=%s"
	f = urllib2.urlopen(url % "video") # search for video
	output = f.read()
	return jsonify(output)
    #return render_template('search.html')

# define tasks to jsonify
tasks = [
    {
        'id': 1,
        'title': u'Buy groceries',
        'description': u'Milk, Cheese, Pizza, Fruit, Tylenol', 
        'done': False
    },
    {
        'id': 2,
        'title': u'Learn Python',
        'description': u'Need to find a good Python tutorial on the web', 
        'done': False
    }
]

@app.route('/tasks', methods=['GET'])
def get_tasks():
    return jsonify({'tasks': tasks})

if __name__ == '__main__':
    app.run(host='0.0.0.0')
