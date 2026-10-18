'use client';

import { Button } from '@/shared/components/ui/button';
import { Input } from '@/shared/components/ui/input';
import { INITIAL_ACTION_STATE } from '@/shared/types/action.types';
import { useRouter, useSearchParams } from 'next/navigation';
import { ChangeEvent, useActionState, useEffect, useState } from 'react';
import { FiAlertCircle } from 'react-icons/fi';
import { signInAction } from '../actions/login.action';

interface FormType {
    email: string;
    password: string;
}

const initialForm: FormType = {
    email: '',
    password: '',
};

export default function SignInForm(): React.JSX.Element {
    const router = useRouter();
    const searchParams = useSearchParams();
    const redirectUrl = searchParams.get('redirectUrl') || '/';

    const [state, formAction, isPending] = useActionState(
        signInAction,
        INITIAL_ACTION_STATE,
    );

    const [form, setForm] = useState(initialForm);
    const onChange = (e: ChangeEvent<HTMLInputElement>) =>
        setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));

    useEffect(() => {
        if (state.success) {
            router.push(redirectUrl);
            router.refresh();
        }
    }, [state.success, redirectUrl, router]);

    return (
        <div>
            {state.message && !state.success && (
                <div className="mb-6 flex items-center gap-2 rounded-2xl border border-red-200 bg-red-50 p-3.5 text-xs font-medium text-red-600">
                    <FiAlertCircle className="h-4 w-4 shrink-0" />
                    <span>{state.message}</span>
                </div>
            )}

            <form action={formAction} noValidate autoComplete="off">
                <div className="mb-2">
                    <Input
                        type="email"
                        name="email"
                        placeholder="이메일"
                        value={form.email}
                        onChange={onChange}
                    />
                </div>
                {state.errors?.email && (
                    <div className="mb-4">
                        <FiAlertCircle />
                        {state.errors.email}
                    </div>
                )}
                <div className="mb-2">
                    <Input
                        type="password"
                        name="password"
                        placeholder="비밀번호"
                    />
                </div>
                {state.errors?.password && (
                    <div className="mb-4">
                        <FiAlertCircle />
                        {state.errors.password}
                    </div>
                )}
                <Button type="submit" disabled={isPending}>
                    로그인
                </Button>
            </form>
        </div>
    );
}
