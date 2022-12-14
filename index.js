const TelegramBot = require("node-telegram-bot-api");
require("dotenv").config();

const token = process.env.BOT_TOKEN;
const webAppUrl = process.env.WEB_APP_URL;
const bot = new TelegramBot(token, { polling: true });

bot.on("message", async (msg) => {
  const chatId = msg.chat.id;
  const text = msg.text;

  if (text === "/start") {
    await bot.sendMessage(
      chatId,
      "Ниже появится кнопка, тыкни и появится форма",
      {
        reply_markup: {
          keyboard: [
            [{ text: "Заполнить форму", web_app: { url: webAppUrl + 'form' } }],
          ],
        },
      }
    );

    await bot.sendMessage(
      chatId,
      "Заходи в наш интернет магазин, по кнопке внизу",
      {
        reply_markup: {
          inline_keyboard: [
            [{ text: "Сделать заказ", web_app: { url: webAppUrl } }],
          ],
        },
      }
    );
  }

  if (msg?.web_app_data?.data) {
    try {
      const data = JSON.parse(msg?.web_app_data?.data)
      console.log (data)

      await bot.sendMessage (chatId, 'Спасибо за обратную связь');
      await bot.sendMessage (chatId, 'Ваша страна: ' + data?.country);
      await bot.sendMessage (chatId, 'Ваша улица: ' + data?.street);

      setTimeout (async () => {
        await bot.sendMessage (chatId, "Всю информацию вы найдете в этом чате")
      }, 3000)
    } catch (error) {
      console.log (error)
    }

  }
});
