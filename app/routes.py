import json
from datetime import datetime as dt
from app import app
from flask import request, render_template
from .models import db, Activities
from sqlalchemy import desc


@app.route("/")
@app.route("/index")
def get_index():
    return render_template('index.html')


@app.route('/api/activity/add', methods=['post'])
def add_activity():
    data = request.form
    print(data)
    _fileanme = data.get("_filename")
    _type = data.get("_type")
    new_activity = Activities(_filename=_fileanme, _type=_type)
    db.session.add(new_activity)
    db.session.commit()
    return json.dumps({"status": 'not ok'})


@app.route('/api/activity/get', methods=['get'])
def get_activity():
    query_upload_results = Activities.query.order_by(desc(Activities._timestamp)).filter(Activities._type == "upload")
    query_download_results = Activities.query.order_by(desc(Activities._timestamp)).filter(Activities._type == "download")
    print(query_upload_results)
    print(query_download_results)
    upload_items = [{'filename': item._filename, 'timestamp': item._timestamp.strftime('%Y-%m-%d %H:%M:%S'), 'type': item._type} for item in query_upload_results.limit(10)]
    download_items = [{'filename': item._filename, 'timestamp': item._timestamp.strftime('%Y-%m-%d %H:%M:%S'), 'type': item._type} for item in query_download_results.limit(10)]
    print(upload_items)
    print(download_items)
    return json.dumps({
        "upload": upload_items,
        "download": download_items,
        "uploadCount": query_upload_results.count(),
        "downloadCount": query_download_results.count()})
