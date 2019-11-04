const botconfig = require("./botconfig.json");
const fs = require('fs');
const Discord = require("discord.js");
const YouTube = require('simple-youtube-api');
const ytdl = require('ytdl-core');
const bot = new Discord.Client({disableEveryone: true});
bot.commands = new Discord.Collection();
const util = require('./util.js');
const youtube = new YouTube(botconfig.YoutubeAPI);
const queue = new Map();
const request = require("request");
const nHentai = require('./commands/napi.js')
process.title = 'ReiNaBot'


fs.readdir("./commands/", (err, files) =>{

	if(err) console.log(err);

	let jsfile = files.filter(f => f.split(".").pop() === "js")
	if(jsfile.length <= 0){
		console.log("沒有找到指令!")
		return;
	}

	jsfile.forEach((f, i) =>{
		let props = require(`./commands/${f}`);
		let hrStart = process.hrtime()
		let hrDiff;
		hrDiff = process.hrtime(hrStart);
		console.log(`${f} 指令已載入! 載入耗時: ${hrDiff[0] > 0 ? `${hrDiff[0]}s` : ''}${hrDiff[1] / 1000000}ms.`);
		bot.commands.set(props.help.name, props);
	});

});


bot.login(botconfig.token);

bot.on('warn', async () => {
	console.warn;
});
bot.on('error', async () =>{
	console.log(err);
});
bot.on("ready", async () => {
	console.log(`${bot.user.username} 上線!`);
    console.log(`加入了 ${bot.guilds.size} 個伺服器.`);
  	bot.user.setPresence({ game: { name: 'rn!help | ReiNa Is Here! Nya~~~~' , type: 3 } });
	CurrentTime();
	GuildAllUser();
});
bot.on('reconnecting', () => {
	console.log(`${bot.user.username} 上線!`);
    console.log(`加入了 ${bot.guilds.size} 個伺服器.`);
  	bot.user.setPresence({ game: { name: 'rn!help | ReiNa Is Here! Nya~~~~' , type: 3 } });
});
bot.on('disconnect', () => {
 console.log('斷開連接!');
});

setInterval(GuildAllUser, 60000);
setInterval(CurrentTime, 5000);

bot.on("message", async message => {
  if(message.channel.type === "dm") return;
  let OwnID = botconfig.OwnerID;
  let prefix = botconfig.prefix;
  let messageArray = message.content.split(" ");
  let cmd = messageArray[0];
  let args = messageArray.slice(1);
  const searchString = messageArray.slice(1).join(' ');
  const url = messageArray[1] ? messageArray[1].replace(/<(.+)>/g, '$1') : '';
  const serverQueue = queue.get(message.guild.id);
  const napiregex = /(?<=[\[{])(https?:\/\/nhentai\.net\/g\/)?(\d+)\/?.*?(?=[}\]])/gi;
  let commandfile = bot.commands.get(cmd.slice(prefix.length));
  if(commandfile) commandfile.run(bot,message,args);
  if(message.content.match(napiregex)) nHentai.run(bot,message,args);

	if(message.content.includes('discord.gg/'||'discordapp.com/invite/')) {
		message.delete(); 
		const embed = new Discord.RichEmbed()
				embed
				.setAuthor(message.author.tag, message.author.avatarURL)
				.setDescription(`這裡不允許發送Discord邀請連結!`)
				.setColor(0xcc0000)
				.setTitle('ReiNa Bot')
				.setURL("https://mcwind.tk")
                .setTimestamp()
				.setFooter('ReiNa By 一起來當馬猴燒酒吧 (>ω･* )ﾉ#9201', 'https://cdn.discordapp.com/avatars/418095978273570846/17c96d9ce6c135f7511a001e8584db17.png?size=2048');
                try {
                    await util.sendDeletableMessage(message.channel, { embed }, message.author);
				}   catch (err) {
                    console.error(err);
                }
	}
	
	if (cmd === `${prefix}play`){
		message.delete();
		const voiceChannel = message.member.voiceChannel;
		if (!voiceChannel) {
			const embed = new Discord.RichEmbed()
				embed
				.setAuthor(message.author.tag, message.author.avatarURL)
				.setDescription(`${message.author}` + " Senpai,  我很抱歉不能播放音樂, 因為你需要在語音頻道內!")
				.setColor(0xcc0000)
				.setTitle('ReiNa Bot')
				.setURL("https://mcwind.tk")
				.setTimestamp()
				.setFooter('ReiNa By 一起來當馬猴燒酒吧 (>ω･* )ﾉ#9201', 'https://cdn.discordapp.com/avatars/418095978273570846/17c96d9ce6c135f7511a001e8584db17.png?size=2048');
			try {
			await util.sendDeletableMessage(message.channel, { embed }, message.author);
			}   catch (err) {
				console.error(err);
			}
			return;
		}
		const permissions = voiceChannel.permissionsFor(message.client.user);
		if(!permissions.has('CONNECT')){
			const embed = new Discord.RichEmbed()
			embed
			.setAuthor(message.author.tag, message.author.avatarURL)
			.setDescription(`${message.author}` + "我沒有權限進入語音頻道哇! 嗚嗚嗚😭~")
			.setColor(0xcc0000)
			.setTitle('ReiNa Bot 錯誤')
			.setURL("https://mcwind.tk")
			.setTimestamp()
			.setFooter('ReiNa By 一起來當馬猴燒酒吧 (>ω･* )ﾉ#9201', 'https://cdn.discordapp.com/avatars/418095978273570846/17c96d9ce6c135f7511a001e8584db17.png?size=2048');
            try {
            await util.sendDeletableMessage(message.channel, { embed }, message.author);
			}   catch (err) {
            console.error(err);
			}
			return;
		}
		if(!permissions.has('SPEAK')){
			const embed = new Discord.RichEmbed()
			embed
			.setAuthor(message.author.tag, message.author.avatarURL)
			.setDescription(`${message.author}` + "我沒有權限在語音頻道發話哇! 嗚嗚嗚😭~")
			.setColor(0xcc0000)
			.setTitle('ReiNa Bot 錯誤')
			.setURL("https://mcwind.tk")
			.setTimestamp()
			.setFooter('ReiNa By 一起來當馬猴燒酒吧 (>ω･* )ﾉ#9201', 'https://cdn.discordapp.com/avatars/418095978273570846/17c96d9ce6c135f7511a001e8584db17.png?size=2048');
            try {
            await util.sendDeletableMessage(message.channel, { embed }, message.author);
			}   catch (err) {
            console.error(err);
			}
			return;
		}

		if (url.match(/^https?:\/\/(www.youtube.com|youtube.com)\/playlist(.*)$/) || url.match(/^https:\/\/(?:www\.)?youtube\.com\/watch\?((v=[^&\s]*&list=[^&\s]*)|(list=[^&\s]*&v=[^&\s]*))(&[^&\s]*)*$/)) {
			const playlist = await youtube.getPlaylist(url);
			const videos = await playlist.getVideos();
			for (const video of Object.values(videos)) {
				if (video.raw.status.privacyStatus === 'public'){
					const video2 = await youtube.getVideoByID(video.id);
					await handleVideo(video2, message, voiceChannel, true);
				}else{
					if (video.raw.status.privacyStatus === 'unlisted'){
						const video2 = await youtube.getVideoByID(video.id);
						await handleVideo(video2, message, voiceChannel, true);
					}else{
						if (video.raw.status.privacyStatus === 'private'){}
					}
				}
			}
			const embed = new Discord.RichEmbed()
			embed
			.setAuthor(message.author.tag, message.author.avatarURL)
			.setDescription("✅ 將整個播放清單: " + `**${playlist.title}**` + " 加入到播放列表中!\n\n\n**此信息將會在5秒後自動刪除**\n")
			.setColor(0xcc0000)
			.setTitle('ReiNa Bot')
			.setURL("https://mcwind.tk")
			.setTimestamp()
			.setFooter('ReiNa By 一起來當馬猴燒酒吧 (>ω･* )ﾉ#9201', 'https://cdn.discordapp.com/avatars/418095978273570846/17c96d9ce6c135f7511a001e8584db17.png?size=2048');
			message.channel.send(embed).then(function(message){
			message.delete(5000);
			}).catch(function(err){
			throw err;
			});
			return;
		} else {
			try {
				var video = await youtube.getVideo(url);
			} catch (error) {
				try {
					var videos = await youtube.searchVideos(searchString, 10);
					let index = 0;
					const embed = new Discord.RichEmbed()
					embed
					.setAuthor(message.author.tag, message.author.avatarURL)
					.setDescription(`${message.author}` + "\n**歌曲選擇:**\n" + `${videos.map(video2 => `**${++index} -** ${video2.title}`).join('\n')}` + "\n\n請Senpai在1到10號結果中選擇想播放的音樂哦!\n\n")
					.setColor(0xcc0000)
					.setTitle('ReiNa Bot')
					.setURL("https://mcwind.tk")
					.setTimestamp()
					.setFooter('ReiNa By 一起來當馬猴燒酒吧 (>ω･* )ﾉ#9201', 'https://cdn.discordapp.com/avatars/418095978273570846/17c96d9ce6c135f7511a001e8584db17.png?size=2048');
					util.sendDeletableMessage(message.channel, { embed }, message.author);
					try {
						var response = await message.channel.awaitMessages(message2 => message2.content > 0 && message2.content < 11, {
							maxMatches: 1,
							time: 10000,
							errors: ['time']
						});
						const fetched = await message.channel.fetchMessages({limit: 1});
						message.channel.bulkDelete(fetched)
					} catch (err) {
						console.error(err);
						const embed = new Discord.RichEmbed()
						embed
						.setAuthor(message.author.tag, message.author.avatarURL)
						.setDescription(`${message.author}` + "沒有正確的參數或者超過輸入參數的時間!")
						.setColor(0xcc0000)
						.setTitle('ReiNa Bot 錯誤')
						.setURL("https://mcwind.tk")
						.setTimestamp()
						.setFooter('ReiNa By 一起來當馬猴燒酒吧 (>ω･* )ﾉ#9201', 'https://cdn.discordapp.com/avatars/418095978273570846/17c96d9ce6c135f7511a001e8584db17.png?size=2048');
						util.sendDeletableMessage(message.channel, { embed }, message.author);
						return;
						}
					const videoIndex = parseInt(response.first().content);
					var video = await youtube.getVideoByID(videos[videoIndex - 1].id);
				} catch (err) {
					console.error(err);
					const embed = new Discord.RichEmbed()
					embed
					.setAuthor(message.author.tag, message.author.avatarURL)
					.setDescription(`${message.author}` + "我沒法取得任何搜尋結果!")
					.setColor(0xcc0000)
					.setTitle('ReiNa Bot 錯誤')
					.setURL("https://mcwind.tk")
					.setTimestamp()
					.setFooter('ReiNa By 一起來當馬猴燒酒吧 (>ω･* )ﾉ#9201', 'https://cdn.discordapp.com/avatars/418095978273570846/17c96d9ce6c135f7511a001e8584db17.png?size=2048');
					util.sendDeletableMessage(message.channel, { embed }, message.author);
					return;
				}
			}
			return handleVideo(video, message, voiceChannel);
		}
	}
	
	if (cmd === `${prefix}skip`){
		message.delete();
		if (!message.member.voiceChannel){
			const embed = new Discord.RichEmbed()
			embed
			.setAuthor(message.author.tag, message.author.avatarURL)
			.setDescription(`${message.author}` + "你不在語音頻道呀!")
			.setColor(0xcc0000)
			.setTitle('ReiNa Bot')
			.setURL("https://mcwind.tk")
			.setTimestamp()
			.setFooter('ReiNa By 一起來當馬猴燒酒吧 (>ω･* )ﾉ#9201', 'https://cdn.discordapp.com/avatars/418095978273570846/17c96d9ce6c135f7511a001e8584db17.png?size=2048');
            try {
            await util.sendDeletableMessage(message.channel, { embed }, message.author);
		}   catch (err) {
            console.error(err);
        }
        return;
		}
		if (!serverQueue){
			const embed = new Discord.RichEmbed()
				embed
				.setAuthor(message.author.tag, message.author.avatarURL)
				.setDescription(`${message.author}` + " Senpai, 沒有在播放音樂, 所以沒有東西能跳過哦!")
				.setColor(0xcc0000)
				.setTitle('ReiNa Bot')
				.setURL("https://mcwind.tk")
				.setTimestamp()
				.setFooter('ReiNa By 一起來當馬猴燒酒吧 (>ω･* )ﾉ#9201', 'https://cdn.discordapp.com/avatars/418095978273570846/17c96d9ce6c135f7511a001e8584db17.png?size=2048');
			try {
			await util.sendDeletableMessage(message.channel, { embed }, message.author);
			}   catch (err) {
				console.error(err);
			}
			return;
		} else {
			const embed = new Discord.RichEmbed()
				embed
				.setAuthor(message.author.tag, message.author.avatarURL)
				.setDescription(`${message.author}` + " Senpai, 已經為你跳過\n" + `**${serverQueue.songs[0].title}**` + "!")
				.setColor(0xcc0000)
				.setTitle('ReiNa Bot')
				.setURL("https://mcwind.tk")
				.setTimestamp()
				.setFooter('ReiNa By 一起來當馬猴燒酒吧 (>ω･* )ﾉ#9201', 'https://cdn.discordapp.com/avatars/418095978273570846/17c96d9ce6c135f7511a001e8584db17.png?size=2048');
			try {
			await util.sendDeletableMessage(message.channel, { embed }, message.author);
			}   catch (err) {
				console.error(err);
			}
			serverQueue.connection.dispatcher.end("");
			return undefined;
		}
	}

	if (cmd === `${prefix}loop`){
		message.delete();
		if (!message.member.voiceChannel){
			const embed = new Discord.RichEmbed()
			embed
			.setAuthor(message.author.tag, message.author.avatarURL)
			.setDescription(`${message.author}` + "你不在語音頻道呀!")
			.setColor(0xcc0000)
			.setTitle('ReiNa Bot')
			.setURL("https://mcwind.tk")
			.setTimestamp()
			.setFooter('ReiNa By 一起來當馬猴燒酒吧 (>ω･* )ﾉ#9201', 'https://cdn.discordapp.com/avatars/418095978273570846/17c96d9ce6c135f7511a001e8584db17.png?size=2048');
            try {
            await util.sendDeletableMessage(message.channel, { embed }, message.author);
		}   catch (err) {
            console.error(err);
        }
        return;
		}
		if (!serverQueue){
			const embed = new Discord.RichEmbed()
				embed
				.setAuthor(message.author.tag, message.author.avatarURL)
				.setDescription(`${message.author}` + " Senpai, 沒有在播放音樂, 所以沒有東西能循環播放哦!")
				.setColor(0xcc0000)
				.setTitle('ReiNa Bot')
				.setURL("https://mcwind.tk")
				.setTimestamp()
				.setFooter('ReiNa By 一起來當馬猴燒酒吧 (>ω･* )ﾉ#9201', 'https://cdn.discordapp.com/avatars/418095978273570846/17c96d9ce6c135f7511a001e8584db17.png?size=2048');
			try {
			await util.sendDeletableMessage(message.channel, { embed }, message.author);
			}   catch (err) {
				console.error(err);
			}
			return;
		} else {
			if(serverQueue.loop == false){
				const embed = new Discord.RichEmbed()
					embed
					.setAuthor(message.author.tag, message.author.avatarURL)
					.setDescription(`${message.author}` + " Senpai, 已經為你循環播放\n" + `**${serverQueue.songs[0].title}**` + "!")
					.setColor(0xcc0000)
					.setTitle('ReiNa Bot')
					.setURL("https://mcwind.tk")
					.setTimestamp()
					.setFooter('ReiNa By 一起來當馬猴燒酒吧 (>ω･* )ﾉ#9201', 'https://cdn.discordapp.com/avatars/418095978273570846/17c96d9ce6c135f7511a001e8584db17.png?size=2048');
				try {
					util.sendDeletableMessage(message.channel, { embed }, message.author);
				}   catch (err) {
					console.error(err);
				}
				serverQueue.loop = true;
				return undefined;
			}else{
				if(serverQueue.loop == true){
					const embed = new Discord.RichEmbed()
					embed
					.setAuthor(message.author.tag, message.author.avatarURL)
					.setDescription(`${message.author}` + " Senpai, 已經為你關閉循環播放\n" + `**${serverQueue.songs[0].title}**` + "!")
					.setColor(0xcc0000)
					.setTitle('ReiNa Bot')
					.setURL("https://mcwind.tk")
					.setTimestamp()
					.setFooter('ReiNa By 一起來當馬猴燒酒吧 (>ω･* )ﾉ#9201', 'https://cdn.discordapp.com/avatars/418095978273570846/17c96d9ce6c135f7511a001e8584db17.png?size=2048');
				try {
					util.sendDeletableMessage(message.channel, { embed }, message.author);
				}   catch (err) {
					console.error(err);
				}
				serverQueue.loop = false;
				return undefined;
				}
			}
		}
	}
	
	if (cmd === `${prefix}stop`){
		message.delete();
		if (!message.member.voiceChannel){
			const embed = new Discord.RichEmbed()
			embed
			.setAuthor(message.author.tag, message.author.avatarURL)
			.setDescription(`${message.author}` + "你不在語音頻道呀!")
			.setColor(0xcc0000)
			.setTitle('ReiNa Bot')
			.setURL("https://mcwind.tk")
			.setTimestamp()
			.setFooter('ReiNa By 一起來當馬猴燒酒吧 (>ω･* )ﾉ#9201', 'https://cdn.discordapp.com/avatars/418095978273570846/17c96d9ce6c135f7511a001e8584db17.png?size=2048');
            try {
            await util.sendDeletableMessage(message.channel, { embed }, message.author);
		}   catch (err) {
            console.error(err);
        }
        return;
		}
		if (!serverQueue){
			const embed = new Discord.RichEmbed()
				embed
				.setAuthor(message.author.tag, message.author.avatarURL)
				.setDescription(`💢${message.author}` + " Senpai, 沒有在播放音樂哦!")
				.setColor(0xcc0000)
				.setTitle('ReiNa Bot')
				.setURL("https://mcwind.tk")
				.setTimestamp()
				.setFooter('ReiNa By 一起來當馬猴燒酒吧 (>ω･* )ﾉ#9201', 'https://cdn.discordapp.com/avatars/418095978273570846/17c96d9ce6c135f7511a001e8584db17.png?size=2048');
			try {
			await util.sendDeletableMessage(message.channel, { embed }, message.author);
			}   catch (err) {
				console.error(err);
			}
			return;
		}
		serverQueue.songs = [];
		serverQueue.connection.dispatcher.end('');
		return undefined;
	}
	
	if (cmd === `${prefix}volume`){
		message.delete();
		if (!message.member.voiceChannel){
			const embed = new Discord.RichEmbed()
			embed
			.setAuthor(message.author.tag, message.author.avatarURL)
			.setDescription(`${message.author}` + "你不在語音頻道呀!")
			.setColor(0xcc0000)
			.setTitle('ReiNa Bot')
			.setURL("https://mcwind.tk")
			.setTimestamp()
			.setFooter('ReiNa By 一起來當馬猴燒酒吧 (>ω･* )ﾉ#9201', 'https://cdn.discordapp.com/avatars/418095978273570846/17c96d9ce6c135f7511a001e8584db17.png?size=2048');
            try {
            await util.sendDeletableMessage(message.channel, { embed }, message.author);
		}   catch (err) {
            console.error(err);
        }
        return;
		}
		if (!serverQueue){
			const embed = new Discord.RichEmbed()
				embed
				.setAuthor(message.author.tag, message.author.avatarURL)
				.setDescription(`💢${message.author}` + " Senpai, 沒有在播放音樂哦!")
				.setColor(0xcc0000)
				.setTitle('ReiNa Bot')
				.setURL("https://mcwind.tk")
				.setTimestamp()
				.setFooter('ReiNa By 一起來當馬猴燒酒吧 (>ω･* )ﾉ#9201', 'https://cdn.discordapp.com/avatars/418095978273570846/17c96d9ce6c135f7511a001e8584db17.png?size=2048');
			try {
			await util.sendDeletableMessage(message.channel, { embed }, message.author);
			}   catch (err) {
				console.error(err);
			}
			return;
		}
		if (!messageArray[1]){
			const embed = new Discord.RichEmbed()
				embed
				.setAuthor(message.author.tag, message.author.avatarURL)
				.setDescription(`${message.author}` + " Senpai, 現在的音量是:" + `**${serverQueue.volume}**`)
				.setColor(0xcc0000)
				.setTitle('ReiNa Bot')
				.setURL("https://mcwind.tk")
				.setTimestamp()
				.setFooter('ReiNa By 一起來當馬猴燒酒吧 (>ω･* )ﾉ#9201', 'https://cdn.discordapp.com/avatars/418095978273570846/17c96d9ce6c135f7511a001e8584db17.png?size=2048');
			try {
			await util.sendDeletableMessage(message.channel, { embed }, message.author);
			}   catch (err) {
				console.error(err);
			}
			return;
		} else {
		serverQueue.volume = messageArray[1];
		serverQueue.connection.dispatcher.setVolumeLogarithmic(messageArray[1] / 5);
		const embed = new Discord.RichEmbed()
			embed
			.setAuthor(message.author.tag, message.author.avatarURL)
			.setDescription(`${message.author}` + " 是的Senpai, 我把音量調整到: " + `**${messageArray[1]}**` + "了哦!")
			.setColor(0xcc0000)
			.setTitle('ReiNa Bot')
			.setURL("https://mcwind.tk")
			.setTimestamp()
			.setFooter('ReiNa By 一起來當馬猴燒酒吧 (>ω･* )ﾉ#9201', 'https://cdn.discordapp.com/avatars/418095978273570846/17c96d9ce6c135f7511a001e8584db17.png?size=2048');
		try {
		await util.sendDeletableMessage(message.channel, { embed }, message.author);
		}   catch (err) {
			console.error(err);
		}
		return;
		}
	}
	
	if (cmd === `${prefix}np`){
		message.delete();
		if (!serverQueue) {
			const embed = new Discord.RichEmbed()
				embed
				.setAuthor(message.author.tag, message.author.avatarURL)
				.setDescription(`💢${message.author}` + " Senpai, 沒有在播放音樂哦!")
				.setColor(0xcc0000)
				.setTitle('ReiNa Bot')
				.setURL("https://mcwind.tk")
				.setTimestamp()
				.setFooter('ReiNa By 一起來當馬猴燒酒吧 (>ω･* )ﾉ#9201', 'https://cdn.discordapp.com/avatars/418095978273570846/17c96d9ce6c135f7511a001e8584db17.png?size=2048');
			try {
			await util.sendDeletableMessage(message.channel, { embed }, message.author);
			}   catch (err) {
				console.error(err);
			}
			return;
		} else {
			const embed = new Discord.RichEmbed()
				embed
				.setAuthor(message.author.tag, message.author.avatarURL)
				.setDescription("\n" + `${message.author}` + "\n\n" + `🎶 現正播放: **${serverQueue.songs[0].title}**` + "\n\n如果Senpai想要網址的話, 我放在下面哦!\n" + `${serverQueue.songs[0].url}`)
				.setColor(0xcc0000)
				.setTitle('ReiNa Bot')
				.setURL("https://mcwind.tk")
				.setTimestamp()
				.setFooter('ReiNa By 一起來當馬猴燒酒吧 (>ω･* )ﾉ#9201', 'https://cdn.discordapp.com/avatars/418095978273570846/17c96d9ce6c135f7511a001e8584db17.png?size=2048');
			try {
			await util.sendDeletableMessage(message.channel, { embed }, message.author);
			}   catch (err) {
				console.error(err);
			}
			return;
		}
	}
	
	if (cmd === `${prefix}queue`) {
		message.delete();
		if (!serverQueue){
			const embed = new Discord.RichEmbed()
				embed
				.setAuthor(message.author.tag, message.author.avatarURL)
				.setDescription(`💢${message.author}` + " Senpai, 沒有在播放音樂哦!")
				.setColor(0xcc0000)
				.setTitle('ReiNa Bot')
				.setURL("https://mcwind.tk")
				.setTimestamp()
				.setFooter('ReiNa By 一起來當馬猴燒酒吧 (>ω･* )ﾉ#9201', 'https://cdn.discordapp.com/avatars/418095978273570846/17c96d9ce6c135f7511a001e8584db17.png?size=2048');
			try {
			await util.sendDeletableMessage(message.channel, { embed }, message.author);
			}   catch (err) {
				console.error(err);
			}
			return;
		} else {
			const embed = new Discord.RichEmbed()
				embed
				.setAuthor(message.author.tag, message.author.avatarURL)
				.setDescription("\n" + `${message.author}` + "\n因為Discord有限制信息最多只能有2048個字符, 所以我最多只會顯示25 首音樂哦!\n" + `__**歌曲列表:**__` + "\n" + `${serverQueue.songs.map(song => `⌛ ${song.title}`).slice(0, 25).join('\n')}` + "\n\n總共有:**" + serverQueue.songs.length + "**首音樂\n\n" + `**現正播放:** ${serverQueue.songs[0].title}`)
				.setColor(0xcc0000)
				.setTitle('ReiNa Bot')
				.setURL("https://mcwind.tk")
				.setTimestamp()
				.setFooter('ReiNa By 一起來當馬猴燒酒吧 (>ω･* )ﾉ#9201', 'https://cdn.discordapp.com/avatars/418095978273570846/17c96d9ce6c135f7511a001e8584db17.png?size=2048');

				if(serverQueue.loop == true){
					embed.addField("單曲循環播放", "*開啟*");
				}
				else{
					embed.addField("單曲循環播放", "*關閉*");
				}
			try {
			await util.sendDeletableMessage(message.channel, { embed }, message.author);
			}   catch (err) {
				console.error(err);
			}
			return;
		}
	}
	
	if (cmd === `${prefix}pause`) {
		message.delete();
		if (serverQueue && serverQueue.playing) {
			serverQueue.playing = false;
			serverQueue.connection.dispatcher.pause();
			const embed = new Discord.RichEmbed()
			embed
			.setAuthor(message.author.tag, message.author.avatarURL)
			.setDescription(`⏸${message.author}` + " Senpai, 已經為你暫停音樂!")
			.setColor(0xcc0000)
			.setTitle('ReiNa Bot')
			.setURL("https://mcwind.tk")
			.setTimestamp()
			.setFooter('ReiNa By 一起來當馬猴燒酒吧 (>ω･* )ﾉ#9201', 'https://cdn.discordapp.com/avatars/418095978273570846/17c96d9ce6c135f7511a001e8584db17.png?size=2048');
            try {
            await util.sendDeletableMessage(message.channel, { embed }, message.author);
		}   catch (err) {
            console.error(err);
        }
        return;
		} else {
		const embed = new Discord.RichEmbed()
			embed
			.setAuthor(message.author.tag, message.author.avatarURL)
			.setDescription(`💢${message.author}` + " Senpai, 沒有在播放音樂哦!")
			.setColor(0xcc0000)
			.setTitle('ReiNa Bot')
			.setURL("https://mcwind.tk")
			.setTimestamp()
			.setFooter('ReiNa By 一起來當馬猴燒酒吧 (>ω･* )ﾉ#9201', 'https://cdn.discordapp.com/avatars/418095978273570846/17c96d9ce6c135f7511a001e8584db17.png?size=2048');
        try {
        await util.sendDeletableMessage(message.channel, { embed }, message.author);
		}   catch (err) {
			console.error(err);
        }
		return;
		}
	}
	
	if (cmd === `${prefix}resume`) {
		message.delete();
		if (serverQueue && !serverQueue.playing) {
			serverQueue.playing = true;
			serverQueue.connection.dispatcher.resume();
			const embed = new Discord.RichEmbed()
			embed
			.setAuthor(message.author.tag, message.author.avatarURL)
			.setDescription(`▶${message.author}` + " Senpai, 已經為你繼續播放音樂!")
			.setColor(0xcc0000)
			.setTitle('ReiNa Bot')
			.setURL("https://mcwind.tk")
			.setTimestamp()
			.setFooter('ReiNa By 一起來當馬猴燒酒吧 (>ω･* )ﾉ#9201', 'https://cdn.discordapp.com/avatars/418095978273570846/17c96d9ce6c135f7511a001e8584db17.png?size=2048');
            try {
            await util.sendDeletableMessage(message.channel, { embed }, message.author);
		}   catch (err) {
            console.error(err);
        }
        return;
		} else {
		const embed = new Discord.RichEmbed()
			embed
			.setAuthor(message.author.tag, message.author.avatarURL)
			.setDescription(`💢${message.author}` + " Senpai, 沒有在播放音樂哦!")
			.setColor(0xcc0000)
			.setTitle('ReiNa Bot')
			.setURL("https://mcwind.tk")
			.setTimestamp()
			.setFooter('ReiNa By 一起來當馬猴燒酒吧 (>ω･* )ﾉ#9201', 'https://cdn.discordapp.com/avatars/418095978273570846/17c96d9ce6c135f7511a001e8584db17.png?size=2048');
        try {
        await util.sendDeletableMessage(message.channel, { embed }, message.author);
		}   catch (err) {
			console.error(err);
        }
		return;
		}
	}
	
	if (cmd === `${prefix}db`){
		message.delete();
		if (!message.member.voiceChannel){
			const embed = new Discord.RichEmbed()
			embed
			.setAuthor(message.author.tag, message.author.avatarURL)
			.setDescription(`${message.author}` + "你不在語音頻道呀!")
			.setColor(0xcc0000)
			.setTitle('ReiNa Bot')
			.setURL("https://mcwind.tk")
			.setTimestamp()
			.setFooter('ReiNa By 一起來當馬猴燒酒吧 (>ω･* )ﾉ#9201', 'https://cdn.discordapp.com/avatars/418095978273570846/17c96d9ce6c135f7511a001e8584db17.png?size=2048');
            try {
            await util.sendDeletableMessage(message.channel, { embed }, message.author);
		}   catch (err) {
            console.error(err);
        }
        return;
		}
		if (!serverQueue){
			const embed = new Discord.RichEmbed()
				embed
				.setAuthor(message.author.tag, message.author.avatarURL)
				.setDescription(`💢${message.author}` + " Senpai, 沒有在播放音樂哦!")
				.setColor(0xcc0000)
				.setTitle('ReiNa Bot')
				.setURL("https://mcwind.tk")
				.setTimestamp()
				.setFooter('ReiNa By 一起來當馬猴燒酒吧 (>ω･* )ﾉ#9201', 'https://cdn.discordapp.com/avatars/418095978273570846/17c96d9ce6c135f7511a001e8584db17.png?size=2048');
			try {
			await util.sendDeletableMessage(message.channel, { embed }, message.author);
			}   catch (err) {
				console.error(err);
			}
			return;
		}
		if (!messageArray[1]){
			const embed = new Discord.RichEmbed()
				embed
				.setAuthor(message.author.tag, message.author.avatarURL)
				.setDescription(`${message.author}` + " Senpai, 現在的分貝是:" + `**${serverQueue.volume}**`)
				.setColor(0xcc0000)
				.setTitle('ReiNa Bot')
				.setURL("https://mcwind.tk")
				.setTimestamp()
				.setFooter('ReiNa By 一起來當馬猴燒酒吧 (>ω･* )ﾉ#9201', 'https://cdn.discordapp.com/avatars/418095978273570846/17c96d9ce6c135f7511a001e8584db17.png?size=2048');
			try {
			await util.sendDeletableMessage(message.channel, { embed }, message.author);
			}   catch (err) {
				console.error(err);
			}
			return;
		} else {
		serverQueue.volume = messageArray[1];
		serverQueue.connection.dispatcher.setVolumeDecibels(messageArray[1] / 5);
		const embed = new Discord.RichEmbed()
			embed
			.setAuthor(message.author.tag, message.author.avatarURL)
			.setDescription(`${message.author}` + " 是的Senpai, 我把分貝調整到: " + `**${messageArray[1]}**` + "了哦!")
			.setColor(0xcc0000)
			.setTitle('ReiNa Bot')
			.setURL("https://mcwind.tk")
			.setTimestamp()
			.setFooter('ReiNa By 一起來當馬猴燒酒吧 (>ω･* )ﾉ#9201', 'https://cdn.discordapp.com/avatars/418095978273570846/17c96d9ce6c135f7511a001e8584db17.png?size=2048');
		try {
		await util.sendDeletableMessage(message.channel, { embed }, message.author);
		}   catch (err) {
			console.error(err);
		}
		return;
		}
	}
	
});


async function handleVideo(video, message, voiceChannel, playlist = false) {
	const serverQueue = queue.get(message.guild.id);
	const song = {
		id: video.id,
		title: Discord.escapeMarkdown(video.title),
		url: `https://www.youtube.com/watch?v=${video.id}`
	};
	if (!serverQueue) {
		const queueConstruct = {
			textChannel: message.channel,
			voiceChannel: voiceChannel,
			connection: null,
			songs: [],
			volume: 1.5,
			loop: false,
			playing: true
		};
		queue.set(message.guild.id, queueConstruct);

		queueConstruct.songs.push(song);

		try {
			var connection = await voiceChannel.join();
			queueConstruct.connection = connection;
			play(message.guild, queueConstruct.songs[0]);
		} catch (error) {
			queue.delete(message.guild.id);
			const embed = new Discord.RichEmbed()
			embed
			.setDescription("在進入語音頻道時發生錯誤! 嗚嗚嗚~\n\n\n**此信息將會在5秒後自動刪除**\n")
			.setColor(0xcc0000)
			.setTitle('ReiNa Bot 錯誤')
			.setURL("https://mcwind.tk")
			.setTimestamp()
			.setFooter('ReiNa By 一起來當馬猴燒酒吧 (>ω･* )ﾉ#9201', 'https://cdn.discordapp.com/avatars/418095978273570846/17c96d9ce6c135f7511a001e8584db17.png?size=2048');
			message.channel.send(embed)
			.then(message => {
				message.delete(5000);
			}).catch();
			return;
		}
	} else {
		serverQueue.songs.push(song);
		if (playlist) return undefined;
		else {
			const embed = new Discord.RichEmbed()
			embed
			.setDescription("✅ 將" + `**${song.title}**` + "加入到播放列表中!\n\n\n**此信息將會在5秒後自動刪除**\n")
			.setColor(0xcc0000)
			.setTitle('ReiNa Bot')
			.setURL("https://mcwind.tk")
			.setTimestamp()
			.setFooter('ReiNa By 一起來當馬猴燒酒吧 (>ω･* )ﾉ#9201', 'https://cdn.discordapp.com/avatars/418095978273570846/17c96d9ce6c135f7511a001e8584db17.png?size=2048');
			message.channel.send(embed)
			.then(message => {
			message.delete(5000);
			}).catch();
			return;
		}
	}
	return undefined;
}

function play(guild, song) {
	const serverQueue = queue.get(guild.id);

	if (!song) {
		const embed = new Discord.RichEmbed()
		embed
		.setDescription("各位Senpai, 全部音樂已經播放完畢, 這裡就沒有我的事情了 需要我的時候再叫我吧!\n\n\n**此信息將會在5秒後自動刪除**\n")
		.setColor(0xcc0000)
		.setTitle('ReiNa Bot')
		.setURL("https://mcwind.tk")
		.setTimestamp()
		.setFooter('ReiNa By 一起來當馬猴燒酒吧 (>ω･* )ﾉ#9201', 'https://cdn.discordapp.com/avatars/418095978273570846/17c96d9ce6c135f7511a001e8584db17.png?size=2048');
		serverQueue.textChannel.send(embed)
		.then(message => {
		message.delete(5000);
		}).catch();
		serverQueue.voiceChannel.leave();
		queue.delete(guild.id);
		bot.user.setPresence({ game: { name: 'rn!help | ReiNa Is Here! Nya~~~~' , type: 3 } });
		return;
	}

	const dispatcher = serverQueue.connection.playStream(ytdl(song.url))
		.on('end', reason => {
			if (reason === 'Stream is not generating quickly enough.');
			else console.log(reason);
			if(serverQueue.loop == "false"){serverQueue.songs.shift();}
			else {
				serverQueue.songs.unshift(serverQueue.songs[0]);
				serverQueue.songs.shift();
			}
			play(guild, serverQueue.songs[0]);
		})
		.on('error', error => console.error(error));
	dispatcher.setVolumeLogarithmic(serverQueue.volume / 5);
	
	const embed = new Discord.RichEmbed()
	.setDescription(`🎶 開始播放: **${song.title}**` + "\n\n\n**此信息將會在5秒後自動刪除**\n")
	.setColor(0xcc0000)
	.setTitle('ReiNa Bot')
	.setURL("https://mcwind.tk")
	.setTimestamp()
	.setFooter('ReiNa By 一起來當馬猴燒酒吧 (>ω･* )ﾉ#9201', 'https://cdn.discordapp.com/avatars/418095978273570846/17c96d9ce6c135f7511a001e8584db17.png?size=2048');
	serverQueue.textChannel.send(embed)
	.then(message => {
	message.delete(5000);
	}).catch();
	bot.user.setPresence({ game: { name: `正在播放: ${song.title}` , type: 2 } });
}

function CurrentTime() {
	request.get('http://worldtimeapi.org/api/timezone/Asia/Hong_Kong', {},
	function(error, response, rawHK){
		if(!error && response.statusCode == 200){
			var objHK = JSON.parse(rawHK);
			var timeHK = objHK.datetime;
			bot.channels.get("637758381792165908").setName("香港🕕" + timeHK.slice(11,13) + "：" + timeHK.slice(14,16) + "：" + timeHK.slice(17,19));
		}
		if(response === undefined || response.statusCode != 200){}
	});
	
	request.get('http://worldtimeapi.org/api/timezone/Asia/Tokyo', {},
	function(error, response, rawTK){
		if(!error && response.statusCode == 200){
			var objTK = JSON.parse(rawTK);
			var timeTK = objTK.datetime;
			bot.channels.get("637765304868405249").setName("東京🕕" + timeTK.slice(11,13) + "：" + timeTK.slice(14,16) + "：" + timeTK.slice(17,19));
		}
		if(response === undefined || response.statusCode != 200){}
	});
	
	request.get('http://worldtimeapi.org/api/timezone/Australia/Adelaide', {},
	function(error, response, rawAU){
		if(!error && response.statusCode == 200){
			var objAU = JSON.parse(rawAU);
			var timeAU = objAU.datetime;
			bot.channels.get("637766392770199694").setName("ＰＯ🕕" + timeAU.slice(11,13) + "：" + timeAU.slice(14,16) + "：" + timeAU.slice(17,19));
		}
		if(response === undefined || response.statusCode != 200){}
	});
}

function GuildAllUser() {
	bot.guilds.get("398062441516236800").fetchMembers().then(r => {
		let length = `${r.members.array().length}`;
		bot.channels.get("637870044763652136").setName("伺服器人數-" + `${length}`);
	});
}
