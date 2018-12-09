import { SERVER_HOST, ROUTES } from './constans';

class GamesHttpClient {
  url = `${SERVER_HOST}${ROUTES.GAMES}`;

  async create(game) {
    try {
      const response = await fetch(this.url, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ game }),
      });

      return response.json();
    }

    catch (e) {
      console.error(e);
    }
  }

  async read(sortBy, title) {
    try {
      const response = await fetch(`${this.url}?sortBy=${sortBy}&title=${title}`);

      return response.json();
    }

    catch (e) {
      console.error(e);
    }
  }

  async update(id, game) {
    try {
      const response = await fetch(`${this.url}/${id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ game }),
      });

      return response.json();
    }

    catch (e) {
      console.error(e);
    }
  }

  async delete(id) {
    try {
      const response = await fetch(`${this.url}/${id}`, { method: 'DELETE' });

      return response.json();
    }

    catch (e) {
      console.error(e);
    }
  }


}

export default GamesHttpClient;
