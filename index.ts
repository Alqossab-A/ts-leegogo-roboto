import { Commands } from './commands/Commands';
import { REST } from '@discordjs/rest';
import { Client, GatewayIntentBits, Interaction, Partials, Routes } from 'discord.js';

const rest = new REST({ version: "10"}).setToken(process.env.DISCORD_TOKEN as string);

const client = new Client({
    partials: [Partials.Message, Partials.Channel],
    intents: [
        GatewayIntentBits.Guilds,
        GatewayIntentBits.GuildMembers,
        GatewayIntentBits.GuildMessages,
        GatewayIntentBits.MessageContent,
    ]
});

client.on("ready", async () => {
    if(!client.user || !client.application) {
        return;
    };

    console.log(Commands);
    
    try {
        await client.application.commands.set(Commands);
        await rest.put(Routes.applicationCommands(process.env.CLIENT_ID as string), {
            body: Commands,
        });
        console.log("we made it!")
    } catch(Error) {
        console.log(Error);
    };
});

client.on("interactionCreate", async (interaction: Interaction) => {
    if (!interaction.isCommand()) {
        return;
    };
    
    const slashCommand = Commands.find((c) => c.name === interaction.commandName);
    if (!slashCommand) {
        return;
    };

    slashCommand.execute(client, interaction);
});

client.login(process.env.DISCORD_TOKEN);
