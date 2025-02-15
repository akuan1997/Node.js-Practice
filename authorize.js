const authorize = (req, res, next) => {
    const {user} = req.query
    if (user === 'kuan') {
        req.user = {name: 'kuan', id: 3}
        next()
    } else {
        res.status(400).send('Unauthorized')
    }
}

module.exports = authorize