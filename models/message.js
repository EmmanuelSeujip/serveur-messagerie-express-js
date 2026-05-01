import { Model, DataTypes } from 'sequelize';

export default (sequelize) => {
  class Message extends Model {
    static associate(models) {
      // Un message appartient à un utilisateur
      Message.belongsTo(models.User, {
        foreignKey: 'idUsers',
        onDelete: 'CASCADE'
      });
    }
  }
  
  Message.init({
    idUsers: DataTypes.INTEGER,
    content: DataTypes.STRING,
    title: DataTypes.STRING,
    attachment: DataTypes.STRING,
    likes: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Message'
  });
  
  return Message;
};