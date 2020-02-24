const Discord = require("discord.js");
const util = require('../util.js');
module.exports.run = async (bot, message, args) =>{
	message.delete();
	let num = parseInt (args, 16);
	let dec = num.toString(10).toUpperCase();
	let bin = num.toString(2).toUpperCase();
	let hex = num.toString(16).toUpperCase();
	const embed = new Discord.RichEmbed()
			embed
			.setAuthor(message.author.tag, message.author.avatarURL)
			.setColor('#0099ff')
			.setTitle('ReiNa Bot 十六進制轉換')
			.setURL("https://mcwind.tk")
			.setTimestamp()
			.setDescription("Demical =" + dec + "\nBinary =" + bin + "\nHexadecimal =" + hex)
			.setFooter('ReiNa By 𝓖𝓻𝓪𝓷𝓭𝓞𝓹𝓮𝓻𝓪𝓽𝓸𝓻#9487', bot.user.avatarURL);
			try {
				util.sendDeletableMessage(message.channel, { embed }, message.author);
			}   catch (err) {
				console.error(err);
			}
}

module.exports.help = {
	name: "hex",
	description: "十六進制數值轉換",
	cate: 3,
	show: true
}