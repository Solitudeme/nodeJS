var express = require('express');
var router = express.Router();
var Article = require("../model/article");
/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('article', { title: '发表页面',isShow:false,isNew:true});
});

//---配置multer设置存储路径以及文件名
var multer = require('multer');

//控制上传文件
var storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'public/photo')
  },
  filename: function (req, file, cb) {
    cb(null, file.fieldname + '-' + Date.now())
  }
})

var upload = multer({ storage: storage })


router.post('/',upload.single('photoname'),function(req,res){
	console.log(req.file);

	//req.session.user=Article;
	Article.create({
		author:req.cookies["currentUser"],
		title:req.body.title,
		content:req.body.content,
		pathname:`/photo/${req.file.filename}`
	}).then(result=>{
		res.redirect('/');
	})
})


router.get('/fixed',function(req,res){
	Article.find({
		_id:req.query.id
	}).then(result=>{
		res.render('article', { title: '更新页面',isShow:false,isNew:false,info:result[0]});
	})
})
//更新的方法 ppt上有
router.post('/fixed',upload.single('photoname'),function(req,res){
	Article.findByIdAndUpdate(req.body.id,{$set:{title:req.body.title,content:req.body.content,pathname:`/photo/${req.file.filename}`}}).then(result=>{
		res.redirect('/');
	})
})

//删除的方法
router.get('/detail',function(req,res){
	Article.findByIdAndRemove(req.query.id).then(result=>{
		res.redirect('/');
	})
})


module.exports = router;