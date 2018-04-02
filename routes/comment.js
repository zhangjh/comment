var express = require('express');
var router = express.Router();

var mongooseClientInstance = require('../conf/config');

let collection = "infos";

router.get('/save',function(req, res, next){
	let data = {
		name: "zhangjh",
		email: "zhangjh@qq.com",
		website: "http://zhangjh.me",
		content: "test: 第一条评论",
		url: "/"
	};
	mongooseClientInstance.insert(collection,data,function(ret){
		res.send(ret);
	});
});

router.get('/del',function(req, res, next){
	res.send("comment delete");
});

router.get('/find',function(req, res, next){
	res.send("comment find one");
});

router.get('/queryList',function(req, res, next){
	res.send("comment find list");
});

module.exports = router;
