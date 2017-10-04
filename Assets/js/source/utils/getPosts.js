/**
 * Get wp posts
 *
 * @param {[type]} number
 * @return {[type]}
 */
export function getPosts(number: quantity = 1):promise {
  if (!window.hasOwnProperty('wp')) return;

  const postsCollection = new window.wp.api.collections.Posts();

  const postQueryArgs = {
    data: {
      per_page: quantity,
      status: ['publish', 'future', 'draft', 'pending', 'private'],
    }
  }

  return postsCollection.fetch(postQueryArgs);
}

/**
 * Get post featured images
 *
 * @param {[type]} posts
 * @return {[type]}
 */
export function getAttachments(Posts: posts = []):promise {
  if (!window.hasOwnProperty('wp')) return;

  const mediaCollection = new window.wp.api.collections.Media();

  const mediaQueryArgs = {
    data: {
      media_type: 'image',
      include: posts,
    }
  }

  return mediaCollection.fetch(mediaQueryArgs);
}

/**
 * Attach featured images to posts
 *
 * @param {[type]} Post
 * @param {[type]} Media
 * @return {[type]}
 */
export function attachFeaturedImg(Post: post, Media: media):Post {
  if (!post.featured_media) {
    return post;
  }

  const attachments = media.filter(image => image.id === post.featured_media ? image.media_details.sizes : false);

  if (attachments) {
    post.set('media_sizes', attachments);
  }

  return post;
}
