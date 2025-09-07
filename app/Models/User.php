<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;
use Laravel\Sanctum\HasApiTokens;

class User extends Authenticatable
{
    use HasApiTokens, HasFactory, Notifiable;

    protected $fillable = [
        'name',
        'email',
        'password',
        'role',
        'phone',
    ];

    protected $hidden = [
        'password',
        'remember_token',
    ];

    protected $casts = [
        'email_verified_at' => 'datetime',
        'password' => 'hashed', // Laravel 11 : hash auto
    ];

    // ✅ Relation avec Address
    public function addresses()
    {
        return $this->hasMany(\App\Models\Address::class);
    }
    protected static function boot()
    {
        parent::boot();

        static::creating(function ($user) {
            if (!$user->matricule) {
                $lastId = User::max('id') ?? 0;
                $user->matricule = 'CLT-' . str_pad($lastId + 1, 4, '0', STR_PAD_LEFT,).'221';
            }
        });
    }

}
