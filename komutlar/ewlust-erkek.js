const Discord = require('discord.js')
const datab = require('quick.db')
const ms = require('ms')
const moment = require("moment");
const { parseZone } = require("moment");
const ayarlar = require('../ayarlar.json')

exports.run =  async (client, message, args) => {

let yetkili = message.guild.roles.cache.find(r => r.id === ayarlar.yetkiliROL)
let erkekrol = message.guild.roles.cache.find(r => r.id === ayarlar.erkekROL)
let erkekrol2 = message.guild.roles.cache.find(r => r.id === ayarlar.erkekICON)
let erkekrol3 = message.guild.roles.cache.find(r => r.id === ayarlar.erkekSEMBOL)
let kayıtsız = message.guild.roles.cache.find(r => r.id === ayarlar.kayıtsızROL)

if(![(ayarlar.yetkiliROL)].some(role => message.member.roles.cache.get(role)) && !message.member.hasPermission('ADMINISTRATOR')) 
return message.reply(`Bu işlemi sadece yetkililer kullanabilir!!!`) 
  

const member = message.guild.member(message.mentions.members.first() || message.guild.members.cache.get(args[0]));

if(!member) return message.channel.send(`Bir kullanıcı belirt.`)
if(member.id === message.author.id) return message.channel.send('Kendini kayıt edemezsin.')
if(member.id === client.user.id) return message.channel.send('Botu kayıt edemezsin.')
if(member.id === message.guild.OwnerID) return message.channel.send('Sunucu sahibini kayıt edemezsin.')
if(member.roles.highest.position >= message.member.roles.highest.position) return message.channel.send(`Bu kullanıcı sizden üst/aynı pozsiyondadır.`)
  
if(!args[0]) return message.channel.send('Bir kullanıcı belirt')  
let timereplace = args[0];
let time = timereplace.replace(/y/, ' yıl').replace(/d/, ' gün').replace(/s/, ' saniye').replace(/m/, ' dakika').replace(/h/, ' saat') 
 datab.add('case', 1)
 const favian = await datab.fetch('case')
 var tarih = new Date(Date.now())
 var tarih2 = ms(timereplace)
 var tarih3 = Date.now() + tarih2 + 1296000000
 let ay = moment(Date.now()+1296000000).format("MM")
 let gün = moment(Date.now()+1296000000).format("DD")
 let saat = moment(Date.now()+1296000000).format("HH:mm:ss")
 let yıl = moment(Date.now()+1296000000).format("YYYY")
 let kayıtsaat = `\`${gün} ${ay.replace(/01/, 'Ocak').replace(/02/, 'Şubat').replace(/03/, 'Mart').replace(/04/, 'Nisan').replace(/05/, 'Mayıs').replace(/06/, 'Haziran').replace(/07/, 'Temmuz').replace(/08/, 'Ağustos').replace(/09/, 'Eylül').replace(/10/, 'Ekim').replace(/11/, 'Kasım').replace(/12/, 'Aralık')} ${saat} (${yıl})\``
 
let tag = ayarlar.tag
let name = args[1]
let age = Number(args[2])
if(!name) return message.channel.send('Bir isim belirt.')
if(!age) return message.channel.send('Bir yaş belirt.')
   
datab.add(`yetkili.${message.author.id}.erkek`, 1)
datab.add(`yetkili.${message.author.id}.toplam`, 1)
let alldata = datab.fetch(`yetkili.${message.author.id}.toplam`)

member.setNickname(`${tag} ${name} | ${age}`)
member.roles.add(erkekrol)
member.roles.add(erkekrol2)
member.roles.add(erkekrol3)
member.roles.remove(kayıtsız)

 const a = await datab.fetch(`Eskiİsimler.${message.guild.id}.${member.id}`);
  if (a == null) await datab.set(`Eskiİsimler.${message.guild.id}.${member.id}`, []);
  await datab.push(`Eskiİsimler.${message.guild.id}.${member.id}`, `${name} | ${age}`);

  let fdh = datab.fetch(`Eskiİsimler.${message.guild.id}.${member.id}`);
  if (!fdh | fdh === [] || fdh.length === 0 || fdh.length < 1) return message.channel.send('Eski isimleri bulunmadı!').then(x => x.delete({ timeout: 9000}))

  let uzunluk;
  if (fdh.length >= 11) uzunluk = 10
  if (fdh.length < 11) uzunluk = fdh.length

  let sayı = 1
  let data = []
  for (var i = 0; i < uzunluk; i++) {
    data.push(`\`• ${fdh[i]}\``);
  };

  datab.add(`toplamkayıt.${message.guild.id}.${message.author.id}`, 1);
  datab.set(`kayıtT.${member.id}.${message.guild.id}`, new Date().getTime());

const embed = new Discord.MessageEmbed()
.setTitle("Kayıt Başarılı")
.setThumbnail(member.user.avatarURL({dynamic: true}))
.setDescription(`
 **Kayıt Edilen kullanıcı : ${member}
 Kayıt İşleminde Verilen Rol : <@&${ayarlar.erkekROL}>
 Yeni Kullanıcı Adı :  \`${tag} ${name} | ${age}\` **

 **Bu Kullanıcının Sunucudaki Eski İsimleri [${sayı++ || "0"}]     \n\n${data.join('\n')} ** `).setColor('0x348f36').setFooter(message.author.tag, message.author.avatarURL({dynamic: true})).setTimestamp()  






message.channel.send(embed)


  
datab.push(`isim.${message.guild.id}`, {
  userID: member.id, 
  isim: name,
  yas: age,
  role: erkekrol.id,
  tag: tag
})

}

exports.conf = {
    enabled: true,
    guildOnly: true,
    aliases: ['erkek', 'e', 'boy', 'man'],
    permLevel: 0
  }

  exports.help = {
    name: 'erkek',
    description: "Etiketlenen kişiyi erkek rolleriyle kayıt eder.",
    usage: '.erkek @etiket/id İsim Yaş'
  }