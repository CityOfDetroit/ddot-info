CREATE FUNCTION gtfs.routes_longest_trips(r gtfs.routes) RETURNS SETOF gtfs.trips
    LANGUAGE sql STABLE
    AS $$

with longest_trips as (select distinct on (t.direction_id) t.feed_index, t.trip_id from gtfs.trips t
inner join gtfs.stop_times st on t.trip_id = st.trip_id
where t.route_id = r.route_id and t.feed_index = r.feed_index
group by t.feed_index, t.trip_id 
order by t.direction_id, count(st.*) desc)

select * from gtfs.trips where trip_id in (select trip_id from longest_trips) and feed_index = r.feed_index

$$;

CREATE FUNCTION gtfs.routes_shape_geoms(r gtfs.routes) RETURNS SETOF gtfs.shape_geoms
    LANGUAGE sql STABLE
    AS $$

with distinct_shape_geoms as (
	select distinct shape_id
	from gtfs.trips t
	where t.route_id = r.route_id
	and t.feed_index = r.feed_index
	)

select * from gtfs.shape_geoms sg
where sg.shape_id in (select * from distinct_shape_geoms)
and sg.feed_index = r.feed_index

$$;

CREATE FUNCTION gtfs.routes_stops(r gtfs.routes) RETURNS SETOF gtfs.stops
    LANGUAGE sql STABLE
    AS $$
with stop_ids as (
select distinct st.stop_id from gtfs.stop_times st
inner join gtfs.trips tr on tr.trip_id = st.trip_id
inner join gtfs.routes rt on rt.route_id = tr.route_id
where rt.route_short_name = r.route_short_name
and rt.feed_index = r.feed_index
and tr.feed_index = r.feed_index
and st.feed_index = r.feed_index
)
select * from gtfs.stops where stop_id in (select stop_id from stop_ids) and stop_name not like '%Deboarding%' 
and feed_index = r.feed_index
$$;

CREATE FUNCTION gtfs.routes_timepoints(r gtfs.routes) RETURNS SETOF gtfs.stops
    LANGUAGE sql STABLE
    AS $$
with stop_ids as (
select distinct st.stop_id from gtfs.stop_times st
inner join gtfs.trips tr on tr.trip_id = st.trip_id
inner join gtfs.routes rt on rt.route_id = tr.route_id
where rt.route_short_name = r.route_short_name
and rt.feed_index = r.feed_index
and tr.feed_index = r.feed_index
and st.feed_index = r.feed_index
and st.timepoint = 1
)
select * from gtfs.stops where stop_id in (select stop_id from stop_ids) and stop_name not like '%Deboarding%' and feed_index = r.feed_index
$$;

CREATE FUNCTION gtfs.stops_nearby_stops(stp gtfs.stops) RETURNS SETOF gtfs.stops
    LANGUAGE sql STABLE
    AS $$ 
select distinct(s.*) from gtfs.stops s 
where s.feed_index = stp.feed_index
and st_distance(st_transform(s.the_geom, 2898), st_transform(stp.the_geom, 2898)) < 1000
and s.stop_id != stp.stop_id
$$;


CREATE FUNCTION gtfs.stops_routes(s gtfs.stops) RETURNS SETOF gtfs.routes
    LANGUAGE sql STABLE
    AS $$

	select distinct (r.*) FROM
	gtfs.routes r
	inner join gtfs.trips t on (t.route_id = r.route_id and t.feed_index = r.feed_index)
	inner join gtfs.stop_times st on (st.trip_id = t.trip_id and st.feed_index = t.feed_index)
	where st.stop_id = s.stop_id
				and r.feed_index = s.feed_index
	order by r.route_sort_order

$$;