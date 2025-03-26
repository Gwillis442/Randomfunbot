# Use the official Node.js image as the base image
FROM node:22

# Install Chrome dependencies
RUN apt-get update && apt-get install -y --no-install-recommends \
    wget \
    gnupg \
    unzip \
    libxss1 \
    libappindicator1 \
    fonts-liberation \
    libasound2 \
    libnspr4 \
    libnss3 \
    libx11-xcb1 \
    libxcomposite1 \
    libxcursor1 \
    libxdamage1 \
    libxi6 \
    libxtst6 \
    xdg-utils \
    libatspi2.0-0 \
    && rm -rf /var/lib/apt/lists/*

# Set the working directory
WORKDIR /app

# Copy package.json and package-lock.json
COPY package.json package-lock.json ./

# Install dependencies
RUN npm install

# Copy the rest of the application code
COPY . .

# Define the command to run the application
CMD ["node", "src/index.js"]