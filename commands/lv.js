const Discord = require("discord.js");
const util = require('../util.js');
const SQLite = require("better-sqlite3");
const sql = new SQLite('./scores.sqlite');
const botconfig = require('../botconfig.json')
const table = sql.prepare("SELECT count(*) FROM sqlite_master WHERE type='table' AND name = 'scores';").get();
if (!table['count(*)']) {
  sql.prepare("CREATE TABLE scores (id TEXT PRIMARY KEY, user TEXT, guild TEXT, points INTEGER, level INTEGER, tkpoints INTEGER);").run();
  sql.prepare("CREATE UNIQUE INDEX idx_scores_id ON scores (id);").run();
  sql.pragma("synchronous = 1");
  sql.pragma("journal_mode = wal");
}
module.exports.run = async (bot, message, args) =>{
    bot.getScore = sql.prepare("SELECT * FROM scores WHERE user = ? AND guild = ?");
	bot.setScore = sql.prepare("INSERT OR REPLACE INTO scores (id, user, guild, points, level, tkpoints) VALUES (@id, @user, @guild, @points, @level, @tkpoints);");
    let score;
    if(message.guild){
		score = bot.getScore.get(message.author.id, message.guild.id);
		if(!score){
			score = {
				id: `${message.guild.id}-${message.author.id}`,
				user: message.author.id,
				guild: message.guild.id,
				points: 0,
				level: 1,
				tkpoints: 0
			}
		}
		score.points++;
		let curLevel = Math.floor(0.1 * Math.sqrt(score.points));
		if(score.level < curLevel){
			score.level++;
			const lvlup = new Discord.RichEmbed()
			embed
			.setAuthor(message.author.tag, message.author.avatarURL)
			.setDescription(`${message.author} senpai升級啦, 你的等級現在是${curLevel}!`)
			.setColor(0xcc0000)
			.setTitle('ReiNa Bot')
			.setURL("https://mcwind.tk")
			.setTimestamp()
			.setFooter('ReiNa By 一起來當馬猴燒酒吧 (>ω･* )ﾉ#9201', 'https://cdn.discordapp.com/avatars/418095978273570846/17c96d9ce6c135f7511a001e8584db17.png?size=2048');
			message.channel.send(lvlup);
		}
		bot.setScore.run(score);
      }
}


module.exports.help = {
	name: "lv¿"
}