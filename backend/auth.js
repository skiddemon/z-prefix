function auth(req, res, next) {
    if (req.user == null) {
        res.status(403)
        return res.send('You are not authorized to view this page')
    }
    next()
}

module.exports = {
    auth
}