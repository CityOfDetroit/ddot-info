import sqlalchemy
import json
engine = sqlalchemy.create_engine('postgresql://localhost/iet')
conn = engine.connect()

if __name__ == "__main__":
  query = "select stop_id, stop_name from gtfs.stops"
  res = conn.execute(query)
  stops_object = { int(row[0]): row[1] for row in res.fetchall() }
  with open("stops.json", 'w') as f:
    f.write(json.dumps(stops_object))