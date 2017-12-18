var express = require('express');
var router = express.Router();
var User = require("../model/user");
var md5 = require('md5');
/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('register', { title: '注册页面' });
});

router.post('/',function(req,res){
	///console.log(req.body);//{ username: '111', email: '1171317712@qq.com', password: '123' }
	//这边就要引入数据库了 查询数据库里面是否有重名
	//通过User.find判断与数据库里面注册好的是否有重名
	User.find({
		email:req.body.email
	}).then(result=>{
	//未注册返回一个空数组 注册过的话[ { _id: 59f989208187ac712cdedd62,name: 'oh',email: 'oh@163.com',__v: 0 }]返回数组
		//console.log(result);
		if(result.length==0){
			User.create({
			name:req.body.username,
			email:req.body.email,
			password:md5(req.body.password)
		})
		}else{
			//刷新这个页面
			res.render('register', { title: '注册页面' });
		}
	}).then(result=>{
			res.redirect('/');
		})



	
})

module.exports = router;