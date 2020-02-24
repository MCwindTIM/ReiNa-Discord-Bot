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
			.setFooter('ReiNa By 𝓖𝓻𝓪𝓷𝓭𝓞𝓹𝓮𝓻𝓪𝓽𝓸𝓻#9487', bot.user.avatarURL);
			try {
				await util.sendDeletableMessage(message.channel, { embed }, message.author);
			}   catch (err) {
				console.error(err);
			}
}

module.exports.help = {
	name: "avatar",
	description: "獲得用戶頭像鏈接",
	cate: 1,
	show: true
	
}