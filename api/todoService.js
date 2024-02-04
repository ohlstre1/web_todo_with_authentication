import { sql } from "./database.js";

const createTodo = async (userId, todo) => {
    await sql`INSERT INTO todos (todo, user_id) VALUES (${todo.todo}, ${userId})`;
};

const listTodos = async (userId) => {
    return await sql`SELECT * FROM todos WHERE user_id = ${userId}`;
  };


const getTodo = async (userId, id) => {
    const rows = await sql`SELECT * FROM todos 
        WHERE id = ${id} AND user_id = ${userId}`;
    return rows?.[0] ?? {};
};


const updateTodo = async (userId, id, todo) => {
    await sql`UPDATE todos SET todo = ${todo.todo} 
      WHERE id = ${id} AND user_id = ${userId}`;
};

const deleteTodo = async (userId, id) => {
    await sql`DELETE FROM todos 
      WHERE id = ${id} AND user_id = ${userId}`;
};

export { createTodo, listTodos, getTodo, updateTodo, deleteTodo };