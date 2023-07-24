// import express from "express";
// // import {index, dashboard} from "../controllers/auth.controller.js";
// // import {login,verifyLogin} from "../controllers/login.controller.js";
// import {verifyToken} from "../controllers/admin.controller.js";

// // import {checkUserExistence, isAuthenticated} from "../middlewares/auth-middleware.js"

// const router = express.Router();


// router.get('/', verifyToken, (req, res) => {
//     // Assuming the role is stored as req.user.role
//     if (req.user.role === 'admin') {
//       // Admin-specific dashboard logic
//       res.render('admin-dashboard');
//     } else {
//       // Non-admin users will be redirected to another dashboard
//       res.render('regular-dashboard');
//     }
// });

// export default router;