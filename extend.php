<?php

/*
 * This file is part of harunmenteseli/flarum-custom-signup.
 *
 * Copyright (c) 2025 harunmenteseli.
 *
 * For the full copyright and license information, please view the LICENSE.md
 * file that was distributed with this source code.
 */

namespace Harunmenteseli\FlarumCustomSignupa;

use Flarum\Extend;

return [
    (new Extend\Frontend('forum'))
        ->js(__DIR__.'/js/dist/forum.js')
        ->css(__DIR__.'/less/forum.less'),
    (new Extend\Frontend('admin'))
        ->js(__DIR__.'/js/dist/admin.js')
        ->css(__DIR__.'/less/admin.less'),
    new Extend\Locales(__DIR__.'/locale'),

    (new Extend\Event())
        ->subscribe(\CustomSignupFlarum\Listeners\AddCustomFieldsToUser::class),

    (new Extend\Routes('api'))
        ->get('/users/pending', 'users.pending', \CustomSignupFlarum\Api\Controller\ListPendingUsersController::class)
        ->post('/users/approve', 'users.approve', \CustomSignupFlarum\Api\Controller\ApproveUserController::class),
];
