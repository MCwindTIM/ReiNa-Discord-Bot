const Discord = require("discord.js");
const util = require('../util.js');
module.exports.run = async (bot, message, args) =>{
		message.delete();
		let nick = "";
		if(args[0]){nick = args.join(" ")}
		const embed = new Discord.RichEmbed()
        embed
		.setAuthor(message.author.tag, message.author.avatarURL)
		.setColor('#0099ff')
		.setTitle('ReiNa Bot')
		.setURL("https://mcwind.tk")
		.setDescription(`${message.author}, 設置暱稱為: **${nick}**`)
		.setTimestamp()
		.setFooter('ReiNa By 𝓖𝓻𝓪𝓷𝓭𝓞𝓹𝓮𝓻𝓪𝓽𝓸𝓻#9487', bot.user.avatarURL);
        try {
			message.member.setNickname(nick, 'ReiNa Bot [Set Nick Name]');
        	await util.sendDeletableMessage(message.channel, { embed }, message.author);
		}   catch (err) {
        	console.log(err);
        }
}

module.exports.help = {
	name: "nick",
	description: "設定暱稱",
	cate: 8,
	show: true
	
}