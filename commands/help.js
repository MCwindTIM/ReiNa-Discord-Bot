const Discord = require("discord.js");
const util = require('../util.js');
module.exports.run = async (bot, message, args) => {
	message.delete();
	if (!args) {
		let embed = new Discord.RichEmbed()
		embed
			.setAuthor(message.author.tag, message.author.avatarURL)
			.setColor('#0099ff')
			.setTitle('ReiNa Bot')
			.setURL("https://mcwind.tk")
			.setDescription(`${message.author}, senpai~ 請輸入頁數或分類\n\n頁數: *1-8*\n\n分類: *music*`)
			.setFooter('ReiNa By 𝓖𝓻𝓪𝓷𝓭𝓞𝓹𝓮𝓻𝓪𝓽𝓸𝓻#9487', bot.user.avatarURL)
			.setTimestamp();
		try {
			await util.sendDeletableMessage(message.channel, {
				embed
			}, message.author);
		} catch (err) {
			console.error(err);
		}
		return
	}
	if (args[0] === "music") {
		let embed = new Discord.RichEmbed()
		embed
			.setAuthor(message.author.tag, message.author.avatarURL)
			.setColor('#0099ff')
			.setTitle('ReiNa Bot')
			.setURL("https://mcwind.tk")
			.setDescription("下面有可以使用的指令哦 請 " + `${message.author}` + ` 耐心看完 最後更新2020/01/26\n\n頁數: *${args[0]}*`)
			.setFooter('ReiNa By 𝓖𝓻𝓪𝓷𝓭𝓞𝓹𝓮𝓻𝓪𝓽𝓸𝓻#9487', bot.user.avatarURL)
			.setTimestamp();
		try {
			embed.addField(`play`, `播放youtube音樂`);
			embed.addField(`stop`, `停止播放音樂`);
			embed.addField(`skip`, `跳過現正播放的音樂`);
			embed.addField(`volume`, `調整音量 預設音量為: *1*`);
			embed.addField(`shuffle`, `隨機排列播放隊列`);
			embed.addField(`playnow`, `立刻播放清單最後一首音樂`);
			embed.addField(`loop`, `打開/關閉 單曲循環播放功能`);
			embed.addField(`np`, `顯示現正播放的音樂資料`);
			embed.addField(`queue`, `顯示播放隊列`);
			embed.addField(`pause`, `暫停播放音樂`);
			embed.addField(`resume`, `繼續播放音樂`);
			embed.addField(`db`, `使用分貝控制音樂大小`);
			await util.sendDeletableMessage(message.channel, {
				embed
			}, message.author);
		} catch (err) {
			console.error(err);
		}
		return
	}
	if (args[0] > 0 && args[0] <= 8) {
		let embed = new Discord.RichEmbed()
		embed
			.setAuthor(message.author.tag, message.author.avatarURL)
			.setColor('#0099ff')
			.setTitle('ReiNa Bot')
			.setURL("https://mcwind.tk")
			.setDescription("下面有可以使用的指令哦 請 " + `${message.author}` + ` 耐心看完 最後更新2020/01/26\n\n頁數: *${args[0]}* , 請輸入*rn!help ${parseInt(args[0])+1}* 瀏覽下一頁`)
			.setFooter('ReiNa By 𝓖𝓻𝓪𝓷𝓭𝓞𝓹𝓮𝓻𝓪𝓽𝓸𝓻#9487', bot.user.avatarURL)
			.setTimestamp();
		try {
			bot.commands.forEach(commands => {
				if (commands.help.show) {
					if (commands.help.cate === parseInt(args[0])) {
						embed.addField(`${commands.help.name}`, `${commands.help.description}`)
					}
				} else {}
			});
			await util.sendDeletableMessage(message.channel, {
				embed
			}, message.author);
		} catch (err) {
			console.error(err);
		}
		return
	} else {
		let embed = new Discord.RichEmbed()
		embed
			.setAuthor(message.author.tag, message.author.avatarURL)
			.setColor('#0099ff')
			.setTitle('ReiNa Bot')
			.setURL("https://mcwind.tk")
			.setDescription(`${message.author}, senpai~ 請輸入正確的頁數或分類\n\n頁數: *1-8*\n\n分類: *music*`)
			.setFooter('ReiNa By 𝓖𝓻𝓪𝓷𝓭𝓞𝓹𝓮𝓻𝓪𝓽𝓸𝓻#9487', bot.user.avatarURL)
			.setTimestamp();
		try {
			await util.sendDeletableMessage(message.channel, {
				embed
			}, message.author);
		} catch (err) {
			console.error(err);
		}
		return
	}
}

module.exports.help = {
	name: "help",
	description: "提供幫助信息",
	cate: 3,
	show: true
}