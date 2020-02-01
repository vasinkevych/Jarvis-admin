const StorageService = require('../../services/storage.service');

module.exports = {
  async dumps() {
    try {
      const metadata = await StorageService.getDumpsMetadata();

      return metadata.map(data => ({
        id: data.generation,
        name: data.name,
        created: new Date(data.timeCreated).toISOString()
      }));
    } catch (e) {
      console.error(e);
    }
  },

  async restoreFromDump({ name }) {
    try {
      await StorageService.importDatabase(name);
    } catch (e) {
      console.warn(e);
      return false;
    }
    return true;
  }
};
