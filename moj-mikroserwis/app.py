import time
from flask import Flask
import redis

app = Flask(__name__)
# Łączymy się z Redisem – jako host podajemy NAZWĘ SERWISU z Docker Compose!
cache = redis.Redis(host='baza_redis', port=6379)

def get_hit_count():
    retries = 5
    while True:
        try:
            return cache.incr('hits')
        except redis.exceptions.ConnectionError as exc:
            if retries == 0:
                raise exc
            retries -= 1
            time.sleep(0.5)

@app.route('/')
def hello():
    count = get_hit_count()
    return f'<h1>Cześć! Ta strona była odwiedzona już {count} razy!</h1>\n'

if __name__ == "__main__":
    app.run(host="0.0.0.0", port=5000, debug=True)
