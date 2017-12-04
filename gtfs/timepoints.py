import sqlalchemy
import pandas
import json
from routes import routes
from pprint import pprint
engine = sqlalchemy.create_engine('postgresql://localhost/iet')
conn = engine.connect()


def rename_tables():
    """Rename tables from gtfs_* to gtfs.*"""
    res = conn.execute(
    sqlalchemy.text(
        "select table_name from information_schema.tables where table_name like 'gtfs%'"
        )
    )
    table_names = [r[0] for r in res.fetchall()]
    for t in table_names:
        print("alter table public.{} rename to {};".format(t, t[5:]))
        print("alter table public.{} set schema gtfs;".format(t[5:]))


def drop_tables():
    res = conn.execute(
        sqlalchemy.text(
            "select table_name from information_schema.tables where table_schema = 'gtfs'"
        )
    )
    table_names = [r[0] for r in res.fetchall()]
    for t in table_names:
        drop_q = "drop table gtfs.{} cascade".format(t)
        print(drop_q)
        conn.execute(drop_q)


def set_timepoints(route, service, direction, seq_of_stop_ids):
    """Set timepoint = 1 on an array stops for a given route/service/direction """
    query = """
    update gtfs.stop_times
      set timepoint = 1
      where trip_id in
          (select trip_id from gtfs.trips where
              route_id = '{}'
              and service_id = '{}'
              and direction_id = '{}')
      and stop_id in
    ({})
    """.format(route, service, direction, ",".join(["'{}'".format(s) for s in seq_of_stop_ids]))
    conn.execute(query)
    return query


def get_stops(route):
    """
    Returns a DataFrame with stop sequence for a given route ID, service day, and direction.

    example:

    > # describe_trips
    > get_stop_sequence(6614)
    """
    query = """
    select
        times.stop_sequence,
        times.arrival_time,
        trips.route_id,
        trips.service_id,
        trips.direction_id,
        stops.stop_name,
        stops.stop_id,
        times.timepoint,
        trips.trip_id
    from gtfs.stop_times times
        inner join gtfs.trips trips on trips.trip_id = times.trip_id
        inner join gtfs.stops stops on stops.stop_id = times.stop_id
    where trips.trip_id in
        (select trip_id from gtfs.trips
            where route_id = '{}')
    order by
        trip_id asc,
        arrival_time asc,
        stop_sequence asc;
    """.format(route)
    df = pandas.read_sql(query, conn)
    return df

def set_all_timepoints():
    # big loop
    for r in routes:
        print(r['id'], r["rt_name"])

        # loop through each route's direction_id (0, 1)
        for dir in r['timepoints'].keys():

            # loop through all service_id
            for service in [1, 2, 3]:
                print(set_timepoints( r["rt_id"], service, int(dir), r['timepoints'][dir] ) )


def format_hms_nicely(hms):
    if hms:
        h, ms = int(hms[:2]), hms[2:5]
        if h < 12:
            return "{}{}am".format(h,ms)
        elif h == 12:
            return "{}pm".format(hms[:5])
        elif h > 12 and h < 24:
            return "{}{}pm".format(h - 12, ms)
        elif h == 24:
            return "12{}am".format(ms)
        elif h > 24:
            return "{}{}am".format(h - 24, ms)
        else:
            return '-'
    else:
        return '-'

def stop_desc_from_stop_id(id):
    query = "select stop_name, stop_desc from gtfs.stops where stop_id = '{}'".format(id)
    res = conn.execute(query)
    return res.fetchone()

def get_schedule(id, service='1', direction='0'):
    df = get_stops(id)
    stop_times = df[df.direction_id == int(direction)][df.service_id == str(service)][df.timepoint == 1]
    schedule = stop_times.pivot('trip_id', 'stop_id', 'arrival_time')
    for r in routes:
        if int(r['rt_id']) == int(id):
            route = r
            pprint(r)
    stops = []
    timepoint_list = route['timepoints'][list(route['timepoints'])[int(direction)]]
    for stop in timepoint_list:
        if str(stop) in schedule.columns:
            stops.append(stop)
    schedule = schedule[[str(i) for i in stops]]
    schedule = schedule.sort_values(by=schedule.columns[0],axis=0)
    schedule.columns = [stop_desc_from_stop_id(int(c))[0] for c in schedule.columns]
    schedule.index = schedule.index.map(lambda x: x[3:])
    pprint(schedule.columns)
    return schedule.applymap(format_hms_nicely)

def get_route(id):
    for r in routes:
        if int(r['rt_id']) == int(id):
            route = r
    services = {
        1: [],
        2: [],
        3: []
    }
    if route:
        for i, dir in enumerate(r['timepoints'].keys()):
            for svc in [1, 2, 3]:
                sched_json = json.loads(get_schedule(id, svc, i).to_json(orient='split'))
                sched_json['stops'] = sched_json['columns']
                sched_json['trips'] = dict(zip(sched_json['index'], sched_json['data']))
                del sched_json['columns']
                del sched_json['index']
                del sched_json['data']
                services[svc].append({ dir: sched_json })
    route['schedules'] = services
    for s in [1,2,3]:
        if len(services[s]) > 0:
            if s == 1:
                services['weekday'] = services[s]
            elif s == 2:
                services['saturday'] = services[s]
            elif s == 3:
                services['sunday-holiday'] = services[s]
        del services[s]
    
    # cleanup
    del route['timepoints']
    with open("{}.json".format(route['id']), 'w') as f:
        f.write(json.dumps(route))

if __name__ == "__main__":
    import sys
    print(sys.argv)
    get_route(sys.argv[1])