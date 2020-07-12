import xhr from 'xhr-async'

export const getProfileInfo = () => {
    const url = 'https://api.github.com/users/supreetsingh247'
    return xhr.get
}