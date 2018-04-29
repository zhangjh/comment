const sendmail = require('sendmail')({
    logger: {
        debug: console.log,
        info: console.info,
        warn: console.warn,
        error: console.error
    },
    silent: false,
    smtpPort: 25,
    smtpHost: "smtp.mxhichina.com"
});