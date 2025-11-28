const mongoose = require("mongoose");

// Local DB (for development)
mongoose.connect("mongodb://127.0.0.1:27017/userData");

// Cloud DB (for Render deployment)
// mongoose.connect(process.env.MONGO_URL);

const userSchema = mongoose.Schema({
    username: String,
    email: String,
    image: String
});

module.exports = mongoose.model("user", userSchema);
