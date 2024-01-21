import { Client, CommandInteraction } from 'discord.js';
import { Command } from './ICommand';

export const ahmed: Command = {
    name: "ahmed",
    ephemeral: true,
    description: "da fancy boi",
    async execute(client: Client, interaction: CommandInteraction) {
        if (!interaction.guild)
            return interaction.reply({
                content: "Invalid Request.",
            });

        return interaction.reply({
            content: "Ahmed is da sexy's'!"
        })
    }
}
