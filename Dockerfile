# Use the official Node.js image as the base image
FROM node:18-alpine AS build

# Set the working directory inside the container
WORKDIR /app

# Copy package.json and package-lock.json to install dependencies
COPY package*.json ./

# Install dependencies
RUN npm install

# Install global vite
RUN npm install -g vite

# Copy the rest of the application code
COPY . .

# Expose port 80 to access the app
EXPOSE 3000

# Start the application
CMD ["npm", "run", "dev"]
