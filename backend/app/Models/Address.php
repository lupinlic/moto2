<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Address extends Model
{
    //
    use HasFactory;
    protected $table = 'address';
    protected $primaryKey = 'AddressID';
    public $timestamps = false;

    protected $fillable = ['UserID', 'FullName','PhoneNumber','Email','Provinces','Districts','Wards','SpecificAddress','isDefault'];

    public function customer()
    {
        return $this->belongsTo(Customer::class, 'CustomerID', 'CustomerID');
    }
    public function user()
    {
        return $this->belongsTo(User::class, 'UserID', 'id');
    }
    public static function setDefaultAddress($userId, $addressId)
    {
        // Cập nhật tất cả các địa chỉ của người dùng thành type = 0
        self::where('UserID', $userId)->update(['isDefault' => 0]);

        // Cập nhật địa chỉ được chọn thành type = 1 (địa chỉ mặc định)
        $address = self::find($addressId);
        if ($address && $address->UserID == $userId) {
            $address->isDefault = 1;
            $address->save();
            return $address;
        }
        return null;
    }
    public static function getDefaultAddress($userId)
    {
        return self::where('UserID', $userId)
                    ->where('isDefault', 1)
                    ->first(); // Lấy một địa chỉ mặc định đầu tiên
    }
}