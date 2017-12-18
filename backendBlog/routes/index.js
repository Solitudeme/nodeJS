var express = require('express');
var router = express.Router();
var Article = require("../model/article");//考虑路径

/* GET home page. */
router.get('/', function(req, res, next) {
	//console.log(req.session.goodInfo)
	if(req.session.goodInfo){
		Article.find({
			author:req.session.goodInfo["name"]
		}).then(result=>{
			 res.render('index', { title: 'Express',name:req.cookies["currentUser"],list:result});
		})
	}else{
		res.redirect("/login");//重新登录
	}
 
});

router.get("/logout",function(req,res){
	req.session.destroy(()=>{
		res.redirect("/login");
	})
})

module.exports = router;
