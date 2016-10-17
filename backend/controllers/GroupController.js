var models = require('../models');
var User = models.User;
var Group = models.Group;
var ChatMsg = models.ChatMessage;
var University = models.University;

// Get all groups current user belongs to
exports.getGroupIndex = function(req, res) {
	User.findOne({
		where: {
			id: req.body.userId
		}
	}).then(function(user){
		user.getGroup().then(function(groups){
			models.sequelize.Promise.all(
				groups.map(group => group.countUser())
			).spread(function(c0, c1, c2){
				groups[0].dataValues.number = c0;
				groups[1].dataValues.number = c1;
				groups[2].dataValues.number = c2;
				res.send(groups);
			})
		})
	}).catch(function(err) {
		res.status(500).json({
			message: err.message
		});
	});

};

// Show group if user belongs to it
exports.getGroup = function(req, res) {
    Group.findOne({
        where: {
            id: req.params.id
        },
        attributes: ['id', 'name'],
        include: [{
        	attributes: ['id', 'name', 'profilePictureUrl'],
        	model: User,
        	as: 'user',
			include: [{
				attributes: ['name', 'id'],
				model: University
			}]
        	// through: {
			// 	where: {
			// 		userId: req.user.id
			// 	}
			// }
        }, {
        	attributes: ['message'],
        	model: ChatMsg
        }]
    }).then(function(group) {
        res.json(group);
    }).catch(function(err) {
        resError(res, err);
    });
};

exports.getMembers = function(req, res){
	Group.findOne({
		where: {
			id: req.body.GroupId
		}
	}).then(function(group){
		group.getUser().then(function(users){
			res.json(
				users.map(user => ({
					id: user.id,
					name: user.name,
					profilePictureUrl: user.profilePictureUrl
				}))
			);
		})
	})
}

function resError(res, err) {
    return res.status(500).json({
        message: err.message
    });
}
