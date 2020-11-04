import dj_database_url

DATABASES = {
        'default': {
            'ENGINE': 'django.db.backends.mysql',
            'NAME': "legacytodoapp$TodoApp",
            "HOST": "legacytodoapp.mysql.pythonanywhere-services.com",
            "USER": "legacytodoapp",
            "PASSWORD": "police1991",
        }
    }

db_from_env = dj_database_url.config(conn_max_age=600)
DATABASES['default'].update(db_from_env)

