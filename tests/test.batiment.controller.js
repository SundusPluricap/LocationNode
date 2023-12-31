import { create, createBatiment, showAlleBatiments, getProfileBatiment, getEdit, postEdit, deleteBatiment } from '../controllers/batiment.controller.js';
import { getPermissionForUser } from '../utiles/user.requete.js';
import { expect } from 'chai';
import Batiment from '../models/batiment-model.js';
import sinon from 'sinon'; // Import Sinon for mocking
/** careful with the test for delete! it will not work if you run it twice, since it's deleting using the id, once used it actually delete the batiment with no go backs, so don't use it unless u r sure 100 % you don't want the info from the database
 * for now the function is commented to make sure it does not delete things
 * make them a global variable, define them in .env and come back here to call them
 * 
 *  DELETE FROM batiments WHERE name LIKE '%unit test%'; 
 * to delete all unit test from database
 * careful of the function edit profile
 * 
*/
// Find the last added Batiment

//**************************test create***************//
describe('Controller create Tests', () => {
    let req;
    let res;

    beforeEach(() => {
        req = { session: { user: { id: 38, establishmentId: 2, role: 'kingAdmin' } } };
        res = { render: sinon.spy(), redirect: sinon.spy(), status: sinon.stub().returnsThis(), send: sinon.spy() };
    });

    afterEach(() => {
        sinon.restore();
    });

    describe('create', () => {
            it('should render the createBatiment view if user has permission', async () => {
            await create(req, res);
            sinon.assert.calledWith(res.render, 'batiments/createBatiment', sinon.match.object);
        });

        it('should render the 403 error page if user does not have permission', async () => {
            req = { session: { user: { id: 40, establishmentId: 3, role: 'admin' } } };
            await create(req, res);
            sinon.assert.calledWith(res.render, 'home/403', sinon.match.object);
        });
    });

});

//**************************test createBatiment***************//
describe('Controller createBatiment Tests', () => {
    let req;
    let res;

    beforeEach(() => {
        req = {
            session: { user: { id: 38, establishmentId: 2, role: 'kingAdmin' } },
            file: { filename: "1690378677647.png" },
            body: { name: "unit test name", adresse: "unit test adresse", establishment:1 }
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

    describe('create', () => {
        it('should create a batiment then redirect to batiments view if user has permission', async () => {
            await createBatiment(req, res);
            sinon.assert.calledWith(res.redirect, '/batiments');
        });

        it('should create a batiment in the same establishment as user in session then redirect to batiments view if user has permission', async () => {
            // req = { session: { user: { id: 40, establishmentId: 3, role: 'admin' } } };
            req = {
                session: { user: { id: 40, establishmentId: 3, role: 'admin' } },
                file: { filename: "1690378677647.png" },
                body: { name: "unit test name", adresse: "unit test adresse", establishment:1 }
            };
            await createBatiment(req, res);
            sinon.assert.calledWith(res.redirect, '/batiments');
            // sinon.assert.calledWith(res.render, 'home/403', sinon.match.object);
        });
    });

});

//**************************test showALL***************//
describe('Controller showALL Tests', () => {
    let req;
    let res;

    beforeEach(() => {
        req = { session: { user: { id: 38, establishmentId: 2, role: 'kingAdmin' } } };
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

    describe('showAlleBatiments', () => {
        it('should render to batment/all-batiments view if user has permission', async () => {
            await showAlleBatiments(req, res);
            sinon.assert.calledWith(res.render, 'batiments/all-batiments', sinon.match.object);
        });

        it('should render to batment/all-batiments with only the batiment that belongs to the same establishment as user in session then redirect to batiments view if user has permission', async () => {
            req = { session: { user: { id: 40, establishmentId: 3, role: 'admin' } } };
            await showAlleBatiments(req, res);
            sinon.assert.calledWith(res.render, 'batiments/all-batiments', sinon.match.object);
            // sinon.assert.calledWith(res.render, 'home/403', sinon.match.object);
        });
    });

});

//**************************test getEdit***************//
describe('Controller getEdit Tests', () => {
    let req;
    let res;

    beforeEach(() => {
        req = { 
            session: { 
                user: { 
                    id: 38, 
                    establishmentId: 2, 
                    role: 'kingAdmin' 
                } 
            },
            params: {
                batimentId: 1
            }
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
        it('should render to batment/editProfile view if user has permission', async () => {
            await getEdit(req, res);
            sinon.assert.calledWith(res.render, 'batiments/editProfile', sinon.match.object);
        });

        it('should render to home/403 view if user has permission', async () => {
            req = { 
                session: { 
                    user: { 
                        id: 40, 
                        establishmentId: 3, 
                        role: 'admin' 
                    } 
                } ,
                params: {
                    batimentId: 1
                }
            };
            await getEdit(req, res);
            sinon.assert.calledWith(res.render, 'home/403', sinon.match.object);
            // sinon.assert.calledWith(res.render, 'home/403', sinon.match.object);
        });

        it('should render to home/404 view if batiment does not exist', async () => {
            req = { 
                session: { 
                    user: { 
                        id: 40, 
                        establishmentId: 3, 
                        role: 'admin' 
                    } 
                } ,
                params: {
                    batimentId: 1000
                }
            };
            await getEdit(req, res);
            sinon.assert.calledWith(res.status, 404);
            sinon.assert.calledWith(res.render, 'home/404', sinon.match.object);
            // sinon.assert.calledWith(res.render, 'home/403', sinon.match.object);
        });
    });

});
  
//**************************test postEdit***************//
describe('Controller postEdit Tests', () => {
    let req;
    let res;

    beforeEach(() => {
        req = { 
            session: { 
                user: { 
                    id: 38, 
                    establishmentId: 2, 
                    role: 'kingAdmin' 
                } 
            },
            params: {
                batimentId: 1
            },
            body: {
                name: "unit test edit name",
                adresse : "unit test edit adresse"
            }
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

    describe('postEdit', () => {
        it('should redirect /batiment/${batimentId}  if batiment does not exist', async () => {
            await postEdit(req, res);
            sinon.assert.calledWith(res.redirect, `/batiments/${req.params.batimentId}`);
        });
        
        it('should render to home/404 view if batiment does not exist', async () => {
            req = { 
                session: { 
                    user: { 
                        id: 40, 
                        establishmentId: 3, 
                        role: 'admin' 
                    } 
                } ,
                params: {
                    batimentId: 1000
                }
            };
            await postEdit(req, res);
            sinon.assert.calledWith(res.status, 404);
            sinon.assert.calledWith(res.render, 'home/404', sinon.match.object);
            // sinon.assert.calledWith(res.render, 'home/403', sinon.match.object);
        });
    });

});


//**************************test delete***************//
// describe('Controller delete Tests', () => {
//     let req;
//     let res;
      

//     beforeEach(() => {
//         req = { 
//             session: { 
//                 user: { 
//                     id: 38, 
//                     establishmentId: 2, 
//                     role: 'kingAdmin' 
//                 } 
//             },
//             params: {
//                 batimentId : 37
//             },
//         };
//         res = { 
//             render: sinon.spy(), 
//             redirect: sinon.spy(), 
//             status: sinon.stub().returnsThis(), 
//             send: sinon.spy() 
//         };
//     });

//     afterEach(() => {
//         sinon.restore();
//     });

//     describe('delete', () => {
//         it('should delete the batiment and redirect to batiments', async () => {
//             await deleteBatiment(req, res);
//             sinon.assert.calledWith(res.redirect, '/batiments');
//         });
        
//         it('should render to 404 page because the batiment wasn not found', async () => {
//             req = { 
//                 session: { 
//                     user: { 
//                         id: 40, 
//                         establishmentId: 3, 
//                         role: 'admin' 
//                     } 
//                 } ,
//                 params: {
//                     batimentId: 12434
//                 }
//             };
//             await deleteBatiment(req, res);
//             sinon.assert.calledWith(res.status, 404);
//             sinon.assert.calledWith(res.render, 'home/404', sinon.match.object);
//         });

//         it('should render to 403 page because of the lack of permission', async () => {
//             req = { 
//                 session: { 
//                     user: { 
//                         id: 40, 
//                         establishmentId: 3, 
//                         role: 'admin' 
//                     } 
//                 } ,
//                 params: {
//                     batimentId: 1
//                 }
//             };
//             await deleteBatiment(req, res);
//             // sinon.assert.calledWith(res.status, 403);
//             sinon.assert.calledWith(res.render, 'home/403', sinon.match.object);
//             // sinon.assert.calledWith(res.render, 'home/403', sinon.match.object);
//         });
//     });

// });

