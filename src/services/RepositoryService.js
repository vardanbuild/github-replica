import xhr from 'xhr-async';
import mockRespose from './mocks/repo-service-mock.json';

// export function getRepositories() {
//   const url = 'https://api.github.com/users/supreetsingh247/repos';
//   return xhr.get(url);
// }

export function getRepositories() {
  return {
    response: mockRespose,
    error: null,
  };
}
