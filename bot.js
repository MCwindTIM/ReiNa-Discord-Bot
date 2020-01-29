	const botconfig = require("./botconfig.json");
	const fs = require('fs');
	const fsPath = require('fs-path');
	const Discord = require("discord.js");
	const YouTube = require('simple-youtube-api');
	const ytdl = require('ytdl-core');
	const bot = new Discord.Client({disableEveryone: true});
	bot.commands = new Discord.Collection();
	const util = require('./util.js');
	const youtube = new YouTube(botconfig.YoutubeAPI);
	const queue = new Map();
	const request = require("request");
	let timer = {};

	global.uptime = new Date().toString();

	const lv = require('./commands/lv.js');
	const nHentai = require('./commands/napi.js');
	const wnacg = require('./commands/wnacg.js');
	const rps = require('./commands/rps.js');
	const sync = require('./commands/sync.js');
	const sauce = require('./commands/sauce.js');
	const kokoro = require('./commands/kokoro.js');
	const poem = require('./commands/poem.js');

	process.title = 'ReiNaBot';
	process.on('unhandledRejection', e => {console.log(e)});
	process.on('uncaughtException', e => {console.log(e)});

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
			bot.commands.set(props.help.name, props, props.help.description, props.help.cate, props.help.show, props.help.page);
		});

	});

	let dir = './chatlog';
	if (!fs.existsSync(dir)){
	    fs.mkdirSync(dir);
	}

	bot.login(botconfig.token);

	bot.on('warn', async () => {
		console.warn;
	});
	bot.on('error', error => {
		console.error('The WebSocket encountered an error:', error);
	});
	bot.on("ready", async () => {
		console.log(`${bot.user.username} 上線!`);
	    console.log(`加入了 ${bot.guilds.size} 個伺服器.`);
		bot.user.setPresence({ game: { name: 'rn!help | ReiNa Is Here! Nya~~~~' , type: 3 } });
		try{
		CurrentTime();
		GuildAllUser();
		checkuserstatus();
		}
		catch(e){}
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
	setInterval(checkuserstatus, 15000);
	//let NY = setInterval(function(){checkNY(bot, NY)}, 5000);

	bot.on("message", async message => {
	  if(message.channel.type === "dm") return;
	  if (message.author.bot) return;
	  let prefix = botconfig.prefix;
	  let messageArray = message.content.split(" ");
	  let cmd = messageArray[0];
	  let args = messageArray.slice(1);
	  const searchString = messageArray.slice(1).join(' ');
	  const url = messageArray[1] ? messageArray[1].replace(/<(.+)>/g, '$1') : '';
	  const serverQueue = queue.get(message.guild.id);
	  const napiregex = /(?<=[\[{])(https?:\/\/nhentai\.net\/g\/)?(\d+)\/?.*?(?=[}\]])/gi;
	  const wnacgregex = /w(\d+)\/?.*?(?=[}\]])?(\d+)\/?/gi;
	  let commandfile = bot.commands.get(cmd.toLowerCase().slice(prefix.length));
	  if(commandfile) commandfile.run(bot,message,args);
	  if(message.guild) lv.run(bot,message,args);
	  if(message.content.match(napiregex)){nHentai.run(bot,message,args)}else{if(message.content.match(wnacgregex)){}else{if(message.channel.id === "655516899832233986"){message.delete()}}};
	  if(message.content.match(wnacgregex)){wnacg.run(bot,message,args)}else{if(message.content.match(napiregex)){}else{if(message.channel.id === "655516899832233986"){message.delete()}}};
	  if(message.content.startsWith('<:xscissors:647687182538113034>') || message.content.startsWith('<:xrock:647687152003579944>') || message.content.startsWith('<:xpaper:647687122727338015>')) rps.run(bot,message,args);
	  if(message.guild.id === '407171840746848258') sync.run(bot,message,args);
	  if(message.content.includes("pixiv.net") || message.attachments.size > 0) sauce.run(bot,message,args);

		if(message.mentions.users.has(bot.user.id))	{
			switch (getRandomInt(5)) {
				case 1:
					message.delete();
					util.sendDeletableMessage(message.channel, `${message.author}, owo?`, message.author);
					break;
				case 2:
					message.delete();
					util.sendDeletableMessage(message.channel, `${message.author}, uwu?`, message.author);
					break;
				case 3:
					message.delete();
					util.sendDeletableMessage(message.channel, `${message.author}, b...baka!`, message.author);
					break;
				case 4:
					kokoro.run(message);
					break;
				case 5:
					poem.run(message);
					break
			}
		}

		if(message.content.includes('discord.gg/'||'discordapp.com/invite/') && message.guild.id === '398062441516236800') {
			message.delete(); 
			const embed = new Discord.RichEmbed()
					embed
					.setAuthor(message.author.tag, message.author.avatarURL)
					.setDescription(`這裡不允許發送Discord邀請連結!`)
					.setColor(0xcc0000)
					.setTitle('ReiNa Bot')
					.setURL("https://mcwind.tk")
					.setTimestamp()
					.setFooter('ReiNa By 𝓖𝓻𝓪𝓷𝓭𝓞𝓹𝓮𝓻𝓪𝓽𝓸𝓻#9487', 'https://cdn.discordapp.com/avatars/418095978273570846/17c96d9ce6c135f7511a001e8584db17.png?size=2048');
			try {
				util.sendDeletableMessage(message.channel, { embed }, message.author);
					}   catch (err) {
				console.error(err);
			}
		}

		if (cmd === `${prefix}play`){
			let processtime = new Date().getTime();
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
					.setFooter('ReiNa By 𝓖𝓻𝓪𝓷𝓭𝓞𝓹𝓮𝓻𝓪𝓽𝓸𝓻#9487', 'https://cdn.discordapp.com/avatars/418095978273570846/17c96d9ce6c135f7511a001e8584db17.png?size=2048');
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
				.setFooter('ReiNa By 𝓖𝓻𝓪𝓷𝓭𝓞𝓹𝓮𝓻𝓪𝓽𝓸𝓻#9487', 'https://cdn.discordapp.com/avatars/418095978273570846/17c96d9ce6c135f7511a001e8584db17.png?size=2048');
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
				.setFooter('ReiNa By 𝓖𝓻𝓪𝓷𝓭𝓞𝓹𝓮𝓻𝓪𝓽𝓸𝓻#9487', 'https://cdn.discordapp.com/avatars/418095978273570846/17c96d9ce6c135f7511a001e8584db17.png?size=2048');
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
				let item = 0;
				for (const video of Object.values(videos)) {
					if(video.raw.status){
						item = item + 1;
						if (video.raw.status.privacyStatus === 'public'){
							const video2 = await youtube.getVideoByID(video.id);
							await handleVideo(video2, message, message.author.id, message.author.tag, voiceChannel, true);
						}else{
							if (video.raw.status.privacyStatus === 'unlisted'){
								const video2 = await youtube.getVideoByID(video.id);
								await handleVideo(video2, message, message.author.id, message.author.tag, voiceChannel, true);
							}else{
								if (video.raw.status.privacyStatus === 'private'){item = item -1}
							}
						}
					}
				}
				let playlistprocesstime = new Date().getTime();
				const embed = new Discord.RichEmbed()
				embed
				.setAuthor(message.author.tag, message.author.avatarURL)
				.setDescription("✅ 將整個播放清單: " + `**${playlist.title}**` + " 加入到播放列表中!" + "\n\n此播放清單共加入" + item + "首音樂!" + "\n\n\n**此信息將會在5秒後自動刪除**\n"+ `\n\n載入耗時: ${(playlistprocesstime - processtime) / 1000}秒.`)
				.setColor(0xcc0000)
				.setTitle('ReiNa Bot')
				.setURL("https://mcwind.tk")
				.setTimestamp()
				.setFooter('ReiNa By 𝓖𝓻𝓪𝓷𝓭𝓞𝓹𝓮𝓻𝓪𝓽𝓸𝓻#9487', 'https://cdn.discordapp.com/avatars/418095978273570846/17c96d9ce6c135f7511a001e8584db17.png?size=2048');
				message.channel.send(embed).then(function(message){
				message.delete(5000).catch(console.error);
				}).catch(function(err){
				throw err;
				});
				return;
			} else {
				try {
					var video = await youtube.getVideo(url);
				} catch (error) {
					try {
						var videos = await youtube.searchVideos(searchString, 15);
						let index = 0;
						const embed = new Discord.RichEmbed()
						embed
						.setAuthor(message.author.tag, message.author.avatarURL)
						.setDescription(`${message.author}` + "\n**歌曲選擇:**\n" + `${videos.map(video2 => `**${++index} -** ${video2.title}`).join('\n')}` + "\n\n請Senpai在1到15號結果中選擇想播放的音樂哦!\n\n")
						.setColor(0xcc0000)
						.setTitle('ReiNa Bot')
						.setURL("https://mcwind.tk")
						.setTimestamp()
						.setFooter('ReiNa By 𝓖𝓻𝓪𝓷𝓭𝓞𝓹𝓮𝓻𝓪𝓽𝓸𝓻#9487', 'https://cdn.discordapp.com/avatars/418095978273570846/17c96d9ce6c135f7511a001e8584db17.png?size=2048');
						util.sendDeletableMessage(message.channel, { embed }, message.author);
						try {
							var response = await message.channel.awaitMessages(message2 => message2.content > 0 && message2.content < 16, {
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
							.setFooter('ReiNa By 𝓖𝓻𝓪𝓷𝓭𝓞𝓹𝓮𝓻𝓪𝓽𝓸𝓻#9487', 'https://cdn.discordapp.com/avatars/418095978273570846/17c96d9ce6c135f7511a001e8584db17.png?size=2048');
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
						.setFooter('ReiNa By 𝓖𝓻𝓪𝓷𝓭𝓞𝓹𝓮𝓻𝓪𝓽𝓸𝓻#9487', 'https://cdn.discordapp.com/avatars/418095978273570846/17c96d9ce6c135f7511a001e8584db17.png?size=2048');
						util.sendDeletableMessage(message.channel, { embed }, message.author);
						return;
					}
				}
				return handleVideo(video, message, message.author.id, message.author.tag, voiceChannel);
			}
		}

		if (cmd === `${prefix}shuffle`){
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
				.setFooter('ReiNa By 𝓖𝓻𝓪𝓷𝓭𝓞𝓹𝓮𝓻𝓪𝓽𝓸𝓻#9487', 'https://cdn.discordapp.com/avatars/418095978273570846/17c96d9ce6c135f7511a001e8584db17.png?size=2048');
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
					.setDescription(`${message.author}` + " Senpai, 沒有在播放音樂, 所以沒有東西能隨機排列哦!")
					.setColor(0xcc0000)
					.setTitle('ReiNa Bot')
					.setURL("https://mcwind.tk")
					.setTimestamp()
					.setFooter('ReiNa By 𝓖𝓻𝓪𝓷𝓭𝓞𝓹𝓮𝓻𝓪𝓽𝓸𝓻#9487', 'https://cdn.discordapp.com/avatars/418095978273570846/17c96d9ce6c135f7511a001e8584db17.png?size=2048');
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
					.setDescription(`${message.author}` + " Senpai, 已經為你隨機排列播放清單" + `!\n\n${serverQueue.voiceChannel.name}`)
					.setColor(0xcc0000)
					.setTitle('ReiNa Bot')
					.setURL("https://mcwind.tk")
					.setTimestamp()
					.setFooter('ReiNa By 𝓖𝓻𝓪𝓷𝓭𝓞𝓹𝓮𝓻𝓪𝓽𝓸𝓻#9487', 'https://cdn.discordapp.com/avatars/418095978273570846/17c96d9ce6c135f7511a001e8584db17.png?size=2048');
				try {
				await util.sendDeletableMessage(message.channel, { embed }, message.author);
				}   catch (err) {
					console.error(err);
				}
				let nowplaying = serverQueue.songs[0];
				serverQueue.songs.shift();
				serverQueue.songs = shuffle(serverQueue.songs);
				serverQueue.songs.unshift(nowplaying);
				return undefined;
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
				.setFooter('ReiNa By 𝓖𝓻𝓪𝓷𝓭𝓞𝓹𝓮𝓻𝓪𝓽𝓸𝓻#9487', 'https://cdn.discordapp.com/avatars/418095978273570846/17c96d9ce6c135f7511a001e8584db17.png?size=2048');
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
					.setFooter('ReiNa By 𝓖𝓻𝓪𝓷𝓭𝓞𝓹𝓮𝓻𝓪𝓽𝓸𝓻#9487', 'https://cdn.discordapp.com/avatars/418095978273570846/17c96d9ce6c135f7511a001e8584db17.png?size=2048');
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
					.setDescription(`${message.author}` + " Senpai, 已經為你跳過\n" + `**${serverQueue.songs[0].title}** --由<@${serverQueue.songs[0].authorid}>添加` + `!\n\n語音頻道: ${serverQueue.songs[0].guildtag}的${serverQueue.voiceChannel.name}`)
					.setColor(0xcc0000)
					.setTitle('ReiNa Bot')
					.setURL("https://mcwind.tk")
					.setTimestamp()
					.setFooter('ReiNa By 𝓖𝓻𝓪𝓷𝓭𝓞𝓹𝓮𝓻𝓪𝓽𝓸𝓻#9487', 'https://cdn.discordapp.com/avatars/418095978273570846/17c96d9ce6c135f7511a001e8584db17.png?size=2048');
				try {
				await util.sendDeletableMessage(message.channel, { embed }, message.author);
				}   catch (err) {
					console.error(err);
				}
				serverQueue.connection.dispatcher.end("");
				return undefined;
			}
		}

		if (cmd === `${prefix}playnow`){
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
				.setFooter('ReiNa By 𝓖𝓻𝓪𝓷𝓭𝓞𝓹𝓮𝓻𝓪𝓽𝓸𝓻#9487', 'https://cdn.discordapp.com/avatars/418095978273570846/17c96d9ce6c135f7511a001e8584db17.png?size=2048');
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
					.setDescription(`${message.author}` + " Senpai, 沒有在播放音樂, 所以沒有東西能優先播放哦!")
					.setColor(0xcc0000)
					.setTitle('ReiNa Bot')
					.setURL("https://mcwind.tk")
					.setTimestamp()
					.setFooter('ReiNa By 𝓖𝓻𝓪𝓷𝓭𝓞𝓹𝓮𝓻𝓪𝓽𝓸𝓻#9487', 'https://cdn.discordapp.com/avatars/418095978273570846/17c96d9ce6c135f7511a001e8584db17.png?size=2048');
				try {
				await util.sendDeletableMessage(message.channel, { embed }, message.author);
				}   catch (err) {
					console.error(err);
				}
				return;
			} else {
				let lastsong = serverQueue.songs[serverQueue.songs.length - 1];
				let before = serverQueue.songs[0];
				serverQueue.songs.pop();
				serverQueue.songs.unshift(lastsong);
				serverQueue.songs.unshift(before);
				serverQueue.connection.dispatcher.end("");
					const embed = new Discord.RichEmbed()
						embed
						.setAuthor(message.author.tag, message.author.avatarURL)
						.setDescription(`${message.author}` + " Senpai, 已經為你優先播放\n" + `<@${serverQueue.songs[0].authorid}>添加的**${serverQueue.songs[0].title}**` + "!")
						.setColor(0xcc0000)
						.setTitle('ReiNa Bot')
						.setURL("https://mcwind.tk")
						.setTimestamp()
						.setFooter('ReiNa By 𝓖𝓻𝓪𝓷𝓭𝓞𝓹𝓮𝓻𝓪𝓽𝓸𝓻#9487', 'https://cdn.discordapp.com/avatars/418095978273570846/17c96d9ce6c135f7511a001e8584db17.png?size=2048');
					try {
						util.sendDeletableMessage(message.channel, { embed }, message.author);
					}   catch (err) {
						console.error(err);
					}
					let looping = '';
					if(serverQueue.loop == true){looping = "開啟"}
					if(serverQueue.loop == false){looping = "關閉"}
					bot.user.setPresence({ game: { name: `正在播放: ${serverQueue.songs[0].title} 由 ${serverQueue.songs[0].authortag} 在 ${serverQueue.songs[0].guildtag}-${serverQueue.voiceChannel.name} 添加, ||[單曲循環播放: ${looping}]||` , type: 2 } });
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
				.setFooter('ReiNa By 𝓖𝓻𝓪𝓷𝓭𝓞𝓹𝓮𝓻𝓪𝓽𝓸𝓻#9487', 'https://cdn.discordapp.com/avatars/418095978273570846/17c96d9ce6c135f7511a001e8584db17.png?size=2048');
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
					.setFooter('ReiNa By 𝓖𝓻𝓪𝓷𝓭𝓞𝓹𝓮𝓻𝓪𝓽𝓸𝓻#9487', 'https://cdn.discordapp.com/avatars/418095978273570846/17c96d9ce6c135f7511a001e8584db17.png?size=2048');
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
						.setDescription(`${message.author}` + " Senpai, 已經為你循環播放\n" + `<@${serverQueue.songs[0].authorid}>添加的**${serverQueue.songs[0].title}**` + `!\n\n語音頻道: ${serverQueue.songs[0].guildtag}的${serverQueue.voiceChannel.name}`)
						.setColor(0xcc0000)
						.setTitle('ReiNa Bot')
						.setURL("https://mcwind.tk")
						.setTimestamp()
						.setFooter('ReiNa By 𝓖𝓻𝓪𝓷𝓭𝓞𝓹𝓮𝓻𝓪𝓽𝓸𝓻#9487', 'https://cdn.discordapp.com/avatars/418095978273570846/17c96d9ce6c135f7511a001e8584db17.png?size=2048');
					try {
						await util.sendDeletableMessage(message.channel, { embed }, message.author);
					}   catch (err) {
						console.error(err);
					}
					serverQueue.loop = true;
					bot.user.setPresence({ game: { name: `正在播放: ${serverQueue.songs[0].title} 由 ${serverQueue.songs[0].authortag} 在 ${serverQueue.songs[0].guildtag}的${serverQueue.voiceChannel.name} 添加, ||[單曲循環播放: 開啟]||` , type: 2 } });
					return undefined;
				}else{
					if(serverQueue.loop == true){
						const embed = new Discord.RichEmbed()
						embed
						.setAuthor(message.author.tag, message.author.avatarURL)
						.setDescription(`${message.author}` + " Senpai, 已經為你關閉循環播放\n" + `<@${serverQueue.songs[0].authorid}>添加的**${serverQueue.songs[0].title}**` + `!\n\n語音頻道: ${serverQueue.songs[0].guildtag}的${serverQueue.voiceChannel.name}`)
						.setColor(0xcc0000)
						.setTitle('ReiNa Bot')
						.setURL("https://mcwind.tk")
						.setTimestamp()
						.setFooter('ReiNa By 𝓖𝓻𝓪𝓷𝓭𝓞𝓹𝓮𝓻𝓪𝓽𝓸𝓻#9487', 'https://cdn.discordapp.com/avatars/418095978273570846/17c96d9ce6c135f7511a001e8584db17.png?size=2048');
					try {
						await util.sendDeletableMessage(message.channel, { embed }, message.author);
					}   catch (err) {
						console.error(err);
					}
					serverQueue.loop = false;
					bot.user.setPresence({ game: { name: `正在播放: ${serverQueue.songs[0].title} 由 ${serverQueue.songs[0].authortag} 在 ${serverQueue.songs[0].guildtag}的${serverQueue.voiceChannel.name} 添加, ||[單曲循環播放: 關閉]||` , type: 2 } });
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
				.setFooter('ReiNa By 𝓖𝓻𝓪𝓷𝓭𝓞𝓹𝓮𝓻𝓪𝓽𝓸𝓻#9487', 'https://cdn.discordapp.com/avatars/418095978273570846/17c96d9ce6c135f7511a001e8584db17.png?size=2048');
		    try {
		    await util.sendDeletableMessage(message.channel, { embed }, message.author);
			}   catch (err) {}
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
					.setFooter('ReiNa By 𝓖𝓻𝓪𝓷𝓭𝓞𝓹𝓮𝓻𝓪𝓽𝓸𝓻#9487', 'https://cdn.discordapp.com/avatars/418095978273570846/17c96d9ce6c135f7511a001e8584db17.png?size=2048');
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
				.setFooter('ReiNa By 𝓖𝓻𝓪𝓷𝓭𝓞𝓹𝓮𝓻𝓪𝓽𝓸𝓻#9487', 'https://cdn.discordapp.com/avatars/418095978273570846/17c96d9ce6c135f7511a001e8584db17.png?size=2048');
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
					.setFooter('ReiNa By 𝓖𝓻𝓪𝓷𝓭𝓞𝓹𝓮𝓻𝓪𝓽𝓸𝓻#9487', 'https://cdn.discordapp.com/avatars/418095978273570846/17c96d9ce6c135f7511a001e8584db17.png?size=2048');
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
					.setFooter('ReiNa By 𝓖𝓻𝓪𝓷𝓭𝓞𝓹𝓮𝓻𝓪𝓽𝓸𝓻#9487', 'https://cdn.discordapp.com/avatars/418095978273570846/17c96d9ce6c135f7511a001e8584db17.png?size=2048');
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
				.setFooter('ReiNa By 𝓖𝓻𝓪𝓷𝓭𝓞𝓹𝓮𝓻𝓪𝓽𝓸𝓻#9487', 'https://cdn.discordapp.com/avatars/418095978273570846/17c96d9ce6c135f7511a001e8584db17.png?size=2048');
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
					.setFooter('ReiNa By 𝓖𝓻𝓪𝓷𝓭𝓞𝓹𝓮𝓻𝓪𝓽𝓸𝓻#9487', 'https://cdn.discordapp.com/avatars/418095978273570846/17c96d9ce6c135f7511a001e8584db17.png?size=2048');
				try {
				await util.sendDeletableMessage(message.channel, { embed }, message.author);
				}   catch (err) {
					console.error(err);
				}
				return;
			} else {
				let playtime = Date.now() - timer[message.guild.id];
				h = Math.floor(playtime / 3600000);
				if (h < 10) h = "0" + h;
				playtime = playtime % 3600000;
				m = Math.floor(playtime / 60000);
				if (m < 10) m = "0" + m;
				playtime = playtime % 60000;
				s = Math.floor(playtime / 1000);
				if (s < 10) s = "0" + s;
				playtime = playtime % 1000;
				if (playtime < 10) playtime = "0" + playtime;
				const embed = new Discord.RichEmbed()
					embed
					.setAuthor(message.author.tag, message.author.avatarURL)
					.setDescription("\n" + `${message.author}` + "\n\n" + `🎶 現正播放: <@${serverQueue.songs[0].authorid}>添加的**${serverQueue.songs[0].title}** ${h}:${m}:${s}/${serverQueue.songs[0].length}\n\n語音頻道: ${serverQueue.songs[0].guildtag}的${serverQueue.voiceChannel.name}` + "\n\n如果Senpai想要網址的話, 我放在下面哦!\n" + `${serverQueue.songs[0].url}`)
					.setColor(0xcc0000)
					.setTitle('ReiNa Bot')
					.setURL("https://mcwind.tk")
					.setTimestamp()
					.setFooter('ReiNa By 𝓖𝓻𝓪𝓷𝓭𝓞𝓹𝓮𝓻𝓪𝓽𝓸𝓻#9487', 'https://cdn.discordapp.com/avatars/418095978273570846/17c96d9ce6c135f7511a001e8584db17.png?size=2048');
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
					.setFooter('ReiNa By 𝓖𝓻𝓪𝓷𝓭𝓞𝓹𝓮𝓻𝓪𝓽𝓸𝓻#9487', 'https://cdn.discordapp.com/avatars/418095978273570846/17c96d9ce6c135f7511a001e8584db17.png?size=2048');
				try {
				await util.sendDeletableMessage(message.channel, { embed }, message.author);
				}   catch (err) {
					console.error(err);
				}
				return;
			} else {
				let playtime = Date.now() - timer[message.guild.id];
				h = Math.floor(playtime / 3600000);
				if (h < 10) h = "0" + h;
				playtime = playtime % 3600000;
				m = Math.floor(playtime / 60000);
				if (m < 10) m = "0" + m;
				playtime = playtime % 60000;
				s = Math.floor(playtime / 1000);
				if (s < 10) s = "0" + s;
				playtime = playtime % 1000;
				if (playtime < 10) playtime = "0" + playtime;
				const embed = new Discord.RichEmbed()
					embed
					.setAuthor(message.author.tag, message.author.avatarURL)
					.setDescription("\n" + `${message.author}` + "\n因為Discord有限制信息最多只能有1024個字符, 所以我最多只會顯示15 首音樂哦!\n" + `__**歌曲列表:**__` + "\n" + `${serverQueue.songs.map(song => `⌛ <@${song.authorid}>添加的${song.title} ${song.length}`).slice(0, 15).join('\n')}` + "\n\n總共有:**" + serverQueue.songs.length + "**首音樂\n\n" + `**現正播放:** ${serverQueue.songs[0].title}\n${h}:${m}:${s}/${serverQueue.songs[0].length}\n\n語音頻道: ${serverQueue.songs[0].guildtag}的${serverQueue.voiceChannel.name}`)
					.setColor(0xcc0000)
					.setTitle('ReiNa Bot')
					.setURL("https://mcwind.tk")
					.setTimestamp()
					.setFooter('ReiNa By 𝓖𝓻𝓪𝓷𝓭𝓞𝓹𝓮𝓻𝓪𝓽𝓸𝓻#9487', 'https://cdn.discordapp.com/avatars/418095978273570846/17c96d9ce6c135f7511a001e8584db17.png?size=2048');

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
				serverQueue.connection.dispatcher.pause(true);
				const embed = new Discord.RichEmbed()
				embed
				.setAuthor(message.author.tag, message.author.avatarURL)
				.setDescription(`⏸${message.author}` + ` Senpai, 已經為你暫停音樂!\n\n語音頻道: ${serverQueue.voiceChannel.name}`)
				.setColor(0xcc0000)
				.setTitle('ReiNa Bot')
				.setURL("https://mcwind.tk")
				.setTimestamp()
				.setFooter('ReiNa By 𝓖𝓻𝓪𝓷𝓭𝓞𝓹𝓮𝓻𝓪𝓽𝓸𝓻#9487', 'https://cdn.discordapp.com/avatars/418095978273570846/17c96d9ce6c135f7511a001e8584db17.png?size=2048');
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
				.setFooter('ReiNa By 𝓖𝓻𝓪𝓷𝓭𝓞𝓹𝓮𝓻𝓪𝓽𝓸𝓻#9487', 'https://cdn.discordapp.com/avatars/418095978273570846/17c96d9ce6c135f7511a001e8584db17.png?size=2048');
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
				.setDescription(`▶${message.author}` + ` Senpai, 已經為你繼續播放音樂!\n\n語音頻道: ${serverQueue.voiceChannel.name}`)
				.setColor(0xcc0000)
				.setTitle('ReiNa Bot')
				.setURL("https://mcwind.tk")
				.setTimestamp()
				.setFooter('ReiNa By 𝓖𝓻𝓪𝓷𝓭𝓞𝓹𝓮𝓻𝓪𝓽𝓸𝓻#9487', 'https://cdn.discordapp.com/avatars/418095978273570846/17c96d9ce6c135f7511a001e8584db17.png?size=2048');
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
				.setFooter('ReiNa By 𝓖𝓻𝓪𝓷𝓭𝓞𝓹𝓮𝓻𝓪𝓽𝓸𝓻#9487', 'https://cdn.discordapp.com/avatars/418095978273570846/17c96d9ce6c135f7511a001e8584db17.png?size=2048');
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
				.setFooter('ReiNa By 𝓖𝓻𝓪𝓷𝓭𝓞𝓹𝓮𝓻𝓪𝓽𝓸𝓻#9487', 'https://cdn.discordapp.com/avatars/418095978273570846/17c96d9ce6c135f7511a001e8584db17.png?size=2048');
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
					.setFooter('ReiNa By 𝓖𝓻𝓪𝓷𝓭𝓞𝓹𝓮𝓻𝓪𝓽𝓸𝓻#9487', 'https://cdn.discordapp.com/avatars/418095978273570846/17c96d9ce6c135f7511a001e8584db17.png?size=2048');
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
					.setFooter('ReiNa By 𝓖𝓻𝓪𝓷𝓭𝓞𝓹𝓮𝓻𝓪𝓽𝓸𝓻#9487', 'https://cdn.discordapp.com/avatars/418095978273570846/17c96d9ce6c135f7511a001e8584db17.png?size=2048');
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
				.setFooter('ReiNa By 𝓖𝓻𝓪𝓷𝓭𝓞𝓹𝓮𝓻𝓪𝓽𝓸𝓻#9487', 'https://cdn.discordapp.com/avatars/418095978273570846/17c96d9ce6c135f7511a001e8584db17.png?size=2048');
			try {
			await util.sendDeletableMessage(message.channel, { embed }, message.author);
			}   catch (err) {
				console.error(err);
			}
			return;
			}
		}

		if(!message.author.bot){
		createFile(`./chatlog/${message.guild.id}/${message.channel.id}.log`, message);
		}
	});

	bot.on('messageUpdate', function(oldMessage, newMessage){
		if(oldMessage.channel.type === "dm" || newMessage.channel.type === "dm") return;
		let log_date_ob = new Date();
		let log_date = ("0" + log_date_ob.getDate()).slice(-2);
		let log_year = log_date_ob.getFullYear();
		let log_month = ("0" + (log_date_ob.getMonth() + 1)).slice(-2);
		let log_minutes = log_date_ob.getMinutes();
		let log_seconds = log_date_ob.getSeconds();
		let log_hours = log_date_ob.getHours();
		let tStamp = log_year + "-" + log_month + "-" + log_date + " " + log_hours + ":" + log_minutes + ":" + log_seconds;

		try{
			fs.readFile(`./chatlog/${oldMessage.guild.id}/${oldMessage.channel.id}.log`, {encoding: 'utf-8'}, function(err,data){
				if (!err){
				fsPath.writeFile(`./chatlog/${oldMessage.guild.id}/${oldMessage.channel.id}.log`, data + `-----修改信息-----------\n用戶名稱: ${oldMessage.author.tag}\n用戶ID: ${oldMessage.author.id}\n信息內容: ${oldMessage.content}\n新信息內容: ${newMessage.content}\n記錄時間: ${tStamp}\n--------------------\n|\n`, function(err){
				if(err){throw err;}else{}});
				}else{
				fsPath.writeFile(`./chatlog/${oldMessage.guild.id}/${oldMessage.channel.id}.log`, `-----修改信息-----------\n用戶名稱: ${oldMessage.author.tag}\n用戶ID: ${oldMessage.author.id}\n信息內容: ${oldMessage.content}\n新信息內容: ${newMessage.content}\n記錄時間: ${tStamp}\n--------------------\n|\n`, function(err){
				if(err){throw err;}else{}});
				}
			});

		}
		catch(e){
			console.log(e)
		}

	});

	function createFile(file, message) {
		let log_date_ob = new Date();
		let log_date = ("0" + log_date_ob.getDate()).slice(-2);
		let log_year = log_date_ob.getFullYear();
		let log_month = ("0" + (log_date_ob.getMonth() + 1)).slice(-2);
		let log_minutes = log_date_ob.getMinutes();
		let log_seconds = log_date_ob.getSeconds();
		let log_hours = log_date_ob.getHours();
		let tStamp = log_year + "-" + log_month + "-" + log_date + " " + log_hours + ":" + log_minutes + ":" + log_seconds;

		try{
			fs.readFile(file, {encoding: 'utf-8'}, function(err,data){
				if (!err){
				fsPath.writeFile(file, data + `-----發送信息-----------\n用戶名稱: ${message.author.tag}\n用戶ID: ${message.author.id}\n信息內容: ${message.content}\n記錄時間: ${tStamp}\n--------------------\n|\n`, function(err){
				if(err){throw err;}else{}});
				}else{
				fsPath.writeFile(file, `-----發送信息-----------\n用戶名稱: ${message.author.tag}\n用戶ID: ${message.author.id}\n信息內容: ${message.content}\n記錄時間: ${tStamp}\n--------------------\n|\n`, function(err){
				if(err){throw err;}else{}});
				}
			});

		}
		catch(e){}
	}

	async function handleVideo(video, message, songAuthorid, songAuthortag, voiceChannel, playlist = false) {
		const serverQueue = queue.get(message.guild.id);
		let vdh = video.duration.hours;
		let vdm = video.duration.minutes;
		let vds = video.duration.seconds;
		if (vdh < 10) vdh = "0" + vdh;
		if (vdm < 10) vdm = "0" + vdm;
		if (vds < 10) vds = "0" + vds;

		const song = {
			id: video.id,
			title: Discord.escapeMarkdown(video.title),
			url: `https://www.youtube.com/watch?v=${video.id}`,
			length: `${vdh}:${vdm}:${vds}`,
			authorid:songAuthorid,
			authortag: songAuthortag,
			guildtag: message.guild.name
		};
		if (!serverQueue) {
			const queueConstruct = {
				textChannel: message.channel,
				voiceChannel: voiceChannel,
				connection: null,
				songs: [],
				volume: 1,
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
				.setFooter('ReiNa By 𝓖𝓻𝓪𝓷𝓭𝓞𝓹𝓮𝓻𝓪𝓽𝓸𝓻#9487', 'https://cdn.discordapp.com/avatars/418095978273570846/17c96d9ce6c135f7511a001e8584db17.png?size=2048');
				message.channel.send(embed)
				.then(message => {
					message.delete(5000).catch(console.error);
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
				.setFooter('ReiNa By 𝓖𝓻𝓪𝓷𝓭𝓞𝓹𝓮𝓻𝓪𝓽𝓸𝓻#9487', 'https://cdn.discordapp.com/avatars/418095978273570846/17c96d9ce6c135f7511a001e8584db17.png?size=2048');
				message.channel.send(embed)
				.then(message => {
				message.delete(5000).catch(console.error);
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
			.setFooter('ReiNa By 𝓖𝓻𝓪𝓷𝓭𝓞𝓹𝓮𝓻𝓪𝓽𝓸𝓻#9487', 'https://cdn.discordapp.com/avatars/418095978273570846/17c96d9ce6c135f7511a001e8584db17.png?size=2048');
			serverQueue.textChannel.send(embed)
			.then(message => {
			message.delete(5000).catch(console.error);
			}).catch();
			serverQueue.voiceChannel.leave();
			queue.delete(guild.id);
			bot.user.setPresence({ game: { name: 'rn!help | ReiNa Is Here! Nya~~~~' , type: 3 } });
			try{delete timer[guild.id]}catch(e){};
			return;
		}

		const dispatcher = serverQueue.connection.playStream(ytdl(song.url))
			.on('end', end => {
				if(serverQueue.loop == false){serverQueue.songs.shift();}
				else {
					if(serverQueue.loop == true){
						serverQueue.songs.unshift(serverQueue.songs[0]);
						serverQueue.songs.shift();
					}
				}
				play(guild, serverQueue.songs[0]);
				timer[guild.id] = Date.now();
			})
			.on('error', error => console.log(error));
		dispatcher.setVolumeLogarithmic(serverQueue.volume / 5);

		const embed = new Discord.RichEmbed()
		.setDescription(`🎶 開始播放: <@${song.authorid}>添加的**${song.title}**\n\n語音頻道: **${serverQueue.songs[0].guildtag}的${serverQueue.voiceChannel.name}**` + "\n\n\n**此信息將會在5秒後自動刪除**\n")
		.setColor(0xcc0000)
		.setTitle('ReiNa Bot')
		.setURL("https://mcwind.tk")
		.setTimestamp()
		.setFooter('ReiNa By 𝓖𝓻𝓪𝓷𝓭𝓞𝓹𝓮𝓻𝓪𝓽𝓸𝓻#9487', 'https://cdn.discordapp.com/avatars/418095978273570846/17c96d9ce6c135f7511a001e8584db17.png?size=2048');
		serverQueue.textChannel.send(embed)
		.then(message => {
		message.delete(5000).catch(console.error);
		}).catch();
		let looping = '';
		if(serverQueue.loop == true){looping = "開啟"}
		if(serverQueue.loop == false){looping = "關閉"}
		bot.user.setPresence({ game: { name: `正在播放: ${song.title} 由 ${song.authortag} 在 ${serverQueue.songs[0].guildtag}的${serverQueue.voiceChannel.name} 添加, ||[單曲循環播放: ${looping}]||` , type: 2 } });
		
		timer[guild.id] = Date.now();
	}

	let numchars = {'0':'𝟬','1':'𝟭','2':'𝟮','3':'𝟯','4':'𝟰','5':'𝟱','6':'𝟲','7':'𝟳','8':'𝟴','9':'𝟵'};

	function CurrentTime() {
		try{
		request.get('http://worldtimeapi.org/api/timezone/Asia/Hong_Kong', {},
		async function(error, response, rawHK){
			if(error){console.log(error)}
			if(!error && response.statusCode == 200){
				var objHK = JSON.parse(rawHK);
				var timeHK = objHK.datetime;
				var hkh = timeHK.slice(11,13).toString().replace(/[0123456789]/g, m=> numchars[m]);
				var hkm = timeHK.slice(14,16).toString().replace(/[0123456789]/g, m=> numchars[m]);
				var hks = timeHK.slice(17,19).toString().replace(/[0123456789]/g, m=> numchars[m]);
				try{
				await bot.channels.get("655499386591248384").setName("﹥ 𝓗𝓚🕕: " + hkh + ":" + hkm + ":" + hks);
				await bot.channels.get("670914685352280064").setName("現時時間🕕: " + hkh + ":" + hkm + ":" + hks);
				}catch(e){console.log(e)}
			}
			if(response === undefined || response.statusCode != 200){}
		});

		request.get('http://worldtimeapi.org/api/timezone/Asia/Tokyo', {},
		async function(error, response, rawTK){
			if(error){console.log(error)}
			if(!error && response.statusCode == 200){
				var objTK = JSON.parse(rawTK);
				var timeTK = objTK.datetime;
				var tkh = timeTK.slice(11,13).toString().replace(/[0123456789]/g, m=> numchars[m]);
				var tkm = timeTK.slice(14,16).toString().replace(/[0123456789]/g, m=> numchars[m]);
				var tks = timeTK.slice(17,19).toString().replace(/[0123456789]/g, m=> numchars[m]);
				try{
				await bot.channels.get("660828847096201238").setName("﹥ 𝓙𝓟🕕: " + tkh + ":" + tkm + ":" + tks);
				}catch(e){}
			}
			if(response === undefined || response.statusCode != 200){}
		});
		}catch(e){}
	}

	let botuser = 0;let memberuser = 0;let alluser = 0;
	async function GuildAllUser() {
		botuser = 0;memberuser = 0;alluser = 0;
		try{
		await bot.guilds.get("398062441516236800").fetchMembers().then(r => {
			r.members.array().forEach((member, key) => checkuserbot(member))
			});
		botuser = botuser.toString().replace(/[0123456789]/g, m => numchars[m]);
		alluser = alluser.toString().replace(/[0123456789]/g, m => numchars[m]);
		memberuser = memberuser.toString().replace(/[0123456789]/g, m => numchars[m]);
		await bot.channels.get("655499341590560779").setName("﹥ 𝓣𝓸𝓽𝓪𝓵 𝓾𝓼𝓮𝓻𝓼: " + `${alluser}`);
		await bot.channels.get("655499368136179712").setName(`﹥ 𝓑𝓸𝓽: ${botuser}`);
		await bot.channels.get("655499422465261569").setName(`﹥ 𝓤𝓼𝓮𝓻: ${memberuser}`);
		}catch(e){}
	}

	function checkuserbot(member){
		if(member.user.bot === true){botuser = botuser + 1;alluser = alluser + 1;} if(member.user.bot === false){memberuser = memberuser + 1;alluser = alluser + 1;}
	}

	function shuffle(a) {
	    for (let i = a.length - 1; i > 0; i--) {
		const j = Math.floor(Math.random() * (i + 1));
		[a[i], a[j]] = [a[j], a[i]];
	    }
	    return a;
	}

	function checkuserstatus() {
		try{
			let offlineMembers = bot.guilds.get("398062441516236800").members.filter(member => member.presence.status === "offline" && member.user.bot === false);
			offlineMembers.forEach((member, key) => offlineuserrole(member));
			let onlineMembers = bot.guilds.get("398062441516236800").members.filter(member => member.presence.status !== "offline" && member.user.bot === false);
			onlineMembers.forEach((member, key) => onlineuserrole(member));
		}
		catch(e){}
	}

	function moveVC(user){
		const userVC = user.voiceChannel;
		const offlineVC = bot.channels.find(x => x.name === "💤隱身/離線");
		if(userVC){
			try{
				user.setVoiceChannel(offlineVC);
			}
			catch(e){}
		}
	}

	function offlineuserrole(user){
		try{
		if(!user.roles.has('430389070246576128')){
			user.removeRole('417634328332337153');
			user.addRole('647004218812661761');
			moveVC(user);
		}
	}catch(e){}
	}

	function onlineuserrole(user){
		try{
		if(!user.roles.has('430389070246576128')){
			user.removeRole('647004218812661761');
			user.addRole('417634328332337153');
		}
	}catch(e){}
	}

//	function checkNY(bot, inv){
//		let i = new Date();
//		let NYMSG = ['407171840746848260', '398062441948512257'];
//		if(i.getYear() + 1900 === 2019){}else{
//			const embed = new Discord.RichEmbed()
//			embed
//			.setDescription('@here, 各位新年快樂 2020年也要順順利利喲~ :partying_face: ')
//			.setColor(0xcc0000)
//			.setTitle('2020 新年快樂!')
//			.setURL("https://mcwind.tk")
//			.setTimestamp()
//			.setFooter('ReiNa By 𝓖𝓻𝓪𝓷𝓭𝓞𝓹𝓮𝓻𝓪𝓽𝓸𝓻#9487', 'https://cdn.discordapp.com/avatars/418095978273570846/17c96d9ce6c135f7511a001e8584db17.png?size=2048');
//			NYMSG.forEach(ch => bot.channels.get(ch).send(embed));
//			clearInterval(inv);
//		}
//	}

	function getRandomInt(max) {
		return Math.floor(Math.random() * max) + 1;
	}
