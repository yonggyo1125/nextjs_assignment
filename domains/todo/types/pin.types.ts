import type { Todo } from "./todo.types";

export interface PinState {
    items: Todo[];
    _hasHydrated: boolean;
}

export interface PinActions {
    setHasHydrated: (state: boolean) => void;
    add: (item: Todo) => void;
    remove: (id: string) => void;
}

export type PinStore = PinState & PinActions;