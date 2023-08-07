import Client from "../models/client-model.js";
import User from "../models/user-model.js";
import Establishment from "../models/establishment-model.js";
import Batiment from "../models/batiment-model.js";

export const batimentFindAll = async (user) => {
    
    const batiment = await Batiment.findAll({ 
        where: { establishmentId : user.establishmentId  }
    });
  
    return batiment
}