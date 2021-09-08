import config from 'config';

export const parseIds = (data) => {
  const idKeys = Object.keys(data).filter((key) => key.endsWith('Id'));
  idKeys.forEach((key) => {
    data[key] = parseInt(data[key]);
  });
  return data;
};

export const SERVER_API_ENDPOINT = config.get('SERVER_API_ENDPOINT', '/api');
