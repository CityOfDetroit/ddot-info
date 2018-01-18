import sqlalchemy
import json
engine = sqlalchemy.create_engine('postgresql://jimmy@localhost/iet')
conn = engine.connect()

if __name__ == "__main__":
  query = """
      select 
      sp.stop_id, 
      sp.stop_name, 
      sp.stop_lat, 
      sp.stop_lon, 
      json_agg(distinct regexp_replace(rt.route_short_name, '^0{1,}', ''))
    from gtfs.stops sp
    inner join gtfs.stop_times st on sp.stop_id = st.stop_id
    inner join gtfs.trips tr on tr.trip_id = st.trip_id
    inner join gtfs.routes rt on tr.route_id = rt.route_id
    group by sp.stop_id"""
  res = conn.execute(query)
  stops_object = { int(row[0]): {'name': row[1], 'lat': row[2], 'lon': row[3], 'routes': row[4]} for row in res.fetchall() }
  with open("stops.json", 'w') as f:
    f.write(json.dumps(stops_object))