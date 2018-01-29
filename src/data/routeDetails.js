const routeDetails = [{
        number: 7,
        name: 'Cadillac-Harper',
        orientation: 'EW',
        downtown: true,
        days_per_week: ['Monday', 'Sunday'],
        between: ['Mack and Moross', 'Rosa Parks Transit Center'],
        frequency: [
            ['Monday-Friday', 'peak', 35],
            ['Monday-Friday', 'off-peak', 60],
            ['Saturday-Sunday', 'all day', 60],
        ],
        service_hours: {
            'Monday-Friday': ["5am", "11pm"],
            'Saturday': ["7am", "11pm"],
            'Sunday': ["7am", "8pm"]
        },
        notes: "On Saturdays from 7AM-8PM, this bus departs Rosa Parks Transit Center after a layover as Route 10-Chene. Riders remaining on the bus through the layover may continue without using a transfer."
    },
    {
        number: 9,
        name: 'Chalmers',
        orientation: 'NS',
        downtown: false,
        days_per_week: ['Monday', 'Sunday'],
        between: ['Jefferson/Maryland', '7 Mile and Gratiot'],
        frequency: [
            ['Monday-Friday', 'peak', 40],
            ['Monday-Friday', 'off-peak', 60],
            ['Saturday-Sunday', 'all day', 60]
        ],
        service_hours: {
            'Monday-Friday': ['5:30am', '9pm'],
            'Saturday': ['6:45am', '8pm'],
            'Sunday': ['8:30am', '5pm']
        },
        notes: ""
    },
    {
        number: 10,
        name: 'Chene',
        orientation: 'NS',
        downtown: true,
        days_per_week: ['Monday', 'Sunday'],
        between: ['', ''],
        frequency: [
            ['Monday-Friday', 'peak', 60],
            ['Monday-Friday', 'off-peak', 60],
            ['Saturday-Sunday', 'all day', 60]
        ],
        service_hours: {
            'Monday-Friday': ['6am', '11pm'],
            'Saturday': ['8am', '8pm'],
            'Sunday': ['10am', '8pm']
        },
        notes: "On Saturdays, this bus departs Rosa Parks Transit Center after a layover as Route 7-Cadillac-Harper. Riders remaining on the bus through the layover may continue without using a transfer."
    },
    {
        number: 11,
        name: 'Clairmount',
        orientation: 'EW',
        downtown: false,
        days_per_week: ['Monday', 'Sunday'],
        between: ['', ''],
        frequency: [
            ['Monday-Friday', 'peak', 60],
            ['Monday-Friday', 'off-peak', 60],
            ['Saturday-Sunday', 'all day', 60]
        ],
        service_hours: {
            'Monday-Friday': ['6am', '11pm'],
            'Saturday': ['8am', '8pm'],
            'Sunday': ['10am', '8pm']
        },
        notes: ""
    },
    {
        number: 12,
        name: 'Conant',
        orientation: 'NS',
        downtown: false,
        days_per_week: ['Monday', 'Sunday'],
        between: ['', ''],
        frequency: [
            ['Monday-Friday', 'peak', 60],
            ['Monday-Friday', 'off-peak', 60],
            ['Saturday-Sunday', 'all day', 60]
        ],
        service_hours: {
            'Monday-Friday': ['6am', '11pm'],
            'Saturday': ['8am', '8pm'],
            'Sunday': ['10am', '8pm']
        },
        notes: ""
    },
    {
        number: 13,
        name: 'Conner',
        orientation: 'NS',
        downtown: false,
        days_per_week: ['Monday', 'Sunday'],
        between: ['', ''],
        frequency: [
            ['Monday-Friday', 'peak', 60],
            ['Monday-Friday', 'off-peak', 60],
            ['Saturday-Sunday', 'all day', 60]
        ],
        service_hours: {
            'Monday-Friday': ['6am', '11pm'],
            'Saturday': ['8am', '8pm'],
            'Sunday': ['10am', '8pm']
        },
        notes: ""
    },
    {
        number: 14,
        name: 'Crosstown',
        orientation: 'EW',
        downtown: false,
        days_per_week: ['Monday', 'Sunday'],
        between: ['', ''],
        frequency: [
            ['Monday-Friday', 'peak', 60],
            ['Monday-Friday', 'off-peak', 60],
            ['Saturday-Sunday', 'all day', 60]
        ],
        service_hours: {
            'Monday-Friday': ['6am', '11pm'],
            'Saturday': ['8am', '8pm'],
            'Sunday': ['10am', '8pm']
        },
        notes: ""
    },
    {
        number: 15,
        name: 'Chicago Davison',
        orientation: 'EW',
        downtown: false,
        days_per_week: ['Monday', 'Sunday'],
        between: ['', ''],
        frequency: [
            ['Monday-Friday', 'peak', 60],
            ['Monday-Friday', 'off-peak', 60],
            ['Saturday-Sunday', 'all day', 60]
        ],
        service_hours: {
            'Monday-Friday': ['6am', '11pm'],
            'Saturday': ['8am', '8pm'],
            'Sunday': ['10am', '8pm']
        },
        notes: ""
    },
    {
        number: 16,
        name: 'Dexter',
        orientation: 'NS',
        downtown: true,
        days_per_week: ['Monday', 'Sunday'],
        between: ['', ''],
        frequency: [
            ['Monday-Friday', 'peak', 60],
            ['Monday-Friday', 'off-peak', 60],
            ['Saturday-Sunday', 'all day', 60]
        ],
        service_hours: {
            'Monday-Friday': ['6am', '11pm'],
            'Saturday': ['8am', '8pm'],
            'Sunday': ['10am', '8pm']
        },
        notes: ""
    },
    {
        number: 17,
        name: 'Eight Mile',
        orientation: 'EW',
        downtown: false,
        days_per_week: ['Monday', 'Sunday'],
        between: ['', ''],
        frequency: [
            ['Monday-Friday', 'peak', 60],
            ['Monday-Friday', 'off-peak', 60],
            ['Saturday-Sunday', 'all day', 60]
        ],
        service_hours: {
            'Monday-Friday': ['6am', '11pm'],
            'Saturday': ['8am', '8pm'],
            'Sunday': ['10am', '8pm']
        },
        notes: ""
    },
    {
        number: 18,
        name: 'Fenkell',
        orientation: 'NS',
        downtown: true,
        days_per_week: ['Monday', 'Sunday'],
        between: ['', ''],
        frequency: [
            ['Monday-Friday', 'peak', 60],
            ['Monday-Friday', 'off-peak', 60],
            ['Saturday-Sunday', 'all day', 60]
        ],
        service_hours: {
            'Monday-Friday': ['6am', '11pm'],
            'Saturday': ['8am', '8pm'],
            'Sunday': ['10am', '8pm']
        },
        notes: ""
    },
    {
        number: 19,
        name: 'Fort',
        orientation: 'EW',
        downtown: true,
        days_per_week: ['Monday', 'Sunday'],
        between: ['', ''],
        frequency: [
            ['Monday-Friday', 'peak', 60],
            ['Monday-Friday', 'off-peak', 60],
            ['Saturday-Sunday', 'all day', 60]
        ],
        service_hours: {
            'Monday-Friday': ['6am', '11pm'],
            'Saturday': ['8am', '8pm'],
            'Sunday': ['10am', '8pm']
        },
        notes: "On Sundays, this bus departs Rosa Parks Transit Center after a layover as Route 49-Vernor. Riders remaining on the bus through the layover may continue without using a transfer."
    },
    {
        number: 21,
        name: 'Grand River',
        orientation: 'EW',
        downtown: true,
        days_per_week: ['Monday', 'Sunday'],
        between: ['', ''],
        frequency: [
            ['Monday-Friday', 'peak', 60],
            ['Monday-Friday', 'off-peak', 60],
            ['Saturday-Sunday', 'all day', 60]
        ],
        service_hours: {
            'Monday-Friday': ['6am', '11pm'],
            'Saturday': ['8am', '8pm'],
            'Sunday': ['10am', '8pm']
        },
        notes: ""
    },
    {
        number: 22,
        name: 'Greenfield',
        orientation: 'NS',
        downtown: false,
        days_per_week: ['Monday', 'Sunday'],
        between: ['', ''],
        frequency: [
            ['Monday-Friday', 'peak', 60],
            ['Monday-Friday', 'off-peak', 60],
            ['Saturday-Sunday', 'all day', 60]
        ],
        service_hours: {
            'Monday-Friday': ['6am', '11pm'],
            'Saturday': ['8am', '8pm'],
            'Sunday': ['10am', '8pm']
        },
        notes: ""
    },
    {
        number: 23,
        name: 'Hamilton',
        orientation: 'NS',
        downtown: true,
        days_per_week: ['Monday', 'Sunday'],
        between: ['', ''],
        frequency: [
            ['Monday-Friday', 'peak', 60],
            ['Monday-Friday', 'off-peak', 60],
            ['Saturday-Sunday', 'all day', 60]
        ],
        service_hours: {
            'Monday-Friday': ['6am', '11pm'],
            'Saturday': ['8am', '8pm'],
            'Sunday': ['10am', '8pm']
        },
        notes: ""
    },
    {
        number: 25,
        name: 'Jefferson',
        orientation: 'EW',
        downtown: true,
        days_per_week: ['Monday', 'Sunday'],
        between: ['', ''],
        frequency: [
            ['Monday-Friday', 'peak', 60],
            ['Monday-Friday', 'off-peak', 60],
            ['Saturday-Sunday', 'all day', 60]
        ],
        service_hours: {
            'Monday-Friday': ['6am', '11pm'],
            'Saturday': ['8am', '8pm'],
            'Sunday': ['10am', '8pm']
        },
        notes: ""
    },
    {
        number: 27,
        name: 'Joy',
        orientation: 'EW',
        downtown: true,
        days_per_week: ['Monday', 'Sunday'],
        between: ['', ''],
        frequency: [
            ['Monday-Friday', 'peak', 60],
            ['Monday-Friday', 'off-peak', 60],
            ['Saturday-Sunday', 'all day', 60]
        ],
        service_hours: {
            'Monday-Friday': ['6am', '11pm'],
            'Saturday': ['8am', '8pm'],
            'Sunday': ['10am', '8pm']
        },
        notes: ""
    },
    {
        number: 29,
        name: 'Linwood',
        orientation: 'NS',
        downtown: true,
        days_per_week: ['Monday', 'Sunday'],
        between: ['', ''],
        frequency: [
            ['Monday-Friday', 'peak', 60],
            ['Monday-Friday', 'off-peak', 60],
            ['Saturday-Sunday', 'all day', 60]
        ],
        service_hours: {
            'Monday-Friday': ['6am', '11pm'],
            'Saturday': ['8am', '8pm'],
            'Sunday': ['10am', '8pm']
        },
        notes: "On Saturdays, Sundays and weekday nights, this bus departs Rosa Parks Transit Center after a layover as Route 27-Joy. Riders remaining on the bus through the layover may continue without using a transfer."
    },
    {
        number: 30,
        name: 'Livernois',
        orientation: 'NS',
        downtown: false,
        days_per_week: ['Monday', 'Sunday'],
        between: ['', ''],
        frequency: [
            ['Monday-Friday', 'peak', 60],
            ['Monday-Friday', 'off-peak', 60],
            ['Saturday-Sunday', 'all day', 60]
        ],
        service_hours: {
            'Monday-Friday': ['6am', '11pm'],
            'Saturday': ['8am', '8pm'],
            'Sunday': ['10am', '8pm']
        },
        notes: ""
    },
    {
        number: 31,
        name: 'Mack',
        orientation: 'EW',
        downtown: true,
        days_per_week: ['Monday', 'Sunday'],
        between: ['', ''],
        frequency: [
            ['Monday-Friday', 'peak', 60],
            ['Monday-Friday', 'off-peak', 60],
            ['Saturday-Sunday', 'all day', 60]
        ],
        service_hours: {
            'Monday-Friday': ['6am', '11pm'],
            'Saturday': ['8am', '8pm'],
            'Sunday': ['10am', '8pm']
        },
        notes: ""
    },
    {
        number: 32,
        name: 'McNichols',
        orientation: 'EW',
        downtown: false,
        days_per_week: ['Monday', 'Sunday'],
        between: ['', ''],
        frequency: [
            ['Monday-Friday', 'peak', 60],
            ['Monday-Friday', 'off-peak', 60],
            ['Saturday-Sunday', 'all day', 60]
        ],
        service_hours: {
            'Monday-Friday': ['6am', '11pm'],
            'Saturday': ['8am', '8pm'],
            'Sunday': ['10am', '8pm']
        },
        notes: ""
    },
    {
        number: 34,
        name: 'Gratiot',
        orientation: 'NS',
        downtown: true,
        days_per_week: ['Monday', 'Sunday'],
        between: ['', ''],
        frequency: [
            ['Monday-Friday', 'peak', 60],
            ['Monday-Friday', 'off-peak', 60],
            ['Saturday-Sunday', 'all day', 60]
        ],
        service_hours: {
            'Monday-Friday': ['6am', '11pm'],
            'Saturday': ['8am', '8pm'],
            'Sunday': ['10am', '8pm']
        },
        notes: ""
    },
    {
        number: 37,
        name: 'Michigan',
        orientation: 'EW',
        downtown: true,
        days_per_week: ['Monday', 'Sunday'],
        between: ['', ''],
        frequency: [
            ['Monday-Friday', 'peak', 60],
            ['Monday-Friday', 'off-peak', 60],
            ['Saturday-Sunday', 'all day', 60]
        ],
        service_hours: {
            'Monday-Friday': ['6am', '11pm'],
            'Saturday': ['8am', '8pm'],
            'Sunday': ['10am', '8pm']
        },
        notes: ""
    },
    {
        number: 38,
        name: 'Plymouth',
        orientation: 'EW',
        downtown: false,
        days_per_week: ['Monday', 'Sunday'],
        between: ['', ''],
        frequency: [
            ['Monday-Friday', 'peak', 60],
            ['Monday-Friday', 'off-peak', 60],
            ['Saturday-Sunday', 'all day', 60]
        ],
        service_hours: {
            'Monday-Friday': ['6am', '11pm'],
            'Saturday': ['8am', '8pm'],
            'Sunday': ['10am', '8pm']
        },
        notes: ""
    },
    {
        number: 39,
        name: 'Puritan',
        orientation: 'EW',
        downtown: false,
        days_per_week: ['Monday', 'Sunday'],
        between: ['', ''],
        frequency: [
            ['Monday-Friday', 'peak', 60],
            ['Monday-Friday', 'off-peak', 60],
            ['Saturday-Sunday', 'all day', 60]
        ],
        service_hours: {
            'Monday-Friday': ['6am', '11pm'],
            'Saturday': ['8am', '8pm'],
            'Sunday': ['10am', '8pm']
        },
        notes: ""
    },
    {
        number: 40,
        name: 'Russell',
        orientation: 'NS',
        downtown: true,
        days_per_week: ['Monday', 'Sunday'],
        between: ['', ''],
        frequency: [
            ['Monday-Friday', 'peak', 60],
            ['Monday-Friday', 'off-peak', 60],
            ['Saturday-Sunday', 'all day', 60]
        ],
        service_hours: {
            'Monday-Friday': ['6am', '11pm'],
            'Saturday': ['8am', '8pm'],
            'Sunday': ['10am', '8pm']
        },
        notes: ""
    },
    {
        number: 41,
        name: 'Schaefer',
        orientation: 'NS',
        downtown: false,
        days_per_week: ['Monday', 'Sunday'],
        between: ['', ''],
        frequency: [
            ['Monday-Friday', 'peak', 60],
            ['Monday-Friday', 'off-peak', 60],
            ['Saturday-Sunday', 'all day', 60]
        ],
        service_hours: {
            'Monday-Friday': ['6am', '11pm'],
            'Saturday': ['8am', '8pm'],
            'Sunday': ['10am', '8pm']
        },
        notes: ""
    },
    {
        number: 42,
        name: 'Mid City Loop',
        orientation: 'CW',
        downtown: false,
        days_per_week: ['Monday', 'Sunday'],
        between: ['', ''],
        frequency: [
            ['Monday-Friday', 'peak', 60],
            ['Monday-Friday', 'off-peak', 60],
            ['Saturday-Sunday', 'all day', 60]
        ],
        service_hours: {
            'Monday-Friday': ['6am', '11pm'],
            'Saturday': ['8am', '8pm'],
            'Sunday': ['10am', '8pm']
        },
        notes: ""
    },
    {
        number: 43,
        name: 'Schoolcraft',
        orientation: 'EW',
        downtown: false,
        days_per_week: ['Monday', 'Sunday'],
        between: ['', ''],
        frequency: [
            ['Monday-Friday', 'peak', 60],
            ['Monday-Friday', 'off-peak', 60],
            ['Saturday-Sunday', 'all day', 60]
        ],
        service_hours: {
            'Monday-Friday': ['6am', '11pm'],
            'Saturday': ['8am', '8pm'],
            'Sunday': ['10am', '8pm']
        },
        notes: ""
    },
    {
        number: 45,
        name: 'Seven Mile',
        orientation: 'EW',
        downtown: false,
        days_per_week: ['Monday', 'Sunday'],
        between: ['', ''],
        frequency: [
            ['Monday-Friday', 'peak', 60],
            ['Monday-Friday', 'off-peak', 60],
            ['Saturday-Sunday', 'all day', 60]
        ],
        service_hours: {
            'Monday-Friday': ['6am', '11pm'],
            'Saturday': ['8am', '8pm'],
            'Sunday': ['10am', '8pm']
        },
        notes: ""
    },
    {
        number: 46,
        name: 'Southfield',
        orientation: 'NS',
        downtown: false,
        days_per_week: ['Monday', 'Sunday'],
        between: ['', ''],
        frequency: [
            ['Monday-Friday', 'peak', 60],
            ['Monday-Friday', 'off-peak', 60],
            ['Saturday-Sunday', 'all day', 60]
        ],
        service_hours: {
            'Monday-Friday': ['6am', '11pm'],
            'Saturday': ['8am', '8pm'],
            'Sunday': ['10am', '8pm']
        },
        notes: ""
    },
    {
        number: 47,
        name: 'Tireman',
        orientation: 'EW',
        downtown: false,
        days_per_week: ['Monday', 'Sunday'],
        between: ['', ''],
        frequency: [
            ['Monday-Friday', 'peak', 60],
            ['Monday-Friday', 'off-peak', 60],
            ['Saturday-Sunday', 'all day', 60]
        ],
        service_hours: {
            'Monday-Friday': ['6am', '11pm'],
            'Saturday': ['8am', '8pm'],
            'Sunday': ['10am', '8pm']
        },
        notes: ""
    },
    {
        number: 48,
        name: 'Van Dyke-Lafayette',
        orientation: 'NS',
        downtown: true,
        days_per_week: ['Monday', 'Sunday'],
        between: ['', ''],
        frequency: [
            ['Monday-Friday', 'peak', 60],
            ['Monday-Friday', 'off-peak', 60],
            ['Saturday-Sunday', 'all day', 60]
        ],
        service_hours: {
            'Monday-Friday': ['6am', '11pm'],
            'Saturday': ['8am', '8pm'],
            'Sunday': ['10am', '8pm']
        },
        notes: "On weekday and Saturday nights, this bus departs Rosa Parks Transit Center after a layover as Route 25-Jefferson. Riders remaining on the bus through the layover may continue without using a transfer."
    },
    {
        number: 49,
        name: 'Vernor',
        orientation: 'EW',
        downtown: true,
        days_per_week: ['Monday', 'Sunday'],
        between: ['', ''],
        frequency: [
            ['Monday-Friday', 'peak', 60],
            ['Monday-Friday', 'off-peak', 60],
            ['Saturday-Sunday', 'all day', 60]
        ],
        service_hours: {
            'Monday-Friday': ['6am', '11pm'],
            'Saturday': ['8am', '8pm'],
            'Sunday': ['10am', '8pm']
        },
        notes: "On Sundays, this bus departs Rosa Parks Transit Center after a layover as Route 19-Fort. Riders remaining on the bus through the layover may continue without using a transfer."
    },
    {
        number: 53,
        name: 'Woodward',
        orientation: 'NS',
        downtown: true,
        days_per_week: ['Monday', 'Sunday'],
        between: ['', ''],
        frequency: [
            ['Monday-Friday', 'peak', 60],
            ['Monday-Friday', 'off-peak', 60],
            ['Saturday-Sunday', 'all day', 60]
        ],
        service_hours: {
            'Monday-Friday': ['6am', '11pm'],
            'Saturday': ['8am', '8pm'],
            'Sunday': ['10am', '8pm']
        },
        notes: ""
    },
    {
        number: 54,
        name: 'Wyoming',
        orientation: 'NS',
        downtown: false,
        days_per_week: ['Monday', 'Sunday'],
        between: ['', ''],
        frequency: [
            ['Monday-Friday', 'peak', 60],
            ['Monday-Friday', 'off-peak', 60],
            ['Saturday-Sunday', 'all day', 60]
        ],
        service_hours: {
            'Monday-Friday': ['6am', '11pm'],
            'Saturday': ['8am', '8pm'],
            'Sunday': ['10am', '8pm']
        },
        notes: ""
    },
    {
        number: 60,
        name: 'Evergreen',
        orientation: 'NS',
        downtown: false,
        days_per_week: ['Monday', 'Sunday'],
        between: ['', ''],
        frequency: [
            ['Monday-Friday', 'peak', 60],
            ['Monday-Friday', 'off-peak', 60],
            ['Saturday-Sunday', 'all day', 60]
        ],
        service_hours: {
            'Monday-Friday': ['6am', '11pm'],
            'Saturday': ['8am', '8pm'],
            'Sunday': ['10am', '8pm']
        },
        notes: ""
    },
    {
        number: 80,
        name: 'Villages Direct',
        orientation: 'EW',
        downtown: true,
        days_per_week: ['Monday', 'Sunday'],
        between: ['', ''],
        frequency: [
            ['Monday-Friday', 'peak', 60],
            ['Monday-Friday', 'off-peak', 60],
            ['Saturday-Sunday', 'all day', 60]
        ],
        service_hours: {
            'Monday-Friday': ['6am', '11pm'],
            'Saturday': ['8am', '8pm'],
            'Sunday': ['10am', '8pm']
        },
        notes: ""
    },
    {
        number: 89,
        name: 'Southwest Direct',
        orientation: 'NS',
        downtown: false,
        days_per_week: ['Monday', 'Sunday'],
        between: ['', ''],
        frequency: [
            ['Monday-Friday', 'peak', 60],
            ['Monday-Friday', 'off-peak', 60],
            ['Saturday-Sunday', 'all day', 60]
        ],
        service_hours: {
            'Monday-Friday': ['6am', '11pm'],
            'Saturday': ['8am', '8pm'],
            'Sunday': ['10am', '8pm']
        },
        notes: ""
    },
    {
        number: 92,
        name: 'Rosedale Express',
        orientation: 'EW',
        downtown: true,
        days_per_week: ['Monday', 'Friday'],
        between: ['', ''],
        frequency: [
            ['Monday-Friday', 'peak', 60],
        ],
        service_hours: {
            'Monday-Friday': ['6am', '11pm'],
        },
        notes: ""
    },
    {
        number: 95,
        name: 'Ryan Express',
        orientation: 'NS',
        downtown: true,
        days_per_week: ['Monday', 'Friday'],
        between: ['', ''],
        frequency: [
            ['Monday-Friday', 'peak', 60]
        ],
        service_hours: {
            'Monday-Friday': ['6am', '11pm']
        },
        notes: ""
    },
    {
        number: 96,
        name: 'Joy Express',
        orientation: 'EW',
        downtown: true,
        days_per_week: ['Monday', 'Friday'],
        between: ['', ''],
        frequency: [
            ['Monday-Friday', 'peak', 60]
        ],
        service_hours: {
            'Monday-Friday': ['6am', '11pm']
        },
        notes: ""
    }
]

export default routeDetails;