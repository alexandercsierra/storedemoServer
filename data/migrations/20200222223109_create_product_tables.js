
exports.up = function(knex) {
    return knex.schema.createTable('products', tbl=>{
        tbl.increments();
        tbl.string('name', 255).notNullable().unique();
        tbl.string('image_url').notNullable();
        tbl.string('description').notNullable();
        tbl.float('price').notNullable();
        tbl.integer('quantity').notNullable();
    })
        
    .createTable('categories', tbl=>{
        tbl.increments();
        tbl.string('name', 255).notNullable().unique();
    })

    .createTable('reviews', tbl=>{
        tbl.increments();
        tbl.integer('rating', 5).notNullable();
        tbl.string('review');

        //foreign key
        tbl.integer('product_id')
            .unsigned()
            .notNullable()
            .references('id')
            .inTable('products')
            .onDelete('CASCADE')
            .onUpdate('CASCADE');
    })

    .createTable('product_categories', tbl=>{
        //compound primary keys
        tbl.primary(['product_id', 'category_id'])

        //foreign keys
        tbl.integer('product_id')
            .unsigned()
            .notNullable()
            .references('id')
            .inTable('products')
            .onDelete('CASCADE')
            .onUpdate('CASCADE');

        tbl.integer('category_id')
            .unsigned()
            .notNullable()
            .references('id')
            .inTable('categories')
            .onDelete('CASCADE')
            .onUpdate('CASCADE');
    })
};

exports.down = function(knex) {
    return knex.schema.dropTableIfExists('product_categories')
        .dropTableIfExists('reviews')
        .dropTableIfExists('categories')
        .dropTableIfExists('products')
};
