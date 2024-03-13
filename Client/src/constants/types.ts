export type Country = {
    name: string;
    code: string;
};
export interface FormData {
    // name: string;
    email: string;
    password: string;
    // date: Date | null;
    // country: Country | null;
    // accept: string;
}export interface ErrorResponse {
    errors: {
        DuplicateUserName: string[];
    };
}

