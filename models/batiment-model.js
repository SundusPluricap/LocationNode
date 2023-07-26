import { Sequelize, DataTypes } from 'sequelize';
import dotenv from 'dotenv';
dotenv.config();

const { APP_LOCALHOST: hostname, APP_PORT: port, DATABASE: db, USERNAMESQL: username, PASSWORDSQL: mdp } = process.env;

// Create a new instance of Sequelize with your MySQL connection details
const sequelize = new Sequelize(db, username, mdp, {
  host: hostname,
  dialect: 'mysql',
});

// Define the Batiment model
const Batiment = sequelize.define('Batiment', {
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  adresse: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  photo: {
    type: DataTypes.BLOB('long'),
    allowNull: true,
  },
});

// Synchronize the model with the database (create the table if it doesn't exist)
// Note: This should be done only once in the application, for example, during the initialization phase.
// You can use Sequelize migrations in a real-world application to manage database schema changes.
// (async () => {
//   try {
//     await sequelize.sync();
//     console.log('Batiment table synced successfully.');
//   } catch (error) {
//     console.error('Error syncing Batiment table:', error);
//   }
// })();

export default Batiment;
