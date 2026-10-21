'use client';

import TiptabEditor from '@/shared/components/TiptabEditor';
import { Button } from '@/shared/components/ui/button';
import { Input } from '@/shared/components/ui/input';
import { INITIAL_ACTION_STATE } from '@/shared/types/action.types';
import { useRouter } from 'next/navigation';
import { ChangeEvent, useActionState, useEffect, useState } from 'react';
import { FiAlertCircle } from 'react-icons/fi';
import { addTodoAction } from '../actions/todo.actions';

interface FormState {
    title: string;
    content: string;
}

const initialState: FormState = {
    title: '',
    content: '',
};

export default function TodoForm() {
    const router = useRouter();

    const [state, formAction, isPending] = useActionState(
        addTodoAction,
        INITIAL_ACTION_STATE,
    );

    const [form, setForm] = useState(initialState);
    const onChange = (e: ChangeEvent<HTMLInputElement> | string) => {
        setForm((prev) => {
            let key, value;
            if (typeof e === 'string') {
                key = 'content';
                value = e;
            } else {
                key = e.target.name;
                value = e.target.value;
            }

            return { ...prev, [key]: value };
        });
    };

    useEffect(() => {
        if (state.success) {
            // 등록이 완료되면 할일 목록으로 이동
            router.replace('/');
            router.refresh();
        }
    }, [state.success, router]);
    return (
        <div>
            {state.message && !state.success && (
                <div className="mb-6 flex items-center gap-2 rounded-2xl border border-red-200 bg-red-50 p-3.5 text-xs font-medium text-red-600">
                    <FiAlertCircle className="h-4 w-4 shrink-0" />
                    <span>{state.message}</span>
                </div>
            )}
            <form action={formAction} noValidate autoComplete="off">
                <input type="hidden" name="content" value={form.content} />
                <div className="flex mb-2 items-center">
                    <label className="basis-30">할일</label>
                    <div className="grow">
                        <Input
                            type="text"
                            name="title"
                            value={form.title}
                            onChange={onChange}
                            className="grow"
                            placeholder="할일을 입력하세요..."
                        />
                        {state.errors?.title && (
                            <div className="mb-4">
                                <FiAlertCircle />
                                {state.errors.title}
                            </div>
                        )}
                    </div>
                </div>

                <div className="flex">
                    <label className="basis-30">내용</label>
                    <div className="grow">
                        <TiptabEditor
                            content={form.content}
                            onChange={onChange}
                        />
                        {state.errors?.content && (
                            <div className="mb-4">
                                <FiAlertCircle />
                                {state.errors.content}
                            </div>
                        )}
                    </div>
                </div>

                <Button type="submit" disabled={isPending}>
                    등록하기
                </Button>
            </form>
        </div>
    );
}
