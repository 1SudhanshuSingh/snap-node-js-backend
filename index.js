const express = require("express"),
  app = express(),
  cors = require("cors"),
  path = require('path'),
  bodyParser = require("body-parser");

// routers import
const categoriesRouter = require("./routes/categories");
const productsRouter = require("./routes/products");
const homePage = require("./routes/homePage");

// use the modules
app.use(cors());
app.use(
  bodyParser.urlencoded({
    extended: false,
  })
);
app.use(bodyParser.json());

// use routers
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));
app.use("/categories", categoriesRouter);
app.use("/products", productsRouter);
app.use("/homePage", homePage);

// make server object that contain port property and the value for our server.
const server = {
  port: 4040,
};

// starting the server
app.listen(server.port, () =>
  console.log(`Server started, listening port: ${server.port}`)
);
