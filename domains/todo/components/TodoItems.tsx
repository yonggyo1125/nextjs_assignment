'use client';

import { Button } from '@/shared/components/ui/button';
import Link from 'next/link';
import type { Todo, TodoStatus } from '../types/todo.types';

export const TODO_STATUS_MAP: Record<TodoStatus, string> = {
    READY: '준비중',
    PROGRESS: '진행중',
    DONE: '완료',
} as const;

interface TodoItemsProps {
    status: TodoStatus;
    items?: Todo[];
    onClick: (id: string, status: TodoStatus) => void;
}

type TodoItemProps = Todo & {
    onClick: (id: string, status: TodoStatus) => void;
};

export default function TodoItems({
    status,
    items = [],
    onClick,
}: TodoItemsProps) {
    const filteredItems = items.filter((item) => item.status === status);

    if (filteredItems.length === 0) {
        return null;
    }

    return (
        <div>
            {filteredItems.map((item) => (
                <TodoItem key={item.id} {...item} onClick={onClick} />
            ))}
        </div>
    );
}

function TodoItem({ id, status, title, onClick }: TodoItemProps) {
    const statusEntries = Object.entries(TODO_STATUS_MAP) as [
        TodoStatus,
        string,
    ][];

    return (
        <div className="border rounded-2xl p-4 mb-2">
            <div className="font-medium mb-3">
                <span className="mr-1">[{TODO_STATUS_MAP[status]}]</span>
                <Link href={`/todo/${id}/view`}>{title}</Link>
            </div>

            <div className="flex gap-2">
                {statusEntries.map(([s, label]) => {
                    const isCurrentStatus = s === status;
                    return (
                        <Button
                            key={`${id}_${s}`}
                            size="sm"
                            variant={isCurrentStatus ? 'default' : 'outline'}
                            disabled={isCurrentStatus}
                            onClick={() => onClick(id, s)}
                        >
                            {label}
                        </Button>
                    );
                })}
            </div>
        </div>
    );
}
