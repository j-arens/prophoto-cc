import React from 'react';

const Button = ({handler, classes = [], children}) => (
    <button onClick={handler} className={`post-editor__btn ${classes.join(' ')}`}>
        {children}
    </button>
);

export default Button;