var mongoose = require("mongoose");
var Schema = mongoose.Schema;// 概要;计划

var obj={
	author:String,
	title:String,
	content:String,
	pathname:String
}

var model = mongoose.model("article",new Schema(obj));

module.exports = model;