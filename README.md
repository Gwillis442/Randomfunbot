# Randomfunbot

Randomfunbot is a Discord bot created for a personal server. Its purpose is to perform various actions based on certain probabilities for fun, such as deleting messages, adding random reactions, and more. The bot is hosted locally in a containerized in Docker.

## Features

- **Random Message Deletion**: Deletes messages based on a random probability.
- **Random Reactions**: Adds random reactions to messages.
- **Link Handling**: Moves links to a designated channel.
- **User Interaction**: Replies to messages with random text or GIFs.
- **Database Integration**: Tracks user activity and stores data in a SQLite database.

## Getting Started

### Prerequisites

- Docker installed on your machine

### Building the Docker Image

To build the Docker image for Randomfunbot, run the following command in the directory containing the Dockerfile:

```sh
docker build -t randomfunbot .

docker run -d --name randomfunbot randomfunbot

```
