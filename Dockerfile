# Utilisez une image de base avec Node.js pré-installé
FROM node:16.17.1

# Définissez le répertoire de travail à /app
WORKDIR /app

# Copiez le fichier package.json et package-lock.json
COPY package*.json ./

# Installez les dépendances
RUN npm install

# Copiez tous les fichiers du projet
COPY . .

# Exposez le port sur lequel votre application Angular s'exécute
EXPOSE 4200

# Commande pour exécuter l'application
CMD ["npm", "start"]
