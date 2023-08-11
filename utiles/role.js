import {getUsersWithRole} from '../utiles/user.requete.js'
import Permission from '../models/permission-model.js';
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