import Client from "../models/client-model.js";
import Establishment from "../models/establishment-model.js";
import Reservation from "../models/reservation-model.js";
import User from "../models/user-model.js";
import moment  from  'moment'; 
// Define the formatDate function to include date and time
export function formatDate(date) {
    const options = {
        year: 'numeric',
        month: 'numeric',
        day: 'numeric',
    };
    return new Date(date).toLocaleDateString('fr-FR', options);
}

export function duree(endTime,startTime){
    
    const format = 'HH:mm:ss';
    console.log("----------------------|||||||||||||||||-----------------------------")
    
    console.log("start", startTime )

    console.log("end", endTime )
    

    // Parse the times into moment objects
    const startMoment = moment(startTime, format);
    const endMoment = moment(endTime, format);

    // Check if end time is before start time (spanning midnight)
    if (endMoment.isBefore(startMoment)) {
        // Add 1 day to the end time to account for spanning midnight
        endMoment.add(1, 'day');
    }

    // Calculate the time difference
    const duration = moment.duration(endMoment.diff(startMoment));

    // Get the difference in hours and minutes
    const hours = Math.floor(duration.asHours());
    const minutes = duration.minutes();

    // Format the result
    let formattedDifference = '';
    if (hours > 0) {
        formattedDifference += `${hours}h`;
    }
    if (minutes > 0) {
        formattedDifference += `${minutes}m`;
    }
    if (formattedDifference === '') {
        formattedDifference = '0m';
    }
    console.log("hoursDifference", formattedDifference )

    console.log("----------------------|||||||||||||||||-----------------------------")

    
    return formattedDifference;
}

export const getReservationsByEstablishment = async (establishmentId) => {
    try {
      const reservations = await Reservation.findAll({
        include: [
          {
            model: User,
            attributes: [], // Exclude User attributes from the result
            where: { establishmentId },
          },
          {
            model: Client,
            // attributes: ['firstName', 'lastName'], // Include the client attributes you need
          },
        ],
      });
  
      return reservations;
    } catch (error) {
      console.error('Error fetching reservations by establishment:', error);
    }
};


export const getReservations = async () => {
    try {
      const reservations = await Reservation.findAll({
        include: [
          {
            model: User,
            include: [
                {
                  model: Establishment,
                },
              ],
          },
          {
            model: Client,
            // attributes: ['firstName', 'lastName'], // Include the client attributes you need
          },
        ],
      });
  
      return reservations
    
      //   res.status(200).json(rooms);
    } catch (error) {
      console.error('Error fetching rooms by establishment:', error);
    }
};