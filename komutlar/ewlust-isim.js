const discord = require('discord.js')
const db = require('quick.db')
const ayarlar = require('../ayarlar.json');

exports.run = async(client, message, args) => {
      let d = ayarlar.prefix
      let yetkili = ayarlar.yetkiliROL
      let tag = ayarlar.tag 


 let ewlust1 = new discord.MessageEmbed()

.setDescription(`**Kullanıcının İsmi Başarı İle Düzenlendi**`).setColor('#ff0000')
 if (!message.member.roles.cache.get(yetkili)) return message.channel.send(ewlust) 
 
  let member = message.mentions.members.first();
if (!member) return message.channel.send(new discord.MessageEmbed().setColor('#ff0000').setDescription(`İsim Değiştireceğin Kullanıcıyı Belirtmelisin! \n\n **Örnek Kullanım:** ${d}isim @kullanıcı <isim> <yaş>`))
let isim = args[1] 
if (!isim) return message.channel.send(new discord.MessageEmbed().setColor('#ff0000').setDescription(`İsmini Belirtmelisin! \n\n **Örnek Kullanım:** ${d}isim @kullanıcı <isim> <yaş>`))
let yaş = args[2] 
if (!yaş) return message.channel.send(new discord.MessageEmbed().setColor('#ff0000').setDescription(`Yaşını Belirtmelisin! \n\n **Örnek Kullanım:** ${d}isim @kullanıcı <isim> <yaş>`))
  member.setNickname(`${tag} ${isim} | ${yaş}`)

const ewlust = new discord.MessageEmbed()
.setColor('#00ff51')
.setDescription(`**${member}  kullanıcının ismini  \`${tag} ${isim}  | ${yaş}\` olarak ayarladım**`)
.setFooter(`Komut ${message.author.tag} Tarafından Kullanıldı ! `)
message.channel.send(ewlust1)


}
exports.conf = {
  enabled: true,
  guildonly: false, 
  aliases: ['i'],
  permlevel: 0
}
exports.help = {
  name: 'isim',
  description: 'erkek olarak kayıt eder',
  usage: 'İsim Değiştirmeye yarar'
}