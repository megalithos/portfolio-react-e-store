const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const GetSignedToken = (_obj) =>
{
    return jwt.sign(_obj, process.env.JWT_SECRET, { expiresIn: 24*60*60 }) // 24 hours
}

const HashPassword = (_password) =>
{
    const salt = bcrypt.genSaltSync(10);
    const hash = bcrypt.hashSync(_password, salt);
    return hash;
}

module.exports = {
    GetSignedToken, HashPassword
}