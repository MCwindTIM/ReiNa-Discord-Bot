const Discord = require("discord.js");
const util = require('../util.js');
module.exports.run = async (bot, message, args) =>{
	message.delete();
	let mString = args.join(" ");
	let data = new Buffer(mString, 'base64').toString();
	const embed = new Discord.RichEmbed()
			embed
			.setAuthor(message.author.tag, message.author.avatarURL)
			.setColor('#0099ff')
			.setTitle('ReiNa Bot 解密信息')
			.setURL("https://mcwind.tk")
			.setDescription(data)
			.setTimestamp()
			.setFooter('ReiNa By 𝓖𝓻𝓪𝓷𝓭𝓞𝓹𝓮𝓻𝓪𝓽𝓸𝓻#9487', 'https://cdn.discordapp.com/avatars/418095978273570846/17c96d9ce6c135f7511a001e8584db17.png?size=2048');
			try {
				util.sendDeletableMessage(message.channel, { embed }, message.author);
			}   catch (err) {
				console.error(err);
			}
}

module.exports.help = {
	name: "dbase",
	description: "base64 解密",
	cate: 2,
	show: true
}