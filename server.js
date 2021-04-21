const express = require("express");
const bodyParser = require("body-parser");
const ejs = require("ejs");
const http = require("http");
const cookieParser = require("cookie-parser");
const validator = require("express-validator");
const session = require("express-session");
const MongoStore = require("connect-mongo")(session);
const mongoose = require("mongoose");
const flash = require("connect-flash");
const passport = require("passport")
const dotenv = require("dotenv");
const container = require("./container");
const config = require("./config");
dotenv.config();


container.resolve(function (users) {

    mongoose.Promise = global.Promise;
    mongoose.connect(config.MONGODB_URL, { 
        useNewUrlParser: true, 
        useUnifiedTopology: true, 
        useCreateIndex: true })
        .then(() => {
            console.log("connected to mongodb");
        })
        .catch((error) => {
            console.log("Error connected to mongodb:", error.reason);
        });

    const app = setUpExpress();

    function setUpExpress() {
        const app = express();
        const server = http.createServer(app);
        server.listen(config.PORT, function () {
            console.log(`Server started at http://localhost:${config.PORT}`);
        });
        ConfigureExpress(app);

        //Setup router
        const router = require("express-promise-router")();
        users.SetRouting(router);

        app.use(router);
    }

    function ConfigureExpress(app) {
        app.use(express.static("public"));
        app.use(cookieParser());
        app.set("view engine", "ejs");
        app.use(bodyParser.json());
        app.use(bodyParser.urlencoded({ extended: true }));

        app.use(validator());
        app.use(session({
            secret: config.JWT_SECRET,
            resave: true,
            saveUninitialized: true,
            store: new MongoStore({ mongooseConnection: mongoose.connection })
        }));

        app.use(flash());

        app.use(passport.initialize());
        app.use(passport.session());
    }
});