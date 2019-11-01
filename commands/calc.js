const Discord = require("discord.js");
const util = require('../util.js');
const math = require('mathjs');
module.exports.run = async (bot, message, args) =>{
	message.delete();
	if (!args[0]) {
		const embed = new Discord.RichEmbed()
		embed
		.setAuthor(message.author.tag, message.author.avatarURL)
		.setColor(0xffffff)
		.setTitle('錯誤')
		.setDescription(`${message.author}` + ' Senpai, 請輸入算式~')
		.setTimestamp()
		.setFooter('ReiNa By 一起來當馬猴燒酒吧 (>ω･* )ﾉ#9201', 'https://cdn.discordapp.com/avatars/418095978273570846/17c96d9ce6c135f7511a001e8584db17.png?size=2048');
		try {
			util.sendDeletableMessage(message.channel, { embed }, message.author);
		}   catch (err) {
			console.error(err);
		}
		return;
	};

	let resp;
	try{
		resp = math.evaluate(args.join(' '));
	} catch (e) {
		const embed = new Discord.RichEmbed()
		embed
		.setAuthor(message.author.tag, message.author.avatarURL)
		.setColor(0xffffff)
		.setTitle('錯誤')
		.setDescription(`${message.author}` + ' Senpai, 請輸入有效的算式!')
		.setTimestamp()
		.setFooter('ReiNa By 一起來當馬猴燒酒吧 (>ω･* )ﾉ#9201', 'https://cdn.discordapp.com/avatars/418095978273570846/17c96d9ce6c135f7511a001e8584db17.png?size=2048');
		util.sendDeletableMessage(message.channel, { embed }, message.author);
		return;
	}

	const embed = new Discord.RichEmbed()
		embed
		.setAuthor(message.author.tag, message.author.avatarURL)
		.setColor(0xffffff)
		.setTitle('算式計算')
		.setDescription(`${message.author}` + ' Senpai, 我算好了~')
		.addField('輸入', `\`\`\`js\n${args.join('')}\`\`\``)
		.addField('結果', `\`\`\`js\n${resp}\`\`\``)
		.setTimestamp()
		.setFooter('ReiNa By 一起來當馬猴燒酒吧 (>ω･* )ﾉ#9201', 'https://cdn.discordapp.com/avatars/418095978273570846/17c96d9ce6c135f7511a001e8584db17.png?size=2048');
		try {
			util.sendDeletableMessage(message.channel, { embed }, message.author);
		}   catch (err) {
			console.error(err);
		}
		return;
}

module.exports.help = {
	name: "calc"
}