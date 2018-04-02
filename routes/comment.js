var express = require('express');
var router = express.Router();
var mongooseClient = require('mongoose-client');

// mongoose config
var mongooseClientInstance = new mongooseClient({
	DB_IP: 'xxxxx',
	DB_PORT: 'xxxx',
	DB_NAME: 'comment',
	schema: {
		infos: {
			name: { type: String },
			email: { type: String },
			website: { type: String },
			content: { type: String },
			url: { type: String },
			isDeleted: { type: Boolean, default: false},
			gmtCreate: { type: Date, default: Date.now}
		}
	}
});

let collection = "infos";

router.get('/save',function(req, res, next){
	let data = {
		name: "zhangjh",
		email: "zhangjh@qq.com",
		website: "http://zhangjh.me",
		content: "test: 第一条评论",
		url: "/"
	};
	mongooseClientInstance.insert(collection,data,function(err,res){
		if(err){
			res.send({
				status: false,
				errMsg: err
			});
		}else {
			res.send({
				status: true
			});
		}
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
