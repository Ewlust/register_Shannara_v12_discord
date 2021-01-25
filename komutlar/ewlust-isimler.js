const { MessageEmbed } = require("discord.js")
const db = require('quick.db');
const ayarlar = require('../ayarlar.json')

module.exports.run = async (client, message, users, args) => {

if(!message.member.roles.cache.some(r => [(ayarlar.yetkiliROL)].includes(r.id)) && (!message.member.hasPermission("ADMINISTRATOR")))return message.reply(`Bu komutu sadece yetkililer kullanabilir!!!`)
    
//------------------------------------------------KAYITLAR-----------------------------------------------\\  

let user = message.guild.member(message.mentions.members.first() || message.guild.members.cache.get(args[0]));
let isim = message.mentions.members.first() || message.guild.members.get(args[0]);
var sayi = 1 
let data = db.get(`isim.${message.guild.id}`)
let rol = db.fetch(`rol.${message.guild.id}`)
if(!data) return message.channel.send(new MessageEmbed()
    .setColor("0x2f3136") 
    .setDescription(`
      ${isim} Kullanıcısının İsim Geçmesi Aşağıda Yazmaktadır.`)
    .setColor("0x2f3136"))
let isimler = data.filter(x => x.userID === isim.id).map(x => `${sayi++}- \`• ${x.isim} | ${x.yas}\`  (<@&${x.role}>)\n`).join("\n")
if(isimler === null) isimler = "Bu Kullanıcının Eski İsimleri Bulunamadı"
if(isimler === undefined) isimler = "Bu Kullanıcının Eski İsimleri "
//------------------------------------------------KAYITLAR-----------------------------------------------\\      


const embed = new MessageEmbed()
.setColor("0x2f3136")
    .setDescription(`
    ${isimler}`)
    .setColor("#e99546")
message.channel.send(embed)
}


exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: ['isimler', 'eski-isim','detay'],
  permLevel: 0,
}

exports.help = {
      name: "isimler"
  
}