const ApiError = require('../errors/ApiError')
const { User } = require('../models/models')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const uuid = require('uuid')
const path = require('path')

const generateToken = (id, login, nickName) => {
    return jwt.sign(
        { id, login, nickName },
        process.env.SECRET_KEY,
        { expiresIn: '24h' })
}

class UserController {
    async registration(req, res, next) {
        try {
            const { login, password, nickName } = req.body
            if (!login || !password) {
                return next(ApiError.badRequest('Некорректные данные при входе'))
            }
            const candidate = await User.findOne({ where: { login } })
            if (candidate) {
                return next(ApiError.badRequest('Пользователь с таким логином уже существует'))
            }
            const hashPassword = await bcrypt.hash(password, 3)
            const user = await User.create({ login, password: hashPassword, nickName })
            const token = generateToken(user.id, user.login, user.nickName,)
            return res.json({ token })
        } catch (e) {
            res.status(500).json({
                message: 'На сервере произошла ошибка. Попробуйте позже.'
            })
        }
    }

    async login(req, res, next) {
        try {
            const { login, password } = req.body
            const user = await User.findOne({ where: { login } })
            if (!user) {
                return next(ApiError.badRequest('Пользователь не найден'))
            }
            let comparePassword = bcrypt.compareSync(password, user.password)
            if (!comparePassword) {
                return next(ApiError.badRequest('Неверный пароль'))
            }
            const token = generateToken(user.id, user.login, user.nickName)
            return res.json({ token })
        } catch (e) {
            res.status(500).json({
                message: 'На сервере произошла ошибка. Попробуйте позже.'
            })
        }
    }

    async getOne(req, res) {
        try {
            const { id } = req.params
            const user = await User.findOne({
                where: { id },
                attributes: { exclude: ['login', 'password'] }
            })
            return res.json(user)
        } catch (e) {
            res.status(500).json({
                message: 'На сервере произошла ошибка. Попробуйте позже.'
            })
        }
    }

    async update(req, res) {
        try {
            const { id } = req.params
            const { img } = req.files
            let fileName = uuid.v4() + '.jpeg'
            img.mv(path.resolve(__dirname, '..', 'static', fileName))
            const updateUser = await User.findOne({
                where: { id },
                attributes: { exclude: ['login', 'password'] }
            })
            const updatedUser = await updateUser.update(
                { img: fileName }
            )
            return res.json(updatedUser)
        } catch (e) {
            res.status(500).json({
                message: 'На сервере произошла ошибка. Попробуйте позже.'
            })
        }
    }
}

module.exports = new UserController()