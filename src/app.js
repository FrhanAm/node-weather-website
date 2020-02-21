const path = require("path")
const express = require("express");
const hbs = require("hbs");
const geocode = require("./utils/geocode");
const forecast = require("./utils/forecast");

const app = express();

// Define paths for Express config
const publicDirPath = path.join(__dirname, "../public");
const viewsPath = path.join(__dirname, "../templates/views");
const partialsPath = path.join(__dirname, "../templates/partials");

// Setup handlebars engin and views location
app.set("view engine", "hbs");
app.set("views", viewsPath);
hbs.registerPartials(partialsPath);

// Setup static directory to serve
app.use(express.static(publicDirPath));

app.get("/", (req, res) => {
    res.render("index", {
        title: "Weather",
        name: "Farhan Am"
    });
});

app.get("/about", (req, res) => {
    res.render("about", {
        title: "About",
        name: "Farhan Am"
    });
});

app.get("/help", (req, res) => {
    res.render("help", {
        title: "Help",
        name: "Farhan Am",
        helpText: "This is som helpful text!"
    })
})

app.get("/weather", (req, res) => {
    if(!req.query.address) {
        return res.send({
            error: "You must provide an address"
        });
    }
    geocode(req.query.address, (error, {latitude, longtitude, location} = {}) => {
        if(error) {
            return res.send({ error });
        }
        forecast(latitude, longtitude, (error, forecastData) => {
            if(error) {
                return res.send({ error });
            }

            res.send({
                forecast: forecastData,
                location,
                address: req.query.address
            })
        })
    })
});

app.get("/help/*", (req, res) => {
    res.render("404", {
        title: "404",
        errorMessage: "Help article not found",
        name: "Farhan"
    });
});

app.get("*", (req, res) => {
    res.render("404", {
        title: "404",
        errorMessage: "Page not found",
        name: "Farhan"
    })
});

app.listen(3000, () => {
    console.log("Server is up on port 3000.");
});
