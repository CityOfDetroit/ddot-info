import { Link } from "gatsby"
import React from "react"

const tabs = short => [
  { title: `Overview`, link: `/route/${short}` },
  { title: `Schedule`, link: `/route/${short}/schedule` },
  { title: `Stops`, link: `/route/${short}/stops` },
]

const baseClass = "flex-1 text-center py-2 text-sm text-gray-700 border-b-4 border-transparent no-underline"
const activeClass = baseClass + " border-city-green bg-white font-semibold text-black"

// compare paths ignoring trailing slashes
const strip = p => p.replace(/\/+$/, "")

// Shared tab bar for the three per-route pages.
const RouteSubnav = ({ short }) => (
  <nav aria-label="Route pages" className="flex w-full bg-gray-200">
    {tabs(short).map(t => (
      <Link
        key={t.title}
        to={t.link}
        getProps={({ location }) => ({
          className: strip(location.pathname) === strip(t.link) ? activeClass : baseClass
        })}
      >
        {t.title}
      </Link>
    ))}
  </nav>
)

export default RouteSubnav
