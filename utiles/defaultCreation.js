import Establishment from "../models/establishment-model.js";
import User from "../models/user-model.js";
import {setAllPermissionsByDefault} from '../utiles/role.js'

export const createEstablishmentWithDefaults = async (req) => {
    const { name, adresse, codePostal, country, SIRET, bankName, IBAN, BIC } = req.body;
    const newEstablishment = await Establishment.create({
        name,
        adresse,
        codePostal,
        country,
        SIRET,
        bankName,
        IBAN,
        BIC,
    });

    let establishmentId = newEstablishment.id
    const newUserA = await User.create({
        firstName : "firstName user A",
        lastName: "lastName user A",
        email: "email1.default@gmail.com",
        password: "default password", // Store the hashed password in the database
        role: "superAdmin",
        establishmentId
    });
    const newUserB = await User.create({
        firstName : "firstName user B",
        lastName: "lastName user B",
        email: "email2.default@gmail.com",
        password: "default password", // Store the hashed password in the database
        role: "admin",
        establishmentId
    });
    const newUser = await User.create({
        firstName : "firstName user C",
        lastName: "lastName user C",
        email: "email3.default@gmail.com",
        password: "default password", // Store the hashed password in the database
        role: "editor",
        establishmentId
    });

    await setAllPermissionsByDefault(newEstablishment.id)

}