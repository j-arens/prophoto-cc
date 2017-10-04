// @flow

// Render out an error notice to the user with vanilla js
export default function initError() {
  document.body.insertAdjacentHTML('beforeend', `
    <div class="pp-cc__error--danger">
      
    </div>
  `);
}
