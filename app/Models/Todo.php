<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasOne;
use Illuminate\Support\Facades\Validator;

/**
 *
 *
 * @property-read \App\Models\User|null $user
 * @method static \Illuminate\Database\Eloquent\Builder|Todo newModelQuery()
 * @method static \Illuminate\Database\Eloquent\Builder|Todo newQuery()
 * @method static \Illuminate\Database\Eloquent\Builder|Todo query()
 * @property int $id
 * @property string $title
 * @property string|null $description
 * @property int $completed
 * @property string|null $deadline
 * @property \Illuminate\Support\Carbon|null $created_at
 * @property \Illuminate\Support\Carbon|null $updated_at
 * @method static \Illuminate\Database\Eloquent\Builder|Todo whereCompleted($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Todo whereCreatedAt($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Todo whereDeadline($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Todo whereDescription($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Todo whereId($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Todo whereTitle($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Todo whereUpdatedAt($value)
 * @property int $user_id
 * @method static \Illuminate\Database\Eloquent\Builder|Todo whereUserId($value)
 * @mixin \Eloquent
 */
class Todo extends Model
{
    use HasFactory;

    protected $fillable = [
        'completed',
        'title',
        'description',
        'deadline',
    ];

    public function casts(): array
    {
        return [
            'deadline' => 'datetime',
        ];
    }

    public static function validate(array $data): array
    {
        return Validator::validate($data, [
            'completed' => 'required|boolean',
            'title' => 'required|string|max:255',
            'description' => 'nullable|string',
            'deadline' => 'nullable|date',
        ]);
    }
}
