import json
import urllib2
import sys

try: 
	ip = "35.197.116.167"
	ip = "35.197.11.87"
	ip = "35.197.83.220"
        ip = "35.197.11.87"
        ip = "35.185.196.62"
        ip = "35.199.178.147"
        ip = "35.233.160.76"
        ip = "35.230.42.122"
        ip = "35.185.251.4"
except:
	print "need an IP"
	print "usage: python skg-query.py <ip> '<query>'" 
	sys.exit()

try:
	query = "%s" % sys.argv[1]
except:
        query = "deviation"	
	print "usage: python skg-query.py <ip> '<query>'" 

qf = "body_t"

jsondata = """
{
    "queries" : ["%s"],
    "compare" : [ 
        {
	    "type": "%s",
            "sort": "relatedness",
            "limit": 160,
            "compare" : [ 
                {
	            "type": "%s",
                    "sort": "relatedness",
                    "limit": 80
                }
            ]             
        }
    ]
}
""" % (query, qf, qf)

jsondata = """
{
    "queries" : ["%s"],
    "compare" : [ 
        {
	    "type": "%s",
            "sort": "relatedness",
            "limit": 40
        }
    ]
}
""" % (query, qf)


req = urllib2.Request('http://%s:8983/solr/Fusion_Starter_for_4_1_0/skg?qf=%s' % (ip, qf))
req.add_header('Content-Type', 'application/json')

response = urllib2.urlopen(req,jsondata)

x = response.read()
x = json.loads(x)
oldone = 0.0
for y in x['data']:
    print "---------------"
    print y['type']
    print "---------------"
    for z in y['values']:
        print 
        try:
            print z['name']
        except:
            print 'name threw error*********'
        print "---------------"
        for a in z['compare']:
            for b in a['values']:
                if b['relatedness'] > 0.0:
                    try:
                        foo = int(b['name'][0])
                    except:
                        if oldone != b['relatedness']:
                            print "--"
                        try:
                            oldone = b['relatedness']
                            print b['name'], b['relatedness']
                        except:
                            print 'name threw error*********'
