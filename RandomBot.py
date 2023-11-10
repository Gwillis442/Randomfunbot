import discord
import random

intents = discord.Intents(guilds=True, guild_messages=True)
client = discord.Client(intents=intents)

@client.event
async def on_ready():
    print(f'Logged in as {client.user}')

# Set the username to target for message deletion
target_username = "kony911"

@client.event
async def on_message(message):
    global target_username
    
    # Check if the message author's username matches the target username
    if message.author.name == target_username:
        # Generate a random number between 1 and 150
        random_number = random.randint(1, 150)

        # If the random number is 1, delete the message
        if random_number == 1:
            await message.delete()
            print(f'Deleted message from {message.author.name}: {message.content}')
            # Send a DM to the message author
            # await message.author.send(f'Your message was deleted, {message.author}')

    # Creating random chance for user to have a message deleted
    elif message.author.name != target_username:
        random_number3 = random.randint(1, 200)

        # If the random number is 1, delete the message
        if random_number3 == 1:
            await message.delete()
            print(f'Deleted message from {message.author.name}: {message.content}')

    # Creating random chance to have the bot respond with one of two emotes
    random_number1 = random.randint(1, 100)

    if random_number1 == 1:
        await message.add_reaction('👍')
    elif random_number1 == 3:
        await message.add_reaction('👎')

    # Creating random chance to have the bot respond to a person with a message
    random_number2 = random.randint(1, 2048)

    if random_number2 == 1:
        await message.channel.send(f'WARNING WARNING, {message.author.mention} IS REQUIRED TO ATTEND A MANDATORY PEBIS INSPECTION, NON-COMPLIANCE WILL RESULT IN TERMINATION, PLEASE HEAD TO THE PEBIS EXTENDER ROOM IMMEDIATELY')

@client.event
async def on_message(interaction):
    if not interaction.author.bot:
        if interaction.content.startswith('!'):
            command = interaction.content[1:]
            if command == 'ping':
                await interaction.reply('Pong!')
            elif command == 'server':
                await interaction.reply(f'Server name: {interaction.guild.name}\nTotal members: {interaction.guild.member_count}')
            elif command == 'user':
                await interaction.reply(f'Your tag: {interaction.author.name}\nYour id: {interaction.author.id}')
            elif command == 'echo':
                user_provided_input = interaction.content[6:]
                await interaction.reply(f'You provided: {user_provided_input}')
            elif command == 'settarget':
                new_username = interaction.content[11:]
                target_username = new_username
                await interaction.reply(f'Target username updated to {new_username}')


client.run('MTE3MjAyNTUwOTU3MjUzMDIyNg.Gbg__A.kmQAj7zl07nvB9pUCzUSRhXQ2jW088XNFzcUxw')
