#!/usr/bin/python
import time
import tweepy
import json
import csv
import sqlite3
import sys  
reload(sys)  
sys.setdefaultencoding('utf8')

auth = tweepy.OAuthHandler("", "")
auth.set_access_token("", "")
api = tweepy.API(auth, wait_on_rate_limit=True)

# db
conn = sqlite3.connect('twitter.db')
conn.text_factory = str
c = conn.cursor()

def get_all_tweets(screen_name):
	#initialize a list to hold all the tweepy Tweets
	alltweets = []	
	
	#make initial request for most recent tweets (200 is the maximum allowed count)
	new_tweets = api.user_timeline(screen_name = screen_name,count=200)

	#save most recent tweets
	alltweets.extend(new_tweets)
	
	#save the id of the oldest tweet less one
	oldest = alltweets[-1].id - 1

	#keep grabbing tweets until there are no tweets left to grab
	while len(new_tweets) > 0:
		print "getting tweets after %s" % (oldest)
		
		#all subsiquent requests use the max_id param to prevent duplicates
		new_tweets = api.user_timeline(screen_name = screen_name,count=200,max_id=oldest)
		
		#save most recent tweets
		alltweets.extend(new_tweets)
		
		#update the id of the oldest tweet less one
		oldest = alltweets[-1].id - 1

		#check if oldest is in db
		old_num = alltweets[-1].id
		query = 'SELECT * FROM tweets WHERE id = "%s" LIMIT 1' % old_num
		c.execute(query)
		result = c.fetchone()
		if result:
			# break out of looping more tweets
			print "+++++++++++found existing tweets++++++++++++"
			break
		
		print "...%s tweets processed so far" % (len(alltweets))

	#transform the tweepy tweets into a 2D array that will populate the csv	
	outtweets = [[tweet.id_str, tweet.created_at, screen_name, tweet.text.encode("utf-8")] for tweet in alltweets]

	insert_count = 0
	print "fix this delay for looking for dupes"
	for tweet in outtweets:
		# print tweet[0]
		query = 'SELECT * FROM tweets WHERE id = "%s" LIMIT 1' % tweet[0]
		c.execute(query)
		result = c.fetchone()
		if result:
			pass
			# print "not inserting %s" % tweet[0]
		else:
			#print "inserting %s" % tweet[0]
			insert_count = insert_count + 1
			c.execute('INSERT INTO tweets VALUES (?,?,?,?)', tweet)
			result = c.fetchone()
			conn.commit()

	print "inserted %s records" % insert_count

	#write the csv	
	with open('./csv/%s_%s_tweets.csv' % (screen_name, oldest), 'wb') as f:
		writer = csv.writer(f)
		writer.writerow(["id","created_at","text"])
		writer.writerows(outtweets)

	return
	

if __name__ == '__main__':
	try:
		if sys.argv[1]:
			get_all_tweets(sys.argv[1])

	except:
		query = "SELECT DISTINCT screen_name FROM tweets"
		c.execute(query)

		accounts = []		
		for row in c:
			accounts.append(row[0])			

		for screen_name in accounts:
			print "getting %s tweets" % screen_name
			get_all_tweets(screen_name)
