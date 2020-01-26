const Discord = require("discord.js");
const util = require('../util.js');
const nekoclient = require('nekos.life');
const neko = new nekoclient();
module.exports.run = async (bot, message, args) =>{
	message.delete();
	neko.sfw.meow().then(meow => {
	const embed = new Discord.RichEmbed()
			  embed
			  .setAuthor(message.author.tag, message.author.avatarURL)
			  .setDescription(`${message.author}` + 'Meow~')
			  .setColor(0xcc0000)
			  .setTitle('ReiNa Bot')
			  .setImage(meow.url)
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
	name: "meow",
	description: "請求一張貓貓的圖片",
	cate: 5,
	show: true
}