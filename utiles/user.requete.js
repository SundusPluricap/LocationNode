import User from "../models/user-model.js";
import Establishment from "../models/establishment-model.js";

export async function getUsersOrderedByEstablishmentId() {
    try {
      const users = await User.findAll({
        include: [{ model: Establishment }],
        order: [
          [Establishment, 'id', 'ASC'], // Order by establishment ID in ascending order
        ],
      });
      return users;
    } catch (error) {
      console.error('Error retrieving users:', error);
      throw error;
    }
}