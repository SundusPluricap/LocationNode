import { Sequelize, DataTypes } from 'sequelize';
import dotenv from 'dotenv';
import Batiment from "./batiment-model.js";
import Establishment from "./establishment-model.js";
dotenv.config();

const { APP_LOCALHOST: hostname, APP_PORT: port, DATABASE: db, USERNAMESQL: username, PASSWORDSQL: mdp } = process.env;


const sequelize = new Sequelize(db, username, mdp, {
    host: hostname,
    dialect: 'mysql',
  });

// Define the Product model
const Product = sequelize.define('products', {
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
    type: DataTypes.STRING,
    defaultValue: null,
  },
  price: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  type: {
    type: DataTypes.STRING,
    allowNull: false,
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
  establishment_id: {
    type: DataTypes.INTEGER,
    references: {
      model: 'establishments',
      key: 'id',
    },
  },
  
});

// Define the association between Product and Batiment
Product.belongsTo(Batiment, { foreignKey: 'batiment_id' });

// Define the association between Product and Establishment
Product.belongsTo(Establishment, { foreignKey: 'establishment_id' });

export default Product;