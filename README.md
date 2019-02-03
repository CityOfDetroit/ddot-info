# route-explorer

A web app for accessing DDOT bus schedules and real-time data.

We're using [Create React App](https://github.com/facebook/create-react-app) with [react router](https://github.com/ReactTraining/react-router), [react-map-gl](https://github.com/uber/react-map-gl) and [material design](https://material-ui-next.com/) UI components. Create React App's default webpack configuration was ejected to use `react-map-gl`; [these instructions](https://github.com/zjhch123/react-map-gl-demo-with-create-react-app) were helpful for doing that.

## Key features

- bookmarkable route and stop pages
- time aware ui that defaults to show today's service and current trips
- live departure, scheduled departure, and nearby transfer info for every DDOT bus stop
- location aware component to see routes and stops within a 5 minute walk of your current location
- digital schedule tables! (meaning we'll no longer exclusively offer PDFs [here](https://detroitmi.gov/departments/detroit-department-transportation/bus-schedules))

## Data sources

- DDOT GTFS
- [OneBusAway API](http://developer.onebusaway.org/modules/onebusaway-application-modules/1.1.14/api/where/index.html)

# Install

`yarn` will install dependencies

## Development

`yarn start` will run the build steps and serve at `localhost:3000`

`yarn css` will compile style files

`yarn deploy` will publish to `gh-pages`

`yarn analyze` will run the source-map-explorer so we can see how large our bundle is.
