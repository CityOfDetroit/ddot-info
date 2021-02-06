import { faBus, faClock } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { Link } from "gatsby"
import React from "react"
import RouteNumber from "./RouteNumber"

export const RouteLinks = ({ number }) => {
  return (<div>
    <Link to={`/route/${number}/stops`} aria-label={`route ${number} stops page`} prefetch={"false"}>
      <FontAwesomeIcon icon={faBus} className='opacity-25 mx-3 text-lg' />
    </Link>
    <Link to={`/route/${number}/schedule`} aria-label={`route ${number} schedule page`} prefetch={"false"}>
      <FontAwesomeIcon icon={faClock} className='opacity-25 mx-3 text-lg' />
    </Link>
  </div>
  )
}

export const RouteTitle = ({ short, color, long, bold=true, link=false }) => (
  <div className="flex items-center content-start text-lg">
    <RouteNumber number={short} color={color} />
    <Link aria-label={`${long} route page`} to={`/route/${short}`} prefetch={"false"}>
      <span className={bold ? "flex items-center font-semibold" : "flex items-center font-thin"}>
        {long}
      </span>
    </Link>
  </div>
)

export const RouteSign = ({ route }) => {
  return (
    <div className="bg-gray-100 flex items-center justify-between pr-2" key={route.short}>
      <RouteTitle short={route.short} long={route.long} color={route.color} bold={false} />
      <RouteLinks number={route.short} />
    </div>
  )
}
