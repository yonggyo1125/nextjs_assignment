import { getTodoById } from '@/domains/todo/queries/getTodoById.query';
import type { Metadata } from 'next';

export async function generateMetadata({
    params,
}: {
    params: Promise<{ id: string }>;
}): Promise<Metadata> {
    const { id } = await params;
    const todo = await getTodoById(id);

    return {
        title: todo?.title ?? 'TODO APP',
        description: todo?.content ?? '',
    };
}

export default function TodoViewPage(): React.JSX.Element {
    return <></>;
}
