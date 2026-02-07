import React from 'react';
import { Helmet } from 'react-helmet';

const SEO = ({ title, description, url, keywords }) => {
    return (
        <Helmet>
            <title>{title}</title>
            <meta name="description" content={description} />
            <meta name="keywords" content={keywords} />
            <link rel="canonical" href={url} />
        </Helmet>
    );
};

export default SEO;