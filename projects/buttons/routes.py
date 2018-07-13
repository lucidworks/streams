from webapp2_extras.routes import RedirectRoute
from web.handlers import sitehandlers, adminhandlers, userhandlers, instancehandlers, apihandlers, emailhandlers
# from web.handlers import foo

secure_scheme = 'https'

_routes = [
	# website
	RedirectRoute('/', sitehandlers.HomeRequestHandler, name='home', strict_slash=True),
	RedirectRoute('/labs/', sitehandlers.IndexHandler, name='index', strict_slash=True),

	# users
	RedirectRoute('/login/', userhandlers.LoginHandler, name='login', strict_slash=True),
	RedirectRoute('/logout/', userhandlers.LogoutHandler, name='logout', strict_slash=True),
	RedirectRoute('/login/complete', userhandlers.CallbackLoginHandler, name='login-complete', strict_slash=True),
	RedirectRoute('/login/tfa', userhandlers.TwoFactorLoginHandler, name='login-tfa', strict_slash=True),
	RedirectRoute('/settings/', userhandlers.SettingsHandler, name='account-settings', strict_slash=True),
	RedirectRoute('/settings/tfa', userhandlers.TwoFactorSettingsHandler, name='account-tfa', strict_slash=True),
	RedirectRoute('/status/', userhandlers.StatusHandler, name='account-status', strict_slash=True),

	# instances
	RedirectRoute('/instances/', instancehandlers.InstancesHandler, name='instances', strict_slash=True),
	RedirectRoute('/instance/create/', instancehandlers.InstanceCreateHandler, name='instance-create', strict_slash=True),
	RedirectRoute('/instance/<iid>', instancehandlers.InstanceDetailHandler, name='instance-detail', strict_slash=True),
	
	# apis
	RedirectRoute('/api/v1/status', apihandlers.StatusHandler, name='v1-status', strict_slash=True),
	RedirectRoute('/api/status', apihandlers.StatusHandler, name='api-status', strict_slash=True),
	RedirectRoute('/api/', apihandlers.StatusHandler, name='api', strict_slash=True),
	RedirectRoute('/api/instances/', apihandlers.StatusHandler, name='api-instances', strict_slash=True),
	RedirectRoute('/api/streams/', apihandlers.StatusHandler, name='api-streams', strict_slash=True),
	RedirectRoute('/api/streams/<sid>', apihandlers.StreamsHandler, name='api-stream-sid', strict_slash=True),
	RedirectRoute('/api/instances/<iid>', apihandlers.InstancesHandler, name='api-instance-iid', strict_slash=True),

	# tasks
	RedirectRoute('/tasks/mail/', sitehandlers.SendEmailHandler, name='taskqueue-send-email', strict_slash=True),

	# admin
	RedirectRoute('/admin/', adminhandlers.AdminHandler, name='admin', strict_slash=True),
	RedirectRoute('/admin/streams/', adminhandlers.StreamsHandler, name='admin-streams', strict_slash=True),
	RedirectRoute('/admin/streams/create/', adminhandlers.StreamsCreateHandler, name='admin-streams-create', strict_slash=True),
	RedirectRoute('/admin/users/export/', adminhandlers.UsersExportHandler, name='admin-users-export', strict_slash=True)
]

def get_routes():
	return _routes

def add_routes(app):
	if app.debug:
		secure_scheme = 'http'
	for r in _routes:
		app.router.add(r)
