export interface SuccesService<T> {
    success: boolean;
    code: number;
    data: T;
}