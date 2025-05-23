<?php

namespace CustomSignupFlarum\Api\Controller;

use Flarum\Api\Controller\AbstractListController;
use Flarum\User\User;
use Psr\Http\Message\ServerRequestInterface;
use Tobscure\JsonApi\Document;

class ListPendingUsersController extends AbstractListController
{
    public $serializer = 'Flarum\\Api\\Serializer\\UserSerializer';

    protected function data(ServerRequestInterface $request, Document $document)
    {
        return User::where('is_active', false)->where('is_approved', false)->get();
    }
}
