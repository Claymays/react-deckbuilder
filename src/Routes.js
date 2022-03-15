export const baseUrl = 'http://ec2-3-133-114-45.us-east-2.compute.amazonaws.com:8080';
export const testUrl = 'http://localhost:8080';

export const paths = {
    login: `${baseUrl}/api/user/login`,
    user: `${baseUrl}/api/user`,
    deck: `${baseUrl}/api/deck/`,
    card: `${baseUrl}/api/card`,
    user_create: `${baseUrl}/api/user/create`
}

export const testPaths = {
    login: `${testUrl}/api/user/login`,
    user: `${testUrl}/api/user`,
    deck: `${testUrl}/api/deck/`,
    card: `${testUrl}/api/card`,
    user_create: `${testUrl}/api/user/create`
}
