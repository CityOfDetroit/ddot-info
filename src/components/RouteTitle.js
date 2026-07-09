import { Link } from "gatsby"
import React from "react"
import RouteNumber from "./RouteNumber"

const RouteTitle = ({ short, color, long, size='base', bold=false, link=true }) => {
  const name = (
    <span className={bold ?
                        size === "small" ? "flex items-center font-semibold text-base" : "flex items-center font-semibold"
                        :
                        size === "small" ? "flex items-center font-thin text-base" : "flex items-center font-thin"}>
      {long}
    </span>
  )
  return(
  <div className="flex items-center content-start text-lg">
    <RouteNumber number={short} color={color} size={size} />
    {link ?
      <Link aria-label={`${long} route page`} to={`/route/${short}`} prefetch={"false"}>
        {name}
      </Link>
      : name}
  </div>
)
      }
export default RouteTitle;