import { api } from "./const";

export const getBeneficiaries = (isVerified: boolean, token: string | undefined) => {
    api.defaults.headers.common['Authorization'] = `Bearer ${token}`;
    return api.post('/Auth/Beneficiaries', (isVerified)).then((resp) => resp.data)
}

export const getVolunteers = () => {
    api.get('/Auth/Volunteerss').then((resp) => resp.data)
}

export const getPartners = () => {
    api.get('/Auth/Partners').then((resp) => resp.data)
}