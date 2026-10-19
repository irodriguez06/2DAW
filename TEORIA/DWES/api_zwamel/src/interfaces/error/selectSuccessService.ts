export interface SelectSuccessService<T> {
    success: boolean;
    code: number;
    data: T;
}