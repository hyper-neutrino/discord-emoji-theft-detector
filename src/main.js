import commands from "./commands.js";
import config from "./config.js";

const { Client } = await import("discord.js");

const client = new Client({ intents: [] });

client.once("ready", async () => {
    await client.application.commands.set(commands);
    console.log("ETF is ready.");
});

await client.login(config.discord_token);
