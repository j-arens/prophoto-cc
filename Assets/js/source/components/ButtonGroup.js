import React from 'react';
import Button from './Button';

const ButtonGroup = ({buttons}) => (
    <div className="post-editor__btn-group">
        {buttons.map((btn, i) => {
            return (
                <Button classes={btn.classes} key={i} handler={btn.handler}>
                    {btn.content}
                </Button>
            );
        })}
    </div>
);

export default ButtonGroup;