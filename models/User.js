const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const userSchema = new Schema({
  name: {type:String, required:true, minlength:6},
  img: {type:String, default:"http://yofuiaegb.com/wp-content/uploads/2012/10/Mr-Propper.jpg"},
  edad: {type:Number, min: 0, max: 99},
  aficiones:[String],
  favorite: Schema.Types.ObjectId
});

const User = mongoose.model("User", userSchema);

module.exports = User;
