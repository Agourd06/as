function checkRole(expectedRole) {
    return function(req, res, next) {
        const userRole = req.session.userRole;

        
        
        if (!userRole) {
            return res.status(401).json({ message: 'Unauthorized: Role header is missing. ' + userRole });
        }

        if (userRole === expectedRole) {
            next();
        } else {
            res.status(403).json({ message: 'Forbidden: Access is denied.' });
        }
    };
}

module.exports = checkRole;
