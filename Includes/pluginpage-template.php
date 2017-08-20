<?php if ( !defined( 'ABSPATH' ) ) exit; ?>

<div id="<?= $this->pageSlug ?>" class="wrap">
    <?= settings_errors() ?>
    <h1><?= $this->pageTitle ?></h1>
    <div id="js-post-editor__root" class="post-editor__root">
        <svg class="post-editor__spinner" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
            <circle class="post-editor__spinner-circle" cx="12" cy="12" r="10"></circle>
        </svg>
    </div>
</div>