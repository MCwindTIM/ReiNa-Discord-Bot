const Discord = require("discord.js");
const util = require('../util.js');
module.exports.run = async (bot, message, args) => {
	message.delete();
	let botmessage = args.join(" ");
	const embed = new Discord.RichEmbed()
	embed
		.setAuthor(message.author.tag, message.author.avatarURL)
		.setColor('#0099ff')
		.setTitle('ReiNa Bot')
		.setURL("https://mcwind.tk")
		.setDescription(botmessage)
		.setTimestamp()
		.setFooter('ReiNa By 𝓖𝓻𝓪𝓷𝓭𝓞𝓹𝓮𝓻𝓪𝓽𝓸𝓻#9487', bot.user.avatarURL);
	try {
		await util.sendDeletableMessage(message.channel, {
			embed
		}, message.author);
	} catch (err) {
		console.error(err);
	}
}

module.exports.help = {
	name: "say",
	description: "我會跟著你再說一次的",
	cate: 6,
	show: true
}