import React from 'react';
import ButtonGroup from './ButtonGroup';
import PencilIcon from '../icons/Pencil';
import XIcon from '../icons/X';
import ConfirmDelete from './ConfirmDelete';
import EditPost from './EditPost';

const TableRow = ({handler, post}) => {

    const { title, link, status } = post;

    const buttons = [
        {
            handler: () => handler(
                {
                    id: post.id, 
                    action: 'OPEN_MODAL',
                    args: {
                        title: 'Edit Post',
                        content: <EditPost post={post} handler={handler}/>
                    }
                }
            ), 
            content: <PencilIcon/>,
            classes: ['post-editor__btn-small']
        },
        {
            handler: () => handler(
                {
                    id: post.id, 
                    action: 'OPEN_MODAL', 
                    args: {
                        title: 'Confirm Deletion',
                        content: <ConfirmDelete post={post} handler={handler}/>
                    }
                }
            ), 
            content: <XIcon/>,
            classes: ['post-editor__btn-small']
        }
    ];

    const getFeaturedImage = (post) => {
        if (post.featured_media) {
            return post.media_sizes.thumbnail.source_url;
        }

        return '';
    }

    const getStatusClass = (status) => {
        switch(status) {
            case 'publish':
                return 'post-editor__status-success';
            case 'future':
            case 'draft':
            case 'pending':
            case 'auto-draft':
            case 'inherit':
                return 'post-editor__status-warning';
            case 'private':
            case 'trash':
                return 'post-editor__status-danger';
            default:
                return '';
        }
    }

    return (
        <tr data-id={post.id} className="post-editor__posts-row post-editor__post">
            <td className="post-editor__post-data">
                <img src={getFeaturedImage(post)} alt="Post Thumbnail" className="post-editor__post-img" />
            </td>
            <td className="post-editor__post-data">
                <p className="post-editor__post-title">{title.rendered.replace('Private: ', '')}</p>
            </td>
            <td className="post-editor__post-data">
                <a href={link} target="_blank" rel="noopener" className="post-editor__post-link">{link}</a>
            </td>
            <td className="post-editor__post-data">
                <span className={`post-editor__status-label ${getStatusClass(status)}`}>{status}</span>
            </td>
            <td className="post-editor__post-data">
                <ButtonGroup buttons={buttons} />
            </td>
        </tr>
    );
};

export default TableRow;