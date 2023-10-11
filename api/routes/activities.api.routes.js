import express from 'express';
import * as activitiesController from '../controllers/activities.api.controllers.js';

const router = express.Router();

router.get('/activities', activitiesController.getActivities);
router.post('/activities', activitiesController.createActivity);

router.get('/activities/:id', activitiesController.getActivityByID);
router.put('/activities/:id', activitiesController.replaceActivity);
router.patch('/activities/:id', activitiesController.updateActivity);
router.delete('/activities/:id', activitiesController.deleteActivity);

export default router;
