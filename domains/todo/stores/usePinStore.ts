'use client';

import { create } from "zustand";
import { persist } from 'zustand/middleware';
import { immer } from 'zustand/middleware/immer';
import type { PinStore } from "../types/pin.types";
import type { Todo } from "../types/todo.types";

export const usePinStore = create<PinStore>()(persist(immer((set, get) => ({
    items: [],
    _hasHydrated: false,
    setHasHydrated: (state: boolean) => {
        set((_state) => _state._hasHydrated = state);
    },
    add: (item: Todo) => {
        
        set((state: PinStore) => {
            // 등록 여부 확인
            const exists = state.items.some(it => it.id === item.id);
            if (!exists) {
                state.items.push(item);
            }
        });
    },
    remove: (id: string) => {
        set((state: PinStore) => {
            const index = state.items.findIndex((item) => item.id === id);
        
            if (index !== -1) { // -1은 못찾은 경우, 찾은 경우면 제거
                state.items.splice(index, 1);
            }
        });
    }
  })),
  {
    name: "todo-pin-storage",
    partialize: (state) => ({items: state.items}),
    onRehydrateStorage: () => (state) => {
        state?.setHasHydrated(true); // 하이드레이션 완료
    }
  }
));