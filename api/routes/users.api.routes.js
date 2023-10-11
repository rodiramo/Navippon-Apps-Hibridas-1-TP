
import express from 'express';

const route = express.Router();
import * as controllers from '../controllers/users.api.controllers.js';

route.get('/users', controllers.getUsers);
route.get('/users/new', controllers.formCreateUser); 
route.get('/users/:id', controllers.getUserWithActivities);
route.post('/users/new', controllers.createUser); 

export default route;