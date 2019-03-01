from wtforms import fields
from wtforms import Form
from wtforms import validators
from lib import utils

from wtforms.validators import ValidationError
from lib.utils import validate_address

class BaseForm(Form):
    def __init__(self, request_handler):
        super(BaseForm, self).__init__(request_handler.request.POST)


class InstanceForm(BaseForm):
    stream = fields.SelectField('Stream', id='stream')


class EmailForm(BaseForm):
    email = fields.TextField('Email', [validators.Required(), validators.Length(max=100), validators.regexp(utils.EMAIL_REGEXP, message='Invalid email address.')])


class StreamForm(BaseForm):
    sid = fields.TextField('Stream ID', [validators.Required(), validators.Length(max=50)], id='sid')
    name = fields.TextField('Name', [validators.Required(), validators.Length(max=50)], id='name')
    description = fields.TextField('Description', [validators.Required(), validators.Length(max=200)], id='description')
    tgzfile = fields.TextField('Application Tar Zip Filename', [validators.Required(), validators.Length(max=200)], id='tgzfile')
    github_repo = fields.TextField('Github Repo', [validators.Length(max=200)], id='github_repo')
    app_stub = fields.TextField('App Stub', [validators.Length(max=200)], id='app_stub')
    labs_link = fields.TextField('Labs Link (Wordpress)', [validators.Required(), validators.Length(max=200)], id='labs_link')
    fusion_version = fields.SelectField('Fusion Version', [validators.Required()], id='version', choices=[('4.0.2', 'Fusion 4.0.2'),('4.1.0', 'Fusion 4.1.0'),('4.1.1', 'Fusion 4.1.1'),('4.1.2', 'Fusion 4.1.2')])


class EditProfileForm(BaseForm):
    username = fields.TextField('Username', [validators.Required(), validators.Length(max=50)])
    name = fields.TextField('Name', [validators.Length(max=50)])
    email = fields.TextField('Email', [validators.Required(), validators.Length(max=100), validators.regexp(utils.EMAIL_REGEXP, message='Invalid email address.')])
    last_name = fields.TextField('Last_Name', [validators.Length(max=50)])
    company = fields.TextField('Company')
    country = fields.SelectField('Country', choices=utils.COUNTRIES)
    timezone = fields.SelectField('Timezone', choices=utils.timezones())
    ssh_key = fields.TextAreaField('Public SSH Key')
