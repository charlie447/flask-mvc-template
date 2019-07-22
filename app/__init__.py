import json
import os
from flask import Flask
from flask import request, render_template, abort
from flask_sqlalchemy import SQLAlchemy
from flask_migrate import Migrate
from flask_cors import CORS
from .config import Config


app = Flask(__name__)
app.config.from_object(Config)
cors = CORS(app, resources={r"/*": {"origins": "*"}})
db = SQLAlchemy(app)
migrate = Migrate(app, db)

from app import models, routes
