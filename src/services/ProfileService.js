import xhr from 'xhr-async'

export function getProfileInfo(){
    const url = 'https://api.github.com/users/supreetsingh247'
    return xhr.get(url)
}