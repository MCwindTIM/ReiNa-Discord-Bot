const Discord = require("discord.js");
const util = require('../util.js');
module.exports.run = async (bot, message, args) => {
	message.delete();
	const embed = new Discord.RichEmbed()
	embed
		.setAuthor(message.author.tag, message.author.avatarURL)
		.setTitle('[GAY Youtube]')
		.setURL("https://www.youtube.com/watch?v=OODugXYqyy4&feature=youtu.be")
		.setColor('#0099ff')
		.setTimestamp()
		.setDescription("這是" + `${message.author}` + " 的請求")
		.setFooter('ReiNa By 𝓖𝓻𝓪𝓷𝓭𝓞𝓹𝓮𝓻𝓪𝓽𝓸𝓻#9487', bot.user.avatarURL);
	try {
		util.sendDeletableMessage(message.channel, {
			embed
		}, message.author);
	} catch (err) {
		console.error(err);
	}
}

module.exports.help = {
	name: "mememe",
	description: "沒用的指令",
	cate: 4,
	show: true
}