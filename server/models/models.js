const sequelize = require('../db')
const { DataTypes } = require('sequelize')

const User = sequelize.define('user', {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    login: { type: DataTypes.STRING, unique: true },
    password: { type: DataTypes.STRING },
    nickName: { type: DataTypes.STRING },
    img: { type: DataTypes.STRING, defaultValue: '' }
},
    {
        timestamps: false
    })

const Card = sequelize.define('card', {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    name: { type: DataTypes.STRING, allowNull: false },
    type: { type: DataTypes.STRING, allowNull: false },
    creationDate: { type: DataTypes.STRING, allowNull: false },
    value: { type: DataTypes.INTEGER, allowNull: false }
},
    {
        timestamps: false
    })

const Operation = sequelize.define('operation', {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    cardName: { type: DataTypes.STRING, allowNull: false },
    type: { type: DataTypes.STRING, allowNull: false },
    creationDate: { type: DataTypes.STRING, allowNull: false },
    category: { type: DataTypes.STRING, allowNull: false },
    value: { type: DataTypes.INTEGER, allowNull: false },
    comment: { type: DataTypes.STRING, defaultValue: '' },
},
    {
        timestamps: false
    })

User.hasMany(Card)
Card.belongsTo(User)

Card.hasMany(Operation)
Operation.belongsTo(Card)

User.hasMany(Operation)
Operation.belongsTo(User)


module.exports = {
    User,
    Card,
    Operation
}