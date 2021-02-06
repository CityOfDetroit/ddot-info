import React from 'react';

import feedDirs from '../data/directions.json'

const DirectionPicker = ({ directions, direction, setDirection, routeOrientation, className, inline=true }) => {

    return (
        <div className={"py-2 bg-gray-100 text-sm px-2"}>
            <h3>Direction:</h3>
            <div>
            {directions.map(d => (
                <div className={inline ? " inline mr-3 items-center" : "flex items-center"} key={d} role="presentation" onClick={() => setDirection(d)} onKeyDown={(e) => e.keycode === 13 && setDirection(d)}>
                    <label className="inline">
                        <input type='radio' checked={direction === d} readOnly />
                        <span className="pl-2">{feedDirs[routeOrientation][d]}</span>
                    </label>
                </div>
            ))}
            </div>
        </div>
    )
}

export default DirectionPicker