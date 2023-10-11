function generatePage(title, content) {
    let html = `<!DOCTYPE html>
        <html lang="en">
            <head>
                <meta charset="UTF-8">
                <meta nombre="viewport" content="width=device-width, initial-scale=1.0">
                <link rel="stylesheet" href="/css/styles.css"> <!-- Update the path to your CSS file -->
                <title>${title}</title>
            </head>
            <body style="text-align:center;">
                <nav>
                    <a href="/">Home</a> | <a href="/cities">Cities</a> | <a href="/users">Users</a> 
                </nav>
                ${content}
            </body>
        </html>`;
    return html;
  }
  



  function getUsers(users) {
    let html = '';
    html += '<a class="links" href="/users/new">Add new Users</a>'
    html += '<h1 class="city">Users</h1>';
    html += '<p>Click on each user to view their profile.</p>';
    html += '<ul>';
    
    for (let i = 0; i < users.length; i++) {
        html += '<li>';
        html += `<a href="/users/${users[i]._id}">${users[i].name}</a>`;
        html += '</li>';
    }
    
    html += '</ul>';
    return generatePage('Users', html);
}



function getUserWithActivities(user) {
    let html = '';
    html += `<img src="${user.photo}" alt=${user.name}>`;
    html += `<p>${user.description}</p>`;
    html += `<h1>${user.name}</h1>`;
    html += '<h2>My Activities</h2>';
    
    if (user.activities && user.activities.length > 0) {
        html += '<ul>';
        user.activities.forEach((activity) => {
            html += `
            <li>
                <h2>${activity.activity}</h2>
                <p> ${activity.description}</p>
                <p> <a href="${activity.link}" target="_blank">${activity.link}</a></p>
                <p>Categories: ${activity.categories}</p>

                <img src="${activity.img}" alt="Activity Image">
            </li>
        `;
        });
        html += '</ul>';
    } else {
        html += '<p>No activities found.</p>';
    }

    return generatePage('User Profile', html);
}


function generateNewUserForm(activities) {
    let html = `<form action="/users/new" method="post">
      <label for="name">Name:
        <input type="text" name="name" id="name">
      </label>   
      <label for="description">Description:
        <textarea type="text" name="description" id="description"></textarea>
      </label>
      <label for="email">Email:
        <input type="text" name="email" id="email">
      </label>
      <label for="photo">Image URL:
        <input type="text" name="photo" id="photo">
      </label>
      <label for="activities">Activities:</label>
    `;
  
      activities.forEach((activity) => {
        html += `
          <input type="checkbox" id="activities" name="activities" value="${activity.id}">${activity.activity}</input>`;
      });
   
    html += `
      <button type="submit">Create</button>
    </form>`;
  
    return generatePage('Create User', html);
  }
  

  function generateListCities(cities) {
    let html = ' ';
    html += `<h1 class="city">Cities</h1>`;
    html += '<ul class="cities">';
    
    for (let i = 0; i < cities.length; i++) {
        html += '<li>';
        html += `<a href="/cities/${cities[i]}">${cities[i]}</a>`;
        html += '</li>';
    }
    
    html += '</ul>';
   html += '<p>Each city has some activities to it! click on the links to add activities and to view all of the activities.</p>';
    html +='<a class="links" href="/activities">All Activities</a><a class="links" href="/activities/new">Add New Activity</a> ' ;
 
    return generatePage('List of Cities', html);
}

function generateActivitiesByCity(city, activities) {
    let html = '';
    html += `
        <h1>Activities in ${city}</h1>
      
        <ul>
            ${activities.map(activity => `
                <li>
                    <h2>${activity.activity}</h2>
                    <p>Description: ${activity.description}</p>
                    <p>Link: <a href="${activity.link}" target="_blank">${activity.link}</a></p>
                    <p>Categories: ${activity.categories}</p>

                    <img src="${activity.img}" alt="Activity Image">
                </li>
            `).join('')}
        </ul>
    `;

    return generatePage('Activities by City', html);
}


  function generateListActivities(activities) {
      let html = '';
      html += '<ul>';
  
      for (let i = 0; i < activities.length; i++) {
          html += "<li>";
          html += `<h2>${activities[i].activity}</h2>`; 
          html += `<img src="${activities[i].img}" alt="Activity Image" />`; 
          html += "<br/>";
          html += `<a href="/activities/${activities[i]._id}">View More</a>`; 
          html += ` | <a href="/activities/edit/${activities[i]._id}">Edit</a>`; 
          html += ` | <a href="/activities/delete/${activities[i]._id}">Delete</a>`; 
          html += "</li>";
      }
  
      html += '</ul>';
      return generatePage('List of Activities', html);
  }
  
  
  function generateActivityDetail(activity) {
    let html = `<div class="container"><h1>${activity.activity}</h1>`;
    html += `<br><h2>${activity.city}</h2>`;
    html += `<br><p>Description: ${activity.description}</p>`;
    html += `<p>Link: <a href="${activity.link}" target="_blank">${activity.link}</a></p>`;
    if (Array.isArray(activity.categories)) {
      html += `<p>Categories: ${activity.categories.join(', ')}</p>`;
    } else {
      html += `<p>Categories: ${activity.categories}</p>`;
    }
    html += ` <img src="${activity.img}" alt="Activity Image">`;
    html += `</div>`;
    return generatePage('Activity Detail', html);
  }
  
  function generateNewActivityForm() {
    let html = `<form action="/activities/new" method="post">
        <label for="activity">Activity:
            <input type="text" name="activity" id="activity">
        </label>   
        <label for="description">Description:
            <textarea type="text" name="description" id="description"></textarea>
        </label>
        <label for="link">Link URL:
            <input type="text" name="link" id="link">
        </label>
        <label for="img">Image URL:
            <input type="text" name="img" id="img">
        </label>
        <label for="categories">Categories (comma-separated):
            <input type="text" name="categories" id="categories">
        </label>
        <label for="city">City:
            <input type="text" name="city" id="city">
        </label>
        <button type="submit">Create</button>
    </form>`;
    return generatePage('Create Activity', html);
  }
  
  function generateEditActivityForm(activity) {
    let html = `
    <h1>Edit Activity #${activity.activity}</h1>
    <form action="/activities/edit/${activity._id}" method="post">
        <label for="activity">Activity: 
            <input type="text" name="activity" id="activity" value="${activity.activity}">
        </label>
        <label for="description">Description: 
            <input type="text" name="description" id="description" value="${activity.description}">
        </label>
        <label for="link">Link URL:
            <input type="text" name="link" id="link" value="${activity.link}">
        </label>
        <label for="img">Image URL:
            <input type="text" name="img" id="img" value="${activity.img}">
        </label>
        <label for="categories">Categories (comma-separated):
            <input type="text" name="categories" id="categories" value="${activity.categories}">
        </label>
        <label for="city">City:
            <input type="text" name="city" id="city" value="${activity.city}">
        </label>
        <button type="submit">Edit</button>
    </form>`;
    return generatePage(`Edit Activity`, html);
  }


  function generateDeleteActivity(activity) {
    let html = `<h1>Delete Activity ${activity.activity}</h1>`;
    html += `<form action="/activities/delete/${activity._id}" method="post">`
    html += generateActivityDetail(activity);
    html += '<button type="submit">Delete</button>';
    html += "</form>";
    return html;
  }
  

  export {
    generatePage,
    getUsers,
    generateNewUserForm,
    getUserWithActivities,
    generateListCities,
    generateActivitiesByCity,
    generateListActivities,
    generateActivityDetail,
    generateNewActivityForm,
    generateEditActivityForm,
    generateDeleteActivity,
  };