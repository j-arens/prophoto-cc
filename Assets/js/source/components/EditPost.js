import React from 'react';
import Button from './Button';

export default class EditPost extends React.Component {
    constructor({post, handler}) {
        super();

        this.handler = handler;
        this.post = post;

        this.state = {
            attachment: null,
            title: this.post.title.rendered
        };
    }

    updateTitle(delta) {
        this.setState({
            title: delta.replace(/(<([^>]+)>)/ig, '') // strip tags
        });
    }

    getFeaturedImage() {
        if (this.post.featured_media) {
            const image = this.post.media_sizes.medium;
            return image.source_url || image.url || '';
        }

        return '';
    }

    removeFeaturedImage() {
        const featImg = document.getElementById(`post-editor__post-${this.post.id}`).querySelector('.post-editor__edit-img');
        featImg.style.backgroundImage = '';
        this.setState({attachment: 0});
    }

    mediaFrame() {
        window.mediaFrame = window.wp.media({
            title: 'Select Image',
            button: {text: 'Select'},
            library: {type: 'image'},
            multiple: false
        });

        window.mediaFrame.on('open', () => {

            // pre-select the image in the mediaFrame if the post has a featured image
            if (this.post.featured_media) {
                const attachment = window.wp.media.attachment(this.post.featured_media);
                
                attachment.fetch().then(() => {
                    window.mediaFrame.state().get('selection').add([attachment]);
                });
            }
        });

        window.mediaFrame.on('select', () => {
            const attachment = window.mediaFrame.state().get('selection').first().toJSON();

            if (attachment) {
                // Doing a big react sin here.
                // I think this makes the most sense though becuase the user could set a featured image but not save and close the modal.
                // If the above case happens then the featured image should not be set when re-opening the modal.
                // So I think it's easiest to do this manually and not worry about mutating state, let the dom reset itself.
                const featImg = document.getElementById(`post-editor__post-${this.post.id}`).querySelector('.post-editor__edit-img');
                featImg.style.backgroundImage = `url(${attachment.sizes.medium.url})`;

                this.setState({
                    attachment: attachment.id
                });

            } else {
                alert('Unable to select image!');
            }

        });

        // There doesn't seem to be any reliable way to clear the state of the mediaFrame.
        // So I'm removing all events and completely resetting it everytime it gets closed/opened, otherwise it tries to use old react state.
        // There's probably a much better way to do this but this works for now.
        window.mediaFrame.on('close', () => {
            window.mediaFrame.undelegateEvents();
            window.mediaFrame.remove();
        });

        window.mediaFrame.open();
    }

    handleSave() {
        this.handler({
            id: this.post.id,
            action: 'EDIT',
            args: {
                title: this.state.title,
                attachment: this.state.attachment
            }
        });
    }

    render() {
        return (
            <div id={`post-editor__post-${this.post.id}`} className="post-editor__edit">
                <form onSubmit={(e) => e.preventDefault()} className="post-editor__edit-form">
                    <label className="post-editor__edit-label">
                        <p>Featured Image</p>
                        <figure onClick={this.mediaFrame.bind(this)} className="post-editor__edit-window">
                            <span style={{backgroundImage: `url(${this.getFeaturedImage()})`}} alt="Featured Image" className="post-editor__edit-img" />
                        </figure>
                        {this.getFeaturedImage() ? <span onClick={this.removeFeaturedImage.bind(this)} className="post-editor__remove-image-link">Remove Featured Image</span> : ''}
                    </label>
                    <label className="post-editor__edit-label">
                        <p>Post Title</p>
                        <input 
                            onChange={(e) => this.updateTitle(e.target.value)} 
                            type="text" 
                            className="post-editor__edit-input" 
                            value={this.state.title.replace('Private: ', '')} 
                        />
                    </label>
                    <Button classes={['post-editor__btn-success', 'post-editor__btn-fw']} handler={this.handleSave.bind(this)}>
                        SAVE
                    </Button>
                </form>
            </div>
        );
    }
}