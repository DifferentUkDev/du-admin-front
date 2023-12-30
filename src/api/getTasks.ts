import { api } from "./const";

export const getBeneficiaryVerificationAttempts = (token: string | undefined) => {
    api.defaults.headers.common['Authorization'] = `Bearer ${token}`;
    return api.get('/Inquiry/BeneficiaryVerificationAttempts').then((resp) => resp)
}

export const getVolunteerVerificationAttempts = (token: string | undefined) => {
    api.defaults.headers.common['Authorization'] = `Bearer ${token}`;
    return api.get('/Inquiry/VolunteerVerificationAttempts').then((resp) => resp)
}

export const getPartnerVerificationAttempts = (token: string | undefined) => {
    api.defaults.headers.common['Authorization'] = `Bearer ${token}`;
    return api.get('/Inquiry/PartnerVerificationAttempts').then((resp) => resp)
}