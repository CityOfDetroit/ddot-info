# ddot-info

A web app for accessing DDOT bus schedules and real-time data.

This site is built on [Gatsby](https://www.gatsbyjs.com/), pointed at GTFS data stored in Postgres.

You will also need a [Netlify](https://www.netlify.com) account to deploy to production: this project uses Netlify's serverless functions. If you're developing, you can use the Netlify CLI.

## Key features

- bookmarkable route and stop pages
- time aware ui that defaults to show today's service and current trips
- live departure, scheduled departure, and ~~nearby transfer info~~ for every DDOT bus stop
- ~~location aware component to see routes and stops within a 5 minute walk of your current location~~
- digital schedule tables

## Data sources

- [DDOT GTFS](https://data.detroitmi.gov/datasets/ddot-gtfs-file)
- [Clever Devices API](https://myddotbus.com)

# Development

## Installation

Clone the repository and install the dependencies.

```bash
git clone git@github.com:CityOfDetroit/ddot-info.git
cd ddot-info

# npm install should also work?
yarn
```

You'll also want to install `gatsby-cli` and `netlify-cli`.

## Setting up the database

Building the site relies on referencing a Postgres database. If you need to create one, we recommend installing Postgres 15 along with the latest PostGIS extension that works with your version of Postgres.

We use [gtfs-sql-importer](https://github.com/fitnr/gtfs-sql-importer/tree/b3303d5537a4af099c2e1d1ddc2239e722891973) to import GTFS files into a database. (Note: this link to is to an earlier version of this package; the latest version performs stricter validation when ingesting GTFS data, that we prefer to avoid).

The database structure is based on the one from **gtfs-sql-importer**, but we add a few helper SQL functions (defined in `functions.sql`) which make new fields and relationships in the GraphQL server, provided by [gatsby-source-pg](https://www.gatsbyjs.com/plugins/gatsby-source-pg/).

There are two options you can take to set up the necessary database

### 1. Start with a prepackaged database

Use the `gtfs.sql.bz2` file in the root of this project to create a database with the necessary data, tables, and functions.

```bash
# Create the database; here, we name it "transit"
createdb transit

# Create the PostGIS extension in the database
psql -d transit -c 'CREATE EXTENSION postgis;'

# unzip the database dump and load it into the database
bunzip2 gtfs.sql.bz2
psql -d transit < ./gtfs.sql
```

This database comes preloaded with the latest DDOT data release (2025-01-19) as `feed_index = 1`. From here, you can skip to the configuration section.

### 2. Create a local database from scratch

Here, we'll create a brand new database and use the intialization function from the importer to create the necessary tables and relationships. We'll then download the GTFS data and load it in. Finally, we'll add the helper functions to the database.

```bash
# Create the database; here, we name it "transit"
createdb transit

# Create the PostGIS extension in the database
psql -d transit -c 'CREATE EXTENSION postgis;'

# Clone the sql-importer-repo (this will be ignored by git)
git clone https://github.com/fitnr/gtfs-sql-importer.git

# Check out the correct version
cd gtfs-sql-importer
git checkout b3303d5537a4af099c2e1d1ddc2239e722891973

# intialize the database with the importer; this creates tables, triggers, and relationships
make init PGDATABASE=transit

# Download the GTFS data and load it in using the importer
curl -o ddot_gtfs.zip "https://detroitmi.gov/Portals/0/docs/deptoftransportation/pdfs/ddot_gtfs.zip"
make load GTFS=ddot_gtfs.zip PGDATABASE=transit

# change back to the ddot-info repo root
cd ..

# Create the functions in the database (only needs to happen once)
psql -d transit < functions.sql
```

### Configuration

Create a `.env.development` file from the given `.env.example` file, filling in your database details and the `DDOT_KEY` API key, which can be self-provisioned at [myddotbus.com](http://www.myddotbus.com/).

### Running the development server

You can run the development server with the `netlify dev` command.

This will run a local Functions server that mirrors how the serverless functions operate in production. 

You can also use `gatsby develop` to run the development server without the serverless functions (which support real-time data fetching).

### Per-release data fixes, to be performed with each release

There are a few manual changes (both in the database, as well as the codebase) still that need to happen with each GTFS release. All of these represent good issues to work on or areas to improve the overall data pipeline.

1. Increment the `feed_index` value which is hardcoded: do a search for `feedIndex:` in the codebase and update the value to the new feed index. This should be an environment variable -- but Gatsby doesn't seem to support string interpolation in the graphql tags where these live.

2. Assign `route_short_order`; the route display in the UI is sorted by this field which does not come prepopulated.

```sql
update gtfs.routes set route_sort_order = route_short_name::integer where feed_index = 1;
```

3. Update 11 Clairmount `route_color`; this is always slightly off?

```sql
update gtfs.routes set route_color = '5f6369' where route_id = '11' and feed_index = 1;
```

4. Update weekday/Saturday/Sunday service values: these will change from release to release and are still hardcoded in several files. Look in the `gtfs.calendar` table for these.

- `src/data/services.json`
- `src/components/ServicePicker.js`
- `src/components/TimeHere.js`
- `src/components/route-schedule-page.js`

5. Update `src/data/routeShapes.json` with the new route shapes, if they have changed. Options for editing this: ArcGIS Online, [Placemark Play](https://play.placemark.io/), QGIS.

### Deploying to Netlify

0. Configure a `.env.production` file to be used for the build process.

1. Build the site: `yarn build`; this will create the static site in the `public` directory.

2. Deploy the site: `netlify deploy -d public`.

3. This will deploy to a unique URL for testing; deploy the production site with `netlify deploy -d public --prod`.