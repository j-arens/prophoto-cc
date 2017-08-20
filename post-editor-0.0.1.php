<?php

/*
Plugin Name: Post Editor
Plugin URI: 
Description: Code challenge for ProPhoto - display and edit/delete posts.
Version: 0.0.1
Author: Josh Arens
Author URI: jarens.me
License: MIT
*/

// prevent direct access
if ( !defined( 'ABSPATH' ) ) exit;

// plugin constants
define('POST_EDITOR_ROOT', __FILE__);
define('POST_EDITOR_DIR', __DIR__);

// autoload plugin classes
require POST_EDITOR_DIR . '/autoloader.php';

// kick it off
add_action('init', function() {
    $plugin = new PostEditor\Plugin\PostEditor();
    $plugin->init();
}, 0);