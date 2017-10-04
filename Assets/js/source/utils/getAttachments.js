/**
 * Get post featured images
 *
 * @param {[type]} posts
 * @return {[type]}
 */
export default function getAttachments(Posts: posts = []):promise {
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
