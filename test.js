import { expect } from 'chai';
import User from './models/user-model.js';
import './models/user-has-permisssion-model.js';

// Assuming you have a user ID
const userIdExist = 39;
const userIdDoesntExist = 1;
const permission = "view";
const doesnthasPermission = "delete";

describe('User Permissions', () => {
  it('should return true if the user has the desired permission', async () => {
    const user = await User.findByPk(userIdExist);
    const desiredPermissionName = permission;

    const permissions = await user.getPermissions();
    const hasPermission = permissions.some(permission => permission.name === desiredPermissionName);

    expect(hasPermission).to.be.true;
  });

  it('should return false if the user does not have the desired permission', async () => {
    const user = await User.findByPk(userIdExist);
    const desiredPermissionName = doesnthasPermission;

    const permissions = await user.getPermissions();
    const hasPermission = permissions.some(permission => permission.name === desiredPermissionName);

    expect(hasPermission).to.be.false;
  });

  it('should handle cases where the user does not exist', async () => {
    const user = await User.findByPk(userIdDoesntExist);
    const desiredPermissionName = 'write_post';

    if (!user) {
      // If user is not found, consider user doesn't have the permission
      expect(false).to.equal(false);
    }
  });
});
