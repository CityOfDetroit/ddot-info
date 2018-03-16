import React from 'react';

class MapSatelliteSwitch extends React.Component {

    render() {
        return (
            <div style={{zIndex: 2}}>
                <label htmlFor="satellite">Aerial imagery
                </label>
                <input type="checkbox" id="satellite" value="satellite"  onChange={this.props.onChange} />
            </div>
        )
    }
}

export default MapSatelliteSwitch;