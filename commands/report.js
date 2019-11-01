const Discord = require("discord.js");
const util = require('../util.js');
module.exports.run = async (bot, message, args) =>{
	let rUser = message.guild.member(message.mentions.users.first() || message.guild.members.get(args[0]));
	if(!rUser) { 
	message.delete();
	message.channel.send("找不到該使用者");}
	
	let reason = args.join(" ").slice(22);

	let reportEmbed = new Discord.RichEmbed()
	.setDescription("檢舉記錄")
	.setColor("#15f153")
	.addField("懷疑違規用戶",`${rUser}, 用戶ID ${rUser.id}`)
	.addField("檢舉人",`${message.author}, 用戶ID: ${message.author.id}`)
	.addField("頻道", message.channel)
	.addField("檢舉時間", message.createdAt)
	.addField("原因", reason);
	
	let finishEmbed = new Discord.RichEmbed()
	.setDescription("成功發起檢舉!")
	.setColor("#15f153")
	.addField("發起人",`${message.author}, 用戶Discord唯一ID: ${message.author.id}`);

	let reportschannel = message.guild.channels.find(channel => channel.name === "reports");
	if(!reportschannel) return message.channel.send("找不到該頻道");

	message.delete().catch(O_o=>{});
	reportschannel.send(reportEmbed);
	message.channel.send(finishEmbed);
}

module.exports.help = {
	name: "report"
}