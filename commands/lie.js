const Discord = require("discord.js");
const util = require('../util.js');
const Canvas = require('canvas');
module.exports.run = async (bot, message, args) => {
	message.delete();
	let kitisgay = message.mentions.members.first();
	if (!kitisgay) {
		let embed = new Discord.RichEmbed()
			.setDescription("請提供@想驗證的用戶")
			.setColor(0xcc0000)
			.setTitle('ReiNa Bot 錯誤')
			.setURL("https://mcwind.tk")
			.addField('使用方法: ', "rn!lie [用戶]")
			.setTimestamp()
			.setFooter('ReiNa By 𝓖𝓻𝓪𝓷𝓭𝓞𝓹𝓮𝓻𝓪𝓽𝓸𝓻#9487', bot.user.avatarURL);
		try {
			util.sendDeletableMessage(message.channel, {
				embed
			}, message.author);
		} catch (err) {
			console.error(err);
		}
		return;
	}
	if (kitisgay.id === '209598158152531968' && message.author.id != '209598158152531968' && message.guild.id === '398062441516236800') {
		let embed = new Discord.RichEmbed()
			.setAuthor(message.author.tag, message.author.avatarURL)
			.setDescription(`${message.author}, 你無法驗證至高無上的萬物のkami!\n\n${kitisgay} Yes, Your highness!\n\n${message.author} 已經從世界中剔除!`)
			.setColor(0xcc0000)
			.setTitle('ReiNa Bot')
			.setURL("https://mcwind.tk")
			.setTimestamp()
			.setFooter('ReiNa By 𝓖𝓻𝓪𝓷𝓭𝓞𝓹𝓮𝓻𝓪𝓽𝓸𝓻#9487', bot.user.avatarURL);
		util.sendDeletableMessage(message.channel, {
			embed
		}, message.author);
		message.member.kick('嘗試驗證至高無上的萬物のkami');
		return;
	}
	if (kitisgay.id === message.author.id) {
		let embed = new Discord.RichEmbed()
			.setAuthor(message.author.tag, message.author.avatarURL)
			.setDescription(`${kitisgay}` + "你不能驗證自己!")
			.setColor(0xcc0000)
			.setTitle('ReiNa Bot')
			.setURL("https://mcwind.tk")
			.setTimestamp()
			.setFooter('ReiNa By 𝓖𝓻𝓪𝓷𝓭𝓞𝓹𝓮𝓻𝓪𝓽𝓸𝓻#9487', bot.user.avatarURL);
		util.sendDeletableMessage(message.channel, {
			embed
		}, message.author);
		return;
	}
	if (message.guild.member(kitisgay).user.bot) {
		let embed = new Discord.RichEmbed()
			.setAuthor(message.author.tag, message.author.avatarURL)
			.setDescription(`${kitisgay}` + "是一個機械人, 無法驗證該用戶!")
			.setColor(0xcc0000)
			.setTitle('ReiNa Bot')
			.setURL("https://mcwind.tk")
			.setTimestamp()
			.setFooter('ReiNa By 𝓖𝓻𝓪𝓷𝓭𝓞𝓹𝓮𝓻𝓪𝓽𝓸𝓻#9487', bot.user.avatarURL);
		util.sendDeletableMessage(message.channel, {
			embed
		}, message.author);
		return;
	}
	if (message.guild.member(kitisgay).presence.status === 'offline') {
		let embed = new Discord.RichEmbed()
			.setAuthor(message.author.tag, message.author.avatarURL)
			.setDescription(`${kitisgay}` + "不是上線狀態, 無法驗證掛機用戶!")
			.setColor(0xcc0000)
			.setTitle('ReiNa Bot')
			.setURL("https://mcwind.tk")
			.setTimestamp()
			.setFooter('ReiNa By 𝓖𝓻𝓪𝓷𝓭𝓞𝓹𝓮𝓻𝓪𝓽𝓸𝓻#9487', bot.user.avatarURL);
		util.sendDeletableMessage(message.channel, {
			embed
		}, message.author);
		return;
	}
	if (!message.guild.member(kitisgay).voiceChannel) {
		if (message.guild.member(kitisgay).voiceChannel.id === '398135583890735119') {
			let embed = new Discord.RichEmbed()
				.setAuthor(message.author.tag, message.author.avatarURL)
				.setDescription(`${kitisgay}` + "在AFK頻道中, 無法驗證掛機用戶!")
				.setColor(0xcc0000)
				.setTitle('ReiNa Bot')
				.setURL("https://mcwind.tk")
				.setTimestamp()
				.setFooter('ReiNa By 𝓖𝓻𝓪𝓷𝓭𝓞𝓹𝓮𝓻𝓪𝓽𝓸𝓻#9487', bot.user.avatarURL);
			util.sendDeletableMessage(message.channel, {
				embed
			}, message.author);
			return;
		}
		let embed = new Discord.RichEmbed()
			.setAuthor(message.author.tag, message.author.avatarURL)
			.setDescription(`${kitisgay}` + "不在語音頻道中, 無法驗證掛機用戶!")
			.setColor(0xcc0000)
			.setTitle('ReiNa Bot')
			.setURL("https://mcwind.tk")
			.setTimestamp()
			.setFooter('ReiNa By 𝓖𝓻𝓪𝓷𝓭𝓞𝓹𝓮𝓻𝓪𝓽𝓸𝓻#9487', bot.user.avatarURL);
		util.sendDeletableMessage(message.channel, {
			embed
		}, message.author);
		return;
	}
	if (!message.member.voiceChannel) {
		let embed = new Discord.RichEmbed()
			.setAuthor(message.author.tag, message.author.avatarURL)
			.setDescription(`${message.author}` + "你不在語音頻道中, 無法驗證掛機用戶!")
			.setColor(0xcc0000)
			.setTitle('ReiNa Bot')
			.setURL("https://mcwind.tk")
			.setTimestamp()
			.setFooter('ReiNa By 𝓖𝓻𝓪𝓷𝓭𝓞𝓹𝓮𝓻𝓪𝓽𝓸𝓻#9487', bot.user.avatarURL);
		util.sendDeletableMessage(message.channel, {
			embed
		}, message.author);
		return;
	}
	if (message.member.voiceChannel.id != message.guild.member(kitisgay).voiceChannel.id) {
		let embed = new Discord.RichEmbed()
			.setAuthor(message.author.tag, message.author.avatarURL)
			.setDescription(`${message.author}` + "你與要驗證的用戶不在同一個語音頻道中, 無法驗證掛機用戶!")
			.setColor(0xcc0000)
			.setTitle('ReiNa Bot')
			.setURL("https://mcwind.tk")
			.setTimestamp()
			.setFooter('ReiNa By 𝓖𝓻𝓪𝓷𝓭𝓞𝓹𝓮𝓻𝓪𝓽𝓸𝓻#9487', bot.user.avatarURL);
		util.sendDeletableMessage(message.channel, {
			embed
		}, message.author);
		return;
	}

	let array = [kitisgay.id]
	const canvas = Canvas.createCanvas(100, 30);
	const ctx = canvas.getContext('2d');
	const blankbg = await Canvas.loadImage('./images/blankbg.jpg');
	ctx.drawImage(blankbg, 0, 0, canvas.width, canvas.height);
	ctx.font = '24px "Microsoft YaHei"';

	let drawText = (text, x) => {
		ctx.save();
		const angle = Math.random() / 10;
		const y = 22;
		ctx.rotate(angle);
		ctx.fillText(text, x, y);
		ctx.restore();
	}

	let drawLine = () => {
		const num = Math.floor(Math.random() * 2 + 3);

		for (let i = 0; i < num; i++) {
			const color = '#' + (Math.random() * 0xffffff << 0).toString(16);
			const y1 = Math.random() * canvas.height;
			const y2 = Math.random() * canvas.height;
			ctx.strokeStyle = color;
			ctx.beginPath();
			ctx.lineTo(0, y1);
			ctx.lineTo(canvas.width, y2);
			ctx.stroke();
		}
	}

	const numArr = [
		'〇一二三四五六七八九',
		'0123456789',
		'零壹貳叁肆伍陸柒捌玖'
	];

	const fir = Math.floor(Math.random() * 10);
	const sec = Math.floor(Math.random() * 10);
	const operArr = ['加', '減', '乘'];
	const oper = Math.floor(Math.random() * operArr.length);

	drawLine();
	drawText(numArr[Math.floor(Math.random() * numArr.length)][fir], 10);
	drawText(operArr[oper], 40);
	drawText(numArr[Math.floor(Math.random() * numArr.length)][sec], 70);
	drawText('=', 100);
	drawText('?', 130);

	let captcha;
	switch (oper) {
		case 0:
			captcha = fir + sec;
			break;
		case 1:
			captcha = fir - sec;
			break;
		case 2:
			captcha = fir * sec;
			break;
	}
	const attachment = new Discord.Attachment(canvas.toBuffer(), '測謊機.png');
	message.channel.send(`${kitisgay}, 請在十秒內輸入算式答案!`, attachment).then(message => {
		message.delete(10000).catch(console.log(error))
	});
	try {
		const filter = m => m.content > captcha - 1 && m.content < captcha + 1 && array.includes(m.author.id);
		var response = await message.channel.awaitMessages(filter, {
			maxMatches: 1,
			time: 10000,
			errors: ['time']
		});
		const fetched = await message.channel.fetchMessages({
			limit: 1
		});
		message.channel.bulkDelete(fetched)
	} catch (err) {
		let png = canvas.createPNGStream();
		const embed = new Discord.RichEmbed()
		embed
			.setAuthor(message.author.tag, message.author.avatarURL)
			.setDescription(`${kitisgay} 驗證碼錯誤 / 超過輸入時間! 下面為驗證問題!\n\n這麼簡單的運算都想那麼久, ${kitisgay}不是掛機就是弱智!`)
			.setColor(0xcc0000)
			.setTitle('ReiNa Bot 驗證錯誤')
			.setURL("https://mcwind.tk")
			.attachFile(new Discord.Attachment(png, 'Q.png'))
			.setImage("attachment://Q.png")
			.setTimestamp()
			.setFooter('ReiNa By 𝓖𝓻𝓪𝓷𝓭𝓞𝓹𝓮𝓻𝓪𝓽𝓸𝓻#9487', bot.user.avatarURL);
		util.sendDeletableMessage(message.channel, {
			embed
		}, message.author);
		let userVC = kitisgay.voiceChannel;
		let offlineVC = bot.channels.find(x => x.name === "💤隱身/離線/驗證失敗");
		if (userVC) {
			try {
				kitisgay.setVoiceChannel(offlineVC);
			} catch (e) {}
		}
		return;
	}
	let embed = new Discord.RichEmbed()
	embed
		.setAuthor(message.author.tag, message.author.avatarURL)
		.setDescription(`${kitisgay}` + "通過驗證!")
		.setColor(0xcc0000)
		.setTitle('ReiNa Bot')
		.setURL("https://mcwind.tk")
		.setTimestamp()
		.setFooter('ReiNa By 𝓖𝓻𝓪𝓷𝓭𝓞𝓹𝓮𝓻𝓪𝓽𝓸𝓻#9487', bot.user.avatarURL);
	util.sendDeletableMessage(message.channel, {
		embed
	}, message.author);
}

module.exports.help = {
	name: "lie",
	description: "測謊機 發出驗證判斷用戶是否掛機",
	cate: 8,
	show: true

}