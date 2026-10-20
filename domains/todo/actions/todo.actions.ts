'use server';
import { getCurrentUser } from '@/domains/auth/queries/getCurrentUser.query';
import { createServerClient } from '@/shared/lib/supabase';
import { ActionState } from '@/shared/types/action.types';
import { validateTodoInput } from '../utils/todoValidation';

export async function AddTodoAction(
    prevState: ActionState,
    formData: FormData,
): Promise<ActionState> {
    const title = (formData.get('title') as string) ?? '';
    const content = (formData.get('content') as string) ?? '';

    const { user } = await getCurrentUser();
    if (!user) {
        return {
            success: false,
            message: '로그인이 필요한 서비스 입니다.',
        };
    }

    // 필드별 유효성 검사
    const errors = validateTodoInput({ title, content });

    if (Object.keys(errors).length > 0) {
        return {
            success: false,
            errors,
        };
    }

    const supabase = createServerClient();

    // 할일 등록
    const { data: todo, error: todoError } = await supabase
        .from('todos')
        .insert({
            status: 'READY',
            title,
            content,
            user_id: user.id,
            user_name: user.name,
        })
        .select('*')
        .single();

    if (todoError) {
        return {
            success: false,
            message: `할일 등록에 실패했습니다: ${todoError.message}`,
        };
    }

    return {
        success: true,
        message: '할일이 등록되었습니다.',
        data: { id: todo.id },
    };
}
