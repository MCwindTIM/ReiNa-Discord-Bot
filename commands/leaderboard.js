const Discord = require("discord.js");
const util = require('../util.js');
const SQLite = require("better-sqlite3");
const sql = new SQLite('./scores.sqlite');
module.exports.run = async (bot, message, args) =>{
	message.delete();
	const top10 = sql.prepare("SELECT * FROM scores WHERE guild = ? ORDER BY points DESC LIMIT 10;").all(message.guild.id);
	const embed = new Discord.RichEmbed()
	embed
	.setAuthor(message.author.tag, message.author.avatarURL)
	.setDescription(`${message.author}, 這個是分數榜前十名!`)
	.setColor(0xcc0000)
	.setTitle('ReiNa Bot 分數板')
	.setURL("https://mcwind.tk")
	.setTimestamp()
	.setFooter('ReiNa By 一起來當馬猴燒酒吧 (>ω･* )ﾉ#9201', 'https://cdn.discordapp.com/avatars/418095978273570846/17c96d9ce6c135f7511a001e8584db17.png?size=2048');
	
	for(const data of top10){
		embed.addField(bot.users.get(data.user).tag, `點數: ${data.points}, 等級: ${data.level}!`);
	}
	
	try {
		await util.sendDeletableMessage(message.channel, { embed }, message.author);
	}catch (err) {
		console.error(err);
	}
}


module.exports.help = {
	name: "leaderboard"
}