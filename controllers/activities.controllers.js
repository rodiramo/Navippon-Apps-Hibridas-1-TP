import * as view from '../views/activities.view.js'
import * as service from '../services/activities.service.js'

async function getActivities(req, res) {
    const activities = await service.getActivities({ deleted: { $ne: true } });
    res.send(view.generateListActivities(activities));
}


async function getCities(req, res) {
    const cities = await service.getCities();              
    res.send(view.generateListCities(cities));
}

async function getActivitiesByCity(req, res) {
    const city = req.params.city;

    try {
        const activitiesInCity = await service.getActivitiesByCity(city);

        const html = view.generateActivitiesByCity(city, activitiesInCity);

        res.send(html);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}


async function getActivityByID(req, res) {
    const id = req.params.activity_id;

    service.getActivityByID(id)
        .then((activity) => {
            if (activity) {
                res.send(view.generateActivityDetail(activity));
            } else {
                res.send(view.generatePage('Activity Detail', `<h1>Activity not found.</h1>`));
            }
        })
        .catch((error) => {
            sendErrorResponse(res, `Error getting the activity: ${error.message}`);
        });
};

function formCreateActivity(req, res) {
    res.send(view.generateNewActivityForm());
}

async function createActivity(req, res) {
    const activity = {
        activity: req.body.activity,
        description: req.body.description,
        link: req.body.link,
        img: req.body.img,
        categories: req.body.categories,
        city: req.body.city,
    };

    service
        .createActivity(activity)
        .then((insertedId) => {
            res.send(
                view.generatePage(
                    "Activity Created",
                    `<p>Activity ${activity.activity} created with ID ${insertedId}</p>`
                )
            );
        })
        .catch((error) => res.send(view.generatePage("Error", `<p> ${error}</p>`)));
}

function formEditActivity(req, res) {
    const id = req.params.activity_id;
    service.getActivityByID(id).then((activity) => {
        if (activity) {
            res.send(view.generateEditActivityForm(activity));
        } else {
            res.send(
                view.generatePage(
                    "Activity Not Found",
                    "<h1>Activity not found</h1>"
                )
            );
        }
    });
}

async function editActivity(req, res) {
    const id = req.params.activity_id;
    const activity = {
        activity: req.body.activity,
        description: req.body.description,
        link: req.body.link,
        img: req.body.img,
        categories: req.body.img,
        city: req.body.city,
    };

    service.editActivity(id, activity)
        .then((editedActivity) => {
            if (editedActivity) {
                res.send(view.generatePage("Activity Modified", `<h2>Activity edited successfully</h2>`));
            } else {
                res.send(view.generatePage("Unable to Edit Activity", "<h1>Unable to edit activity</h1>"));
            }
        })
        .catch((error) => sendErrorResponse(res, `Error editing the activity: ${error.message}`));
}

const formDeleteActivity = (req, res) => {
    const id = req.params.activity_id;

    service.getActivityByID(id).then((activity) => {
        if (activity) {
            res.send(view.generateDeleteActivity(activity));
        } else {
            res.send(
                view.generatePage(
                    "Activity Not Found",
                    "<h1>Activity not found</h1>"
                )
            );
        }
    });
}

const deleteActivity = (req, res) => {
    const id = req.params.activity_id;

    service.deleteActivity(id)
        .then((deletedActivity) => {
            if (deletedActivity) {
                res.send(view.generatePage("Activity Deleted", `<h2>Activity successfully deleted</h2>`));
            } else {
                res.send(view.generatePage("Deletion Failed", "<h1>Deletion failed</h1>"));
            }
        });
}

export {
    getActivities,
    getActivitiesByCity,
    getCities,
    getActivityByID,
    formCreateActivity,
    createActivity,
    formEditActivity,
    editActivity,
    formDeleteActivity,
    deleteActivity,
};
