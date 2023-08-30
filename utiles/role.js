import {getUsersWithRole, oneUserWithRole, specificUser} from '../utiles/user.requete.js'
import Permission from '../models/permission-model.js';
import User from '../models/user-model.js';
import Establishment from '../models/establishment-model.js';
import '../models/user-has-permisssion-model.js';
import Sequelize from 'sequelize';
import { Op } from 'sequelize';

import dotenv from 'dotenv';
dotenv.config();
const { VIEW_CLIENT, EDIT_CLIENT, DELETE_CLIENT, CREATE_BUILDING, VIEW_BUILDING, EDIT_BUILDING, DELETE_BUILDING, CREATE_SALLE, VIEW_SALLE, EDIT_SALLE, DELETE_SALLE, RESERVE_SALLE, CREATE_ESTABLISHMENT, VIEW_ESTABLISHMENT, EDIT_ESTABLISHMENT, DELETE_ESTABLISHMENT } = process.env;


export const setPermissions = async (req,establishmentId,role) => {
    const selectedPermissions = req.body.superPermissions || [];
    
    const users = await getUsersWithRole(establishmentId,role)

    if(users){
        for (const user of users) {
            
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

export const setPermissionsByDefault = async (establishmentId,role) => {
    // const selectedPermissions = req.body.superPermissions || [];
    let selectedPermissions = []
    if (role === "kingAdmin"){
        selectedPermissions =  [
            EDIT_CLIENT,
            VIEW_CLIENT,
            DELETE_CLIENT,
            CREATE_BUILDING,
            VIEW_BUILDING,
            EDIT_BUILDING,
            DELETE_BUILDING,
            CREATE_SALLE,
            VIEW_SALLE,
            EDIT_SALLE,
            DELETE_SALLE,
            RESERVE_SALLE,
            VIEW_ESTABLISHMENT,
            EDIT_ESTABLISHMENT,
            DELETE_ESTABLISHMENT,
        ]
    }
    else if(role === "superAdmin"){
        selectedPermissions = [
            EDIT_CLIENT,
            VIEW_CLIENT,
            DELETE_CLIENT,
            CREATE_BUILDING,
            VIEW_BUILDING,
            EDIT_BUILDING,
            DELETE_BUILDING,
            CREATE_SALLE,
            VIEW_SALLE,
            EDIT_SALLE,
            DELETE_SALLE,
            RESERVE_SALLE,
            VIEW_ESTABLISHMENT,
            EDIT_ESTABLISHMENT,
            DELETE_ESTABLISHMENT,
        ]
    }
    else if(role === "admin"){
        selectedPermissions = [
            EDIT_CLIENT,
            VIEW_CLIENT,
            CREATE_BUILDING,
            VIEW_BUILDING,
            EDIT_BUILDING,
            CREATE_SALLE,
            VIEW_SALLE,
            EDIT_SALLE,
            RESERVE_SALLE,
        ]
    }
    else if(role === "editor"){
        selectedPermissions = [
            VIEW_CLIENT,
            CREATE_BUILDING,
            VIEW_BUILDING,
            CREATE_SALLE,
            VIEW_SALLE,
            RESERVE_SALLE,
        ]
    }
    
    // const selectedPermissionInstances = await Permission.findAll({
    //     where: {
    //       name: {
    //         [Op.in]: selectedPermissions,
    //       },
    //     },
    //   });

    //   console.log(selectedPermissionInstances)

    const users = await getUsersWithRole(establishmentId,role)
    console.log('||||||||||||||||||_____________this many users______________|||||||||||||||||||',users.length)
    console.log('||||||||||||||||||_____________this users______________|||||||||||||||||||',users)
    console.log('||||||||||||||||||_____________this users______________|||||||||||||||||||')


    if(users){
        for (const user of users) {
            
            const selectedPermissionInstances = await Permission.findAll({
                where: {
                  name: {
                    [Op.in]: selectedPermissions,
                  },
                },
            }); 
            await user.addPermissions(selectedPermissionInstances);
        }

        for (const user of users) {
            const permissionsToRemove = await user.getPermissions({
                where: {
                    name: {
                        [Op.notIn]: selectedPermissions,
                    },
                },
            });
            await user.removePermissions(permissionsToRemove);
        }
    }
}

export const setAllPermissionsByDefault= async (establishmentId)=>{
    await setPermissionsByDefault(establishmentId,'superAdmin')
    await setPermissionsByDefault(establishmentId,'admin')
    await setPermissionsByDefault(establishmentId,'editor')
}