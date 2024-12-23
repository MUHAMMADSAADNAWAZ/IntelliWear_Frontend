# Use an official Node.js runtime as a parent image
FROM node:18 AS build

# Set the working directory in the container
WORKDIR /app

# Copy the package.json and package-lock.json (or yarn.lock) to install dependencies
COPY package*.json ./

# Install the dependencies
RUN npm install

# Copy the rest of the application files to the container
COPY . .

# Build the app for production
RUN npm run build

# Use a smaller image for the final production stage (e.g., nginx)
FROM nginx:alpine

# Copy the build folder from the previous image
COPY --from=build /app/dist /usr/share/nginx/html

# Expose the port the app will run on
EXPOSE 80

# Start nginx to serve the app
CMD ["nginx", "-g", "daemon off;"]
