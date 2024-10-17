import TodoItem from "./TodoItem";
import todos from "./todos.json";
const TodoList = () => {
 return(
   <>
     <h3>Todo List</h3>
     <ul className="list-group">
       { todos.map(todo => {
           return(<TodoItem todo={todo}/>);
         })}
     </ul><hr/>
   </>
 );
}
export default TodoList;

// 该组件导入 TodoItem 和 todos.json。
// 使用 map() 遍历 todos.json 中的每个 todo，为每个任务生成一个 TodoItem 组件，并将每个任务作为 props 传递给 TodoItem。
// 使用 key={todo.title} 为每个 TodoItem 提供唯一的 key，以确保 React 高效地更新列表。
// 最终生成的是一个 <ul> 列表，其中的每一项是通过 TodoItem 动态渲染的任务。
