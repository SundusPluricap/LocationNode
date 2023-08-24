import Client from "../models/client-model.js";
import User from "../models/user-model.js";
import Establishment from "../models/establishment-model.js";
import Batiment from "../models/batiment-model.js";

export const batimentFindAllInEstablishment = async (user) => {
    
    const batiments = await Batiment.findAll({ 
        where: { establishmentId : user.establishmentId  },
        include: {
            model: Establishment
        },
    });
  
    return batiments
}

export const batimentFindAll = async (user) => {
    const batiments = await Batiment.findAll({
        include: {
            model: Establishment,
            attributes: ['id','name'],
        },
        order: [
            ['establishmentId', 'ASC'], // 'ASC' for ascending order, 'DESC' for descending
        ],
    });

    return batiments;
};
