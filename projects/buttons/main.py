"""
The MIT License (MIT)

Copyright (c) 2018, Lucidworks, Inc.

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in
all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
THE SOFTWARE.
"""

__author__ = 'Lucidworks, Inc.'
__website__ = 'https://streams.lucidworks.com/labs'

import os,sys

# python paths
sys.path.insert(0, os.path.join(os.path.dirname(__file__), 'web/models'))
sys.path.insert(0, os.path.join(os.path.dirname(__file__), 'lib'))

# imports
import webapp2
import config
import routes
import logging

from web.basehandler import handle_error

logging.getLogger().setLevel(logging.WARNING)

# base application
app = webapp2.WSGIApplication(debug = os.environ['SERVER_SOFTWARE'].startswith('Dev'), config=config.webapp2_config)

# error handling
app.error_handlers[403] = handle_error
app.error_handlers[404] = handle_error

# debug output
if not app.debug:
  app.error_handlers[500] = handle_error

# add routes
routes.add_routes(app)

