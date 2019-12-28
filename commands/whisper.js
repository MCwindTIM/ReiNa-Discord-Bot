const Discord = require("discord.js");
const util = require('../util.js');
module.exports.run = async (bot, message, args) =>{
	message.delete();
	const user = message.mentions.users.first() || bot.users.get(args[0]);
	let whispermessage = args.join(" ");
	if(!user){
	  const embed = new Discord.RichEmbed()
	  embed
	  .setAuthor(message.author.tag, message.author.avatarURL)
	  .setDescription(`${message.author}, 你需要提供 @用戶 或者 16位數字用戶id!`)
	  .setColor(0xcc0000)
	  .setTitle('ReiNa Bot 錯誤')
	  .setURL("https://mcwind.tk")
	  .setTimestamp()
	  .setFooter('ReiNa By 𝓖𝓻𝓪𝓷𝓭𝓞𝓹𝓮𝓻𝓪𝓽𝓸𝓻#9487', 'https://cdn.discordapp.com/avatars/418095978273570846/17c96d9ce6c135f7511a001e8584db17.png?size=2048');
	  try {
		  await util.sendDeletableMessage(message.channel, { embed }, message.author);
	  }catch (err) {
		  console.error(err);
	  }
	  return;
	}
	if(!args[1]){
		const embed = new Discord.RichEmbed()
		embed
		.setAuthor(message.author.tag, message.author.avatarURL)
		.setColor('#0099ff')
		.setTitle('ReiNa Bot 錯誤')
		.setURL("https://mcwind.tk")
		.setTimestamp()
		.setDescription(`${message.author}` + "請輸入要發送的信息!")
		.setFooter('ReiNa By 𝓖𝓻𝓪𝓷𝓭𝓞𝓹𝓮𝓻𝓪𝓽𝓸𝓻#9487', 'https://cdn.discordapp.com/avatars/418095978273570846/17c96d9ce6c135f7511a001e8584db17.png?size=2048');
		try {
			await util.sendDeletableMessage(message.channel, { embed }, message.author);
		}   catch (err) {
			console.error(err);
		}
		return;
	}
	whispermessage = whispermessage.replace(`<@${user.id}>`, '');
	try{
		const embed = new Discord.RichEmbed()
		embed
		.setAuthor(message.author.tag, message.author.avatarURL)
		.setColor('#0099ff')
		.setTitle(`ReiNa Bot Whisper Message FROM ★${message.author.tag}★`)
		.setURL("https://mcwind.tk")
		.setTimestamp()
		.setDescription(`${whispermessage}`)
		.setFooter('ReiNa By 𝓖𝓻𝓪𝓷𝓭𝓞𝓹𝓮𝓻𝓪𝓽𝓸𝓻#9487', 'https://cdn.discordapp.com/avatars/418095978273570846/17c96d9ce6c135f7511a001e8584db17.png?size=2048');
			bot.users.get(user.id).send(embed);
		}   catch (err) {
			console.error(err);
		}
	const embed = new Discord.RichEmbed()
		embed
		.setAuthor(message.author.tag, message.author.avatarURL)
		.setColor('#0099ff')
		.setTitle('ReiNa Bot')
		.setURL("https://mcwind.tk")
		.setTimestamp()
		.setDescription(`${message.author}` + "信息已經發出!")
		.setFooter('ReiNa By 𝓖𝓻𝓪𝓷𝓭𝓞𝓹𝓮𝓻𝓪𝓽𝓸𝓻#9487', 'https://cdn.discordapp.com/avatars/418095978273570846/17c96d9ce6c135f7511a001e8584db17.png?size=2048');
		try {
			await util.sendDeletableMessage(message.channel, { embed }, message.author);
		}   catch (err) {
			console.error(err);
		}
}

module.exports.help = {
	name: "w"
}