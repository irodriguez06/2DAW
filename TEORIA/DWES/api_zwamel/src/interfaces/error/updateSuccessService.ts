export interface UpdateSuccessService<T> {
    success: boolean;
    code: number;
    data: T;
}