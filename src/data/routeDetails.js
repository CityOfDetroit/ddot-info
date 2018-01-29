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
        name: '',
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
        number: 11,
        name: '',
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
        number: 12,
        name: '',
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
        number: 13,
        name: '',
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
        number: 14,
        name: '',
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
        number: 15,
        name: '',
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
        number: 16,
        name: '',
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
        name: '',
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
        number: 18,
        name: '',
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
        name: '',
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
        number: 21,
        name: '',
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
        number: 22,
        name: '',
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
        number: 23,
        name: '',
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
        name: '',
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
        number: 27,
        name: '',
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
        number: 29,
        name: '',
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
        number: 30,
        name: '',
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
        number: 31,
        name: '',
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
        number: 32,
        name: '',
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
        number: 34,
        name: '',
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
        name: '',
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
        number: 38,
        name: '',
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
        number: 39,
        name: '',
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
        number: 40,
        name: '',
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
        name: '',
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
        number: 42,
        name: '',
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
        number: 43,
        name: '',
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
        number: 45,
        name: '',
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
        number: 46,
        name: '',
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
        number: 47,
        name: '',
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
        number: 48,
        name: '',
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
        number: 49,
        name: '',
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
        number: 53,
        name: '',
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
        name: '',
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
        number: 60,
        name: '',
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
        number: 80,
        name: '',
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
        number: 89,
        name: '',
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
        number: 92,
        name: '',
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
        number: 95,
        name: '',
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
        number: 96,
        name: '',
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
        number: 98,
        name: '',
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
        number: 498,
        name: '',
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
    }
]

export default routeDetails;