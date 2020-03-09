const Discord = require("discord.js");
const util = require('../util.js');
const SQLite = require("better-sqlite3");
const sql = new SQLite('../scores.sqlite');
module.exports.run = async (bot, message, args) =>{
	message.delete();
	const top10 = sql.prepare("SELECT * FROM scores WHERE guild = ? ORDER BY points DESC LIMIT 10;").all(message.guild.id);
	let embed = new Discord.RichEmbed()
	embed
	.setAuthor(message.author.tag, message.author.avatarURL)
	.setDescription(`${message.author}, 這個是分數榜前十名!`)
	.setColor(0xcc0000)
	.setTitle('ReiNa Bot 分數板')
	.setURL("https://mcwind.tk")
	.setTimestamp()
	.setFooter('ReiNa By 𝓖𝓻𝓪𝓷𝓭𝓞𝓹𝓮𝓻𝓪𝓽𝓸𝓻#9487', bot.user.avatarURL);
	
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
	name: "leaderboard",
	description: "顯示分數榜前十名用戶",
	cate: 4,
	show: true
}
