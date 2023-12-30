import { api } from "./const";

export const approvePartnerVerificationAttempt = (token: string | undefined, id: number) => {
    api.defaults.headers.common['Authorization'] = `Bearer ${token}`;
    return api.post(`/Inquiry/ApprovePartnerVerificationAttempt/${id}`).then((resp) => resp)
}

export const rejectPartnerVerificationAttempt = (token: string | undefined, contactEmail: string, comment: string) => {
    api.defaults.headers.common['Authorization'] = `Bearer ${token}`;
    return api.post(`/Inquiry/RejectPartnerVerificationAttempt`, {contactEmail, comment}).then((resp) => resp)
}