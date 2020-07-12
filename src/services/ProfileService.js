import xhr from 'xhr-async';
import mockRespose from './mocks/profile-service-mock.json';

// export function getProfileInfo(){
//     const url = 'https://api.github.com/users/supreetsingh247'
//     return xhr.get(url)
// }

export function getProfileInfo() {
  return {
    response: mockRespose,
    error: null,
  };
}
