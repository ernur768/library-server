const authService = require('../service/auth-service');

class AuthController {
    async register(req, res, next) {
        try {
            const { email, password } = req.body;
            const user = await authService.register(email, password);

            res.json(user)
        }
        catch (error) {
            next(error)
        }
    }

    async activate(req, res, next) {
        try {
            const link = req.params.link;
            await authService.activate(link);
            res.redirect(process.env.CLIENT_URL)
        }
        catch (error) {
            next(error)
        }
    }

    async login(req, res, next) {
        try {
            const { email, password } = req.body;
            const user = await authService.login(email, password);
            res.cookie(
                'refreshToken',
                user.refreshToken,
                {
                    httpOnly: true,
                    sameSite: 'none',
                    secure: true,
                    maxAge: process.env.REFRESH_TOKEN_COOKIE_MAX_AGE_DAY * 24 * 60 * 60 * 1000
                }
            )
            res.json(user)
        }
        catch (error) {
            next(error)
        }
    }

    async logout(req, res, next) {
        try {
            const { refreshToken } = req.cookies
            const token = await authService.logout(refreshToken);
            res.clearCookie('refreshToken');
            res.json(token)
        }
        catch (error) {
            next(error)
        }
    }

    async refresh(req, res, next) {
        try {
            const { refreshToken } = req.cookies
            const user = await authService.refresh(refreshToken);
            res.cookie(
                'refreshToken',
                user.refreshToken,
                {
                    httpOnly: true,
                    sameSite: 'none',
                    secure: true,
                    maxAge: process.env.REFRESH_TOKEN_COOKIE_MAX_AGE_DAY * 24 * 60 * 60 * 1000
                }
            )

            res.json(user)
        }
        catch (error) {
            next(error)
        }
    }



}

module.exports = new AuthController()