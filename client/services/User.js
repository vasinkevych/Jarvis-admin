import auth from '../services/Auth';

class User {
  async parseUsers() {
    try {
      const token = auth.getIdToken();

      const response = await fetch('/api/parse', {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });

      return response;
    } catch (err) {
      console.error(err);
    }
  }
}

const user = new User();

export default user;
