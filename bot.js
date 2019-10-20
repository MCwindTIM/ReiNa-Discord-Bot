const botconfig = require("./botconfig.json");
const Discord = require("discord.js");
const YouTube = require('simple-youtube-api');
const flip = require('upsidedown');
const ytdl = require('ytdl-core');
const bot = new Discord.Client({disableEveryone: true});
const util = require('./util.js');
const youtube = new YouTube(botconfig.YoutubeAPI);
const queue = new Map();
const client = require('nekos.life');
const neko = new client();
const math = require('mathjs');
var wincmd = require('node-cmd');
var request = require ("request");
process.title = 'ReiNaBot'
bot.login(botconfig.token);
let timer = {};

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
});
bot.on('reconnecting', () => {
	console.log(`${bot.user.username} 上線!`);
    console.log(`加入了 ${bot.guilds.size} 個伺服器.`);
  	bot.user.setPresence({ game: { name: 'rn!help | ReiNa Is Here! Nya~~~~' , type: 3 } });
});
bot.on('disconnect', () => {
 console.log('斷開連接!');
});

bot.on("message", async message => {
  if(message.channel.type === "dm") return;
  let OwnID = botconfig.OwnerID;
  let prefix = botconfig.prefix;
  let messageArray = message.content.split(" ");
  let cmd = messageArray[0];
  let args = messageArray.slice(1);
  let cont = message.content.slice(prefix.length).split(" ");
  let argsclear = cont.slice(1);
  const searchString = messageArray.slice(1).join(' ');
  const url = messageArray[1] ? messageArray[1].replace(/<(.+)>/g, '$1') : '';
  const serverQueue = queue.get(message.guild.id);
  
	if(cmd === `${prefix}help`){
	  message.delete(); 
	  const embed = new Discord.RichEmbed()
            if ( 1 === 1 ) {
                embed
				.setAuthor(message.author.tag, message.author.avatarURL)
				.setColor('#0099ff')
				.setTitle('ReiNa Bot')
				.setURL("https://mcwind.tk")
				.setDescription("下面有可以使用的指令哦 請 " + `${message.author}` + " 耐心看完 最後更新201910200257\n```\n--實用指令--\nrn!clear [數目]  清除信息\nrn!myid       查看ID\nrn!timer [start/stop]   計時器指令\nrn!avatar     獲取你的Discord頭像\nrn!avatar [@某使用者]    獲得該使用者頭像\nrn!roll [最大數值]    隨機抽出一個數字!\nrn!say [單字/句子] 能讓我乖乖的跟著你說一次\nrn!me [單字/句子]  用自己做句 例:rn!me nya 輸出:@自己 nya\nrn!invite         邀請由MCwind製作/更新的Discord機械人！\nrn!r6 [平台] [玩家UID]   查詢R6玩家資料!\nrn!img            請求隨機動漫圖片！\nrn!hentai         請求隨機本子\nrn!img-glasses    請求隨機眼睛娘圖片！\nrn!img-nsfw       可能含有18+內容！\nrn!ebase [信息]     加密信息\nrn!dbase [信息]     解密信息\nrn!dec [十進制數值]    輸入數值轉換至其他進制\nrn!hex [十六進制數值]  輸入數值轉換至其他進制\nrn!bin [二進制數值]    輸入數值轉換至其他進制\nrn!flux [數值]    輸入港幣獲得可以購買的flux數量!\nrn!play [Youtube 連結/關鍵字]   播放音樂\nrn!stop   停止播放音樂並退出語音頻道\nrn!pause   暫停播放音樂\nrn!resume   繼續播放音樂\nrn!volume [數值]   調整音量\nrn!db[數值]   以分貝調整音量\nrn!skip   跳過正在播放中的音樂\nrn!np   顯示現在播放中的音樂\nrn!queue   顯示播放列表\n-------------------------------------------------------\n\n--圖片--\nrn!no\nrn!green\nrn!$\nrn!$$\nrn!$$$\nrn!tea\nrn!onemanarmy\nrn!bb\nrn!非洲\nrn!money\nrn!loading\nrn!drug\nrn!stella!\n-----------\n\n--特殊指令--\nrn!mememe\nrn!課金課曬佢\n------------------------------------------------```")
				.setFooter('ReiNa By 一起來當馬猴燒酒吧 (>ω･* )ﾉ#9201', 'https://cdn.discordapp.com/avatars/418095978273570846/17c96d9ce6c135f7511a001e8584db17.png?size=2048')
				.setTimestamp();
                try {
                    util.sendDeletableMessage(message.channel, { embed }, message.author);
				}   catch (err) {
                    console.error(err);
				}
                return;
            }
	}
	
	if(cmd === `${prefix}report`){
		let rUser = message.guild.member(message.mentions.users.first() || message.guild.members.get(args[0]));
		if(!rUser) { 
		message.delete();
		message.channel.send("找不到該使用者");}
		
		let reason = args.join(" ").slice(22);

		let reportEmbed = new Discord.RichEmbed()
		.setDescription("檢舉記錄")
		.setColor("#15f153")
		.addField("懷疑違規用戶",`${rUser}, 用戶ID ${rUser.id}`)
		.addField("檢舉人",`${message.author}, 用戶ID: ${message.author.id}`)
		.addField("頻道", message.channel)
		.addField("檢舉時間", message.createdAt)
		.addField("原因", reason);
		
		let finishEmbed = new Discord.RichEmbed()
		.setDescription("成功發起檢舉!")
		.setColor("#15f153")
		.addField("發起人",`${message.author}, 用戶Discord唯一ID: ${message.author.id}`);

		let reportschannel = message.guild.channels.find(`name`, "reports");
		if(!reportschannel) return message.channel.send("找不到該頻道");

		message.delete().catch(O_o=>{});
		reportschannel.send(reportEmbed);
		message.channel.send(finishEmbed);

		return;
	}

	if(cmd === `${prefix}ping`){
	  message.delete(); 
	  const embed = new Discord.RichEmbed()
            if ( 1 === 1 ) {
                embed
				.setAuthor(message.author.tag, message.author.avatarURL)
				.setDescription(`Pong!`)
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
  
	if(cmd === `${prefix}myid`){
	  message.delete(); 
	  const embed = new Discord.RichEmbed()
            if ( 1 === 1 ) {
                embed
				.setAuthor(message.author.tag, message.author.avatarURL)
				.setDescription("你的Discord使用者ID是: " + message.author.id)
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
  
	if(cmd === `${prefix}img`){
	request.get('https://duckduckdoc.tk/redirect-api', {},
	function(error, response, body){
	if(response.statusCode == 200){
		message.delete();
		const embed = new Discord.RichEmbed()
            if ( 1 === 1 ) {
                embed
				.setAuthor(message.author.tag, message.author.avatarURL)
				.setColor('#0099ff')
				.setTitle('MCwind 隨機圖片API')
				.setURL(response.request.uri.href)
				.setDescription(`${message.author}` + ' Senpai, 你要求的隨機圖片在這。')
				.setImage(response.request.uri.href)
				.setTimestamp()
				.setFooter('ReiNa By 一起來當馬猴燒酒吧 (>ω･* )ﾉ#9201', 'https://cdn.discordapp.com/avatars/418095978273570846/17c96d9ce6c135f7511a001e8584db17.png?size=2048');
                try {
                    util.sendDeletableMessage(message.channel, { embed }, message.author);
			}   catch (err) {
                    console.error(err);
                }
                return;
            }
	}
	return;
	})
	}
  
    if(cmd === `${prefix}img-nsfw`){
	request.get('https://duckduckdoc.tk/redirect-all', {},
	function(error, response, body){
	if(response.statusCode == 200){
		message.delete();
		const embed = new Discord.RichEmbed()
			if ( 1 === 1 ) {
                embed
				.setAuthor(message.author.tag, message.author.avatarURL)
				.setColor('#0099ff')
				.setTitle('MCwind 隨機圖片API [NSFW]')
				.setURL(response.request.uri.href)
				.setDescription(`${message.author}` + ' Senpai, 你要求的隨機圖片在這。')
				.setImage(response.request.uri.href)
				.setFooter('ReiNa By 一起來當馬猴燒酒吧 (>ω･* )ﾉ#9201', 'https://cdn.discordapp.com/avatars/418095978273570846/17c96d9ce6c135f7511a001e8584db17.png?size=2048');
                try {
                    util.sendDeletableMessage(message.channel, { embed }, message.author);
				}   catch (err) {
                    console.error(err);
				}
                return;
            }
	}
	return;
	})
	}
  
    if(cmd === `${prefix}img-glasses`){
	request.get('https://duckduckdoc.tk/redirect-glasses', {},
	function(error, response, body){
	if(response.statusCode == 200){
		message.delete();
		const embed = new Discord.RichEmbed()
			if ( 1 === 1 ) {
				embed
				.setAuthor(message.author.tag, message.author.avatarURL)
				.setColor('#0099ff')
				.setTitle('MCwind 眼鏡娘API')
				.setURL(response.request.uri.href)
				.setDescription(`${message.author}` + ' Senpai, 你要求的眼鏡娘在這。')
				.setImage(response.request.uri.href)
				.setFooter('ReiNa By 一起來當馬猴燒酒吧 (>ω･* )ﾉ#9201', 'https://cdn.discordapp.com/avatars/418095978273570846/17c96d9ce6c135f7511a001e8584db17.png?size=2048');
                try {
                    util.sendDeletableMessage(message.channel, { embed }, message.author);
				}   catch (err) {
					console.error(err);
                }
                return;
            }
	}
	return;
	})
	}
 
	if(cmd === `${prefix}clear`){
	async function clear(){
		message.delete();
		if(args[0] > 100){
			const embed = new Discord.RichEmbed()
				embed
				.setAuthor(message.author.tag, message.author.avatarURL)
				.setColor('#0099ff')
				.setTitle('ReiNa Bot')
				.setURL("https://mcwind.tk")
				.setDescription(`${message.author}` + "Senpai, 刪除信息不能大於100哦!")
				.setFooter('ReiNa By 一起來當馬猴燒酒吧 (>ω･* )ﾉ#9201', 'https://cdn.discordapp.com/avatars/418095978273570846/17c96d9ce6c135f7511a001e8584db17.png?size=2048')
				.setTimestamp();
                try {
                    await util.sendDeletableMessage(message.channel, { embed }, message.author);
				}   catch (err) {
                    console.error(err);
                }
			 return;
		}
		if(args[0] < 2){
			const embed = new Discord.RichEmbed()
				embed
				.setColor('#0099ff')
				.setTitle('ReiNa Bot')
				.setURL("https://mcwind.tk")
				.setDescription(`${message.author}` + "Senpai, 至少要刪除2條信息哦!")
				.setFooter('ReiNa By 一起來當馬猴燒酒吧 (>ω･* )ﾉ#9201', 'https://cdn.discordapp.com/avatars/418095978273570846/17c96d9ce6c135f7511a001e8584db17.png?size=2048')
				.setTimestamp();
                try {
                    await util.sendDeletableMessage(message.channel, { embed }, message.author);
				}   catch (err) {
                    console.error(err);
                }
			 return;
		}
		if(isNaN(args[0])){
			const embed = new Discord.RichEmbed()
				embed
				.setColor('#0099ff')
				.setTitle('ReiNa Bot')
				.setURL("https://mcwind.tk")
				.setDescription(`${message.author}` + "Senpai, 請輸入有效數目!")
				.setFooter('ReiNa By 一起來當馬猴燒酒吧 (>ω･* )ﾉ#9201', 'https://cdn.discordapp.com/avatars/418095978273570846/17c96d9ce6c135f7511a001e8584db17.png?size=2048')
				.setTimestamp();
                try {
                    await util.sendDeletableMessage(message.channel, { embed }, message.author);
				}   catch (err) {
                    console.error(err);
                }
			 return;
		}
		  
		  const fetched = await message.channel.fetchMessages({limit: argsclear[0]});
		  console.log('正在刪除 ' + fetched.size + ' 條信息...');
		  
		
		  message.channel.bulkDelete(fetched)
		  	const embed = new Discord.RichEmbed()
            if ( 1 === 1 ) {
            embed
			.setColor('#0099ff')
			.setTitle('ReiNa Bot')
			.setURL("https://mcwind.tk")
			.setDescription(`${message.author}` + "刪除了" + cont.slice(1) + "條信息" + "\n我只可以刪除14日內的信息")
			.setFooter('ReiNa By 一起來當馬猴燒酒吧 (>ω･* )ﾉ#9201', 'https://cdn.discordapp.com/avatars/418095978273570846/17c96d9ce6c135f7511a001e8584db17.png?size=2048')
			.setTimestamp();
                try {
                    await util.sendDeletableMessage(message.channel, { embed }, message.author);
			}   catch (err) {
                    console.error(err);
                }
                return;
            }
		}
		
		clear();
		
  }
  
	if(cmd === `${prefix}say`){
	  message.delete();
	  let botmessage = args.join(" ");
	  const embed = new Discord.RichEmbed()
        if ( 1 === 1 ) {
			embed
			.setAuthor(message.author.tag, message.author.avatarURL)
			.setColor('#0099ff')
			.setTitle('ReiNa Bot')
			.setURL("https://mcwind.tk")
			.setDescription(botmessage)
			.setFooter('ReiNa By 一起來當馬猴燒酒吧 (>ω･* )ﾉ#9201', 'https://cdn.discordapp.com/avatars/418095978273570846/17c96d9ce6c135f7511a001e8584db17.png?size=2048');
                try {
                    util.sendDeletableMessage(message.channel, { embed }, message.author);
				}   catch (err) {
                    console.error(err);
                }
                return;
        }
  }

	if(cmd === `${prefix}me`){
	  message.delete();
	  const embed = new Discord.RichEmbed()
		let botmessage = args.join(" ");
            if ( 1 === 1 ) {
				embed
				.setAuthor(message.author.tag, message.author.avatarURL)
				.setColor('#0099ff')
				.setTitle('ReiNa Bot')
				.setURL("https://mcwind.tk")
				.setDescription(`${message.author}` + " " + botmessage)
				.setFooter('ReiNa By 一起來當馬猴燒酒吧 (>ω･* )ﾉ#9201', 'https://cdn.discordapp.com/avatars/418095978273570846/17c96d9ce6c135f7511a001e8584db17.png?size=2048');
                try {
                    util.sendDeletableMessage(message.channel, { embed }, message.author);
				}   catch (err) {
                    console.error(err);
                }
                return;
            }
	}
  
	if(cmd === `${prefix}no`){
		message.delete();
		const embed = new Discord.RichEmbed()
            if ( 1 === 1 ) {
                embed
				.setAuthor(message.author.tag, message.author.avatarURL)
				.setColor('#0099ff')
				.setTitle('ReiNa Bot')
				.setURL("https://mcwind.tk")
				.setDescription(`${message.author}` + "表示")
				.setImage("https://duckduckdoc.tk/wp-content/uploads/googledrive/nonono.jpg")
				.setFooter('ReiNa By 一起來當馬猴燒酒吧 (>ω･* )ﾉ#9201', 'https://cdn.discordapp.com/avatars/418095978273570846/17c96d9ce6c135f7511a001e8584db17.png?size=2048');
                try {
					util.sendDeletableMessage(message.channel, { embed }, message.author);
				}   catch (err) {
                    console.error(err);
                }
                return;
            }
	}
	
	if(cmd === `${prefix}green`){
		message.delete();
		const embed = new Discord.RichEmbed()
            if ( 1 === 1 ) {
                embed
				.setAuthor(message.author.tag, message.author.avatarURL)
				.setColor('#0099ff')
				.setTitle('ReiNa Bot')
				.setURL("https://mcwind.tk")
				.setDescription(`${message.author}` + "表示")
				.setImage("https://duckduckdoc.tk/wp-content/uploads/googledrive/green.jpg")
				.setFooter('ReiNa By 一起來當馬猴燒酒吧 (>ω･* )ﾉ#9201', 'https://cdn.discordapp.com/avatars/418095978273570846/17c96d9ce6c135f7511a001e8584db17.png?size=2048');
                try {
                    util.sendDeletableMessage(message.channel, { embed }, message.author);
				}   catch (err) {
                    console.error(err);
                }
                return;
            }
	}
	
	if(cmd === `${prefix}$`){
		message.delete();
		const embed = new Discord.RichEmbed()
            if ( 1 === 1 ) {
                embed
				.setAuthor(message.author.tag, message.author.avatarURL)
				.setColor('#0099ff')
				.setTitle('ReiNa Bot')
				.setURL("https://mcwind.tk")
				.setDescription(`${message.author}` + "表示")
				.setImage("https://duckduckdoc.tk/wp-content/uploads/googledrive/$.jpg")
				.setFooter('ReiNa By 一起來當馬猴燒酒吧 (>ω･* )ﾉ#9201', 'https://cdn.discordapp.com/avatars/418095978273570846/17c96d9ce6c135f7511a001e8584db17.png?size=2048');
                try {
                    util.sendDeletableMessage(message.channel, { embed }, message.author);
				}   catch (err) {
                    console.error(err);
                }
                return;
            }
	}
  
  	if(cmd === `${prefix}$$`){
		message.delete();
		const embed = new Discord.RichEmbed()
            if ( 1 === 1 ) {
                embed
				.setAuthor(message.author.tag, message.author.avatarURL)
				.setColor('#0099ff')
				.setTitle('ReiNa Bot')
				.setURL("https://mcwind.tk")
				.setDescription(`${message.author}` + "表示")
				.setImage("https://duckduckdoc.tk/wp-content/uploads/googledrive/$$.jpg")
				.setFooter('ReiNa By 一起來當馬猴燒酒吧 (>ω･* )ﾉ#9201', 'https://cdn.discordapp.com/avatars/418095978273570846/17c96d9ce6c135f7511a001e8584db17.png?size=2048');
                try {
                    util.sendDeletableMessage(message.channel, { embed }, message.author);
				}   catch (err) {
                    console.error(err);
                }
                return;
            }
	}
  
    if(cmd === `${prefix}$$$`){
		message.delete();
		const embed = new Discord.RichEmbed()
            if ( 1 === 1 ) {
                embed
				.setAuthor(message.author.tag, message.author.avatarURL)
				.setColor('#0099ff')
				.setTitle('ReiNa Bot')
				.setURL("https://mcwind.tk")
				.setDescription(`${message.author}` + "表示")
				.setImage("https://duckduckdoc.tk/wp-content/uploads/googledrive/$$$.jpg")
				.setFooter('ReiNa By 一起來當馬猴燒酒吧 (>ω･* )ﾉ#9201', 'https://cdn.discordapp.com/avatars/418095978273570846/17c96d9ce6c135f7511a001e8584db17.png?size=2048');
                try {
                    util.sendDeletableMessage(message.channel, { embed }, message.author);
				}   catch (err) {
                    console.error(err);
                }
                return;
            }
	}
	
	if(cmd === `${prefix}tea`){
		message.delete();
		const embed = new Discord.RichEmbed()
            if ( 1 === 1 ) {
                embed
				.setAuthor(message.author.tag, message.author.avatarURL)
				.setColor('#0099ff')
				.setTitle('ReiNa Bot')
				.setURL("https://mcwind.tk")
				.setDescription(`${message.author}` + "表示")
				.setImage("https://duckduckdoc.tk/wp-content/uploads/googledrive/tea.jpg")
				.setFooter('ReiNa By 一起來當馬猴燒酒吧 (>ω･* )ﾉ#9201', 'https://cdn.discordapp.com/avatars/418095978273570846/17c96d9ce6c135f7511a001e8584db17.png?size=2048');
                try {
                    util.sendDeletableMessage(message.channel, { embed }, message.author);
				}   catch (err) {
                    console.error(err);
                }
                return;
            }
	}
	
	if(cmd === `${prefix}onemanarmy`){
		message.delete();
		const embed = new Discord.RichEmbed()
            if ( 1 === 1 ) {
                embed
				.setAuthor(message.author.tag, message.author.avatarURL)
				.setColor('#0099ff')
				.setTitle('ReiNa Bot')
				.setURL("https://mcwind.tk")
				.setDescription(`${message.author}` + "表示")
				.setImage("https://duckduckdoc.tk/wp-content/uploads/googledrive/onemanarmy.jpg")
				.setFooter('ReiNa By 一起來當馬猴燒酒吧 (>ω･* )ﾉ#9201', 'https://cdn.discordapp.com/avatars/418095978273570846/17c96d9ce6c135f7511a001e8584db17.png?size=2048');
                try {
                    util.sendDeletableMessage(message.channel, { embed }, message.author);
				}   catch (err) {
                    console.error(err);
                }
                return;
            }
	}
	
	if(cmd === `${prefix}非洲`){
		message.delete();
		const embed = new Discord.RichEmbed()
            if ( 1 === 1 ) {
                embed
				.setAuthor(message.author.tag, message.author.avatarURL)
				.setColor('#0099ff')
				.setTitle('ReiNa Bot')
				.setURL("https://mcwind.tk")
				.setDescription(`${message.author}` + "表示")
				.setImage("https://duckduckdoc.tk/wp-content/uploads/googledrive/feizhou.jpg")
				.setFooter('ReiNa By 一起來當馬猴燒酒吧 (>ω･* )ﾉ#9201', 'https://cdn.discordapp.com/avatars/418095978273570846/17c96d9ce6c135f7511a001e8584db17.png?size=2048');
                try {
                    util.sendDeletableMessage(message.channel, { embed }, message.author);
				}   catch (err) {
                    console.error(err);
                }
                return;
            }
	}
  
  	if(cmd === `${prefix}money`){
		message.delete();
		const embed = new Discord.RichEmbed()
            if ( 1 === 1 ) {
                embed
				.setAuthor(message.author.tag, message.author.avatarURL)
				.setColor('#0099ff')
				.setTitle('ReiNa Bot')
				.setURL("https://mcwind.tk")
				.setDescription(`${message.author}` + "表示")
				.setImage("https://duckduckdoc.tk/wp-content/uploads/googledrive/money.jpg")
				.setFooter('ReiNa By 一起來當馬猴燒酒吧 (>ω･* )ﾉ#9201', 'https://cdn.discordapp.com/avatars/418095978273570846/17c96d9ce6c135f7511a001e8584db17.png?size=2048');
                try {
                    util.sendDeletableMessage(message.channel, { embed }, message.author);
				}   catch (err) {
                    console.error(err);
                }
                return;
            }
	}
	
	if(cmd === `${prefix}loading`){
		message.delete();
		const embed = new Discord.RichEmbed()
            if ( 1 === 1 ) {
                embed
				.setAuthor(message.author.tag, message.author.avatarURL)
				.setColor('#0099ff')
				.setTitle('ReiNa Bot')
				.setURL("https://mcwind.tk")
				.setDescription(`${message.author}` + "表示")
				.setImage("https://duckduckdoc.tk/wp-content/uploads/googledrive/loading.gif")
				.setFooter('ReiNa By 一起來當馬猴燒酒吧 (>ω･* )ﾉ#9201', 'https://cdn.discordapp.com/avatars/418095978273570846/17c96d9ce6c135f7511a001e8584db17.png?size=2048');
                try {
                    util.sendDeletableMessage(message.channel, { embed }, message.author);
				}   catch (err) {
                    console.error(err);
                }
                return;
            }
	}
	
	if(cmd === `${prefix}drug`){
		message.delete();
		const embed = new Discord.RichEmbed()
            if ( 1 === 1 ) {
                embed
				.setAuthor(message.author.tag, message.author.avatarURL)
				.setColor('#0099ff')
				.setTitle('ReiNa Bot')
				.setURL("https://mcwind.tk")
				.setDescription(`${message.author}` + "表示")
				.setImage("https://duckduckdoc.tk/wp-content/uploads/googledrive/drug.gif")
				.setFooter('ReiNa By 一起來當馬猴燒酒吧 (>ω･* )ﾉ#9201', 'https://cdn.discordapp.com/avatars/418095978273570846/17c96d9ce6c135f7511a001e8584db17.png?size=2048');
                try {
                    util.sendDeletableMessage(message.channel, { embed }, message.author);
				}   catch (err) {
                    console.error(err);
                }
                return;
            }
	}
	
	if(cmd === `${prefix}stella`){
		message.delete();
		const embed = new Discord.RichEmbed()
            if ( 1 === 1 ) {
                embed
				.setAuthor(message.author.tag, message.author.avatarURL)
				.setColor('#0099ff')
				.setTitle('ReiNa Bot')
				.setURL("https://mcwind.tk")
				.setDescription(`${message.author}` + "表示")
				.setImage("https://duckduckdoc.tk/wp-content/uploads/googledrive/stella.gif")
				.setFooter('ReiNa By 一起來當馬猴燒酒吧 (>ω･* )ﾉ#9201', 'https://cdn.discordapp.com/avatars/418095978273570846/17c96d9ce6c135f7511a001e8584db17.png?size=2048');
                try {
                    util.sendDeletableMessage(message.channel, { embed }, message.author);
				}   catch (err) {
                    console.error(err);
                }
                return;
            }	
	}
	
	if(cmd === `${prefix}bb`){
		message.delete();
		const embed = new Discord.RichEmbed()
            if ( 1 === 1 ) {
                embed
				.setAuthor(message.author.tag, message.author.avatarURL)
				.setColor('#0099ff')
				.setTitle('ReiNa Bot')
				.setURL("https://mcwind.tk")
				.setDescription(`${message.author}` + "表示")
				.setImage("https://duckduckdoc.tk/wp-content/uploads/googledrive/beautiful.png")
				.setFooter('ReiNa By 一起來當馬猴燒酒吧 (>ω･* )ﾉ#9201', 'https://cdn.discordapp.com/avatars/418095978273570846/17c96d9ce6c135f7511a001e8584db17.png?size=2048');
                try {
                    util.sendDeletableMessage(message.channel, { embed }, message.author);
				}   catch (err) {
                    console.error(err);
                }
                return;
            }
	}
	
	if(cmd === `${prefix}mememe`){
		message.delete();
		const embed = new Discord.RichEmbed()
            if ( 1 === 1 ) {
                embed
				.setAuthor(message.author.tag, message.author.avatarURL)
				.setTitle('[GAY Youtube]')
				.setURL("https://www.youtube.com/watch?v=OODugXYqyy4&feature=youtu.be")
				.setColor('#0099ff')
				.setDescription("這是" + `${message.author}` + " 的請求")
				.setFooter('ReiNa By 一起來當馬猴燒酒吧 (>ω･* )ﾉ#9201', 'https://cdn.discordapp.com/avatars/418095978273570846/17c96d9ce6c135f7511a001e8584db17.png?size=2048');
                try {
                    util.sendDeletableMessage(message.channel, { embed }, message.author);
				}   catch (err) {
                    console.error(err);
                }
                return;
            }
	}
	
	if(cmd === `${prefix}課金課曬佢`){
		message.delete();
		const embed = new Discord.RichEmbed()
            if ( 1 === 1 ) {
                embed
				.setAuthor(message.author.tag, message.author.avatarURL)
				.setTitle('[課金課曬佢 Youtube]')
				.setURL("https://youtu.be/ouchD3lTs58?t=1m33s")
				.setColor('#0099ff')
				.setDescription("這是" + `${message.author}` + " 的請求")
				.setFooter('ReiNa By 一起來當馬猴燒酒吧 (>ω･* )ﾉ#9201', 'https://cdn.discordapp.com/avatars/418095978273570846/17c96d9ce6c135f7511a001e8584db17.png?size=2048');
                try {
                    util.sendDeletableMessage(message.channel, { embed }, message.author);
				}   catch (err) {
                    console.error(err);
                }
                return;
            }
	}
	
	if(cmd === `${prefix}invite`){
		message.delete();
		const embed = new Discord.RichEmbed()
            if ( 1 === 1 ) {
                embed
				.setAuthor(message.author.tag, message.author.avatarURL)
				.setTitle('ReiNa Bot')
				.setURL("https://mcwind.tk")
				.setColor('#0099ff')
				.setDescription("這是" + `${message.author}` + " 的請求，你可以用以下鏈接邀請機械人\n\n\nReiNa Bot\n<https://discordapp.com/api/oauth2/authorize?client_id=418095978273570846&permissions=8&scope=bot>\n\nReiNa-AntiSpam\n<https://discordapp.com/api/oauth2/authorize?client_id=454324523571871754&permissions=8&scope=bot>\n\nReiNa-Cards\n<https://discordapp.com/api/oauth2/authorize?client_id=418363084508495872&permissions=8&scope=bot>\n\nReiNa-Music\n<https://discordapp.com/api/oauth2/authorize?client_id=423846938467762187&permissions=8&scope=bot>\n\nReiNa-WebSocket\n<https://discordapp.com/api/oauth2/authorize?client_id=580129877953609739&permissions=8&scope=bot>\n\nReiNa-LocalMusic\n<https://discordapp.com/api/oauth2/authorize?client_id=440968183277682708&permissions=8&scope=bot>\n\n飆車之鬼\n<https://discordapp.com/api/oauth2/authorize?client_id=601861890036989983&permissions=8&scope=bot>")
				.setFooter('ReiNa By 一起來當馬猴燒酒吧 (>ω･* )ﾉ#9201', 'https://cdn.discordapp.com/avatars/418095978273570846/17c96d9ce6c135f7511a001e8584db17.png?size=2048');
                try {
                    util.sendDeletableMessage(message.channel, { embed }, message.author);
				}   catch (err) {
                    console.error(err);
                }
                return;
            }
	}
	
    if(cmd === `${prefix}hentai`){
		request.get('https://duckduckdoc.tk/redirect-hentai', {},
		function(error, response, body){
			if(response.statusCode == 200){
				message.delete();
				const embed = new Discord.RichEmbed()
					if ( 1 === 1 ) {
						embed
						.setAuthor(message.author.tag, message.author.avatarURL)
						.setColor('#0099ff')
						.setTitle('MCwind 隨機本子API-點擊我下載')
						.setURL(response.request.uri.href)
						.setDescription(`${message.author}` + ' Senpai, 你要求的隨機本子在這。')
						.setFooter('ReiNa By 一起來當馬猴燒酒吧 (>ω･* )ﾉ#9201', 'https://cdn.discordapp.com/avatars/418095978273570846/17c96d9ce6c135f7511a001e8584db17.png?size=2048');
						try {
							util.sendDeletableMessage(message.channel, { embed }, message.author);
						}   catch (err) {
							console.error(err);
						}
						return;
					}
			}
		return;
		})
	}
  
    if(cmd === `${prefix}dec`){
		message.delete();
		let num = parseInt (args, 10);
		let hex = num.toString(16).toUpperCase();
		let bin = num.toString(2).toUpperCase();
		let dec = num.toString(10).toUpperCase();
		const embed = new Discord.RichEmbed()
            if ( 1 === 1 ) {
                embed
				.setAuthor(message.author.tag, message.author.avatarURL)
				.setColor('#0099ff')
				.setTitle('ReiNa Bot 十進制轉換')
				.setURL("https://mcwind.tk")
				.setDescription("Demical =" + dec + "\nBinary =" + bin + "\nHexadecimal =" + hex)
				.setFooter('ReiNa By 一起來當馬猴燒酒吧 (>ω･* )ﾉ#9201', 'https://cdn.discordapp.com/avatars/418095978273570846/17c96d9ce6c135f7511a001e8584db17.png?size=2048');
                try {
                    util.sendDeletableMessage(message.channel, { embed }, message.author);
				}   catch (err) {
                    console.error(err);
                }
                return;
            }
	}
  
    if(cmd === `${prefix}hex`){
		message.delete();
		let num = parseInt (args, 16);
		let dec = num.toString(10).toUpperCase();
		let bin = num.toString(2).toUpperCase();
		let hex = num.toString(16).toUpperCase();
		const embed = new Discord.RichEmbed()
            if ( 1 === 1 ) {
                embed
				.setAuthor(message.author.tag, message.author.avatarURL)
				.setColor('#0099ff')
				.setTitle('ReiNa Bot 十六進制轉換')
				.setURL("https://mcwind.tk")
				.setDescription("Demical =" + dec + "\nBinary =" + bin + "\nHexadecimal =" + hex)
				.setFooter('ReiNa By 一起來當馬猴燒酒吧 (>ω･* )ﾉ#9201', 'https://cdn.discordapp.com/avatars/418095978273570846/17c96d9ce6c135f7511a001e8584db17.png?size=2048');
                try {
                    util.sendDeletableMessage(message.channel, { embed }, message.author);
				}   catch (err) {
                    console.error(err);
                }
                return;
            }
	}
  
    if(cmd === `${prefix}bin`){
		message.delete();
		let num = parseInt (args, 2);
		let dec = num.toString(10).toUpperCase();
		let hex = num.toString(16).toUpperCase();
		let bin = num.toString(2).toUpperCase();
		const embed = new Discord.RichEmbed()
            if ( 1 === 1 ) {
                embed
				.setAuthor(message.author.tag, message.author.avatarURL)
				.setColor('#0099ff')
				.setTitle('ReiNa Bot 二進制轉換')
				.setURL("https://mcwind.tk")
				.setDescription("Demical =" + dec + "\nBinary =" + bin + "\nHexadecimal =" + hex)
				.setFooter('ReiNa By 一起來當馬猴燒酒吧 (>ω･* )ﾉ#9201', 'https://cdn.discordapp.com/avatars/418095978273570846/17c96d9ce6c135f7511a001e8584db17.png?size=2048');
                try {
                    util.sendDeletableMessage(message.channel, { embed }, message.author);
				}   catch (err) {
                    console.error(err);
                }
                return;
            }
	}
  
    if(cmd === `${prefix}alt`){
		message.delete();
		let tString = Buffer.from(args, 'utf8');
		let tvar = tString.toString('binary');
		let output = tvar.toString('utf-8');
		const embed = new Discord.RichEmbed()
            if ( 1 === 1 ) {
                embed
				.setAuthor(message.author.tag, message.author.avatarURL)
				.setColor('#0099ff')
				.setTitle('ReiNa Bot Alt Code ')
				.setURL("https://mcwind.tk")
				.setDescription(output)
				.setFooter('ReiNa By 一起來當馬猴燒酒吧 (>ω･* )ﾉ#9201', 'https://cdn.discordapp.com/avatars/418095978273570846/17c96d9ce6c135f7511a001e8584db17.png?size=2048');
                try {
                    util.sendDeletableMessage(message.channel, { embed }, message.author);
				}   catch (err) {
                    console.error(err);
                }
                return;
            }
  }
  
	if(cmd === `${prefix}ebase`){
		message.delete();
		let mString = args.join(" ");
		let tString = new Buffer(mString).toString('base64');
		const embed = new Discord.RichEmbed()
            if ( 1 === 1 ) {
                embed
				.setAuthor(message.author.tag, message.author.avatarURL)
				.setColor('#0099ff')
				.setTitle('ReiNa Bot 加密信息')
				.setURL("https://mcwind.tk")
				.setDescription(tString)
				.setFooter('ReiNa By 一起來當馬猴燒酒吧 (>ω･* )ﾉ#9201', 'https://cdn.discordapp.com/avatars/418095978273570846/17c96d9ce6c135f7511a001e8584db17.png?size=2048');
                try {
                    util.sendDeletableMessage(message.channel, { embed }, message.author);
				}   catch (err) {
                    console.error(err);
                }
                return;
            }
	}
  
	if(cmd === `${prefix}dbase`){
		message.delete();
		let mString = args.join(" ");
		let data = new Buffer(mString, 'base64').toString();
		const embed = new Discord.RichEmbed()
            if ( 1 === 1 ) {
                embed
				.setAuthor(message.author.tag, message.author.avatarURL)
				.setColor('#0099ff')
				.setTitle('ReiNa Bot 解密信息')
				.setURL("https://mcwind.tk")
				.setDescription(data)
				.setFooter('ReiNa By 一起來當馬猴燒酒吧 (>ω･* )ﾉ#9201', 'https://cdn.discordapp.com/avatars/418095978273570846/17c96d9ce6c135f7511a001e8584db17.png?size=2048');
                try {
                    util.sendDeletableMessage(message.channel, { embed }, message.author);
				}   catch (err) {
                    console.error(err);
                }
                return;
            }
	}
  
	if(cmd === `${prefix}roll`){
		message.delete();
		rndnum = args.join(" ");
		const embed = new Discord.RichEmbed()
            if ( 1 === 1 ) {
                embed
				.setAuthor(message.author.tag, message.author.avatarURL)
				.setColor('#0099ff')
				.setTitle('ReiNa Bot 隨機數字')
				.setURL("https://mcwind.tk")
				.setDescription(getRandomInt(rndnum))
				.setFooter('ReiNa By 一起來當馬猴燒酒吧 (>ω･* )ﾉ#9201', 'https://cdn.discordapp.com/avatars/418095978273570846/17c96d9ce6c135f7511a001e8584db17.png?size=2048');
                try {
                    util.sendDeletableMessage(message.channel, { embed }, message.author);
				}   catch (err) {
                    console.error(err);
                }
                return;
            }
	}
  
	if(cmd === `${prefix}restart` ){
		if(message.author.id === OwnID){
			message.delete();
			const embed = new Discord.RichEmbed()
				if ( 1 === 1 ) {
					embed
					.setAuthor(message.author.tag, message.author.avatarURL)
					.setColor('#0099ff')
					.setTitle('ReiNa Bot')
					.setURL("https://mcwind.tk")
					.setDescription("重新啟動中...:wave:")
					.setFooter('ReiNa By 一起來當馬猴燒酒吧 (>ω･* )ﾉ#9201', 'https://cdn.discordapp.com/avatars/418095978273570846/17c96d9ce6c135f7511a001e8584db17.png?size=2048');
					try {
						util.sendDeletableMessage(message.channel, { embed }, message.author)
						.then(msg => bot.destroy())
						.then(console.log("提示:重新啟動"))
						.then(
						wincmd.run("start restart.bat")
						);
					}   catch (err) {
						console.error(err);
					}
                return;
				}
		}
		else{
			message.delete();
			const embed = new Discord.RichEmbed()
				if ( 1 === 1 ) {
					embed
					.setColor('#0099ff')
					.setTitle('ReiNa Bot 錯誤')
					.setURL("https://mcwind.tk")
					.setDescription("權限不足!")
					.setFooter('ReiNa By 一起來當馬猴燒酒吧 (>ω･* )ﾉ#9201', 'https://cdn.discordapp.com/avatars/418095978273570846/17c96d9ce6c135f7511a001e8584db17.png?size=2048');
					try {
						util.sendDeletableMessage(message.channel, { embed }, message.author);
						}   catch (err) {
                    console.error(err);
					}
					return;
				}
		}
	}
  
    if(cmd === `${prefix}flux`){
		var rightNow = new Date();
		var res = rightNow.toISOString().slice(0,10).replace();
		var hkd2cny = "http://currencies.apps.grandtrunk.net/getrate/" + res + "/HKD/CNY";
		request.get(hkd2cny, {},
		function(error, response, body){
			if(response.statusCode == 200){
			message.delete();
			var mString = args.join(" ");
			var HKD = parseFloat(mString);
			var CNY = parseFloat(body)
			var calc = HKD * CNY / 0.23;
			var flux = Math.floor(calc);
			const embed = new Discord.RichEmbed()
				if ( 1 === 1 ) {
					embed
					.setAuthor(message.author.tag, message.author.avatarURL)
					.setColor('#0099ff')
					.setTitle("ReiNa Bot 點我購買Trove Flux")
					.setURL("https://item.taobao.com/item.htm?spm=a1z09.2.0.0.6ce02e8dGSuOvJ&id=548238250656&_u=625udhqs9009")
					.setDescription(`${message.author}` + " \nSenpai, 你可以使用 `" + HKD + "` HKD購買到大約 `" + flux + "` 萬flux! (向下取整)\n今天港幣兌換人民幣匯率是: `" + body + "`\n購買數量請填入: `" + HKD * CNY + "`")
					.setFooter('ReiNa By 一起來當馬猴燒酒吧 (>ω･* )ﾉ#9201', 'https://cdn.discordapp.com/avatars/418095978273570846/17c96d9ce6c135f7511a001e8584db17.png?size=2048');
					try {
                    util.sendDeletableMessage(message.channel, { embed }, message.author);
					}   catch (err) {
                    console.error(err);
					}
					return;
				}
			}
			return;
		})
	}
	
	if(message.content.includes('discord.gg/'||'discordapp.com/invite/')) {
		message.delete(); 
		const embed = new Discord.RichEmbed()
            if ( 1 === 1 ) {
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
                return;
            }
	}
    
	if(cmd === `${prefix}avatar`){
		message.delete();
		let user = message.mentions.users.first();
			if(!user) user = message.author;
				const embed = new Discord.RichEmbed()
				embed
				.setAuthor(message.author.tag, message.author.avatarURL)
				.setDescription(`${message.author}` + "Senpai, 這是<@" + user.id + ">的使用者頭像。")
				.setColor(0xcc0000)
				.setTitle('ReiNa Bot Discord頭像')
				.setURL(user.avatarURL)
				.setImage(user.avatarURL)
				.setTimestamp()
				.setFooter('ReiNa By 一起來當馬猴燒酒吧 (>ω･* )ﾉ#9201', 'https://cdn.discordapp.com/avatars/418095978273570846/17c96d9ce6c135f7511a001e8584db17.png?size=2048');
                try {
                    await util.sendDeletableMessage(message.channel, { embed }, message.author);
				}   catch (err) {
                    console.error(err);
                }
                return;
	}
		
	if(cmd === `${prefix}timer`){
		message.delete();
		let controller = args.slice(0, 1).toString();
			if (controller === "start"){
				timer[message.author.id] = Date.now();
				const embed = new Discord.RichEmbed()
				embed
				.setAuthor(message.author.tag, message.author.avatarURL)
				.setDescription(`${message.author}` + "開始計時。")
				.setColor(0xcc0000)
				.setTitle('ReiNa Bot 計時器')
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
			else{
				if (controller === "stop"){
					if (timer[message.author.id]) {
					var rightNow = new Date();
					var res = rightNow.toISOString().slice(0,10).replace();
					var hkd2cny = "http://currencies.apps.grandtrunk.net/getrate/" + res + "/HKD/CNY";
					request.get(hkd2cny, {},
					async function(error, response, body){
						if(response.statusCode == 200){
							timer[message.author.id] = Date.now() - timer[message.author.id];
							var HKD = timer[message.author.id] / 1000 * (60 / 3600);
							var CNY = parseFloat(body)
							var calc = HKD * CNY / 0.23;
							var flux = Math.floor(calc);
							h = Math.floor(timer[message.author.id] / 3600000);
							if (h < 10) h = "0" + h;
							timer[message.author.id] = timer[message.author.id] % 3600000;
							m = Math.floor(timer[message.author.id] / 60000);
							if (m < 10) m = "0" + m;
							timer[message.author.id] = timer[message.author.id] % 60000;
							s = Math.floor(timer[message.author.id] / 1000);
							if (s < 10) s = "0" + s;
							timer[message.author.id] = timer[message.author.id] % 1000;
							if (timer[message.author.id] < 10) timer[message.author.id] = "0" + timer[message.author.id];
							const embed = new Discord.RichEmbed()
							embed
							.setAuthor(message.author.tag, message.author.avatarURL)
							.setDescription(`${message.author}` + "計時結束。\n格式:`小時:分鐘:秒`\n\n" + h + ":" + m + ":" + s + "\n\n如果以每小時60HKD薪金計算, 將會是 `" + flux + "` 萬Flux!")
							.setColor(0xcc0000)
							.setTitle('ReiNa Bot 計時器')
							.setURL("https://mcwind.tk")
							.setTimestamp()
							.setFooter('ReiNa By 一起來當馬猴燒酒吧 (>ω･* )ﾉ#9201', 'https://cdn.discordapp.com/avatars/418095978273570846/17c96d9ce6c135f7511a001e8584db17.png?size=2048');
							try {
								await util.sendDeletableMessage(message.channel, { embed }, message.author);
							}   catch (err) {
								console.error(err);
							}
					delete timer[message.author.id];
					return;
						}
					})
					}
					else{
						if (timer[message.author.id] < 10) timer[message.author.id] = "0" + timer[message.author.id];
							const embed = new Discord.RichEmbed()
							embed
							.setAuthor(message.author.tag, message.author.avatarURL)
							.setDescription(`${message.author}` + "你未開始計時, 請使用`timer`指令加上`start`參數開始計時")
							.setColor(0xcc0000)
							.setTitle('ReiNa Bot 計時器')
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
				else{
					if (1 === 1){
						const embed = new Discord.RichEmbed()
						embed
						.setAuthor(message.author.tag, message.author.avatarURL)
						.setDescription(`${message.author}` + "請在`timer`指令後加入變數 `start` 或者 `stop`")
						.setColor(0xcc0000)
						.setTitle('ReiNa Bot 計時器')
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
	
	if(cmd === `${prefix}neko`){
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
				.setFooter('ReiNa By 一起來當馬猴燒酒吧 (>ω･* )ﾉ#9201', 'https://cdn.discordapp.com/avatars/418095978273570846/17c96d9ce6c135f7511a001e8584db17.png?size=2048');
                try {
                    util.sendDeletableMessage(message.channel, { embed }, message.author);
				}   catch (err) {
                    console.error(err);
                }
                return;
	  });
	}
	
	if(cmd === `${prefix}hug`){
	  message.delete();
	  neko.sfw.hug().then(hug => {
	  const embed = new Discord.RichEmbed()
                embed
				.setAuthor(message.author.tag, message.author.avatarURL)
				.setDescription(`${message.author}` + ' 給你一個大大的擁抱。')
				.setColor(0xcc0000)
				.setTitle('ReiNa Bot')
				.setImage(hug.url)
                .setTimestamp()
				.setFooter('ReiNa By 一起來當馬猴燒酒吧 (>ω･* )ﾉ#9201', 'https://cdn.discordapp.com/avatars/418095978273570846/17c96d9ce6c135f7511a001e8584db17.png?size=2048');
                try {
                    util.sendDeletableMessage(message.channel, { embed }, message.author);
				}   catch (err) {
                    console.error(err);
                }
                return;
	  });
	}
	
	if(cmd === `${prefix}slap`){
	  message.delete();
	  neko.sfw.slap().then(slap => {
	  const embed = new Discord.RichEmbed()
                embed
				.setAuthor(message.author.tag, message.author.avatarURL)
				.setDescription(`${message.author}` + ' 給你一巴掌。')
				.setColor(0xcc0000)
				.setTitle('ReiNa Bot')
				.setImage(slap.url)
                .setTimestamp()
				.setFooter('ReiNa By 一起來當馬猴燒酒吧 (>ω･* )ﾉ#9201', 'https://cdn.discordapp.com/avatars/418095978273570846/17c96d9ce6c135f7511a001e8584db17.png?size=2048');
                try {
                    util.sendDeletableMessage(message.channel, { embed }, message.author);
				}   catch (err) {
                    console.error(err);
                }
                return;
	  });
	}
	
	if(cmd === `${prefix}kiss`){
	  message.delete();
	  neko.sfw.kiss().then(kiss => {
	  const embed = new Discord.RichEmbed()
                embed
				.setAuthor(message.author.tag, message.author.avatarURL)
				.setDescription(`${message.author}` + ' Mua~')
				.setColor(0xcc0000)
				.setTitle('ReiNa Bot')
				.setImage(kiss.url)
                .setTimestamp()
				.setFooter('ReiNa By 一起來當馬猴燒酒吧 (>ω･* )ﾉ#9201', 'https://cdn.discordapp.com/avatars/418095978273570846/17c96d9ce6c135f7511a001e8584db17.png?size=2048');
                try {
                    util.sendDeletableMessage(message.channel, { embed }, message.author);
				}   catch (err) {
                    console.error(err);
                }
                return;
	  });
	}
	
	if(cmd === `${prefix}pat`){
	  message.delete();
	  neko.sfw.pat().then(pat => {
	  const embed = new Discord.RichEmbed()
                embed
				.setAuthor(message.author.tag, message.author.avatarURL)
				.setDescription(`${message.author}` + '拍拍~')
				.setColor(0xcc0000)
				.setTitle('ReiNa Bot')
				.setImage(pat.url)
                .setTimestamp()
				.setFooter('ReiNa By 一起來當馬猴燒酒吧 (>ω･* )ﾉ#9201', 'https://cdn.discordapp.com/avatars/418095978273570846/17c96d9ce6c135f7511a001e8584db17.png?size=2048');
                try {
                    util.sendDeletableMessage(message.channel, { embed }, message.author);
				}   catch (err) {
                    console.error(err);
                }
                return;
	  });
	}
	
	if(cmd === `${prefix}fox`){
	  message.delete();
	  neko.sfw.foxGirl().then(fox => {
	  const embed = new Discord.RichEmbed()
                embed
				.setAuthor(message.author.tag, message.author.avatarURL)
				.setDescription(`${message.author}` + '你要求的foxGirl 隨機圖片到啦~')
				.setColor(0xcc0000)
				.setTitle('ReiNa Bot')
				.setImage(fox.url)
                .setTimestamp()
				.setFooter('ReiNa By 一起來當馬猴燒酒吧 (>ω･* )ﾉ#9201', 'https://cdn.discordapp.com/avatars/418095978273570846/17c96d9ce6c135f7511a001e8584db17.png?size=2048');
                try {
                    util.sendDeletableMessage(message.channel, { embed }, message.author);
				}   catch (err) {
                    console.error(err);
                }
                return;
	  });
	}
	
	if(cmd === `${prefix}meow`){
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
				.setFooter('ReiNa By 一起來當馬猴燒酒吧 (>ω･* )ﾉ#9201', 'https://cdn.discordapp.com/avatars/418095978273570846/17c96d9ce6c135f7511a001e8584db17.png?size=2048');
                try {
                    util.sendDeletableMessage(message.channel, { embed }, message.author);
				}   catch (err) {
                    console.error(err);
                }
                return;
	  });
	}

	if(cmd === `${prefix}woof`){
	  message.delete();
	  neko.sfw.woof().then(woof => {
	  const embed = new Discord.RichEmbed()
                embed
				.setAuthor(message.author.tag, message.author.avatarURL)
				.setDescription(`${message.author}` + 'Woof~')
				.setColor(0xcc0000)
				.setTitle('ReiNa Bot')
				.setImage(woof.url)
                .setTimestamp()
				.setFooter('ReiNa By 一起來當馬猴燒酒吧 (>ω･* )ﾉ#9201', 'https://cdn.discordapp.com/avatars/418095978273570846/17c96d9ce6c135f7511a001e8584db17.png?size=2048');
                try {
                    util.sendDeletableMessage(message.channel, { embed }, message.author);
				}   catch (err) {
                    console.error(err);
                }
                return;
	  });
	}
	
	if(cmd === `${prefix}nekoGif`){
	  message.delete();
	  neko.sfw.nekoGif().then(nekoGif => {
	  const embed = new Discord.RichEmbed()
                embed
				.setAuthor(message.author.tag, message.author.avatarURL)
				.setDescription(`${message.author}` + '會動的neko ~')
				.setColor(0xcc0000)
				.setTitle('ReiNa Bot')
				.setImage(nekoGif.url)
                .setTimestamp()
				.setFooter('ReiNa By 一起來當馬猴燒酒吧 (>ω･* )ﾉ#9201', 'https://cdn.discordapp.com/avatars/418095978273570846/17c96d9ce6c135f7511a001e8584db17.png?size=2048');
                try {
                    util.sendDeletableMessage(message.channel, { embed }, message.author);
				}   catch (err) {
                    console.error(err);
                }
                return;
	  });
	}
	
	if(cmd === `${prefix}nfsw-neko`){
	  message.delete();
	  neko.nsfw.neko().then(neko => {
	  const embed = new Discord.RichEmbed()
                embed
				.setAuthor(message.author.tag, message.author.avatarURL)
				.setDescription(`${message.author}` + 'Not Save For Work! neko ~')
				.setColor(0xcc0000)
				.setTitle('ReiNa Bot')
				.setImage(neko.url)
                .setTimestamp()
				.setFooter('ReiNa By 一起來當馬猴燒酒吧 (>ω･* )ﾉ#9201', 'https://cdn.discordapp.com/avatars/418095978273570846/17c96d9ce6c135f7511a001e8584db17.png?size=2048');
                try {
                    util.sendDeletableMessage(message.channel, { embed }, message.author);
				}   catch (err) {
                    console.error(err);
                }
                return;
	  });
	}
	
	if(cmd === `${prefix}nsfw-nekoGif`){
	  message.delete();
	  neko.nsfw.nekoGif().then(nekoGif => {
	  const embed = new Discord.RichEmbed()
                embed
				.setAuthor(message.author.tag, message.author.avatarURL)
				.setDescription(`${message.author}` + 'Not Save For Work! 會動的neko ~')
				.setColor(0xcc0000)
				.setTitle('ReiNa Bot')
				.setImage(nekoGif.url)
                .setTimestamp()
				.setFooter('ReiNa By 一起來當馬猴燒酒吧 (>ω･* )ﾉ#9201', 'https://cdn.discordapp.com/avatars/418095978273570846/17c96d9ce6c135f7511a001e8584db17.png?size=2048');
                try {
                    util.sendDeletableMessage(message.channel, { embed }, message.author);
				}   catch (err) {
                    console.error(err);
                }
                return;
	  });
	}
	
	if(cmd === `${prefix}nsfw-avatar`){
	  message.delete();
	  neko.nsfw.avatar().then(avatar => {
	  const embed = new Discord.RichEmbed()
                embed
				.setAuthor(message.author.tag, message.author.avatarURL)
				.setDescription(`${message.author}` + 'Not Save For Work! Avatar ~')
				.setColor(0xcc0000)
				.setTitle('ReiNa Bot')
				.setImage(avatar.url)
                .setTimestamp()
				.setFooter('ReiNa By 一起來當馬猴燒酒吧 (>ω･* )ﾉ#9201', 'https://cdn.discordapp.com/avatars/418095978273570846/17c96d9ce6c135f7511a001e8584db17.png?size=2048');
                try {
                    util.sendDeletableMessage(message.channel, { embed }, message.author);
				}   catch (err) {
                    console.error(err);
                }
                return;
	  });
	}
	
	if(cmd === `${prefix}nsfw-feet`){
	  message.delete();
	  neko.nsfw.feet().then(feet => {
	  const embed = new Discord.RichEmbed()
                embed
				.setAuthor(message.author.tag, message.author.avatarURL)
				.setDescription(`${message.author}` + 'Not Save For Work! Avatar ~')
				.setColor(0xcc0000)
				.setTitle('ReiNa Bot')
				.setImage(feet.url)
                .setTimestamp()
				.setFooter('ReiNa By 一起來當馬猴燒酒吧 (>ω･* )ﾉ#9201', 'https://cdn.discordapp.com/avatars/418095978273570846/17c96d9ce6c135f7511a001e8584db17.png?size=2048');
                try {
                    util.sendDeletableMessage(message.channel, { embed }, message.author);
				}   catch (err) {
                    console.error(err);
                }
                return;
	  });
	}
	
	if(cmd === `${prefix}nsfw-eroNeko`){
	  message.delete();
	  neko.nsfw.eroNeko().then(eroNeko => {
	  const embed = new Discord.RichEmbed()
                embed
				.setAuthor(message.author.tag, message.author.avatarURL)
				.setDescription(`${message.author}` + 'Not Save For Work! Woooooooooo~')
				.setColor(0xcc0000)
				.setTitle('ReiNa Bot')
				.setImage(eroNeko.url)
                .setTimestamp()
				.setFooter('ReiNa By 一起來當馬猴燒酒吧 (>ω･* )ﾉ#9201', 'https://cdn.discordapp.com/avatars/418095978273570846/17c96d9ce6c135f7511a001e8584db17.png?size=2048');
                try {
                    util.sendDeletableMessage(message.channel, { embed }, message.author);
				}   catch (err) {
                    console.error(err);
                }
                return;
	  });
	}
	
	if(cmd === `${prefix}nsfw-ero`){
	  message.delete();
	  neko.nsfw.ero().then(ero => {
	  const embed = new Discord.RichEmbed()
                embed
				.setAuthor(message.author.tag, message.author.avatarURL)
				.setDescription(`${message.author}` + 'Not Save For Work! Woooooooooo~')
				.setColor(0xcc0000)
				.setTitle('ReiNa Bot')
				.setImage(ero.url)
                .setTimestamp()
				.setFooter('ReiNa By 一起來當馬猴燒酒吧 (>ω･* )ﾉ#9201', 'https://cdn.discordapp.com/avatars/418095978273570846/17c96d9ce6c135f7511a001e8584db17.png?size=2048');
                try {
                    util.sendDeletableMessage(message.channel, { embed }, message.author);
				}   catch (err) {
                    console.error(err);
                }
                return;
	  });
	}
	
	if(cmd === `${prefix}nsfw-eroFeet`){
	  message.delete();
	  neko.nsfw.eroFeet().then(eroFeet => {
	  const embed = new Discord.RichEmbed()
                embed
				.setAuthor(message.author.tag, message.author.avatarURL)
				.setDescription(`${message.author}` + 'Not Save For Work! Woooooooooo~')
				.setColor(0xcc0000)
				.setTitle('ReiNa Bot')
				.setImage(eroFeet.url)
                .setTimestamp()
				.setFooter('ReiNa By 一起來當馬猴燒酒吧 (>ω･* )ﾉ#9201', 'https://cdn.discordapp.com/avatars/418095978273570846/17c96d9ce6c135f7511a001e8584db17.png?size=2048');
                try {
                    util.sendDeletableMessage(message.channel, { embed }, message.author);
				}   catch (err) {
                    console.error(err);
                }
                return;
	  });
	}
	
	if(cmd === `${prefix}nsfw-eroKitsune`){
	  message.delete();
	  neko.nsfw.eroKitsune().then(eroKitsune => {
	  const embed = new Discord.RichEmbed()
                embed
				.setAuthor(message.author.tag, message.author.avatarURL)
				.setDescription(`${message.author}` + 'Not Save For Work! Woooooooooo~')
				.setColor(0xcc0000)
				.setTitle('ReiNa Bot')
				.setImage(eroKitsune.url)
                .setTimestamp()
				.setFooter('ReiNa By 一起來當馬猴燒酒吧 (>ω･* )ﾉ#9201', 'https://cdn.discordapp.com/avatars/418095978273570846/17c96d9ce6c135f7511a001e8584db17.png?size=2048');
                try {
                    util.sendDeletableMessage(message.channel, { embed }, message.author);
				}   catch (err) {
                    console.error(err);
                }
                return;
	  });
	}
	
	if(cmd === `${prefix}nsfw-hentai`){
	  message.delete();
	  neko.nsfw.hentai().then(hentai => {
	  const embed = new Discord.RichEmbed()
                embed
				.setAuthor(message.author.tag, message.author.avatarURL)
				.setDescription(`${message.author}` + 'Not Save For Work! Woooooooooo~')
				.setColor(0xcc0000)
				.setTitle('ReiNa Bot')
				.setImage(hentai.url)
                .setTimestamp()
				.setFooter('ReiNa By 一起來當馬猴燒酒吧 (>ω･* )ﾉ#9201', 'https://cdn.discordapp.com/avatars/418095978273570846/17c96d9ce6c135f7511a001e8584db17.png?size=2048');
                try {
                    util.sendDeletableMessage(message.channel, { embed }, message.author);
				}   catch (err) {
                    console.error(err);
                }
                return;
	  });
	}

	if(cmd === `${prefix}nsfw-feetGif`){
	  message.delete();
	  neko.nsfw.feetGif().then(feetGif => {
	  const embed = new Discord.RichEmbed()
                embed
				.setAuthor(message.author.tag, message.author.avatarURL)
				.setDescription(`${message.author}` + 'Not Save For Work! Woooooooooo~')
				.setColor(0xcc0000)
				.setTitle('ReiNa Bot')
				.setImage(feetGif.url)
                .setTimestamp()
				.setFooter('ReiNa By 一起來當馬猴燒酒吧 (>ω･* )ﾉ#9201', 'https://cdn.discordapp.com/avatars/418095978273570846/17c96d9ce6c135f7511a001e8584db17.png?size=2048');
                try {
                    util.sendDeletableMessage(message.channel, { embed }, message.author);
				}   catch (err) {
                    console.error(err);
                }
                return;
	  });
	}
	
	if(cmd === `${prefix}nsfw-kitsune`){
	  message.delete();
	  neko.nsfw.kitsune().then(kitsune => {
	  const embed = new Discord.RichEmbed()
                embed
				.setAuthor(message.author.tag, message.author.avatarURL)
				.setDescription(`${message.author}` + 'Not Save For Work! Woooooooooo~')
				.setColor(0xcc0000)
				.setTitle('ReiNa Bot')
				.setImage(kitsune.url)
                .setTimestamp()
				.setFooter('ReiNa By 一起來當馬猴燒酒吧 (>ω･* )ﾉ#9201', 'https://cdn.discordapp.com/avatars/418095978273570846/17c96d9ce6c135f7511a001e8584db17.png?size=2048');
                try {
                    util.sendDeletableMessage(message.channel, { embed }, message.author);
				}   catch (err) {
                    console.error(err);
                }
                return;
	  });
	}
	
	if(cmd === `${prefix}nsfw-holo`){
	  message.delete();
	  neko.nsfw.holo().then(holo => {
	  const embed = new Discord.RichEmbed()
                embed
				.setAuthor(message.author.tag, message.author.avatarURL)
				.setDescription(`${message.author}` + 'Not Save For Work! Woooooooooo~')
				.setColor(0xcc0000)
				.setTitle('ReiNa Bot')
				.setImage(holo.url)
                .setTimestamp()
				.setFooter('ReiNa By 一起來當馬猴燒酒吧 (>ω･* )ﾉ#9201', 'https://cdn.discordapp.com/avatars/418095978273570846/17c96d9ce6c135f7511a001e8584db17.png?size=2048');
                try {
                    util.sendDeletableMessage(message.channel, { embed }, message.author);
				}   catch (err) {
                    console.error(err);
                }
                return;
	  });
	}
	
	if(cmd === `${prefix}nsfw-eroHolo`){
	  message.delete();
	  neko.nsfw.holoEro().then(holoEro => {
	  const embed = new Discord.RichEmbed()
                embed
				.setAuthor(message.author.tag, message.author.avatarURL)
				.setDescription(`${message.author}` + 'Not Save For Work! Woooooooooo~')
				.setColor(0xcc0000)
				.setTitle('ReiNa Bot')
				.setImage(holoEro.url)
                .setTimestamp()
				.setFooter('ReiNa By 一起來當馬猴燒酒吧 (>ω･* )ﾉ#9201', 'https://cdn.discordapp.com/avatars/418095978273570846/17c96d9ce6c135f7511a001e8584db17.png?size=2048');
                try {
                    util.sendDeletableMessage(message.channel, { embed }, message.author);
				}   catch (err) {
                    console.error(err);
                }
                return;
	  });
	}
	
	if(cmd === `${prefix}nsfw-blowJob`){
	  message.delete();
	  neko.nsfw.blowJob().then(blowJob => {
	  const embed = new Discord.RichEmbed()
                embed
				.setAuthor(message.author.tag, message.author.avatarURL)
				.setDescription(`${message.author}` + 'Not Save For Work! Woooooooooo~')
				.setColor(0xcc0000)
				.setTitle('ReiNa Bot')
				.setImage(blowJob.url)
                .setTimestamp()
				.setFooter('ReiNa By 一起來當馬猴燒酒吧 (>ω･* )ﾉ#9201', 'https://cdn.discordapp.com/avatars/418095978273570846/17c96d9ce6c135f7511a001e8584db17.png?size=2048');
                try {
                    util.sendDeletableMessage(message.channel, { embed }, message.author);
				}   catch (err) {
                    console.error(err);
                }
                return;
	  });
	}

	if(cmd === `${prefix}calc`){
		message.delete();
		if (!args[0]) {
			const embed = new Discord.RichEmbed()
			embed
			.setAuthor(message.author.tag, message.author.avatarURL)
			.setColor(0xffffff)
			.setTitle('錯誤')
			.setDescription(`${message.author}` + ' Senpai, 請輸入算式~')
			.setTimestamp()
			.setFooter('ReiNa By 一起來當馬猴燒酒吧 (>ω･* )ﾉ#9201', 'https://cdn.discordapp.com/avatars/418095978273570846/17c96d9ce6c135f7511a001e8584db17.png?size=2048');
			try {
				util.sendDeletableMessage(message.channel, { embed }, message.author);
			}   catch (err) {
				console.error(err);
			}
			return;
		};

		let resp;
		try{
			resp = math.evaluate(args.join(' '));
		} catch (e) {
			const embed = new Discord.RichEmbed()
			embed
			.setAuthor(message.author.tag, message.author.avatarURL)
			.setColor(0xffffff)
			.setTitle('錯誤')
			.setDescription(`${message.author}` + ' Senpai, 請輸入有效的算式!')
			.setTimestamp()
			.setFooter('ReiNa By 一起來當馬猴燒酒吧 (>ω･* )ﾉ#9201', 'https://cdn.discordapp.com/avatars/418095978273570846/17c96d9ce6c135f7511a001e8584db17.png?size=2048');
			util.sendDeletableMessage(message.channel, { embed }, message.author);
			return;
		}

		const embed = new Discord.RichEmbed()
			embed
			.setAuthor(message.author.tag, message.author.avatarURL)
			.setColor(0xffffff)
			.setTitle('算式計算')
			.setDescription(`${message.author}` + ' Senpai, 我算好了~')
			.addField('輸入', `\`\`\`js\n${args.join('')}\`\`\``)
			.addField('結果', `\`\`\`js\n${resp}\`\`\``)
			.setTimestamp()
			.setFooter('ReiNa By 一起來當馬猴燒酒吧 (>ω･* )ﾉ#9201', 'https://cdn.discordapp.com/avatars/418095978273570846/17c96d9ce6c135f7511a001e8584db17.png?size=2048');
			try {
				util.sendDeletableMessage(message.channel, { embed }, message.author);
			}   catch (err) {
				console.error(err);
			}
			return;
	}
	
	if(cmd === `${prefix}flip`){
	  message.delete();
	  let botmessage = args.join(" ");
	  botmessage = flip(botmessage);
	  const embed = new Discord.RichEmbed()
        if ( 1 === 1 ) {
			embed
			.setAuthor(message.author.tag, message.author.avatarURL)
			.setColor('#0099ff')
			.setTitle('ReiNa Bot')
			.setURL("https://mcwind.tk")
			.setDescription(botmessage)
			.setFooter('ReiNa By 一起來當馬猴燒酒吧 (>ω･* )ﾉ#9201', 'https://cdn.discordapp.com/avatars/418095978273570846/17c96d9ce6c135f7511a001e8584db17.png?size=2048');
                try {
                    util.sendDeletableMessage(message.channel, { embed }, message.author);
				}   catch (err) {
                    console.error(err);
                }
                return;
        }
  }
  
	if(cmd === `${prefix}reverse`){
	  message.delete();
	  let botmessage = args.join(" ");
	  botmessage = botmessage.split("").reverse().join("");
	  const embed = new Discord.RichEmbed()
			embed
			.setAuthor(message.author.tag, message.author.avatarURL)
			.setColor('#0099ff')
			.setTitle('ReiNa Bot')
			.setURL("https://mcwind.tk")
			.setDescription(botmessage)
			.setFooter('ReiNa By 一起來當馬猴燒酒吧 (>ω･* )ﾉ#9201', 'https://cdn.discordapp.com/avatars/418095978273570846/17c96d9ce6c135f7511a001e8584db17.png?size=2048');
                try {
                    util.sendDeletableMessage(message.channel, { embed }, message.author);
				}   catch(e){}
                return;
  }
  
  if(cmd === `${prefix}flip+reverse` || cmd === `${prefix}reverse+flip`){
	  message.delete();
	  let botmessage = args.join(" ");
	  botmessage = botmessage.split("").reverse().join("");
	  botmessage = flip(botmessage);
	  const embed = new Discord.RichEmbed()
        if ( 1 === 1 ) {
			embed
			.setAuthor(message.author.tag, message.author.avatarURL)
			.setColor('#0099ff')
			.setTitle('ReiNa Bot')
			.setURL("https://mcwind.tk")
			.setDescription(botmessage)
			.setFooter('ReiNa By 一起來當馬猴燒酒吧 (>ω･* )ﾉ#9201', 'https://cdn.discordapp.com/avatars/418095978273570846/17c96d9ce6c135f7511a001e8584db17.png?size=2048');
                try {
                    util.sendDeletableMessage(message.channel, { embed }, message.author);
				}   catch (e) {}
                return;
        }
  }

    if(cmd === `${prefix}r6`){
		if(messageArray.length === 3){
		request.get('https://r6tab.com/api/search.php?platform=' + messageArray[1] + '&search=' + messageArray[2], {},
		function(error, response, body){
		if(response.statusCode == 200){
			message.delete();
			var checkuser = JSON.parse(body);
			listuser = Object.values(checkuser).toString();
			if(listuser.toString() != "0"){
				var obj = JSON.parse(body);
				info = Object.values(obj.results[0]).toString();
				infoarray = info.split(",");
				request.get('https://r6tab.com/api/player.php?p_id=' + infoarray[0], {},
				function(error, response, r6data){
					var rawr6data = JSON.parse(r6data);
					r6pdata = Object.values(rawr6data.data).toString();
					r6pdataarray = r6pdata.split(",");
					pvptime = parseInt(r6pdataarray[0]) + parseInt(r6pdataarray[5]);
					var rank = "";
					var updatetime1 = rawr6data.updatedon.replace('Updated ', '數據更新於 ');
					var updatetime2 = updatetime1.replace('<u>', '');
					var updatetime3 = updatetime2.replace('</u>', '');
					var updatetime4 = updatetime3.replace('hours', '小時');
					var updatetime5 = updatetime4.replace('minutes', '分鐘');
					var updatetime6 = updatetime5.replace('days', '日');
					var updatetime7 = updatetime6.replace('seconds', '秒');
					var updatetime8 = updatetime7.replace('second', '秒');
					var updatetime9 = updatetime8.replace('hour', '小時');
					var updatetime10 = updatetime9.replace('day', '日');
					var updatetime11 = updatetime10.replace('day', '日');
					var updatetime12 = updatetime11.replace('minute', '分鐘');
					var updatetime13 = updatetime12.replace(' ago', '前');
					var updatetime14 = updatetime13.replace('one', '1');
					
					
					var favatt = rawr6data.favattacker.toString();
					var favdef = rawr6data.favdefender.toString();
					var favattout = "";
					var favdefout = "";
					if(favatt == "2:4"){
						favattout = "Glaz";
					}
					if(favatt == "2:5"){
						favattout = "Blitz";
					}
					if(favatt == "2:6"){
						favattout = "Buck";
					}
					if(favatt == "2:7"){
						favattout = "Blackbeard";
					}
					if(favatt == "2:8"){
						favattout = "Capitao";
					}
					if(favatt == "2:9"){
						favattout = "Hibana";
					}
					if(favatt == "2:A"){
						favattout = "Jackal";
					}
					if(favatt == "2:B"){
						favattout = "Ying";
					}
					if(favatt == "2:D"){
						favattout = "Dokkaebi";
					}
					if(favatt == "3:2"){
						favattout = "Ash";
					}
					if(favatt == "3:4"){
						favattout = "Fuze";
					}
					if(favatt == "3:5"){
						favattout = "IQ";
					}
					if(favatt == "3:C"){
						favattout = "Zofia";
					}
					if(favatt == "3:E"){
						favattout = "Lion";
					}
					if(favatt == "4:1"){
						favattout = "Siedge";
					}
					if(favatt == "4:3"){
						favattout = "Twitch";
					}
					if(favatt == "4:E"){
						favattout = "Finka";
					}
					if(favatt == "5:1"){
						favattout = "Thatcher";
					}
					if(favatt == "5:2"){
						favattout = "Thermite";
					}
					if(favatt == "5:3"){
						favattout = "Montagne";
					}
					if(favatt == "2:11"){
						favattout = "Nomad";
					}
					if(favatt == "2:10"){
						favattout = "Maverick";
					}
					if(favatt == "2:12"){
						favattout = "Gridlock";
					}
					if(favatt == "1:5"){
						favattout = "GSG9 Recruit";
					}
					if(favatt == "1:4"){
						favattout = "Spetsnaz Recruit";
					}
					if(favatt == "1:3"){
						favattout = "GIGN Recruit";
					}
					if(favatt == "1:2"){
						favattout = "FBI Recruit";
					}
					if(favatt == "1:1"){
						favattout = "SAS Recruit";
					}

					if(favdef == "2:1"){
						favdefout = "Smoke";
					}
					if(favdef == "2:2"){
						favdefout = "Castle";
					}
					if(favdef == "2:3"){
						favdefout = "Doc";
					}
					if(favdef == "2:C"){
						favdefout = "Ela";
					}
					if(favdef == "2:F"){
						favdefout = "Maestro";
					}
					if(favdef == "3:1"){
						favdefout = "Mute";
					}
					if(favdef == "3:3"){
						favdefout = "Rook";
					}
					if(favdef == "3:6"){
						favdefout = "Frost";
					}
					if(favdef == "3:7"){
						favdefout = "Valkyrie";
					}
					if(favdef == "3:8"){
						favdefout = "Caveira";
					}
					if(favdef == "3:9"){
						favdefout = "Echo";
					}
					if(favdef == "3:A"){
						favdefout = "Mira";
					}
					if(favdef == "3:B"){
						favdefout = "Lesion";
					}
					if(favdef == "3:D"){
						favdefout = "Vigil";
					}
					if(favdef == "3:F"){
						favdefout = "Alibi";
					}
					if(favdef == "4:2"){
						favdefout = "Pulse";
					}
					if(favdef == "4:4"){
						favdefout = "Kapkan";
					}
					if(favdef == "4:5"){
						favdefout = "Jager";
					}
					if(favdef == "5:4"){
						favdefout = "Tachanka";
					}
					if(favdef == "5:5"){
						favdefout = "Bandit";
					}
					if(favdef == "3:11"){
						favdefout = "Kaid";
					}
					if(favdef == "3:10"){
						favdefout = "Clash";
					}
					if(favdef == "3:12"){
						favdefout = "Mozzie";
					}
					if(favdef == "1:5"){
						favdefout = "GSG9 Recruit";
					}
					if(favdef == "1:4"){
						favdefout = "Spetsnaz Recruit";
					}
					if(favdef == "1:3"){
						favdefout = "GIGN Recruit";
					}
					if(favdef == "1:2"){
						favdefout = "FBI Recruit";
					}
					if(favdef == "1:1"){
						favdefout = "SAS Recruit";
					}
					
					var rankpic = "";
					var mmr = parseInt(rawr6data.p_currentmmr)
					if(mmr == 0){
						rank = "未排名";
						rankpic = "https://duckduckdoc.tk/wp-content/uploads/drive/r6rankpic/0.png";
					}
					if(mmr >= 1 && mmr < 1100){
						rank = "Copper V 紫銅V";
						rankpic = "https://duckduckdoc.tk/wp-content/uploads/drive/r6rankpic/1.png";
					}
					if(mmr >= 1100 && mmr < 1200){
						rank = "Copper IV 紫銅IV";
						rankpic = "https://duckduckdoc.tk/wp-content/uploads/drive/r6rankpic/2.png";
						
					}
					if(mmr >= 1200 && mmr < 1300){
						rank = "Copper III 紫銅III";
						rankpic = "https://duckduckdoc.tk/wp-content/uploads/drive/r6rankpic/3.png";
					}
					if(mmr >= 1300 && mmr < 1400){
						rank = "Copper II 紫銅II";
						rankpic = "https://duckduckdoc.tk/wp-content/uploads/drive/r6rankpic/4.png";
					}
					if(mmr >= 1400 && mmr < 1500){
						rank = "Copper I 紫銅I";
						rankpic = "https://duckduckdoc.tk/wp-content/uploads/drive/r6rankpic/5.png";
					}
					if(mmr >= 1500 && mmr < 1600){
						rank = "Bronze V 黃銅V";
						rankpic = "https://duckduckdoc.tk/wp-content/uploads/drive/r6rankpic/6.png";
					}
					if(mmr >= 1600 && mmr < 1700){
						rank = "Bronze IV 黃銅IV";
						rankpic = "https://duckduckdoc.tk/wp-content/uploads/drive/r6rankpic/7.png";
					}
					if(mmr >= 1700 && mmr < 1800){
						rank = "Bronze III 黃銅III";
						rankpic = "https://duckduckdoc.tk/wp-content/uploads/drive/r6rankpic/8.png";
					}
					if(mmr >= 1800 && mmr < 1900){
						rank = "Bronze II 黃銅II";
						rankpic = "https://duckduckdoc.tk/wp-content/uploads/drive/r6rankpic/9.png";
					}
					if(mmr >= 1900 && mmr < 2000){
						rank = "Bronze I 黃銅I";
						rankpic = "https://duckduckdoc.tk/wp-content/uploads/drive/r6rankpic/10.png";
					}
					if(mmr >= 2000 && mmr < 2100){
						rank = "Silver V 白銀V";
						rankpic = "https://duckduckdoc.tk/wp-content/uploads/drive/r6rankpic/11.png";
					}
					if(mmr >= 2100 && mmr < 2200){
						rank = "Silver IV 白銀IV";
						rankpic = "https://duckduckdoc.tk/wp-content/uploads/drive/r6rankpic/12.png";
					}
					if(mmr >= 2200 && mmr < 2300){
						rank = "Silver III 白銀III";
						rankpic = "https://duckduckdoc.tk/wp-content/uploads/drive/r6rankpic/13.png";
					}
					if(mmr >= 2300 && mmr < 2400){
						rank = "Silver II 白銀II";
						rankpic = "https://duckduckdoc.tk/wp-content/uploads/drive/r6rankpic/14.png";
					}
					if(mmr >= 2400 && mmr < 2600){
						rank = "Silver I 白銀I";
						rankpic = "https://duckduckdoc.tk/wp-content/uploads/drive/r6rankpic/15.png";
					}
					if(mmr >= 2600 && mmr < 2800){
						rank = "Gold III 黃金III";
						rankpic = "https://duckduckdoc.tk/wp-content/uploads/drive/r6rankpic/16.png";
					}
					if(mmr >= 2800 && mmr < 3000){
						rank = "Gold II 黃金II";
						rankpic = "https://duckduckdoc.tk/wp-content/uploads/drive/r6rankpic/17.png";
					}
					if(mmr >= 3000 && mmr < 3200){
						rank = "Gold I 黃金I";
						rankpic = "https://duckduckdoc.tk/wp-content/uploads/drive/r6rankpic/18.png";
					}
					if(mmr >= 3200 && mmr < 3600){
						rank = "Platinum III 白金III";
						rankpic = "https://duckduckdoc.tk/wp-content/uploads/drive/r6rankpic/19.png";
					}
					if(mmr >= 3600 && mmr < 4000){
						rank = "Platinum II 白金II";
						rankpic = "https://duckduckdoc.tk/wp-content/uploads/drive/r6rankpic/20.png";
					}
					if(mmr >= 4000 && mmr < 4400){
						rank = "Platinum I 白金I";
						rankpic = "https://duckduckdoc.tk/wp-content/uploads/drive/r6rankpic/21.png";
					}
					if(mmr >= 4400 && mmr < 5000){
						rank = "Diamond!!! 鑽石階級"
						rankpic = "https://duckduckdoc.tk/wp-content/uploads/drive/r6rankpic/22.png";
					}
					if(mmr >= 5000){
						rank = "Champion!!! 冠軍階級";
						rankpic = "https://duckduckdoc.tk/wp-content/uploads/drive/r6rankpic/23.png";
					}
					const embed = new Discord.RichEmbed()
						embed
						.setAuthor(message.author.tag, message.author.avatarURL)
						.setThumbnail(rankpic)
						.setColor('#0099ff')
						.setTitle("R6 玩家查詢 (詳細資料請點我 (=ﾟωﾟ)ﾉ)")
						.setURL('https://r6tab.com/' + rawr6data.p_id)
						.setDescription(`${message.author}` + " Senpai, 你請求的R6 Siege 玩家資料找到了~")
						.addField('玩家UID: ', rawr6data.p_name, true)
						.addField('玩家等級: ', rawr6data.p_level, true)
						.addField('平台: ', rawr6data.p_platform, true)
						.addField('現時積分: ', rawr6data.p_currentmmr, true)
						.addField('玩家排位: ', rank, true)
						.addField('玩家KD: ', parseInt(rawr6data.kd.toString()) / 100, true)
						.addField('爆頭率: ', parseInt(rawr6data.p_headshotacc.toString()) / 1000000 + "%", true)
						.addField('排位勝場: ', r6pdataarray[3], true)
						.addField('排位敗場: ', r6pdataarray[4], true)
						.addField('排位賽殺人數: ', r6pdataarray[1], true)
						.addField('排位賽死亡數: ', r6pdataarray[2], true)
						.addField('使用子彈數量: ', r6pdataarray[16], true)
						.addField('爆頭擊殺數: ', r6pdataarray[17], true)
						.addField('近戰擊殺數: ', r6pdataarray[18], true)
						.addField('施救隊友數: ', r6pdataarray[19], true)
						.addField('最喜歡攻方幹員: ', favattout, true)
						.addField('最喜歡守方幹員: ', favdefout, true)
						.addField('自殺次數: ', r6pdataarray[20], true)
						.addField('PVP遊玩時數(小時): ', Math.floor(pvptime / 60 / 60), true)
						.addField('數據更新: ', updatetime14, true)
						
						.setFooter('ReiNa By 一起來當馬猴燒酒吧 (>ω･* )ﾉ#9201', 'https://cdn.discordapp.com/avatars/418095978273570846/17c96d9ce6c135f7511a001e8584db17.png?size=2048');
						try {
							util.sendDeletableMessage(message.channel, { embed }, message.author);
						}   catch (err) {
							console.error(err);
						}
				})
			}
		else{
			const embed = new Discord.RichEmbed()
				embed
                .setAuthor(message.author.tag, message.author.avatarURL)
                .setColor('#0099ff')
                   .setTitle("ReiNa Bot R6指令錯誤")
                    .setURL("https://mcwind.tk")
                    .setDescription(`${message.author}` + " Senpai, 沒有找到該位玩家欸!")				
                    .setFooter('ReiNa By 一起來當馬猴燒酒吧 (>ω･* )ﾉ#9201', 'https://cdn.discordapp.com/avatars/418095978273570846/17c96d9ce6c135f7511a001e8584db17.png?size=2048');
                    try {
                        util.sendDeletableMessage(message.channel, { embed }, message.author);
                    }   catch (err) {
                        console.error(err);
                    }
		}
		}
		})
	}
	else{
		const embed = new Discord.RichEmbed()
		embed
		.setDescription("請輸入正確資料")
		.setColor(0xcc0000)
		.setTitle('ReiNa Bot 錯誤')
		.setURL("https://mcwind.tk")
		.addField('使用方法: ', "rn!r6 [平台] [玩家UID]\n平台輸入 `uplay` `psn` `xbl` 分別為Uplay, PlayStationNetwork, Xbox", true)
		.setTimestamp()
		.setFooter('ReiNa By 一起來當馬猴燒酒吧 (>ω･* )ﾉ#9201', 'https://cdn.discordapp.com/avatars/418095978273570846/17c96d9ce6c135f7511a001e8584db17.png?size=2048');
		try {
			util.sendDeletableMessage(message.channel, { embed }, message.author);
		}   catch (err) {
				console.error(err);
		}
		return;
	}
	}
  
});

function getRandomInt(max) {
return Math.floor(Math.random() * Math.floor(max));
}

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
		return;
	}

	const dispatcher = serverQueue.connection.playStream(ytdl(song.url))
		.on('end', reason => {
			if (reason === 'Stream is not generating quickly enough.');
			else console.log(reason);
			serverQueue.songs.shift();
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
}
