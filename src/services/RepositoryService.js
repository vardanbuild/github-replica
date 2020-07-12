import xhr from 'xhr-async';

export const getRepositories = () => {
  const url = 'https://github.com/supreetsingh247?tab=repositories';
  return xhr.get;
};
