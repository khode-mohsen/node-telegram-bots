const Telegraf = require('telegraf')
const Sequelize = require('sequelize')
const sequelize = new Sequelize('sqlite://'+__dirname+'/db.sqlite')

class ChatMessages extends Sequelize.Model {}
ChatMessages.init({
    chat_id : Sequelize.INTEGER,
    message_id : Sequelize.INTEGER,
    text : Sequelize.STRING
  },{sequelize , modelName : 'ChatMessages'}
)

const bot = new Telegraf(process.env.BOT_TOKEN)
bot.catch(err => console.log(err))
start = ctx => ctx.reply('welcome to you said bot,this bot can trace edits for more send /help')
help = ctx => ctx.reply('you just need add me to your group and wait for magic :)')
idk = ctx => {
  cid = ctx.update.message.chat.id,
  mid = ctx.update.message.message_id,
  text = ctx.update.message.text,
  sequelize.sync().then(()=>ChatMessages.create({
    chat_id : cid,
    message_id : mid,
    text : text
  }))

}
edited = ctx =>{
  cid = ctx.update.edited_message.chat.id,
  mid = ctx.update.edited_message.message_id,
  mtext = ChatMessages.findOne({
    where:{
      chat_id :cid,
      message_id : mid
    }
  })
  .then(chatMessages=> ctx.reply(chatMessages.toJSON().text,{reply_to_message_id:mid}))

}
bot.start(start)
bot.help(help)
bot.on('text',idk)
bot.on('edited_message',edited)
bot.launch()
