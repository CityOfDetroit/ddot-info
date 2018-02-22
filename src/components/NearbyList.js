import React from 'react'

import RouteLink from './RouteLink'
import StopLink from './StopLink'

class NearbyList extends React.Component {
    render() {
        console.log(this.props.data)
        return (
            <div className="details pa3">
                <span className="db f3 fw5">Nearby routes</span>                
                <div className="overflow-scroll">
                    {this.props.data.data.references.routes.map((r, i) => (
                    <div className="mv2" key={i}>
                        <RouteLink id={parseInt(r.shortName, 10)}/>
                    </div>
                    ))}
                </div>


                <span className="db f3 fw5 ma2 mt4">Nearby stops</span>                
                <div className="h5 overflow-scroll pa2">
                    {this.props.data.data.list.map((a, i) => (
                    <StopLink id={a.id.slice(5,)} key={i} />
                    ))}
                </div>
            </div>
        )
    }
}

export default NearbyList;