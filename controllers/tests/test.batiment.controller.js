import { create, createBatiment, showAlleBatiments, getProfileBatiment, getEdit, postEdit, deleteBatiment } from '../batiment.controller.js';
import { getPermissionForUser } from '../../utiles/user.requete.js';
import { expect } from 'chai';

describe('Controller Tests', () => {
  let req;
  let res;

  beforeEach(() => {
    req = { session: { user: { id: 1, establishmentId: 1, role: 'userRole' } } };
    res = { render: () => {}, redirect: () => {}, status: () => {}, send: () => {} };
  });

  afterEach(() => {
    // Any necessary cleanup
  });

  describe('create', () => {
    it('should render the createBatiment view if user has permission', async () => {
      // Mock permissions
      req.session.user.id = 1;
      req.session.user.establishmentId = 1;
      req.session.user.role = 'userRole';
      getPermissionForUser.returns(Promise.resolve([{ name: CREATE_BUILDING }]));
      
      // Call the function under test
      await create(req, res);

      // Assertions
      expect(getPermissionForUser).to.have.been.calledOnceWithExactly(1);
      expect(res.render).to.have.been.calledOnceWithExactly('batiments/createBatiment', {});
    });

    it('should render the 403 error page if user does not have permission', async () => {
      // Mock permissions
      req.session.user.id = 1;
      req.session.user.establishmentId = 1;
      req.session.user.role = 'userRole';
      getPermissionForUser.returns(Promise.resolve([]));

      // Call the function under test
      await create(req, res);

      // Assertions
      expect(getPermissionForUser).to.have.been.calledOnceWithExactly(1);
      expect(res.render).to.have.been.calledOnceWithExactly('home/403', {});
    });
  });

  // Write similar tests for other controller functions
});
