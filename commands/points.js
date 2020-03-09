const Discord = require("discord.js");
const util = require('../util.js');
const SQLite = require("better-sqlite3");
const sql = new SQLite('../scores.sqlite');
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
		.setFooter('ReiNa By 𝓖𝓻𝓪𝓷𝓭𝓞𝓹𝓮𝓻𝓪𝓽𝓸𝓻#9487', bot.user.avatarURL);
		try {
			await util.sendDeletableMessage(message.channel, { embed }, message.author);
		}catch (err) {
			console.error(err);
        }
}


module.exports.help = {
	name: "points",
	description: "查看分數",
	cate: 6,
	show: true
}
