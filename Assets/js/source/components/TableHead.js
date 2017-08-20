import React from 'react';
import ImageIcon from '../icons/Image';

const TableHead = () => {

    const headings = [
        {content: <ImageIcon />, classes: ['post-editor__col-icon']}, 
        {content: 'Title'},
        {content: 'Link'},
        {content: 'Status'},
        {content: 'Actions'}
    ];

    const colHeading = ({content, classes = []}, key) => (
        <th key={key} className={`post-editor__col-name ${classes.join(' ')}`}>
            {content}
        </th>
    );

    return (
        <thead className="post-editor__posts-head">
            <tr className="post-editor__posts-row">
                {headings.map((heading, i) => colHeading(heading, i))}
            </tr>
        </thead>
    );  
};

export default TableHead;