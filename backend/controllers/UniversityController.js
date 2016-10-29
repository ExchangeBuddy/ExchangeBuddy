var models = require('../models');

exports.getAllUniversities = function(req, res){
    models.University.findAll({
    	attributes: ['id', 'name', 'city', 'logoImageUrl', 'emailDomains', 'terms']
    }).then(function(universities){
        res.json(universities);
    }).catch(function(err) {
        resError(res, err);
    });
};

exports.createUniversity = function(req, res) {
    models.University.create({
        name: req.body.name,
        logoImageUrl: req.body.logoImageUrl,
        emailDomains: JSON.stringify(req.body.emailDomains)
    }).then(function(university) {
        res.json(university);
    }).catch(function(err) {
        resError(res, err);
    });
};

exports.getUniversity = function(req, res){
    models.University.findOne({
        where: {
            id: req.params.id
        }
    }).then(function(university){
        res.json(university);
    }).catch(function(err) {
        resError(res, err);
    });
};

exports.updateExchange = function(req, res){
    console.log(models.User.Instance.prototype);
    models.sequelize.Promise.all([
        models.User.findOne({
            where: {
                id: req.body.userId
            }
        }),

        models.University.findOne({
            where: {
                id: universityId
            }
        })
    ]).spread(function(user, university){
        console.log(models.User.Instance.prototype);
        res.send('ha');
    }).catch(function(err){
        resError(res, err);
    })
}

function resError(res, err) {
    return res.status(500).json({
        message: err.message
    });
}
