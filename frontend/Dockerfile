FROM node:16

# Working Dir
WORKDIR /usr/src/app

# Copy Package Json Files
COPY package*.json ./

# Install Files (For our package build function)
RUN npm install

# Copy Source Files
COPY . .

# Expose The API Port
EXPOSE 3000

CMD [ "npm", "start" ]