const Discord = require("discord.js");
const util = require('../util.js');
const flip = require('upsidedown');
module.exports.run = async (bot, message, args) => {
	message.delete();
	let botmessage = args.join(" ");
	botmessage = botmessage.split("").reverse().join("");
	const embed = new Discord.RichEmbed()
	embed
		.setAuthor(message.author.tag, message.author.avatarURL)
		.setColor('#0099ff')
		.setTitle('ReiNa Bot')
		.setURL("https://mcwind.tk")
		.setTimestamp()
		.setDescription(botmessage)
		.setFooter('ReiNa By 𝓖𝓻𝓪𝓷𝓭𝓞𝓹𝓮𝓻𝓪𝓽𝓸𝓻#9487', bot.user.avatarURL);
	try {
		util.sendDeletableMessage(message.channel, {
			embed
		}, message.author);
	} catch (e) {}
	return;
}

module.exports.help = {
	name: "reverse",
	description: "反轉字串",
	cate: 6,
	show: true
}