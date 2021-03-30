'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    /**
     * Add altering commands here.
     *
     * Example:
     * await queryInterface.createTable('users', { id: Sequelize.INTEGER });
     */
    return queryInterface.describeTable('channels').then((attributes) => {
      if (!attributes['description'] && !attributes['tags']) {
        return [
          queryInterface.addColumn('channels', 'description', {
            type: Sequelize.STRING,
            defaultValue: '',
          }),
          queryInterface.addColumn('channels', 'tags', {
            type: Sequelize.ARRAY(Sequelize.STRING),
            defaultValue: [],
          }),
        ];
      }
    });
  },

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  down: async (queryInterface, Sequelize) => {
    /**
     * Add reverting commands here.
     *
     * Example:
     * await queryInterface.dropTable('users');
     */
    return queryInterface.describeTable('channels').then((attributes) => {
      if (attributes['description'] && attributes['tags']) {
        return [
          queryInterface.removeColumn('channels', 'description'),
          queryInterface.removeColumn('channels', 'tags'),
        ];
      }
    });
  },
};
