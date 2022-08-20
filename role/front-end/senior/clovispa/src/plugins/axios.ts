import axios from 'axios';

const apiClient = axios.create({
  baseURL: 'https://api.storyblok.com/v2/cdn/stories/'
});

export default apiClient
