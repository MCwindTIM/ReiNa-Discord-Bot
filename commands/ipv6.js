const Discord = require("discord.js");
const util = require('../util.js');
module.exports.run = async (bot, message, args) =>{
    message.delete();
	if(!args){
        let embed = new Discord.RichEmbed()
        embed
        .setAuthor(message.author.tag, message.author.avatarURL)
        .setColor('#0099ff')
        .setTitle('ReiNa Bot IPV6 Address 轉換')
        .setURL("https://mcwind.tk")
        .setTimestamp()
        .setDescription("請輸入變數\n\n例如: rn!ipv6 [compress/expand] [ipv6Address]")
        .setFooter('ReiNa By 𝓖𝓻𝓪𝓷𝓭𝓞𝓹𝓮𝓻𝓪𝓽𝓸𝓻#9487', 'https://cdn.discordapp.com/avatars/418095978273570846/17c96d9ce6c135f7511a001e8584db17.png?size=2048');
        util.sendDeletableMessage(message.channel, { embed }, message.author);
        return
    }
	if(!args[1]){
        let embed = new Discord.RichEmbed()
        embed
        .setAuthor(message.author.tag, message.author.avatarURL)
        .setColor('#0099ff')
        .setTitle('ReiNa Bot IPV6 Address 轉換')
        .setURL("https://mcwind.tk")
        .setTimestamp()
        .setDescription("請輸入變數\n\n例如: rn!ipv6 [compress/expand] [ipv6Address]")
        .setFooter('ReiNa By 𝓖𝓻𝓪𝓷𝓭𝓞𝓹𝓮𝓻𝓪𝓽𝓸𝓻#9487', 'https://cdn.discordapp.com/avatars/418095978273570846/17c96d9ce6c135f7511a001e8584db17.png?size=2048');
        util.sendDeletableMessage(message.channel, { embed }, message.author);
        return
    }
	if(args[0] === 'expand'){
        try{
		let ip = expandIPv6Address(args[1]);
        let embed = new Discord.RichEmbed()
        embed
        .setAuthor(message.author.tag, message.author.avatarURL)
        .setColor('#0099ff')
        .setTitle('ReiNa Bot IPV6 Address 轉換 [Expand Mode]')
        .setURL("https://mcwind.tk")
        .setTimestamp()
        .setDescription(`${message.author}, senpai~ 我計算好啦!`)
        .addField('模式', '拓展')
        .addField('提供的Ipv6地址', `${args[1]}`)
        .addField('結果', `${ip}`)
        .setFooter('ReiNa By 𝓖𝓻𝓪𝓷𝓭𝓞𝓹𝓮𝓻𝓪𝓽𝓸𝓻#9487', 'https://cdn.discordapp.com/avatars/418095978273570846/17c96d9ce6c135f7511a001e8584db17.png?size=2048');
        util.sendDeletableMessage(message.channel, { embed }, message.author);
        return
        }catch(e){}
	}
	if(args[0] === 'compress'){
        try{
            let ip = compIPV6(args[1]);
            let embed = new Discord.RichEmbed()
            embed
            .setAuthor(message.author.tag, message.author.avatarURL)
            .setColor('#0099ff')
            .setTitle('ReiNa Bot IPV6 Address 轉換 [Compress Mode]')
            .setURL("https://mcwind.tk")
            .setTimestamp()
            .setDescription(`${message.author}, senpai~ 我計算好啦!`)
            .addField('模式', '壓縮')
            .addField('提供的Ipv6地址', `${args[1]}`)
            .addField('結果', `${ip}`)
            .setFooter('ReiNa By 𝓖𝓻𝓪𝓷𝓭𝓞𝓹𝓮𝓻𝓪𝓽𝓸𝓻#9487', 'https://cdn.discordapp.com/avatars/418095978273570846/17c96d9ce6c135f7511a001e8584db17.png?size=2048');
            util.sendDeletableMessage(message.channel, { embed }, message.author);
            return
            }catch(e){}
	}

}


module.exports.help = {
    name: "ipv6",
    description: "進行IPV6地址的壓縮與拓展",
    cate: 4,
	show: true
}

function compIPV6(input) {
	return input.replace(/\b(?:0+:){2,}/, ':');
  }

function expandIPv6Address(address)
{
    var fullAddress = "";
    var expandedAddress = "";
    var validGroupCount = 8;
    var validGroupSize = 4;

    var ipv4 = "";
    var extractIpv4 = /([0-9]{1,3})\.([0-9]{1,3})\.([0-9]{1,3})\.([0-9]{1,3})/;
    var validateIpv4 = /((25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)(\.(25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)){3})/;

    if(validateIpv4.test(address))
    {
        groups = address.match(extractIpv4);
        for(var i=1; i<groups.length; i++)
        {
            ipv4 += ("00" + (parseInt(groups[i], 10).toString(16)) ).slice(-2) + ( i==2 ? ":" : "" );
        }
        address = address.replace(extractIpv4, ipv4);
    }

    if(address.indexOf("::") == -1)
        fullAddress = address;
    else
    {
        var sides = address.split("::");
        var groupsPresent = 0;
        for(var i=0; i<sides.length; i++)
        {
            groupsPresent += sides[i].split(":").length;
        }
        fullAddress += sides[0] + ":";
        for(var i=0; i<validGroupCount-groupsPresent; i++)
        {
            fullAddress += "0000:";
        }
        fullAddress += sides[1];
    }
    var groups = fullAddress.split(":");
    for(var i=0; i<validGroupCount; i++)
    {
        while(groups[i].length < validGroupSize)
        {
            groups[i] = "0" + groups[i];
        }
        expandedAddress += (i!=validGroupCount-1) ? groups[i] + ":" : groups[i];
    }
    return expandedAddress;
}