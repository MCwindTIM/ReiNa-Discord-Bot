const Discord = require("discord.js");
const util = require('../util.js');
module.exports.run = async (bot, message, args) => {
	message.delete();
	let tString = Buffer.from(args, 'utf8');
	let tvar = tString.toString('binary');
	let output = tvar.toString('utf-8');
	const embed = new Discord.RichEmbed()
	embed
		.setAuthor(message.author.tag, message.author.avatarURL)
		.setColor('#0099ff')
		.setTitle('ReiNa Bot Alt Code ')
		.setURL("https://mcwind.tk")
		.setDescription(output)
		.setTimestamp()
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
	name: "alt",
	description: "尋找alt碼對應的字符",
	cate: 1,
	show: true

}