export interface IBloodTest {
    id?: number;
    result: number;
    date: string;
    observations?: string;
    patientId?: number;
    createdAt?: string;
    updatedAt?: string;
}
