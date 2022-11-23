import {
    SlashCommandBooleanOption,
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
                .setDescription(
                    "create a new network (this server will be its headquarters)"
                )
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
        )
        .addSubcommand(
            new SlashCommandSubcommandBuilder()
                .setName("transfer")
                .setDescription("transfer ownership of a network")
                .addUserOption(
                    new SlashCommandUserOption()
                        .setName("user")
                        .setDescription("the user to transfer the network to")
                        .setRequired(true)
                )
        )
        .addSubcommand(
            new SlashCommandSubcommandBuilder()
                .setName("cancel-transfer")
                .setDescription("cancel an ownership transfer")
        )
        .addSubcommand(
            new SlashCommandSubcommandBuilder()
                .setName("accept")
                .setDescription("accept an ownership transfer")
        )
        .addSubcommand(
            new SlashCommandSubcommandBuilder()
                .setName("add")
                .setDescription("add a server to the network")
                .addStringOption(server)
        )
        .addSubcommand(
            new SlashCommandSubcommandBuilder()
                .setName("remove")
                .setDescription(
                    "remove a server from the network or cancel its invitation"
                )
                .addStringOption(server)
        )
        .addSubcommand(
            new SlashCommandSubcommandBuilder()
                .setName("rename")
                .setDescription("rename the network")
                .addStringOption(
                    new SlashCommandStringOption()
                        .setName("new-name")
                        .setDescription("the name to change to")
                        .setRequired(true)
                        .setMinLength(3)
                        .setMaxLength(64)
                )
        )
        .addSubcommand(
            new SlashCommandSubcommandBuilder()
                .setName("promote")
                .setDescription("promote a user to network admin")
                .addUserOption(
                    new SlashCommandUserOption()
                        .setName("user")
                        .setDescription("the user to promote")
                        .setRequired(true)
                )
        )
        .addSubcommand(
            new SlashCommandSubcommandBuilder()
                .setName("demote")
                .setDescription("demote a user from network admin")
                .addUserOption(
                    new SlashCommandUserOption()
                        .setName("user")
                        .setDescription("the user to demote")
                        .setRequired(true)
                )
        )
        .addSubcommand(
            new SlashCommandSubcommandBuilder()
                .setName("info")
                .setDescription("get info on the network")
        ),
    new SlashCommandBuilder()
        .setName("join")
        .setDescription("join a network")
        .addStringOption(name),
    new SlashCommandBuilder()
        .setName("leave")
        .setDescription("leave a network")
        .addStringOption(name),
    new SlashCommandBuilder()
        .setName("asset")
        .setDescription("manage your server's assets")
        .addSubcommand(
            new SlashCommandSubcommandBuilder()
                .setName("alter")
                .setDescription("alter the exclusivity of an asset")
                .addStringOption(
                    new SlashCommandStringOption()
                        .setName("type")
                        .setDescription("the type of asset")
                        .setRequired(true)
                        .addChoices("sticker", "emoji")
                )
                .addStringOption(
                    new SlashCommandStringOption()
                        .setName("name")
                        .setDescription("the name of the asset")
                        .setRequired(true)
                        .setAutocomplete(true)
                )
                .addBooleanOption(
                    new SlashCommandBooleanOption()
                        .setName("exclusive")
                        .setDescription(
                            "whether this asset should be server exclusive"
                        )
                        .setRequired(true)
                )
        )
        .addSubcommand(
            new SlashCommandSubcommandBuilder()
                .setName("setup")
                .setDescription("go through each asset and set its exclusivity")
                .addBooleanOption(
                    new SlashCommandBooleanOption()
                        .setName("show-labeled")
                        .setDescription(
                            "show assets that are already labeled as exclusive or free use (default: false)"
                        )
                        .setRequired(false)
                )
        ),
    new SlashCommandBuilder()
        .setName("scan")
        .addStringOption(
            new SlashCommandStringOption()
                .setName("server-id")
                .setDescription("the ID of the server to scan")
                .setRequired(true)
        )
        .addBooleanOption(
            new SlashCommandBooleanOption()
                .setName("public")
                .setDescription(
                    "show a publicly visible response (default: false)"
                )
                .setRequired(false)
        )
        .addStringOption(
            new SlashCommandStringOption()
                .setName("name")
                .setDescription("the name of the network to scan")
                .setRequired(false)
                .setAutocomplete(true)
        )
        .addBooleanOption(
            new SlashCommandBooleanOption()
                .setName("server-only")
                .setDescription(
                    "scan against your server's assets only (overrides the default network)"
                )
                .setRequired(false)
        ),
    new SlashCommandBuilder()
        .setName("default")
        .setDescription("set the default network to scan when using /scan")
        .addStringOption(name),
];
