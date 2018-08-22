import express from 'express';
import ensureAuth from '../helpers/ensure-authenticated';
import listController from '../controllers/list-controller';

// creating router instance of express router
const router = express.Router();

/* 
 * Routes to handle request for lists  
 */
router.route('/lists')
    .get(
        ensureAuth.authenticate,
        listController.getLists
    )

router.route('/lists')
    .post(
        ensureAuth.authenticate,
        listController.addLists
    )
    
router.route('/lists/:id')
    .get(
        ensureAuth.authenticate,
        listController.getSingleList
    )
    .put(
        ensureAuth.authenticate,
        listController.updateLists
    )
    .delete(
        ensureAuth.authenticate,
        listController.deleteLists
    ) 


module.exports = router;