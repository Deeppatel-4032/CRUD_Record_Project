const express = require("express");
const app = express();
const dotEnv = require("dotenv");
const path = require("path");
const bodyParser = require("body-parser");
dotEnv.config();

const Path = path.join(__dirname, "/views");
const PORT = process.env.PORT || 8000;
const router = require("./Routers/routes.js");
const db = require("./db/dbFile_Crud.js");

app.set("view engine", "ejs");
app.set("views", Path);

app.use(bodyParser.urlencoded({extended : false}));
app.use(bodyParser.json());
app.use(express.static(Path));
app.use("/public", express.static(path.join(__dirname,"/public")));

app.use("/", router);


app.listen(PORT, (err) => {

    if(!err) {
        console.log(`server is running on port http://localhost:${PORT}`);
    } 
})
