// associations.js

import User from './user-model.js';
import Permission from './permission-model.js';

User.belongsToMany(Permission, { through: 'user_has_permission', foreignKey: 'user_id', onDelete: 'CASCADE'  });
Permission.belongsToMany(User, { through: 'user_has_permission', foreignKey: 'permission_id', onDelete: 'CASCADE'  });
