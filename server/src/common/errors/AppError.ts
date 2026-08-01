type AppErrorConstructorProps = {
    message: string,
    statusCode: number,
    code: string,
}

export class AppError extends Error {
    public readonly statusCode: number;
    public readonly code: string;
    
    constructor({message, statusCode, code}: AppErrorConstructorProps){
        super(message);

        this.statusCode = statusCode;
        this.code = code;
        this.name = "AppError";
    }
}