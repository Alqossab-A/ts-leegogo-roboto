import { Client, CommandInteraction } from 'discord.js';
import { Command } from './ICommand';

export const ping: Command = {
    name: "ping",
    ephemeral: true,
    description: "ping the bot",
    async execute(client: Client, interaction: CommandInteraction) {
        if (!interaction.guild)
            return interaction.reply({
                content: "Invalid Request.",
            });

        return interaction.reply({
            content: "Pong!"
        })
    },
};
