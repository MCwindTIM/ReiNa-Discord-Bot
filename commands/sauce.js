const Discord = require("discord.js");
const util = require('../util.js');
const request = require("request-promise");
module.exports.run = async (bot, message, args) =>{
	const portal = {
		kon: "http://konachan.net",
		yan: "https://yande.re",
		dan: "https://danbooru.donmai.us"
	}
if(message.content.match(/https?:\/\/(www\.)?[pixiv]{1,256}\.[a-zA-Z0-9()]{1,6}\b\/artworks\/[0-9()]{1,15}/g)){
	message.delete();
	var regexreplace = /https?:\/\/(www\.)?[pixiv]{1,256}\.[a-zA-Z0-9()]{1,6}\b\/artworks\//g;
	var image_id = message.content.replace(regexreplace, '');
	if (isNaN(image_id)) return;
	let illust = await fetchInfo(image_id);
	return util.sendDeletableMessage(message.channel, {embed: await genEmbed(illust, true)}, message.author);
}

if(message.attachments.size > 0){
	let loopi;
	for (loopi=0;loopi<message.attachments.size;loopi++){
		if(message.attachments.every(attachIsImage)){
			let res = await request.get("http://saucenao.com/search.php?db=999&url=" + message.attachments.array()[loopi].url);
			let result = res.match(/<table class="resulttable">.+?<\/table>/);
			if (result) {
				let i = result[0];
				let sim = i.match(/<div class="resultsimilarityinfo">(\d+.\d+%)<\/div>/)[1];
				let title = i.match(/<div class="resulttitle"><strong>(.+?)<\/strong>/)[1];
	
				let contents = i.match(/<div class="(resultcontentcolumn|resultmiscinfo)">(.+?)<\/div>/g);
				for (let content of contents) {
					let embed;
					try {
						switch (true) {
							case content.indexOf("Pixiv") > -1:
								embed = await genEmbed(await fetchInfo(i.match(/illust_id=(\d+)/)[1]), true);
								break;
							case content.indexOf("yande.re") > -1:
								embed = sgenEmbed("yan", await fetchImg("yan", i.match(/yande\.re\/post\/show\/(\d+)/)[1]));
								break;
							case content.indexOf("konachan") > -1:
								embed = sgenEmbed("kon", await fetchImg("kon", i.match(/konachan\.com\/post\/show\/(\d+)/)[1]));
								break;
							case content.indexOf("danbooru") > -1:
								embed = sgenEmbed("dan", await fetchImg("dan", i.match(/danbooru\.donmai\.us\/post\/show\/(\d+)/)[1]));
								break;
							default:
								break;
						}
					} catch (e) {
						return message.reply(e.message + "\n如果不是要搜尋圖片, 不用理會!" + "   (5秒後自動刪除)").then(msg =>{msg.delete(5000)});
					}
					if (embed) {
						try{
						embed.addField("相似程度:", `${sim}`);
						}catch(e){console.log(e)};
						return util.sendDeletableMessage(message.channel, { embed }, message.author);
					}
				}
			}
            return message.channel.send(
                "相似程度: " + result[0].match(/<div class="resultsimilarityinfo">(\d+.\d+%)<\/div>/)[1] +
                "\n```\n" +
                result[0].replace(/<\/?.+?>/g, "\n").replace(/\n+/g, "\n") +
                "\n```"
            );
        } else if (res.match(/was denied/)) {
            return message.reply("無法取得圖片");
        } else {
            return message.reply("找不到來源!");
        }
    }
			
}


}

module.exports.help = {
	name: "sauce¿"
}

async function fetchInfo(image_id) {
    var res = await req2json("https://api.imjad.cn/pixiv/v2/?id=" + image_id);
    if (!res || !res.illust) throw new Error("ID: " + image_id + ", 找不到來源!");
    return res && res.illust;
}

async function genEmbed(illust, show_image = true) {
    var embed = new Discord.RichEmbed()
        .setAuthor(
            (illust.title || "Pixiv圖片") + (illust.page_count > 1 ? " (" + illust.page_count + ")" : ""),
            pimg(illust.user.profile_image_urls.medium) || "https://png.pngtree.com/svg/20150723/pixiv_btn_897586.png"
        )
        .setColor(illust.sanity_level == 6 ? 0xd37a52 : 0x3D92F5)
        .setTimestamp(new Date(illust.create_date))
        .setImage((show_image) ? pimg(illust.image_urls.large) : "")
        .addField(
            "Pixiv 來源: ",
            "[作品id: " + illust.id + "](https://www.pixiv.net/member_illust.php?mode=medium&illust_id=" + illust.id + ")\t[作者: " + illust.user.name + "]( https://www.pixiv.net/member.php?id=" + illust.user.id + ")"
		)
        .addField(
            "說明: ",
            illust.caption ? illust.caption.replace(/<br \/>/g, "\n").replace(/<(.|\n)*?>/g, '') : "(無)"
		)
		.setFooter('ReiNa By 𝓖𝓻𝓪𝓷𝓭𝓞𝓹𝓮𝓻𝓪𝓽𝓸𝓻#9487', 'https://cdn.discordapp.com/avatars/418095978273570846/17c96d9ce6c135f7511a001e8584db17.png?size=2048');

    return embed;
}



function pimg(url) {
    return url.replace("i.pximg.net", "i.pixiv.cat");
}

async function req(url, json = false){
	if (url == null) {
		return null;
	}

	const options = {
		method: "GET",
		uri: url,
		json: json
	}

	return request(options);
}

async function req2json(url){
	return req(url, true);
}

function attachIsImage(msgAttach){
	let url = msgAttach.url;
	if(url.indexOf("png", url.length - "png".length) !== -1){return true}
	if(url.indexOf("jpg", url.length - "jpg".length) !== -1){return true}
	if(url.indexOf("gif", url.length - "gif".length) !== -1){return true}
	if(url.indexOf("jpeg", url.length - "jpeg".length) !== -1){return true}
	return false
}

async function fetchImg(prov = "kon", id) {
    let res = await base.req2json(portal[prov] + "/post.json?tags=id:" + id);
    return res[0];
}

function sgenEmbed(prov = "kon", image) {
    if (!Object.keys(image).length) throw new Error("Invalid image " + image);

    let embed = new Discord.RichEmbed()
        .setAuthor("搜尋結果", "https://cdn4.iconfinder.com/data/icons/alphabet-3/500/ABC_alphabet_letter_font_graphic_language_text_" + prov.substr(0, 1).toUpperCase() + "-64.png")
        .setColor((image["rating"] == "s" ? 0x7df28b : (image["rating"] == "q" ? 0xe4ea69 : 0xd37a52)))
        .setDescription("[ID: " + image["id"] + "](" + portal[prov] + "/post/show/" + image["id"] + ")")

        .setTimestamp()
		.addField("來源: ", (image["source"] == "" ? "(未知)" : image["source"]))
		.setFooter('ReiNa By 𝓖𝓻𝓪𝓷𝓭𝓞𝓹𝓮𝓻𝓪𝓽𝓸𝓻#9487', 'https://cdn.discordapp.com/avatars/418095978273570846/17c96d9ce6c135f7511a001e8584db17.png?size=2048');


    if (["kon", "yan"].indexOf(prov) > -1) {
        embed.setImage(image["file_url"]);
    } else {
        embed.setImage(image["large_file_url"]);
    }
    return embed;
}