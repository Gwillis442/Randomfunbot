import discord
from discord.ext import commands
from discord_slash import SlashCommand, SlashContext

bot = commands.Bot(command_prefix="!")

# Replace 'your_bot_token' with your actual bot token
bot_token = 'MTE3MjAyNTUwOTU3MjUzMDIyNg.Gbg__A.kmQAj7zl07nvB9pUCzUSRhXQ2jW088XNFzcUxw'

slash = SlashCommand(bot, sync_commands=True)

guild_id = 281708575770804234  # Replace with your guild ID

@bot.event
async def on_ready():
    print(f'Logged in as {bot.user.name}')

    # Register slash commands on bot startup
    commands = [
        {
            "name": "ping",
            "description": "Replies with Pong!"
        },
        {
            "name": "server",
            "description": "Replies with server info!"
        },
        {
            "name": "user",
            "description": "Replies with user info!"
        },
        {
            "name": "echo",
            "description": "Replies with your input!",
            "options": [
                {
                    "name": "input",
                    "description": "The input to echo back",
                    "type": 3,  # String type
                    "required": True
                }
            ]
        },
        {
            "name": "settarget",
            "description": "Set the target username for message deletion",
            "options": [
                {
                    "name": "newUsername",
                    "description": "The new target username",
                    "type": 3,  # String type
                    "required": True,
                    "choices": []  # Add choices if needed
                }
            ]
        },
    ]

    await slash.sync_guild_commands(guild_id, commands)
    print('Successfully registered application commands.')

@bot.slash_command(name="ping")
async def ping(ctx: SlashContext):
    await ctx.send("Pong!")

@bot.slash_command(name="server")
async def server(ctx: SlashContext):
    guild = ctx.guild
    await ctx.send(f"Server name: {guild.name}\nTotal members: {guild.member_count}")

@bot.slash_command(name="user")
async def user(ctx: SlashContext):
    user = ctx.author
    await ctx.send(f"Your tag: {user.name}\nYour id: {user.id}")

@bot.slash_command(name="echo")
async def echo(ctx: SlashContext, input: str):
    await ctx.send(f"You provided: {input}")

@bot.slash_command(name="settarget")
async def set_target(ctx: SlashContext, new_username: str):
    # Implement logic to set the target username for message deletion
    await ctx.send(f"Target username updated to {new_username}")

# Start the bot
bot.run('MTE3MjAyNTUwOTU3MjUzMDIyNg.Gbg__A.kmQAj7zl07nvB9pUCzUSRhXQ2jW088XNFzcUxw')
