const Discord = require("discord.js");
const util = require('../util.js');
const request = require("request-promise");
const chineseConv = require('chinese-conv');

module.exports.run = async (message, bot) =>{
	try{
	let kokoro = await request.get('https://v1.hitokoto.cn/');
	kokoro = JSON.parse(kokoro);
	let f_kokoro_hitokoto = chineseConv.tify(kokoro.hitokoto);
	let f_kokoro_from = chineseConv.tify(kokoro.from);
	let url = `https://hitokoto.cn?id=${kokoro.id}`;

	const embed = new Discord.RichEmbed()
	embed
	.setAuthor(message.author.tag, message.author.avatarURL)
	.setColor('#0099ff')
	.setTitle('→→→→→名句←←←←←')
	.setURL(url)
	.setTimestamp()
	.addField('名句', f_kokoro_hitokoto)
	.addField('出處', f_kokoro_from)
	.setFooter('ReiNa By 𝓖𝓻𝓪𝓷𝓭𝓞𝓹𝓮𝓻𝓪𝓽𝓸𝓻#9487', bot.user.avatarURL);
	await util.sendDeletableMessage(message.channel, { embed }, message.author);
	}catch(e){console.log(e)}
}

module.exports.help = {
	name: "kokoro¿",
	description: "隨機名句",
	cate: 4,
	show: false
}
