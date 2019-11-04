const Discord = require("discord.js");
const util = require('../util.js');
module.exports.run = async (bot, message, args) =>{
	message.delete();
	let num = parseInt (args, 2);
	let dec = num.toString(10).toUpperCase();
	let hex = num.toString(16).toUpperCase();
	let bin = num.toString(2).toUpperCase();
	const embed = new Discord.RichEmbed()
			embed
			.setAuthor(message.author.tag, message.author.avatarURL)
			.setColor('#0099ff')
			.setTitle('ReiNa Bot 二進制轉換')
			.setURL("https://mcwind.tk")
			.setTimestamp()
			.setDescription("Demical =" + dec + "\nBinary =" + bin + "\nHexadecimal =" + hex)
			.setFooter('ReiNa By 一起來當馬猴燒酒吧 (>ω･* )ﾉ#9201', 'https://cdn.discordapp.com/avatars/418095978273570846/17c96d9ce6c135f7511a001e8584db17.png?size=2048');
			try {
				util.sendDeletableMessage(message.channel, { embed }, message.author);
			}   catch (err) {
				console.error(err);
			}
}

module.exports.help = {
	name: "bin"
}