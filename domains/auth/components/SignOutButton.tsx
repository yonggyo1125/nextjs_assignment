'use client';

import { logoutAction } from '@/domains/auth/actions/logout.action';
import { Button } from '@/shared/components/ui/button';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { FiLogOut } from 'react-icons/fi';

export default function SignOutButton() {
    const router = useRouter();
    const [isSigningOut, setIsSigningOut] = useState(false);

    const onLogout = async () => {
        setIsSigningOut(true);
        const result = await logoutAction();
        if (result.success) {
            router.push('/');
            router.refresh();
        } else {
            alert(result.message || '로그아웃에 실패했습니다.');
            setIsSigningOut(false);
        }
    };

    return (
        <Button
            type="button"
            variant="outline"
            size="sm"
            disabled={isSigningOut}
            onClick={onLogout}
        >
            <FiLogOut className="h-3.5 w-3.5" />
            <span className="hidden sm:inline">
                {isSigningOut ? '로그아웃 중...' : '로그아웃'}
            </span>
        </Button>
    );
}
