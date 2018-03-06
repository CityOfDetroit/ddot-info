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



  timepoint_edits = {
    "429": {"offset": [0, 2]},
    "674": {"offset": [0, 2]},
  }

  for k in stops_object.keys():

    # add offset
    if k in timepoint_edits.keys():
      stops_object[k]['offset'] = timepoint_edits[k]['offset']
      
    og_routes = stops_object[k]['routes']
    near = routes_near_stop(int(k))
    addRPTC = False
    rptc_stops = [
      "8892",
      "8915",
      "8989",
      "8911",
      "8944",
      "9972",
      "8926",
      "8891",
      "8928",
      "9970",
      "8910",
      "8912",
      "8918",
      "8933",
      "8945"]

    rptc_routes = ['7','10','16','18','19','21','23','25','27','29','31','34','37','40','48','49','53']
    if near and len(near) > 0:
      transfers = []
      for n in near:
        if n in rptc_stops:
          addRPTC = True
        try:
          rts = stops_object[int(n)]['routes']
          diff = list(set(rts) - set(og_routes))
          if len(list(diff)) > 0 and n not in rptc_stops:
            transfers.append([n, list(diff)])
        except:
          pass
      if addRPTC:
        transfers.append(['rosa-parks-tc', ['7','10','16','18','19','21','23','25','27','29','31','34','37','40','48','49','53']])
      stops_object[k]['transfers'] = transfers
    else:
      stops_object[k]['transfers'] = []


  stops_object["rosa-parks-tc"] = {
    "id": "rosa-parks-tc",
    "name": "Rosa Parks Transit Center",
    "transfers": [],
    "routes": rptc_routes
  }
  with open("stops.json", 'w') as f:
    f.write(json.dumps(stops_object))