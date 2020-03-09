const Discord = require("discord.js");
const util = require('../util.js');
const SQLite = require("better-sqlite3");
const sql = new SQLite('../scores.sqlite');
const botconfig = require('../botconfig.json')
const table = sql.prepare("SELECT count(*) FROM sqlite_master WHERE type='table' AND name = 'scores';").get();
const Canvas = require('canvas');
if (!table['count(*)']) {
  sql.prepare("CREATE TABLE scores (id TEXT PRIMARY KEY, user TEXT, guild TEXT, points INTEGER, level INTEGER, tkpoints INTEGER);").run();
  sql.prepare("CREATE UNIQUE INDEX idx_scores_id ON scores (id);").run();
  sql.pragma("synchronous = 1");
  sql.pragma("journal_mode = wal");
}

module.exports.run = async (bot, message, args) =>{
	try{
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
			bot.setScore.run(score);
			const lvlup = Canvas.createCanvas(700, 250);
			const lvctx = lvlup.getContext('2d');
			const lvbg = await Canvas.loadImage('./images/wallpaper.jpg');
			lvctx.drawImage(lvbg, 0, 0, lvlup.width, lvlup.height);
			lvctx.strokeStyle = '#74037b';
			lvctx.strokeRect(0, 0, lvlup.width, lvlup.height);
			lvctx.font = '28px MCwindFont';
			lvctx.fillStyle = '#ffffff';
			lvctx.fillText(`senpai升級啦, 你的等級現在是`, lvlup.width / 2.5, lvlup.height / 3.5);
			lvctx.font = '120px MCwindFont';
			lvctx.fillStyle = '#00ff00';
			lvctx.fillText(`★${curLevel}★`, lvlup.width / 2.6, lvlup.height / 1.3);

			lvctx.beginPath();
			lvctx.arc(125, 125, 100, 0, Math.PI * 2, true);
			lvctx.closePath();
			lvctx.clip();
			let lvavatar = await Canvas.loadImage(message.member.user.displayAvatarURL);
			lvctx.drawImage(lvavatar, 25, 25, 200, 200);

			const attachment = new Discord.Attachment(lvlup.toBuffer(), 'lvlup-image.png');
	
			message.channel.send("", attachment);
			return;
		}
		bot.setScore.run(score);
	  }
	}
	catch(e){console.log(e)}
}


module.exports.help = {
	name: "lv¿",
	description: "發送積分 升等級",
	cate: 4,
	show: false
}
