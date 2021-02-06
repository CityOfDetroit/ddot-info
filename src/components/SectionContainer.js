import React from 'react';

const SectionContainer = ({ children, scroll=false, header }) => {
    return (
        <section className={"mb-3"}>
            {header}
            <div className={scroll ? `section-scroll` : null}>
                {children}
            </div>
        </section>
    )
}

export default SectionContainer;