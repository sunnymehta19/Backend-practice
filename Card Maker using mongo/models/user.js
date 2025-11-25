const mongoose = require("mongoose");
// mongoose.connect("mongodb://127.0.0.1:27017/userData");
MONGO_URL = mongodb+srv://username:password@cluster0.xxxx.mongodb.net/userData
mongoose.connect(process.env.MONGO_URL);


const userSchema = mongoose.Schema({
    username: String,
    email: String,
    image: String
});


module.exports = mongoose.model("user", userSchema)