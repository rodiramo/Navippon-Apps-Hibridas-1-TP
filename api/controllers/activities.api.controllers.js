import * as service from '../../services/activities.service.js';

function getActivities(req, res) {
    const filter = req.query;

    service.getActivities(filter)
        .then(function (activities) {
            res.status(200).json(activities);
        });
}

function getActivityByID(req, res) {
    const id = req.params.id; 

    service.getActivityByID(id)
        .then(function (activity) {
            if (activity) {
                res.status(200).json(activity);
            } else {
                res.status(404).json({ error: { message: `Activity not Found ID: ${id}` } });
            }
        });
}

function createActivity(req, res) {
    const activity = {
        title: req.body.activity,
        description: req.body.description,
        id: req.body.id,
        publishedYear: req.body.publishedYear,
        img: req.body.img,
        link: req.body.link,
        categories: req.body.categories,
        city: req.body.city,
    };

    service.createActivity(activity)
        .then(function (activity) {
            res.status(201).json(activity);
        })
        .catch(function (err) {
            res.status(400).json({ error: { message: err.message } });
        });
}

function replaceActivity(req, res) {
    let id = req.params.id;

    let activity = {
        title: req.body.activity,
        description: req.body.description,
        publishedYear: req.body.publishedYear,
        id: req.body.id,
        img: req.body.img,
        link: req.body.link,
        categories: req.body.categories,
        city: req.body.city,
    };

    service.replaceActivity(id, activity)
        .then(function (activity) {
            if (activity) {
                res.status(200).json(activity);
            } else {
                res.status(404).json({ error: { message: `Activity not Found ID: ${id}` } });
            }
        })
        .catch(function (err) {
            res.status(400).json({ error: { message: err.message } });
        });
}

function updateActivity(req, res) {
    let id = req.params.id;

    let activity = {};

    if (req.body.activity) {
        activity.title = req.body.activity;
    }
    if (req.body.description) {
        activity.description = req.body.description;
    }
    if (req.body.publishedYear) {
        activity.publishedYear = req.body.publishedYear;
    }
    if (req.body.id) {
        activity.id = req.body.id;
    }
    if (req.body.img) {
        activity.img = req.body.img;
    }
    if (req.body.link) {
        activity.link = req.body.link;
    }
    if (req.body.categories) {
        activity.categories = req.body.categories;
    }
    if (req.body.city) {
        activity.city = req.body.city;
    }

    service.editActivity(id, activity)
        .then(function (activity) {
            if (activity) {
                res.status(200).json(activity);
            } else {
                res.status(404).json({ error: { message: `Activity not Found ID: ${id}` } });
            }
        })
        .catch(function (err) {
            res.status(400).json({ error: { message: err.message } });
        });
}

function deleteActivity(req, res) {
    let id = req.params.id;

    service.deleteActivity(id)
        .then(function (activity) {
            if (activity) {
                res.status(200).json(activity);
            } else {
                res.status(404).json({ error: { message: `Activity not Found ID: ${id}` } });
            }
        })
        .catch(function (err) {
            res.status(400).json({ error: { message: err.message } });
        });
}

export {
    getActivities,
    createActivity,
    getActivityByID,
    replaceActivity,
    updateActivity,
    deleteActivity,
};
