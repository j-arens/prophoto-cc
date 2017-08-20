<?php namespace PostEditor\Plugin;

// prevent direct access
if ( !defined( 'ABSPATH' ) ) exit;

class PostEditor {

    private $PluginPage;

    public function init() {
        if (is_admin()) {

            $this->PluginPage = new PluginPage([
                'pageTitle' => '',
                'menuTitle' => 'Post Editor',
                'pageSlug' => 'post-editor'
            ]);

        }
    }
}