const Discord = require("discord.js");
const util = require('../util.js');
const nekoclient = require('nekos.life');
const neko = new nekoclient();
module.exports.run = async (bot, message, args) => {
	message.delete();
	neko.sfw.hug().then(hug => {
		const embed = new Discord.RichEmbed()
		embed
			.setAuthor(message.author.tag, message.author.avatarURL)
			.setDescription(`${message.author}` + ' 給你一個大大的擁抱。')
			.setColor(0xcc0000)
			.setTitle('ReiNa Bot')
			.setImage(hug.url)
			.setTimestamp()
			.setFooter('ReiNa By 𝓖𝓻𝓪𝓷𝓭𝓞𝓹𝓮𝓻𝓪𝓽𝓸𝓻#9487', bot.user.avatarURL);
		try {
			util.sendDeletableMessage(message.channel, {
				embed
			}, message.author);
		} catch (err) {
			console.error(err);
		}
		return;
	});
}

module.exports.help = {
	name: "hug",
	description: "發送圖片表示你的心情",
	cate: 3,
	show: true
}