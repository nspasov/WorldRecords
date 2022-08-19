const mongoose = require('mongoose');
const connectDb = require('../db-connect');
const Role = require('../models/RoleModel');

connectDb(27017);

const seedRoles = async() => {
    await Role.deleteMany({});

    const userRole = new Role({
        roleType: 'user'
    });

    const adminRole = new Role({
        roleType: 'admin'
    });

    const superAdminRole = new Role({
        roleType: 'super admin'
    });

    await userRole.save();
    await adminRole.save();
    await superAdminRole.save();

}

seedRoles().then(() => mongoose.connection.close());

