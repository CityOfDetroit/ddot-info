--
-- PostgreSQL database dump
--

-- Dumped from database version 12.4
-- Dumped by pg_dump version 12.4

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET xmloption = content;
SET client_min_messages = warning;
SET row_security = off;

--
-- Name: gtfs; Type: SCHEMA; Schema: -; Owner: -
--

CREATE SCHEMA gtfs;


--
-- Name: dist_insert(); Type: FUNCTION; Schema: gtfs; Owner: -
--

CREATE FUNCTION gtfs.dist_insert() RETURNS trigger
    LANGUAGE plpgsql
    SET search_path TO 'gtfs', 'public'
    AS $$
  BEGIN
  NEW.shape_dist_traveled := (
    SELECT
      ST_LineLocatePoint(route.the_geom, stop.the_geom) * route.length
    FROM stops as stop
      LEFT JOIN trips ON (stop.feed_index=trips.feed_index AND trip_id=NEW.trip_id)
      LEFT JOIN shape_geoms AS route ON (route.feed_index = stop.feed_index and trips.shape_id = route.shape_id)
      WHERE stop_id = NEW.stop_id
        AND stop.feed_index = COALESCE(NEW.feed_index::integer, (
          SELECT column_default::integer
          FROM information_schema.columns
          WHERE (table_schema, table_name, column_name) = (TG_TABLE_SCHEMA, 'stop_times', 'feed_index')
        ))
  )::NUMERIC;
  RETURN NEW;
  END;
  $$;


--
-- Name: dist_update(); Type: FUNCTION; Schema: gtfs; Owner: -
--

CREATE FUNCTION gtfs.dist_update() RETURNS trigger
    LANGUAGE plpgsql
    SET search_path TO 'gtfs', 'public'
    AS $$
  BEGIN
  WITH f AS (SELECT MAX(feed_index) AS feed_index FROM feed_info)
  UPDATE stop_times s
    SET shape_dist_traveled = safe_locate(r.the_geom, p.the_geom, lag::numeric, coalesce(lead, length)::numeric, length::numeric)
  FROM
    (
      SELECT
        feed_index,
        trip_id,
        stop_id,
        coalesce(lag(shape_dist_traveled) over (trip), 0) AS lag,
        shape_dist_traveled AS dist,
        lead(shape_dist_traveled) over (trip) AS lead
      FROM stop_times
        INNER JOIN f USING (feed_index)
      WINDOW trip AS (PARTITION BY feed_index, trip_id ORDER BY stop_sequence)
    ) AS d
    LEFT JOIN stops AS p USING (feed_index, stop_id)
    LEFT JOIN trips USING (feed_index, trip_id)
    LEFT JOIN shape_geoms r USING (feed_index, shape_id)
  WHERE (s.feed_index, s.trip_id, s.stop_id) = (d.feed_index, d.trip_id, d.stop_id)
    AND COALESCE(lead, length) > lag
    AND (dist > COALESCE(lead, length) OR dist < lag);
  RETURN NULL;
  END;
  $$;


SET default_tablespace = '';

SET default_table_access_method = heap;

--
-- Name: routes; Type: TABLE; Schema: gtfs; Owner: -
--

CREATE TABLE gtfs.routes (
    feed_index integer NOT NULL,
    route_id text NOT NULL,
    agency_id text,
    route_short_name text DEFAULT ''::text,
    route_long_name text DEFAULT ''::text,
    route_desc text DEFAULT ''::text,
    route_type integer,
    route_url text,
    route_color text,
    route_text_color text,
    route_sort_order integer
);


--
-- Name: trips; Type: TABLE; Schema: gtfs; Owner: -
--

CREATE TABLE gtfs.trips (
    feed_index integer NOT NULL,
    route_id text NOT NULL,
    service_id text NOT NULL,
    trip_id text NOT NULL,
    trip_headsign text,
    direction_id integer,
    block_id text,
    shape_id text,
    trip_short_name text,
    wheelchair_accessible integer,
    direction text,
    schd_trip_id text,
    trip_type text,
    exceptional integer,
    bikes_allowed integer
);


--
-- Name: routes_longest_trips(gtfs.routes); Type: FUNCTION; Schema: gtfs; Owner: -
--

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


--
-- Name: shape_geoms; Type: TABLE; Schema: gtfs; Owner: -
--

CREATE TABLE gtfs.shape_geoms (
    feed_index integer NOT NULL,
    shape_id text NOT NULL,
    length numeric(12,2) NOT NULL,
    the_geom public.geometry(LineString,4326)
);


--
-- Name: routes_shape_geoms(gtfs.routes); Type: FUNCTION; Schema: gtfs; Owner: -
--

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


--
-- Name: stops; Type: TABLE; Schema: gtfs; Owner: -
--

CREATE TABLE gtfs.stops (
    feed_index integer NOT NULL,
    stop_id text NOT NULL,
    stop_name text,
    stop_desc text,
    stop_lat double precision,
    stop_lon double precision,
    zone_id text,
    stop_url text,
    stop_code text,
    stop_street text,
    stop_city text,
    stop_region text,
    stop_postcode text,
    stop_country text,
    stop_timezone text,
    direction text,
    "position" text,
    parent_station text,
    wheelchair_boarding integer,
    wheelchair_accessible integer,
    location_type integer,
    vehicle_type integer,
    platform_code text,
    the_geom public.geometry(Point,4326)
);


--
-- Name: routes_stops(gtfs.routes); Type: FUNCTION; Schema: gtfs; Owner: -
--

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


--
-- Name: routes_timepoints(gtfs.routes); Type: FUNCTION; Schema: gtfs; Owner: -
--

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


--
-- Name: safe_locate(public.geometry, public.geometry, numeric, numeric, numeric); Type: FUNCTION; Schema: gtfs; Owner: -
--

CREATE FUNCTION gtfs.safe_locate(route public.geometry, point public.geometry, start numeric, finish numeric, length numeric) RETURNS numeric
    LANGUAGE sql
    AS $$
    -- Multiply the fractional distance also the substring by the substring,
    -- then add the start distance
    SELECT LEAST(length, GREATEST(0, start) + ST_LineLocatePoint(
      ST_LineSubstring(route, GREATEST(0, start / length), LEAST(1, finish / length)),
      point
    )::numeric * (
      -- The absolute distance between start and finish
      LEAST(length, finish) - GREATEST(0, start)
    ));
  $$;


--
-- Name: shape_update(); Type: FUNCTION; Schema: gtfs; Owner: -
--

CREATE FUNCTION gtfs.shape_update() RETURNS trigger
    LANGUAGE plpgsql
    SET search_path TO 'gtfs', 'public'
    AS $$
  BEGIN
    INSERT INTO shape_geoms
      (feed_index, shape_id, length, the_geom)
    SELECT
      feed_index,
      shape_id,
      ST_Length(ST_MakeLine(array_agg(geom ORDER BY shape_pt_sequence))::geography) as length,
      ST_SetSRID(ST_MakeLine(array_agg(geom ORDER BY shape_pt_sequence)), 4326) AS the_geom
    FROM (
      SELECT
        feed_index,
        shape_id,
        shape_pt_sequence,
        ST_MakePoint(shape_pt_lon, shape_pt_lat) AS geom
      FROM shapes s
        LEFT JOIN shape_geoms sg USING (feed_index, shape_id)
      WHERE the_geom IS NULL
    ) a GROUP BY feed_index, shape_id;
  RETURN NULL;
  END;
  $$;


--
-- Name: stop_geom_update(); Type: FUNCTION; Schema: gtfs; Owner: -
--

CREATE FUNCTION gtfs.stop_geom_update() RETURNS trigger
    LANGUAGE plpgsql
    AS $$
  BEGIN
    NEW.the_geom = ST_SetSRID(ST_MakePoint(NEW.stop_lon, NEW.stop_lat), 4326);
    RETURN NEW;
  END;
$$;


--
-- Name: stops_nearby_stops(gtfs.stops); Type: FUNCTION; Schema: gtfs; Owner: -
--

CREATE FUNCTION gtfs.stops_nearby_stops(stp gtfs.stops) RETURNS SETOF gtfs.stops
    LANGUAGE sql STABLE
    AS $$ 
select distinct(s.*) from gtfs.stops s 
where s.feed_index = stp.feed_index
and st_distance(st_transform(s.the_geom, 2898), st_transform(stp.the_geom, 2898)) < 1000
and s.stop_id != stp.stop_id
$$;


--
-- Name: stops_routes(gtfs.stops); Type: FUNCTION; Schema: gtfs; Owner: -
--

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


--
-- Name: agency; Type: TABLE; Schema: gtfs; Owner: -
--

CREATE TABLE gtfs.agency (
    feed_index integer NOT NULL,
    agency_id text DEFAULT ''::text NOT NULL,
    agency_name text,
    agency_url text,
    agency_timezone text,
    agency_lang text,
    agency_phone text,
    agency_fare_url text,
    agency_email text,
    bikes_policy_url text
);


--
-- Name: calendar; Type: TABLE; Schema: gtfs; Owner: -
--

CREATE TABLE gtfs.calendar (
    feed_index integer NOT NULL,
    service_id text NOT NULL,
    monday integer NOT NULL,
    tuesday integer NOT NULL,
    wednesday integer NOT NULL,
    thursday integer NOT NULL,
    friday integer NOT NULL,
    saturday integer NOT NULL,
    sunday integer NOT NULL,
    start_date date NOT NULL,
    end_date date NOT NULL
);


--
-- Name: calendar_dates; Type: TABLE; Schema: gtfs; Owner: -
--

CREATE TABLE gtfs.calendar_dates (
    feed_index integer NOT NULL,
    service_id text,
    date date NOT NULL,
    exception_type integer
);


--
-- Name: exception_types; Type: TABLE; Schema: gtfs; Owner: -
--

CREATE TABLE gtfs.exception_types (
    exception_type integer NOT NULL,
    description text
);


--
-- Name: fare_attributes; Type: TABLE; Schema: gtfs; Owner: -
--

CREATE TABLE gtfs.fare_attributes (
    feed_index integer NOT NULL,
    fare_id text NOT NULL,
    price double precision NOT NULL,
    currency_type text NOT NULL,
    payment_method integer,
    transfers integer,
    transfer_duration integer,
    agency_id text
);


--
-- Name: fare_rules; Type: TABLE; Schema: gtfs; Owner: -
--

CREATE TABLE gtfs.fare_rules (
    feed_index integer NOT NULL,
    fare_id text,
    route_id text,
    origin_id text,
    destination_id text,
    contains_id text,
    service_id text
);


--
-- Name: feed_info; Type: TABLE; Schema: gtfs; Owner: -
--

CREATE TABLE gtfs.feed_info (
    feed_index integer NOT NULL,
    feed_publisher_name text,
    feed_publisher_url text,
    feed_timezone text,
    feed_lang text,
    feed_version text,
    feed_start_date date,
    feed_end_date date,
    feed_id text,
    feed_contact_url text,
    feed_download_date date,
    feed_file text
);


--
-- Name: feed_info_feed_index_seq; Type: SEQUENCE; Schema: gtfs; Owner: -
--

CREATE SEQUENCE gtfs.feed_info_feed_index_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- Name: feed_info_feed_index_seq; Type: SEQUENCE OWNED BY; Schema: gtfs; Owner: -
--

ALTER SEQUENCE gtfs.feed_info_feed_index_seq OWNED BY gtfs.feed_info.feed_index;


--
-- Name: frequencies; Type: TABLE; Schema: gtfs; Owner: -
--

CREATE TABLE gtfs.frequencies (
    feed_index integer NOT NULL,
    trip_id text NOT NULL,
    start_time text NOT NULL,
    end_time text NOT NULL,
    headway_secs integer NOT NULL,
    exact_times integer,
    start_time_seconds integer,
    end_time_seconds integer,
    CONSTRAINT frequencies_end_time_check CHECK (((end_time)::interval = (end_time)::interval)),
    CONSTRAINT frequencies_start_time_check CHECK (((start_time)::interval = (start_time)::interval))
);


--
-- Name: location_types; Type: TABLE; Schema: gtfs; Owner: -
--

CREATE TABLE gtfs.location_types (
    location_type integer NOT NULL,
    description text
);


--
-- Name: payment_methods; Type: TABLE; Schema: gtfs; Owner: -
--

CREATE TABLE gtfs.payment_methods (
    payment_method integer NOT NULL,
    description text
);


--
-- Name: pickup_dropoff_types; Type: TABLE; Schema: gtfs; Owner: -
--

CREATE TABLE gtfs.pickup_dropoff_types (
    type_id integer NOT NULL,
    description text
);


--
-- Name: route_types; Type: TABLE; Schema: gtfs; Owner: -
--

CREATE TABLE gtfs.route_types (
    route_type integer NOT NULL,
    description text
);


--
-- Name: shapes; Type: TABLE; Schema: gtfs; Owner: -
--

CREATE TABLE gtfs.shapes (
    feed_index integer NOT NULL,
    shape_id text NOT NULL,
    shape_pt_lat double precision NOT NULL,
    shape_pt_lon double precision NOT NULL,
    shape_pt_sequence integer NOT NULL,
    shape_dist_traveled double precision
);


--
-- Name: stop_times; Type: TABLE; Schema: gtfs; Owner: -
--

CREATE TABLE gtfs.stop_times (
    feed_index integer NOT NULL,
    trip_id text NOT NULL,
    arrival_time interval,
    departure_time interval,
    stop_id text,
    stop_sequence integer NOT NULL,
    stop_headsign text,
    pickup_type integer,
    drop_off_type integer,
    shape_dist_traveled numeric(10,2),
    timepoint integer,
    continuous_drop_off integer,
    continuous_pickup integer,
    arrival_time_seconds integer,
    departure_time_seconds integer,
    shape_dist_travelled text,
    CONSTRAINT stop_times_arrival_time_check CHECK ((arrival_time = arrival_time)),
    CONSTRAINT stop_times_departure_time_check CHECK ((departure_time = departure_time))
);


--
-- Name: stops_ago; Type: MATERIALIZED VIEW; Schema: gtfs; Owner: -
--

CREATE MATERIALIZED VIEW gtfs.stops_ago AS
 SELECT stops.stop_name,
    stops.stop_lon,
    stops.stop_lat
   FROM gtfs.stops
  WITH NO DATA;


--
-- Name: timepoints; Type: TABLE; Schema: gtfs; Owner: -
--

CREATE TABLE gtfs.timepoints (
    timepoint integer NOT NULL,
    description text
);


--
-- Name: transfer_types; Type: TABLE; Schema: gtfs; Owner: -
--

CREATE TABLE gtfs.transfer_types (
    transfer_type integer NOT NULL,
    description text
);


--
-- Name: transfers; Type: TABLE; Schema: gtfs; Owner: -
--

CREATE TABLE gtfs.transfers (
    feed_index integer NOT NULL,
    from_stop_id text,
    to_stop_id text,
    transfer_type integer,
    min_transfer_time integer,
    from_route_id text,
    to_route_id text,
    service_id text
);


--
-- Name: wheelchair_accessible; Type: TABLE; Schema: gtfs; Owner: -
--

CREATE TABLE gtfs.wheelchair_accessible (
    wheelchair_accessible integer NOT NULL,
    description text
);


--
-- Name: wheelchair_boardings; Type: TABLE; Schema: gtfs; Owner: -
--

CREATE TABLE gtfs.wheelchair_boardings (
    wheelchair_boarding integer NOT NULL,
    description text
);


--
-- Name: feed_info feed_index; Type: DEFAULT; Schema: gtfs; Owner: -
--

ALTER TABLE ONLY gtfs.feed_info ALTER COLUMN feed_index SET DEFAULT nextval('gtfs.feed_info_feed_index_seq'::regclass);


--
-- Name: agency agency_pkey; Type: CONSTRAINT; Schema: gtfs; Owner: -
--

ALTER TABLE ONLY gtfs.agency
    ADD CONSTRAINT agency_pkey PRIMARY KEY (feed_index, agency_id);


--
-- Name: calendar calendar_pkey; Type: CONSTRAINT; Schema: gtfs; Owner: -
--

ALTER TABLE ONLY gtfs.calendar
    ADD CONSTRAINT calendar_pkey PRIMARY KEY (feed_index, service_id);


--
-- Name: exception_types exception_types_pkey; Type: CONSTRAINT; Schema: gtfs; Owner: -
--

ALTER TABLE ONLY gtfs.exception_types
    ADD CONSTRAINT exception_types_pkey PRIMARY KEY (exception_type);


--
-- Name: fare_attributes fare_attributes_pkey; Type: CONSTRAINT; Schema: gtfs; Owner: -
--

ALTER TABLE ONLY gtfs.fare_attributes
    ADD CONSTRAINT fare_attributes_pkey PRIMARY KEY (feed_index, fare_id);


--
-- Name: feed_info feed_info_pkey; Type: CONSTRAINT; Schema: gtfs; Owner: -
--

ALTER TABLE ONLY gtfs.feed_info
    ADD CONSTRAINT feed_info_pkey PRIMARY KEY (feed_index);


--
-- Name: frequencies frequencies_pkey; Type: CONSTRAINT; Schema: gtfs; Owner: -
--

ALTER TABLE ONLY gtfs.frequencies
    ADD CONSTRAINT frequencies_pkey PRIMARY KEY (feed_index, trip_id, start_time);


--
-- Name: location_types location_types_pkey; Type: CONSTRAINT; Schema: gtfs; Owner: -
--

ALTER TABLE ONLY gtfs.location_types
    ADD CONSTRAINT location_types_pkey PRIMARY KEY (location_type);


--
-- Name: payment_methods payment_methods_pkey; Type: CONSTRAINT; Schema: gtfs; Owner: -
--

ALTER TABLE ONLY gtfs.payment_methods
    ADD CONSTRAINT payment_methods_pkey PRIMARY KEY (payment_method);


--
-- Name: pickup_dropoff_types pickup_dropoff_types_pkey; Type: CONSTRAINT; Schema: gtfs; Owner: -
--

ALTER TABLE ONLY gtfs.pickup_dropoff_types
    ADD CONSTRAINT pickup_dropoff_types_pkey PRIMARY KEY (type_id);


--
-- Name: route_types route_types_pkey; Type: CONSTRAINT; Schema: gtfs; Owner: -
--

ALTER TABLE ONLY gtfs.route_types
    ADD CONSTRAINT route_types_pkey PRIMARY KEY (route_type);


--
-- Name: routes routes_pkey; Type: CONSTRAINT; Schema: gtfs; Owner: -
--

ALTER TABLE ONLY gtfs.routes
    ADD CONSTRAINT routes_pkey PRIMARY KEY (feed_index, route_id);


--
-- Name: shape_geoms shape_geom_pkey; Type: CONSTRAINT; Schema: gtfs; Owner: -
--

ALTER TABLE ONLY gtfs.shape_geoms
    ADD CONSTRAINT shape_geom_pkey PRIMARY KEY (feed_index, shape_id);


--
-- Name: stop_times stop_times_pkey; Type: CONSTRAINT; Schema: gtfs; Owner: -
--

ALTER TABLE ONLY gtfs.stop_times
    ADD CONSTRAINT stop_times_pkey PRIMARY KEY (feed_index, trip_id, stop_sequence);


--
-- Name: stops stops_pkey; Type: CONSTRAINT; Schema: gtfs; Owner: -
--

ALTER TABLE ONLY gtfs.stops
    ADD CONSTRAINT stops_pkey PRIMARY KEY (feed_index, stop_id);


--
-- Name: timepoints timepoints_pkey; Type: CONSTRAINT; Schema: gtfs; Owner: -
--

ALTER TABLE ONLY gtfs.timepoints
    ADD CONSTRAINT timepoints_pkey PRIMARY KEY (timepoint);


--
-- Name: transfer_types transfer_types_pkey; Type: CONSTRAINT; Schema: gtfs; Owner: -
--

ALTER TABLE ONLY gtfs.transfer_types
    ADD CONSTRAINT transfer_types_pkey PRIMARY KEY (transfer_type);


--
-- Name: trips trips_pkey; Type: CONSTRAINT; Schema: gtfs; Owner: -
--

ALTER TABLE ONLY gtfs.trips
    ADD CONSTRAINT trips_pkey PRIMARY KEY (feed_index, trip_id);


--
-- Name: wheelchair_accessible wheelchair_accessible_pkey; Type: CONSTRAINT; Schema: gtfs; Owner: -
--

ALTER TABLE ONLY gtfs.wheelchair_accessible
    ADD CONSTRAINT wheelchair_accessible_pkey PRIMARY KEY (wheelchair_accessible);


--
-- Name: wheelchair_boardings wheelchair_boardings_pkey; Type: CONSTRAINT; Schema: gtfs; Owner: -
--

ALTER TABLE ONLY gtfs.wheelchair_boardings
    ADD CONSTRAINT wheelchair_boardings_pkey PRIMARY KEY (wheelchair_boarding);


--
-- Name: arr_time_index; Type: INDEX; Schema: gtfs; Owner: -
--

CREATE INDEX arr_time_index ON gtfs.stop_times USING btree (arrival_time_seconds);


--
-- Name: calendar_dates_dateidx; Type: INDEX; Schema: gtfs; Owner: -
--

CREATE INDEX calendar_dates_dateidx ON gtfs.calendar_dates USING btree (date);


--
-- Name: calendar_service_id; Type: INDEX; Schema: gtfs; Owner: -
--

CREATE INDEX calendar_service_id ON gtfs.calendar USING btree (service_id);


--
-- Name: dep_time_index; Type: INDEX; Schema: gtfs; Owner: -
--

CREATE INDEX dep_time_index ON gtfs.stop_times USING btree (departure_time_seconds);


--
-- Name: shapes_shape_key; Type: INDEX; Schema: gtfs; Owner: -
--

CREATE INDEX shapes_shape_key ON gtfs.shapes USING btree (shape_id);


--
-- Name: stop_times_key; Type: INDEX; Schema: gtfs; Owner: -
--

CREATE INDEX stop_times_key ON gtfs.stop_times USING btree (feed_index, trip_id, stop_id);


--
-- Name: trips_service_id; Type: INDEX; Schema: gtfs; Owner: -
--

CREATE INDEX trips_service_id ON gtfs.trips USING btree (feed_index, service_id);


--
-- Name: trips_trip_id; Type: INDEX; Schema: gtfs; Owner: -
--

CREATE INDEX trips_trip_id ON gtfs.trips USING btree (trip_id);


--
-- Name: shapes shape_geom_trigger; Type: TRIGGER; Schema: gtfs; Owner: -
--

CREATE TRIGGER shape_geom_trigger AFTER INSERT ON gtfs.shapes FOR EACH STATEMENT EXECUTE FUNCTION gtfs.shape_update();


--
-- Name: stops stop_geom_trigger; Type: TRIGGER; Schema: gtfs; Owner: -
--

CREATE TRIGGER stop_geom_trigger BEFORE INSERT OR UPDATE ON gtfs.stops FOR EACH ROW EXECUTE FUNCTION gtfs.stop_geom_update();


--
-- Name: stop_times stop_times_dist_row_trigger; Type: TRIGGER; Schema: gtfs; Owner: -
--

CREATE TRIGGER stop_times_dist_row_trigger BEFORE INSERT ON gtfs.stop_times FOR EACH ROW WHEN ((new.shape_dist_traveled IS NULL)) EXECUTE FUNCTION gtfs.dist_insert();


--
-- Name: stop_times stop_times_dist_stmt_trigger; Type: TRIGGER; Schema: gtfs; Owner: -
--

CREATE TRIGGER stop_times_dist_stmt_trigger AFTER INSERT ON gtfs.stop_times FOR EACH STATEMENT EXECUTE FUNCTION gtfs.dist_update();


--
-- Name: agency agency_feed_index_fkey; Type: FK CONSTRAINT; Schema: gtfs; Owner: -
--

ALTER TABLE ONLY gtfs.agency
    ADD CONSTRAINT agency_feed_index_fkey FOREIGN KEY (feed_index) REFERENCES gtfs.feed_info(feed_index);


--
-- Name: calendar_dates calendar_dates_exception_type_fkey; Type: FK CONSTRAINT; Schema: gtfs; Owner: -
--

ALTER TABLE ONLY gtfs.calendar_dates
    ADD CONSTRAINT calendar_dates_exception_type_fkey FOREIGN KEY (exception_type) REFERENCES gtfs.exception_types(exception_type);


--
-- Name: calendar calendar_feed_fkey; Type: FK CONSTRAINT; Schema: gtfs; Owner: -
--

ALTER TABLE ONLY gtfs.calendar
    ADD CONSTRAINT calendar_feed_fkey FOREIGN KEY (feed_index) REFERENCES gtfs.feed_info(feed_index) ON DELETE CASCADE;


--
-- Name: calendar_dates calendar_fkey; Type: FK CONSTRAINT; Schema: gtfs; Owner: -
--

ALTER TABLE ONLY gtfs.calendar_dates
    ADD CONSTRAINT calendar_fkey FOREIGN KEY (feed_index, service_id) REFERENCES gtfs.calendar(feed_index, service_id);


--
-- Name: fare_attributes fare_attributes_fare_fkey; Type: FK CONSTRAINT; Schema: gtfs; Owner: -
--

ALTER TABLE ONLY gtfs.fare_attributes
    ADD CONSTRAINT fare_attributes_fare_fkey FOREIGN KEY (feed_index) REFERENCES gtfs.feed_info(feed_index) ON DELETE CASCADE;


--
-- Name: fare_attributes fare_attributes_fkey; Type: FK CONSTRAINT; Schema: gtfs; Owner: -
--

ALTER TABLE ONLY gtfs.fare_attributes
    ADD CONSTRAINT fare_attributes_fkey FOREIGN KEY (feed_index, agency_id) REFERENCES gtfs.agency(feed_index, agency_id);


--
-- Name: fare_attributes fare_attributes_payment_method_fkey; Type: FK CONSTRAINT; Schema: gtfs; Owner: -
--

ALTER TABLE ONLY gtfs.fare_attributes
    ADD CONSTRAINT fare_attributes_payment_method_fkey FOREIGN KEY (payment_method) REFERENCES gtfs.payment_methods(payment_method);


--
-- Name: fare_rules fare_rules_fare_id_fkey; Type: FK CONSTRAINT; Schema: gtfs; Owner: -
--

ALTER TABLE ONLY gtfs.fare_rules
    ADD CONSTRAINT fare_rules_fare_id_fkey FOREIGN KEY (feed_index, fare_id) REFERENCES gtfs.fare_attributes(feed_index, fare_id);


--
-- Name: fare_rules fare_rules_route_id_fkey; Type: FK CONSTRAINT; Schema: gtfs; Owner: -
--

ALTER TABLE ONLY gtfs.fare_rules
    ADD CONSTRAINT fare_rules_route_id_fkey FOREIGN KEY (feed_index, route_id) REFERENCES gtfs.routes(feed_index, route_id);


--
-- Name: fare_rules fare_rules_service_feed_fkey; Type: FK CONSTRAINT; Schema: gtfs; Owner: -
--

ALTER TABLE ONLY gtfs.fare_rules
    ADD CONSTRAINT fare_rules_service_feed_fkey FOREIGN KEY (feed_index) REFERENCES gtfs.feed_info(feed_index) ON DELETE CASCADE;


--
-- Name: fare_rules fare_rules_service_fkey; Type: FK CONSTRAINT; Schema: gtfs; Owner: -
--

ALTER TABLE ONLY gtfs.fare_rules
    ADD CONSTRAINT fare_rules_service_fkey FOREIGN KEY (feed_index, service_id) REFERENCES gtfs.calendar(feed_index, service_id);


--
-- Name: frequencies frequencies_feed_fkey; Type: FK CONSTRAINT; Schema: gtfs; Owner: -
--

ALTER TABLE ONLY gtfs.frequencies
    ADD CONSTRAINT frequencies_feed_fkey FOREIGN KEY (feed_index) REFERENCES gtfs.feed_info(feed_index) ON DELETE CASCADE;


--
-- Name: frequencies frequencies_trip_fkey; Type: FK CONSTRAINT; Schema: gtfs; Owner: -
--

ALTER TABLE ONLY gtfs.frequencies
    ADD CONSTRAINT frequencies_trip_fkey FOREIGN KEY (feed_index, trip_id) REFERENCES gtfs.trips(feed_index, trip_id);


--
-- Name: routes route_types_fkey; Type: FK CONSTRAINT; Schema: gtfs; Owner: -
--

ALTER TABLE ONLY gtfs.routes
    ADD CONSTRAINT route_types_fkey FOREIGN KEY (route_type) REFERENCES gtfs.route_types(route_type);


--
-- Name: routes routes_feed_fkey; Type: FK CONSTRAINT; Schema: gtfs; Owner: -
--

ALTER TABLE ONLY gtfs.routes
    ADD CONSTRAINT routes_feed_fkey FOREIGN KEY (feed_index) REFERENCES gtfs.feed_info(feed_index) ON DELETE CASCADE;


--
-- Name: routes routes_fkey; Type: FK CONSTRAINT; Schema: gtfs; Owner: -
--

ALTER TABLE ONLY gtfs.routes
    ADD CONSTRAINT routes_fkey FOREIGN KEY (feed_index, agency_id) REFERENCES gtfs.agency(feed_index, agency_id);


--
-- Name: routes routes_route_type_fkey; Type: FK CONSTRAINT; Schema: gtfs; Owner: -
--

ALTER TABLE ONLY gtfs.routes
    ADD CONSTRAINT routes_route_type_fkey FOREIGN KEY (route_type) REFERENCES gtfs.route_types(route_type);


--
-- Name: stop_times stop_times_drop_off_type_fkey; Type: FK CONSTRAINT; Schema: gtfs; Owner: -
--

ALTER TABLE ONLY gtfs.stop_times
    ADD CONSTRAINT stop_times_drop_off_type_fkey FOREIGN KEY (drop_off_type) REFERENCES gtfs.pickup_dropoff_types(type_id);


--
-- Name: stop_times stop_times_feed_fkey; Type: FK CONSTRAINT; Schema: gtfs; Owner: -
--

ALTER TABLE ONLY gtfs.stop_times
    ADD CONSTRAINT stop_times_feed_fkey FOREIGN KEY (feed_index) REFERENCES gtfs.feed_info(feed_index) ON DELETE CASCADE;


--
-- Name: stop_times stop_times_pickup_type_fkey; Type: FK CONSTRAINT; Schema: gtfs; Owner: -
--

ALTER TABLE ONLY gtfs.stop_times
    ADD CONSTRAINT stop_times_pickup_type_fkey FOREIGN KEY (pickup_type) REFERENCES gtfs.pickup_dropoff_types(type_id);


--
-- Name: stop_times stop_times_stops_fkey; Type: FK CONSTRAINT; Schema: gtfs; Owner: -
--

ALTER TABLE ONLY gtfs.stop_times
    ADD CONSTRAINT stop_times_stops_fkey FOREIGN KEY (feed_index, stop_id) REFERENCES gtfs.stops(feed_index, stop_id);


--
-- Name: stop_times stop_times_timepoint_fkey; Type: FK CONSTRAINT; Schema: gtfs; Owner: -
--

ALTER TABLE ONLY gtfs.stop_times
    ADD CONSTRAINT stop_times_timepoint_fkey FOREIGN KEY (timepoint) REFERENCES gtfs.timepoints(timepoint);


--
-- Name: stop_times stop_times_trips_fkey; Type: FK CONSTRAINT; Schema: gtfs; Owner: -
--

ALTER TABLE ONLY gtfs.stop_times
    ADD CONSTRAINT stop_times_trips_fkey FOREIGN KEY (feed_index, trip_id) REFERENCES gtfs.trips(feed_index, trip_id);


--
-- Name: stops stops_location_type_fkey; Type: FK CONSTRAINT; Schema: gtfs; Owner: -
--

ALTER TABLE ONLY gtfs.stops
    ADD CONSTRAINT stops_location_type_fkey FOREIGN KEY (location_type) REFERENCES gtfs.location_types(location_type);


--
-- Name: stops stops_wheelchair_accessible_fkey; Type: FK CONSTRAINT; Schema: gtfs; Owner: -
--

ALTER TABLE ONLY gtfs.stops
    ADD CONSTRAINT stops_wheelchair_accessible_fkey FOREIGN KEY (wheelchair_accessible) REFERENCES gtfs.wheelchair_accessible(wheelchair_accessible);


--
-- Name: stops stops_wheelchair_boarding_fkey; Type: FK CONSTRAINT; Schema: gtfs; Owner: -
--

ALTER TABLE ONLY gtfs.stops
    ADD CONSTRAINT stops_wheelchair_boarding_fkey FOREIGN KEY (wheelchair_boarding) REFERENCES gtfs.wheelchair_boardings(wheelchair_boarding);


--
-- Name: transfers transfers_feed_fkey; Type: FK CONSTRAINT; Schema: gtfs; Owner: -
--

ALTER TABLE ONLY gtfs.transfers
    ADD CONSTRAINT transfers_feed_fkey FOREIGN KEY (feed_index) REFERENCES gtfs.feed_info(feed_index) ON DELETE CASCADE;


--
-- Name: transfers transfers_from_route_fkey; Type: FK CONSTRAINT; Schema: gtfs; Owner: -
--

ALTER TABLE ONLY gtfs.transfers
    ADD CONSTRAINT transfers_from_route_fkey FOREIGN KEY (feed_index, from_route_id) REFERENCES gtfs.routes(feed_index, route_id);


--
-- Name: transfers transfers_from_stop_fkey; Type: FK CONSTRAINT; Schema: gtfs; Owner: -
--

ALTER TABLE ONLY gtfs.transfers
    ADD CONSTRAINT transfers_from_stop_fkey FOREIGN KEY (feed_index, from_stop_id) REFERENCES gtfs.stops(feed_index, stop_id);


--
-- Name: transfers transfers_service_fkey; Type: FK CONSTRAINT; Schema: gtfs; Owner: -
--

ALTER TABLE ONLY gtfs.transfers
    ADD CONSTRAINT transfers_service_fkey FOREIGN KEY (feed_index, service_id) REFERENCES gtfs.calendar(feed_index, service_id);


--
-- Name: transfers transfers_to_route_fkey; Type: FK CONSTRAINT; Schema: gtfs; Owner: -
--

ALTER TABLE ONLY gtfs.transfers
    ADD CONSTRAINT transfers_to_route_fkey FOREIGN KEY (feed_index, to_route_id) REFERENCES gtfs.routes(feed_index, route_id);


--
-- Name: transfers transfers_to_stop_fkey; Type: FK CONSTRAINT; Schema: gtfs; Owner: -
--

ALTER TABLE ONLY gtfs.transfers
    ADD CONSTRAINT transfers_to_stop_fkey FOREIGN KEY (feed_index, to_stop_id) REFERENCES gtfs.stops(feed_index, stop_id);


--
-- Name: transfers transfers_transfer_type_fkey; Type: FK CONSTRAINT; Schema: gtfs; Owner: -
--

ALTER TABLE ONLY gtfs.transfers
    ADD CONSTRAINT transfers_transfer_type_fkey FOREIGN KEY (transfer_type) REFERENCES gtfs.transfer_types(transfer_type);


--
-- Name: trips trips_calendar_fkey; Type: FK CONSTRAINT; Schema: gtfs; Owner: -
--

ALTER TABLE ONLY gtfs.trips
    ADD CONSTRAINT trips_calendar_fkey FOREIGN KEY (feed_index, service_id) REFERENCES gtfs.calendar(feed_index, service_id);


--
-- Name: trips trips_feed_fkey; Type: FK CONSTRAINT; Schema: gtfs; Owner: -
--

ALTER TABLE ONLY gtfs.trips
    ADD CONSTRAINT trips_feed_fkey FOREIGN KEY (feed_index) REFERENCES gtfs.feed_info(feed_index) ON DELETE CASCADE;


--
-- Name: trips trips_route_id_fkey; Type: FK CONSTRAINT; Schema: gtfs; Owner: -
--

ALTER TABLE ONLY gtfs.trips
    ADD CONSTRAINT trips_route_id_fkey FOREIGN KEY (feed_index, route_id) REFERENCES gtfs.routes(feed_index, route_id);


--
-- Name: trips trips_wheelchair_accessible_fkey; Type: FK CONSTRAINT; Schema: gtfs; Owner: -
--

ALTER TABLE ONLY gtfs.trips
    ADD CONSTRAINT trips_wheelchair_accessible_fkey FOREIGN KEY (wheelchair_accessible) REFERENCES gtfs.wheelchair_accessible(wheelchair_accessible);


--
-- PostgreSQL database dump complete
--

