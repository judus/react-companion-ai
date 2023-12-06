module.exports = (req, res) => {
    const auth = {login: 'TheTalesOf', password: 'super-secret'} // change this to your desired credentials

    // parse login and password from headers
    const b64auth = (req.headers.authorization || '').split(' ')[1] || ''
    const [login, password] = Buffer.from(b64auth, 'base64').toString().split(':')

    // Verify login and password are set and correct
    if(login && password && login === auth.login && password === auth.password) {
        // Access granted...
        res.send('Access granted')
    } else {
        // Access denied...
        res.status(401).send('Authentication required.') // custom message
        res.setHeader('WWW-Authenticate', 'Basic realm="401"') // change this if you want another realm name
    }
}