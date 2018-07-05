from wtforms import fields
from wtforms import Form
from wtforms import validators
from lib import utils

from wtforms.validators import ValidationError
from lib.utils import validate_address

class BaseForm(Form):
    def __init__(self, request_handler):
        super(BaseForm, self).__init__(request_handler.request.POST)


class LoginForm(BaseForm):
    password = fields.TextField('Password', [validators.Required(), validators.Length(max=50)], id='l_password')
    username = fields.TextField('Username', [validators.Required(), validators.Length(max=50)], id='l_username')


class BlogArticleForm(BaseForm):
    title = fields.TextField('Article_Title', [validators.Required(), validators.Length(max=50)], id='title')
    summary = fields.TextField('Article_Summary', [validators.Required(), validators.Length(max=140)], id='summary')
    filename = fields.TextField('Article_Filename', [validators.Required(), validators.Length(max=140)], id='filename')
    article_type = fields.SelectField('Article Type', [validators.Required()], id='type', choices=[('post', 'Blog Post'), ('page', 'Page Content'), ('partial', 'Partial Content')])   


class AboutForm(BaseForm):
    email = fields.TextField('Email', [validators.Required(), validators.Length(max=100), validators.regexp(utils.EMAIL_REGEXP, message='Invalid email address.')])
    name = fields.TextField('Name', [validators.Required(), validators.Length(max=50)])
    message = fields.TextAreaField('Message', [validators.Required(), validators.Length(max=2048)])


class EditProfileForm(BaseForm):
    username = fields.TextField('Username', [validators.Required(), validators.Length(max=50)])
    name = fields.TextField('Name', [validators.Length(max=50)])
    email = fields.TextField('Email', [validators.Required(), validators.Length(max=100), validators.regexp(utils.EMAIL_REGEXP, message='Invalid email address.')])
    last_name = fields.TextField('Last_Name', [validators.Length(max=50)])
    company = fields.TextField('Company')
    country = fields.SelectField('Country', choices=utils.COUNTRIES)
    timezone = fields.SelectField('Timezone', choices=utils.timezones())
