const Discord = require("discord.js");
const util = require('../util.js');
const superagent = require('superagent');
const cheerio = require('cheerio');

module.exports.run = async (bot, message, args) =>{
        if(message.content.startsWith("[w") && message.content.endsWith("]")){
        message.delete();
        let doujinid = message.content.toString().replace("[w", "").replace("]", "");
        let url = `https://www.wnacg.com/photos-index-aid-${doujinid}.html`
        getData(url, message, doujinid);
    }
}

module.exports.help = {
    name: "wnacg¿",
    description: "wnacg 爬蟲",
    cate: 5,
	show: false
}

function getData(url, message, doujinid){
    superagent.get(url).set('Accept-Language', 'zh-TW,zh;q=0.9,en-US;q=0.8,en;q=0.7,ja;q=0.6,zh-CN;q=0.5,und;q=0.4').end((err, res) => {
        let dataArray = [];
        let TagString = "|";
        if(err){
            console.log(`Error: ${err}`)
        } else {
            let $ = cheerio.load(res.text);
			let i;
			let o = 0;
			$('.addtags a').attr('class', 'tagshow').each((idx, ele) =>{
				if($(ele).text().includes("+TAG")){ }else{
				dataArray.push($(ele).text());
				o += 1;
				}
			})
				dataArray.push($('h2').first().text());
				dataArray.push($(`#bodywrap .asTB div`).attr('class', 'asTBcell uwthumb').find(`img`).attr('src'));
			$('label').each((idx, ele) =>{
			dataArray.push($(ele).text().replace("分類：", "").replace("頁數：", ""));
			})
            if(dataArray.length < 4){
                const embed = new Discord.RichEmbed()
                embed
                .setAuthor(message.author.tag, message.author.avatarURL)
                .setDescription(`${message.author}, ` + `😭這塊車牌我找不到資料\n\n車牌號碼: ` + "`" + `w${doujinid}` + "`")
                .setColor(0xcc0000)
                .setTitle('ReiNa Bot 錯誤')
                .setURL("https://mcwind.tk")
                .setTimestamp()
                .setFooter('ReiNa By 𝓖𝓻𝓪𝓷𝓭𝓞𝓹𝓮𝓻𝓪𝓽𝓸𝓻#9487', 'https://cdn.discordapp.com/avatars/418095978273570846/17c96d9ce6c135f7511a001e8584db17.png?size=2048');
                return util.sendDeletableMessage(message.channel, { embed }, message.author);
            }else{
                dataArray[o+1] = dataArray[o+1].replace("////", "https://");
                const embed = new Discord.RichEmbed()
                embed
                .setAuthor(message.author.tag, message.author.avatarURL)
                .setColor('#0xcc0000')
                .setTitle(`點我進入新世界!!!`)
                .setURL(`${url}`)
                .setThumbnail(`${dataArray[o+1]}`)
                .setDescription(`${message.author}, 你要求查詢的資料找到了!`)
                .addField(`${dataArray[o]}`, "(･ω<)☆")
                .addField(`分類:`, `${dataArray[o+2]}`)
                .addField(`頁數:`, `${dataArray[o+3]}`)
                .setTimestamp()
                .setFooter('ReiNa By 𝓖𝓻𝓪𝓷𝓭𝓞𝓹𝓮𝓻𝓪𝓽𝓸𝓻#9487', 'https://cdn.discordapp.com/avatars/418095978273570846/17c96d9ce6c135f7511a001e8584db17.png?size=2048');
                for(i = 0; i < o; i++){
                    TagString += `|${dataArray[i]}`;
                }
                embed.addField("標籤", `${TagString}`);
                try {
                    util.sendDeletableMessage(message.channel, { embed }, message.author);
                }   catch (err) {
                    console.error(err);
                }
            }
        }
	});

}
