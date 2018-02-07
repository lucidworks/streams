import time
import tweepy
import json
import csv
import sqlite3
import sys  
reload(sys)  
sys.setdefaultencoding('utf8')

# i'd like to sell this access
auth = tweepy.OAuthHandler("", "")
auth.set_access_token("", "")
api = tweepy.API(auth)

# db bitches be careful
conn = sqlite3.connect('twitter.db')
conn.text_factory = str
c = conn.cursor()

# extract tags from account
def extract_tags(screen_name):
	# extract tags from entity	
	# query = "SELECT * FROM tweets WHERE screen_name = '%s'" % screen_name
	query = "SELECT * FROM tweets WHERE screen_name = '%s' and created_at > '2018-02-04'" % screen_name
	query = "SELECT * FROM tweets WHERE screen_name = '%s' and created_at > '2018-02-03' and created_at < '2018-02-06'" % screen_name
	c.execute(query)
	for row in c:
		s = row[3]
		#print row[1]
		for meh in [i  for i in s.split() if i.startswith("#") ]:
			#query = "SELECT * FROM tags WHERE tag = ?" 
			#c.execute(query, meh)
			#payload = [meh, screen_name, count]
			#c.execute('INSERT INTO tags VALUES (?,?,?)', payload)
			print meh

if __name__ == '__main__':
	#pass in the username of the account you want to download
	extract_tags(sys.argv[1])
