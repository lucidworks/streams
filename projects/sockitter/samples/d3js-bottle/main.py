####
####
import os
from json import dumps, loads
import requests
from bottle import route, run, template, static_file, response, get, request, TEMPLATE_PATH

@route('/mexico-mention')
def mexicomention():
    try:
        q = request.query['q']
    except:
        q = "JoseAMeadeK"

    return template('mexico-mention.tpl', rt='0', q=q)

@route('/mexico-relation')
def mexicorelation():
    try:
        q = request.query['q']
    except:
        q = "JoseAMeadeK"

    return template('mexico-relation.tpl', rt='0', q=q)

@route('/mexico-candidates')
def mexicocandidates():
    try:
        rt = request.query['rt']
    except:
        rt = "0"
    return template('mexico-candidates.tpl', rt=rt)


@route('/mexico-account')
def mexicoaccount():
    try:
        q = request.query['q']
        rt = request.query['rt']
    except:
        print "error in parms"
        q = "JoseAMeadeK"
        rt = "0"

    try:
        field = request.query['field']
    except:
        field = "userScreenName_t"

    return template('mexico-account.tpl', q=q, rt=rt, field=field)


@route('/turkey-candidate')
def turkey():
    return template('turkey-candidates.tpl')


@route('/api/')
def api_root():
    response.content_type = 'application/json'
    res = {'response': 'ok'}
    return template(dumps(res))


@route('/api/relation')
def relation():
    try:
        ip = request.query['ip']
        q = request.query['q']
    except:
        foo = {'message': "error: need params"}
        response.content_type = 'application/json'
        return template(dumps(foo))

    # request to the SKG API
    jsondata = """
    {
        "queries" : ["%s"],
        "compare" : [ 
            {
    	    "type": "tweet_t",
                "limit": 100,
                "sort": "relatedness",
                "discover_values": true
            }
        ]
    }
    """ % q

    url = "http://%s:8983/solr/sockitter/skg?qf=tweet_t" % ip
    r = requests.post(url, json=loads(jsondata))

    # return object
    data = []

    things = r.json()

    for item in things['data'][0]['values']:
        if item['relatedness'] > -100.0 or True:
            data.append({"id": item['name'], "value": item['relatedness']})  
            # limit to 75 items
            if len(data) > 75:
                break

    response.content_type = 'application/json'
    if len(data) > 0:
        return template(dumps((data)))
    else:
        return template(dumps(({})))

@route('/api/mention')
def mention():
    try:
        ip = request.query['ip']
        q = request.query['q']
    except:
        foo = {'message': "error: need params"}
        response.content_type = 'application/json'
        return template(dumps(foo))

    # request to the API
    # docs for wisdom proxy: https://wisdom.sh/docs
    url = "http://%s:8764/api/apollo/apps/sockitter/query-pipelines/sockitter/collections/sockitter/select" % ip

    # build query payload
    payload = {
        'debug': 'true',
        'echoParams': 'all',
        'f.userMentionScreenName_txt.facet.limit': 75,
        'facet.field': 'userMentionScreenName_txt',
        'wt': 'json',
        'q': '%s' % (q) 
    }
   
    # query fusion
    auth = ('admin', 'abc123')
    r = requests.get(url, params=payload, auth=auth)

    # return object
    data = []

    # iterate over facet objects (alternating value/field name) 
    items = iter(r.json()['facet_counts']['facet_fields']['userMentionScreenName_txt'])

    tcount = 0
    for item in items: 
        iname = item
        ivalue = next(items)

        data.append({"id": iname, "value": ivalue})  
        tcount = tcount + ivalue

    # if only a few data points, but lots of tweets, let's watch them
    if len(data) < 10:
        print "adding user to watch"
        url = "http://%s:8780/sockitter-editor/api/add?ds_name=tweets&screen_name=%s" % (ip, q) 
        r = requests.post(url) 
 
    response.content_type = 'application/json'
    if len(data) > 0:
        return template(dumps((data)))
    else:
        return template(dumps(({})))


@route('/api/account')
def account():
    try:
        ip = request.query['ip']
        rt = request.query['rt']
        q = request.query['q']
    except:
        foo = {'message': "error: need params"}
        response.content_type = 'application/json'
        return template(dumps(foo))

    try:
        field = request.query['field']
    except:
        field = "userScreenName_t"

    # request to the API
    # docs for wisdom proxy: https://wisdom.sh/docs
    url = "http://%s:8764/api/apollo/apps/sockitter/query-pipelines/sockitter/collections/sockitter/select" % ip

    extra = ""
    if rt == '0':
        extra = "AND -RT"
        print "no RTs"

    # build query payload
    payload = {
        'debug': 'true',
        'echoParams': 'all',
        'f.userScreenName_t.facet.limit': 75,
        'f.tagText_t.facet.limit': 75,
        'f.userMentionScreenName_t.facet.limit': 75,
        'f.inReplyToScreenName_t.facet.limit': 75,
        'facet.field': 'userScreenName_t',
        'facet.field': 'tagText_t',
        'facet.field': 'userMentionScreenName_t',
        'facet.field': 'inReplyToScreenName_s',
        'wt': 'json',
        'q': '%s %s' % (q, extra) 
    }
   
    # query fusion
    auth = ('admin', 'f00bar222')
    r = requests.get(url, params=payload, auth=auth)

    # return object
    data = []

    # iterate over facet objects (alternating value/field name) 
    items = iter(r.json()['facet_counts']['facet_fields'][field])

    tcount = 0
    for item in items: 
        iname = item
        ivalue = next(items)

        # if result matches what we searched for, we might dump it
        if iname.lower() == q.lower():
            # but only if it's not themselves, which we want to show
            if field == "userScreenName_t":
                data.append({"id": iname, "value": ivalue})  
                tcount = tcount + ivalue
        else:
            # filter out the zeros
            if field == "inReplyToScreenName_s":
                if ivalue > 1:
                    data.append({"id": iname, "value": ivalue})  
                    tcount = tcount + ivalue
            else:
                data.append({"id": iname, "value": ivalue})  
                tcount = tcount + ivalue

    # if only a few data points, but lots of tweets, let's watch them
    if len(data) < 10 and tcount > 10:
        print "adding user to watch"
        url = "http://%s:8780/sockitter-editor/api/add?ds_name=tweets&screen_name=%s" % (ip, q) 
        r = requests.post(url) 
 
    response.content_type = 'application/json'
    if len(data) > 0:
        return template(dumps((data)))
    else:
        return template(dumps(({})))

@route('/api/candidates')
def candidates():
    try:
        ip = request.query['ip']
        rt = request.query['rt']
    except:
        foo = {'message': "error: need params"}
        response.content_type = 'application/json'
        return template(dumps(foo))

    # request to the API
    # docs for wisdom proxy: https://wisdom.sh/docs
    url = "http://%s:8764/api/apollo/apps/sockitter/query-pipelines/sockitter/collections/sockitter/select" % ip

    extra = ""
    if rt == '0':
        extra = "AND -RT"
        print "dropping RTs"

    # output 
    nodes = []
    links = []

    # loop through candidates 
    group = 0   
    for candidateScreenName in ["RicardoAnayaC", "lopezobrador_", "JoseAMeadeK", "JaimeRdzNL"]:
        print candidateScreenName
        group = group + 1

        # build query payload
        payload = {
            'debug': 'true',
            'echoParams': 'all',
            'f.userScreenName_t.facet.limit': 100,
            'facet.field': 'userScreenName_t',
            'wt': 'json',
            'rows': 5,
            'q': '%s %s' % (candidateScreenName, extra) 
        }
    
        # query fusion
        auth = ('admin', 'f00bar222')
        r = requests.get(url, params=payload, auth=auth)
    
        # add target
        nodes.append({"id": candidateScreenName, "group": group})  
    
        # iterate over facet objects (alternating value/field name) 
        items = iter(r.json()['facet_counts']['facet_fields']['userScreenName_t'])
        for item in items: 
            iname = item
            ivalue = next(items)

            # FIX THIS
            if iname not in nodes:
                nodes.append({"id": iname, "group": group})  
            else:
                print "caught one"
            if iname not in links:
                links.append({"source": iname, "target": candidateScreenName, "value": ivalue})  
            else:
                print "caught one"

    output = {}
    output["nodes"] = nodes 
    output["links"] = links

    response.content_type = 'application/json'
    return template(dumps(output))

@route('/api/crawl', method='POST')
def crawl():
    response.content_type = 'application/json'
    return template(dumps({'response': 'ok'}))

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

run(host='0.0.0.0', port=8080, debug=True)
