<?php

namespace CustomSignupFlarum\Listeners;

use Flarum\User\Event\Saving;
use Illuminate\Events\Dispatcher;

class AddCustomFieldsToUser
{
    public function subscribe(Dispatcher $events)
    {
        $events->listen(Saving::class, [$this, 'whenUserIsSaving']);
    }

    public function whenUserIsSaving(Saving $event)
    {
        $attributes = $event->data['attributes'] ?? [];
        $user = $event->user;

        // Custom fields
        $user->first_name = $attributes['first_name'] ?? null;
        $user->last_name = $attributes['last_name'] ?? null;
        $user->birth_date = $attributes['birth_date'] ?? null;
        $user->country = $attributes['country'] ?? null;
        $user->city = $attributes['city'] ?? null;
        $user->social_media = $attributes['social_media'] ?? null;
        $user->phone = $attributes['phone'] ?? null;

        // Set user as inactive and unapproved on registration
        if ($event->actor->isGuest()) {
            $user->is_active = false;
            $user->is_approved = false;
        }
    }
}
