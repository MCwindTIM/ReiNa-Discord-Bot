const Discord = require("discord.js");
const util = require('../util.js');
const request = require("request-promise");
const chineseConv = require('chinese-conv');

module.exports.run = async (message, bot) =>{
	try{
	let O_poem = await request.get('https://v1.jinrishici.com/all.json');
	O_poem = JSON.parse(O_poem);
	let f_poem_content = chineseConv.tify(O_poem.content);
	let f_poem_origin = chineseConv.tify(O_poem.origin);
	let f_poem_author = chineseConv.tify(O_poem.author);
	let f_poem_category = chineseConv.tify(O_poem.category);
	let url = `https://www.google.com/search?q=` + f_poem_author.replace(' ', '+') + '+' + f_poem_origin.replace(' ', '+') + '+' + f_poem_content.replace(' ', '+');

	const embed = new Discord.RichEmbed()
	embed
	.setAuthor(message.author.tag, message.author.avatarURL)
	.setColor('#0099ff')
	.setTitle('↑↑↑↑↑文學青年↑↑↑↑↑')
	.setURL(url)
	.setTimestamp()
	.addField('作者', f_poem_author)
	.addField('詩句', f_poem_content)
	.addField('出處', f_poem_origin)
	.addField('類別', f_poem_category)
	.setFooter('ReiNa By 𝓖𝓻𝓪𝓷𝓭𝓞𝓹𝓮𝓻𝓪𝓽𝓸𝓻#9487', bot.user.avatarURL);
	await util.sendDeletableMessage(message.channel, { embed }, message.author);
	}catch(e){console.log(e)}
}

module.exports.help = {
	name: "poem¿",
	description: "請求詩句",
	cate: 6,
	show: false
}
