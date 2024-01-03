import { api } from "./const";

export const getBeneficiaries = (isVerified: boolean, token: string | undefined) => {
    api.defaults.headers.common['Authorization'] = `Bearer ${token}`;
    api.defaults.headers.post['Content-Type'] = 'application/json';
    return api.post('/Auth/Beneficiaries', isVerified.toString() ).then((resp) => resp)
}

export const getVolunteers = (token: string | undefined) => {
    api.defaults.headers.common['Authorization'] = `Bearer ${token}`;
    return api.get('/Auth/Volunteers').then((resp) => resp)
}

export const getPartners = (token: string | undefined) => {
    api.defaults.headers.common['Authorization'] = `Bearer ${token}`;
    return api.get('/Auth/Partners').then((resp) => resp)
}