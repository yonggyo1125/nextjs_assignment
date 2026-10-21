import TodoDetails from '@/domains/todo/components/TodoDetails';
import { getTodoById } from '@/domains/todo/queries/getTodoById.query';
import { notFound } from 'next/navigation';
interface ParamsProps {
    id: string;
}


export default async function TodoViewPage({params}: { params: Promise<ParamsProps> } ): Promise<React.JSX.Element> {
    const { id } = await params;
    const todo = await getTodoById(id);
    if (!todo) {
        notFound();
    }

    return <TodoDetails todo={todo} />;
}
