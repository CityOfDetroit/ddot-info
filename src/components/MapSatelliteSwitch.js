import React from 'react';

class MapSatelliteSwitch extends React.Component {

    render() {
        return (
            <div className="absolute pa2 bg-white o-80" style={{zIndex: 2}}>
                <label className="mr2" htmlFor="satellite">Aerial imagery
                </label>
                <input type="checkbox" id="satellite" value="satellite"  onChange={this.props.onChange} />
            </div>
        )
    }
}

export default MapSatelliteSwitch;