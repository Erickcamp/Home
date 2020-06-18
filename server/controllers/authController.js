const bcrypt = require("bcrypt");

module.exports = {
  login: async (req, res) => {
    const db = req.app.get("db");
    const { email, password } = req.body;
    const user = await db.get_user(email);

    if (!user[0]) {
      return res.status(404).send("User does not exist");
    } else {
      const authenticated = bcrypt.compareSync(password, user[0].password);
      if (!authenticated) {
        return res.status(403).send("Incorrect email or password");
      } else {
        if (authenticated) {
          req.session.user = {
            userId: user[0].id,
          };
        }
      }
    }
  },

  register: async (req, res) => {
    const db = req.app.get("db");
    const { email, password, username, firstName, lastName } = req.body;
    const existingUser = await db.get_user(email);
    if (existingUser[0]) {
      return res.status(409).send("User already exists.");
    }

    const salt = bcrypt.genSaltSync(10);
    const hash = bcrypt.hashSync(password, salt);
    const registerUser = await db.register_user([username, hash]);
    delete registerUser[0].hash;

    req.session.user = {
      userId: resgisterUser[0].id,
      username: registerUser[0].username,
    };
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
