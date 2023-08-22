
import {create, createEstablishment, showAlleEstablishments, getEdit, postEdit, deleteEstablishment } from '../controllers/establishment.controller.js';
// import User from "../../models/user-model.js";

import sinon from 'sinon'; // Import Sinon for mocking
/** careful with the test for delete! it will not work if you run it twice, since it's deleting using the id, once used it actually delete the batiment with no go backs, so don't use it unless u r sure 100 % you don't want the info from the database
 * for now the function is commented to make sure it does not delete things
 * make them a global variable, define them in .env and come back here to call them
*/
// Find the last added Batiment

//**************************test create***************//
describe('Controller Establishment Tests', () => {
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
                errorMessage :'err',
                successMessage : 'yay'
            },
            params: {
                establishmentId: 16
            },
            body: {
                name:"unit test name" ,
                
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


    describe('getEdit', () => {
        it('should render "establishments/editProfile" view ', async () => {
            await getEdit(req, res);
            sinon.assert.calledWith(res.render, 'establishments/editProfile', sinon.match.object);
        });

        it('should set status to 404 then render "home/404" view ', async () => {
            req = {
                session: { 
                    user: { 
                        id: 38, 
                        establishmentId: 2, 
                        role: 'kingAdmin' 
                    },
                    errorMessage :'err',
                    successMessage : 'yay'
                },
                params: {
                    establishmentId: 16000
                },
                body: {
                    name:"unit test name" ,
                    
                },
            };
            await getEdit(req, res);
            sinon.assert.calledWith(res.status,404)
            sinon.assert.calledWith(res.render, 'home/404', sinon.match.object);
        });
    });

    describe('postEdit', () => {
        it('should redirect to /establishments', async () => {
            await postEdit(req, res);
            sinon.assert.calledWith(res.redirect, '/establishments');
        });

        it('should set status to 404 then render "home/404" view ', async () => {
            req = {
                session: { 
                    user: { 
                        id: 38, 
                        establishmentId: 2, 
                        role: 'kingAdmin' 
                    },
                    errorMessage :'err',
                    successMessage : 'yay'
                },
                params: {
                    establishmentId: 16000
                },
                body: {
                    name:"unit test name" ,
                    
                },
            };
            await postEdit(req, res);
            sinon.assert.calledWith(res.status,404)
            sinon.assert.calledWith(res.render, 'home/404', sinon.match.object);
        });
    });



    describe('showAlleEstablishments', () => {
        it('should render "establishments/all-establishments" view ', async () => {
            await showAlleEstablishments(req, res);
            sinon.assert.calledWith(res.render, 'establishments/all-establishments', sinon.match.object);
        });
    });

    
/**
 * commented so that we don't create a new establishment in the database every time we run this test
 */
/*

    describe('createEstablishment the function thats called when we post the formulaire to create an establishment', () => {
        it('should create the establishment then render "establishments/all-establishments" view ', async () => {
            await createEstablishment(req, res);
            sinon.assert.calledWith(res.render, 'establishments/all-establishments', sinon.match.object);
        });
        
    });
*/ 

    describe('get create', () => {
        it('should render to "establishments/createEstablishment"', async () => {
            create(req, res);
            sinon.assert.calledWith(res.render, 'establishments/createEstablishment', sinon.match.object);
        });
    });


    describe('deleteEstablishment', () => {
/**
 * commented so that we don't delete data from  the database every time we run this test
 */
        // it('should render "establishments/all-establishments" view ', async () => {
        //     req = {
        //         session: { 
        //             user: { 
        //                 id: 38, 
        //                 establishmentId: 2, 
        //                 role: 'kingAdmin' 
        //             },
        //             errorMessage :'err',
        //             successMessage : 'yay'
        //         },
        //         params: {
        //             establishmentId: 21
        //         },
        //         body: {
        //             name:"unit test name" ,
        //         },
                
        //     };
        //     await deleteEstablishment(req, res);
        //     sinon.assert.calledWith(res.redirect, '/establishments');
        // });

        it('should set status to 404 then render "home/404" view ', async () => {
            req = {
                session: { 
                    user: { 
                        id: 38, 
                        establishmentId: 2, 
                        role: 'kingAdmin' 
                    },
                    errorMessage :'err',
                    successMessage : 'yay'
                },
                params: {
                    establishmentId: 16000
                },
                body: {
                    name:"unit test name" ,
                    
                },
            };
            await deleteEstablishment(req, res);
            sinon.assert.calledWith(res.status,404)
            sinon.assert.calledWith(res.render, 'home/404', sinon.match.object);
        });

        it('should render to 403, should not delete because even if superAdmin, it is not his establishment to begin with', async () => {
            req = {
                session: { 
                    user: { 
                        id: 34, 
                        establishmentId: 2, 
                        role: 'superAdmin' 
                    },
                    errorMessage :'err',
                    successMessage : 'yay'
                },
                params: {
                    establishmentId: 21
                },
                body: {
                    name:"unit test name" ,
                    
                },
            };
            await deleteEstablishment(req, res);
            sinon.assert.calledWith(res.status,403)
            sinon.assert.calledWith(res.render, 'home/403', sinon.match.object);
        });
        // it('should not delete because even if superAdmin, it is not his establishment to begin with', async () => {
        //     req = {
        //         session: { 
        //             user: { 
        //                 id: 40, 
        //                 establishmentId: 2, 
        //                 role: 'admin' 
        //             },
        //             errorMessage :'err',
        //             successMessage : 'yay'
        //         },
        //         params: {
        //             establishmentId: 18
        //         },
        //         body: {
        //             name:"unit test name" ,
        //         },
                
        //     };
        //     await deleteEstablishment(req, res);

        //     sinon.assert.calledWith(res.render, 'establishments/all-establishments', sinon.match.object);
        // });
        
    });

});