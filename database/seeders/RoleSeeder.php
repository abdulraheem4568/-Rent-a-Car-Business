<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Spatie\Permission\Models\Role;
use Spatie\Permission\Models\Permission;

class RoleSeeder extends Seeder
{
    public function run()
    {
        // Permissions
        Permission::create(['name' => 'edit booking']);
        Permission::create(['name' => 'delete booking']);
        Permission::create(['name' => 'publish booking']);

        // Roles
        $role = Role::create(['name' => 'admin']);
        $role->givePermissionTo(['edit articles', 'delete articles', 'publish articles']);

        $editor = Role::create(['name' => 'editor']);
        $editor->givePermissionTo(['edit articles', 'publish articles']);
    }
}
