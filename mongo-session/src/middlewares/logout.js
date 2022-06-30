const logout = (req, res) => {
    const userSession = req.session.user;

    if (!userSession) {
      return res.status(200).json({
        session: {
          state: false,
          user: '',
        },
        message: `User ${userSession} has not logged in yet`,
      })
    }

    req.session.destroy(err => {
        if (err) {
            return res.status(500).json({
                message: `Error: ${err.message}`,
            });
        }
        
        res.status(200).json({
            session: {
            state: false,
            user: userSession,
            },
            message: `User ${userSession} has logged out`,
        });
    });
}

module.exports = {
    logout
}