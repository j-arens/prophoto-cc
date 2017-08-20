import React from 'react';
import BlockHeading from './BlockHeading';

const Block = ({title, children}) => (
    <div className="post-editor__block">
        <BlockHeading title={title} />
        <div className="post-editor__block-content">
            {children}
        </div>
    </div>
);

export default Block;