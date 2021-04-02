# Changelog
All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## 1.1.0 - 2021-04-01

This is still using the same GTFS: 2021-02-08 thru 2021-04-30.

### Added

- Interactive system map at /system-map :tada:
- More coherent UI across all pages
- Stop pages now allow you to see where next arrivals are currently

### Changed

- Reclassified 46 Southfield, 80 Villages Direct, 89 Southwest Direct to peak-hour/part-time routes

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
