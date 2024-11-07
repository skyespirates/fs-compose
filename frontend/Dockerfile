# Step 1: Build the application
FROM node:18-alpine AS build

# Set the working directory inside the container
WORKDIR /app

# Copy package.json and package-lock.json (or yarn.lock)
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the entire project
COPY . .

# Build the Vite app
RUN npm run build

# Step 2: Serve the app using a production web server (nginx)
FROM nginx:alpine

# Copy the build output from the previous step to nginx's default html folder
COPY --from=build /app/dist /usr/share/nginx/html

# Expose the port Nginx will run on
EXPOSE 80

# Start nginx in the foreground
CMD ["nginx", "-g", "daemon off;"]
