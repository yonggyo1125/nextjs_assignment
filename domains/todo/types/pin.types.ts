import type { Todo } from "./todo.types";

export interface PinState {
    items: Todo[];
}

export interface PinActions {
    add: (item: Todo) => void;
    remove: (id: string) => void;
}

export type PinStore = PinState & PinActions;