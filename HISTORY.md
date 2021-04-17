# Changelog
All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## 1.1.0 - 2021-04-16

This is still using the same GTFS: 2021-02-08 thru 2021-04-30.

### Added

- Interactive system map at /system-map :tada:
- You can now install ddot.info as a standalone progressive web app, and it will work offline.
- More coherent UI across all pages
- Stop pages now allow you to see where next arrivals are currently
- Site-wide dropdown navigation

### Fixed

- Stops which are endpoints should only show the departure times under "Scheduled departures". This was causing confusion at Fairlane Mall, for example, since it is both the first stop on the northbound trips and the last trip on the southbound. We now longer show the southbound arrival times, only the northbound departure times.
- In rare instances (/stop/60083, Wayne County Community College on Southfield & Outer Dr), a route will serve stops in both directions. In this case we split the times into each direction.

### Changed

- Reclassified 46 Southfield, 80 Villages Direct, 89 Southwest Direct to peak-hour/part-time routes
- Mask alert is now dismissable.

## 1.0.2 - 2021-02-08

Updated to latest GTFS version, valid 2021-02-08 through 2021-04-30.

### Added

- Mask-required alert banner and COVID policy page.

### Fixed

- Weird bug where FontAwesome icons flashed very big on the screen before anything else loaded.
- Google Analytics tracking; we do respect the DNT option.

## 1.0.1 - 2021-01-31

Updated to latest GTFS version, valid 2020-12-21 through 2021-02-28.

A notable change here was that Saturday and Sunday flip-flopped service IDs, which broke some hardcoding.

### Fixed
- footer typo
- error where Grand River directions were N/S instead of E/W
- routes now display on the stop page StopMap again; and more general improvements to StopMap

### Added

- Routes now display on the stop page; click a route to switch which one is displayed on the map.
- Feedback form link on footer.

## 1.0.0 - 2021-01-01
