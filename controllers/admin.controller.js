// import jwt from 'jsonwebtoken';
// import { promisify } from 'util';

// export const verifyToken = async (req, res, next) => {
//   try {
//     const token = req.headers.authorization.split(' ')[1]; // Assuming you're sending the token in the Authorization header as 'Bearer <token>'
//     if (!token) {
//       return res.status(401).json({ message: 'No token provided.' });
//     }

//     // Verify the token
//     const decoded = await promisify(jwt.verify)(token, SESSION_SECRET);
//     req.user = decoded; // Store the decoded token payload in the request object for later use
//     next();
//   } catch (error) {
//     return res.status(403).json({ message: 'Invalid or expired token.' });
//   }
// };

// // export default verifyToken;