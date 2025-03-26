import type { Key, ReactElement, JSXElementConstructor, ReactNode, ReactPortal } from "react";
import { trpc } from "../utils/Trpc"; // ✅ Ensure correct import

export default function Home() {
  const { data: tasks } = trpc.task.getAll.useQuery(); // ✅ Ensure `task.getAll` exists in your backend

  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold">Task Management</h1>
      {tasks?.map((task: { id: Key | null | undefined; title: string | number | bigint | boolean | ReactElement<unknown, string | JSXElementConstructor<any>> | Iterable<ReactNode> | ReactPortal | Promise<string | number | bigint | boolean | ReactPortal | ReactElement<unknown, string | JSXElementConstructor<any>> | Iterable<ReactNode> | null | undefined> | null | undefined; description: string | number | bigint | boolean | ReactElement<unknown, string | JSXElementConstructor<any>> | Iterable<ReactNode> | ReactPortal | Promise<string | number | bigint | boolean | ReactPortal | ReactElement<unknown, string | JSXElementConstructor<any>> | Iterable<ReactNode> | null | undefined> | null | undefined; priority: string | number | bigint | boolean | ReactElement<unknown, string | JSXElementConstructor<any>> | Iterable<ReactNode> | ReactPortal | Promise<string | number | bigint | boolean | ReactPortal | ReactElement<unknown, string | JSXElementConstructor<any>> | Iterable<ReactNode> | null | undefined> | null | undefined; }) => (
        <div key={task.id} className="p-4 border rounded-md my-2">
          <h2 className="text-lg font-semibold">{task.title}</h2>
          <p>{task.description}</p>
          <p className="text-sm text-gray-500">Priority: {task.priority}</p>
        </div>
      ))}
    </div>
  );
}
