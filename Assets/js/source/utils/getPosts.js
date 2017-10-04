/**
 * Get wp posts
 *
 * @param {[type]} number
 * @return {[type]}
 */
export default function getPosts(number: quantity = 1):promise {
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
