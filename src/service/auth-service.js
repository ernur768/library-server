const bcrypt = require('bcrypt');
const uuid = require('uuid');
const UserModel = require("../model/user-model");
const UserDto = require('../dto/user-dto')
const ApiError = require('../exeptions/api-error')
const mailService = require("../service/mail-service");
const tokenService = require("../service/token-service");

class AuthService {
    async register(email, password) {
        const user = await UserModel.findOne({ email })
        if (user) {
            throw ApiError.BadRequest('Электронная почта уже существует')
        }

        const hash = await bcrypt.hash(password, 10)
        const activationLink = uuid.v4()
        const newUser = await UserModel.create({email, password: hash, activationLink })
        mailService.sendActivationMail(email, process.env.API_URL + '/auth/activate/' +  activationLink)

        return new UserDto(newUser)
    }

    async activate(link) {
        const user = await UserModel.findOne({ activationLink: link })
        if (!user) {
            throw ApiError.BadRequest('Invalid activation link')
        }
        user.isActivated = true
        await user.save()
        return new UserDto(user)
    }

    async login(email, password) {
        const user = await UserModel.findOne({ email })
        if (!user) {
            throw ApiError.BadRequest('Неверный адрес электронной почты или пароль')
        }

        const validPassword = await bcrypt.compare(password, user.password)
        if (!validPassword) {
            throw ApiError.BadRequest('Неверный адрес электронной почты или пароль')
        }

        if (!user.isActivated) {
            throw ApiError.BadRequest('Учетная запись не активирована')
        }

        const userDto = new UserDto(user)
        const tokens = tokenService.generateTokens({id: userDto.id})

        await tokenService.saveToken(userDto.id, tokens.refreshToken)

        return {
            user: userDto,
            ...tokens
        }
    }

    async logout(refreshToken) {
        return tokenService.deleteToken(refreshToken)
    }

    async refresh(refreshToken) {
        if (!refreshToken) {
            throw ApiError.UnauthorizedError()
        }

        const userData = tokenService.verifyRefreshToken(refreshToken)
        const tokenFromDb = await tokenService.findToken(refreshToken)

        if (!userData || !tokenFromDb) {
            throw ApiError.UnauthorizedError()
        }

        const user = await UserModel.findById(userData.id)
        const userDto = new UserDto(user)
        const tokens = tokenService.generateTokens({id: userDto.id})

        await tokenService.saveToken(userDto.id, tokens.refreshToken)

        return {
            user: userDto,
            ...tokens
        }
    }
}

module.exports = new AuthService()