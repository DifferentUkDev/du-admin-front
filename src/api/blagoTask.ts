import { api } from "./const";

export const approveBeneficiaryVerificationAttempt = (token: string | undefined, userId: string) => {
    api.defaults.headers.common['Authorization'] = `Bearer ${token}`;
    return api.post(`/Inquiry/ApproveBeneficiaryVerificationAttempt/${userId}`).then((resp) => resp)
}

export const rejectBeneficiaryVerificationAttempt = (token: string | undefined, userId: string, comment: string) => {
    api.defaults.headers.common['Authorization'] = `Bearer ${token}`;
    return api.post(`/Inquiry/RejectBeneficiaryVerificationAttempt`, {userId, comment}).then((resp) => resp)
}