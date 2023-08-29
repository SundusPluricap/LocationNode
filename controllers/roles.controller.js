
import User from '../models/user-model.js'; // Import your User model
import Permission from '../models/permission-model.js'; // Import your Permission model
import Establishment from '../models/establishment-model.js';
import {oneUserWithRole,getPermissionForRole} from '../utiles/user.requete.js'
permissionsList
import {permissionsList} from '../utiles/permission.requetes.js'
import {setPermissions} from '../utiles/role.js'

// Sample permissions data
// const permissions = ['create', 'read', 'update', 'delete', 'manageRoles'];

// Helper function to check if a user has a certain permission
// async function userHasPermission(user, permission) {
//   const userPermissions = await Permission.findAll({
//     where: { userId: user.id, permission: permission }
//   });
//   return userPermissions.length > 0;
// }



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
    // for (const establishment of establishments) {
    //     console.log('establishments!!!!!!!!!!!!', establishment.name);
    //     const superAdminPermission = await getPermissionForRole(establishment.id, "superAdmin");
    //     console.log('----------------------------------', superAdminPermission);
    //     const adminPermission = await getPermissionForRole(establishment.id, "admin");
    //     const editorPermission = await getPermissionForRole(establishment.id, "editor");

    //     establishmentPermissions.push({
    //         id: establishment.id,
    //         name: establishment.name,
    //         permissions: [superAdminPermission, adminPermission, editorPermission]
    //     });

        
    // }
    // const firstEstablishmentFirstPermission = establishmentPermissions[0].permissions[0][0];
    // console.log('First permission of the first establishment:', firstEstablishmentFirstPermission);

    // const targetEstablishmentId = 14; // The ID you're looking for

    // Find the establishment with the target ID
    // const targetEstablishment = establishmentPermissions.find(establishment => establishment.id === targetEstablishmentId);

    // if (targetEstablishment) {
    //     // Access the nested array within the permissions array of the target establishment
    //     const permissionsArray = targetEstablishment.permissions; // Assuming you want to access the first nested array

    //     // Now you can work with the elements inside the permissionsArray
    //     console.log('Permissions array for establishment with ID', targetEstablishmentId, ':', permissionsArray);
    // } else {
    //     console.log('Establishment not found with ID', targetEstablishmentId);
    // }


    // let establishmentPermissions = []
    // const establishments = await Establishment.findAll({});
    // establishments.forEach(establishment => {
    //     console.log('establishments!!!!!!!!!!!!',establishment.name)
    //     establishmentPermissions.push({
    //         id: establishment.id,
    //         name: establishment.name,
    //         permissions: [
    //             getPermissionForRole(establishment.id,"superAdmin"),
    //             getPermissionForRole(establishment.id,"admin"),
    //             getPermissionForRole(establishment.id,"editor")
    //         ]
    //     });

    //     // ListOf.push(establishment.id);
    //     console.log('ListOf!!!!!!!!!!!!',establishmentPermissions)

    // } )
    console.log('__________________________________________________ ' )

    console.log('from controller superPermissions: ', superPermissions)
    console.log('__________________________________________________ ' )
    
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
    setPermissions(req,establishmentId,"admin")
    // if(selectedPermissions){

    // }
    req.session.successMessage = 'Action was successful!';
    res.redirect('/establishments');

    console.log("setPermissionsForAdmin done")
}


export const setPermissionsForEditor = async (req, res) => {
    console.log("setPermissionsForEditor start")
    const establishmentId = req.params.establishmentId
    // const user = req.session.user
    // const selectedPermissions = req.body.superPermissions || [];
    
    // console.log("!!!!!!!!!!!!!!!selectedPermissions!!!!!!!!!!!!!!!!!",selectedPermissions)
    setPermissions(req,establishmentId,"editor")
    // if(selectedPermissions){

    // }
    req.session.successMessage = 'Action was successful!';
    res.redirect('/establishments');
    console.log("setPermissionsForEditor done")
}
