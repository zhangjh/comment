var express = require('express');
var router = express.Router();

var mongooseClientInstance = require('../conf/config');

let collection = "infos";

router.get('/save',function(req, res, next){
	/*let data = {
		name: "zhangjh",
		email: "zhangjh@qq.com",
		website: "http://zhangjh.me",
		content: "test: 第一条评论",
		url: "/"
	};*/
	let data = {};
	let name = req.query.name;
	let email = req.query.email;
	let website = req.query.website;
	let content = req.query.content;
	let url = req.query.url;
	let replyId = req.query.replyId;
	data = {
		name: name,
		email: email,
		website: website,
		content: content,
		url: url,
		replyId: replyId
	};
	if(!name){
		res.send({
			status: false,
			errorMsg: "大侠请留名"
		});
	}
	if(!email){
		res.send({
			status: false,
			errorMsg: "留个邮箱吧，一有回复我就提醒你"
		});
	}
	if(!content){
		res.send({
			status: false,
			errorMsg: "大侠，逗我呢？一个字不留咋提交啊"
		});
	}

	mongooseClientInstance.find(collection,{name: name, url: url},function(ret){
		if(ret.status){
			if(ret.data.length){
				let createTime = ret.data[0].gmtCreate;
				if(Math.abs(createTime - new Date()) < 10000){
					res.send({
						status: false,
						errorMsg: "大侠手速惊人，练过弹指神通？"
					});
				}
			}else {
				mongooseClientInstance.insert(collection,data,function(ret){
					res.send(ret);
				});	
			}
		}
	},{gmtCreate: -1});
});

router.get('/del',function(req, res, next){
	let data = {};
	let url = req.query.url;
	let name = req.query.name;
	if(url){
		data = {url: url};
	};
	if(name){
		data = {name: name};
	}
	/*mongooseClientInstance.remove(collection,data,function(ret){
		res.send(ret);
	});*/
	mongooseClientInstance.update(collection,data,{isDeleted: true},{multi: true},function(ret){
		res.send(ret);
	});
});

router.get('/find',function(req, res, next){
	let data = {};
	let url = req.query.url;
	let name = req.query.name;
	if(url){
		data = {url: url};
	}
	if(name){
		data = {name: name};
	}
	mongooseClientInstance.find(collection,data,function(ret){
		res.send(ret);
	});
});

router.get('/queryList',function(req, res, next){
	let url = req.query.url;
	mongooseClientInstance.find(collection,{isDeleted: false,url: url},function(ret){
		if(ret.status){
			ret.total = ret.data.length;
		}
		res.send(ret);
	});
});

router.get('/queryAll',function(req, res, next){
	mongooseClientInstance.find(collection,{},function(ret){
		res.send(ret);
	});
});

module.exports = router;
