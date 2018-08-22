import userController from '../controllers/user-controller';
import express from 'express';

// Creating router instance of express router 
const router = express.Router();

/* 
   Creating Routes for List Api
*/

// user sign-up route
router.route('/register')
   .post(
      userController.register
   );

// user login route 
router.route('/login')
   .post(
      userController.login
   );


module.exports = router;