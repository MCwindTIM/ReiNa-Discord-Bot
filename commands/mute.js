const Discord = require("discord.js");
const util = require('../util.js');
module.exports.run = async (bot, message, args) =>{
		message.delete();
		if(!message.mentions.users.first()){
			const embed = new Discord.RichEmbed()
			embed
			.setAuthor(message.author.tag, message.author.avatarURL)
			.setColor('#0099ff')
			.setTitle('ReiNa Bot')
			.setURL("https://mcwind.tk")
			.setDescription(`${message.author}, 參數不足: **用戶**`)
			.setTimestamp()
			.setFooter('ReiNa By 𝓖𝓻𝓪𝓷𝓭𝓞𝓹𝓮𝓻𝓪𝓽𝓸𝓻#9487', bot.user.avatarURL);
			try {
				await util.sendDeletableMessage(message.channel, { embed }, message.author);
			}   catch (err) {
				console.error(err);
			}
			return;
		}
		if(!args[1]){
			const embed = new Discord.RichEmbed()
			embed
			.setAuthor(message.author.tag, message.author.avatarURL)
			.setColor('#0099ff')
			.setTitle('ReiNa Bot')
			.setURL("https://mcwind.tk")
			.setDescription(`${message.author}, 參數不足: **true/false**`)
			.setTimestamp()
			.setFooter('ReiNa By 𝓖𝓻𝓪𝓷𝓭𝓞𝓹𝓮𝓻𝓪𝓽𝓸𝓻#9487', bot.user.avatarURL);
			try {
				await util.sendDeletableMessage(message.channel, { embed }, message.author);
			}   catch (err) {
				console.error(err);
			}
			return;
		}
		if(message.member.hasPermission('MUTE_MEMBERS') === true){
			if(message.guild.member(message.mentions.users.first()).voiceChannel){
				if(args[1] === 'true'){
					message.guild.member(message.mentions.users.first()).setMute(true, "`ReiNa Bot [Mute] by ${message.author.tag}");
					const embed = new Discord.RichEmbed()
					embed
					.setAuthor(message.author.tag, message.author.avatarURL)
					.setColor('#0099ff')
					.setTitle('ReiNa Bot [Mute]')
					.setURL("https://mcwind.tk")
					.setDescription(`${message.author}, 已經禁言用戶 ${message.mentions.users.first()}`)
					.setTimestamp()
					.setFooter('ReiNa By 𝓖𝓻𝓪𝓷𝓭𝓞𝓹𝓮𝓻𝓪𝓽𝓸𝓻#9487', bot.user.avatarURL);
					try {
						await util.sendDeletableMessage(message.channel, { embed }, message.author);
					}   catch (err) {
						console.error(err);
					}
				}
				if(args[1] === 'false'){
					message.guild.member(message.mentions.users.first()).setMute(false, `ReiNa Bot [Unmute] by ${message.author.tag}`);
					const embed = new Discord.RichEmbed()
					embed
					.setAuthor(message.author.tag, message.author.avatarURL)
					.setColor('#0099ff')
					.setTitle('ReiNa Bot [Unmute]')
					.setURL("https://mcwind.tk")
					.setDescription(`${message.author}, 已經解除禁言用戶 ${message.mentions.users.first()}`)
					.setTimestamp()
					.setFooter('ReiNa By 𝓖𝓻𝓪𝓷𝓭𝓞𝓹𝓮𝓻𝓪𝓽𝓸𝓻#9487', bot.user.avatarURL);
					try {
						await util.sendDeletableMessage(message.channel, { embed }, message.author);
					}   catch (err) {
						console.error(err);
					}
				}
			}else{
				const embed = new Discord.RichEmbed()
				embed
				.setAuthor(message.author.tag, message.author.avatarURL)
				.setColor('#0099ff')
				.setTitle('ReiNa Bot')
				.setURL("https://mcwind.tk")
				.setDescription(`${message.author}, 用戶 ${message.mentions.users.first()} 不在語音頻道中!`)
				.setTimestamp()
				.setFooter('ReiNa By 𝓖𝓻𝓪𝓷𝓭𝓞𝓹𝓮𝓻𝓪𝓽𝓸𝓻#9487', bot.user.avatarURL);
				try {
					await util.sendDeletableMessage(message.channel, { embed }, message.author);
				}   catch (err) {
					console.error(err);
				}
			}
		}else{
			const embed = new Discord.RichEmbed()
			embed
			.setAuthor(message.author.tag, message.author.avatarURL)
			.setColor('#0099ff')
			.setTitle('ReiNa Bot')
			.setURL("https://mcwind.tk")
			.setDescription(`${message.author}, 你沒有權限 **MUTE_MEMBERS**, 所以不可以靜音該用戶!`)
			.setTimestamp()
			.setFooter('ReiNa By 𝓖𝓻𝓪𝓷𝓭𝓞𝓹𝓮𝓻𝓪𝓽𝓸𝓻#9487', bot.user.avatarURL);
			try {
				await util.sendDeletableMessage(message.channel, { embed }, message.author);
			}   catch (err) {
				console.error(err);
			}
		}
}

module.exports.help = {
	name: "mute",
	description: "靜音用戶",
	cate: 8,
	show: true
	
}