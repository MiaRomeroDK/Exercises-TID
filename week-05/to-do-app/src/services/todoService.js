import Parse from "parse";

// This creates a Parse object class/table called TodoItem 
// and allows us to work with this table.
const TodoItem = Parse.Object.extend("TodoItem"); 

// To convert at Parse object into a normal javascript object:
function toPlainObject(parseObject) {
    const owner = parseObject.get("owner");
    const list = parseObject.get("list");

    return{
        id: parseObject.id,
        text: parseObject.get("text"),
        done: parseObject.get("done"),
        owner: owner ? owner.id : null,
        list: list ? list.id : null,
    };
}


export async function fetchTodos() {
    const query = new Parse.Query(TodoItem);
    query.ascending("createdAt");
    const results = await query.find();
    return results.map(toPlainObject);
}

export async function fetchTodosForList(list) {
    const query = new Parse.Query(TodoItem);
    query.equalTo("list", list);
    const todos = await query.find();

    return todos.map(toPlainObject);
}

export async function createTodo(text, list) {
    const item = new TodoItem();

    item.set("text", text);
    item.set("done", false);
    item.set("owner", Parse.User.current());
    item.set("list", list);
    item.setACL(list.getACL());

    return toPlainObject(await item.save());
}

export async function setTodoDone(id, done) {
    const item = TodoItem.createWithoutData(id); //creates a reference to an existing todo using only its ID
    item.set("done", done);
    return toPlainObject(await item.save());
}

export async function deleteTodo(id) {
    const item = TodoItem.createWithoutData(id);
    await item.destroy();
}
