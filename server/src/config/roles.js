const allRoles = {
  user: ['getRestaurants', 'submitReview'],
  admin: ['getUsers', 'manageUsers', 'getRestaurants', 'manageRestaurants', 'submitReview'],
};

const roles = Object.keys(allRoles);
const roleRights = new Map(Object.entries(allRoles));

module.exports = {
  roles,
  roleRights,
};
