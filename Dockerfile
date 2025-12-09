# Use official Node.js runtime as a parent image

FROM node:18-bullseye


# Set working directory in container
WORKDIR /app

# Copy package.json and package-lock.json
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the rest of the application code
COPY . .

# Expose port 3000
EXPOSE 3000

# Set environment variables
ENV NODE_ENV=production

# Start the application
CMD ["npm", "start"]
