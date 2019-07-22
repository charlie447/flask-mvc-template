import json
from app import app


@app.route("/test", methods=['get', 'post'])
def test():
    return json.dumps({'status': 'ok'})
