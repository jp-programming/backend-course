const login = (req, res) => {
    const { name } = req.body;
    const userSession = req.session.user;

    if (userSession) {
        return res.status(200).json({
            session: {
                state: true,
                user: name,
            },
            message: `User ${userSession} has already logged in`,
        });
    } 

    req.session.user = name;
    res.status(200).json({
        session: {
            state: true,
            user: req.session.user
        },
        message: `User ${name} has logged in`,
    });
};

module.exports = {
    login
};