const Discord = require("discord.js");
const util = require('../util.js');
const nekoclient = require('nekos.life');
const neko = new nekoclient();
module.exports.run = async (bot, message, args) => {
	message.delete();
	neko.sfw.nekoGif().then(nekoGif => {
		const embed = new Discord.RichEmbed()
		embed
			.setAuthor(message.author.tag, message.author.avatarURL)
			.setDescription(`${message.author}` + '會動的neko ~')
			.setColor(0xcc0000)
			.setTitle('ReiNa Bot')
			.setImage(nekoGif.url)
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
	name: "nekogif",
	description: "請求一張會動的neko圖片",
	cate: 5,
	show: true
}