'use client';
import TodoItems from '@/domains/todo/components/TodoItems';
import { usePinStore } from '@/domains/todo/store/usePinStore';

export default function PinPage(): React.JSX.Element {
    const items = usePinStore((state) => state.items);

    return <TodoItems items={items} pinnedItem={true} />;
}
