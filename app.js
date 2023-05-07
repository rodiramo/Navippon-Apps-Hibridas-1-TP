import express from 'express'
import path from 'path'
import alumnoRoute from './routes/alumnos.routes.js'
import alumnoRouteAPI from './api/routes/alumnos.api.routes.js'
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express() 

app.use(express.urlencoded({ extended: true })) 
app.use(express.json()) 
app.use(express.static('public'))
app.use('/', express.static(path.join(__dirname, 'public'))) 


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


app.use(alumnoRoute)
app.use('/api', alumnoRouteAPI)

app.listen(2023, function () {
    console.log('Server is running in http://localhost:2023')
})
