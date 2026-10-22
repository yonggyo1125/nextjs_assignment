'use client';
import { usePinStore } from '@/domains/todo/stores/usePinStore';

export default function TodoPinPage() {
    const _hasHydrated = usePinStore((state) => state._hasHydrated);
    const items = usePinStore((state) => state.items);

    return (
        _hasHydrated && (
            <ul>
                {items.length > 0 &&
                    items.map(({ id, title }, i) => (
                        <li key={id}>
                            {i + 1}.{title}
                        </li>
                    ))}
            </ul>
        )
    );
}
