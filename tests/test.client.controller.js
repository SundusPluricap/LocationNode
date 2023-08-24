
import { create,createClient,showAllClients,getProfile,getEdit,postEdit,deleteClient } from '../controllers/client.controller.js';
// import User from "../../models/user-model.js";
import { getPermissionForUser } from '../utiles/user.requete.js';
import { expect } from 'chai';
import Batiment from '../models/batiment-model.js';
import sinon from 'sinon'; // Import Sinon for mocking
/** careful with the test for delete! it will not work if you run it twice, since it's deleting using the id, once used it actually delete the data with no go backs, so don't use it unless u r sure 100 % you don't want the info from the database
 * for now the function is commented to make sure it does not delete things
 * make them a global variable, define them in .env and come back here to call them
 * 
 * DELETE FROM clients WHERE firstName LIKE '%unit test%'; 
 * to delete all unit test from database
 * careful of the function edit profile
*/
// Find the last added Batiment

//**************************test create***************//
describe('Controller Client Tests', () => {
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
            },
            params: {
                clientId: 46
            },
            body: {
                firstName:"unit test client firstname" ,
                lastName:"unit test client lastname", 
                email:"unit test client email", 
                phoneNumber:"011111111",
                userName : 1
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


    //done
     
    describe('postEdit', () => {
        it('should edit the clients infos then redirect /clients/${clientId}  if client does not exist', async () => {
            req = {
                session: { 
                    user: { 
                        id: 38, 
                        establishmentId: 2, 
                        role: 'kingAdmin' 
                    },
                    errorMessage :'err'
                },
                params: {
                    clientId: 46
                },
                body: {
                    firstName:" unit test client firstname edit" ,
                    lastName:"unit test client lastname edit", 
                    email:"unit test client email edit", 
                    phoneNumber:"011111112 edit",
                    userName : 1
                },
                
            };
            await postEdit(req, res);
            sinon.assert.calledWith(res.redirect, `/clients/${req.params.clientId}`);
        });
        
        it('should render to home/404 view if client does not exist', async () => {
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
                    clientId: 100000
                },
                
                
            };
            await postEdit(req, res);
            sinon.assert.calledWith(res.status, 404);
            sinon.assert.calledWith(res.render, 'home/404', sinon.match.object);
            // sinon.assert.calledWith(res.render, 'home/403', sinon.match.object);
        });
    });

    

    describe('getEdit', () => {
        it('should render clients/editProfile view if user has permission', async () => {
            await getEdit(req, res);
            sinon.assert.calledWith(res.render, 'clients/editProfile', sinon.match.object);
        });

        it('should render "home/403" because user in session is not from the same establishment', async () => {
            req = {
                session: { 
                    user: { 
                        id: 38, 
                        establishmentId: 2, 
                        role: 'editor' 
                    },
                    errorMessage :'err'
                },
                params: {
                    clientId: 46
                },
            };
            await getEdit(req, res);
            // sinon.assert.calledWith(res.status, 404);
            sinon.assert.calledWith(res.render, 'home/403', sinon.match.object);
            
        });

        it('should render "home/403" because user in session is not from the same establishment', async () => {
            req = {
                session: { 
                    user: { 
                        id: 40, 
                        establishmentId: 1, 
                        role: 'admin' 
                    },
                    errorMessage :'err'
                },
                params: {
                    clientId: 46
                },
            };
            await getEdit(req, res);
            // sinon.assert.calledWith(res.status, 404);
            sinon.assert.calledWith(res.render, 'home/403', sinon.match.object);
            
        });

        it('should render "home/404" because client not found', async () => {
            req = {
                session: { 
                    user: { 
                        id: 38, 
                        establishmentId: 2, 
                        role: 'kingAdmin' 
                    },
                    errorMessage :'err'
                },
                params: {
                    clientId: 10000000000000
                },
            };
            await getEdit(req, res);
            sinon.assert.calledWith(res.status, 404);
            sinon.assert.calledWith(res.render, 'home/404', sinon.match.object);
            
        });
    });

        //Done//

    describe('getProfile', () => {
        
        it('should render "clients/profileClient" view since user is the kingAdmin', async () => {
            await getProfile(req, res);
            sinon.assert.calledWith(res.render, 'clients/profileClient', sinon.match.object);
        });

        it('should render "home/403" because user in session is not from the same establishment', async () => {
            req = {
                session: { 
                    user: { 
                        id: 38, 
                        establishmentId: 2, 
                        role: 'editor' 
                    },
                    errorMessage :'err'
                },
                params: {
                    clientId: 46
                },
            };
            await getProfile(req, res);
            // sinon.assert.calledWith(res.status, 404);
            sinon.assert.calledWith(res.render, 'home/403', sinon.match.object);
            
        });

        it('should render "home/403" because user in session is not from the same establishment', async () => {
            req = {
                session: { 
                    user: { 
                        id: 40, 
                        establishmentId: 1, 
                        role: 'admin' 
                    },
                    errorMessage :'err'
                },
                params: {
                    clientId: 46
                },
            };
            await getProfile(req, res);
            // sinon.assert.calledWith(res.status, 404);
            sinon.assert.calledWith(res.render, 'home/403', sinon.match.object);
            
        });

        it('should render "home/404" because client not found', async () => {
            req = {
                session: { 
                    user: { 
                        id: 38, 
                        establishmentId: 2, 
                        role: 'kingAdmin' 
                    },
                    errorMessage :'err'
                },
                params: {
                    clientId: 10000000000000
                },
            };
            await getProfile(req, res);
            sinon.assert.calledWith(res.status, 404);
            sinon.assert.calledWith(res.render, 'home/404', sinon.match.object);
            
        });

    });

    

    describe('showAllClients', () => {
        it('should render "clients/all-clients" view with the list of all clients in the database because the user is the kingAdmin', async () => {
            await showAllClients(req, res);
            sinon.assert.calledWith(res.render, 'clients/all-clients', sinon.match.object);
        });

        it('should render "clients/all-clients" view with the list of only the clients that has the same etablisment id as the user in session because the user is not the kingAdmin', async () => {
            req = {
                session: { 
                    user: { 
                        id: 38, 
                        establishmentId: 1, 
                        role: 'superAdmin' 
                    },
                    errorMessage :'err'
                },
                body: {
                    firstName:"unit test client firstname" ,
                    lastName:"unit test client lastname", 
                    email:"unit test client email", 
                    phoneNumber:"011111111",
                    // userName : 1
                },
                
            };
            await showAllClients(req, res);
            sinon.assert.calledWith(res.render, 'clients/all-clients', sinon.match.object);
        });

        
    });
    
    
    describe('createClient the function thats called when we post the formulaire to create a client', () => {
        it('should create the client and assign it to a different user since the user is a kingAdmin then redirect to "/clients"', async () => {
            await createClient(req, res);
            sinon.assert.calledWith(res.redirect, '/clients');
        });
        it('should create the user then render "users/users" view with the list of only the users that has the same etablisment id as the user in session because the user is not the kingAdmin', async () => {
            req = {
                session: { 
                    user: { 
                        id: 38, 
                        establishmentId: 2, 
                        role: 'admin' 
                    },
                    errorMessage :'err'
                },
                // params: {
                //     userId: 1
                // },
                body: {
                    firstName:"unit test client firstname" ,
                    lastName:"unit test client lastname", 
                    email:"unit test client email", 
                    phoneNumber:"011111111",
                    // userName : 1
                },
                
            };
            await createClient(req, res);
            sinon.assert.calledWith(res.redirect, '/clients');
        });
    });
   
    describe('get create', () => {
        it('should render "clients/createClient"', async () => {
            await create(req, res);
            
            sinon.assert.calledWith(res.render, 'clients/createClient', sinon.match.object);
        });
    });


    


    

    
    

    

    

    

    describe('delete', () => {
        
        
        // it('should delete the client and redirect to clients list', async () => {
        //     req = {
        //         session: { 
        //             user: { 
        //                 id: 38, 
        //                 establishmentId: 2, 
        //                 role: 'kingAdmin' 
        //             },
        //             errorMessage :'err'
        //         },
        //         params: {
        //             clientId: 92
        //         },
        //         body: {
        //             firstName:"unit test client firstname" ,
        //             lastName:"unit test client lastname", 
        //             email:"unit test client email", 
        //             phoneNumber:"011111111",
        //             userName : 1
        //         },
                
        //     };
        //     await deleteClient(req, res);
        //     sinon.assert.calledWith(res.redirect, '/clients');
        // });
            
        it('should render to home/404 view if client does not exist', async () => {
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
                    clientId: 100000
                },
            };
            await deleteClient(req, res);
            sinon.assert.calledWith(res.status, 404);
            sinon.assert.calledWith(res.render, 'home/404', sinon.match.object);
            // sinon.assert.calledWith(res.render, 'home/403', sinon.match.object);
        });


        it('should render "home/403" because user in session is not from the same establishment', async () => {
            req = {
                session: { 
                    user: { 
                        id: 40, 
                        establishmentId: 2, 
                        role: 'admin' 
                    },
                    errorMessage :'err'
                },
                params: {
                    clientId: 46
                },
            };
            await deleteClient(req, res);
            // sinon.assert.calledWith(res.status, 404);
            sinon.assert.calledWith(res.render, 'home/403', sinon.match.object);
            
        });

        it('should render "home/403" because user in session has no permission to delete this client', async () => {
            req = {
                session: { 
                    user: { 
                        id: 40, 
                        establishmentId: 1, 
                        role: 'admin' 
                    },
                    errorMessage :'err'
                },
                params: {
                    clientId: 40
                },
            };
            await getEdit(req, res);
            // sinon.assert.calledWith(res.status, 404);
            sinon.assert.calledWith(res.render, 'home/403', sinon.match.object);
            
        });

        // it('should render to 403 page because the user is not from the same establishment as the user in session', async () => {
        //     req = { 
        //         session: { 
        //             user: { 
        //                 id: 18, 
        //                 establishmentId: 2, 
        //                 role: 'superAdmin' 
        //             },
        //             errorMessage :'err'
        //         } ,
        //         params: {
        //             userId: 1
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
        //     await deleteClient(req, res);
        //     // sinon.assert.calledWith(res.status, 404);
        //     sinon.assert.calledWith(res.render, 'home/403', sinon.match.object);
        // });
    
        // it('should render to 403 page because of the lack of permission', async () => {
        //     req = { 
        //         session: { 
        //             user: { 
        //                 id: 18, 
        //                 establishmentId: 1, 
        //                 role: 'editor' 
        //             },
        //             errorMessage :'err'
        //         } ,
        //         params: {
        //             userId: 1
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
        //     await deleteClient(req, res);
        //     // sinon.assert.calledWith(res.status, 403);
        //     sinon.assert.calledWith(res.render, 'home/403', sinon.match.object);
        //     // sinon.assert.calledWith(res.render, 'home/403', sinon.match.object);
        // });

            
        // it('should render to 404 page because the user does not exist', async () => {
        //     req = { 
        //         session: { 
        //             user: { 
        //                 id: 18, 
        //                 establishmentId: 2, 
        //                 role: 'superAdmin' 
        //             },
        //             errorMessage :'err'
        //         } ,
        //         params: {
        //             userId: 10000000
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
        //     await deleteClient(req, res);
        //     // sinon.assert.calledWith(res.status, 404);
        //     sinon.assert.calledWith(res.render, 'home/404', sinon.match.object);
        // });
    
    });
});