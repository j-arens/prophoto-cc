export function getPosts(quantity = 1, cb) {
    if (!window.hasOwnProperty('wp') && typeof cb !== 'function') return;

    const postsCollection = new window.wp.api.collections.Posts();
    const mediaCollection = new window.wp.api.collections.Media();

    const postQueryArgs = {
        data: {
            per_page: quantity,
            status: ['publish', 'future', 'draft', 'pending', 'private']
        }
    }

    const mediaQueryArgs = {
        data: {
            media_type: 'image',
            include: [],
            // parent: [] - might be a bug, this doesn't work if images have more than one parent
        }
    }

    postsCollection.fetch(postQueryArgs)
        .success(posts => {
            if (posts.length) {
                
                // mediaQueryArgs.data.parent = posts.map(post => post.featured_media ? post.id : 0);
                mediaQueryArgs.data.include = posts.map(post => post.featured_media);
                
                mediaCollection.fetch(mediaQueryArgs)
                    .then(images => {

                        // images.map(image => {
                        //     posts.filter(post => {
                        //         if (post.id === image.post) {
                        //             post.media_sizes = image.media_details.sizes;
                        //         }
                        //     });
                        // });

                        posts.forEach(post => {
                            if (post.featured_media) {
                                images.filter(image => image.id === post.featured_media ? post.media_sizes = image.media_details.sizes : false);
                            }
                        });

                        return cb(posts);

                    });
            } else {
                return cb([]);
            }
            
        })
        .fail(() => cb([]));
}