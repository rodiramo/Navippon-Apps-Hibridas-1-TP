import express from 'express';
import path from 'path';
import activityRoute from './routes/activities.routes.js';
import activityRouteAPI from './api/routes/activities.api.routes.js';
import usersRouteAPI from './api/routes/users.api.routes.js';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express(); 

app.use(express.urlencoded({ extended: true })); 
app.use(express.static('public'));
app.use('/', express.static(path.join(__dirname, 'public')));

app.use('/css', express.static(path.join(__dirname, '/public/css'), {
  setHeaders: function (res, path, stat) {
    if (path.endsWith('.css')) {
      res.set('Content-Type', 'text/css');
    }
  }
}));
app.get('/css/styles.css', (req, res) => {
  res.type('text/css');
  res.sendFile(__dirname + '/public/css/style.css');
});

app.use(activityRoute);


app.use('/api', activityRouteAPI);


app.use('/', usersRouteAPI);


app.listen(3333, function () {
    console.log('Server is running in http://localhost:3333')
});
