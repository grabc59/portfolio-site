'use strict';
exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex('projects').del()
    .then(function () {
      // Inserts seed entries
      // 'id', 'title', 'description', 'technologies', 'image', 'deployment_link', 'video_link', 'repo_link'
      return knex('projects').insert([
        {
          id: 1, 
          title: 'Nautilus', 
          description: "Web server analytics dashboard. Extends the Morgan NPM module to log server requests to a PostgreSQL database. Data is visualized via D3 to show site usage patterns, client geolocations, and more!",
          technologies: "Angular, D3, Node, Morgan, Express, Postgresql, Heroku",
          image: "",
          deployment_link: "https://grabski-nautilus.herokuapp.com/",
          video_link: "https://www.youtube.com/watch?v=LwBtdaht8C8",
          repo_link: "https://grabski-nautilus.herokuapp.com/"
        },
        {
          id: 2, 
          title: 'Asteroid Wars', 
          description: "A web browser game made with Phaser, a JS game framework. Integrated with an API for dynamic audio feedback",
          technologies: "jQuery, Phaser, Surge, Bootstrap, JSON APIs",
          image: "",
          deployment_link: "https://asteroid-wars.surge.sh",
          video_link: "https://www.youtube.com/watch?v=sBEG0uQGRp8",
          repo_link: "https://github.com/grabc59/asteroid-wars"
        },
        {
          id: 3, 
          title: 'EggPi', 
          description: "A website designed for IoT file sharing and streaming. Utilized Express and PostgreSQL to create backend routes accessing/uploading files",
          technologies: "jQuery, Bootstrap, AWS S3, Node, Morgan, Express, Postgresql, IoT, Raspberry Pi, hardware",
          image: "",
          deployment_link: "https://grabc59-eggpi.herokuapp.com/",
          video_link: "",
          repo_link: "https://github.com/grabc59/q2pi"
        },
      ]);
    });
};
