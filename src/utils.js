import { EmbedBuilder } from "@discordjs/builders";
import { Colors } from "discord.js";

export function fail(message, title) {
    return new EmbedBuilder()
        .setTitle(title ?? "**Error**")
        .setDescription(message)
        .setColor(Colors.Red);
}
