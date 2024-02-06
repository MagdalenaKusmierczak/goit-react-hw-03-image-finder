import axios from 'axios';

axios.defaults.baseURL = 'https://pixabay.com/api/';
const API_KEY = '35262306-2ee6f92f6616bfcf6c7291f6d';

async function FetchApi(searchInput, page) {
  const response = await axios.get(
    `?q=${searchInput}&page=${page}&key=${API_KEY}&image_type=photo&orientation=horizontal&per_page=12`
  );
  return response.data;
}
export default FetchApi;
