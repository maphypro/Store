export type UserRegType =  {
    firstName: string,
    lastName: string,
    email: string,
    password: string,
    confirmPassword: string,
}


export type UserAuthType =  {
    email: string,
    password: string
}

export type CheckAuthType = {
    accessToken: string,
    refreshToken: string
}
