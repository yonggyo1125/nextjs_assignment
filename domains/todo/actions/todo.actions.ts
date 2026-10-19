import { ActionState } from '@/shared/types/action.types';

export default async function AddTodoAction(
    prevState: ActionState,
    formData: FormData,
): Promise<ActionState> {
    return {
        success: true,
        message: '할일이 등록되었습니다.',
        data: {},
    };
}
