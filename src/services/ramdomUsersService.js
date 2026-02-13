const axios = require("axios");
const URL_API = "https://api.api-ninjas.com/v2/randomuser?count=20";
const KEY_API = "7A3Llz2XKvj2mZsfqvQZQFv12KHfHHzvyFb55k3S";

async function fetchRandomUsers() {

  try {
    const response = await axios.get(URL_API, { headers: { "X-Api-Key": KEY_API } });
    return response.data;
  } catch (error) {
      console.error("Erro ao buscar usuários da API:", error.message);
    throw error;
  }
}

module.exports = {
  fetchRandomUsers
};