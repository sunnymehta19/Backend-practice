const express = require("express");
const app = express();
const port = 3000;

const path = require("path");
const userModel = require("./models/user");
const multerConfig = require("./config/multerConfig");

app.set("view engine", "ejs");
app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(express.static(path.join(__dirname, "public")))

app.get("/", (req, res) => {
    res.render("create")
})

app.post("/create", multerConfig.single("avatar") ,async (req, res) => {
    let {username, age, email, password} = req.body;
    let createdUser = await userModel.create({
        username,
        age,
        email,
        password,
        avatar: req.file.filename
    })

    // res.send(createdUser)
    res.redirect("/profile")

})


app.get("/profile", async (req, res) => {
    let user = await userModel.find().sort({ _id: -1 });  
    res.render("profile", { user });
})

app.listen(port,  () => {
    console.log(`server is running on port ${port}`);
});
