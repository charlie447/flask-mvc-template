# Flask MVC Template

References:
- [The Flask Mega-Tutorial ](https://blog.miguelgrinberg.com/post/the-flask-mega-tutorial-part-i-hello-world)
- [Flask Doc](https://flask.palletsprojects.com/en/1.0.x/)

## Quick Start

1. `flask run`


## Database

References:
- [The Flask Mega-Tutorial Part IV: Database](https://blog.miguelgrinberg.com/post/the-flask-mega-tutorial-part-iv-database)

1. `flask db init`.
2. `flask db migrate -m "users table"`, `-m` option is indicating a comment/message/description. Onec the model has new class added, using migration to update database then upgrade by using following command.
3. `flask db upgrade`. Respectively, there is a `downgrade` command to downgrade the version of the database.

### Interact with CMD.
Once in the Python prompt, let's import the database instance and the models:
```python
>>> from app import db
>>> from app.models import User, Post

```
Start by creating a new user:
```python
>>> u = User(username='john', email='john@example.com')
>>> db.session.add(u)
>>> db.session.commit()
```

More interaction, please check out the references.
