'use client';

import { Button } from '@/shared/components/ui/button';
import Link from 'next/link';
import { FaHeart, FaRegHeart } from 'react-icons/fa';
import { usePinStore } from '../store/usePinStore';
import type { Todo, TodoStatus } from '../types/todo.types';

export const TODO_STATUS_MAP: Record<TodoStatus, string> = {
    READY: '준비중',
    PROGRESS: '진행중',
    DONE: '완료',
} as const;

const STATUS_ENTRIES = Object.entries(TODO_STATUS_MAP) as [
    TodoStatus,
    string,
][];

interface TodoItemsProps {
    status?: TodoStatus;
    items?: Todo[];
    pinnedItem?: boolean;
    onClick?: (id: string, status: TodoStatus) => void;
}

type TodoItemProps = {
    item: Todo;
    onClick?: (id: string, status: TodoStatus) => void;
    pinnedItem?: boolean;
};

export default function TodoItems({
    status,
    items = [],
    pinnedItem = false,
    onClick,
}: TodoItemsProps) {
    const filteredItems = status
        ? items.filter((item) => item.status === status)
        : items;

    if (filteredItems.length === 0) {
        return null;
    }

    return (
        <div>
            {filteredItems.map((item) => (
                <TodoItem
                    key={item.id}
                    item={item}
                    onClick={onClick}
                    pinnedItem={pinnedItem}
                />
            ))}
        </div>
    );
}

export function TodoItem({ item, pinnedItem = false, onClick }: TodoItemProps) {
    const { id, status, title } = item;

    const isHydrated = usePinStore((state) => state._hasHydrated);
    const isPinned = usePinStore((state) =>
        state.items.some((pinned) => pinned.id === id),
    );
    const addPinItem = usePinStore((state) => state.add);
    const removePinItem = usePinStore((state) => state.remove);

    return (
        <div className="border rounded-2xl p-4 mb-2">
            <div className="font-medium mb-3 flex items-center justify-between gap-2">
                <div className="flex items-center gap-1.5 overflow-hidden">
                    <span className="text-gray-500 shrink-0">
                        [{TODO_STATUS_MAP[status]}]
                    </span>
                    <Link
                        href={`/todo/${id}/view`}
                        className="hover:underline truncate"
                    >
                        {title}
                    </Link>
                </div>

                {isHydrated ? (
                    <button
                        type="button"
                        aria-label={isPinned ? '고정 해제' : '고정하기'}
                        className="text-red-500 hover:scale-110 transition-transform p-1 shrink-0"
                        onClick={() =>
                            isPinned ? removePinItem(id) : addPinItem(item)
                        }
                    >
                        {isPinned ? (
                            <FaHeart />
                        ) : (
                            <FaRegHeart className="text-gray-400" />
                        )}
                    </button>
                ) : (
                    <div className="w-5 h-5 bg-gray-200 rounded-full animate-pulse shrink-0" />
                )}
            </div>

            {pinnedItem ? (
                <div className="text-sm text-gray-500">
                    상태: {TODO_STATUS_MAP[status]}
                </div>
            ) : (
                <div className="flex gap-2">
                    {STATUS_ENTRIES.map(([s, label]) => {
                        const isCurrentStatus = s === status;
                        return (
                            <Button
                                key={`${id}_${s}`}
                                size="sm"
                                variant={
                                    isCurrentStatus ? 'default' : 'outline'
                                }
                                disabled={isCurrentStatus}
                                onClick={() => onClick?.(id, s)}
                            >
                                {label}
                            </Button>
                        );
                    })}
                </div>
            )}
        </div>
    );
}
