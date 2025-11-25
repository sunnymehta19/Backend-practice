const express = require("express")
const path = require("path");
const userModel = require("./models/user")
const app = express();
const port = 3000;


app.set("view engine", "ejs");
app.use(express.json());
app.use(express.urlencoded({ extended: true}))
app.use(express.static(path.join(__dirname, "public")))



app.get("/", (req, res) => {
    res.render("index")
    
});

app.get("/read", async (req, res) => {
    let username = await userModel.find()
    res.render("read", {username})

});

app.post("/create", async (req, res) => {
   let {username, email, image} = req.body;
   let createdUser = await userModel.create({
    username,
    email,
    image
   })
   res.redirect("/read")

});

app.get("/delete/:id", async (req, res) => {
    let username = await userModel.findOneAndDelete({_id: req.params.id});
    res.redirect("/read")

});

app.get("/edit/:id", async (req, res) => {
    let editUser = await userModel.findOne({_id: req.params.id})
    res.render("update", {editUser})
});

app.post("/update/:id", async (req, res) => {
    let {username, email, image} = req.body;
    let updatedUser = await userModel.findOneAndUpdate({_id: req.params.id}, {username, email, image})
    res.redirect("/read")
});

app.listen(port, () => {
    console.log(`Server is running at port ${port}`);
})