const Telegraf = require('telegraf')
const request = require('request')

const bot = new Telegraf(process.env.BOT_TOKEN)
start = ctx => ctx.reply('welcome to link shorter please send /help for more information!')
idk = ctx => ctx.reply(ctx.message.text)
help = ctx => ctx.reply('send /short {url} to short your url')

url = 'https://2ad.ir/api?api=34e60586c43caec7111f3ac3b3e60fa1fb5a9eb8&url='


short = ctx =>{
    ctx.reply('please wait...')
    text = ctx.message.text
    url = url+text.slice(7)
    response = (err,resp,body) => (!err && resp.statusCode ==200)?ctx.reply(JSON.parse(resp.body)['shortenedUrl']):console.log(err)
    request.get(url,response)
   
}

bot.start(start)
bot.help(help)
bot.command(short)
bot.on('text',idk)
bot.launch()
