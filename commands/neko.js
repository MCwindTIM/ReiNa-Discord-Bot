const Discord = require("discord.js");
const util = require('../util.js');
const nekoclient = require('nekos.life');
const neko = new nekoclient();
module.exports.run = async (bot, message, args) =>{
	message.delete();
	neko.sfw.neko().then(neko => {
	const embed = new Discord.RichEmbed()
			  embed
			  .setAuthor(message.author.tag, message.author.avatarURL)
			  .setDescription(`${message.author}` + ' Senpai, 你要求的neko在這。')
			  .setColor(0xcc0000)
			  .setTitle('ReiNa Bot')
			  .setURL(neko.url)
			  .setImage(neko.url)
			  .setTimestamp()
			  .setFooter('ReiNa By 𝓖𝓻𝓪𝓷𝓭𝓞𝓹𝓮𝓻𝓪𝓽𝓸𝓻#9487', 'https://cdn.discordapp.com/avatars/418095978273570846/17c96d9ce6c135f7511a001e8584db17.png?size=2048');
			  try {
				  util.sendDeletableMessage(message.channel, { embed }, message.author);
			  }   catch (err) {
				  console.error(err);
			  }
			  return;
	});
}

module.exports.help = {
	name: "neko",
	description: "請求一張neko的圖片",
	cate: 5,
	show: true
}