const jwt = require('jsonwebtoken');
const TokenModel = require('../model/token-model');

class TokenService {
    generateTokens(payload) {
        const accessToken = jwt.sign(
            payload,
            process.env.JWT_ACCESS_SECRET,
            { expiresIn: process.env.JWT_ACCESS_EXPIRES_IN }
        )
        const refreshToken = jwt.sign(
            payload,
            process.env.JWT_REFRESH_SECRET,
            { expiresIn: process.env.JWT_REFRESH_EXPIRES_IN }
        )

        return {
            accessToken,
            refreshToken
        }
    }

    async saveToken(userId, refreshToken) {
        const token = await TokenModel.findOne({ user: userId })
        if (token) {
            token.refreshToken = refreshToken
            return token.save()
        }
        return await TokenModel.create({user: userId, refreshToken})
    }

    async deleteToken(refreshToken) {
        return TokenModel.deleteOne({ refreshToken })
    }

    verifyAccessToken(token) {
        try {
            return jwt.verify(token, process.env.JWT_ACCESS_SECRET)
        }
        catch (e) {
            return null
        }
    }

    verifyRefreshToken(token) {
        try {
            return jwt.verify(token, process.env.JWT_REFRESH_SECRET)
        }
        catch (e) {
            return null
        }
    }

    async findToken(refreshToken) {
        return TokenModel.findOne({refreshToken})
    }
}

module.exports = new TokenService()