import { getTodoById } from '../queries/getTodoById.query';
import type { AddTodoInput, ChangeTodoInput } from '../types/todo.types';

export function validateAddTodoInput(
    input: AddTodoInput,
): Record<string, string> {
    const errors: Record<string, string> = {};

    if (!input.title || !input.title.trim()) {
        errors.title = '할일 제목을 입력해 주세요.';
    }

    if (!input.content || !input.content.trim()) {
        errors.content = '할일 내용을 입력해 주세요.';
    }

    return errors;
}

export function validateChangeTodoInput(
    input: ChangeTodoInput,
): Record<string, string> {
    const errors: Record<string, string> = {};

    // 등록된 게시글인지 확인
    const todo = getTodoById(input.id);
    if (!todo) {
    }

    if (!input.title || !input.title.trim()) {
        errors.title = '할일 제목을 입력해 주세요.';
    }

    if (!input.content || !input.content.trim()) {
        errors.content = '할일 내용을 입력해 주세요.';
    }

    return errors;
}
