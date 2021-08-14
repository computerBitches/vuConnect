
// var express = require("express");
// var router  = express.Router();

// var Notification = require("../models/notification");
// import auth from '../../middleware/auth';

// // view all notifications
// router.get('/notifications', auth, async function(req, res) {
//   try {
//     let user = await User.findById(req.user._id).populate({
//       path: 'notifications',
//       options: { sort: { "_id": -1 } }
//     }).exec();
//     let allNotifications = user.notifications;
//     res.render('notifications/index', { allNotifications });
//   } catch(err) {
//     req.flash('error', err.message);
//     res.redirect('back');
//   }
// });

// // handle notification
// router.get('/notifications/:id', auth, async function(req, res) {
//   try {
//     let notification = await Notification.findById(req.params.id);
//     notification.isRead = true;
//     notification.save();
//     res.redirect(`/campgrounds/${notification.campgroundId}`);
//   } catch(err) {
//     req.flash('error', err.message);
//     res.redirect('back');
//   }
// });

