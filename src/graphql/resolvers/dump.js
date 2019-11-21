const {
  getDumpsMetadata,
  importDatabase
} = require('../../services/storage.service');

module.exports = {
  async dumps() {
    try {
      const metadata = await getDumpsMetadata();

      return metadata.map(data => ({
        id: data.generation,
        name: data.name,
        created: new Date(data.timeCreated).toISOString()
      }));
    } catch (e) {
      console.log(e);
    }
  },

  async restoreFromDump({ name }) {
    try {
      await importDatabase(name);
    } catch (e) {
      console.log(e);
    }
    return true;
  }
};
