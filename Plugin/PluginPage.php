<?php namespace PostEditor\Plugin;

// prevent direct access
if ( !defined( 'ABSPATH' ) ) exit;

class PluginPage {

    private $pageTitle;
    private $menuTitle;
    private $pageSlug;

    public function __construct(array $config) {
        $this->pageTitle = $config['pageTitle'];
        $this->menuTitle = $config['menuTitle'];
        $this->pageSlug = $config['pageSlug'];
        add_action('admin_menu', [$this, 'registerPage']);
    }

    public function registerPage() {
        add_menu_page(
            $this->pageTitle,
            $this->menuTitle,
            'manage_options',
            $this->pageSlug,
            [$this, 'renderPage']
        );
    }

    public function loadAssets() {
        // css
        wp_enqueue_style(
            strtolower(str_replace(' ', '-', $this->menuTitle)) . '-css',
            plugins_url('/Assets/styles/style.min.css', POST_EDITOR_ROOT),
            null,
            filemtime(POST_EDITOR_DIR . '/Assets/styles/style.min.css'),
            'all'
        );

        // js
        wp_enqueue_media();
        wp_enqueue_script('wp-api');

        wp_enqueue_script(
            strtolower(str_replace(' ', '-', $this->menuTitle)) . '-js',
            plugins_url('/Assets/js/app.bundle.js', POST_EDITOR_ROOT),
            ['wp-api'],
            filemtime(POST_EDITOR_DIR . '/Assets/js/app.bundle.js'),
            true
        );
    }

    public function renderPage() {
        $this->loadAssets();
        include POST_EDITOR_DIR . '/Includes/pluginpage-template.php';
    }
}