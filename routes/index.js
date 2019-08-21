var express = require('express');
var router = express.Router();
var galleries = require('../config/galleries');
var nodemailer = require('nodemailer');
var models = require('../models/models');

router.get('/', (req, res) => {
	res.render('index', { title: null, pagename: "home" })
});

router.get('/photo', (req, res) => {
	models.gallery.find((err, docs) => {
		res.render('photo', { title: "Photography", pagename: "photo", docs })
	})
});

router.get('/design', (req, res) => {
	models.design.find((err, docs) => {
		res.render('design', { title: "Designs", pagename: "design", docs })
	})
});

router.get('/info', (req, res) => {
	models.info_text.find((err, docs) => {
		res.render('info', { title: "Info", pagename: "info", docs })
	})
});

router.get('/---settings---', (req, res) => {
	var allDocs = [];
	models.gallery.find((err, docs) => {
		allDocs = allDocs.concat(docs);

		models.design.find((err, docs) => {
			allDocs = allDocs.concat(docs);

			models.info_text.find((err, docs) => {
				allDocs = allDocs.concat(docs);
				res.render('settings', { title: "Settings", pagename: "settings", allDocs })
			})
		})
	})
});

router.post('/galleries', (req, res) => {
	res.send(galleries);
});

router.post('/save', (req, res) => {
	var newGallery = new models.gallery({
		gallery: req.body.gallery,
		label: req.body.label
	});

	newGallery.save(err => {
		if (err) return res.send(err);
		res.redirect(req.get("referer"));
	})
});

router.post('/send/message', (req, res) => {
	let transporter = nodemailer.createTransport({
		service: 'gmail',
		port: 465,
		secure: true,
		auth: {
			user: 'nznodemailer@gmail.com',
			pass: 'nodemailer246'
		},
		tls: {
			rejectUnauthorized: true
		}
	});

	let mailOptions = {
		from: { name: req.body.name, address: req.body.email },
		to: 'nathanzenga@gmail.com',
		subject: req.body.subject,
		text: `From ${req.body.name} (${req.body.email}):\n\n${req.body.message}`
	};

	transporter.sendMail(mailOptions, (err, info) => {
		if (err) return console.log(err), res.send("Could not send message");
		console.log("The message was sent!");
		console.log(info);
		console.log('Preview URL: %s', nodemailer.getTestMessageUrl(info));
		res.send('Message sent');
	});
});

module.exports = router;