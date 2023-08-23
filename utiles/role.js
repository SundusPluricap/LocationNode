import {getUsersWithRole, oneUserWithRole, specificUser} from '../utiles/user.requete.js'
import Permission from '../models/permission-model.js';
import User from '../models/user-model.js';
import Establishment from '../models/establishment-model.js';
import '../models/user-has-permisssion-model.js';
import Sequelize from 'sequelize';

export const setPermissions = async (req,establishmentId,role) => {
    const selectedPermissions = req.body.superPermissions || [];
    
    const users = await getUsersWithRole(establishmentId,role)

    if(users){
        for (const user of users) {
            // console.log("//////users ids///////////: ",user.id)

            const selectedPermissionInstances = await Permission.findAll({
                where: {
                  id: selectedPermissions,
                },
            });

            await user.addPermissions(selectedPermissionInstances);
        }

        for (const user of users) {
            const permissionsToRemove = await user.getPermissions({
                where: {
                    id: {
                        [Sequelize.Op.notIn]: selectedPermissions,
                    },
                },
            });
    
            await user.removePermissions(permissionsToRemove);
        }
    }
    
    // if (selectedPermissions){

    // }
}

export const isKing = (user) => {
    return user.role === "kingAdmin"
}

export const findSuperAdminOfUser = async (userId) => {
    // console.log('shiiiiiiiiiiiiiiiiiiiiiiiii')
    const foundUser = await specificUser(userId)
    //   console.log('shiiiiiiiiiiiiiiiiiiiiiiiii',foundUser)
   return oneUserWithRole(foundUser.establishmentId, "superAdmin")  
}