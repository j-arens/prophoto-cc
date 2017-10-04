import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { List } from 'immutable';
import getStore from './redux/index';
import getPosts from './utils/getPosts';
import getMedia from './utils/getMedia';
import attachFeaturedImg from './utils/attachFeaturedImg';
import initError from './utils/initError';

window.wp.api.loadPromise.done(() => {

  const posts = List(getPosts());
  const media = getAttachments(posts);

  if (posts && media) {
    posts.map(post => attachFeaturedImg(post));
  }

  const root = document.getElementById('js-post-editor__root');

  try {
    ReactDom.render(
      <Provider store={getStore()}>
        <AppContainer />
      </Provider>
    );
  } catch(err) {
    initError();
    console.error('PP_CC: App init error', err);
  }
});
