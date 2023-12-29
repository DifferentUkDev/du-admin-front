import { api } from "./const";

export const loginUser = (email: string, password: string) => {
    return api.post('/Auth/LoginEmployee', {email, password})
}