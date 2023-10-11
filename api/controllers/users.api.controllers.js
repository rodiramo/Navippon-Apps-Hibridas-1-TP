import * as userService from '../../services/users.service.js';
import * as activitiesService from '../../services/activities.service.js';
import * as view from '../../views/activities.view.js'


function getUsers(req, res) {
  const filter = req.query;

  userService.getUsers(filter)
      .then(function (users) {      
        res.send(view.getUsers(users));
      });
}



function formCreateUser(req, res) {
  activitiesService.getActivities().then(function (activities) {
    res.send(view.generateNewUserForm(activities));
  })
  .catch(function (error) {
    res.status(500).json({ error: error.message });
  });
}


const createUser = async (req, res) => {
  const { name, photo, description, activities } = req.body;
  const user = { name, photo, description, activities  };

  userService
  .createUser(user)
  .then((insertedId) => {
      res.send(
          view.generatePage(
              "User Created",
              `<p>User ${user.name} created with ID ${insertedId}</p>`
          )
      );
  })
  .catch((error) => res.send(view.generatePage("Error", `<p> ${error}</p>`)));
};

function getUserById(req, res) {
  const id = req.params.id; 

  userService.getUserById(id)
      .then(function (user) {
          if (user) {
            res.send(view.getUserById(user));
          } else {
              res.status(404).json({ error: { message: `user not Found ID: ${id}` } });
          }
      });
}

async function getUserWithActivities(req, res) {
  const userId = req.params.id; 
  const { activityId } = req.body;

  try {
    const user = await userService.getUserWithActivities(userId, activityId);

    if (user) {
      res.send(view.getUserWithActivities(user));
    } else {
      res.status(404).json({ error: { message: `User not found with ID: ${userId}`} });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}


export {
  createUser,
  getUsers,
  getUserById,
  getUserWithActivities,
  formCreateUser
};
