import { register, createUser, showAllUsers, getProfile, getEdit, postEdit, deleteUser } from '../user.controller.js';
// import User from "../../models/user-model.js";
import { getPermissionForUser } from '../../utiles/user.requete.js';
import { expect } from 'chai';
import Batiment from '../../models/batiment-model.js';
import sinon from 'sinon'; // Import Sinon for mocking
/** careful with the test for delete! it will not work if you run it twice, since it's deleting using the id, once used it actually delete the batiment with no go backs, so don't use it unless u r sure 100 % you don't want the info from the database
 * for now the function is commented to make sure it does not delete things
 * make them a global variable, define them in .env and come back here to call them
*/
// Find the last added Batiment

//**************************test create***************//
describe('Controller User Tests', () => {
    let req;
    let res;

    beforeEach(() => {
        req = { 
            session: { 
                user: { 
                    id: 38, 
                    establishmentId: 2, 
                    role: 'kingAdmin' 
                },
                errorMessage :'err'
            } ,
            params: {
                userId: 1
            },
            body: {
                firstName: "unit test",
                lastName: "unit test",
                email: "unit test",
                password: "unit test",
                role: "admin",
                establishmentId : 1,
            },
            
        };
        res = { 
            render: sinon.spy(), 
            redirect: sinon.spy(), 
            status: sinon.stub().returnsThis(), 
            send: sinon.spy() 
        };
    });

    afterEach(() => {
        sinon.restore();
    });

   
//done//


    describe('postEdit', () => {
        it('should redirect /batiment/${batimentId}  if batiment does not exist', async () => {
            await postEdit(req, res);
            sinon.assert.calledWith(res.redirect, `/users/${req.params.userId}`);
        });
        
        it('should render to home/404 view if batiment does not exist', async () => {
            req = { 
                session: { 
                    user: { 
                        id: 18, 
                        establishmentId: 1, 
                        role: 'superAdmin' 
                    },
                    errorMessage :'err'
                } ,
                params: {
                    userId: 100000
                },
                body: {
                    firstName: "unit test",
                    lastName: "unit test",
                    email: "unit test",
                    password: "unit test",
                    role: "admin",
                    establishmentId : 1,
                },
                
            };
            await postEdit(req, res);
            sinon.assert.calledWith(res.status, 404);
            sinon.assert.calledWith(res.render, 'home/404', sinon.match.object);
            // sinon.assert.calledWith(res.render, 'home/403', sinon.match.object);
        });
    });

    describe('getEdit', () => {
        it('should render "users/register" view if user has permission', async () => {
            await getEdit(req, res);
            sinon.assert.calledWith(res.render, 'users/editProfile', sinon.match.object);
        });

        it('should render "home/404" because user not found', async () => {
            req = { 
                session: { 
                    user: { 
                        id: 18, 
                        establishmentId: 1, 
                        role: 'superAdmin' 
                    },
                    errorMessage :'err'
                } ,
                params: {
                    userId: 100000
                },
                body: {
                    firstName: "unit test",
                    lastName: "unit test",
                    email: "unit test",
                    password: "unit test",
                    role: "admin",
                    establishmentId : 1,
                },
                
            };
            await getEdit(req, res);
            sinon.assert.calledWith(res.status, 404);
            sinon.assert.calledWith(res.render, 'home/404', sinon.match.object);
            
        });

        it('should work and render the page of the user profile since the user in session has higher powers', async () => {
            req = { 
                session: { 
                    user: { 
                        id: 18, 
                        establishmentId: 1, 
                        role: 'superAdmin' 
                    },
                    errorMessage :'err'
                } ,
                params: {
                    userId: 1
                },
                body: {
                    firstName: "unit test",
                    lastName: "unit test",
                    email: "unit test",
                    password: "unit test",
                    role: "admin",
                    establishmentId : 1,
                },
                
            };
            await getEdit(req, res);
            sinon.assert.calledWith(res.render, 'users/editProfile', sinon.match.object);
        });

        it('should not work and render the page 403 since the user in session has no higher powers', async () => {
            req = { 
                session: { 
                    user: { 
                        id: 42, 
                        establishmentId: 1, 
                        role: 'editor' 
                    },
                    errorMessage :'err'
                } ,
                params: {
                    userId: 1
                },
                body: {
                    firstName: "unit test",
                    lastName: "unit test",
                    email: "unit test",
                    password: "unit test",
                    role: "admin",
                    establishmentId : 1,
                },
                
            };
            await getEdit(req, res);
            sinon.assert.calledWith(res.render, 'home/403', sinon.match.object);
        });

        it('should not work and render the page 403 since the user in session has higher powers but not in same establishment', async () => {
            req = { 
                session: { 
                    user: { 
                        id: 42, 
                        establishmentId: 2, 
                        role: 'editor' 
                    },
                    errorMessage :'err'
                } ,
                params: {
                    userId: 1
                },
                body: {
                    firstName: "unit test",
                    lastName: "unit test",
                    email: "unit test",
                    password: "unit test",
                    role: "admin",
                    establishmentId : 1,
                },
                
            };
            await getEdit(req, res);
            sinon.assert.calledWith(res.render, 'home/403', sinon.match.object);
        });
    });

    describe('register', () => {
        it('should render "users/register" view if user has permission', async () => {
            await register(req, res);
            sinon.assert.calledWith(res.render, 'users/register', sinon.match.object);
        });
    });

    describe('createUser the function thats called when we post the register', () => {
        it('should create the user then render "users/users" view with the list of all users in the database because the user is the kingAdmin', async () => {
            await createUser(req, res);
            sinon.assert.calledWith(res.render, 'users/users', sinon.match.object);
        });
        it('should create the user then render "users/users" view with the list of only the users that has the same etablisment id as the user in session because the user is not the kingAdmin', async () => {
            req = { 
                session: { 
                    user: { 
                        id: 40, 
                        establishmentId: 3, 
                        role: 'superAdmin' 
                    },
                    errorMessage :'err'
                } ,
                params: {
                    userId: 1
                },
                body: {
                    firstName: "unit test",
                    lastName: "unit test",
                    email: "unit test",
                    password: "unit test",
                    role: "admin",
                    establishmentId : 1,
                },
                
            };
            await createUser(req, res);
            sinon.assert.calledWith(res.render, 'users/users', sinon.match.object);
        });
    });

    describe('showAllUsers', () => {
        it('should render "users/users" view with the list of all users in the database because the user is the kingAdmin', async () => {
            await showAllUsers(req, res);
            sinon.assert.calledWith(res.render, 'users/users', sinon.match.object);
        });

        it('should render "users/users" view with the list of only the users that has the same etablisment id as the user in session because the user is not the kingAdmin', async () => {
            req = { 
                session: { 
                    user: { 
                        id: 40, 
                        establishmentId: 1, 
                        role: 'admin' 
                    },
                    errorMessage :'err'
                } ,
                params: {
                    userId: 1
                },
                body: {
                    firstName: "unit test",
                    lastName: "unit test",
                    email: "unit test",
                    password: "unit test",
                    role: "admin",
                    establishmentId : 1,
                },
                
            };
            await showAllUsers(req, res);
            sinon.assert.calledWith(res.render, 'users/users', sinon.match.object);
        });
    });

    describe('getProfile', () => {
        
        it('should render "users/profile" view with the list of all users in the database because the user is the kingAdmin', async () => {
            await getProfile(req, res);
            sinon.assert.calledWith(res.render, 'users/profile', sinon.match.object);
        });

        it('should render "home/404" because user not found', async () => {
            req = { 
                session: { 
                    user: { 
                        id: 18, 
                        establishmentId: 1, 
                        role: 'superAdmin' 
                    },
                    errorMessage :'err'
                } ,
                params: {
                    userId: 100000
                },
                body: {
                    firstName: "unit test",
                    lastName: "unit test",
                    email: "unit test",
                    password: "unit test",
                    role: "admin",
                    establishmentId : 1,
                },
                
            };
            await getProfile(req, res);
            sinon.assert.calledWith(res.status, 404);
            sinon.assert.calledWith(res.render, 'home/404', sinon.match.object);
            
        });

        it('should work and render the page of the user profile since the user in session has higher powers', async () => {
            req = { 
                session: { 
                    user: { 
                        id: 18, 
                        establishmentId: 1, 
                        role: 'superAdmin' 
                    },
                    errorMessage :'err'
                } ,
                params: {
                    userId: 1
                },
                body: {
                    firstName: "unit test",
                    lastName: "unit test",
                    email: "unit test",
                    password: "unit test",
                    role: "admin",
                    establishmentId : 1,
                },
                
            };
            await getProfile(req, res);
            sinon.assert.calledWith(res.render, 'users/profile', sinon.match.object);
        });

        it('should not work and render the page 403 since the user in session has no higher powers', async () => {
            req = { 
                session: { 
                    user: { 
                        id: 42, 
                        establishmentId: 1, 
                        role: 'editor' 
                    },
                    errorMessage :'err'
                } ,
                params: {
                    userId: 1
                },
                body: {
                    firstName: "unit test",
                    lastName: "unit test",
                    email: "unit test",
                    password: "unit test",
                    role: "admin",
                    establishmentId : 1,
                },
                
            };
            await getProfile(req, res);
            sinon.assert.calledWith(res.render, 'home/403', sinon.match.object);
        });

        it('should not work and render the page 403 since the user in session has higher powers but not in same establishment', async () => {
            req = { 
                session: { 
                    user: { 
                        id: 42, 
                        establishmentId: 2, 
                        role: 'editor' 
                    },
                    errorMessage :'err'
                } ,
                params: {
                    userId: 1
                },
                body: {
                    firstName: "unit test",
                    lastName: "unit test",
                    email: "unit test",
                    password: "unit test",
                    role: "admin",
                    establishmentId : 1,
                },
                
            };
            await getProfile(req, res);
            sinon.assert.calledWith(res.render, 'home/403', sinon.match.object);
        });
    });


    describe('delete', () => {
        
        
        // it('should delete the user and redirect to batiments', async () => {
        //     req = { 
        //         session: { 
        //             user: { 
        //                 id: 38, 
        //                 establishmentId: 2, 
        //                 role: 'kingAdmin' 
        //             },
        //             errorMessage :'err'
        //         } ,
        //         params: {
        //             userId: 65
        //         },
        //         body: {
        //             firstName: "unit test",
        //             lastName: "unit test",
        //             email: "unit test",
        //             password: "unit test",
        //             role: "admin",
        //             establishmentId : 1,
        //         },
                
        //     };
        //     await deleteUser(req, res);
        //     sinon.assert.calledWith(res.redirect, '/users');
        // });
            
        it('should render to 403 page because the user is not from the same establishment as the user in session', async () => {
            req = { 
                session: { 
                    user: { 
                        id: 18, 
                        establishmentId: 2, 
                        role: 'superAdmin' 
                    },
                    errorMessage :'err'
                } ,
                params: {
                    userId: 1
                },
                body: {
                    firstName: "unit test",
                    lastName: "unit test",
                    email: "unit test",
                    password: "unit test",
                    role: "admin",
                    establishmentId : 1,
                },
                
            };
            await deleteUser(req, res);
            // sinon.assert.calledWith(res.status, 404);
            sinon.assert.calledWith(res.render, 'home/403', sinon.match.object);
        });
    
        it('should render to 403 page because of the lack of permission', async () => {
            req = { 
                session: { 
                    user: { 
                        id: 18, 
                        establishmentId: 1, 
                        role: 'editor' 
                    },
                    errorMessage :'err'
                } ,
                params: {
                    userId: 1
                },
                body: {
                    firstName: "unit test",
                    lastName: "unit test",
                    email: "unit test",
                    password: "unit test",
                    role: "admin",
                    establishmentId : 1,
                },
                
            };
            await deleteUser(req, res);
            // sinon.assert.calledWith(res.status, 403);
            sinon.assert.calledWith(res.render, 'home/403', sinon.match.object);
            // sinon.assert.calledWith(res.render, 'home/403', sinon.match.object);
        });

            
        it('should render to 404 page because the user does not exist', async () => {
            req = { 
                session: { 
                    user: { 
                        id: 18, 
                        establishmentId: 2, 
                        role: 'superAdmin' 
                    },
                    errorMessage :'err'
                } ,
                params: {
                    userId: 10000000
                },
                body: {
                    firstName: "unit test",
                    lastName: "unit test",
                    email: "unit test",
                    password: "unit test",
                    role: "admin",
                    establishmentId : 1,
                },
                
            };
            await deleteUser(req, res);
            // sinon.assert.calledWith(res.status, 404);
            sinon.assert.calledWith(res.render, 'home/404', sinon.match.object);
        });
    
    });
});