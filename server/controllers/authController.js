const bcrypt = require("bcrypt");
const {sendEmail} = require('../controllers/utils/registerEmailUtil')

module.exports = {
  login: async (req, res) => {
    const db = req.app.get("db");
    const { username, password } = req.body;
    const user = await db.get_user(username);
    if (!user[0]) {
      return res.status(404).send("User does not exist");
    } else {
      const authenticated = bcrypt.compareSync(password, user[0].password);
      if (!authenticated) {
        return res.status(403).send("Incorrect username or password");
      } else {
        if (authenticated) {
          req.session.user = {
            userId: user[0].id,
            username: user[0].username
          };
          res.status(200).send(req.session.user)
        }
      }
    }
  },

  register: async (req, res) => {
    const db = req.app.get("db");
    const { username, password, email, first_name, last_name } = req.body;
    const existingUser = await db.get_user(username);
    if (existingUser[0]) {
      return res.status(409).send("Username or email already exists.");
    }

    const salt = bcrypt.genSaltSync(10);
    const hash = bcrypt.hashSync(password, salt);
    const registerUser = await db.register_user([username, hash, email, first_name, last_name]);
    delete registerUser[0].hash;
    console.log(registerUser, '1')
    req.session.user = {
      userId: registerUser[0].id,
      username: registerUser[0].username,
    };

    sendEmail(req)
    
    res.status(200).send(req.session.user);
  },

  getUser: (req, res) => {
    if (req.session.user) {
      return res.status(200).send(req.session.user);
    } else {
      res.sendStatus(400);
    }
  },

  logout: (req, res) => {
    req.session.destroy();
    res.sendStatus(200);
  },
};
