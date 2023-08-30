
import User from '../models/user-model.js'; // Import your User model
import Permission from '../models/permission-model.js'; // Import your Permission model
import Establishment from '../models/establishment-model.js';
import {oneUserWithRole,getPermissionForRole} from '../utiles/user.requete.js'
// permissionsList
import {permissionsList} from '../utiles/permission.requetes.js'
import {setPermissions} from '../utiles/role.js'

export const getRoles = async (req, res) => {
    console.log("get roles started")
    const user = req.session.user
    const establishmentId = req.params.establishmentId
    const permissions = await permissionsList()
    const establishments = await Establishment.findAll({});
    // let establishmentPermissions = []
    const superPermissions = await getPermissionForRole(establishmentId, "superAdmin");
    const adminPermissions = await getPermissionForRole(establishmentId, "admin");
    const editorPermissions = await getPermissionForRole(establishmentId, "editor");
    // console.log('__________________________________________________ ' )

    // console.log('from controller superPermissions: ', superPermissions)
    // console.log('__________________________________________________ ' )
    
    // const users = await User.findAll({ include: [Establishment] });
    res.render('admin/roles.ejs', {permissions,establishments,superPermissions, adminPermissions,editorPermissions, user,establishmentId });
    console.log("get roles done")
};

export const setPermissionsForSuper = async (req, res) => {
    console.log("setPermissionsForSuper started")
    const establishmentId = req.params.establishmentId
    console.log('______________________________here1____________________________________________')
    console.log('establishmentId', establishmentId)
    const user = req.session.user
    const selectedPermissions = req.body.superPermissions || [];
    // console.log("!!!!!!!!!!!!!!!selectedPermissions!!!!!!!!!!!!!!!!!",selectedPermissions)
    await setPermissions(req,establishmentId,"superAdmin")
    console.log('______________________________here2____________________________________________')
    console.log('setPermissions(req,establishmentId,"superAdmin")',await setPermissions(req,establishmentId,"superAdmin"))
    // if(selectedPermissions){

    // }
    req.session.successMessage = 'Action was successful!';
    res.redirect('/establishments');
    console.log("setPermissionsForSuper done")
}


export const setPermissionsForAdmin = async (req, res) => {
    console.log("setPermissionsForAdmin started")
    const establishmentId = req.params.establishmentId
    const user = req.session.user
    const selectedPermissions = req.body.superPermissions || [];
    // console.log("!!!!!!!!!!!!!!!selectedPermissions!!!!!!!!!!!!!!!!!",selectedPermissions)
    await setPermissions(req,establishmentId,"admin")
    // if(selectedPermissions){

    // }
    req.session.successMessage = 'Action was successful!';
    res.redirect('/establishments');

    console.log("setPermissionsForAdmin done")
}


export const setPermissionsForEditor = async (req, res) => {
    console.log("setPermissionsForEditor start")
    const establishmentId = req.params.establishmentId
    await setPermissions(req,establishmentId,"editor")
    req.session.successMessage = 'Action was successful!';
    res.redirect('/establishments');
    console.log("setPermissionsForEditor done")
}
