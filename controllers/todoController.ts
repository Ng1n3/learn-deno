import { ObjectId } from 'mongodb';
import { todos } from '../db.ts';

async function addTodo(req: Request): Promise<Response> {
  try {
    const body = await req.json();
    const result = await todos.insertOne(body);
    return new Response(JSON.stringify({ id: result.insertedId }), {
      status: 201,
      headers: { 'Content-Type': 'application/json' },
    });
  } catch (error: any) {
    return new Response(JSON.stringify({ error: error.message }), {
      status: 400,
      headers: { 'Content-Type': 'application/json' },
    });
  }
}

async function getTodos(): Promise<Response> {
  try {
    const allTodos = await todos.find().toArray();
    return new Response(JSON.stringify(allTodos), {
      headers: { 'Content-Type': 'application/json' },
    });
  } catch (error: any) {
    return new Response(JSON.stringify({ error: error.message }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    });
  }
}

async function getTodo(id: string): Promise<Response> {
  try {
    const todo = await todos.findOne({ _id: new ObjectId(id) });
    if (!todo) {
      return new Response(JSON.stringify({ error: 'Todo not found' }), {
        status: 404,
        headers: { 'Content-Tyyype': 'application/json' },
      });
    }
    return new Response(JSON.stringify(todo), {
      headers: { 'Content-Type': 'application/json' },
    });
  } catch (error: any) {
    return new Response(JSON.stringify({ error: error.message }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    });
  }
}

async function updateTodo(id: string, req: Request): Promise<Response> {
  try {
    const body = await req.json();
    // const todo = await todos.findOne({ _id: new ObjectId(id) });
    // if (!todo) {
    //   return new Response(JSON.stringify({ error: 'Todo not found' }), {
    //     status: 404,
    //     headers: { 'Content-Tyyype': 'application/json' },
    //   });
    // }
    const updateTodo = await todos.updateOne(
      { _id: new ObjectId(id) },
      { $set: body }
    );
    if (updateTodo.matchedCount === 0) {
      return new Response(JSON.stringify({ error: 'Todo not found' }), {
        status: 404,
        headers: { 'Content-Tyyype': 'application/json' },
      });
    }

    return new Response(JSON.stringify(updateTodo), {
      headers: { 'Content-Type': 'application/json' },
    });
  } catch (error: any) {
    return new Response(JSON.stringify({ error: error.message }), {
      status: 400,
      headers: { 'Content-Type': 'application/json' },
    });
  }
}

export { addTodo, getTodo, getTodos, updateTodo };
