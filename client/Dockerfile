# Use the official Node.js image as the base image
FROM node:18

# Set the working directory in the container
WORKDIR /usr/src/app

# Copy package.json and package-lock.json to the working directory
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the entire client code to the working directory
COPY . .

# Expose port 3000 for the frontend
EXPOSE 3000

# Run the app in production mode when the container starts
CMD ["npm", "start"]
