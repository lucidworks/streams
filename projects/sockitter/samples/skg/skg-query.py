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
	query = "%s" % sys.argv[2]
except:
        query = "*:*"	
	print "usage: python skg-query.py <ip> '<query>'" 

jsondata = """
{
    "queries" : ["%s"],
    "compare" : [ 
        {
	    "type": "tweet_t",
	    #"type": "tagText_t",
            "limit": 100,
            "sort": "relatedness",
            "discover_values": true
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

screennames = []
print 
print "%s topics" % query
print "---------------------------------------"

for y in x['data'][0]['values']:
	if y['relatedness'] > -100.0 or True:
		print "%s,%s" % (y['name'], y['relatedness'])
