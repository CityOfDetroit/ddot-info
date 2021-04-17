
import Helmet from 'react-helmet';
import React from 'react';
const NearbyPage = () => {
  return (
    <>
    <Helmet>
      <title>{`DDOT.info: System map`}</title>
      <meta property="og:url" content={`https://ddot.info/system-map/`} />
      <meta property="og:type" content={`website`} />
      <meta property="og:title" content={`DDOT system map`} />
      <meta property="og:description" content={`DDOT system map. Get more information about DDOT's 43 routes.`} />
    </Helmet>
    </>
  )
}

export default NearbyPage;