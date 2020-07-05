const express = require('express');
const app = express();
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const http = require('http'); // core module
const path = require('path'); // core module
const mongoose = require('mongoose');
const session = require('express-session');
const MemoryStore = require('memorystore')(session);
const production = (process.env.NODE_ENV === "production");

mongoose.connect(process.env.DB, { useNewUrlParser: true, useUnifiedTopology: true });
mongoose.connection.once('open', () => { console.log("Connected to DB") });

// View Engine
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

app.use(bodyParser.json({ limit: '200mb' }));
app.use(bodyParser.urlencoded({ limit: '200mb', extended: false }));
app.use(cookieParser());

// Set static folder
app.use(express.static(path.join(__dirname, 'public')));

// Express session
app.use(session({
    secret: 'secret',
    name: "session" + Math.round(Math.random()*1000000),
    saveUninitialized: true,
    resave: true,
    cookie: { secure: false },
    store: new MemoryStore({ checkPeriod: 1000 * 60 * 60 * 12 })
}));

// Global variables
app.use((req, res, next) => {
    res.locals.production = production;
    res.locals.url = req.originalUrl;
    next();
});

app.use('/', require('./routes/index'));
app.use('/settings', require('./routes/settings'));

app.get("*", (req, res) => {
    res.status(404).render('error', { title: "Error 404", pagename: "error" });
});

// Set port + listen for requests
const port = process.env.PORT || 5678;
app.listen(port, () => {
    console.log('Server started on port '+ port);
    if (production) setInterval(() => { http.get(process.env.URL) }, 60000 * 25);
});
