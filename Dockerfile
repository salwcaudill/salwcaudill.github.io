# Use the nginx image from Docker Hub
FROM nginx:1.21.3-alpine

# Set the working directory inside the container
WORKDIR /app

# Copy the nginx configuration file from the project root into the image
COPY ./nginx.conf /etc/nginx/nginx.conf

# Copy the source files from the project root into the default nginx HTML directory
COPY ./src /usr/share/nginx/html

# Expose port 80 to the outside world
EXPOSE 80

# Run nginx in the foreground when the container starts
CMD ["nginx", "-g", "daemon off;"]
