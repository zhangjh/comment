const express = require('express');
const router = express.Router();

const mongooseClientInstance = require('../conf/config');
const sendmail = require('../conf/sendmail');

let collection = "infos";

let inputCheck = function(json) {
	let pattern = /\<script\>/i;
	for(let key in json) {
		if(pattern.test(json[key])) {
			return false;
		}	
	}
	return true;
};

router.post('/save',function(req, res, next){
	let data = {};
	let name = req.body.name;
	let email = req.body.email;
	let website = req.body.website;
	let content = req.body.content;
	let url = req.body.url;
	let replyId = req.body.replyId;
	data = {
		name: name,
		email: email,
		website: website,
		content: content,
		url: url,
		replyId: replyId
	};
	if(!name){
		return res.send({
			status: false,
			errorMsg: "大侠请留名"
		});
	}
	if(!email){
		return res.send({
			status: false,
			errorMsg: "留个邮箱吧，一有回复我就提醒你"
		});
	}
	if(!content){
		return res.send({
			status: false,
			errorMsg: "大侠，逗我呢？一个字不留咋提交啊"
		});
	}

	if(!inputCheck(data)) {
		return res.send({
			status: false,
			errorMsg: "大侠，请不要对小站做破坏哦~"
		});
	}

	mongooseClientInstance.find(collection,{name: name, url: url},function(ret){
		if(ret.status){
			if(ret.data.length){
				let createTime = ret.data[0].gmtCreate;
				if(Math.abs(createTime - new Date()) < 10000){
					return res.send({
						status: false,
						errorMsg: "大侠手速惊人，练过弹指神通？"
					});
				}else {
					mongooseClientInstance.insert(collection,data,function(ret){
						return res.send(ret);
					});
				}
			}else {
				mongooseClientInstance.insert(collection,data,function(ret){
					return res.send(ret);
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
	}
	if(name){
		data = {name: name};
	}
	/*mongooseClientInstance.remove(collection,data,function(ret){
		res.send(ret);
	});*/
	mongooseClientInstance.update(collection,data,{isDeleted: true},{multi: true},function(ret){
		return res.send(ret);
	});
});

router.get('/find',function(req, res, next){
	mongooseClientInstance.find(collection,Object.assign(req.query,{isDeleted: false}),function(ret){
		return res.send(ret);
	});
});

router.get('/queryList',function(req, res, next){
	let url = req.query.url;
	mongooseClientInstance.find(collection,{isDeleted: false,url: url},function(ret){
		if(ret.status){
			ret.total = ret.data.length;
		}
		return res.send(ret);
	});
});

router.get('/queryAll',function(req, res, next){
	mongooseClientInstance.find(collection,{},function(ret){
		return res.send(ret);
	});
});

router.get('/update',function (req, res, next) {
	mongooseClientInstance.update(collection,req.query.condition,req.query.data,{},function (ret) {
		return res.send(ret);
    });
});

router.post('/sendMail',function (req, res, next) {
	let mail = req.body.mail;
	let url = req.body.url;
	let subject = req.body.subject;
	let isReply = req.body.replyId;
	let urlPre = "http://zhangjh.me";
	let html = "收到评论：<a href='" + urlPre + url + "'>点击查看</a>";
	if(isReply){
		html = "你的评论收到了回复，<a href='" + urlPre + url + "'>点击查看</a>";
	}

	sendmail(mail,subject,"",html,(err,info) => {
		if(err){
			return res.json({
				status: false,
				errorMsg: err
			});
		}
		return res.json({
			status: true
		});
	});
});

module.exports = router;
