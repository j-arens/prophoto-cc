import React from 'react';

const BlockHeading = ({title = ''}) => (
    <header className="post-editor__block-heading">
        <h1 className="post-editor__block-title">{title}</h1>
    </header>
);

export default BlockHeading;