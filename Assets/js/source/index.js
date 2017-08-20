import React from 'react';
import ReactDOM from 'react-dom';
import App from './components/App';
import { getPosts } from './utils/getPosts';

const initApp = (posts) => {
    const root = document.getElementById('js-post-editor__root');

    if (root) {
        ReactDOM.render(<App posts={posts} />, root);
    } else {
        console.error('unable to load posts');
    }
}

window.wp.api.loadPromise.done(() => getPosts(5, initApp));