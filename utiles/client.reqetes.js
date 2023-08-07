import Client from "../models/client-model.js";
import User from "../models/user-model.js";
import Establishment from "../models/establishment-model.js";

export const clientFindOne = async (id) => {
    const client = await Client.findOne({ 
        include: {
          model: User,
          attributes: ['id','firstName', 'lastName', 'role', 'establishmentId'],
          include: {
            model: Establishment, // Assuming you have an Establishment model associated with User
            attributes: ['name'], // Include the establishment's name attribute
          },
        }, 
        where: { id }
    });
  
    return client
}