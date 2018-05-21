const routeDetails = [{
        number: 7,
        name: 'Cadillac/Harper',
        orientation: 'EW',
        downtown: true,
        days_per_week: ['Monday', 'Sunday'],
        between: ['Mack and Moross', 'Rosa Parks TC'],
        via: [''],
        description: "An east side route that connects Detroit from Mack & Moross to Downtown Rosa Parks Transit Center. The main streets served are Harper Ave. E Larned St. Cadillac Blvd.",
        pdf: ["http://www.detroitmi.gov/Portals/0/docs/deptoftransportation/pdfs/2016/April%202016/07CadilllacHarper.pdf"],
        services: {
            "Monday-Friday": {
                service_hours: ["5:08am", "12:02am"],
                frequency: [
                    ["peak", 30],
                    ["off-peak", 60]
                ]
            },
            "Saturday": {
                service_hours: ["6:55am", "11:49pm"],
                frequency: [
                    ["all day", 60]
                ]
            },
            "Sunday/Holiday": {
                service_hours: ["7:00am", "8:48pm"],
                frequency: [
                    ["all day", 60]
                ]
            }
        },
        notes: "On Saturdays from 7AM-8PM, this bus departs Rosa Parks Transit Center after a layover as Route 10-Chene. Riders remaining on the bus through the layover may continue without using a transfer."
    },
    {
        number: 9,
        name: 'Chalmers',
        orientation: 'NS',
        downtown: false,
        days_per_week: ['Monday', 'Sunday'],
        between: ['Jefferson & Maryland', '7 Mile & Gratiot'],
        via: ['Chalmers', "Schoenherr"],
        pdf: ["http://www.detroitmi.gov/Portals/0/docs/deptoftransportation/pdfs/2017/April2017schedules/9ChalmersMS.pdf"],
        description: "An east side route that connects Detroit from Jefferson & Maryland to 7 Mile & Gratiot. The main streets served are Chalmers and Schoenherr St.",
        services: {
            "Monday-Friday": {
                service_hours: ["5:15am", "8:52pm"],
                frequency: [
                    ["peak", 30],
                    ["off-peak", 60]
                ]
            },
            "Saturday": {
                service_hours: ["6:45am", "7:52pm"],
                frequency: [
                    ["all day", 60]
                ]
            },
            "Sunday/Holiday": {
                service_hours: ["8:20am", "5:04pm"],
                frequency: [
                    ["all day", 60]
                ]
            }
        },
        notes: ""
    },
    {
        number: 10,
        name: 'Chene',
        orientation: 'NS',
        downtown: true,
        days_per_week: ['Monday', 'Sunday'],
        between: ['Rosa Parks TC', 'Varjo & Van Dyke'],
        via: ['Lafayette', 'Chene', 'Jos. Campau', 'Nevada'],
        description: "An east side route that connects Detroit from Varjo & Van Dyke to Downtown Rosa Parks Transit Center. The main streets served are E Nevada St, Caniff St and Chene St.",
        pdf: ["http://www.detroitmi.gov/Portals/0/docs/deptoftransportation/pdfs/2016/April%202016/10CheneMS.pdf?ver=2016-04-22-150329-977"],
        services: {
            "Monday-Friday": {
                service_hours: ["5am", "10:46pm"],
                frequency: [
                    ["peak", 40],
                    ["off-peak", 60]
                ]
            },
            "Saturday": {
                service_hours: ["6:00am", "8:46pm"],
                frequency: [
                    ["all day", 60]
                ]
            },
            "Sunday/Holiday": {
                service_hours: ["8:00am", "7:50pm"],
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
        downtown: false,
        days_per_week: ['Monday', 'Sunday'],
        between: ['Clark & Fort', 'Lycaste & Jefferson'],
        via: ['Junction', 'Epworth', 'Joy', 'Harper', 'St. Jean'],
        description: "Connects Detroit from E Jefferson & Lycaste St to Clark & Fort. The main streets served are Junction, St. Jean, Clairmount St and Harper Ave.",
        pdf: ["http://www.detroitmi.gov/Portals/0/docs/deptoftransportation/pdfs/2016/January/11Clairmount.pdf"],
        services: {
            "Monday-Friday": {
                service_hours: ["5:10am", "9:03pm"],
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
        downtown: false,
        days_per_week: ['Monday', 'Sunday'],
        between: ['Fairgrounds TC', 'Belle Isle'],
        via: ['Conant', 'E. Outer Dr'],
        description: "An east side route that connects Detroit from Belle Isle to Fairgrounds. The main streets served are Conant St, Mt. Elliot and State Fair. In addition to Detroit, this route also serves Hamtramck.",
        pdf: ["http://www.detroitmi.gov/Portals/0/docs/deptoftransportation/pdfs/2016/April%202016/12ConantMS.pdf?ver=2016-04-22-150443-267"],
        services: {
            "Monday-Friday": {
                service_hours: ["5:50am", "8:43pm"],
                frequency: [
                    ["all day", 50],
                ]
            },
            "Saturday": {
                service_hours: ["7:30am", "8:43pm"],
                frequency: [
                    ["all day", 60]
                ]
            },
            "Sunday/Holiday": {
                service_hours: ["8:00am", "6:43pm"],
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
        downtown: false,
        days_per_week: ['Monday', 'Sunday'],
        between: ['Conner & Jefferson', 'Bel-Air Center'],
        via: ['Conner'],
        pdf: ["http://www.detroitmi.gov/Portals/0/docs/deptoftransportation/pdfs/2016/January/13ConnerMS.pdf"],
        description: "An east Side route that connects Detroit from Conner & Jefferson to Bel-Air Center. The main streets served are Conner St, Hoover St.",
        services: {
            "Monday-Friday": {
                service_hours: ["6:15am", "9:49pm"],
                frequency: [
                    ["peak", 40],
                    ["off-peak", 60]
                ]
            },
            "Saturday": {
                service_hours: ["5:33am", "8:27pm"],
                frequency: [
                    ["all day", 60]
                ]
            },
            "Sunday/Holiday": {
                service_hours: ["6:55am", "7:04pm"],
                frequency: [
                    ["all day", 60]
                ]
            }
        },
        notes: ""
    },
    {
        number: 14,
        name: 'Crosstown',
        orientation: 'EW',
        downtown: false,
        days_per_week: ['Monday', 'Sunday'],
        between: ['Warren & Telegraph', 'Warren & Moross'],
        via: ['Warren', 'Forest'],
        pdf: ["http://www.detroitmi.gov/Portals/0/docs/deptoftransportation/pdfs/2017/April2017schedules/14CrosstownMS.pdf?ver=2017-04-21-164624-043"],
        description: "A crosstown route that connects Detroit from Mack & Moross to Warren & Telegraph. The main street served is Warren Ave. In Addition to Detroit this route serves Dearborn.",
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
                    ["all day", 45],
                    ["evening", 60]
                ]
            },
            "Sunday/Holiday": {
                service_hours: ["24 hours"],
                frequency: [
                    ["all day", 45],
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
        downtown: false,
        days_per_week: ['Monday', 'Sunday'],
        between: ['Rouge Park', 'Woodward & Manchester'],
        via: [''],
        description: "A crosstown route that connects Detroit from Rouge Park to Woodward & Manchester. The main streets served are Chicago and Davidson.",
        pdf: ["http://www.detroitmi.gov/Portals/0/docs/Bus%20Schedules/January%202018/15ChicagoDavison.pdf"],
        services: {
            "Monday-Friday": {
                service_hours: ["5:02am", "9:16pm"],
                frequency: [
                    ["peak", 25],
                    ["off-peak", 60]
                ]
            },
            "Saturday": {
                service_hours: ["6:55am", "8:19pm"],
                frequency: [
                    ["all day", 45]
                ]
            },
            "Sunday/Holiday": {
                service_hours: ["7:00am", "7:39pm"],
                frequency: [
                    ["all day", 45]
                ]
            }
        },
        notes: ""
    },
    {
        number: 16,
        name: 'Dexter',
        orientation: 'NS',
        downtown: true,
        days_per_week: ['Monday', 'Sunday'],
        between: ['Rosa Parks TC', 'Providence Hospital'],
        via: ['Cass', 'West Grand Bl.', 'Dexter', 'Greenfield', 'Livernois', 'Curtis'],
        pdf: ["http://www.detroitmi.gov/Portals/0/docs/Bus%20Schedules/January%202018/16DexterMF.pdf", "http://www.detroitmi.gov/Portals/0/docs/Bus%20Schedules/January%202018/16DexterSS.pdf"],
        description: "A route that connects Detroit from Downtown Rosa Parks Transit Center to Providence Hospital (JL Hudson & Greenfield). The main streets served are W Outer Drive, Cass, Dexter, W Grand Blvd and Greenfield. In addition to Detroit, this route also serves Southfield.",
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
                    ["all day", 30],
                    ["evening", 60]
                ]
            },
            "Sunday/Holiday": {
                service_hours: ["24 hours"],
                frequency: [
                    ["all day", 30],
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
        downtown: false,
        days_per_week: ['Monday', 'Sunday'],
        between: ['Mack & Moross', '7 Mile & Grand River'],
        via: ['8 Mile Road'],
        pdf: ["http://www.detroitmi.gov/Portals/0/docs/Bus%20Schedules/April%202018/17EightMileMF.pdf", "http://www.detroitmi.gov/Portals/0/docs/Bus%20Schedules/April%202018/17EightMileSS.pdf"],
        description: "A crosstown route that connects Detroit from Mack & Moross to Seven Mile & Grand River. The main street served by this route is Eight Mile.",
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
                    ["all day", 25],
                    ["evening", 50],
                ]
            },
            "Sunday/Holiday": {
                service_hours: ["24 hours"],
                frequency: [
                    ["all day", 35],
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
        downtown: true,
        days_per_week: ['Monday', 'Sunday'],
        between: ['Rosa Parks TC', 'Telegraph & Fenkell'],
        via: ['12th (northbound)/14th (southbound)', 'Fenkell'],
        pdf: ["http://www.detroitmi.gov/Portals/0/docs/deptoftransportation/pdfs/2016/April%202016/18FenkellMS.pdf?ver=2016-04-22-150631-777"],
        description: "A west side route that connects Detroit from Downtown Rosa Parks Transit Center to Fenkell & Telegraph. The main streets served are Fenkell, 14th (northbound) and 12th (southbound).",
        services: {
            "Monday-Friday": {
                service_hours: ["5:10am", "11:02pm"],
                frequency: [
                    ["peak", 25],
                    ["off-peak", 45],
                    ["evening", 60]
                ]
            },
            "Saturday": {
                service_hours: ["6:00am", "10L57pm"],
                frequency: [
                    ["all day", 45],
                    ["evening", 60]
                ]
            },
            "Sunday/Holiday": {
                service_hours: ["7:41am", "8:28pm"],
                frequency: [
                    ["all day", 45],
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
        downtown: true,
        days_per_week: ['Monday', 'Sunday'],
        between: ['Rosa Parks TC', 'West Outer Drive'],
        via: ['Fort St.'],
        pdf: ["http://www.detroitmi.gov/Portals/0/docs/deptoftransportation/pdfs/2017/September2017Schedules/19Fort.pdf"],
        description: "A west side route that connects Detroit from Downtown Rosa Parks Transit Center to W Outer Dr & Fort. The main street served is Fort.",
        services: {
            "Monday-Friday": {
                service_hours: ["4:00am", "12:25am"],
                frequency: [
                    ["peak", 25],
                    ["off-peak", 35],
                    ["evening", 60]
                ]
            },
            "Saturday": {
                service_hours: ["5:00am", "12:28am"],
                frequency: [
                    ["all day", 40],
                    ["evening", 65]
                ]
            },
            "Sunday/Holiday": {
                service_hours: ["5:00am", "10:45pm"],
                frequency: [
                    ["all day", 60]
                ]
            }
        },
        notes: "On Sundays, this bus departs Rosa Parks Transit Center after a layover as Route 49-Vernor. Riders remaining on the bus through the layover may continue without using a transfer."
    },
    {
        number: 21,
        name: 'Grand River',
        orientation: 'EW',
        downtown: true,
        days_per_week: ['Monday', 'Sunday'],
        between: ['Rosa Parks TC', 'West 7 Mile'],
        via: ['Grand River'],
        pdf: ["http://www.detroitmi.gov/Portals/0/docs/Bus%20Schedules/January%202018/21GrandRiverMF.pdf", "http://www.detroitmi.gov/Portals/0/docs/Bus%20Schedules/January%202018/21GrandRiverSS.pdf"],
        description: "A west side route that connects Detroit from Downtown Larned & St Antoine to Seven Mile & Grand River. The main street served is Grand River.",
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
                    ["all day", 20],
                    ["evening", 60]
                ]
            },
            "Sunday/Holiday": {
                service_hours: ["24 hours"],
                frequency: [
                    ["all day", 30],
                    ["evening", 60]
                ]
            }
        },
        notes: ""
    },
    {
        number: 22,
        name: 'Greenfield',
        orientation: 'NS',
        downtown: false,
        days_per_week: ['Monday', 'Sunday'],
        between: ['Northland Mall', 'Fairlane Mall'],
        via: ["Greenfield"],
        pdf: ["http://www.detroitmi.gov/Portals/0/docs/deptoftransportation/pdfs/2017/September2017Schedules/22Greenfield.pdf"],
        description: "A west side route that connects Detroit from Providence Hospital to Fairlane Mall. The main street used for this route is Greenfield. In addition to Detroit, this route serves Southfield and Dearborn.",
        services: {
            "Monday-Friday": {
                service_hours: ["4:28am", "1:40am"],
                frequency: [
                    ["all day", 15],
                    ["evening", 60]
                ]
            },
            "Saturday": {
                service_hours: ["5:15am", "12:39am"],
                frequency: [
                    ["all day", 20],
                    ["evening", 30]
                ]
            },
            "Sunday/Holiday": {
                service_hours: ["6:05am", "10:38pm"],
                frequency: [
                    ["all day", 35],
                    ["evening", 60]
                ]
            }
        },
        notes: ""
    },
    {
        number: 23,
        name: 'Hamilton',
        orientation: 'NS',
        downtown: true,
        days_per_week: ['Monday', 'Sunday'],
        between: ['Rosa Parks TC', '8 Mile Meijer'],
        via: ['2nd', 'Hamilton', 'McNichols', 'John R'],
        description: "A west side route that connects Detroit from Downtown Rosa Parks Transit Center to Eight Mile Meijer. The main streets used are McNichols, John R, Hamilton and 3rd.",
        pdf: ["http://www.detroitmi.gov/Portals/0/docs/deptoftransportation/pdfs/2017/September2017Schedules/23Hamilton.pdf"],
        services: {
            "Monday-Friday": {
                service_hours: ["5:37am", "11:23pm"],
                frequency: [
                    ["all day", 40],
                    ["evening", 60]
                ]
            },
            "Saturday": {
                service_hours: ["7:08am", "9:44pm"],
                frequency: [
                    ["all day", 60]
                ]
            },
            "Sunday/Holiday": {
                service_hours: ["7:08am", "8:43pm"],
                frequency: [
                    ["all day", 60]
                ]
            }
        },
        notes: ""
    },
    {
        number: 25,
        name: 'Jefferson',
        orientation: 'EW',
        downtown: true,
        days_per_week: ['Monday', 'Sunday'],
        between: ['Rosa Parks TC', 'Jefferson & Maryland'],
        via: ['Jefferson'],
        description: "An east side route that connects Detroit from Downtown Rosa Parks Transit Center to Maryland & Jefferson. The main street used is Jefferson.",
        pdf: ["http://www.detroitmi.gov/Portals/0/docs/deptoftransportation/pdfs/2017/April2017schedules/25JeffersonMS.pdf?ver=2017-04-21-170105-283"],
        services: {
            "Monday-Friday": {
                service_hours: ["24 hours"],
                frequency: [
                    ["peak", 35],
                    ["off-peak", 35]
                ]
            },
            "Saturday": {
                service_hours: ["24 hours"],
                frequency: [
                    ["all day", 60]
                ]
            },
            "Sunday/Holiday": {
                service_hours: ["24 hours"],
                frequency: [
                    ["all day", 60]
                ]
            }
        },
        notes: ""
    },
    {
        number: 27,
        name: 'Joy',
        orientation: 'EW',
        downtown: true,
        days_per_week: ['Monday', 'Sunday'],
        between: ['Redford Plaza', 'Rosa Parks TC'],
        via: ['Lafayette', 'W. Grand Blvd.', 'Joy Rd.'],
        pdf: ["http://www.detroitmi.gov/Portals/0/docs/deptoftransportation/pdfs/2017/September2017Schedules/27Joy.pdf"],
        description: "A west side route that connects Detroit from Redford Plaza to Downtown Rosa Parks Transit Center. The main streets served are Joy Rd, Fort and W. Grand Blvd.",
        services: {
            "Monday-Friday": {
                service_hours: ["5:21am", "11:51pm"],
                frequency: [
                    ["peak", 30],
                    ["off-peak", 50],
                    ["evening", 60],
                ]
            },
            "Saturday": {
                service_hours: ["6:40am", "10:35pm"],
                frequency: [
                    ["all day", 60]
                ]
            },
            "Sunday/Holiday": {
                service_hours: ["7:01am", "7:51pm"],
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
        downtown: true,
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
                    ["all day", 60]
                ]
            },
            "Saturday": {
                service_hours: ["6:51am", "9:35pm"],
                frequency: [
                    ["all day", 60]
                ]
            },
            "Sunday/Holiday": {
                service_hours: ["7:00am", "7:40pm"],
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
        downtown: false,
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
        downtown: true,
        days_per_week: ['Monday', 'Sunday'],
        between: ['Mack & Moross', 'Rosa Parks TC'],
        via: ['Mack', 'Cass'],
        description: "An east side route that connects Detroit from Mack & Moross to Downtown Rosa Parks Transit Center. The main streets used are Mack, Cass and Moross.",
        pdf: ["http://www.detroitmi.gov/Portals/0/docs/deptoftransportation/pdfs/2016/January/31MackMS.pdf"],
        services: {
            "Monday-Friday": {
                service_hours: ["4:47am", "12:44am"],
                frequency: [
                    ["peak", 20],
                    ["off-peak", 30],
                    ["evening", 60]
                ]
            },
            "Saturday": {
                service_hours: ["5:39am", "10:51am"],
                frequency: [
                    ["peak", 30],
                    ["off-peak", 60]
                ]
            },
            "Sunday/Holiday": {
                service_hours: ["6:40am", "9:47pm"],
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
        downtown: false,
        days_per_week: ['Monday', 'Sunday'],
        between: ['6 Mile & Telegraph', 'Mack & Moross'],
        via: ['McNichols', 'Cadieux'],
        description: "A crosstown route that connects Detroit from McNichols & Telegraph to McNichols & Cadieux. The main streets used are McNichols and Seymour St.",
        pdf: ["http://www.detroitmi.gov/Portals/0/docs/deptoftransportation/pdfs/2017/Jan2017schedules/32McNichols.pdf?ver=2017-01-30-160912-920"],
        services: {
            "Monday-Friday": {
                service_hours: ["4:55am", "1:40am"],
                frequency: [
                    ["peak", 35],
                    ["off-peak", 50]
                ]
            },
            "Saturday": {
                service_hours: ["5:49am", "12:54am"],
                frequency: [
                    ["daytime", 45],
                    ["evening", 60]
                ]
            },
            "Sunday/Holiday": {
                service_hours: ["7:04am", "10:13pm"],
                frequency: [
                    ["all day", 60]
                ]
            }
        },
        notes: ""
    },
    {
        number: 34,
        name: 'Gratiot',
        orientation: 'NS',
        downtown: true,
        days_per_week: ['Monday', 'Sunday'],
        between: ['3rd & Abbott', '8 Mile & Gratiot'],
        via: ['Gratiot'],
        description: "An east side route that connects Detroit from 3rd & Abbott to Eight Mile & Gratiot. The main street served is Gratiot.",
        pdf: ["http://www.detroitmi.gov/Portals/0/docs/Bus%20Schedules/January%202018/34GratiotMF.pdf", "http://www.detroitmi.gov/Portals/0/docs/Bus%20Schedules/January%202018/34GratiotSS.pdf"],
        services: {
            "Monday-Friday": {
                service_hours: ["24 hours"],
                frequency: [
                    ["peak", 12],
                    ["off-peak", 30],
                    ["evening", 60]
                ]
            },
            "Saturday": {
                service_hours: ["24 hours"],
                frequency: [
                    ["peak", 15],
                    ["off-peak", 35],
                    ["evening", 60]
                ]
            },
            "Sunday/Holiday": {
                service_hours: ["24 hours"],
                frequency: [
                    ["peak", 30],
                    ["off-peak", 35],
                    ["evening", 60]
                ]
            }
        },
        notes: ""
    },
    {
        number: 37,
        name: 'Michigan',
        orientation: 'EW',
        downtown: true,
        days_per_week: ['Monday', 'Sunday'],
        between: ['Rosa Parks TC', 'Fairlane Mall'],
        via: ['Michigan Ave'],
        description: "A west side route that connects Detroit from Downtown Rosa Parks Transit Center to Fairlane Mall. The main street used is Michigan.",
        pdf: ["http://www.detroitmi.gov/Portals/0/docs/deptoftransportation/pdfs/2017/Jan2017schedules/37Michigan.pdf"],
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
                    ["evening", 60],
                ]
            },
            "Sunday/Holiday": {
                service_hours: ["24 hours"],
                frequency: [
                    ["day", 40],
                    ["evening", 60],
                ]
            }
        },
        notes: ""
    },
    {
        number: 38,
        name: 'Plymouth',
        orientation: 'EW',
        downtown: false,
        days_per_week: ['Monday', 'Sunday'],
        between: ['I-96 & Middlebelt', '8 Mile & Hayes'],
        via: ['Plymouth', 'Elmhurst', 'Caniff'],
        description: "A crosstown route that connects Detroit from I-96 & Middlebelt to Eight Mile and Hayes. The main streets used are Hayes, Calvert, Elmhurst St and Plymouth Rd. In addition to Detroit, this route serves Livonia and Redford Township.",
        pdf: ["http://www.detroitmi.gov/Portals/0/docs/deptoftransportation/pdfs/2016/January/38Plymouth.pdf"],
        services: {
            "Monday-Friday": {
                service_hours: ["4:10am", "12:11am"],
                frequency: [
                    ["peak", 45],
                    ["off-peak", 60]
                ]
            },
            "Saturday": {
                service_hours: ["4:22am", "10:15pm"],
                frequency: [
                    ["all day", 60]
                ]
            },
            "Sunday/Holiday": {
                service_hours: ["4:22am", "8:20pm"],
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
        downtown: false,
        days_per_week: ['Monday', 'Sunday'],
        between: ['Southfield & Fenkell', 'Manchester & Woodward'],
        via: ['Fenkell', 'Puritan'],
        description: "A west side route that connects Detroit from Southfield & Fenkell to Manchester & Woodward. The main street served is Puritan.",
        pdf: ["http://www.detroitmi.gov/Portals/0/docs/deptoftransportation/pdfs/2016/January/39Puritan.pdf"],
        services: {
            "Monday-Friday": {
                service_hours: ["6:00am", "8:27pm"],
                frequency: [
                    ["all day", 60],
                ]
            },
            "Saturday": {
                service_hours: ["7:00am", "6:24pm"],
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
        downtown: true,
        days_per_week: ['Monday', 'Friday'],
        between: ['Rosa Parks TC', 'Van Dyke & E. Outer Dr'],
        via: [''],
        description: "An east side route that connects Detroit from Downtown Rosa Parks Transit Center to E outer Dr & Van Dyke. The main streets served are Russell and E Outer Dr.",
        pdf: ["http://www.detroitmi.gov/Portals/0/docs/deptoftransportation/pdfs/2016/January/40RussellMF.pdf"],
        services: {
            "Monday-Friday": {
                service_hours: ["6:00am", "7:49pm"],
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
        downtown: false,
        days_per_week: ['Monday', 'Sunday'],
        between: ['8 Mile & Schaefer', 'Brennan Loop'],
        via: ['Schaefer', 'W. Jefferson'],
        description: "A west side route that connects Detroit from Eight Mile & Schaefer to Brennan & Jefferson (Del Ray). The main street used is Schaefer Hwy. In addition to Detroit, this route serves Dearborn.",
        pdf: ["http://www.detroitmi.gov/Portals/0/docs/deptoftransportation/pdfs/2016/January/41SchaeferMS.pdf"],
        services: {
            "Monday-Friday": {
                service_hours: ["5:10am", "9:56pm"],
                frequency: [
                    ["all day", 60],
                ]
            },
            "Saturday": {
                service_hours: ["7:00am", "8:57pm"],
                frequency: [
                    ["all day", 60]
                ]
            },
            "Sunday/Holiday": {
                service_hours: ["7:00am", "8:57pm"],
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
        downtown: false,
        days_per_week: ['Monday', 'Sunday'],
        between: ['Woodward & Manchester', 'Woodward & Mack'],
        via: ['Rosa Parks', 'Hamilton', 'Manchester', 'Oakland', 'St. Antoine'],
        description: "A unique one-directional route that connects specific Detroit neighborhoods to more resource intensive routes and areas. This route begins and ends at Manchester & Woodward. The main streets served are Oakland Ave, Rosa Parks Blvd, St Antonie and Second.",
        pdf: ["http://www.detroitmi.gov/Portals/0/docs/Bus%20Schedules/January%202018/42%20Mid-City%20Loop.pdf"],
        services: {
            "Monday-Friday": {
                service_hours: ["5:20am", "8:59pm"],
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
        downtown: false,
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
        number: 45,
        name: 'Seven Mile',
        orientation: 'EW',
        downtown: false,
        days_per_week: ['Monday', 'Sunday'],
        between: ['Meijer Old Redford', 'Mack & Moross'],
        via: ['Lahser', '7 Mile', 'Morang', 'Moross'],
        description: "Connects Redford and Detroit with 24 hour service between Meijer Old Redford and St John Hospital. Main streets served are Grand River, Lasher, 7 mile, Cadieux, Morang and Moross.",
        pdf: ["http://www.detroitmi.gov/Portals/0/docs/Bus%20Schedules/January%202018/45SevenMileMF.pdf", "http://www.detroitmi.gov/Portals/0/docs/Bus%20Schedules/January%202018/45SevenMileSS.pdf"],
        services: {
            "Monday-Friday": {
                service_hours: ["24 hours"],
                frequency: [
                    ["day", 20],
                    ["evening", 60]
                ]
            },
            "Saturday": {
                service_hours: ["24 hours"],
                frequency: [
                    ["day", 40],
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
        number: 46,
        name: 'Southfield',
        orientation: 'NS',
        downtown: false,
        days_per_week: ['Monday', 'Friday'],
        between: ['9 Mile & Rutland', 'Fairlane Mall'],
        via: ['Southfield Service Drive'],
        description: "A west side peak hour route that connects Detroit from Nine Mile & Rutland to Fairelane Mall. The main street served is Southfield. In addition to Detroit, this route also serves Dearborn and Southfield.",
        pdf: ["http://www.detroitmi.gov/Portals/0/docs/deptoftransportation/pdfs/2017/September2017Schedules/46Southfield.pdf"],
        services: {
            "Monday-Friday": {
                service_hours: ["5:48am", "8:20pm"],
                frequency: [
                    ["all day", 50]
                ]
            }
        },
        notes: ""
    },
    {
        number: 47,
        name: 'Tireman',
        orientation: 'EW',
        downtown: false,
        days_per_week: ['Monday', 'Sunday'],
        between: ['Warren & Pierson', 'John R & Mack'],
        via: ['Warren', 'Tireman', 'MLK'],
        description: "A west side route that connects Detroit from Warren & Pierson to John R & Mack. The main streets served are MLK, W. Grand Blvd and Tierman.",
        pdf: ["http://www.detroitmi.gov/Portals/0/docs/deptoftransportation/pdfs/2016/January/47TiremanMS.pdf"],
        services: {
            "Monday-Friday": {
                service_hours: ["5:10am", "7:35pm"],
                frequency: [
                    ["all day", 50],
                ]
            },
            "Saturday": {
                service_hours: ["7:40am", "6:50pm"],
                frequency: [
                    ["all day", 50]
                ]
            }
        },
        notes: ""
    },
    {
        number: 48,
        name: 'Van Dyke-Lafayette',
        orientation: 'NS',
        downtown: true,
        days_per_week: ['Monday', 'Sunday'],
        between: ['Bel Air Center', 'Rosa Parks TC'],
        via: ['Lafayette', 'Van Dyke'],
        description: "An east side route that connects Detroit form Bel Air Center to Downtown Rosa Parks Transit Center. The main streets served are Van Dyke and E Lafayette.",
        pdf: ["http://www.detroitmi.gov/Portals/0/docs/deptoftransportation/pdfs/2017/Jan2017schedules/48VanDykeLafayette.pdf?ver=2017-01-27-121537-590"],
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
                    ["all day", 35],
                    ["evening", 60]
                ]
            },
            "Sunday/Holiday": {
                service_hours: ["24 hours"],
                frequency: [
                    ["all day", 50],
                    ["evening", 60]
                ]
            }
        },
        notes: "On weekday and Saturday nights, this bus departs Rosa Parks Transit Center after a layover as Route 25-Jefferson. Riders remaining on the bus through the layover may continue without using a transfer."
    },
    {
        number: 49,
        name: 'Vernor',
        orientation: 'EW',
        downtown: true,
        days_per_week: ['Monday', 'Sunday'],
        between: ['Michigan & Schaefer', 'Rosa Parks TC'],
        via: ['Vernor', 'Bagley', 'Lafayette'],
        description: "Connects Detroit & Dearborn between Rosa Parks Transit Center and Schaefer & Michigan. The main streets served are Lafayette, Trumbull, Bagley, Vernor, Wyoming & Michigan.",
        pdf: ["http://www.detroitmi.gov/Portals/0/docs/deptoftransportation/pdfs/2017/June2017Schedules/49VernorMS.pdf?ver=2017-06-26-142208-523"],
        services: {
            "Monday-Friday": {
                service_hours: ["4:30am", "12:30am"],
                frequency: [
                    ["day", 25],
                    ["evening", 45]
                ]
            },
            "Saturday": {
                service_hours: ["5:00am", "1:00am"],
                frequency: [
                    ["day", 25],
                    ["evening", 45]
                ]
            },
            "Sunday/Holiday": {
                service_hours: ["6:00am", "12:00am"],
                frequency: [
                    ["all day", 55]
                ]
            }
        },
        notes: "On Sundays, this bus departs Rosa Parks Transit Center after a layover as Route 19-Fort. Riders remaining on the bus through the layover may continue without using a transfer."
    },
    {
        number: 53,
        name: 'Woodward',
        orientation: 'NS',
        downtown: true,
        days_per_week: ['Monday', 'Sunday'],
        between: ['Fairgrounds TC', 'Downtown'],
        via: ['Woodward Avenue'],
        description: "The 24 hour service connects Detroit and Highland Park between State Fairgrounds Transit Center and Renaissance Center in Downtown Detroit. The main streets served are Woodward, Park, Washington Blvd and Larned.",
        pdf: ["http://www.detroitmi.gov/Portals/0/docs/deptoftransportation/pdfs/2017/June2017Schedules/53WoodwardMS.pdf?ver=2017-06-26-135605-973"],
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
                    ["evening", 60]
                ]        
            }
        },
        notes: ""
    },
    {
        number: 54,
        name: 'Wyoming',
        orientation: 'NS',
        downtown: false,
        days_per_week: ['Monday', 'Sunday'],
        between: ['8 Mile & Wyoming', 'Delray'],
        via: ['Wyoming', 'Dearborn'],
        description: "A westside route that connects Detroit from Eight Mile & Wyoming to S West End St & Jefferson (Del Ray). The main streets served are Wyoming, & Dearborn St.",
        pdf: ["http://www.detroitmi.gov/Portals/0/docs/deptoftransportation/pdfs/2016/January/54WyomingMS.pdf"],
        services: {
            "Monday-Friday": {
                service_hours: ["5:00am", "9:51pm"],
                frequency: [
                    ["all day", 60]
                ]
            },
            "Saturday": {
                service_hours: ["7:00am", "8:52pm"],
                frequency: [
                    ["all day", 60]
                ]
            },
            "Sunday/Holiday": {
                service_hours: ["8:00am", "7:52pm"],
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
        downtown: false,
        days_per_week: ['Monday', 'Sunday'],
        between: ['Northland Mall', 'Fairlane Mall'],
        via: ['8 Mile Rd', 'Evergreen'],
        description: "A west side route that connects Detroit on Ten Mile and Evergreen to Fairlane Mall. The main street served is Evergreen. In addition to Detroit, this route also serves Dearborn and Southfield.",
        pdf: ["http://www.detroitmi.gov/Portals/0/docs/deptoftransportation/pdfs/2017/September2017Schedules/60Evergreen.pdf"],
        services: {
            "Monday-Friday": {
                service_hours: ["5:55am", "10:41pm"],
                frequency: [
                    ["peak", 20],
                    ["off-peak", 35],
                    ["evening", 60],
                ]
            },
            "Saturday": {
                service_hours: ["6:58am", "10:31pm"],
                frequency: [
                    ["all day", 35]
                ]
            },
            "Sunday/Holiday": {
                service_hours: ["8:38am", "7:43pm"],
                frequency: [
                    ["all day", 55]
                ]
            }
        },
        notes: ""
    },
    {
        number: 80,
        name: 'Villages Direct',
        orientation: 'EW',
        downtown: true,
        days_per_week: ['Monday', 'Sunday'],
        between: ['Jefferson & Maryland', 'W. Grand Blvd. & Trumbull'],
        via: ['Jefferson', 'Lafayette', 'Cass', 'W. Grand Blvd.'],
        description: "An east side peak hour route that connects Detroit from Jefferson & Maryland to W Grand Blvd & Trumbull. This route connects highly populated residential neighborhoods to a resource intensive neighborhood using both street and highways. The main streets served are E Lafayette, Kercheval, E Jefferson and Cass.",
        pdf: ["http://www.detroitmi.gov/Portals/0/docs/deptoftransportation/pdfs/2017/April2017schedules/80VillagesDirectMF.pdf"],
        services: {
            "Monday-Friday": {
                service_hours: ["5:37am", "8:10pm"],
                frequency: [
                    ["peak", 30],
                ]
            }
        },
        notes: ""
    },
    {
        number: 89,
        name: 'Southwest Direct',
        orientation: 'NS',
        downtown: false,
        days_per_week: ['Monday', 'Sunday'],
        between: ['Trumbull & W. Grand Blvd.', 'W. Outer Dr. & Fort'],
        via: ['Bassett', 'Vernor', 'Cass', 'W. Grand Blvd.'],
        description: "Connects Lincoln Park and Detroit with express service on I-75 freeway (Fisher) between Fort & W Outer Dr and Henry Ford Hospital. The main streets served are Fort, Outer Dr, Bassett, Schaefer, Vernor, Michigan, Trumbull and Cass. Service is available during morning and evening peak hours Monday thru Friday.",
        pdf: ["http://www.detroitmi.gov/Portals/0/docs/deptoftransportation/pdfs/2017/April2017schedules/89SouthwestDirectMF.pdf?ver=2017-04-21-171512-467"],
        services: {
            "Monday-Friday": {
                service_hours: ["5:30am", "8:00pm"],
                frequency: [
                    ["morning (5:30am-10am)", 40],
                    ["evening (2:45pm-8pm)", 45]
                ]
            }
        },
        notes: ""
    },
    {
        number: 92,
        name: 'Rosedale Express',
        orientation: 'EW',
        downtown: true,
        days_per_week: ['Monday', 'Friday'],
        between: ['8 Mile & Evergreen', 'Downtown'],
        via: ['Grand River', 'I-96'],
        description: "A west side express route that connects Detroit from Pembroke St & Evergreen to Downtown E Jefferson & St Antoine. This route provides express service by using highways to decrease travel time. The main streets served are Evergreen and Grand River.",
        pdf: ["http://www.detroitmi.gov/Portals/0/docs/Bus%20Schedules/January%202018/92RosedaleExpressMF.pdf"],
        services: {
            "Monday-Friday": {
                service_hours: ["5:35am", "6:55pm"],
                frequency: [
                    ["peak", 35],
                ]
            }
        },
        notes: ""
    },
    {
        number: 95,
        name: 'Ryan Express',
        orientation: 'NS',
        downtown: true,
        days_per_week: ['Monday', 'Friday'],
        between: ['Downtown', 'Van Dyke & Outer Dr.'],
        via: ['Ryan', 'I-75'],
        description: "An east side express route that connects Detroit from E outer Dr & Van Dyke to Downtown E Larned & Shelby St. This route provides express service by using highways to decrease travel time. The main streets served are Ryan, Conant, Caniff and E Outer Dr.",
        pdf: ["http://www.detroitmi.gov/Portals/0/docs/deptoftransportation/pdfs/2017/Jan2017schedules/95RyanExpress.pdf?ver=2017-01-27-132516-670"],
        services: {
            "Monday-Friday": {
                service_hours: ["5:51am", "6:45pm"],
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
        downtown: true,
        days_per_week: ['Monday', 'Friday'],
        between: ['Downtown', 'Weatherby'],
        via: ['Joy Road', 'I-96'],
        description: "A west side express route that connects Detroit from Evergreen & Plymouth Rd to Downtown E Jefferson & St. Antoine St. This route provides express service by using highways to decrease travel time. The main street served is Joy Rd.",
        pdf: ["http://www.detroitmi.gov/Portals/0/docs/deptoftransportation/pdfs/2017/Jan2017schedules/96JoyExpress.pdf?ver=2017-01-27-132707-847"],
        services: {
            "Monday-Friday": {
                service_hours: ["5:43am", "6:54pm"],
                frequency: [
                    ["peak", 35],
                ]
            }
        },
        notes: ""
    }
]

export default routeDetails;
