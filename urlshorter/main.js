const Telegraf = require('telegraf')

const bot = new Telegraf(process.env.BOT_TOKEN)
start = ctx => ctx.reply('welcome to link shorter please send /help for more information!')
idk = ctx => ctx.reply('i dont know what you say i am a bot')
help = ctx => ctx.reply('send /short {url} to short your url')

short = ctx => ctx.reply('please wait...')

bot.start(start)
bot.help(help)
bot.command(short)
bot.on('text',idk)
bot.launch()
