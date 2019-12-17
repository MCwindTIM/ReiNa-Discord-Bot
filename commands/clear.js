const Discord = require("discord.js");
const util = require('../util.js');
const botconfig = require("../botconfig.json");

module.exports.run = async (bot, message, args) =>{
	let prefix = botconfig.prefix;
	let cont = message.content.slice(prefix.length).split(" ");
	let argsclear = cont.slice(1);
	async function clear(){
		message.delete();
		if(args[0] > 100){
			const embed = new Discord.RichEmbed()
				embed
				.setAuthor(message.author.tag, message.author.avatarURL)
				.setColor('#0099ff')
				.setTitle('ReiNa Bot')
				.setURL("https://mcwind.tk")
				.setDescription(`${message.author}` + "Senpai, 刪除信息不能大於100哦!")
				.setFooter('ReiNa By 一起來當馬猴燒酒吧 (>ω･* )ﾉ#9201', 'https://cdn.discordapp.com/avatars/418095978273570846/17c96d9ce6c135f7511a001e8584db17.png?size=2048')
				.setTimestamp();
				try {
					await util.sendDeletableMessage(message.channel, { embed }, message.author);
				}   catch (err) {
					console.error(err);
				}
			 return;
		}
		if(args[0] < 2){
			const embed = new Discord.RichEmbed()
				embed
				.setAuthor(message.author.tag, message.author.avatarURL)
				.setColor('#0099ff')
				.setTitle('ReiNa Bot')
				.setURL("https://mcwind.tk")
				.setDescription(`${message.author}` + "Senpai, 至少要刪除2條信息哦!")
				.setFooter('ReiNa By 一起來當馬猴燒酒吧 (>ω･* )ﾉ#9201', 'https://cdn.discordapp.com/avatars/418095978273570846/17c96d9ce6c135f7511a001e8584db17.png?size=2048')
				.setTimestamp();
				try {
					await util.sendDeletableMessage(message.channel, { embed }, message.author);
				}   catch (err) {
					console.error(err);
				}
			 return;
		}
		if(isNaN(args[0])){
			const embed = new Discord.RichEmbed()
				embed
				.setAuthor(message.author.tag, message.author.avatarURL)
				.setColor('#0099ff')
				.setTitle('ReiNa Bot')
				.setURL("https://mcwind.tk")
				.setDescription(`${message.author}` + "Senpai, 請輸入有效數目!")
				.setFooter('ReiNa By 一起來當馬猴燒酒吧 (>ω･* )ﾉ#9201', 'https://cdn.discordapp.com/avatars/418095978273570846/17c96d9ce6c135f7511a001e8584db17.png?size=2048')
				.setTimestamp();
				try {
					await util.sendDeletableMessage(message.channel, { embed }, message.author);
				}   catch (err) {
					console.error(err);
				}
			 return;
		}
		  
		  const fetched = await message.channel.fetchMessages({limit: argsclear[0]});
		  console.log('正在刪除 ' + fetched.size + ' 條信息...');
		  
		
		  message.channel.bulkDelete(fetched)
			  const embed = new Discord.RichEmbed()
			embed
			.setAuthor(message.author.tag, message.author.avatarURL)
			.setColor('#0099ff')
			.setTitle('ReiNa Bot')
			.setURL("https://mcwind.tk")
			.setDescription(`${message.author}` + "刪除了" + cont.slice(1) + "條信息" + "\n我只可以刪除14日內的信息")
			.setFooter('ReiNa By 一起來當馬猴燒酒吧 (>ω･* )ﾉ#9201', 'https://cdn.discordapp.com/avatars/418095978273570846/17c96d9ce6c135f7511a001e8584db17.png?size=2048')
			.setTimestamp();
				try {
					await util.sendDeletableMessage(message.channel, { embed }, message.author);
			}   catch (err) {
					console.error(err);
				}
				return;
	}
		
		clear();
}

module.exports.help = {
	name: "clear"
}