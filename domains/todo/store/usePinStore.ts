'use client';

import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { immer } from 'zustand/middleware/immer';
import type { PinStore } from '../types/pin.types';
import type { Todo } from '../types/todo.types';

export const usePinStore = create<PinStore>()(
    persist(
        immer((set) => ({
            items: [],
            _hasHydrated: false,
            setHasHydrated: (state: boolean) => {
                set((s) => {
                    s._hasHydrated = state;
                });
            },
            // 할일 추가
            add: (item: Todo) => {
                set((state) => {
                    // 등록되어 있지 않다면 추가
                    const isExists = state.items.some(
                        (it) => it.id === item.id,
                    );
                    if (!isExists) {
                        state.items.push(item);
                    }
                });
            },
            remove: (id: string) => {
                set((state) => {
                    const index = state.items.findIndex(
                        (item) => item.id === id,
                    );
                    if (index !== -1) {
                        state.items.splice(index, 1);
                    }
                });
            },
        })),
        {
            name: 'todo-pin-storage',
            // items 필드만 로컬 스토리지에 저장, (_hasHydrated 등 불필요한 상태 제외)
            partialize: (state) => ({ items: state.items }),
            onRehydrateStorage: () => (state) => {
                state?.setHasHydrated(true);
            },
        },
    ),
);
