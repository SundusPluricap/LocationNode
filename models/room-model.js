import { Sequelize, DataTypes } from 'sequelize';
import dotenv from 'dotenv';
import Batiment from "./batiment-model.js";

dotenv.config();

const { APP_LOCALHOST: hostname, APP_PORT: port, DATABASE: db, USERNAMESQL: username, PASSWORDSQL: mdp } = process.env;


const sequelize = new Sequelize(db, username, mdp, {
    host: hostname,
    dialect: 'mysql',
  });

// Define the Product model
const Room = sequelize.define('rooms', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  capacity: {
    type: DataTypes.INTEGER,
    defaultValue: null,
  },
  price: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  TVA: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  batiment_id: {
    type: DataTypes.INTEGER,
    references: {
      model: 'batiments',
      key: 'id',
    },
  },
  createdAt: {
    type: DataTypes.DATE,
    defaultValue: null,
  },
  updatedAt: {
    type: DataTypes.DATE,
    defaultValue: null,
  },
  
  
});

// Define the association between Product and Batiment
Room.belongsTo(Batiment, { foreignKey: 'batiment_id' , onDelete: 'CASCADE' });

// Define the association between Product and Establishment
// Product.belongsTo(Establishment, { foreignKey: 'establishment_id' , onDelete: 'CASCADE' });

export default Room;