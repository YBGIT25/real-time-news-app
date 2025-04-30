# Use the latest Node.js LTS version
FROM node:18

# Set working directory
WORKDIR /usr/src/app

# Copy package.json and install dependencies
COPY package*.json ./
RUN npm install

# Copy the rest of the app
COPY . .

# Expose port 5000
EXPOSE 5000

# Start the app
CMD ["node", "server.js"]
