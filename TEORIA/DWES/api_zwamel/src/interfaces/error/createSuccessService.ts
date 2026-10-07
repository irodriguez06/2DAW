export interface CreateSuccessService<T> {
    success: boolean;
    code: number;
    data: T;
}