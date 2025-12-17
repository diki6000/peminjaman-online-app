FROM node:20-alpine

WORKDIR /app

# Install dependencies first (for caching)
COPY package.json package-lock.json ./
RUN npm install

# Copy the rest of the code
COPY . .

# Start the development server
CMD ["npm", "run", "dev", "--", "--host"]