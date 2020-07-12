import xhr from 'xhr-async';

export function getRepositories() {
  const url = 'https://api.github.com/users/supreetsingh247/repos';
  return xhr.get(url);
}
