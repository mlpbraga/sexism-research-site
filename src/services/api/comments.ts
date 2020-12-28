import api from '.';

interface Params {
  newsId?: string;
  limit: number;
  offset: number;
  query: string;
  label?: string;
}

const CommentsProxy = {
  async get({ limit, offset, newsId, query, label }: Params) {
    let url = `/comments?limit=${limit}&offset=${offset}`;
    if (newsId) url += `&newsid=${newsId}`;
    if (query) url += `&query=${query}`;
    if (label !== undefined && label !== '') {
      url += `&label=${label}`;
    }

    const response = await api.get(url);
    return response.data;
  },
};

export default CommentsProxy;
