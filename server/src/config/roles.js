const allRoles = {
  user: ['getRestaurants', 'submitReview'],
  admin: ['getUsers', 'manageUsers', 'getRestaurants', 'manageRestaurants'],
};

const roles = Object.keys(allRoles);
const roleRights = new Map(Object.entries(allRoles));

module.exports = {
  roles,
  roleRights,
};
