<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
       Schema::create('vehicles', function (Blueprint $table) {
    $table->uuid('id')->primary();
    $table->string('name');
    $table->string('type'); // car, bike, etc
    $table->integer('seats');
    $table->decimal('price_per_day', 10, 2);
    $table->boolean('available')->default(true);
    $table->timestamps();
});
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('vehicles');
    }
};
