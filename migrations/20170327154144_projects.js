'use strict';
exports.up = function(knex, Promise) {
    return knex.schema.createTable('projects', function(table) {
        table.increments().notNullable();
        table.string('title').notNullable();
        table.string('description');
        table.string('technologies');
        table.string('image');
        table.string('deployment_link');
        table.string('video_link');
        table.string('repo_link');
        table.timestamps(true, true);
    });
};

exports.down = function(knex, Promise) {
    return knex.schema.dropTable('projects');
};
