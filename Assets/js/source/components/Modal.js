import React from 'react';
import Button from './Button';
import XIcon from '../icons/X';

const Modal = ({args, handler}) => {

    if (!Object.keys(args).length) return;

    const outsideClick = (e) => {
        if (e.target.classList.contains('post-editor__modal')) {
            handler({id: null, action: 'CLOSE_MODAL'});
        }
    }

    return (
        <div onClick={outsideClick} className="post-editor__modal post-editor__fadeIn">
            <div className="post-editor__modal-container post-editor__fadeInScale">
                <header className="post-editor__modal-header">
                    <p className="post-editor__modal-title">{args.title}</p>
                    <Button classes={['post-editor__modal-close-btn']} handler={() => handler({id: null, action: 'CLOSE_MODAL'})}>
                        <XIcon/>
                    </Button>
                </header>
                <div className="post-editor__modal-content">
                    {args.content}
                </div>
            </div>
        </div>
    );
}

export default Modal;