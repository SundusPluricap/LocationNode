import Batiment from '../models/batiment-model.js';
import Room from '../models/room-model.js';
import Establishment from '../models/establishment-model.js';

export const getRoomsByEstablishment = async (establishmentId) => {
    try {
      const rooms = await Room.findAll({
        include: [
          {
            model: Batiment,
            // as: 'batiment', // Use the correct alias 'batiment'
            where: { establishmentId },
            attributes: [], // Exclude batiment attributes from the result
            include: [
              {
                model: Establishment,
                // as: 'establishment',
                attributes: [], // Exclude establishment attributes from the result
                where: { id: establishmentId },
              },
            ],
          },
        ],
      });

      return rooms
  
    //   res.status(200).json(rooms);
    } catch (error) {
      console.error('Error fetching rooms by establishment:', error);
    }
};
  
export const getAllRooms = async () => {
    try {
      const rooms = await Room.findAll({
        include: [
          {
            model: Batiment,
            include: [
              {
                model: Establishment,
              },
            ],
          },
        ],
      });

      return rooms
  
    //   res.status(200).json(rooms);
    } catch (error) {
      console.error('Error fetching rooms by establishment:', error);
    }
};
