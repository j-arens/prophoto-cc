/**
 * Attach featured images to posts
 *
 * @param {[type]} Post
 * @param {[type]} Media
 * @return {[type]}
 */
export default function attachFeaturedImg(Post: post, Media: media):Post {
  if (!post.featured_media) {
    return post;
  }

  const attachments = media.filter(image => image.id === post.featured_media ? image.media_details.sizes : false);

  if (attachments) {
    post.set('media_sizes', attachments);
  }

  return post;
}
