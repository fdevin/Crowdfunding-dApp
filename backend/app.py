# Import flask and datetime module for showing date and time
from flask import Flask, request, jsonify
from flask_sqlalchemy import SQLAlchemy
import os
import datetime
import requests
from dotenv import load_dotenv

load_dotenv()

x = datetime.datetime.now()
last_price_update=None
last_price_now = 0
time_frame_per_requiest =os.environ.get('DATABASE_URL')
# Initializing flask app
app = Flask(__name__)

app.config['SQLALCHEMY_DATABASE_URI'] = os.environ.get('DATABASE_URL')
db = SQLAlchemy(app)

class User(db.Model):
  id = db.Column(db.Integer, primary_key=True)
  eth_wallet = db.Column(db.String(42), unique=True, nullable=False)
  username = db.Column(db.String(20), unique=True, nullable=False)

  def __init__(self,eth_wallet,username):
    self.eth_wallet = eth_wallet
    self.username = username

db.create_all()
db.session.commit()

@app.route('/users', methods=['GET'])
def get_items():
  items = []
  for item in db.session.query(User).all():
    del item.__dict__['_sa_instance_state']
    items.append(item.__dict__)
  return jsonify(items)

@app.route('/users/<username>', methods=['GET'])
def get_user(id):
  user = User.query.get(id)
  del user.__dict__['_sa_instance_state']
  return jsonify(user.__dict__)


@app.route('/users', methods=['POST'])
def create_user():
  body = request.get_json()
  db.session.add(User(body['eth_wallet'], body['username']))
  db.session.commit()
  return "user created"

@app.route('/users/<wallet_str>', methods=['PUT'])
def update_user(wallet_str):
  body = request.get_json()
  db.session.query(User).filter_by(eth_wallet=wallet_str).update(
    dict(title=body['title'], content=body['content']))
  db.session.commit()
  return "user updated"

@app.route('/users/<wallet_str>', methods=['DELETE'])
def delete_user(wallet_str):
  db.session.query(User).filter_by(eth_wallet=wallet_str).delete()
  db.session.commit()
  return "user deleted"


@app.route('/coin/matic', methods=['GET'])
def get_matic_price():


  headers = {
    'Accepts': 'application/json',
    'X-CMC_PRO_API_KEY': apikey,
  }
  # Define some essential API parameters
  # Coinmarketcap API for latest market ticker quotes and averages for cryptocurrencies and exchanges.
  # https://coinmarketcap.com/api/documentation/v1/#operation/getV1CryptocurrencyListingsLatest
  url = 'https://pro-api.coinmarketcap.com/v1/cryptocurrency/listings/latest'
  parameters = {
    'start':'1',
    'limit':'2',
    'convert':'USD'
  }

  r = requests.post('https://api.spotify.com/v1/search?type=artist&q=snoop')
  r.json()


  return jsonify()

# Running app
if __name__ == '__main__':
    app.run(debug=True,host='0.0.0.0',port=8001)
    