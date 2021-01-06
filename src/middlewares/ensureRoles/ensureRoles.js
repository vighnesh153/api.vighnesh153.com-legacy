function checkIntersection(roles1, roles2) {
  // Using an O(M x N) approach because I know
  // that M & N is less than 5.
  for (const role1 of roles1) {
    for (const role2 of roles2) {
      if (role1 === role2) {
        return true;
      }
    }
  }
  return false;
}

module.exports = (...roles) => async (req, res, next) => {
  const { user } = req;

  if (!user || !user.roles) {
    res.sendStatus(401);
    return;
  }

  const hasIntersection = checkIntersection(roles, user.roles);
  if (hasIntersection === false) {
    res.sendStatus(403);
    return;
  }

  next();
};
