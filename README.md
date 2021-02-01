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

`yarn` will install the basic project dependencies.

You'll also want to install `gatsby-cli` and `netlify-cli`.

## Setting up the database

We recommend installing Postgres 12 along with the latest PostGIS extension that works with your version of Postgres.

We use [gtfs-sql-importer](https://github.com/fitnr/gtfs-sql-importer) to import GTFS files into a database.

The database structure is based on the one from **gtfs-sql-importer**, but we add a few helper SQL functions which make new fields and relationships in the GraphQL server, provided by [gatsby-source-pg](https://www.gatsbyjs.com/plugins/gatsby-source-pg/).

You can create a database and import the project database structure from the command line:

```
createdb ddotinfo
psql -d ddotinfo -c 'CREATE EXTENSION postgis;'
psql -d ddotinfo ./gtfs.sql
```

Next, grab the latest version of DDOT's GTFS data and import it to this database using `make` from the **gtfs-sql-importer**:

```
curl -o ddot_gtfs.zip "https://www.detroitmi.gov/Portals/0/docs/deptoftransportation/pdfs/ddot_gtfs.zip"
export PGDATABASE=ddotinfo && make load GTFS=ddot_gtfs.zip
```

You should see the output from SQL insert commands. Importing the DDOT GTFS file typically takes about 2-3 minutes on a newer machine.

### Configuration

Create a `.env.development` file from the given example file, filling in your database details and the API key you've received from DDOT.

### Running the development server

You should be able to run the development server with the `netlify dev` command.

This will run a local Functions server that mirrors how the serverless functions operate in production. In order to deploy this site to production, you would need a Netlify account.