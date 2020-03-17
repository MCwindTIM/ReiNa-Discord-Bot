const Discord = require("discord.js");
const util = require('../util.js');
module.exports.run = async (bot, message, args) => {
	if (rnd() >= 100) {
		message.react('654652137594290196');
	}
	if (message.channel.id === '606000578144763914' || message.channel.id === '660789237137932299' || message.channel.id === '660444044345737216') {
		if (message.attachments.size > 0) {
			let i;
			for (i = 0; i < message.attachments.size; i++) {
				if (message.attachments.every(attachIsImage)) {
					await bot.channels.get("656061968356081664").send(`${message.author.tag}:\n${message.attachments.array()[i].url}`);
				}
			}
		}
		if (!message.content) {} else {
			bot.channels.get("656061968356081664").send(`${message.author.tag}:\n${message.content}`);
		}

	} else {
		if (message.channel.id === '407171840746848260') {
			if (message.attachments.size > 0) {
				let i;
				for (i = 0; i < message.attachments.size; i++) {
					if (message.attachments.every(attachIsImage)) {
						await bot.channels.get("659756252469002280").send(`${message.author.tag}:\n${message.attachments.array()[i].url}`);
					}
				}
			}
			if (!message.content) {} else {
				bot.channels.get("659756252469002280").send(`${message.author.tag}:\n${message.content}`);
			}

		}
	}
}


module.exports.help = {
	name: "sync¿channel",
	description: "信息同步",
	cate: 7,
	show: false
}

function attachIsImage(msgAttach) {
	let url = msgAttach.url;
	if (url.indexOf("png", url.length - "png".length) !== -1) {
		return true
	}
	if (url.indexOf("jpg", url.length - "jpg".length) !== -1) {
		return true
	}
	if (url.indexOf("gif", url.length - "gif".length) !== -1) {
		return true
	}
	if (url.indexOf("jpeg", url.length - "jpeg".length) !== -1) {
		return true
	}
	return false
}

function rnd() {
	return Math.floor(Math.random() * 100) + 1;
}