const userModel = require('../models/user')
const utils = require('./utils')

const CreateDefaultAdminUser = async () => {
    const adminUser = await userModel.findOne({email:process.env.ADMIN_USERNAME})
    if (adminUser)
        return;

    userModel.create({email:process.env.ADMIN_USERNAME, password_hash:utils.HashPassword(process.env.ADMIN_PASSWORD), auth_level:2})
}

module.exports = {
    CreateDefaultAdminUser
}