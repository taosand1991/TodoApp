import dj_database_url

DATABASES = {
    'default': {
        'ENGINE': 'django.db.backends.mysql',
        'NAME': "legacytodoapp$TodoApp",
        "USER": "legacytodoapp",
        "PASSWORD": "police1991",
        "HOST": "legacytodoapp.mysql.pythonanywhere-services.com",
    }
}

db_from_env = dj_database_url.config(conn_max_age=600)
DATABASES['default'].update(db_from_env)
