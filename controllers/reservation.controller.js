import Client from '../models/client-model.js'; // Assuming you have imported the Client model correctly

export const showAll = (req, res) => {
    const user = req.session.user
    res.render('reservations/index',{user});
}


export const create = async (req, res) => {
  try {
    // Get the user ID from the session (assuming it's stored in req.session.userId)
    
    const user = req.session.user
    const createdBy = user.id;
    // Fetch clients whose userId matches the ID saved in the session
    const clients = await Client.findAll({ where: { createdBy } });

    const errorMessage = req.session.errorMessage;
    // Clear the error message from the session
    delete req.session.errorMessage;

    // Render the register view with the list of clients and the error message as local variables
    res.render('reservations/createReservation', { clients, errorMessage });
  } catch (error) {
    // Handle any error that might occur during fetching the clients
    console.error('Error fetching clients:', error);
    res.status(500).send('An error occurred while fetching clients.');
  }
};


export const getProfile = (req, res) => {
  const user = req.session.user
  res.render('reservations/index',{user});
}

export const getEdit = (req, res) => {
  const user = req.session.user
  res.render('reservations/index',{user});
}

export const postEdit = (req, res) => {
  const user = req.session.user
  res.render('reservations/index',{user});
}

export const deleteButton = (req, res) => {
  const user = req.session.user
  res.render('reservations/index',{user});
}
