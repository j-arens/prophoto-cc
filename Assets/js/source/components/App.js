import React from 'react';
import Block from './Block';
import Table from './Table';
import Modal from './Modal';
import { getPosts } from '../utils/getPosts';

export default class App extends React.Component {
    constructor({posts}) {
        super();

        this.state = {
            posts,
            modal: {
                show: false,
                args: null
            }
        };
    }

    refreshPosts() {
        console.log('%cREFRESH_POSTS', 'background-color: #333; color: #fff; font-size: 13px; padding: 0 3px');
        const cb = (posts) => {
            this.setState({posts});
        }

        getPosts(5, cb);
    }

    deletePost(id) {
        const post = new window.wp.api.models.Post({id});
        post.destroy()
            .success(() => {

                if (this.state.modal.show) {
                    this.modalControl('close');
                }

                this.refreshPosts();
            })
            .fail(() => alert('Unable to delete post!'));
    }

    editPost(id, args) {
        const post = this.state.posts.filter(post => post.id === id)[0];

        const newAttachment = post.featured_media !== args.attachment ? args.attachment : false;
        const newTitle = post.title.rendered !== args.title ? args.title : false;

        if (newAttachment !== false || newTitle) {
            const postModel = new window.wp.api.models.Post({id});
            
            postModel.fetch().then(() => {
                if (newTitle) {
                    postModel.set('title', newTitle);
                }
    
                if (newAttachment !== false) {
                    postModel.set('featured_media', newAttachment);
                }

                postModel.save().success(() => {
                    
                    if (this.state.modal.show) {
                        this.modalControl('close');
                    }
    
                    this.refreshPosts();

                }).fail(() => alert('Unable to edit post!'));
            });
        } else {
            if (this.state.modal.show) {
                this.modalControl('close');
            }
        }
    }

    modalControl(action, args) {
        if (!action) return;

        if (action === 'open') {
            this.setState({modal: { show: true, args }});
        } else {
            this.setState({modal: { show: false, args: null }});
        }
    }

    handleAction({id, action, args = {}}) {
        console.log(`%c${action}`, 'background-color: #333; color: #fff; font-size: 13px; padding: 0 3px', id, args);
        switch(action) {
            case 'DELETE':
                this.deletePost(id);
                break;
            case 'EDIT':
                this.editPost(id, args);
                break;
            case 'OPEN_MODAL':
                this.modalControl('open', args);
                break;
            case 'CLOSE_MODAL':
                this.modalControl('close', args);
                break;
        }
    }

    render() {
        if (this.state.posts.length) {
            return (
                <div className="post-editor__container">
                    <Block title={'Post Editor'}>
                        <Table handler={this.handleAction.bind(this)} posts={this.state.posts} />
                        {this.state.modal.show ? <Modal args={this.state.modal.args} handler={this.handleAction.bind(this)}/> : false}
                    </Block>
                </div>
            );
        } else {
            return (
                <div className="post-editor__container">
                    <Block title={'Uh oh!'}>
                        <p>It looks like there aren&rsquo;t any posts right now.</p>
                    </Block>
                </div>
            );
        }
    }
}