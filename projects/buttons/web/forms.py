from wtforms import fields
from wtforms import Form
from wtforms import validators
from lib import utils

from wtforms.validators import ValidationError
from lib.utils import validate_address

class BaseForm(Form):
    def __init__(self, request_handler):
        super(BaseForm, self).__init__(request_handler.request.POST)


class StreamForm(BaseForm):
    name = fields.TextField('Name', [validators.Required(), validators.Length(max=50)], id='name')
    description = fields.TextField('Description', [validators.Required(), validators.Length(max=140)], id='description')
    zipurl = fields.TextField('Zip URL', [validators.Required(), validators.Length(max=140)], id='zipurl')
    fusion_version = fields.SelectField('Fusion Version', [validators.Required()], id='version', choices=[('fusion_4.0.2', 'Fusion 4.0.2'), ('fusion_4.1', 'Fusion 4.1')])   
    github_repo = fields.TextField('Github Repo', [validators.Required(), validators.Length(max=140)], id='github_repo')


class EditProfileForm(BaseForm):
    username = fields.TextField('Username', [validators.Required(), validators.Length(max=50)])
    name = fields.TextField('Name', [validators.Length(max=50)])
    email = fields.TextField('Email', [validators.Required(), validators.Length(max=100), validators.regexp(utils.EMAIL_REGEXP, message='Invalid email address.')])
    last_name = fields.TextField('Last_Name', [validators.Length(max=50)])
    company = fields.TextField('Company')
    country = fields.SelectField('Country', choices=utils.COUNTRIES)
    timezone = fields.SelectField('Timezone', choices=utils.timezones())
