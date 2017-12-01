import sqlalchemy
import pandas

engine = sqlalchemy.create_engine('postgresql://localhost/iet')
conn = engine.connect()


def rename_tables():
    """Rename tables from gtfs_* to gtfs.*"""
    res = conn.execute(
    sqlalchemy.text(
        "select table_name from information_schema.tables where table_name like 'gtfs%'"
        )
    )
    table_names = [r[0] for r in res.fetchall()]
    for t in table_names:
        print("alter table public.{} rename to {};".format(t, t[5:]))
        print("alter table public.{} set schema gtfs;".format(t[5:]))


def drop_tables():
    res = conn.execute(
        sqlalchemy.text(
            "select table_name from information_schema.tables where table_schema = 'gtfs'"
        )
    )
    table_names = [r[0] for r in res.fetchall()]
    for t in table_names:
        drop_q = "drop table gtfs.{} cascade".format(t)
        print(drop_q)
        conn.execute(drop_q)


def set_timepoints(route, service, direction, seq_of_stop_ids):
    """Set timepoint = 1 on an array stops for a given route/service/direction """
    query = """
    update gtfs.stop_times
      set timepoint = 1
      where trip_id in
          (select trip_id from gtfs.trips where
              route_id = '{}'
              and service_id = '{}'
              and direction_id = '{}')
      and stop_id in
    ({})
    """.format(route, service, direction, ",".join(["'{}'".format(s) for s in seq_of_stop_ids]))
    conn.execute(query)
    return query


def get_stops(route):
    """
    Returns a DataFrame with stop sequence for a given route ID, service day, and direction.

    example:

    > # describe_trips
    > get_stop_sequence(6614)
    """
    query = """
    select
        times.stop_sequence,
        times.arrival_time,
        trips.route_id,
        trips.service_id,
        trips.direction_id,
        stops.stop_name,
        stops.stop_id,
        times.timepoint,
        trips.trip_id
    from gtfs.stop_times times
        inner join gtfs.trips trips on trips.trip_id = times.trip_id
        inner join gtfs.stops stops on stops.stop_id = times.stop_id
    where trips.trip_id in
        (select trip_id from gtfs.trips
            where route_id = '{}')
    order by
        trip_id asc,
        arrival_time asc,
        stop_sequence asc;
    """.format(route)
    df = pandas.read_sql(query, conn)
    return df


routes = [
    {
        "id": "7",
        "rt_name": "Cadillac-Harper",
        "rt_id": 6606,
        "timepoints": {
            0: [8911, 32, 34, 35, 36, 38, 42, 41],
            1: [41, 8963, 44, 46, 47, 49, 51, 8911]
        }
    },

    {
        "id": "9",
        "rt_name": "Chalmers",
        "notes": "nonstandard schedule",
        "rt_id": 6607,
        "timepoints": {
            0: [10178, 74, 75, 76, 77],
            1: [77, 79, 80, 83, 10178]
        }
    },

    {
        "id": "10",
        "rt_name": "Chene",
        "rt_id": 6608,
        "timepoints": {
            0: [8892, 87, 118, 89, 90, 91, 92],
            1: [95, 96, 97, 98, 99, 100, 503, 8892]
        }
    },

    {
        "id": "11",
        "rt_name": "Clairmount",
        "rt_id": 6609,
        "timepoints": {
            0: [103, 2491, 107, 800, 111, 112, 115],
            1: [115, 1236, 118, 8248, 122, 2492, 103]
        }
    },

    {
        "id": "12",
        "rt_name": "Conant",
        "rt_id": 6610,
        "timepoints": {
            0: [127, 7864, 129, 130, 9034, 5525, 132, 10176, 10167],
            1: [10167, 135, 136, 5524, 9035, 138, 139, 140, 127]
        }
    },

    {
        "id": "13",
        "rt_name": "Conner",
        "notes": "nonstandard schedule",
        "rt_id": 6611,
        "timepoints": {
            0: [93, 8552, 144, 145, 9033, 147, 148, 149, 150, 731],
            1: [153, 154, 1989, 10031, 157, 8591, 93]
        }
    },

    {
        "id": "14",
        "rt_name": "Crosstown",
        "rt_id": 6612,
        "timepoints": {
            0: [10187, 7141, 161, 162, 163, 164, 165, 169, 171, 172, 41],
            1: [41, 175, 48, 177, 181, 182, 183, 184, 185, 7140, 10192]
        }
    },

    {
        "id": "15",
        "rt_name": "Chicago Davison",
        "rt_id": 6613,
        "timepoints": {
            0: [188, 190, 191, 192, 193, 194, 195, 196, 197, 198],
            1: [198, 200, 201, 202, 203, 204, 205, 206, 207, 188]
        }
    },

    {
        "id": "16",
        "rt_name": "Dexter",
        "notes": "nonstandard schedule",
        "rt_id": 6614,
        "timepoints": {
            0: [10340, 10325, 212, 213, 214, 215, 216, 218, 220, 221, 8913, 223],
            1: [223, 8913, 224, 225, 227, 229, 230, 231, 6056, 233, 10326, 10340]
        }
    },

    {
        "id": "17",
        "rt_name": "Eight Mile",
        "notes": "nonstandard schedule",
        "rt_id": 6615,
        "timepoints": {
            0: [236, 238, 10325, 240, 242, 243, 144, 62, 245, 40],
            1: [41, 245, 63, 247, 248, 249, 251, 10326, 253, 236]
        }
    },

    {
        "id": "18",
        "rt_name": "Fenkell",
        "rt_id": 6616,
        "timepoints": {
            0: [256, 258, 260, 262, 263, 265, 266, 267, 8928],
            1: [8928, 272, 273, 274, 3377, 276, 277, 279, 286, 288]
        }
    },

    {
        "id": "19",
        "rt_name": "Fort",
        "rt_id": 6617,
        "timepoints": {
            0: [8891, 290, 291, 2558, 294, 295],
            1: [298, 299, 2561, 302, 303, 8891]
        }
    },

    {
        "id": "21",
        "rt_name": "Grand River",
        "notes": "nonstandard schedule",
        "rt_id": 6618,
        "timepoints": {
            0: [324, 325, 328, 330, 331, 332, 334, 335, 337, 9972],
            1: [9972, 344, 346, 347, 349, 350, 351, 353, 356, 324]
        }
    },

    {
        "id": "22",
        "rt_name": "Greenfield",
        "notes": "nonstandard schedule",
        "rt_id": 6619,
        "timepoints": {
            0: [210, 10325, 358, 359, 361, 363, 600, 638],
            1: [368, 372, 374, 376, 378, 379, 10326, 210]
        }
    },

    {
        "id": "23",
        "rt_name": "Hamilton",
        "rt_id": 6628,
        "timepoints": {
            0: [8933, 9474, 401, 402, 403, 9658, 10145],
            1: [1045, 9690, 386, 387, 10339, 9475, 8933]
        }
    },

    {
        "id": "25",
        "rt_name": "Jefferson",
        "rt_id": 6621,
        "timepoints": {
            0: [9970, 9021, 420, 421, 422, 10178],
            1: [10178, 425, 426, 427, 341, 9970]
        }
    },

    {
        "id": "27",
        "rt_name": "Joy",
        "rt_id": 6622,
        "timepoints": {
            0: [429, 432, 434, 435, 437, 438, 439, 441, 443, 8910],
            1: [8910, 444, 446, 737, 448, 449, 451, 452, 454, 429]
        }
    },

    {
        "id": "29",
        "rt_name": "Linwood",
        "rt_id": 6623,
        "timepoints": {
            0: [2781, 465, 467, 469, 470, 8912],
            1: [8912, 474, 475, 477, 479, 2781]
        }
    },

    {
        "id": "30",
        "rt_name": "Livernois",
        "notes": "nonstandard schedule",
        "rt_id": 6624,
        "timepoints": {
            0: [127, 481, 8987, 482, 483, 484, 486, 487, 488],
            1: [488, 490, 491, 493, 494, 495, 230, 496, 127]
        }
    },

    {
        "id": "31",
        "rt_name": "Mack",
        "rt_id": 6625,
        "timepoints": {
            0: [41, 497, 498, 499, 6334, 502, 1616, 8918],
            1: [8918, 21, 505, 6336, 508, 509, 510, 41]
        }
    },

    {
        "id": "32",
        "rt_name": "McNichols",
        "notes": "nonstandard schedule",
        "rt_id": 6626,
        "timepoints": {
            0: [9860, 7230, 514, 515, 517, 519, 524, 510, 41],
            1: [41, 527, 529, 534, 536, 538, 539, 10157, 9860]
        }
    },

    {
        "id": "34",
        "rt_name": "Gratiot ***",
        "rt_id": 6627,
        "timepoints": {
            0: [9963, 8942, 167, 547, 549, 550, 552, 62],
            1: [554, 555, 557, 558, 178, 179, 9963]
        }
    },

    {
        "id": "37",
        "rt_name": "Michigan",
        "rt_id": 6629,
        "timepoints": {
            0: [368, 6578, 2287, 591, 1489, 8945],
            1: [8945, 1490, 599, 9040, 6577, 368]
        }
    },

    {
        "id": "38",
        "rt_name": "Plymouth",
        "notes": "nonstandard schedule",
        "rt_id": 6630,
        "timepoints": {
            0: [9776, 9572, 8874, 603, 607, 608, 54, 55, 1804, 59, 60, 61, 613, 1927],
            1: [1927, 614, 65, 66, 67, 615, 71, 619, 620, 624, 626, 9549, 9776]
        }
    },

    {
        "id": "39",
        "rt_name": "Puritan",
        "rt_id": 6631,
        "timepoints": {
            0: [627, 629, 629, 630, 3032, 196],
            1: [201, 634, 635, 636, 637, 638]
        }
    },

    {
        "id": "40",
        "rt_name": "Russell",
        "rt_id": 6632,
        "timepoints": {
            0: [8944, 8777, 7414, 641, 644, 645, 646, 647, 648],
            1: [648, 649, 650, 652, 7415, 655, 8944]
        }
    },

    {
        "id": "41",
        "rt_name": "Schaefer",
        "rt_id": 6633,
        "timepoints": {
            0: [656, 657, 659, 660, 6627, 661, 662, 663, 664],
            1: [664, 9561, 662, 668, 6630, 669, 670, 672, 673]
        }
    },

    {
        "id": "42",
        "rt_name": "Mid City Loop",
        "rt_id": 6634,
        "timepoints": {
            0: [571, 584, 568, 7831, 4388, 8263, 3381, 571]
        }
    },
     {
        "id": "43",
        "rt_name": "Schoolcraft",
        "notes": "nonstandard schedule",
        "rt_id": 6635,
        "timepoints": {
            0: [429, 674, 676, 677, 678, 679, 680, 196, 570, 572, 574, 9609, 576],
            1: [7828, 578, 579, 580, 581, 201, 681, 682, 683, 684, 685, 6936, 429]
        }
    },

    {
        "id": "45",
        "rt_name": "Seven Mile",
        "rt_id": 6636,
        "timepoints": {
            0: [10157, 689, 6074, 384, 9635, 695, 520, 79, 42, 41],
            1: [41, 8963, 76, 533, 699, 9638, 405, 6073, 705, 10157]
        }
    },

    {
        "id": "46",
        "rt_name": "Southfield",
        "rt_id": 6637,
        "timepoints": {
            0: [7282, 707, 708, 709, 710, 712, 843, 368],
            1: [368, 843, 715, 717, 718, 719, 10341, 7282]
        }
    },

    {
        "id": "47",
        "rt_name": "Tireman",
        "notes": "nonstandard schedule",
        "rt_id": 6638,
        "timepoints": {
            0: [159, 721, 722, 724, 439, 727, 729, 1616],
            1: [1616, 734, 736, 737, 739, 741, 742, 159]
        }
    },

    {
        "id": "48",
        "rt_name": "Van Dyke - Lafayette",
        "rt_id": 6639,
        "timepoints": {
            0: [8989, 745, 3757, 747, 749, 750, 752, 753, 93],
            1: [93, 754, 755, 757, 758, 760, 3759, 762, 8989]
        }
    },

    {
        "id": "49",
        "rt_name": "Vernor",
        "rt_id": 6640,
        "timepoints": {
            0: [6578, 10264, 765, 766, 767, 768, 8915],
            1: [8915, 770, 8774, 772, 773, 10265, 6578]
        }
    },

    {
        "id": "53",
        "rt_name": "Woodward",
        "rt_id": 6641,
        "timepoints": {
            0: [127, 4604, 784, 785, 787, 788, 1064, 1608, 394],
            1: [394, 8926, 1611, 1061, 899, 8848, 802, 803, 4603, 127]
        }
    },

    {
        "id": "54",
        "rt_name": "Wyoming",
        "rt_id": 6642,
        "timepoints": {
            0: [127, 250, 805, 807, 808, 809, 810, 811, 322, 323, 815],
            1: [815, 304, 15, 820, 821, 823, 824, 826, 241, 127]
        }
    },

    {
        "id": "60",
        "rt_name": "Evergreen",
        "rt_id": 6643,
        "timepoints": {
            0: [10329, 380, 838, 839, 7154, 842, 843, 368],
            1: [368, 843, 844, 7156, 846, 847, 848, 849, 10328]
        }
    },

    {
        "id": "80",
        "rt_name": "Villages Direct",
        "rt_id": 6644,
        "timepoints": {
            0: [10178, 8167, 8148, 4841, 10258, 8263],
            1: [2507, 10259, 4838, 8147, 8166, 10267]
        }
    },

    {
        "id": "89",
        "rt_name": "Southwest Direct",
        "rt_id": 6645,
        "timepoints": {
            0: [2507, 3412, 1490, 772, 10260, 295],
            1: [295, 10261, 766, 1489, 3411, 8263]
        }
    },

    {
        "id": "92",
        "rt_name": "Rosedale Express",
        "rt_id": 6646,
        "timepoints": {
            0: [10253, 327, 330, 10231, 8100],
            1: [341, 8441, 351, 847, 7258]
        }
    },

    {
        "id": "95",
        "rt_name": "Ryan Express",
        "rt_id": 6648,
        "timepoints": {
            0: [10204, 10205, 7328, 10207, 10208, 646],
            1: [648, 4931, 10200, 10201, 10202, 10203]
        }
    },

    {
        "id": "96",
        "rt_name": "Joy Express",
        "rt_id": 6649,
        "timepoints": {
            0: [7158, 7214, 434, 437, 10231, 8100],
            1: [341, 8441, 449, 452, 845, 7151]
        }
    }
]


def set_all_timepoints():
    # big loop
    for r in routes:
        print(r['id'], r["rt_name"])

        # loop through each route's direction_id (0, 1)
        for dir in r['timepoints'].keys():

            # loop through all service_id
            for service in [1, 2, 3]:
                print(set_timepoints( r["rt_id"], service, int(dir), r['timepoints'][dir] ) )


def format_hms_nicely(hms):
    if hms:
        hr = int(hms[:2])
        if hr < 12:
            return "{}{}am".format(hr,hms[2:5])
        elif hr == 12:
            return "{}pm".format(hms[:5])
        elif hr > 12 and hr < 24:
            return "{}{}pm".format(hr - 12, hms[2:5])
        elif hr == 24:
            return "12{}am".format(hms[2:5])
        elif hr > 24:
            return "{}{}am".format(hr - 24, hms[2:5])
        else:
            return '-'
    else:
        return '-'

def print_schedule(id, service='1', direction='0'):
    from pprint import pprint
    df = get_stops(id)
    stop_times = df[df.direction_id == int(direction)][df.service_id == str(service)][df.timepoint == 1]
    schedule = stop_times.pivot('trip_id', 'stop_id', 'arrival_time')
    for r in routes:
        if int(r['rt_id']) == int(id):
            route = r
            pprint(r)
    # pprint(schedule)
    x = route['timepoints'][int(direction)]
    schedule = schedule[[str(i) for i in route['timepoints'][int(direction)]]]
    schedule = schedule.sort_values(by=schedule.columns[0],axis=0)
    pprint(schedule.applymap(format_hms_nicely))

if __name__ == "__main__":
    import sys
    print(sys.argv)
    print_schedule(sys.argv[1], sys.argv[2], sys.argv[3])
