import {
    SlashCommandBuilder,
    SlashCommandStringOption,
    SlashCommandSubcommandBuilder,
    SlashCommandUserOption,
} from "discord.js";

const name = new SlashCommandStringOption()
    .setName("name")
    .setDescription("the name of the network")
    .setRequired(true)
    .setAutocomplete(true);

const server = new SlashCommandStringOption()
    .setName("server-id")
    .setDescription("the server's ID")
    .setRequired(true);

export default [
    new SlashCommandBuilder()
        .setName("network")
        .setDescription("setup or manage a network")
        .addSubcommand(
            new SlashCommandSubcommandBuilder()
                .setName("create")
                .setDescription("create a new network")
                .addStringOption(
                    new SlashCommandStringOption()
                        .setName("name")
                        .setDescription("the name of the network")
                        .setRequired(true)
                        .setMinLength(3)
                        .setMaxLength(64)
                )
        )
        .addSubcommand(
            new SlashCommandSubcommandBuilder()
                .setName("delete")
                .setDescription("delete a network")
                .addStringOption(name)
        )
        .addSubcommand(
            new SlashCommandSubcommandBuilder()
                .setName("transfer")
                .setDescription("transfer ownership of a network")
                .addStringOption(name)
                .addUserOption(
                    new SlashCommandUserOption()
                        .setName("user")
                        .setDescription("the user to transfer the network to")
                        .setRequired(true)
                )
        )
        .addSubcommand(
            new SlashCommandSubcommandBuilder()
                .setName("cancel")
                .setDescription("cancel an ownership transfer")
                .addStringOption(name)
        )
        .addSubcommand(
            new SlashCommandSubcommandBuilder()
                .setName("accept")
                .setDescription("accept an ownership transfer")
                .addStringOption(name)
        )
        .addSubcommand(
            new SlashCommandSubcommandBuilder()
                .setName("add")
                .setDescription("add a server to the network")
                .addStringOption(name)
                .addStringOption(server)
        )
        .addSubcommand(
            new SlashCommandSubcommandBuilder()
                .setName("remove")
                .setDescription(
                    "remove a server from the network or cancel its invitation"
                )
                .addStringOption(name)
                .addStringOption(server)
        ),
];
