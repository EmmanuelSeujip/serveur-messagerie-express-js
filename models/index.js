import { Sequelize } from 'sequelize';
import process from 'process';
import { createRequire } from 'module';

// On utilise cette astuce pour pouvoir importer facilement le fichier config.json
const require = createRequire(import.meta.url);
const config = require('../config/config.json')[process.env.NODE_ENV || 'development'];

// Importation manuelle de tes modèles
import UserModel from './user.js';
import MessageModel from './message.js';

// Initialisation de la connexion à la base de données
const sequelize = new Sequelize(config.database, config.username, config.password, config);

// Création de l'objet db qui contiendra tes modèles
const db = {
  User: UserModel(sequelize),
  Message: MessageModel(sequelize),
  sequelize,
  Sequelize
};

// Application des associations (les liaisons hasMany, belongsTo...)
Object.keys(db).forEach(modelName => {
  if (db[modelName].associate) {
    db[modelName].associate(db);
  }
});

export default db;