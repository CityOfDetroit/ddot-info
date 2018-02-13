import sqlalchemy
import json
engine = sqlalchemy.create_engine('postgresql://jimmy@localhost/gtfs')
conn = engine.connect()

if __name__ == "__main__":
  query = """
      select 
      sp.stop_id, 
      right(sp.stop_code, 2) as stop_dir,
      sp.stop_name, 
      sp.stop_lat, 
      sp.stop_lon, 
      json_agg(distinct regexp_replace(rt.route_short_name, '^0{1,}', ''))
    from gtfs.stops sp
    inner join gtfs.stop_times st on sp.stop_id = st.stop_id
    inner join gtfs.trips tr on tr.trip_id = st.trip_id
    inner join gtfs.routes rt on tr.route_id = rt.route_id
    group by sp.stop_id, sp.stop_name, sp.stop_lat, sp.stop_lon, stop_dir"""
  res = conn.execute(query)
  stops_object = { int(row[0]): { 'id': row[0], 'name': row[2], 'dir': row[1], 'lat': row[3], 'lon': row[4], 'routes': row[5]} for row in res.fetchall() }
  
  def routes_near_stop(stop):
    query = """
    select json_agg(b.stop_id) from gtfs.stops a
        inner join gtfs.stops b on
        st_dwithin(a.geom, b.geom, 0.0015)
        where a.stop_id = '{}' and a.stop_id != b.stop_id;
        """.format(stop)
    res = conn.execute(query)
    return res.fetchone()[0]

  for k in stops_object.keys():
    og_routes = stops_object[k]['routes']
    near = routes_near_stop(int(k))
    if near and len(near) > 0:
      transfers = []
      for n in near:
        try:
          rts = stops_object[int(n)]['routes']
          diff = list(set(rts) - set(og_routes))
          if len(list(diff)) > 0:
            transfers.append([n, list(diff)])
        except:
          pass
      stops_object[k]['transfers'] = transfers
    else:
      stops_object[k]['transfers'] = []

  with open("stops.json", 'w') as f:
    f.write(json.dumps(stops_object))