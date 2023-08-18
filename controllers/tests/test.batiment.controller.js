import { create, createBatiment, showAlleBatiments, getProfileBatiment, getEdit, postEdit, deleteBatiment } from '../batiment.controller.js';
import { getPermissionForUser } from '../../utiles/user.requete.js';
import { expect } from 'chai';
import sinon from 'sinon'; // Import Sinon for mocking
// import dotenv from 'dotenv';
// dotenv.config();
// const { VIEW_BUILDING, EDIT_BUILDING, DELETE_BUILDING , CREATE_BUILDING} = process.env;

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
  