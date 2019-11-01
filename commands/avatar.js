const Discord = require("discord.js");
const util = require('../util.js');
module.exports.run = async (bot, message, args) =>{
	message.delete();
	let user = message.mentions.users.first();
		if(!user) user = message.author;
			const embed = new Discord.RichEmbed()
			embed
			.setAuthor(message.author.tag, message.author.avatarURL)
			.setDescription(`${message.author}` + "Senpai, 這是<@" + user.id + ">的使用者頭像。")
			.setColor(0xcc0000)
			.setTitle('ReiNa Bot Discord頭像')
			.setURL(user.avatarURL)
			.setImage(user.avatarURL)
			.setTimestamp()
			.setFooter('ReiNa By 一起來當馬猴燒酒吧 (>ω･* )ﾉ#9201', 'https://cdn.discordapp.com/avatars/418095978273570846/17c96d9ce6c135f7511a001e8584db17.png?size=2048');
			try {
				await util.sendDeletableMessage(message.channel, { embed }, message.author);
			}   catch (err) {
				console.error(err);
			}
}

module.exports.help = {
	name: "avatar"
}