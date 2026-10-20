export type TodoStatus = 'READY' | 'PROGRESS' | 'DONE';

export interface Todo {
    id: string;
    status: TodoStatus;
    userId: string;
    userName: string;
    title: string;
    content: string;
    createdAt?: string;
    updatedAt?: string;
    deletedAt?: string;
}

export interface AddTodoInput {
    title: string;
    content: string;
}

export interface ChangeTodoInput extends AddTodoInput {
    id: string;
    status?: TodoStatus;
}
