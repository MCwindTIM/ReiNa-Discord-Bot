const Discord = require("discord.js");
const util = require('../util.js');
module.exports.run = async (bot, message, args) => {
	message.delete();
	const embed = new Discord.RichEmbed()
	embed
		.setAuthor(message.author.tag, message.author.avatarURL)
		.setColor('#0099ff')
		.setTitle('ReiNa Bot')
		.setTimestamp()
		.setURL("https://mcwind.tk")
		.setDescription(`${message.author}` + "表示")
		.setImage("https://duckduckdoc.tk/wp-content/uploads/googledrive/beautiful.png")
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
	name: "bb",
	description: "沒什麼用途的指令",
	cate: 1,
	show: true
}