import React from 'react';
import TableHead from './TableHead';
import TableRow from './TableRow';

const Table = ({handler, posts}) => (
    <table className="post-editor__posts-table post-editor__fadeInUp">
        <TableHead />
        <tbody className="post-editor__posts-body">
            {posts.map((post, i) => <TableRow handler={handler} key={i} post={post} />)}
        </tbody>
    </table>
);

export default Table;