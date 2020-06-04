const deleteCookie = (req, res, next) => {
  console.log(req.session, 'LOKURA DE REQ MEU');
  req.session.destroy((err) => {
    console.log(req.session);
    // console.log(err);
  });
  next();
};

exports.deleteCookie = deleteCookie;
