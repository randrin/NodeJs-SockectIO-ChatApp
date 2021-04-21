const express = require("express");
const bodyParser = require("body-parser");
const ejs = require("ejs");
const http = require("http");
const container = require("./container");


container.resolve(function (users) {
    const app = setUpExpress();

    function setUpExpress() {
        const app = express();
        const server = http.createServer(app);
        const port = "3000";
        server.listen(port, function () {
            console.log(`Server started at http://localhost:${port}`);
        });
        ConfigureExpress(app);

        //Setup router
        const router = require("express-promise-router")();
        users.SetRouting(router);

        app.use(router);
    }

    function ConfigureExpress(app) {
        app.use(express.static("public"));
        app.set("view engine", "ejs");
        app.use(bodyParser.json());
        app.use(bodyParser.urlencoded({ extended: true }));
    }

});