const routeDetails = [{
        number: 67,
        name: 'Cadillac/Harper',
        orientation: 'EW',
        color: "#44aa42",
        radius: 0,
        rt_id: 6802,
        downtown: true,
        days_per_week: ['Monday', 'Sunday'],
        between: ['Mack and Moross', 'Rosa Parks TC'],
        via: [''],
        description: "An east side route that offers 24/7 service and improved frequency as part of the ConnectTen network. Connects Detroit from Mack & Moross to Downtown Rosa Parks Transit Center. The main streets served are Harper Ave. E Larned St. Cadillac Blvd.",
        pdf: ["http://www.detroitmi.gov/Portals/0/docs/deptoftransportation/pdfs/2016/April%202016/07CadilllacHarper.pdf"],
        services: {
            "Monday-Friday": {
                service_hours: ["5:00am", "12:00am"],
                frequency: [
                    ["peak", 35],
                    ["off-peak", 60]
                ]
            },
            "Saturday": {
                service_hours: ["7:00am", "11:45pm"],
                frequency: [
                    ["all day", 60]
                ]
            },
            "Sunday/Holiday": {
                service_hours: ["7:00am", "8:45pm"],
                frequency: [
                    ["all day", 60]
                ]
            }
        },
        notes: "On Saturdays from 7AM-8PM, this bus departs Rosa Parks Transit Center after a layover as Route 10-Chene. Riders remaining on the bus through the layover may continue without using a transfer."
    },
    {
        number: 68,
        name: 'Chalmers',
        orientation: 'NS',
        color: "#9b5ba5",
        radius: 0,
        rt_id: 6803,
        downtown: false,
        days_per_week: ['Monday', 'Sunday'],
        between: ['Jefferson & Maryland', '7 Mile & Gratiot'],
        via: ['Chalmers', "Schoenherr"],
        pdf: ["http://www.detroitmi.gov/Portals/0/docs/deptoftransportation/pdfs/2017/April2017schedules/9ChalmersMS.pdf"],
        description: "An east side route that offers 24/7 service and improved frequency as part of the ConnectTen network. Connects Detroit from Jefferson & Maryland to 7 Mile & Gratiot; some trips extend to Waltham & 8 Mile. The main streets served are Chalmers and Schoenherr St.",
        services: {
            "Monday-Friday": {
                service_hours: ["5:30am", "8:45pm"],
                frequency: [
                    ["peak", 30],
                    ["off-peak", 60]
                ]
            },
            "Saturday": {
                service_hours: ["6:45am", "8:00pm"],
                frequency: [
                    ["all day", 60]
                ]
            },
            "Sunday/Holiday": {
                service_hours: ["8:30am", "4:30pm"],
                frequency: [
                    ["all day", 60]
                ]
            }
        },
        notes: ""
    },
    {
        number: 52,
        name: 'Chene',
        orientation: 'NS',
        color: "#44aa42",
        radius: 0,
        downtown: true,
        rt_id: 6804,
        days_per_week: ['Monday', 'Sunday'],
        between: ['Rosa Parks TC', 'Varjo & Van Dyke'],
        via: ['Lafayette', 'Chene', 'Jos. Campau', 'Nevada'],
        description: "An east side route that offers 24/7 service and improved frequency as part of the ConnectTen network. Connects Detroit from Varjo & Van Dyke to Downtown Rosa Parks Transit Center. The main streets served are Nevada, Joseph Campau and Chene.",
        pdf: ["http://www.detroitmi.gov/Portals/0/docs/deptoftransportation/pdfs/2016/April%202016/10CheneMS.pdf?ver=2016-04-22-150329-977"],
        services: {
            "Monday-Friday": {
                service_hours: ["5:00am", "10:45pm"],
                frequency: [
                    ["peak", 40],
                    ["off-peak", 60]
                ]
            },
            "Saturday": {
                service_hours: ["6:00am", "9:45pm"],
                frequency: [
                    ["all day", 60]
                ]
            },
            "Sunday/Holiday": {
                service_hours: ["8:00am", "7:45pm"],
                frequency: [
                    ["all day", 60]
                ]
            }
        },
        notes: "On Saturdays, this bus departs Rosa Parks Transit Center after a layover as Route 7-Cadillac-Harper. Riders remaining on the bus through the layover may continue without using a transfer."
    },
    {
        number: 11,
        name: 'Clairmount',
        orientation: 'EW',
        color: "#0079c2",
        radius: 0,
        rt_id: 6805,
        downtown: false,
        days_per_week: ['Monday', 'Sunday'],
        between: ['Clark & Fort', 'Lycaste & Jefferson'],
        via: ['Junction', 'Epworth', 'Joy', 'Harper', 'St. Jean'],
        description: "Connects various neighborhoods between Jefferson & Lycaste and Clark & Fort. The main streets served are St Jean, Shoemaker, Harper, Owen, Clairmount, Epworth and Junction.",
        pdf: ["http://www.detroitmi.gov/Portals/0/docs/deptoftransportation/pdfs/2016/January/11Clairmount.pdf"],
        services: {
            "Monday-Friday": {
                service_hours: ["5:00am", "9:00pm"],
                frequency: [
                    ["all day", 45],
                ]
            }
        },
        notes: ""
    },
    {
        number: 12,
        name: 'Conant',
        orientation: 'NS',
        color: "#9b5ba5",
        radius: 0,
        rt_id: 6806,
        downtown: false,
        days_per_week: ['Monday', 'Sunday'],
        between: ['Fairgrounds TC', 'Belle Isle'],
        via: ['Conant', 'E. Outer Dr'],
        description: "An east side route that connects Detroit from Belle Isle to Fairgrounds. The main streets served are Conant Street, Mt Elliot, E Grand Blvd and State Fair. In addition to Detroit, this route also serves Hamtramck.",
        pdf: ["http://www.detroitmi.gov/Portals/0/docs/deptoftransportation/pdfs/2016/April%202016/12ConantMS.pdf?ver=2016-04-22-150443-267"],
        services: {
            "Monday-Friday": {
                service_hours: ["5:45am", "8:45pm"],
                frequency: [
                    ["all day", 50],
                ]
            },
            "Saturday": {
                service_hours: ["7:30am", "8:45pm"],
                frequency: [
                    ["all day", 60]
                ]
            },
            "Sunday/Holiday": {
                service_hours: ["8:00am", "6:45pm"],
                frequency: [
                    ["all day", 60]
                ]
            }
        },
        notes: ""
    },
    {
        number: 13,
        name: 'Conner',
        orientation: 'NS',
        color: "#9b5ba5",
        radius: 0,
        rt_id: 6807,
        downtown: false,
        days_per_week: ['Monday', 'Sunday'],
        between: ['Conner & Jefferson', 'Bel-Air Center'],
        via: ['Conner'],
        pdf: ["http://www.detroitmi.gov/Portals/0/docs/deptoftransportation/pdfs/2016/January/13ConnerMS.pdf"],
        description: "An east Side route that connects Detroit from Conner & Jefferson to Bel-Air Center. The main streets served are Conner St and Hoover St.",
        services: {
            "Monday-Friday": {
                service_hours: ["6:15am", "9:45pm"],
                frequency: [
                    ["peak", 40],
                    ["off-peak", 60]
                ]
            },
            "Saturday": {
                service_hours: ["5:30am", "8:30pm"],
                frequency: [
                    ["all day", 60]
                ]
            },
            "Sunday/Holiday": {
                service_hours: ["7:00am", "7:00pm"],
                frequency: [
                    ["all day", 60]
                ]
            }
        },
        notes: ""
    },
    {
        number: 8,
        name: 'Warren',
        orientation: 'EW',
        color: "#004445",
        radius: 99,
        downtown: false,
        rt_id: 6808,        
        days_per_week: ['Monday', 'Sunday'],
        between: ['Warren & Telegraph', 'Warren & Moross'],
        via: ['Warren', 'Forest'],
        pdf: ["http://www.detroitmi.gov/Portals/0/docs/deptoftransportation/pdfs/2018/8WarrenMF.pdf", "http://www.detroitmi.gov/Portals/0/docs/deptoftransportation/pdfs/2018/8WarrenSS.pdf"],
        description: "A crosstown route that offers 24/7 service and improved frequency as part of the ConnectTen network. Connects Detroit from Mack & Moross to Warren & Telegraph. The main street served is Warren Ave. In addition to Detroit, this route also serves Dearborn.",
        services: {
            "Monday-Friday": {
                service_hours: ["24 hours"],
                frequency: [
                    ["peak", 20],
                    ["off-peak", 30],
                    ["evening", 60]
                ]
            },
            "Saturday": {
                service_hours: ["24 hours"],
                frequency: [
                    ["day", 45],
                    ["evening", 60]
                ]
            },
            "Sunday/Holiday": {
                service_hours: ["24 hours"],
                frequency: [
                    ["day", 45],
                    ["evening", 60]
                ]
            }
        },
        notes: ""
    },
    {
        number: 15,
        name: 'Chicago Davison',
        orientation: 'EW',
        color: "#0079c2",
        radius: 0,
        downtown: false,
        rt_id: 6809,
        days_per_week: ['Monday', 'Sunday'],
        between: ['Rouge Park', 'Woodward & Manchester'],
        via: [''],
        description: "A crosstown route that connects Detroit from Rouge Park to Woodward & Manchester. The main streets served are Chicago and Davison. In addition to Detroit, this route also serves Highland Park.",
        pdf: ["http://www.detroitmi.gov/Portals/0/docs/Bus%20Schedules/January%202018/15ChicagoDavison.pdf"],
        services: {
            "Monday-Friday": {
                service_hours: ["5:00am", "9:15pm"],
                frequency: [
                    ["peak", 25],
                    ["off-peak", 60]
                ]
            },
            "Saturday": {
                service_hours: ["7:00am", "9:00pm"],
                frequency: [
                    ["all day", 50]
                ]
            },
            "Sunday/Holiday": {
                service_hours: ["7:00am", "8:00pm"],
                frequency: [
                    ["all day", 50]
                ]
            }
        },
        notes: ""
    },
    {
        number: 16,
        name: 'Dexter',
        orientation: 'NS',
        color: "#44aa42",
        radius: 0,
        downtown: true,
        rt_id: 6810,
        days_per_week: ['Monday', 'Sunday'],
        between: ['Rosa Parks TC', 'Providence Hospital'],
        via: ['Cass', 'West Grand Bl.', 'Dexter', 'Greenfield', 'Livernois', 'Curtis'],
        pdf: ["http://www.detroitmi.gov/Portals/0/docs/Bus%20Schedules/January%202018/16DexterMF.pdf", "http://www.detroitmi.gov/Portals/0/docs/Bus%20Schedules/January%202018/16DexterSS.pdf"],
        description: "Connects Detroit from Downtown Rosa Parks Transit Center to Providence Hospital (JL Hudson & Greenfield). The main streets served are W Outer Drive, Cass, Dexter, W Grand Blvd and Greenfield. In addition to Detroit, this route also serves Southfield.",
        services: {
            "Monday-Friday": {
                service_hours: ["24 hours"],
                frequency: [
                    ["peak", 12],
                    ["off-peak", 15],
                    ["evening", 30]
                ]
            },
            "Saturday": {
                service_hours: ["24 hours"],
                frequency: [
                    ["day", 30],
                    ["evening", 60]
                ]
            },
            "Sunday/Holiday": {
                service_hours: ["24 hours"],
                frequency: [
                    ["day", 30],
                    ["evening", 60]
                ]
            }
        },
        notes: ""
    },
    {
        number: 17,
        name: 'Eight Mile',
        orientation: 'EW',
        color: "#0079c2",
        radius: 0,
        downtown: false,
        rt_id: 6811,
        days_per_week: ['Monday', 'Sunday'],
        between: ['Mack & Moross', '7 Mile & Grand River'],
        via: ['8 Mile Road'],
        pdf: ["http://www.detroitmi.gov/Portals/0/docs/Bus%20Schedules/April%202018/17EightMileMF.pdf", "http://www.detroitmi.gov/Portals/0/docs/Bus%20Schedules/April%202018/17EightMileSS.pdf"],
        description: "A crosstown route that connects Detroit from Mack & Moross to 7 Mile & Grand River. The main street served is 8 Mile.",
        services: {
            "Monday-Friday": {
                service_hours: ["24 hours"],
                frequency: [
                    ["peak", 15],
                    ["off-peak", 25],
                    ["evening", 45],
                ]
            },
            "Saturday": {
                service_hours: ["24 hours"],
                frequency: [
                    ["day", 25],
                    ["evening", 50],
                ]
            },
            "Sunday/Holiday": {
                service_hours: ["24 hours"],
                frequency: [
                    ["day", 35],
                    ["evening", 55]
                ]
            }
        },
        notes: ""
    },
    {
        number: 18,
        name: 'Fenkell',
        orientation: 'NS',
        color: "#44aa42",
        radius: 0,
        downtown: true,
        rt_id: 6812,
        days_per_week: ['Monday', 'Sunday'],
        between: ['Rosa Parks TC', 'Telegraph & Fenkell'],
        via: ['12th (northbound)/14th (southbound)', 'Fenkell'],
        pdf: ["http://www.detroitmi.gov/Portals/0/docs/deptoftransportation/pdfs/2016/April%202016/18FenkellMS.pdf?ver=2016-04-22-150631-777"],
        description: "A west side route that connects Detroit from Downtown Rosa Parks Transit Center to Fenkell & Telegraph. The main streets served are Fenkell, 14th (NB) and 12th (SB).",
        services: {
            "Monday-Friday": {
                service_hours: ["5:15am", "11:00pm"],
                frequency: [
                    ["peak", 25],
                    ["off-peak", 45],
                    ["evening", 60]
                ]
            },
            "Saturday": {
                service_hours: ["6:00am", "11:00pm"],
                frequency: [
                    ["day", 45],
                    ["evening", 60]
                ]
            },
            "Sunday/Holiday": {
                service_hours: ["7:45am", "8:30pm"],
                frequency: [
                    ["day", 45],
                    ["evening", 60]
                ]
            }
        },
        notes: ""
    },
    {
        number: 19,
        name: 'Fort',
        orientation: 'EW',
        color: "#44aa42",
        radius: 0,
        downtown: true,
        rt_id: 6813,
        days_per_week: ['Monday', 'Sunday'],
        between: ['Rosa Parks TC', 'West Outer Drive'],
        via: ['Fort St.'],
        pdf: ["http://www.detroitmi.gov/Portals/0/docs/deptoftransportation/pdfs/2017/September2017Schedules/19Fort.pdf"],
        description: "A southwest route that connects Detroit from Downtown Rosa Parks Transit Center to W Outer Dr & Fort. The main street served is Fort.",
        services: {
            "Monday-Friday": {
                service_hours: ["4:30am", "12:00am"],
                frequency: [
                    ["peak", 25],
                    ["off-peak", 35],
                    ["evening", 60]
                ]
            },
            "Saturday": {
                service_hours: ["5:30am", "12:00am"],
                frequency: [
                    ["day", 40],
                    ["evening", 60]
                ]
            },
            "Sunday/Holiday": {
                service_hours: ["5:30am", "11:30pm"],
                frequency: [
                    ["all day", 60]
                ]
            }
        },
        notes: "On Sundays, this bus departs Rosa Parks Transit Center after a layover as Route 49-Vernor. Riders remaining on the bus through the layover may continue without using a transfer."
    },
    {
        number: 3,
        name: 'Grand River',
        orientation: 'EW',
        color: "#004445",
        radius: 99,
        downtown: true,
        rt_id: 6814,
        days_per_week: ['Monday', 'Sunday'],
        between: ['Rosa Parks TC', 'West 7 Mile'],
        via: ['Grand River'],
        pdf: ["http://www.detroitmi.gov/Portals/0/docs/deptoftransportation/pdfs/2018/3GrandRiverMF.pdf", "http://www.detroitmi.gov/Portals/0/docs/deptoftransportation/pdfs/2018/3GrandRiverSS.pdf"],
        description: "A west side route that offers 24/7 service and improved frequency as part of the ConnectTen network. Connects Detroit from Larned & St Antoine to 7 Mile & Grand River. The main street served is Grand River.",
        services: {
            "Monday-Friday": {
                service_hours: ["24 hours"],
                frequency: [
                    ["peak", 10],
                    ["off-peak", 15],
                    ["evening", 30]
                ]
            },
            "Saturday": {
                service_hours: ["24 hours"],
                frequency: [
                    ["day", 20],
                    ["evening", "30-60"]
                ]
            },
            "Sunday/Holiday": {
                service_hours: ["24 hours"],
                frequency: [
                    ["day", 30],
                    ["evening", "30-60"]
                ]
            }
        },
        notes: ""
    },
    {
        number: 10,
        name: 'Greenfield',
        orientation: 'NS',
        color: "#004445",
        radius: 99,
        downtown: false,
        rt_id: 6815,
        days_per_week: ['Monday', 'Sunday'],
        between: ['Northland Mall', 'Fairlane Mall'],
        via: ["Greenfield"],
        pdf: ["http://www.detroitmi.gov/Portals/0/docs/deptoftransportation/pdfs/2018/10GreenfieldMF.pdf", "http://www.detroitmi.gov/Portals/0/docs/deptoftransportation/pdfs/2018/10GreenfieldSS.pdf"],
        description: "Offers 24/7 service and improved frequency as part of the ConnectTen network. Connects Southfield, Detroit and Dearborn between Providence Hospital and Fairlane Town Center. The main street served in Greenfield.",
        services: {
            "Monday-Friday": {
                service_hours: ["24 hours"],
                frequency: [
                    ["day", 15],
                    ["evening", "30-60"]
                ]
            },
            "Saturday": {
                service_hours: ["24 hours"],
                frequency: [
                    ["day", 20],
                    ["evening", "30-60"]
                ]
            },
            "Sunday/Holiday": {
                service_hours: ["24 hours"],
                frequency: [
                    ["day", 30],
                    ["evening", "35-60"]
                ]
            }
        },
        notes: ""
    },
    {
        number: 23,
        name: 'Hamilton',
        orientation: 'NS',
        color: "#44aa42",
        radius: 0,
        downtown: true,
        rt_id: 6816,
        days_per_week: ['Monday', 'Sunday'],
        between: ['Rosa Parks TC', '8 Mile Meijer'],
        via: ['2nd', 'Hamilton', 'McNichols', 'John R'],
        description: "A west side route that connects Detroit from Downtown Rosa Parks Transit Center to 8 Mile & Woodward (Gateway Shopping Plaza & Meijer). The main streets used are McNichols, John R, Hamilton and 3rd.",
        pdf: ["http://www.detroitmi.gov/Portals/0/docs/deptoftransportation/pdfs/2017/September2017Schedules/23Hamilton.pdf"],
        services: {
            "Monday-Friday": {
                service_hours: ["5:45am", "10:40pm"],
                frequency: [
                    ["day", 40],
                    ["evening", 60]
                ]
            },
            "Saturday": {
                service_hours: ["7:00am", "9:00pm"],
                frequency: [
                    ["all day", 60]
                ]
            },
            "Sunday/Holiday": {
                service_hours: ["7:00am", "8:00pm"],
                frequency: [
                    ["all day", 60]
                ]
            }
        },
        notes: ""
    },
    {
        number: 9,
        name: 'Jefferson',
        orientation: 'EW',
        color: "#004445",
        radius: 99,
        downtown: true,
        rt_id: 6817,
        days_per_week: ['Monday', 'Sunday'],
        between: ['Rosa Parks TC', 'Jefferson & Maryland'],
        via: ['Jefferson'],
        description: "An east side route that offers 24/7 service and improved frequency as part of the ConnectTen network. Connects Detroit from Downtown Rosa Parks Transit Center to Maryland & Jefferson. The main street used is Jefferson.",
        pdf: ["http://www.detroitmi.gov/Portals/0/docs/deptoftransportation/pdfs/2018/9JeffersonMF.pdf", "http://www.detroitmi.gov/Portals/0/docs/deptoftransportation/pdfs/2018/9JeffersonSS.pdf"],
        services: {
            "Monday-Friday": {
                service_hours: ["24 hours"],
                frequency: [
                    ["peak", 17],
                    ["off-peak", 35]
                ]
            },
            "Saturday": {
                service_hours: ["24 hours"],
                frequency: [
                    ["day", 25],
                    ["evening", "30-60"]
                ]
            },
            "Sunday/Holiday": {
                service_hours: ["24 hours"],
                frequency: [
                    ["day", 35],
                    ["evening", "35-60"]
                ]
            }
        },
        notes: ""
    },
    {
        number: 27,
        name: 'Joy',
        orientation: 'EW',
        color: "#44aa42",
        radius: 0,
        downtown: true,
        rt_id: 6818,
        days_per_week: ['Monday', 'Sunday'],
        between: ['Redford Plaza', 'Rosa Parks TC'],
        via: ['Lafayette', 'W. Grand Blvd.', 'Joy Rd.'],
        pdf: ["http://www.detroitmi.gov/Portals/0/docs/deptoftransportation/pdfs/2017/September2017Schedules/27Joy.pdf"],
        description: "A west side route that connects Detroit from Telegraph & W Chicago (Redford Plaza) to Downtown Rosa Parks Transit Center. The main streets served are Joy Rd, W Lafayette and W Grand Blvd.",
        services: {
            "Monday-Friday": {
                service_hours: ["5:30am", "11:00pm"],
                frequency: [
                    ["peak", 30],
                    ["off-peak", 50],
                    ["evening", 60],
                ]
            },
            "Saturday": {
                service_hours: ["7:00am", "9:45pm"],
                frequency: [
                    ["all day", 60]
                ]
            },
            "Sunday/Holiday": {
                service_hours: ["7:00am", "6:45pm"],
                frequency: [
                    ["all day", 60]
                ]
            }
        },
        notes: ""
    },
    {
        number: 29,
        name: 'Linwood',
        orientation: 'NS',
        color: "#44aa42",
        radius: 0,
        downtown: true,
        rt_id: 6819,
        days_per_week: ['Monday', 'Sunday'],
        between: ['Rosa Parks TC', 'Univ. of Detroit Mercy'],
        via: ['Trumbull', 'Linwood'],
        pdf: ["http://www.detroitmi.gov/Portals/0/docs/deptoftransportation/pdfs/2017/September2017Schedules/29Linwood.pdf"],
        description: "A west side route that connects Detroit from Downtown Rosa Parks Transit Center to University of Detroit Mercy. The main streets used are Trumbull and Linwood.",
        services: {
            "Monday-Friday": {
                service_hours: ["5:15am", "11:30pm"],
                frequency: [
                    ["peak", 35],
                    ["off-peak", 60]
                ]
            },
            "Saturday": {
                service_hours: ["6:45am", "9:30pm"],
                frequency: [
                    ["all day", 60]
                ]
            },
            "Sunday/Holiday": {
                service_hours: ["7:00am", "7:45pm"],
                frequency: [
                    ["all day", 60]
                ]
            }
        },
        notes: "On Saturdays, Sundays and weekday nights, this bus departs Rosa Parks Transit Center after a layover as Route 27-Joy. Riders remaining on the bus through the layover may continue without using a transfer."
    },
    {
        number: 30,
        name: 'Livernois',
        orientation: 'NS',
        color: "#9b5ba5",
        radius: 0,
        downtown: false,
        rt_id: 6820,
        days_per_week: ['Monday', 'Sunday'],
        between: ['Fairgrounds TC', 'W. Jefferson & Brennan'],
        via: ['Livernois'],
        description: "Connects neighborhoods between northwest Detroit to southwest Detroit from 8 Mile & Jefferson. Main streets served are Livernois, Jefferson & Dragoon.",
        pdf: ["http://www.detroitmi.gov/Portals/0/docs/deptoftransportation/pdfs/2016/April%202016/30LivernoisMS.pdf?ver=2016-04-22-151449-233"],
        services: {
            "Monday-Friday": {
                service_hours: ["6:00am", "9:45pm"],
                frequency: [
                    ["peak", 30],
                    ["off-peak", 60]
                ]
            },
            "Saturday": {
                service_hours: ["7:00am", "9:45pm"],
                frequency: [
                    ["all day", 60]
                ]
            },
            "Sunday/Holiday": {
                service_hours: ["7:00am", "7:45pm"],
                frequency: [
                    ["all day", 60]
                ]
            }
        },
        notes: ""
    },
    {
        number: 31,
        name: 'Mack',
        orientation: 'EW',
        color: "#44aa42",
        radius: 0,
        downtown: true,
        rt_id: 6821,
        days_per_week: ['Monday', 'Sunday'],
        between: ['Mack & Moross', 'Rosa Parks TC'],
        via: ['Mack', 'Cass'],
        description: "An East side route that connects Detroit from Mack & Moross to Downtown Rosa Parks Transit Center. The main streets served are Mack and Cass.",
        pdf: ["http://www.detroitmi.gov/Portals/0/docs/deptoftransportation/pdfs/2016/January/31MackMS.pdf"],
        services: {
            "Monday-Friday": {
                service_hours: ["4:45am", "12:45am"],
                frequency: [
                    ["peak", 20],
                    ["off-peak", 30],
                    ["evening", "30-60"]
                ]
            },
            "Saturday": {
                service_hours: ["5:30am", "10:45pm"],
                frequency: [
                    ["day", 30],
                    ["evening", 60]
                ]
            },
            "Sunday/Holiday": {
                service_hours: ["6:45am", "9:45pm"],
                frequency: [
                    ["all day", 55]
                ]
            }
        },
        notes: ""
    },
    {
        number: 32,
        name: 'McNichols',
        orientation: 'EW',
        color: "#0079c2",
        radius: 0,
        downtown: false,
        rt_id: 6822,
        days_per_week: ['Monday', 'Sunday'],
        between: ['6 Mile & Telegraph', 'Mack & Moross'],
        via: ['McNichols', 'Cadieux'],
        description: "A crosstown route that connects Detroit from McNichols & Telegraph to McNichols & Cadieux. The main streets used are McNichols and Seymour St.",
        pdf: ["http://www.detroitmi.gov/Portals/0/docs/deptoftransportation/pdfs/2017/Jan2017schedules/32McNichols.pdf?ver=2017-01-30-160912-920"],
        services: {
            "Monday-Friday": {
                service_hours: ["5:00am", "1:45am"],
                frequency: [
                    ["peak", 35],
                    ["off-peak", 50]
                ]
            },
            "Saturday": {
                service_hours: ["5:45am", "1:00am"],
                frequency: [
                    ["day", 40],
                    ["evening", 60]
                ]
            },
            "Sunday/Holiday": {
                service_hours: ["7:00am", "10:15pm"],
                frequency: [
                    ["all day", 60]
                ]
            }
        },
        notes: ""
    },
    {
        number: 6,
        name: 'Gratiot',
        orientation: 'NS',
        color: "#004445",
        radius: 99,
        downtown: true,
        rt_id: 6823,
        days_per_week: ['Monday', 'Sunday'],
        between: ['3rd & Abbott', '8 Mile & Gratiot'],
        via: ['Gratiot'],
        description: "An east side route that offers 24/7 service and improved frequency as part of the ConnectTen network. Connects Detroit from 3rd & Michigan to Gratiot & 8 Mile. The main street served is Gratiot.",
        pdf: ["http://www.detroitmi.gov/Portals/0/docs/deptoftransportation/pdfs/2018/6GratiotMF.pdf", "http://www.detroitmi.gov/Portals/0/docs/deptoftransportation/pdfs/2018/6GratiotSS.pdf"],
        services: {
            "Monday-Friday": {
                service_hours: ["24 hours"],
                frequency: [
                    ["day", 12],
                    ["evening", "30-60"]
                ]
            },
            "Saturday": {
                service_hours: ["24 hours"],
                frequency: [
                    ["all day", 30]
                ]
            },
            "Sunday/Holiday": {
                service_hours: ["24 hours"],
                frequency: [
                    ["all day", 30]
                ]
            }
        },
        notes: ""
    },
    {
        number: 2,
        name: 'Michigan',
        orientation: 'EW',
        color: "#004445",
        radius: 99,
        downtown: true,
        rt_id: 6824,
        days_per_week: ['Monday', 'Sunday'],
        between: ['Rosa Parks TC', 'Fairlane Mall'],
        via: ['Michigan Ave'],
        description: "A west side route that offers 24/7 service and improved frequency as part of the ConnectTen network. Connects Detroit from Downtown Rosa Parks Transit Center to Fairlane Mall. The main street used is Michigan.",
        pdf: ["http://www.detroitmi.gov/Portals/0/docs/deptoftransportation/pdfs/2018/2MichiganMF.pdf", "http://www.detroitmi.gov/Portals/0/docs/deptoftransportation/pdfs/2018/2MichiganSS.pdf"],
        services: {
            "Monday-Friday": {
                service_hours: ["24 hours"],
                frequency: [
                    ["peak", 20],
                    ["off-peak", 35],
                    ["evening", 50]
                ]
            },
            "Saturday": {
                service_hours: ["24 hours"],
                frequency: [
                    ["day", 30],
                    ["evening", "30-60"],
                ]
            },
            "Sunday/Holiday": {
                service_hours: ["24 hours"],
                frequency: [
                    ["day", 35],
                    ["evening", "35-60"],
                ]
            }
        },
        notes: ""
    },
    {
        number: 38,
        name: 'Plymouth',
        orientation: 'EW',
        color: "#0079c2",
        radius: 0,
        downtown: false,
        rt_id: 6825,
        days_per_week: ['Monday', 'Sunday'],
        between: ['I-96 & Middlebelt', '8 Mile & Hayes'],
        via: ['Plymouth', 'Elmhurst', 'Caniff'],
        description: "Connects Livonia, Redford, Detroit and Hamtramck between Millennium Park and Gratiot & French. Monday-Friday peak-hour trips extend to Hayes & 8 Mile. The main streets served are Plymouth, Elmhurst, Calvert/Trowbridge, Harmon/Collingwood, Caniff, Mt Elliott, Miller, Georgia, E Outer Dr and Hayes.",
        pdf: ["http://www.detroitmi.gov/Portals/0/docs/deptoftransportation/pdfs/2016/January/38Plymouth.pdf"],
        services: {
            "Monday-Friday": {
                service_hours: ["4:00am", "12:00am"],
                frequency: [
                    ["day", 45],
                    ["evening", 60]
                ]
            },
            "Saturday": {
                service_hours: ["4:00am", "10:30pm"],
                frequency: [
                    ["all day", 60]
                ]
            },
            "Sunday/Holiday": {
                service_hours: ["4:00am", "8:30pm"],
                frequency: [
                    ["all day", 60]
                ]
            }
        },
        notes: ""
    },
    {
        number: 39,
        name: 'Puritan',
        orientation: 'EW',
        color: "#0079c2",
        radius: 0,
        downtown: false,
        rt_id: 6826,
        days_per_week: ['Monday', 'Sunday'],
        between: ['Southfield & Fenkell', 'Manchester & Woodward'],
        via: ['Fenkell', 'Puritan'],
        description: "A west side route that connects Detroit from Southfield & Fenkell to Manchester & Woodward. The main street served is Puritan.",
        pdf: ["http://www.detroitmi.gov/Portals/0/docs/deptoftransportation/pdfs/2016/January/39Puritan.pdf"],
        services: {
            "Monday-Friday": {
                service_hours: ["6:00am", "8:30pm"],
                frequency: [
                    ["all day", 60],
                ]
            },
            "Saturday": {
                service_hours: ["7:00am", "6:30pm"],
                frequency: [
                    ["all day", 60]
                ]
            },
            "Sunday/Holiday": {
                service_hours: ["8:00am", "4:00pm"],
                frequency: [
                    ["all day", 65]
                ]
            }
        },
        notes: ""
    },
    {
        number: 40,
        name: 'Russell',
        orientation: 'NS',
        color: "#44aa42",
        radius: 0,
        downtown: true,
        rt_id: 6827,
        days_per_week: ['Monday', 'Friday'],
        between: ['Rosa Parks TC', 'Van Dyke & E. Outer Dr'],
        via: [''],
        description: "An east side route that connects Detroit from Downtown Rosa Parks Transit Center to E outer Dr & Van Dyke. The main streets served are Russell, Dequindre and E Outer Dr.",
        pdf: ["http://www.detroitmi.gov/Portals/0/docs/deptoftransportation/pdfs/2016/January/40RussellMF.pdf"],
        services: {
            "Monday-Friday": {
                service_hours: ["5:00am", "7:45pm"],
                frequency: [
                    ["all day", 65]
                ]
            }
        },
        notes: ""
    },
    {
        number: 41,
        name: 'Schaefer',
        orientation: 'NS',
        color: "#9b5ba5",
        radius: 0,
        downtown: false,
        rt_id: 6828,
        days_per_week: ['Monday', 'Sunday'],
        between: ['8 Mile & Schaefer', 'Brennan Loop'],
        via: ['Schaefer', 'W. Jefferson'],
        description: "A west side route that connects Detroit from 8 Mile & Schaefer to Brennan & Jefferson (Del Ray). The main street used is Schaefer Hwy. In addition to Detroit, this route serves Dearborn and River Rouge.",
        pdf: ["http://www.detroitmi.gov/Portals/0/docs/deptoftransportation/pdfs/2016/January/41SchaeferMS.pdf"],
        services: {
            "Monday-Friday": {
                service_hours: ["5:15am", "9:15pm"],
                frequency: [
                    ["all day", 60],
                ]
            },
            "Saturday": {
                service_hours: ["7:00am", "8:45pm"],
                frequency: [
                    ["all day", 60]
                ]
            },
            "Sunday/Holiday": {
                service_hours: ["7:00am", "8:45pm"],
                frequency: [
                    ["all day", 60]
                ]
            }
        },
        notes: ""
    },
    {
        number: 42,
        name: 'Mid City Loop',
        orientation: 'CW',
        color: "#d07c32",
        radius: 0,
        downtown: false,
        rt_id: 6829,
        days_per_week: ['Monday', 'Sunday'],
        between: ['Woodward & Manchester', 'Woodward & Mack'],
        via: ['Rosa Parks', 'Hamilton', 'Manchester', 'Oakland', 'St. Antoine'],
        description: "A unique one-directional route that connects specific Detroit neighborhoods to more resource intensive routes and areas. This route begins and ends at Manchester & Woodward. The main streets served are Oakland Ave, Rosa Parks Blvd, St Antoine and Second.",
        pdf: ["http://www.detroitmi.gov/Portals/0/docs/Bus%20Schedules/January%202018/42%20Mid-City%20Loop.pdf"],
        services: {
            "Monday-Friday": {
                service_hours: ["5:20am", "9:00pm"],
                frequency: [
                    ["peak", 25],
                    ["off-peak", 30],
                    ["evening", 60]
                ]
            },
            "Saturday": {
                service_hours: ["7:15am", "7:00pm"],
                frequency: [
                    ["all day", 60]
                ]
            },
            "Sunday/Holiday": {
                service_hours: ["8:15am", "6:00pm"],
                frequency: [
                    ["all day", 60]
                ]
            }
        },
        notes: ""
    },
    {
        number: 43,
        name: 'Schoolcraft',
        orientation: 'EW',
        color: "#0079c2",
        radius: 0,
        downtown: false,
        rt_id: 6830,
        days_per_week: ['Monday', 'Sunday'],
        between: ['Redford Plaza', '8 Mile & Ryan'],
        via: ['Schoolcraft', 'Oakman Blvd', 'Manchester', 'Oakland'],
        description: "Connects Redford, Detroit & Highland Park between Redford Plaza and Woodward & Manchester. Monday-Friday peak hour trips extend to 8 Mile & Ryan. The main streets served are Schoolcraft, Telegraph, Davison, Ewald Circle, Oakman, Oakland, Manchester, Dequindre, Conant, E Outer Dr & Ryan.",
        pdf: ["http://www.detroitmi.gov/Portals/0/docs/deptoftransportation/pdfs/2016/January/43Schoolcraft.pdf"],
        services: {
            "Monday-Friday": {
                service_hours: ["5:00am", "8:00pm"],
                frequency: [
                    ["peak", 50],
                    ["off-peak", 60]
                ]
            },
            "Saturday": {
                service_hours: ["7:00am", "7:00pm"],
                frequency: [
                    ["all day", 60]
                ]
            },
            "Sunday/Holiday": {
                service_hours: ["10:00am", "7:00pm"],
                frequency: [
                    ["all day", 50]
                ]
            }
        },
        notes: ""
    },
    {
        number: 7,
        name: 'Seven Mile',
        orientation: 'EW',
        color: "#004445",
        radius: 99,
        downtown: false,
        rt_id: 6831,
        days_per_week: ['Monday', 'Sunday'],
        between: ['Meijer Old Redford', 'Mack & Moross'],
        via: ['Lahser', '7 Mile', 'Morang', 'Moross'],
        description: "Offers 24 /7 service and improved frequency as part of the ConnectTen network. Connects Redford and Detroit between Meijer Old Redford and St John Hospital. Main streets served are Grand River, Lasher, 7 mile, Cadieux, Morang and Moross.",
        pdf: ["http://www.detroitmi.gov/Portals/0/docs/deptoftransportation/pdfs/2018/7SevenMileMF.pdf", "http://www.detroitmi.gov/Portals/0/docs/deptoftransportation/pdfs/2018/7SevenMileSS.pdf"],
        services: {
            "Monday-Friday": {
                service_hours: ["24 hours"],
                frequency: [
                    ["day", "15-20"],
                    ["evening", "30-60"]
                ]
            },
            "Saturday": {
                service_hours: ["24 hours"],
                frequency: [
                    ["day", 40],
                    ["evening", "40-60"]
                ]
            },
            "Sunday/Holiday": {
                service_hours: ["24 hours"],
                frequency: [
                    ["day", 45],
                    ["evening", "45-60"]                
                ]
            }
        },
        notes: ""
    },
    {
        number: 46,
        name: 'Southfield',
        orientation: 'NS',
        color: "#9b5ba5",
        radius: 0,
        downtown: false,
        rt_id: 6832,
        days_per_week: ['Monday', 'Friday'],
        between: ['9 Mile & Rutland', 'Fairlane Mall'],
        via: ['Southfield Service Drive'],
        description: "A west side peak hour route that connects Detroit from 9 Mile & Rutland to Fairlane Mall. The main streets served are Southfield and Paul St. In addition to Detroit, this route also serves Dearborn and Southfield.",
        pdf: ["http://www.detroitmi.gov/Portals/0/docs/deptoftransportation/pdfs/2017/September2017Schedules/46Southfield.pdf"],
        services: {
            "Monday-Friday": {
                service_hours: ["5:45am", "7:45pm"],
                frequency: [
                    ["morning (5:45am - 9:15am)", 50],
                    ["evening (2:30pm - 7:45pm)", 50]
                ]
            }
        },
        notes: ""
    },
    {
        number: 47,
        name: 'Tireman',
        orientation: 'EW',
        color: "#0079c2",
        radius: 0,
        downtown: false,
        rt_id: 6833,
        days_per_week: ['Monday', 'Sunday'],
        between: ['Warren & Pierson', 'John R & Mack'],
        via: ['Warren', 'Tireman', 'MLK'],
        description: "A west side route that connects Detroit from Warren & Pierson to John R & Mack. The main streets served are MLK, W Grand Blvd and Tireman.",
        pdf: ["http://www.detroitmi.gov/Portals/0/docs/deptoftransportation/pdfs/2016/January/47TiremanMS.pdf"],
        services: {
            "Monday-Friday": {
                service_hours: ["5:15am", "7:45pm"],
                frequency: [
                    ["all day", 50],
                ]
            },
            "Saturday": {
                service_hours: ["7:45am", "6:00pm"],
                frequency: [
                    ["all day", 50]
                ]
            }
        },
        notes: ""
    },
    {
        number: 5,
        name: 'Van Dyke/Lafayette',
        orientation: 'NS',
        color: "#004445",
        radius: 99,
        downtown: true,
        rt_id: 6834,
        days_per_week: ['Monday', 'Sunday'],
        between: ['Bel Air Center', 'Rosa Parks TC'],
        via: ['Lafayette', 'Van Dyke'],
        description: "An east side route that offers 24/7 service and improved frequency as part of the ConnectTen network. Connects Detroit form Bel Air Center to Downtown Rosa Parks Transit Center. The main streets served are Van Dyke and E Lafayette.",
        pdf: ["http://www.detroitmi.gov/Portals/0/docs/deptoftransportation/pdfs/2018/5VanDykeLafMF.pdf", "http://www.detroitmi.gov/Portals/0/docs/deptoftransportation/pdfs/2018/5VanDykeLafSS.pdf"],
        services: {
            "Monday-Friday": {
                service_hours: ["24 hours"],
                frequency: [
                    ["peak", 20],
                    ["off-peak", 30],
                    ["evening", "30-60"]
                ]
            },
            "Saturday": {
                service_hours: ["24 hours"],
                frequency: [
                    ["day", 35],
                    ["evening", "35-60"]
                ]
            },
            "Sunday/Holiday": {
                service_hours: ["24 hours"],
                frequency: [
                    ["day", 50],
                    ["evening", 60]
                ]
            }
        },
        notes: "On weekday and Saturday nights, this bus departs Rosa Parks Transit Center after a layover as Route 25-Jefferson. Riders remaining on the bus through the layover may continue without using a transfer."
    },
    {
        number: 1,
        name: 'Vernor',
        orientation: 'EW',
        color: "#004445",
        radius: 99,
        downtown: true,
        rt_id: 6835,
        days_per_week: ['Monday', 'Sunday'],
        between: ['Michigan & Schaefer', 'Rosa Parks TC'],
        via: ['Vernor', 'Bagley', 'Lafayette'],
        description: "Offers 24/7 service and improved frequency as part of the ConnectTen network. Connects Detroit & Dearborn between Rosa Parks Transit Center and Schaefer & Michigan. The main streets served are Lafayette, Trumbull, Bagley, Vernor, Wyoming & Michigan.",
        pdf: ["http://www.detroitmi.gov/Portals/0/docs/deptoftransportation/pdfs/2018/1VernorMS.pdf"],
        services: {
            "Monday-Friday": {
                service_hours: ["24 hours"],
                frequency: [
                    ["day", 20],
                    ["evening", 45]
                ]
            },
            "Saturday": {
                service_hours: ["24 hours"],
                frequency: [
                    ["day", 25],
                    ["evening", 45]
                ]
            },
            "Sunday/Holiday": {
                service_hours: ["24 hours"],
                frequency: [
                    ["all day", 55]
                ]
            }
        },
        notes: "On Sundays, this bus departs Rosa Parks Transit Center after a layover as Route 19-Fort. Riders remaining on the bus through the layover may continue without using a transfer."
    },
    {
        number: 4,
        name: 'Woodward',
        orientation: 'NS',
        color: "#004445",
        radius: 99,
        downtown: true,
        rt_id: 6836,
        days_per_week: ['Monday', 'Sunday'],
        between: ['Fairgrounds TC', 'Downtown'],
        via: ['Woodward Avenue'],
        description: "Offers 24/7 service and improved frequency as part of the ConnectTen network. Connects Detroit and Highland Park between State Fairgrounds Transit Center and Renaissance Center in Downtown Detroit. The main streets served are Woodward, Park, Washington Blvd and Larned.",
        pdf: ["http://www.detroitmi.gov/Portals/0/docs/deptoftransportation/pdfs/2018/4WoodwardMF.pdf", "http://www.detroitmi.gov/Portals/0/docs/deptoftransportation/pdfs/2018/4WoodwardSat.pdf", "http://www.detroitmi.gov/Portals/0/docs/deptoftransportation/pdfs/2018/4WoodwardSun.pdf"],
        services: {
            "Monday-Friday": {
                service_hours: ["24 hours"],
                frequency: [
                    ["day", 10],
                    ["evening", 30]
                ]
            },
            "Saturday": {
                service_hours: ["24 hours"],
                frequency: [
                    ["day", 10],
                    ["evening", 30] 
                ]               
            },
            "Sunday/Holiday": {
                service_hours: ["24 hours"],
                frequency: [
                    ["day", 20],
                    ["evening", "30-60"]
                ]        
            }
        },
        notes: ""
    },
    {
        number: 54,
        name: 'Wyoming',
        orientation: 'NS',
        color: "#9b5ba5",
        radius: 0,
        downtown: false,
        rt_id: 6837,
        days_per_week: ['Monday', 'Sunday'],
        between: ['8 Mile & Wyoming', 'Delray'],
        via: ['Wyoming', 'Dearborn'],
        description: "A westside route that connects Detroit from 8 Mile & Wyoming to S West End St & Jefferson (Del Ray). The main streets served are Wyoming and Dearborn St.",
        pdf: ["http://www.detroitmi.gov/Portals/0/docs/deptoftransportation/pdfs/2016/January/54WyomingMS.pdf"],
        services: {
            "Monday-Friday": {
                service_hours: ["5:00am", "9:45pm"],
                frequency: [
                    ["all day", 60]
                ]
            },
            "Saturday": {
                service_hours: ["7:00am", "8:45pm"],
                frequency: [
                    ["all day", 60]
                ]
            },
            "Sunday/Holiday": {
                service_hours: ["8:00am", "7:45pm"],
                frequency: [
                    ["all day", 60]
                ]
            }
        },
        notes: ""
    },
    {
        number: 60,
        name: 'Evergreen',
        orientation: 'NS',
        color: "#9b5ba5",
        radius: 0,
        downtown: false,
        rt_id: 6838,
        days_per_week: ['Monday', 'Sunday'],
        between: ['Northland Mall', 'Fairlane Mall'],
        via: ['8 Mile Rd', 'Evergreen'],
        description: "A west side route that connects Detroit on 10 Mile & Evergreen to Fairlane Mall. The main street served is Evergreen. In addition to Detroit, this route also serves Dearborn and Southfield.",
        pdf: ["http://www.detroitmi.gov/Portals/0/docs/deptoftransportation/pdfs/2017/September2017Schedules/60Evergreen.pdf"],
        services: {
            "Monday-Friday": {
                service_hours: ["5:15am", "11:00pm"],
                frequency: [
                    ["peak", 20],
                    ["off-peak", 30],
                    ["evening", 60],
                ]
            },
            "Saturday": {
                service_hours: ["6:15am", "10:30pm"],
                frequency: [
                    ["all day", "35-60"]
                ]
            },
            "Sunday/Holiday": {
                service_hours: ["7:15am", "9:15pm"],
                frequency: [
                    ["all day", 60]
                ]
            }
        },
        notes: ""
    },
    {
        number: 80,
        name: 'Villages Direct',
        orientation: 'EW',
        color: "#d07c32",
        radius: 0,
        downtown: true,
        rt_id: 6839,
        days_per_week: ['Monday', 'Sunday'],
        between: ['Jefferson & Maryland', 'W. Grand Blvd. & Trumbull'],
        via: ['Jefferson', 'Lafayette', 'Cass', 'W. Grand Blvd.'],
        description: "An east side peak hour route that connects Detroit from Jefferson & Maryland to W Grand Blvd & Trumbull. This route connects highly populated residential neighborhoods to a resource intensive neighborhood using both street and highways. The main streets served are E Lafayette, Kercheval, E Jefferson and Cass.",
        pdf: ["http://www.detroitmi.gov/Portals/0/docs/deptoftransportation/pdfs/2017/April2017schedules/80VillagesDirectMF.pdf"],
        services: {
            "Monday-Friday": {
                service_hours: ["5:30am", "7:30pm"],
                frequency: [
                    ["morning (5:30am - 9:30am)", 30],
                    ["evening (3:00pm - 7:30pm)", 30]
                ]
            }
        },
        notes: ""
    },
    {
        number: 89,
        name: 'Southwest Direct',
        orientation: 'NS',
        color: "#d07c32",
        radius: 0,
        downtown: false,
        rt_id: 6840,
        days_per_week: ['Monday', 'Sunday'],
        between: ['Trumbull & W. Grand Blvd.', 'W. Outer Dr. & Fort'],
        via: ['Bassett', 'Vernor', 'Cass', 'W. Grand Blvd.'],
        description: "Connects Lincoln Park and Detroit with express service on I-75 freeway (Fisher) between Fort & W Outer Dr and Henry Ford Hospital. The main streets served are Fort, Outer Dr, Bassett, Schaefer, Vernor, Michigan, Trumbull and Cass. Service is available during morning and evening peak hours Monday through Friday.",
        pdf: ["http://www.detroitmi.gov/Portals/0/docs/deptoftransportation/pdfs/2017/April2017schedules/89SouthwestDirectMF.pdf?ver=2017-04-21-171512-467"],
        services: {
            "Monday-Friday": {
                service_hours: ["5:30am", "8:00pm"],
                frequency: [
                    ["morning (5:30am - 10am)", 40],
                    ["evening (2:45pm - 8pm)", "40-45"]
                ]
            }
        },
        notes: ""
    },
    {
        number: 92,
        name: 'Rosedale Express',
        orientation: 'EW',
        color: "#d07c32",
        radius: 0,
        downtown: true,
        rt_id: 6841,
        days_per_week: ['Monday', 'Friday'],
        between: ['8 Mile & Evergreen', 'Downtown'],
        via: ['Grand River', 'I-96'],
        description: "Connects various neighborhoods with express service on I-96 freeway (Jeffries) between Pembroke & Vaughan and Larned & St Antoine. Service operates Monday-Friday during morning and evening peak hours. The main streets served are Pembroke, Burt Rd, 8 Mile, Evergreen, Grand River, Washington Blvd and Larned.",
        pdf: ["http://www.detroitmi.gov/Portals/0/docs/Bus%20Schedules/January%202018/92RosedaleExpressMF.pdf"],
        services: {
            "Monday-Friday": {
                service_hours: ["5:30am", "6:45pm"],
                frequency: [
                    ["morning (5:30am - 9:00am)", 35],
                    ["evening (3:15pm - 6:45pm)", "35-40"]
                ]
            }
        },
        notes: ""
    },
    {
        number: 95,
        name: 'Ryan Express',
        orientation: 'NS',
        color: "#d07c32",
        radius: 0,
        downtown: true,
        rt_id: 6843,
        days_per_week: ['Monday', 'Friday'],
        between: ['Downtown', 'Van Dyke & Outer Dr.'],
        via: ['Ryan', 'I-75'],
        description: "An east side express route that connects Detroit from E outer Dr & Van Dyke to E Larned & Shelby St. This route provides express service by using highways to decrease travel time. The main streets served are Ryan, Conant, Caniff and E Outer Dr.",
        pdf: ["http://www.detroitmi.gov/Portals/0/docs/deptoftransportation/pdfs/2017/Jan2017schedules/95RyanExpress.pdf?ver=2017-01-27-132516-670"],
        services: {
            "Monday-Friday": {
                service_hours: ["6:00am", "6:45pm"],
                frequency: [
                    ["peak", 35],
                ]
            }
        },
        notes: ""
    },
    {
        number: 96,
        name: 'Joy Express',
        orientation: 'EW',
        color: "#d07c32",
        radius: 0,
        downtown: true,
        rt_id: 6844,
        days_per_week: ['Monday', 'Friday'],
        between: ['Downtown', 'Weatherby'],
        via: ['Joy Road', 'I-96'],
        description: "A west side express route that connects Detroit from Evergreen & Plymouth Rd to E Jefferson & St. Antoine St. This route provides express service by using highways to decrease travel time. The main street served is Joy Rd.",
        pdf: ["http://www.detroitmi.gov/Portals/0/docs/deptoftransportation/pdfs/2017/Jan2017schedules/96JoyExpress.pdf?ver=2017-01-27-132707-847"],
        services: {
            "Monday-Friday": {
                service_hours: ["5:45am", "6:45pm"],
                frequency: [
                    ["peak", 35],
                ]
            }
        },
        notes: ""
    }
]

export default routeDetails;
