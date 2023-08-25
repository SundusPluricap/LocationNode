import { Sequelize, DataTypes } from 'sequelize';
import dotenv from 'dotenv';
import Product from './product-model.js'; // Import the Product model
import Room from './room-model.js'; // Import the Batiment model

dotenv.config();

const { APP_LOCALHOST: hostname, APP_PORT: port, DATABASE: db, USERNAMESQL: username, PASSWORDSQL: mdp } = process.env;

// Create a new instance of Sequelize with MySQL connection details
const sequelize = new Sequelize(db, username, mdp, {
  host: hostname,
  dialect: 'mysql',
});

const Image = sequelize.define('Image', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    name: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    type: {
        type: DataTypes.ENUM('product', 'batiment'),
        allowNull: false,
    },
    product_id: {
        type: DataTypes.INTEGER,
        allowNull: true,
    },
    room_id: {
        type: DataTypes.INTEGER,
        allowNull: true,
    },
    description: {
        type: DataTypes.TEXT,
        allowNull: true,
    }
});

// Define the associations
Image.belongsTo(Product, { foreignKey: 'product_id', as: 'product' , onDelete: 'CASCADE' });
Image.belongsTo(Room, { foreignKey: 'room_id', as: 'room' , onDelete: 'CASCADE' });

export default Image;
