const Discord = require("discord.js");
const util = require('../util.js');
const request = require('request');

module.exports.run = async (bot, message, args) =>{
    request.get('https://data.weather.gov.hk/weatherAPI/opendata/weather.php?dataType=fnd&lang=tc', {},
    function(error, response, raw){
        message.delete();
        var obj = JSON.parse(raw);
        const embed = new Discord.RichEmbed()
        embed
        .setThumbnail("https://www.hko.gov.hk/gts/graphics/astron-graphics/logo_HKO2.png")
        .setAuthor(message.author.tag, message.author.avatarURL)
        .setDescription(`${message.author}, 你要求查詢的資料找到了!`)
        .setColor(0xcc0000)
        .setTitle('未來9日 天氣預報')
        .setURL("https://mcwind.tk")
        .addField(yyyymmdd(obj.weatherForecast[0].forecastDate) + ", " + obj.weatherForecast[0].week, "狀況: " + obj.weatherForecast[0].forecastWeather + "\n" + "風: " + obj.weatherForecast[0].forecastWind + "\n" + "最高溫度: " + obj.weatherForecast[0].forecastMaxtemp.value + " C" + "\n" + "最低溫度: " + obj.weatherForecast[0].forecastMintemp.value + " C")
        .addField(yyyymmdd(obj.weatherForecast[1].forecastDate) + ", " + obj.weatherForecast[1].week, "狀況: " + obj.weatherForecast[1].forecastWeather + "\n" + "風: " + obj.weatherForecast[1].forecastWind + "\n" + "最高溫度: " + obj.weatherForecast[1].forecastMaxtemp.value + " C" + "\n" + "最低溫度: " + obj.weatherForecast[1].forecastMintemp.value + " C")
        .addField(yyyymmdd(obj.weatherForecast[2].forecastDate) + ", " + obj.weatherForecast[2].week, "狀況: " + obj.weatherForecast[2].forecastWeather + "\n" + "風: " + obj.weatherForecast[2].forecastWind + "\n" + "最高溫度: " + obj.weatherForecast[2].forecastMaxtemp.value + " C" + "\n" + "最低溫度: " + obj.weatherForecast[2].forecastMintemp.value + " C")
        .addField(yyyymmdd(obj.weatherForecast[3].forecastDate) + ", " + obj.weatherForecast[3].week, "狀況: " + obj.weatherForecast[3].forecastWeather + "\n" + "風: " + obj.weatherForecast[3].forecastWind + "\n" + "最高溫度: " + obj.weatherForecast[3].forecastMaxtemp.value + " C" + "\n" + "最低溫度: " + obj.weatherForecast[3].forecastMintemp.value + " C")
        .addField(yyyymmdd(obj.weatherForecast[4].forecastDate) + ", " + obj.weatherForecast[4].week, "狀況: " + obj.weatherForecast[4].forecastWeather + "\n" + "風: " + obj.weatherForecast[4].forecastWind + "\n" + "最高溫度: " + obj.weatherForecast[4].forecastMaxtemp.value + " C" + "\n" + "最低溫度: " + obj.weatherForecast[4].forecastMintemp.value + " C")
        .addField(yyyymmdd(obj.weatherForecast[5].forecastDate) + ", " + obj.weatherForecast[5].week, "狀況: " + obj.weatherForecast[5].forecastWeather + "\n" + "風: " + obj.weatherForecast[5].forecastWind + "\n" + "最高溫度: " + obj.weatherForecast[5].forecastMaxtemp.value + " C" + "\n" + "最低溫度: " + obj.weatherForecast[5].forecastMintemp.value + " C")
        .addField(yyyymmdd(obj.weatherForecast[6].forecastDate) + ", " + obj.weatherForecast[6].week, "狀況: " + obj.weatherForecast[6].forecastWeather + "\n" + "風: " + obj.weatherForecast[6].forecastWind + "\n" + "最高溫度: " + obj.weatherForecast[6].forecastMaxtemp.value + " C" + "\n" + "最低溫度: " + obj.weatherForecast[6].forecastMintemp.value + " C")
        .addField(yyyymmdd(obj.weatherForecast[7].forecastDate) + ", " + obj.weatherForecast[7].week, "狀況: " + obj.weatherForecast[7].forecastWeather + "\n" + "風: " + obj.weatherForecast[7].forecastWind + "\n" + "最高溫度: " + obj.weatherForecast[7].forecastMaxtemp.value + " C" + "\n" + "最低溫度: " + obj.weatherForecast[7].forecastMintemp.value + " C")
        .addField(yyyymmdd(obj.weatherForecast[8].forecastDate) + ", " + obj.weatherForecast[8].week, "狀況: " + obj.weatherForecast[8].forecastWeather + "\n" + "風: " + obj.weatherForecast[8].forecastWind + "\n" + "最高溫度: " + obj.weatherForecast[8].forecastMaxtemp.value + " C" + "\n" + "最低溫度: " + obj.weatherForecast[8].forecastMintemp.value + " C")
        .setTimestamp()
        .setFooter('ReiNa By 一起來當馬猴燒酒吧 (>ω･* )ﾉ#9201', 'https://cdn.discordapp.com/avatars/418095978273570846/17c96d9ce6c135f7511a001e8584db17.png?size=2048');
        try {
            util.sendDeletableMessage(message.channel, { embed }, message.author);
        }   catch (err) {
                console.error(err);
        }

})
}

module.exports.help = {
	name: "weather"
}

function yyyymmdd(date){
	var year = date.substring(0, 4);
	var month = date.substring(4, 6);
	var day = date.substring(6, 8);
	return year + "-" + month + "-" + day;
}