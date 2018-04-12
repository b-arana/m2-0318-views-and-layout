const express = require("express");
const hbs = require("hbs");
const mongoose = require("mongoose");
const User = require("./models/User");

const app = express();

const dbURL = "mongodb://localhost/exampleApp0318";

mongoose.connect(dbURL).then(() => {
  console.log(`Connected to DB: ${dbURL}`);
});

/* EXPRESS CONFIG */
const publicDir = __dirname + "/public";
console.log(`Public dir is: ${publicDir}`);
app.use(express.static(publicDir));

app.set("views", __dirname + "/views");
app.set("view engine", "hbs");
hbs.registerPartials(__dirname + "/views/partials");

/* EXPRESS ROUTES */

let miticIronhackers = [
  {
    name: "Manu del Pino",
    img: "http://yofuiaegb.com/wp-content/uploads/2012/10/Mr-Propper.jpg"
  },
  {
    name: "Beltran Senior",
    img:
      "https://www.elconfidencialdigital.com/Vicente-Valles_ECDIMA20160614_0007_21.jpg"
  }
];

app.get("/", (req, res) => {
  let susana = new User({ name: "Susana", edad: 18 });

  // User.create({ name: "Susana", edad: 18 }, (err, obj) => {

  // })
  susana.save(err => {
    if (err) {
      console.log(err);
      res.send(err.message);
    } else {
      console.log("Welcome susana");

      User.find({}).exec((err, objs) => {
        if (err) {
          console.log(err);
          res.render("error_page", data);
        } else {
          console.log("LAS SUSANAS");
          console.log(objs);
          const data = {
            name: "Pepe",
            bootcamp: "IronHack WebDev",
            homer:
              "https://vignette.wikia.nocookie.net/youtubepoop/images/e/eb/Homer-simpson_WOOHOO.jpg/revision/latest?cb=20130120090101",
            cities: [
              "Miami",
              "Madrid",
              "Barcelona",
              "Paris",
              "México",
              "Berlín"
            ],
            susanas: objs,
            miticIronhackers,
            title: "PAGINA HOME",
            boton: {
              btnColor: "#336699",
              texto: "PAGINA 2",
              destino: "/page2"
            }
          };
          res.render("index", data);
        }
      });
    }
  });
});

app.get("/page2", (req, res) => {
  const data = {
    name: "Pepe",
    bootcamp: "IronHack WebDev",
    homer:
      "https://vignette.wikia.nocookie.net/youtubepoop/images/e/eb/Homer-simpson_WOOHOO.jpg/revision/latest?cb=20130120090101",
    cities: ["Miami", "Madrid", "Barcelona", "Paris", "México", "Berlín"],
    miticIronhackers,
    address: {
      street: "Your heart",
      number: 87
    },
    boton: {
      btnColor: "green",
      texto: "HOME",
      destino: "/"
    },
    title: "PAGINA 2"
  };
  res.render("index2", data);
});

app.get("/hello", (req, res) => {
  let name = "Pepe";
  res.send(`
      <!doctype html>
      <html>
        <head>
          <link rel="stylesheet" href="stylesheets/style.css">
        </head>
        <body>
          This is my second ${name}
        </body>
      </html>
    `);
});

const port = 3000;
app.listen(port, () => console.log(`Listening on port ${port}`));
