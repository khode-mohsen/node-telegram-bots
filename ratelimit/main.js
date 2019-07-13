const Telegraf = require('telegraf')
const rateLimit = require('telegraf-ratelimit')

limitConfig = {
  window:1 * 1000 ,
  limit : 1 ,
  onLimitExceeded : (ctx , next) => {
    cid =  ctx.update.message.chat.id,
    mid = ctx.message.message_id,
    ctx.deleteMessage(mid,cid)
  }
}

const bot = new Telegraf(process.env.BOT_TOKEN)

start = ctx => ctx.reply('welcome to link shorter please send /help for more information!')
idk = ctx => ctx.reply(ctx.message.text)
helo = ctx => ctx.reply('help text')

bot.use(rateLimit(limitConfig))
bot.start(start)
bot.on('text',idk)
bot.launch()
