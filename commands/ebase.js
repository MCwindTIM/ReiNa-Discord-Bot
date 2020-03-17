const Discord = require("discord.js");
const util = require('../util.js');
module.exports.run = async (bot, message, args) => {
	message.delete();
	let mString = args.join(" ");
	let tString = new Buffer(mString).toString('base64');
	const embed = new Discord.RichEmbed()
	embed
		.setAuthor(message.author.tag, message.author.avatarURL)
		.setColor('#0099ff')
		.setTitle('ReiNa Bot 加密信息')
		.setURL("https://mcwind.tk")
		.setTimestamp()
		.setDescription(tString)
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
	name: "ebase",
	description: "base64 加密",
	cate: 2,
	show: true
}