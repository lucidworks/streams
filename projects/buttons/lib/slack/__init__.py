import httplib2
import json

import config

def slack_message(text):

    if config.debug:
        in_dev = " (via dev)"
    else:
        in_dev = ""

    slack_data = {
        'text': "%s%s" % (text,in_dev),
        'username': "Loubot",
        'icon_emoji': ":cloud:" 
    }
    h = httplib2.Http()

    resp, content = h.request(
        config.slack_webhook, 
        'POST', 
        json.dumps(slack_data),
        headers={'Content-Type': 'application/json'}
    )

