<?php

return [

    /*
    |--------------------------------------------------------------------------
    | Cross-Origin Resource Sharing (CORS) Configuration
    |--------------------------------------------------------------------------
    |
    | This file controls the settings for cross-origin resource sharing (CORS).
    | CORS determines which cross-origin operations are allowed in web browsers.
    | You can freely adjust these settings depending on your frontend/backend.
    |
    | More info: https://developer.mozilla.org/en-US/docs/Web/HTTP/CORS
    |
    */

    'paths' => ['api/*', 'sanctum/csrf-cookie'],

    'allowed_methods' => ['*'],

    // 🔑 URL du frontend définie dans le .env (par défaut Angular en local)
    'allowed_origins' => [env('FRONTEND_URL', 'http://localhost:4200')],

    'allowed_origins_patterns' => [],

    'allowed_headers' => ['*'],

    'exposed_headers' => [],

    'max_age' => 0,

    // ⚡ Important pour Sanctum (cookies/sessions)
    'supports_credentials' => true,

];
