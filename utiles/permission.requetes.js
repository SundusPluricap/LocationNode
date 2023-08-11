import Permission from '../models/permission-model.js';

export const permissionsList = async () => {
    const permissions = await Permission.findAll({
        
    });
    return permissions;
}

