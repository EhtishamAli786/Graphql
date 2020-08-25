import { userroute, articleroute } from "./src/controllers";
const express = require("express");
const { graphqlHTTP } = require("express-graphql");
const dotenv = require("dotenv");
const { schema, RootQuery, context } = require("./src/schema-graphql");
// const typeDefs = require("./src/schema-graphql/schema.graphql");
const bodyParser = require("body-parser");
let mongoose = require("mongoose");
const chalk = require("chalk");
dotenv.config();
//constant
const mongodbUrl = `mongodb://${process.env.MONGODBURL}`;

let app = express();

//server configs
app.set("view engine", "ejs");
app.listen(process.env.PORT || 5000, () => {
  console.log(chalk.hex("#ffffff").bold.underline("server running: 5000"));
});

//mongo connection
mongoose.connect(mongodbUrl, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useCreateIndex: true,
});
let db = mongoose.connection;
db.on("error", () => {
  console.log(chalk.red.bold.underline("mongodb error"));
});
db.once("open", function () {
  console.log(chalk.blueBright.bold.underline("mongodb connected"));
});
//middlewares
app.use("/static", express.static("public"));
app.use(
  bodyParser.urlencoded({
    // to support URL-encoded bodies
    extended: true,
  })
);
app.use(bodyParser.json()); // to support JSON-encoded bodies
app.use(bodyParser.urlencoded({ extended: false }));

//routes
app.use(
  "/graphql",
  graphqlHTTP((req) => ({
    schema,
    graphiql: {
      headerEditorEnabled: true,
    },
    rootValue: RootQuery,
    context: () => context(req),
    introspection: true,
    pretty: true,
  }))
);
app.use("/user", userroute);
app.use("/article", articleroute);
app.get("*", function (req, res) {
  return res.status(404).render("404");
});
