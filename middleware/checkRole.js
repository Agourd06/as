function checkRole(expectedRole) {
    return function(req, res, next) {
        const userRole = req.session.userRole;

        
        
        if (!userRole) {
            res.redirect('/');

        }

        if (userRole === expectedRole) {
            next();
        } else {
            res.redirect('/');

        }
    };
}

module.exports = checkRole;
