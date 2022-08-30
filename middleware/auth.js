class AuthenticationMiddleware {
    // For any request, if the user isn't authenticated, redirect them to the login page.
    static ensureAuthenticated(req, res, next) {
        if (req.isAuthenticated()) {
            return next()
        }
        res.redirect('/')
    }
    // If the user is already authenticated but accessing the login page, redirect them to the dashboard.
    static ensureGuest(req, res, next) {
        if (!req.isAuthenticated()) {
            return next()
        }
        res.redirect('/dashboard')
    }
}

module.exports = AuthenticationMiddleware