var mongoose = require("mongoose");
var Schema = mongoose.Schema;// 概要;计划

var obj={
	name:String,
	email:String,
	password:String
}

var model = mongoose.model("user",new Schema(obj));

module.exports = model;