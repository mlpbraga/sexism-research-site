import api from '.';

interface Params {
  newsId?: string;
  limit: number;
  offset: number;
  query: string;
  label?: boolean;
}

const CommentsProxy = {
  async get({ limit, offset, newsId, query, label }: Params) {
    let url = `/comments?limit=${limit}&offset=${offset}`;
    if (newsId) url += `&newsid=${newsId}`;
    if (query) url += `&query=${query}`;
    if (label !== undefined) {
      if (label === false) url += `&label=0`;
      else url += `&label=1`;
    }

    const response = await api.get(url);
    return response.data;
  },
};

export default CommentsProxy;
