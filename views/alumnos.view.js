function generatePage(nombre, content) {

  let html = `<!DOCTYPE html>
      <html>
          <head>
              <meta charset="UTF-8"><meta nombre="viewport" content="width=device-width, initial-scale=1.0">
              <link rel="stylesheet" href="../css/styles.css">`

  html += `<nombre>${nombre}</nombre></head><body>`

  html += '<h1>Alumno Library</h1>'

  html += '<nav><a href="/">Home</a> | <a href="/alumnos">Alumnos</a> | <a href="/alumnos/new">Add New alumno</a></nav>'

  html += content;

  html += '</body></html>'

  return html;
}


function generateListAlumnos(alumnos) {
  let html = '<ul>';
  for (let alumno of alumnos) {
      html += `<li>${alumno.nombre} ${alumno.apellido} <br> <a href="/alumnos/${alumno._id}">View More</a> <a href="/alumnos/${alumno._id}/edit">Edit</a> <a href="/alumnos/${alumno._id}/delete">Delete</a></li>`
  }
  html += '</ul>'

  return generatePage('Lista de Alumnos', html)
}

function generateAlumnoDetail(alumno) {
  let html = `<div class="container"><h1>${alumno.nombre} ${alumno.apellido}</h1>`
  html += `<br><p>${alumno.año}</p>`
  html += `<p>Legajo: ${alumno.legajo}</p></div>`

  return generatePage('Alumno Detail', html)
}

function generateNewAlumnoForm() {
  let html = `<form action="/alumnos/new" method="post">
      <label for="nombre">Nombre:
          <input type="text" name="nombre" id="nombre">
      </label>   
      <label for="apellido">Apellido:
      <input type="text" name="apellido" id="apellido">
      </label>
      <label for="año">Año:
          <input type="text" name="año" id="año">
      </label>
      <label for="legajo">Legajo:
          <input type="number" name="legajo" id="legajo">
      </label>
      <button type="submit">Create</button>
  </form>`

  return generatePage('Create alumno', html)
}

function generateEditAlumnoForm(alumno) {
  let html = `
  <h1>Editar Alumno #${alumno.legajo}</h1>

  <form action="/alumnos/${alumno._id}/edit" method="post">
      <label for="nombre">Nombre: 
          <input type="text" name="nombre" id="nombre" value="${alumno.nombre}">
      </label>
      <label for="apellido">Apellido: 
          <input type="text" name="apellido" id="apellido" value="${alumno.apellido}">
      </label>
      <label for="año">año:
          <input type="text" name="año" id="año" value="${alumno.año}">
      </label>
      <label for="legajo">Legajo:
          <input type="number" name="legajo" id="legajo" value="${alumno.legajo}" >
      </label>
      <button type="submit">Edit</button>
  </form>`

  return generatePage(`Editar alumno #${alumno.legajo}`, html)
}

function generateDeleteAlumno(alumno) {
  let html = `<h1>${alumno.nombre}</h1>`
  html += `<p>${alumno.año}</p>`
  html += `<p>Legajo: $${alumno.legajo}</p>`

  html += `<form action="/alumnos/${alumno._id}/delete" method="post">
      <button type="submit">Delete</button>
  </form>`

  return generatePage('Delete alumno', html)
}


export {
  generatePage,
  generateListAlumnos,
  generateAlumnoDetail,
  generateNewAlumnoForm,
  generateEditAlumnoForm,
  generateDeleteAlumno
}
