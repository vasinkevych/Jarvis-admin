import auth from '../services/Auth';

import { getBaseUrl } from '../utils';

class User {
  async parseUsers() {
    try {
      const token = auth.getIdToken();

      const response = await fetch(`${getBaseUrl()}/api/parse`, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });

      return response;
    } catch (err) {
      // eslint-disable-next-line no-console
      console.error(err);
    }
  }
}

const user = new User();

export default user;
