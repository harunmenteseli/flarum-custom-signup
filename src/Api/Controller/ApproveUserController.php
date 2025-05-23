<?php

namespace CustomSignupFlarum\Api\Controller;

use Flarum\Api\Controller\AbstractShowController;
use Flarum\User\User;
use Illuminate\Database\Eloquent\ModelNotFoundException;
use Psr\Http\Message\ServerRequestInterface;
use Tobscure\JsonApi\Document;

class ApproveUserController extends AbstractShowController
{
    public $serializer = 'Flarum\\Api\\Serializer\\UserSerializer';

    protected function data(ServerRequestInterface $request, Document $document)
    {
        $actor = $request->getAttribute('actor');
        if (!$actor || !$actor->isAdmin()) {
            throw new \Flarum\User\Exception\PermissionDeniedException();
        }
        $userId = array_get($request->getQueryParams(), 'id');
        $user = User::findOrFail($userId);
        $user->is_active = true;
        $user->is_approved = true;
        $user->save();
        return $user;
    }
}
