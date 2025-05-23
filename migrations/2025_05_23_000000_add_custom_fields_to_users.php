<?php

use Flarum\Database\Migration;

return Migration::modifyTable('users', function ($table) {
    $table->string('first_name')->nullable();
    $table->string('last_name')->nullable();
    $table->date('birth_date')->nullable();
    $table->string('country')->nullable();
    $table->string('city')->nullable();
    $table->string('social_media')->nullable();
    $table->string('phone')->nullable();
    $table->boolean('is_active')->default(false);
    $table->boolean('is_approved')->default(false);
});
