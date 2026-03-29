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
       Schema::create('bookings', function (Blueprint $table) {
    $table->uuid('id')->primary();

    // Use uuid instead of foreignId
    $table->uuid('customer_id');
    $table->uuid('vehicle_id');

    $table->date('start_date');
    $table->date('end_date');
    $table->decimal('total_price', 10, 2);
    $table->timestamps();

    // Foreign keys
    $table->foreign('customer_id')->references('id')->on('customers')->cascadeOnDelete();
    $table->foreign('vehicle_id')->references('id')->on('vehicles')->cascadeOnDelete();
});
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('bookings');
    }
};
