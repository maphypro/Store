export type UserReg =  {
    firstName: string,
    lastName: string,
    email: string,
    password: string,
    confirmPassword: string,
}


export type UserAuth =  {
    id: number,
    firstName: string,
    lastName: string,
    email: string,
    isAuth: boolean
}
