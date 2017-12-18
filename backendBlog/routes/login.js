var express = require('express');
var router = express.Router();
var User = require("../model/user");
var md5 = require("md5");
/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('login', { title: '登录页面',isShow:false});
});

router.post("/",function(req,res){
	//session有三种存贮方案（文件和数据库中）
	//这个是储存在数据库里面的(只要数据库重启session就会失效)
	//console.log(req.body);
	//与数据库里面进行匹配
	User.find({
		email:req.body.email,
		password:md5(req.body.password)
	}).then(result=>{
		//console.log(result);
		//未注册过的显示是空，注册过的会返回一个数组
		if(result.length==0){
			//如果是未注册过的就重新渲染页面
			res.render('login',{title:'登录页面',isShow:true});
		}else{
			//console.log(result[0])
			req.session.goodInfo =result[0];
			//console.log(req.session.goodInfo['name']);
			res.cookie("currentUser",result[0].name);
			//console.log(res.cookie("currentUser",result[0].name))
			res.redirect("/");
		}
	})

})

module.exports = router;