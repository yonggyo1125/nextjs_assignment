'use client';
import { Button } from '@/shared/components/ui/button';
import { INITIAL_ACTION_STATE } from '@/shared/types/action.types';
import { useActionState } from 'react';
import { AddTodoAction } from '../actions/todo.actions';

export default function TodoForm() {
    const [state, formAction, isPending] = useActionState(
        AddTodoAction,
        INITIAL_ACTION_STATE,
    );

    return (
        <div>
            <form action={formAction} noValidate autoComplete="off">
                <Button type="submit" disabled={isPending}>
                    등록하기
                </Button>
            </form>
        </div>
    );
}
