export interface Todo {
    _id?: string;
    title: string;
    description?: string;
    status: 'PENDING' | 'IN-PROGRESS' | 'COMPLETED';
    priority: 'LOW' | 'MEDIUM' | 'HIGH';
    createdAt?: Date;
    updatedAt?: Date;
}

export interface TodoResponse {
    message: string;
    data?: Todo | Todo[];
    status?: number;
} 