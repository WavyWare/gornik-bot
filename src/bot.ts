import { Bot, InlineKeyboard } from "grammy";
import { pages } from "./config.js";
import * as dotenv from "dotenv";

dotenv.config();

const token = process.env["BOT_TOKEN"];

if (!token || token === "your_telegram_bot_token_here") {
    console.error("❌ BŁĄD: Nie ustawiono poprawnego tokenu bota w pliku .env!");
    console.error("Zdobądź token od @BotFather i wklej go do pliku .env zamiast 'your_telegram_bot_token_here'.");
    process.exit(1);
}

const bot = new Bot(token);

// Register commands to be visible in the Telegram menu
await bot.api.setMyCommands([
    { command: "start", description: "Otwórz menu główne" },
    { command: "pages", description: "Lista wszystkich stron i serwerów" },
    { command: "help", description: "Pokaż pomoc" },
]);

// Suggestion: Add a status check feature (mocked for simplicity)
const getStatus = (type: string) => {
    return Math.random() > 0.1 ? "✅ Online" : "❌ Offline";
};

bot.command("start", async (ctx) => {
    const keyboard = new InlineKeyboard();

    pages.forEach((page, index) => {
        // Telegram supports only http/https and some internal protocols for URL buttons.
        // For TS3 and Minecraft, we use a callback button to show info.
        if (page.type === 'web') {
            keyboard.url(page.name, page.link).row();
        } else {
            keyboard.text(page.name, `info_${index}`).row();
        }
    });

    keyboard.text("📊 Status Serwerów", "check_status").row();

    await ctx.reply(
        "Witaj na bocie Gornika! 👋\n\nWybierz jedną z opcji poniżej, aby dowiedzieć się więcej o naszych usługach.",
        { reply_markup: keyboard }
    );
});

bot.callbackQuery(/^info_(\d+)$/, async (ctx) => {
    const match = ctx.match;
    if (!match) return;
    const index = parseInt(match[1] || "0");
    const page = pages[index];

    if (!page) return;

    await ctx.answerCallbackQuery();

    // For non-web pages, we show the address/description. 
    // Telegram will automatically make the link clickable in the message text.
    await ctx.reply(
        `📌 *${page.name}*\n\n${page.description}\n\n🔗 ADRES: \`${page.link}\``,
        { parse_mode: "Markdown" }
    );
});

bot.callbackQuery("check_status", async (ctx) => {
    let statusMsg = "📊 *Aktualny status serwerów:*\n\n";

    pages.forEach(page => {
        statusMsg += `${page.name}: ${getStatus(page.type)}\n`;
    });

    await ctx.answerCallbackQuery();
    await ctx.reply(statusMsg, { parse_mode: "Markdown" });
});

// Generalized help command
bot.command("help", async (ctx) => {
    await ctx.reply(
        "Pomoc:\n" +
        "/start - Otwórz menu główne\n" +
        "/pages - Lista wszystkich stron\n" +
        "Więcej opcji wkrótce!"
    );
});

bot.command("pages", async (ctx) => {
    let response = "📄 *Dostępne strony i serwery:*\n\n";
    pages.forEach(page => {
        response += `🔹 *${page.name}*\n_${page.description}_\nLink: ${page.link}\n\n`;
    });
    await ctx.reply(response, { parse_mode: "Markdown" });
});

bot.catch((err) => {
    console.error(`Error while handling update ${err.ctx.update.update_id}:`);
    console.error(err.error);
});

bot.start();
console.log("Bot is running...");
