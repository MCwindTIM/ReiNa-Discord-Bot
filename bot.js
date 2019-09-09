const botconfig = require("./botconfig.json");
const Discord = require("discord.js");
const YouTube = require('simple-youtube-api');
const ytdl = require('ytdl-core');
const bot = new Discord.Client({disableEveryone: true});
const util = require('./util.js');
const youtube = new YouTube(botconfig.YoutubeAPI);
const queue = new Map();
var wincmd = require('node-cmd');
var request = require ("request");
process.title = 'ReiNaBot'
bot.login(botconfig.token);
let timer = {};

bot.on('warn', console.warn);
bot.on('error', console.error);
bot.on("ready", async () => {
	console.log(`${bot.user.username} 上線!`);
    console.log(`加入了 ${bot.guilds.size} 個伺服器.`);
  	bot.user.setPresence({ game: { name: 'rn!help | ReiNa Is Here! Nya~~~~' , type: 3 } });
});
bot.on('reconnecting', () => {
 console.log('重新連接中!');
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
				.setColor('#0099ff')
				.setTitle('ReiNa Bot')
				.setURL("https://mcwind.tk")
				.setDescription("下面有可以使用的指令哦 請 " + `${message.author}` + " 耐心看完 最後更新201909071830\n```\n--實用指令--\nrn!clear [數目]  清除信息\nrn!myid       查看ID\nrn!timer [start/stop]   計時器指令\nrn!avatar     獲取你的Discord頭像\nrn!avatar [@某使用者]    獲得該使用者頭像\nrn!roll [最大數值]    隨機抽出一個數字!\nrn!say [單字/句子] 能讓我乖乖的跟著你說一次\nrn!me [單字/句子]  用自己做句 例:rn!me nya 輸出:@自己 nya\nrn!invite         邀請由MCwind製作/更新的Discord機械人！\nrn!img            請求隨機動漫圖片！\nrn!hentai         請求隨機本子\nrn!img-glasses    請求隨機眼睛娘圖片！\nrn!img-nsfw       可能含有18+內容！\nrn!ebase [信息]     加密信息\nrn!dbase [信息]     解密信息\nrn!dec [十進制數值]    輸入數值轉換至其他進制\nrn!hex [十六進制數值]  輸入數值轉換至其他進制\nrn!bin [二進制數值]    輸入數值轉換至其他進制\nrn!flux [數值]    輸入港幣獲得可以購買的flux數量!\n-------------------------------------------------------\n\n--圖片--\nrn!no\nrn!green\nrn!$\nrn!$$\nrn!$$$\nrn!tea\nrn!onemanarmy\nrn!bb\nrn!非洲\nrn!money\nrn!loading\nrn!drug\nrn!stella!\n-----------\n\n--特殊指令--\nrn!mememe\nrn!課金課曬佢\n------------------------------------------------```")
				.setFooter('ReiNa By 一起來當馬猴燒酒吧 (>ω･* )ﾉ#9201', 'https://i.imgur.com/99GMP6a.png')
				.setTimestamp();
                try {
                    util.sendDeletableMessage(message.channel, { embed }, message.author, message);
				}   catch (err) {
                    console.error(err);
				}
                return;
            }
	}

	if(cmd === `${prefix}ping`){
	  message.delete(); 
	  const embed = new Discord.RichEmbed()
            if ( 1 === 1 ) {
                embed
				.setDescription(`Pong!`)
				.setColor(0xcc0000)
				.setTitle('ReiNa Bot')
				.setURL("https://mcwind.tk")
                .setTimestamp()
				.setFooter('ReiNa By 一起來當馬猴燒酒吧 (>ω･* )ﾉ#9201', 'https://i.imgur.com/99GMP6a.png');
                try {
                    await util.sendDeletableMessage(message.channel, { embed }, message.author, message);
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
				.setDescription("你的Discord使用者ID是: " + message.author.id)
				.setColor(0xcc0000)
				.setTitle('ReiNa Bot')
				.setURL("https://mcwind.tk")
                .setTimestamp()
				.setFooter('ReiNa By 一起來當馬猴燒酒吧 (>ω･* )ﾉ#9201', 'https://i.imgur.com/99GMP6a.png');
                try {
                    await util.sendDeletableMessage(message.channel, { embed }, message.author, message);
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
				.setColor('#0099ff')
				.setTitle('MCwind 隨機圖片API')
				.setURL(response.request.uri.href)
				.setDescription(`${message.author}` + ' Senpai, 你要求的隨機圖片在這。')
				.setImage(response.request.uri.href)
				.setTimestamp()
				.setFooter('ReiNa By 一起來當馬猴燒酒吧 (>ω･* )ﾉ#9201', 'https://i.imgur.com/99GMP6a.png');
                try {
                    util.sendDeletableMessage(message.channel, { embed }, message.author, message);
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
				.setColor('#0099ff')
				.setTitle('MCwind 隨機圖片API [NSFW]')
				.setURL(response.request.uri.href)
				.setDescription(`${message.author}` + ' Senpai, 你要求的隨機圖片在這。')
				.setImage(response.request.uri.href)
				.setFooter('ReiNa By 一起來當馬猴燒酒吧 (>ω･* )ﾉ#9201', 'https://i.imgur.com/99GMP6a.png');
                try {
                    util.sendDeletableMessage(message.channel, { embed }, message.author, message);
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
				.setColor('#0099ff')
				.setTitle('MCwind 眼鏡娘API')
				.setURL(response.request.uri.href)
				.setDescription(`${message.author}` + ' Senpai, 你要求的眼鏡娘在這。')
				.setImage(response.request.uri.href)
				.setFooter('ReiNa By 一起來當馬猴燒酒吧 (>ω･* )ﾉ#9201', 'https://i.imgur.com/99GMP6a.png');
                try {
                    util.sendDeletableMessage(message.channel, { embed }, message.author, message);
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
				.setColor('#0099ff')
				.setTitle('ReiNa Bot')
				.setURL("https://mcwind.tk")
				.setDescription(`${message.author}` + "Senpai, 刪除信息不能大於100哦!")
				.setFooter('ReiNa By 一起來當馬猴燒酒吧 (>ω･* )ﾉ#9201', 'https://i.imgur.com/99GMP6a.png')
				.setTimestamp();
                try {
                    await util.sendDeletableMessage(message.channel, { embed }, message.author, message);
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
				.setFooter('ReiNa By 一起來當馬猴燒酒吧 (>ω･* )ﾉ#9201', 'https://i.imgur.com/99GMP6a.png')
				.setTimestamp();
                try {
                    await util.sendDeletableMessage(message.channel, { embed }, message.author, message);
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
			.setFooter('ReiNa By 一起來當馬猴燒酒吧 (>ω･* )ﾉ#9201', 'https://i.imgur.com/99GMP6a.png')
			.setTimestamp();
                try {
                    await util.sendDeletableMessage(message.channel, { embed }, message.author, message);
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
			.setColor('#0099ff')
			.setTitle('ReiNa Bot')
			.setURL("https://mcwind.tk")
			.setDescription(botmessage)
			.setFooter('ReiNa By 一起來當馬猴燒酒吧 (>ω･* )ﾉ#9201', 'https://i.imgur.com/99GMP6a.png');
                try {
                    util.sendDeletableMessage(message.channel, { embed }, message.author, message);
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
				.setColor('#0099ff')
				.setTitle('ReiNa Bot')
				.setURL("https://mcwind.tk")
				.setDescription(`${message.author}` + " " + botmessage)
				.setFooter('ReiNa By 一起來當馬猴燒酒吧 (>ω･* )ﾉ#9201', 'https://i.imgur.com/99GMP6a.png');
                try {
                    util.sendDeletableMessage(message.channel, { embed }, message.author, message);
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
				.setColor('#0099ff')
				.setTitle('ReiNa Bot')
				.setURL("https://mcwind.tk")
				.setDescription(`${message.author}` + "表示")
				.setImage("https://duckduckdoc.tk/wp-content/uploads/googledrive/nonono.jpg")
				.setFooter('ReiNa By 一起來當馬猴燒酒吧 (>ω･* )ﾉ#9201', 'https://i.imgur.com/99GMP6a.png');
                try {
					util.sendDeletableMessage(message.channel, { embed }, message.author, message);
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
				.setColor('#0099ff')
				.setTitle('ReiNa Bot')
				.setURL("https://mcwind.tk")
				.setDescription(`${message.author}` + "表示")
				.setImage("https://duckduckdoc.tk/wp-content/uploads/googledrive/green.jpg")
				.setFooter('ReiNa By 一起來當馬猴燒酒吧 (>ω･* )ﾉ#9201', 'https://i.imgur.com/99GMP6a.png');
                try {
                    util.sendDeletableMessage(message.channel, { embed }, message.author, message);
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
				.setColor('#0099ff')
				.setTitle('ReiNa Bot')
				.setURL("https://mcwind.tk")
				.setDescription(`${message.author}` + "表示")
				.setImage("https://duckduckdoc.tk/wp-content/uploads/googledrive/$.jpg")
				.setFooter('ReiNa By 一起來當馬猴燒酒吧 (>ω･* )ﾉ#9201', 'https://i.imgur.com/99GMP6a.png');
                try {
                    util.sendDeletableMessage(message.channel, { embed }, message.author, message);
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
				.setColor('#0099ff')
				.setTitle('ReiNa Bot')
				.setURL("https://mcwind.tk")
				.setDescription(`${message.author}` + "表示")
				.setImage("https://duckduckdoc.tk/wp-content/uploads/googledrive/$$.jpg")
				.setFooter('ReiNa By 一起來當馬猴燒酒吧 (>ω･* )ﾉ#9201', 'https://i.imgur.com/99GMP6a.png');
                try {
                    util.sendDeletableMessage(message.channel, { embed }, message.author, message);
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
				.setColor('#0099ff')
				.setTitle('ReiNa Bot')
				.setURL("https://mcwind.tk")
				.setDescription(`${message.author}` + "表示")
				.setImage("https://duckduckdoc.tk/wp-content/uploads/googledrive/$$$.jpg")
				.setFooter('ReiNa By 一起來當馬猴燒酒吧 (>ω･* )ﾉ#9201', 'https://i.imgur.com/99GMP6a.png');
                try {
                    util.sendDeletableMessage(message.channel, { embed }, message.author, message);
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
				.setColor('#0099ff')
				.setTitle('ReiNa Bot')
				.setURL("https://mcwind.tk")
				.setDescription(`${message.author}` + "表示")
				.setImage("https://duckduckdoc.tk/wp-content/uploads/googledrive/tea.jpg")
				.setFooter('ReiNa By 一起來當馬猴燒酒吧 (>ω･* )ﾉ#9201', 'https://i.imgur.com/99GMP6a.png');
                try {
                    util.sendDeletableMessage(message.channel, { embed }, message.author, message);
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
				.setColor('#0099ff')
				.setTitle('ReiNa Bot')
				.setURL("https://mcwind.tk")
				.setDescription(`${message.author}` + "表示")
				.setImage("https://duckduckdoc.tk/wp-content/uploads/googledrive/onemanarmy.jpg")
				.setFooter('ReiNa By 一起來當馬猴燒酒吧 (>ω･* )ﾉ#9201', 'https://i.imgur.com/99GMP6a.png');
                try {
                    util.sendDeletableMessage(message.channel, { embed }, message.author, message);
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
				.setColor('#0099ff')
				.setTitle('ReiNa Bot')
				.setURL("https://mcwind.tk")
				.setDescription(`${message.author}` + "表示")
				.setImage("https://duckduckdoc.tk/wp-content/uploads/googledrive/feizhou.jpg")
				.setFooter('ReiNa By 一起來當馬猴燒酒吧 (>ω･* )ﾉ#9201', 'https://i.imgur.com/99GMP6a.png');
                try {
                    util.sendDeletableMessage(message.channel, { embed }, message.author, message);
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
				.setColor('#0099ff')
				.setTitle('ReiNa Bot')
				.setURL("https://mcwind.tk")
				.setDescription(`${message.author}` + "表示")
				.setImage("https://duckduckdoc.tk/wp-content/uploads/googledrive/money.jpg")
				.setFooter('ReiNa By 一起來當馬猴燒酒吧 (>ω･* )ﾉ#9201', 'https://i.imgur.com/99GMP6a.png');
                try {
                    util.sendDeletableMessage(message.channel, { embed }, message.author, message);
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
				.setColor('#0099ff')
				.setTitle('ReiNa Bot')
				.setURL("https://mcwind.tk")
				.setDescription(`${message.author}` + "表示")
				.setImage("https://duckduckdoc.tk/wp-content/uploads/googledrive/loading.gif")
				.setFooter('ReiNa By 一起來當馬猴燒酒吧 (>ω･* )ﾉ#9201', 'https://i.imgur.com/99GMP6a.png');
                try {
                    util.sendDeletableMessage(message.channel, { embed }, message.author, message);
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
				.setColor('#0099ff')
				.setTitle('ReiNa Bot')
				.setURL("https://mcwind.tk")
				.setDescription(`${message.author}` + "表示")
				.setImage("https://duckduckdoc.tk/wp-content/uploads/googledrive/drug.gif")
				.setFooter('ReiNa By 一起來當馬猴燒酒吧 (>ω･* )ﾉ#9201', 'https://i.imgur.com/99GMP6a.png');
                try {
                    util.sendDeletableMessage(message.channel, { embed }, message.author, message);
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
				.setColor('#0099ff')
				.setTitle('ReiNa Bot')
				.setURL("https://mcwind.tk")
				.setDescription(`${message.author}` + "表示")
				.setImage("https://duckduckdoc.tk/wp-content/uploads/googledrive/stella.gif")
				.setFooter('ReiNa By 一起來當馬猴燒酒吧 (>ω･* )ﾉ#9201', 'https://i.imgur.com/99GMP6a.png');
                try {
                    util.sendDeletableMessage(message.channel, { embed }, message.author, message);
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
				.setColor('#0099ff')
				.setTitle('ReiNa Bot')
				.setURL("https://mcwind.tk")
				.setDescription(`${message.author}` + "表示")
				.setImage("https://duckduckdoc.tk/wp-content/uploads/googledrive/beautiful.png")
				.setFooter('ReiNa By 一起來當馬猴燒酒吧 (>ω･* )ﾉ#9201', 'https://i.imgur.com/99GMP6a.png');
                try {
                    util.sendDeletableMessage(message.channel, { embed }, message.author, message);
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
				.setTitle('[GAY Youtube]')
				.setURL("https://www.youtube.com/watch?v=OODugXYqyy4&feature=youtu.be")
				.setColor('#0099ff')
				.setDescription("這是" + `${message.author}` + " 的請求")
				.setFooter('ReiNa By 一起來當馬猴燒酒吧 (>ω･* )ﾉ#9201', 'https://i.imgur.com/99GMP6a.png');
                try {
                    util.sendDeletableMessage(message.channel, { embed }, message.author, message);
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
				.setTitle('[課金課曬佢 Youtube]')
				.setURL("https://youtu.be/ouchD3lTs58?t=1m33s")
				.setColor('#0099ff')
				.setDescription("這是" + `${message.author}` + " 的請求")
				.setFooter('ReiNa By 一起來當馬猴燒酒吧 (>ω･* )ﾉ#9201', 'https://i.imgur.com/99GMP6a.png');
                try {
                    util.sendDeletableMessage(message.channel, { embed }, message.author, message);
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
				.setTitle('ReiNa Bot')
				.setURL("https://mcwind.tk")
				.setColor('#0099ff')
				.setDescription("這是" + `${message.author}` + " 的請求，你可以用以下鏈接邀請機械人\n\n\nReiNa Bot\n<https://discordapp.com/api/oauth2/authorize?client_id=418095978273570846&permissions=8&scope=bot>\n\nReiNa-AntiSpam\n<https://discordapp.com/api/oauth2/authorize?client_id=454324523571871754&permissions=8&scope=bot>\n\nReiNa-Cards\n<https://discordapp.com/api/oauth2/authorize?client_id=418363084508495872&permissions=8&scope=bot>\n\nReiNa-Music\n<https://discordapp.com/api/oauth2/authorize?client_id=423846938467762187&permissions=8&scope=bot>\n\nReiNa-WebSocket\n<https://discordapp.com/api/oauth2/authorize?client_id=580129877953609739&permissions=8&scope=bot>\n\nReiNa-LocalMusic\n<https://discordapp.com/api/oauth2/authorize?client_id=440968183277682708&permissions=8&scope=bot>\n\n飆車之鬼\n<https://discordapp.com/api/oauth2/authorize?client_id=601861890036989983&permissions=8&scope=bot>")
				.setFooter('ReiNa By 一起來當馬猴燒酒吧 (>ω･* )ﾉ#9201', 'https://i.imgur.com/99GMP6a.png');
                try {
                    util.sendDeletableMessage(message.channel, { embed }, message.author, message);
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
						.setColor('#0099ff')
						.setTitle('MCwind 隨機本子API-點擊我下載')
						.setURL(response.request.uri.href)
						.setDescription(`${message.author}` + ' Senpai, 你要求的隨機本子在這。')
						.setFooter('ReiNa By 一起來當馬猴燒酒吧 (>ω･* )ﾉ#9201', 'https://i.imgur.com/99GMP6a.png');
						try {
							util.sendDeletableMessage(message.channel, { embed }, message.author, message);
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
				.setColor('#0099ff')
				.setTitle('ReiNa Bot 十進制轉換')
				.setURL("https://mcwind.tk")
				.setDescription("Demical =" + dec + "\nBinary =" + bin + "\nHexadecimal =" + hex)
				.setFooter('ReiNa By 一起來當馬猴燒酒吧 (>ω･* )ﾉ#9201', 'https://i.imgur.com/99GMP6a.png');
                try {
                    util.sendDeletableMessage(message.channel, { embed }, message.author, message);
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
				.setColor('#0099ff')
				.setTitle('ReiNa Bot 十六進制轉換')
				.setURL("https://mcwind.tk")
				.setDescription("Demical =" + dec + "\nBinary =" + bin + "\nHexadecimal =" + hex)
				.setFooter('ReiNa By 一起來當馬猴燒酒吧 (>ω･* )ﾉ#9201', 'https://i.imgur.com/99GMP6a.png');
                try {
                    util.sendDeletableMessage(message.channel, { embed }, message.author, message);
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
				.setColor('#0099ff')
				.setTitle('ReiNa Bot 二進制轉換')
				.setURL("https://mcwind.tk")
				.setDescription("Demical =" + dec + "\nBinary =" + bin + "\nHexadecimal =" + hex)
				.setFooter('ReiNa By 一起來當馬猴燒酒吧 (>ω･* )ﾉ#9201', 'https://i.imgur.com/99GMP6a.png');
                try {
                    util.sendDeletableMessage(message.channel, { embed }, message.author, message);
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
				.setColor('#0099ff')
				.setTitle('ReiNa Bot Alt Code ')
				.setURL("https://mcwind.tk")
				.setDescription(output)
				.setFooter('ReiNa By 一起來當馬猴燒酒吧 (>ω･* )ﾉ#9201', 'https://i.imgur.com/99GMP6a.png');
                try {
                    util.sendDeletableMessage(message.channel, { embed }, message.author, message);
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
				.setColor('#0099ff')
				.setTitle('ReiNa Bot 加密信息')
				.setURL("https://mcwind.tk")
				.setDescription(tString)
				.setFooter('ReiNa By 一起來當馬猴燒酒吧 (>ω･* )ﾉ#9201', 'https://i.imgur.com/99GMP6a.png');
                try {
                    util.sendDeletableMessage(message.channel, { embed }, message.author, message);
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
				.setColor('#0099ff')
				.setTitle('ReiNa Bot 解密信息')
				.setURL("https://mcwind.tk")
				.setDescription(data)
				.setFooter('ReiNa By 一起來當馬猴燒酒吧 (>ω･* )ﾉ#9201', 'https://i.imgur.com/99GMP6a.png');
                try {
                    util.sendDeletableMessage(message.channel, { embed }, message.author, message);
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
				.setColor('#0099ff')
				.setTitle('ReiNa Bot 隨機數字')
				.setURL("https://mcwind.tk")
				.setDescription(getRandomInt(rndnum))
				.setFooter('ReiNa By 一起來當馬猴燒酒吧 (>ω･* )ﾉ#9201', 'https://i.imgur.com/99GMP6a.png');
                try {
                    util.sendDeletableMessage(message.channel, { embed }, message.author, message);
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
					.setColor('#0099ff')
					.setTitle('ReiNa Bot')
					.setURL("https://mcwind.tk")
					.setDescription("重新啟動中...:wave:")
					.setFooter('ReiNa By 一起來當馬猴燒酒吧 (>ω･* )ﾉ#9201', 'https://i.imgur.com/99GMP6a.png');
					try {
						util.sendDeletableMessage(message.channel, { embed }, message.author, message)
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
					.setFooter('ReiNa By 一起來當馬猴燒酒吧 (>ω･* )ﾉ#9201', 'https://i.imgur.com/99GMP6a.png');
					try {
						util.sendDeletableMessage(message.channel, { embed }, message.author, message);
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
					.setColor('#0099ff')
					.setTitle("ReiNa Bot 點我購買Trove Flux")
					.setURL("https://item.taobao.com/item.htm?spm=a1z09.2.0.0.6ce02e8dGSuOvJ&id=548238250656&_u=625udhqs9009")
					.setDescription(`${message.author}` + " \nSenpai, 你可以使用 `" + HKD + "` HKD購買到大約 `" + flux + "` 萬flux! (向下取整)\n今天港幣兌換人民幣匯率是: `" + body + "`\n購買數量請填入: `" + HKD * CNY + "`")
					.setFooter('ReiNa By 一起來當馬猴燒酒吧 (>ω･* )ﾉ#9201', 'https://i.imgur.com/99GMP6a.png');
					try {
                    util.sendDeletableMessage(message.channel, { embed }, message.author, message);
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
				.setDescription(`這裡不允許發送Discord邀請連結!`)
				.setColor(0xcc0000)
				.setTitle('ReiNa Bot')
				.setURL("https://mcwind.tk")
                .setTimestamp()
				.setFooter('ReiNa By 一起來當馬猴燒酒吧 (>ω･* )ﾉ#9201', 'https://i.imgur.com/99GMP6a.png');
                try {
                    await util.sendDeletableMessage(message.channel, { embed }, message.author, message);
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
				.setDescription(`${message.author}` + "Senpai, 這是<@" + user.id + ">的使用者頭像。")
				.setColor(0xcc0000)
				.setTitle('ReiNa Bot Discord頭像')
				.setURL(user.avatarURL)
				.setImage(user.avatarURL)
				.setTimestamp()
				.setFooter('ReiNa By 一起來當馬猴燒酒吧 (>ω･* )ﾉ#9201', 'https://i.imgur.com/99GMP6a.png');
                try {
                    await util.sendDeletableMessage(message.channel, { embed }, message.author, message);
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
				.setDescription(`${message.author}` + "開始計時。")
				.setColor(0xcc0000)
				.setTitle('ReiNa Bot 計時器')
				.setURL("https://mcwind.tk")
				.setTimestamp()
				.setFooter('ReiNa By 一起來當馬猴燒酒吧 (>ω･* )ﾉ#9201', 'https://i.imgur.com/99GMP6a.png');
                try {
                    await util.sendDeletableMessage(message.channel, { embed }, message.author, message);
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
							.setDescription(`${message.author}` + "計時結束。\n格式:`小時:分鐘:秒`\n\n" + h + ":" + m + ":" + s + "\n\n如果以每小時60HKD薪金計算, 將會是 `" + flux + "` 萬Flux!")
							.setColor(0xcc0000)
							.setTitle('ReiNa Bot 計時器')
							.setURL("https://mcwind.tk")
							.setTimestamp()
							.setFooter('ReiNa By 一起來當馬猴燒酒吧 (>ω･* )ﾉ#9201', 'https://i.imgur.com/99GMP6a.png');
							try {
								await util.sendDeletableMessage(message.channel, { embed }, message.author, message);
							}   catch (err) {
								console.error(err);
							}
					return;
					delete timer[message.author.id];
						}
					})
					}
					else{
						if (timer[message.author.id] < 10) timer[message.author.id] = "0" + timer[message.author.id];
							const embed = new Discord.RichEmbed()
							embed
							.setDescription(`${message.author}` + "你未開始計時, 請使用`timer`指令加上`start`參數開始計時")
							.setColor(0xcc0000)
							.setTitle('ReiNa Bot 計時器')
							.setURL("https://mcwind.tk")
							.setTimestamp()
							.setFooter('ReiNa By 一起來當馬猴燒酒吧 (>ω･* )ﾉ#9201', 'https://i.imgur.com/99GMP6a.png');
							try {
								await util.sendDeletableMessage(message.channel, { embed }, message.author, message);
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
						.setDescription(`${message.author}` + "請在`timer`指令後加入變數 `start` 或者 `stop`")
						.setColor(0xcc0000)
						.setTitle('ReiNa Bot 計時器')
						.setURL("https://mcwind.tk")
						.setTimestamp()
						.setFooter('ReiNa By 一起來當馬猴燒酒吧 (>ω･* )ﾉ#9201', 'https://i.imgur.com/99GMP6a.png');
						try {
							await util.sendDeletableMessage(message.channel, { embed }, message.author, message);
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
			.setDescription(`${message.author}` + " Senpai,  我很抱歉不能播放音樂, 因為你需要在語音頻道內!")
			.setColor(0xcc0000)
			.setTitle('ReiNa Bot')
			.setURL("https://mcwind.tk")
			.setTimestamp()
			.setFooter('ReiNa By 一起來當馬猴燒酒吧 (>ω･* )ﾉ#9201', 'https://i.imgur.com/99GMP6a.png');
			try {
			await util.sendDeletableMessage(message.channel, { embed }, message.author, message);
			}   catch (err) {
				console.error(err);
			}
			return;
		}
		const permissions = voiceChannel.permissionsFor(message.client.user);
		if(!permissions.has('CONNECT')){
			const embed = new Discord.RichEmbed()
			embed
			.setDescription(`${message.author}` + "我沒有權限進入語音頻道哇! 嗚嗚嗚😭~")
			.setColor(0xcc0000)
			.setTitle('ReiNa Bot 錯誤')
			.setURL("https://mcwind.tk")
			.setTimestamp()
			.setFooter('ReiNa By 一起來當馬猴燒酒吧 (>ω･* )ﾉ#9201', 'https://i.imgur.com/99GMP6a.png');
            try {
            await util.sendDeletableMessage(message.channel, { embed }, message.author, message);
			}   catch (err) {
            console.error(err);
			}
			return;
		}
		if(!permissions.has('SPEAK')){
			const embed = new Discord.RichEmbed()
			embed
			.setDescription(`${message.author}` + "我沒有權限在語音頻道發話哇! 嗚嗚嗚😭~")
			.setColor(0xcc0000)
			.setTitle('ReiNa Bot 錯誤')
			.setURL("https://mcwind.tk")
			.setTimestamp()
			.setFooter('ReiNa By 一起來當馬猴燒酒吧 (>ω･* )ﾉ#9201', 'https://i.imgur.com/99GMP6a.png');
            try {
            await util.sendDeletableMessage(message.channel, { embed }, message.author, message);
			}   catch (err) {
            console.error(err);
			}
			return;
		}

		if (url.match(/^https?:\/\/(www.youtube.com|youtube.com)\/playlist(.*)$/)) {
			const playlist = await youtube.getPlaylist(url);
			const videos = await playlist.getVideos();
			for (const video of Object.values(videos)) {
				const video2 = await youtube.getVideoByID(video.id);
				await handleVideo(video2, message, voiceChannel, true);
			}
			const embed = new Discord.RichEmbed()
			embed
			.setDescription("✅ 將整個播放清單: " + `**${playlist.title}**` + " 加入到播放列表中!\n\n\n**此信息將會在5秒後自動刪除**\n")
			.setColor(0xcc0000)
			.setTitle('ReiNa Bot')
			.setURL("https://mcwind.tk")
			.setTimestamp()
			.setFooter('ReiNa By 一起來當馬猴燒酒吧 (>ω･* )ﾉ#9201', 'https://i.imgur.com/99GMP6a.png');
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
					message.channel.send(`
__**歌曲選擇:**__
${videos.map(video2 => `**${++index} -** ${video2.title}`).join('\n')}
請Senpai在1到10號結果中選擇想播放的音樂哦!
					`);
					try {
						var response = await message.channel.awaitMessages(message2 => message2.content > 0 && message2.content < 11, {
							maxMatches: 1,
							time: 10000,
							errors: ['time']
						});
					} catch (err) {
						console.error(err);
						const embed = new Discord.RichEmbed()
						embed
						.setDescription(`${message.author}` + "沒有正確的參數或者超過輸入參數的時間!")
						.setColor(0xcc0000)
						.setTitle('ReiNa Bot 錯誤')
						.setURL("https://mcwind.tk")
						.setTimestamp()
						.setFooter('ReiNa By 一起來當馬猴燒酒吧 (>ω･* )ﾉ#9201', 'https://i.imgur.com/99GMP6a.png');
						util.sendDeletableMessage(message.channel, { embed }, message.author, message);
						}
					const videoIndex = parseInt(response.first().content);
					var video = await youtube.getVideoByID(videos[videoIndex - 1].id);
				} catch (err) {
					console.error(err);
					const embed = new Discord.RichEmbed()
					embed
					.setDescription(`${message.author}` + "我沒法取得任何搜尋結果!")
					.setColor(0xcc0000)
					.setTitle('ReiNa Bot 錯誤')
					.setURL("https://mcwind.tk")
					.setTimestamp()
					.setFooter('ReiNa By 一起來當馬猴燒酒吧 (>ω･* )ﾉ#9201', 'https://i.imgur.com/99GMP6a.png');
					util.sendDeletableMessage(message.channel, { embed }, message.author, message);
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
			.setDescription(`${message.author}` + "你不在語音頻道呀!")
			.setColor(0xcc0000)
			.setTitle('ReiNa Bot')
			.setURL("https://mcwind.tk")
			.setTimestamp()
			.setFooter('ReiNa By 一起來當馬猴燒酒吧 (>ω･* )ﾉ#9201', 'https://i.imgur.com/99GMP6a.png');
            try {
            await util.sendDeletableMessage(message.channel, { embed }, message.author, message);
		}   catch (err) {
            console.error(err);
        }
        return;
		}
		if (!serverQueue){
			const embed = new Discord.RichEmbed()
				embed
			.setDescription(`${message.author}` + " Senpai, 沒有在播放音樂, 所以沒有東西能跳過哦!")
			.setColor(0xcc0000)
			.setTitle('ReiNa Bot')
			.setURL("https://mcwind.tk")
			.setTimestamp()
			.setFooter('ReiNa By 一起來當馬猴燒酒吧 (>ω･* )ﾉ#9201', 'https://i.imgur.com/99GMP6a.png');
			try {
			await util.sendDeletableMessage(message.channel, { embed }, message.author, message);
			}   catch (err) {
				console.error(err);
			}
			return;
		} else {
			const embed = new Discord.RichEmbed()
				embed
			.setDescription(`${message.author}` + " Senpai, 已經為你跳過\n" + `**${serverQueue.songs[0].title}**` + "!")
			.setColor(0xcc0000)
			.setTitle('ReiNa Bot')
			.setURL("https://mcwind.tk")
			.setTimestamp()
			.setFooter('ReiNa By 一起來當馬猴燒酒吧 (>ω･* )ﾉ#9201', 'https://i.imgur.com/99GMP6a.png');
			try {
			await util.sendDeletableMessage(message.channel, { embed }, message.author, message);
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
			.setDescription(`${message.author}` + "你不在語音頻道呀!")
			.setColor(0xcc0000)
			.setTitle('ReiNa Bot')
			.setURL("https://mcwind.tk")
			.setTimestamp()
			.setFooter('ReiNa By 一起來當馬猴燒酒吧 (>ω･* )ﾉ#9201', 'https://i.imgur.com/99GMP6a.png');
            try {
            await util.sendDeletableMessage(message.channel, { embed }, message.author, message);
		}   catch (err) {
            console.error(err);
        }
        return;
		}
		if (!serverQueue){
			const embed = new Discord.RichEmbed()
				embed
			.setDescription(`💢${message.author}` + " Senpai, 沒有在播放音樂哦!")
			.setColor(0xcc0000)
			.setTitle('ReiNa Bot')
			.setURL("https://mcwind.tk")
			.setTimestamp()
			.setFooter('ReiNa By 一起來當馬猴燒酒吧 (>ω･* )ﾉ#9201', 'https://i.imgur.com/99GMP6a.png');
			try {
			await util.sendDeletableMessage(message.channel, { embed }, message.author, message);
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
			.setDescription(`${message.author}` + "你不在語音頻道呀!")
			.setColor(0xcc0000)
			.setTitle('ReiNa Bot')
			.setURL("https://mcwind.tk")
			.setTimestamp()
			.setFooter('ReiNa By 一起來當馬猴燒酒吧 (>ω･* )ﾉ#9201', 'https://i.imgur.com/99GMP6a.png');
            try {
            await util.sendDeletableMessage(message.channel, { embed }, message.author, message);
		}   catch (err) {
            console.error(err);
        }
        return;
		}
		if (!serverQueue){
			const embed = new Discord.RichEmbed()
				embed
			.setDescription(`💢${message.author}` + " Senpai, 沒有在播放音樂哦!")
			.setColor(0xcc0000)
			.setTitle('ReiNa Bot')
			.setURL("https://mcwind.tk")
			.setTimestamp()
			.setFooter('ReiNa By 一起來當馬猴燒酒吧 (>ω･* )ﾉ#9201', 'https://i.imgur.com/99GMP6a.png');
			try {
			await util.sendDeletableMessage(message.channel, { embed }, message.author, message);
			}   catch (err) {
				console.error(err);
			}
			return;
		}
		if (!messageArray[1]){
			const embed = new Discord.RichEmbed()
				embed
			.setDescription(`${message.author}` + " Senpai, 現在的音量是:" + `**${serverQueue.volume}**`)
			.setColor(0xcc0000)
			.setTitle('ReiNa Bot')
			.setURL("https://mcwind.tk")
			.setTimestamp()
			.setFooter('ReiNa By 一起來當馬猴燒酒吧 (>ω･* )ﾉ#9201', 'https://i.imgur.com/99GMP6a.png');
			try {
			await util.sendDeletableMessage(message.channel, { embed }, message.author, message);
			}   catch (err) {
				console.error(err);
			}
			return;
		} else {
		serverQueue.volume = messageArray[1];
		serverQueue.connection.dispatcher.setVolumeLogarithmic(messageArray[1] / 5);
		const embed = new Discord.RichEmbed()
			embed
		.setDescription(`${message.author}` + " 是的Senpai, 我把音量調整到: " + `**${messageArray[1]}**` + "了哦!")
		.setColor(0xcc0000)
		.setTitle('ReiNa Bot')
		.setURL("https://mcwind.tk")
		.setTimestamp()
		.setFooter('ReiNa By 一起來當馬猴燒酒吧 (>ω･* )ﾉ#9201', 'https://i.imgur.com/99GMP6a.png');
		try {
		await util.sendDeletableMessage(message.channel, { embed }, message.author, message);
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
			.setDescription(`💢${message.author}` + " Senpai, 沒有在播放音樂哦!")
			.setColor(0xcc0000)
			.setTitle('ReiNa Bot')
			.setURL("https://mcwind.tk")
			.setTimestamp()
			.setFooter('ReiNa By 一起來當馬猴燒酒吧 (>ω･* )ﾉ#9201', 'https://i.imgur.com/99GMP6a.png');
			try {
			await util.sendDeletableMessage(message.channel, { embed }, message.author, message);
			}   catch (err) {
				console.error(err);
			}
			return;
		} else {
			const embed = new Discord.RichEmbed()
				embed
			.setDescription("\n" + `${message.author}` + "\n\n" + `🎶 現正播放: **${serverQueue.songs[0].title}**` + "\n\n如果Senpai想要網址的話, 我放在下面哦!\n" + `${serverQueue.songs[0].url}`)
			.setColor(0xcc0000)
			.setTitle('ReiNa Bot')
			.setURL("https://mcwind.tk")
			.setTimestamp()
			.setFooter('ReiNa By 一起來當馬猴燒酒吧 (>ω･* )ﾉ#9201', 'https://i.imgur.com/99GMP6a.png');
			try {
			await util.sendDeletableMessage(message.channel, { embed }, message.author, message);
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
			.setDescription(`💢${message.author}` + " Senpai, 沒有在播放音樂哦!")
			.setColor(0xcc0000)
			.setTitle('ReiNa Bot')
			.setURL("https://mcwind.tk")
			.setTimestamp()
			.setFooter('ReiNa By 一起來當馬猴燒酒吧 (>ω･* )ﾉ#9201', 'https://i.imgur.com/99GMP6a.png');
			try {
			await util.sendDeletableMessage(message.channel, { embed }, message.author, message);
			}   catch (err) {
				console.error(err);
			}
			return;
		} else {
			const embed = new Discord.RichEmbed()
				embed
			.setDescription("\n" + `${message.author}` + "\n因為Discord有限制信息最多只能有2048個字符, 所以我最多只會顯示25 首音樂哦!\n" + `__**歌曲列表:**__` + "\n" + `${serverQueue.songs.map(song => `⌛ ${song.title}`).slice(0, 25).join('\n')}` + "\n\n\n" + `**現正播放:** ${serverQueue.songs[0].title}`)
			.setColor(0xcc0000)
			.setTitle('ReiNa Bot')
			.setURL("https://mcwind.tk")
			.setTimestamp()
			.setFooter('ReiNa By 一起來當馬猴燒酒吧 (>ω･* )ﾉ#9201', 'https://i.imgur.com/99GMP6a.png');
			try {
			await util.sendDeletableMessage(message.channel, { embed }, message.author, message);
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
			.setDescription(`⏸${message.author}` + " Senpai, 已經為你暫停音樂!")
			.setColor(0xcc0000)
			.setTitle('ReiNa Bot')
			.setURL("https://mcwind.tk")
			.setTimestamp()
			.setFooter('ReiNa By 一起來當馬猴燒酒吧 (>ω･* )ﾉ#9201', 'https://i.imgur.com/99GMP6a.png');
            try {
            await util.sendDeletableMessage(message.channel, { embed }, message.author, message);
		}   catch (err) {
            console.error(err);
        }
        return;
		} else {
		const embed = new Discord.RichEmbed()
			embed
		.setDescription(`💢${message.author}` + " Senpai, 沒有在播放音樂哦!")
		.setColor(0xcc0000)
		.setTitle('ReiNa Bot')
		.setURL("https://mcwind.tk")
		.setTimestamp()
		.setFooter('ReiNa By 一起來當馬猴燒酒吧 (>ω･* )ﾉ#9201', 'https://i.imgur.com/99GMP6a.png');
        try {
        await util.sendDeletableMessage(message.channel, { embed }, message.author, message);
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
			.setDescription(`▶${message.author}` + " Senpai, 已經為你繼續播放音樂!")
			.setColor(0xcc0000)
			.setTitle('ReiNa Bot')
			.setURL("https://mcwind.tk")
			.setTimestamp()
			.setFooter('ReiNa By 一起來當馬猴燒酒吧 (>ω･* )ﾉ#9201', 'https://i.imgur.com/99GMP6a.png');
            try {
            await util.sendDeletableMessage(message.channel, { embed }, message.author, message);
		}   catch (err) {
            console.error(err);
        }
        return;
		} else {
		const embed = new Discord.RichEmbed()
			embed
		.setDescription(`💢${message.author}` + " Senpai, 沒有在播放音樂哦!")
		.setColor(0xcc0000)
		.setTitle('ReiNa Bot')
		.setURL("https://mcwind.tk")
		.setTimestamp()
		.setFooter('ReiNa By 一起來當馬猴燒酒吧 (>ω･* )ﾉ#9201', 'https://i.imgur.com/99GMP6a.png');
        try {
        await util.sendDeletableMessage(message.channel, { embed }, message.author, message);
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
			volume: 5,
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
			.setFooter('ReiNa By 一起來當馬猴燒酒吧 (>ω･* )ﾉ#9201', 'https://i.imgur.com/99GMP6a.png');
			message.channel.send(embed).then(function(message){
			message.delete(5000);
			}).catch(function(err){
			throw err;
			});
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
			.setFooter('ReiNa By 一起來當馬猴燒酒吧 (>ω･* )ﾉ#9201', 'https://i.imgur.com/99GMP6a.png');
			message.channel.send(embed).then(function(message){
			message.delete(5000);
			}).catch(function(err){
			throw err;
			});
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
		.setFooter('ReiNa By 一起來當馬猴燒酒吧 (>ω･* )ﾉ#9201', 'https://i.imgur.com/99GMP6a.png');
		serverQueue.textChannel.send(embed).then(function(message){
		message.delete(5000);
		}).catch(function(err){
			throw err;
		});
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
	.setFooter('ReiNa By 一起來當馬猴燒酒吧 (>ω･* )ﾉ#9201', 'https://i.imgur.com/99GMP6a.png');
	serverQueue.textChannel.send(embed).then(function(message){
	message.delete(5000);
	}).catch(function(err){
		throw err;
	});
}
