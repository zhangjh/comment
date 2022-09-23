// mongoose config
const mongooseClient = require('mongoose-client');
const mongooseClientInstance = new mongooseClient({
	DB_IP: 'localhost',
	DB_PORT: '20172',
	DB_NAME: 'comment',
	schema: {
		infos: {
			name: { type: String },
			email: { type: String },
			website: { type: String },
			content: { type: String },
			url: { type: String },
			replyId: { type: String },
			isDeleted: { type: Boolean, default: false},
			gmtCreate: { type: Date, default: Date.now},
			readed: { type: Boolean, default: false}
		}
	}
});

module.exports = mongooseClientInstance;
