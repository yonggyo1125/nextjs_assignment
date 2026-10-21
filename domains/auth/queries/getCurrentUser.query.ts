import { createServerClient } from '@/shared/lib/supabase';
import { cache } from 'react';
import { UserProfile } from '../types/auth.types';

export interface CurrentUserSession {
    user: UserProfile | null;
}

export const getCurrentUser = cache(async (): Promise<CurrentUserSession> => {
    const supabase = createServerClient();

    const {
        data: { user: authUser },
        error: authError,
    } = await supabase.auth.getUser();

    if (authError || !authUser) {
        return { user: null };
    }

    const { data: profile } = await supabase
        .from('profiles')
        .select('*')
        .eq('id', authUser.id)
        .is('deleted_at', null)
        .single();

    if (!profile) {
        return { user: null };
    }

    return {
        user: {
            id: profile.id,
            name: profile.name,
            email: authUser.email,
            createdAt: profile.created_at,
            updatedAt: profile.updated_at,
            deletedAt: profile.deleted_at,
        },
    };
});
