
'use strict';

const express = require('express');
const knex = require('../knex');

const router = express.Router();

////////////////////////
//////// GET ALL PROJECTS
////////////////////////
router.get('/', function(req, res, next) {
  knex('projects')
  .select('id', 'title', 'description', 'image', 'deployment_link', 'video_link', 'repo_link')
  .orderBy('id')
  .then((result) => {
    res.send(result);
  })
  .catch((err) => {
    next(err);
  });
});

////////////////////////////////
//////// GET SINGLE PROJECT
////////////////////////////////
router.get('/:id', function(req, res, next) {
  knex('projects')
    .select('id', 'title', 'description', 'image', 'deployment_link', 'video_link', 'repo_link')
    .where({id: req.params.id})
    .first()
    .then((result) => {
      res.send(result);
    })
    .catch((err) => {
      next(err);
    });
});

////////////////////////
//////// POST A PROJECT
////////////////////////
router.post('/', function(req, res, next) {
  knex('projects')
    .insert({
      title: req.body.title,
      description: req.body.description,
      image: req.body.price,
      deployment_link: req.body.deployment_link,
      video_link: req.body.video_link,
      repo_link: req.body.repo_link
    }, '*')
    .then((result) => {
      const return_result = result[0];
      delete return_result.created_at;
      delete return_result.updated_at;
      res.send(return_result);
    })
    .catch((err) => {
      next(err);
    });
})

////////////////////////
//////// PATCH
////////////////////////
router.patch('/:id', function(req, res, next) {
  knex('projects')
    .where({id: req.params.id})
    .first()
    .update({
      title: req.body.title,
      description: req.body.description,
      image: req.body.price,
      deployment_link: req.body.deployment_link,
      video_link: req.body.video_link,
      repo_link: req.body.repo_link
    }, '*')
    .then ((result) => {
      let return_result = result[0];
      delete return_result.created_at;
      delete return_result.updated_at;
      res.send(return_result);
    })
    .catch((err) => {
      next(err);
    });
});

////////////////////////
//////// DELETE
////////////////////////
router.delete('/:id', function(req, res, next) {
    let message;
    knex('classifieds')
        .select('id', 'title', 'description', 'image', 'deployment_link', 'video_link', 'repo_link')
        .where({
            id: req.params.id
        })
        .first()
        .then((delete_item) => {
            message = delete_item;
            return knex('projects')
                .del()
                .where({
                    id: req.params.id
                })
                .then((result) => {
                    res.send(message);
                })
                .catch((err) => {
                    next(err);
                });
        })
        .catch((err) => {
            next(err);
        });
});

module.exports = router;
