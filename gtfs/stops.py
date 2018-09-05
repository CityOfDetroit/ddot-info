import sqlalchemy
import json
engine = sqlalchemy.create_engine('postgresql://jimmy@localhost/gtfs')
conn = engine.connect()

import routes

if __name__ == "__main__":
  query = """
      select 
      sp.stop_id, 
      right(sp.stop_code, 2) as stop_dir,
      sp.stop_desc as stop_name, 
      sp.stop_lat, 
      sp.stop_lon,
      json_agg(distinct regexp_replace(rt.route_short_name, '^0{1,}', ''))
    from gtfs.stops sp
    inner join gtfs.stop_times st on sp.stop_id = st.stop_id
    inner join gtfs.trips tr on tr.trip_id = st.trip_id
    inner join gtfs.routes rt on tr.route_id = rt.route_id
    group by sp.stop_id, sp.stop_desc , sp.stop_lat, sp.stop_lon, stop_dir"""
  res = conn.execute(query)
  stops_object = { int(row[0]): { 'id': row[0], 'name': row[2], 'dir': row[1], 'lat': row[3], 'lon': row[4], 'routes': row[5]} for row in res.fetchall() }
  
  def routes_near_stop(stop):
    query = """
        select json_agg(distinct(ltrim(r.route_short_name, '0'))) as xfers from gtfs.stops a
          inner join gtfs.shape_geoms b on st_dwithin(a.the_geom, b.the_geom, 0.0015)
          inner join gtfs.trips t on b.shape_id = t.shape_id
          inner join gtfs.routes r on r.route_id = t.route_id
        where a.stop_id = '{}'
        """.format(stop)
    res = conn.execute(query)
    return res.fetchone()[0]

  def stop_direction(stop, route):
    query = """
      select max(tr.direction_id) from gtfs.stops sp
          inner join gtfs.stop_times st on sp.stop_id = st.stop_id
          inner join gtfs.trips tr on tr.trip_id = st.trip_id
          inner join gtfs.routes rt on tr.route_id = rt.route_id
      where sp.stop_id = '{}' and route_short_name = lpad('{}', 3, '0')""".format(stop, route)
    res = conn.execute(query)
    index = int(res.fetchone()[0])
    thisRoute = [r for r in routes.routes if str(route) == r['id']]
    try:
      return [route, list(thisRoute[0]['timepoints'].keys())[index]]
    except:
      return [route, '']

  def get_best_xfer(origin_stop='7921', route='49', direction='eastbound'):
    # turn direction into a direction_id
    thisRouteDirections = [r['timepoints'].keys() for r in routes.routes if str(route) == r['id']]

    direction_id = list(thisRouteDirections[0]).index(direction)
    query = """
        select b.stop_id from gtfs.stops a
        inner join gtfs.stops b on st_dwithin(a.geom, b.geom, 0.0045)
        inner join gtfs.stop_times st on b.stop_id = st.stop_id
        inner join gtfs.trips tr on tr.trip_id = st.trip_id
        inner join gtfs.routes rt on tr.route_id = rt.route_id
        where a.stop_id = '{}'
        and tr.direction_id = '{}'
        and rt.route_short_name = '{}'
        and a.stop_id != b.stop_id
        order by st_distance(a.geom, b.geom) asc limit 1""".format(origin_stop, direction_id, route.zfill(3))
    res = conn.execute(query)
    return res.fetchone()[0]

  timepoint_edits = {
    # 43 Schoolcraft
    "429": {"offset": [0, -2]},
    "674": {"offset": [0, 1.5]},
    "676": {"offset": [0, 1.5]},
    "677": {"offset": [-2, 1.5]},
    "678": {"offset": [2, -1.5]},

    # 45 Seven Mile
    "10157": {"offset": [3, 1.5], "align": "left"},
    "689": {"offset": [0, -1.75]},
    "6074": {"offset": [0, 2]},
    "384": {"offset": [0, 2]},
    "9635": {"offset": [2.75, 1.75], "align": "left"},
    "695": {"offset": [0, -1.5]},
    "520": {"offset": [0, 2]},
    "79": {"offset": [0, -1.5]},
    "42": {"offset": [-2.5, 1.25], "align": "right"},
    "41": {"offset": [0, 2]}
  }

  for k in stops_object.keys():
    routesList = []
    for r in stops_object[k]['routes']:
      routesList.append(stop_direction(k, r))
    stops_object[k]['routes'] = routesList

    # add offset
    if str(k) in timepoint_edits.keys():
      stops_object[k]['offset'] = timepoint_edits[str(k)]['offset']
      if "align" in timepoint_edits[str(k)].keys():
        stops_object[k]['align'] = timepoint_edits[str(k)]['align']
      
    xfers = routes_near_stop(k)

    transferArray = []
    if xfers and len(xfers) > 0:
      for x in xfers:
        # get possible directions for that route
        try:
          thisRoute = [r for r in routes.routes if str(x) == r['id']]
          if thisRoute[0]:
            routeDirs = thisRoute[0]['timepoints'].keys()
            for d in routeDirs:
              if [x,d] not in routesList:
                transferArray.append([x, d, get_best_xfer(str(k), str(x), str(d))])
        except: 
          pass
    stops_object[k]['transfers'] = transferArray
    if len(stops_object[k]['transfers']) > 0:
      print(stops_object[k])

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



  stops_object["rosa-parks-tc"] = {
    "id": "rosa-parks-tc",
    "name": "Rosa Parks Transit Center",
    "transfers": [],
    "routes": rptc_routes
  }
  with open("stops.js", 'w') as f:
    f.write("const Stops = {}; export default Stops;".format(json.dumps(stops_object)))