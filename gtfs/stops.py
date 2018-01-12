import sqlalchemy
import json
engine = sqlalchemy.create_engine('postgresql://jimmy@localhost/iet')
conn = engine.connect()

if __name__ == "__main__":
  query = "select stop_id, stop_name, stop_lat, stop_lon from gtfs.stops"
  res = conn.execute(query)
  stops_object = { int(row[0]): {'name': row[1], 'lat': row[2], 'lon': row[3]} for row in res.fetchall() }
  with open("stops.json", 'w') as f:
    f.write(json.dumps(stops_object))