module.exports = {
    getPosts: (req, res) => {
      const db = req.app.get("db");
      const { filter } = req.query;
  
      if (filter) {
        db.get_posts_filter(filter)
          .then((response) => {
            res.status(200).send(response);
          })
          .catch((err) => {
            res.status(500).send(err);
          });
      } else {
        db.get_posts()
          .then((response) => {
            res.status(200).send(response);
          })
          .catch((err) => {
            res.status(500).send(err);
          });
      }
    },
    getPost: (req, res) => {
      const db = req.app.get("db");
      const { id } = req.params;
      db.get_post(id)
        .then((response) => {
          res.status(200).send(response[0]);
        })
        .catch((err) => {
          res.status(500).send(err);
        });
    },
    addPost: (req, res) => {
      const db = req.app.get("db");
      const { title, img, content, author_id } = req.body;
      db.add_post(title, img, content, author_id)
        .then((response) => {
          res.status(200).send(response);
        })
        .catch((err) => {
          res.status(500).send(err);
        });
    },
    editPost: (req, res) => {
      const db = req.app.get("db");
      const { id } = req.params;
      const { title, img, content, author_id } = req.body;
      db.edit_post(id, title, img, content, author_id)
        .then((response) => {
          res.status(200).send(response);
        })
        .catch((err) => {
          res.status(500).send(err);
        });
    },
    deletePost: (req, res) => {
      const db = req.app.get("db");
      const { id } = req.params;
      db.delete_post(id)
        .then((response) => {
          res.status(200).send(response);
        })
        .catch((err) => {
          res.stauts(500).send(err);
        });
    },
  };