import {getUsersWithRole} from '../utiles/user.requete.js'
import Permission from '../models/permission-model.js';
import '../models/user-has-permisssion-model.js';
import Sequelize from 'sequelize';

export const test = async (req,establishmentId,role) => {
    const selectedPermissions = req.body.superPermissions || [];
    console.log("!!!!!!!!!!!!!!!selectedPermissions!!!!!!!!!!!!!!!!!",selectedPermissions)
    
    console.log("!!!!!!!---------!!!!!!!!users!!!!!!!-----------!!!!!!!!!!",selectedPermissions)

    const users = await getUsersWithRole(establishmentId,role)

    console.log("!!!!!!!---------!!!!!!!!users!!!!!!!-----------!!!!!!!!!!",users
    
    )
    users.forEach(element => {
        console.log("//////result of find all users with role///////////: ",element.name)
    }); 
    if(users){
        for (const user of users) {
            console.log("//////users ids///////////: ",user.id)

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