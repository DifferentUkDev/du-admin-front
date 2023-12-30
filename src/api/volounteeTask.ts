import { api } from "./const";

export const approveVolunteerVerificationAttempt = (token: string | undefined, id: number) => {
    api.defaults.headers.common['Authorization'] = `Bearer ${token}`;
    return api.post(`/Inquiry/ApproveVolunteerVerificationAttempt/${id}`).then((resp) => resp)
}

export const rejectVolunteerVerificationAttempt = (token: string | undefined, email: string, comment: string) => {
    api.defaults.headers.common['Authorization'] = `Bearer ${token}`;
    return api.post(`/Inquiry/RejectVolunteerVerificationAttempt`, {email, comment}).then((resp) => resp)
}