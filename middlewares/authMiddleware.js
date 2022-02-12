const jwt = require('jsonwebtoken');

module.exports = (req, res, next) => {
  try {
    const { token } = req.cookies;

    if (!token) throw new Error();

    const { userId } = jwt.verify(token, 'jwtsecretkeyhaiyeh');

    req.userId = userId;
    next();
  } catch (error) {
    res.status(500).send('UnAuthorised!');
  }
};
