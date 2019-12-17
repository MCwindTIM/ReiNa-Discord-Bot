const Discord = require("discord.js");
const util = require('../util.js');
const SQLite = require("better-sqlite3");
const sql = new SQLite('./scores.sqlite');
module.exports.run = async (bot, message, args) =>{
    bot.getScore = sql.prepare("SELECT * FROM scores WHERE user = ? AND guild = ?");
	let score;
	score = bot.getScore.get(message.author.id, message.guild.id);
    message.delete();
	const embed = new Discord.RichEmbed()
		embed
		.setAuthor(message.author.tag, message.author.avatarURL)
		.setDescription(`${message.author}, 你的等級是: ${score.level}, 你現在還有${score.points}點數!`)
		.setColor(0xcc0000)
		.setTitle('ReiNa Bot 分數板')
		.setURL("https://mcwind.tk")
		.setTimestamp()
		.setFooter('ReiNa By 一起來當馬猴燒酒吧 (>ω･* )ﾉ#9201', 'https://cdn.discordapp.com/avatars/418095978273570846/17c96d9ce6c135f7511a001e8584db17.png?size=2048');
		try {
			await util.sendDeletableMessage(message.channel, { embed }, message.author);
		}catch (err) {
			console.error(err);
        }
}


module.exports.help = {
	name: "points"
}