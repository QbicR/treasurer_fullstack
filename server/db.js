const { Sequelize } = require('sequelize')

// module.exports = new Sequelize('postgresql://postgres:postgres@localhost:5432/treasurer')
module.exports = new Sequelize('postgresql://uypzt90fsdwfgiujtoeh:C8i0YWyO6Ow6g54vO0Js@bqzpfco5blcn7yiewsoz-postgresql.services.clever-cloud.com:5432/bqzpfco5blcn7yiewsoz')


// module.exports = new Sequelize(
//     process.env.DB_NAME,
//     process.env.DB_USER,
//     process.env.DB_PASSWORD,
//     {
//         dialect: 'postgres',
//         host: process.env.DB_HOST, //localhost
//         port: process.env.DB_PORT //5432
//     }
// )
