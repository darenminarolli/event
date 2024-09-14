export interface Attendee {
    _id?: string;
    userId: string;
    eventId: string;
    createdAt?: string;
    updatedAt?: string;
}
export interface EventRegistrationParams {
    eventId?: string;
    userId?: string; 
}