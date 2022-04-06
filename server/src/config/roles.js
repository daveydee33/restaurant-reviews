const allRoles = {
  user: ['getRestaurants'],
  admin: ['getUsers', 'manageUsers', 'getRestaurants'],
};

const roles = Object.keys(allRoles);
const roleRights = new Map(Object.entries(allRoles));

module.exports = {
  roles,
  roleRights,
};
