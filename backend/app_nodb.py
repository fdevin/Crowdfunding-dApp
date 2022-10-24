# Import flask and datetime module for showing date and time
from flask import Flask, jsonify
import json
from flask_sqlalchemy import SQLAlchemy
import os
import datetime
import requests
from datetime import datetime
from dotenv import load_dotenv
import coinmarketcapapi

load_dotenv()

x = datetime.now()
last_price_update= datetime.now()
last_price_now = 0
time_frame_per_request =os.environ.get('TIME_PER_UPDATE_IN_SECONDS')
COINMARKET_API =os.environ.get('COINMARKET_API')
cmc = coinmarketcapapi.CoinMarketCapAPI(COINMARKET_API)

# Initializing flask app
app = Flask(__name__)

def update_matic_price():
  global last_price_now
  global last_price_update
  data_quote = cmc.cryptocurrency_quotes_latest(symbol='MATIC', convert='USD') 
  last_price_now = float(data_quote.data['MATIC']['quote']['USD']['price'])
  last_price_update = datetime.now()
  print(last_price_now)
  print(last_price_update)


@app.route('/coin/matic', methods=['GET'])
def get_matic_price():
    interval = datetime.now()-last_price_update
    interval_in_seconds = interval.total_seconds()
    print(interval_in_seconds)
    if(interval_in_seconds>int(time_frame_per_request)):
      print("updating")
      update_matic_price()
    else:
      print("too fast")

    response = jsonify(last_price_now)
    response.headers.add("Access-Control-Allow-Origin", "*")
    return response

# Running app
if __name__ == '__main__':
    update_matic_price()
    app.run(debug=True,host='0.0.0.0',port=8001)
    