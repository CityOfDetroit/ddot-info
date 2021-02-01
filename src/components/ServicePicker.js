import React from 'react';

import feedServices from '../data/services.json'

const ServicePicker = ({ services, service, setService, inline = true }) => {
    if (services.length === 3) {
        services = ["1", "3", "2"]
    }
    return (
        <div className="py-2 px-2 bg-gray-100 text-sm">
            <h3>Day of week:</h3>
            {services.map(s => (
                <div key={s} className={inline ? " inline mr-3 items-center" : "flex items-center"} role="presentation" onClick={() => setService(s)} onKeyDown={(e) => e.keycode === 13 && setService(s)}>
                    <label className="inline">
                        <input type='radio' checked={service === s} readOnly />
                        <span className="pl-2">{feedServices[s]}</span>
                    </label>
                </div>
            ))}
        </div>
    )
}

export default ServicePicker