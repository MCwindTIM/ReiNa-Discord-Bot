const Discord = require("discord.js");
const util = require('../util.js');
const SQLite = require("better-sqlite3");
const sql = new SQLite('./scores.sqlite');
module.exports.run = async (bot, message, args) =>{
	bot.getScore = sql.prepare("SELECT * FROM scores WHERE user = ? AND guild = ?");
	bot.setScore = sql.prepare("INSERT OR REPLACE INTO scores (id, user, guild, points, level) VALUES (@id, @user, @guild, @points, @level);");
	message.delete();
	if(!message.author.id === message.guild.owner){
	  const embed = new Discord.RichEmbed()
	  embed
	  .setAuthor(message.author.tag, message.author.avatarURL)
	  .setDescription(`${message.author}, 你沒有權限這樣做!`)
	  .setColor(0xcc0000)
	  .setTitle('ReiNa Bot 錯誤')
	  .setURL("https://mcwind.tk")
	  .setTimestamp()
	  .setFooter('ReiNa By 一起來當馬猴燒酒吧 (>ω･* )ﾉ#9201', 'https://cdn.discordapp.com/avatars/418095978273570846/17c96d9ce6c135f7511a001e8584db17.png?size=2048');
	  try {
		  await util.sendDeletableMessage(message.channel, { embed }, message.author);
	  }catch (err) {
		  console.error(err);
	  }
	  return;
	}

	const user = message.mentions.users.first() || bot.users.get(args[0]);
	if(!user){
	  const embed = new Discord.RichEmbed()
	  embed
	  .setAuthor(message.author.tag, message.author.avatarURL)
	  .setDescription(`${message.author}, 你需要提供 @用戶 或者 16位數字用戶id!`)
	  .setColor(0xcc0000)
	  .setTitle('ReiNa Bot 錯誤')
	  .setURL("https://mcwind.tk")
	  .setTimestamp()
	  .setFooter('ReiNa By 一起來當馬猴燒酒吧 (>ω･* )ﾉ#9201', 'https://cdn.discordapp.com/avatars/418095978273570846/17c96d9ce6c135f7511a001e8584db17.png?size=2048');
	  try {
		  await util.sendDeletableMessage(message.channel, { embed }, message.author);
	  }catch (err) {
		  console.error(err);
	  }
	  return;
	}
	const pointsToAdd = parseInt(args[1], 10);
	if(!pointsToAdd){
	  const embed = new Discord.RichEmbed()
	  embed
	  .setAuthor(message.author.tag, message.author.avatarURL)
	  .setDescription(`${message.author}, 你需要給我一個數字!`)
	  .setColor(0xcc0000)
	  .setTitle('ReiNa Bot 錯誤')
	  .setURL("https://mcwind.tk")
	  .setTimestamp()
	  .setFooter('ReiNa By 一起來當馬猴燒酒吧 (>ω･* )ﾉ#9201', 'https://cdn.discordapp.com/avatars/418095978273570846/17c96d9ce6c135f7511a001e8584db17.png?size=2048');
	  try {
		  await util.sendDeletableMessage(message.channel, { embed }, message.author);
	  }catch (err) {
		  console.error(err);
	  }
	  return;
	}
	let userscore = bot.getScore.get(user.id, message.guild.id);
	if(!userscore){
		userscore = { id: `${message.guild.id}-${user.id}`, user: user.id, guild: message.guild.id, points: 0, level: 1 }
	}
	userscore.points += pointsToAdd;

	let userLevel = Math.floor(0.1 * Math.sqrt(userscore.points));
	userscore.level = userLevel;

	bot.setScore.run(userscore);
	const embed = new Discord.RichEmbed()
	embed
	.setAuthor(message.author.tag, message.author.avatarURL)
	.setDescription(`${message.author}, ${user.tag}收到了${pointsToAdd}分數 - 現在擁有${userscore.points}點數!`)
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
	return;
}


module.exports.help = {
	name: "give"
}