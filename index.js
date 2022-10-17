

const TelegramBot = require('node-telegram-bot-api');
require('dotenv').config()

const token = process.env.BOT_TOKEN;
const webAppUrl = "https://www.ozon.ru/"
const bot = new TelegramBot(token, {polling: true});


bot.on('message', async (msg) => {
  const chatId = msg.chat.id;
  const text = msg.text;

  if (text === '/start') {
    await bot.sendMessage (chatId ,'Ниже появится кнопка, тыкни и появится форма', {
      reply_markup: {
        keyboard: [
          [{text: 'Заполнить кнопку', web_app: {url: webAppUrl}}]
        ]
      }
    })

    await bot.sendMessage (chatId ,'Заходи в наш интернет магазин, по кнопке внизу', {
      reply_markup: {
        inline_keyboard: [
          [{text: 'Сделать заказ', web_app: {url: webAppUrl}}]
        ]
      }
    })
  } 

});