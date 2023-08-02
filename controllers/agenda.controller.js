
export const getAgenda = (req, res) => {
    const user = req.session.user
    res.render('apiTest/agenda',{user});
}