import express from 'express';
import * as controllers from '../controllers/activities.controllers.js'; 

const route = express.Router();

route.get('/cities', controllers.getCities);
route.get('/cities/:city', controllers.getActivitiesByCity);

route.get('/activities', controllers.getActivities);
route.get('/activities/new', controllers.formCreateActivity); 
route.post('/activities/new', controllers.createActivity); 

route.get('/activities/edit/:activity_id', controllers.formEditActivity); 
route.post('/activities/edit/:activity_id', controllers.editActivity); 

route.get('/activities/delete/:activity_id', controllers.formDeleteActivity); 
route.post('/activities/delete/:activity_id', controllers.deleteActivity); 

route.get('/activities/:activity_id', controllers.getActivityByID); 

export default route;
