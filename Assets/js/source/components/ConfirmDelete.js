import React from 'react';
import Button from './Button';

const ConfirmDelete = ({post, handler}) => (
    <div className="post-editor__delete-post">
        <p className="post-editor__delete-post-msg">Are you sure you want to delete <strong className="post-editor__delete-post-title">{post.title.rendered}</strong>?</p>
        <Button classes={['post-editor__btn-danger', 'post-editor__btn-fw']} handler={() => handler({id: post.id, action: 'DELETE'})}>
            DELETE
        </Button>
    </div>
);

export default ConfirmDelete;