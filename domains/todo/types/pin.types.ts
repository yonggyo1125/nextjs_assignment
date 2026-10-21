import { Todo } from './todo.types';

export interface PinState {
    items: Todo[];
    _hasHydrated: boolean; // 클라이언트 하이드레이션 완료 여부 상태
}

export interface PinActions {
    setHasHydrated: (state: boolean) => void; // 하이드레이션 상태 업데이트 액션
    add: (item: Todo) => void;
    remove: (id: string) => void;
}

export type PinStore = PinState & PinActions;
