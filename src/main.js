import { EmbedBuilder } from "@discordjs/builders";
import { ApplicationCommandType, Colors, InteractionType } from "discord.js";
import commands from "./commands.js";
import config from "./config.js";

process.on("uncaughtException", console.error);

const { Client } = await import("discord.js");

const client = new Client({ intents: [] });

client.once("ready", async () => {
    await client.application.commands.set(commands);
    console.log("ETF is ready.");
});

client.on("interactionCreate", async (interaction) => {
    if (
        interaction.type == InteractionType.ApplicationCommand ||
        interaction.type == InteractionType.ApplicationCommandAutocomplete
    ) {
        const keys = [interaction.commandName];

        if (interaction.commandType == ApplicationCommandType.ChatInput) {
            const subgroup = interaction.options.getSubcommandGroup(false);
            if (subgroup) keys.push(subgroup);

            const sub = interaction.options.getSubcommand(false);
            if (sub) keys.push(sub);
        }

        const { execute, autocomplete } = await import(
            `./commands/${keys.join("/")}.js`
        );

        let response;

        if (interaction.type == InteractionType.ApplicationCommand) {
            try {
                response = await execute(interaction);
            } catch (error) {
                console.error(error);

                response = new EmbedBuilder()
                    .setTitle("**Error**")
                    .setDescription("An error occurred executing this command.")
                    .setColor(Colors.Red);
            }

            try {
                await interaction.reply(response);
            } catch {
                await interaction.editReply(response);
            }
        } else {
            response = await autocomplete(interaction);

            await interaction.respond(
                response
                    .slice(0, 25)
                    .map((x) =>
                        x instanceof String || typeof x == "string"
                            ? { name: x, value: x }
                            : x
                    )
            );
        }
    }
});

await client.login(config.discord_token);
