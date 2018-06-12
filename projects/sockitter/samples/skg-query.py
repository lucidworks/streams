import json
import urllib2
import sys

try: 
	ip = sys.argv[1]
except:
	print "need an IP"
	print "usage: python skg-query.py <ip> '<query>'" 
	sys.exit()

try:
	query = sys.argv[2]
except:
        query = "*:*"	
	print "usage: python skg-query.py <ip> '<query>'" 

jsondata = """
{
    "queries" : ["*:*"],
    "compare" : [ 
        {
                   	"type": "userScreenName_t",
            "limit": 10,
            "values": ["%s"],
			"discover_values": true,
            "compare" : [
                {
            "type": "tagText_t",
            "sort": "relatedness",
			"discover_values": true,
                        "limit": 5
                }
            ]
        }
    ]
}
""" % query

ip = sys.argv[1]

req = urllib2.Request('http://%s:8983/solr/sockitter/skg?qf=tweet_t' % ip)
req.add_header('Content-Type', 'application/json')

response = urllib2.urlopen(req,jsondata)

x = response.read()
x = json.loads(x)

for y in x['data'][0]['values']:
	print ""
	for z in y['compare']:
		print "-------------------------------------"
		print "relation name: %s" % y['name']
		print "relation type: %s" % z['type']
		print "-------------------------------------"
		for a in z['values']:
			print a['name']
