import Parse from "parse";

const List = Parse.Object.extend("List");

function toPlainObject(parseObject) {
    const owner = parseObject.get("owner");

    return {
        id: parseObject.id,
        name: parseObject.get("name"),
        owner: owner ? owner.id : null,
    }
}

export async function createList(listName) {
    const list = new List();
    const user = Parse.User.current();

    list.set("name", listName);
    list.set("owner", user);
    list.setACL(new Parse.ACL(user));

    return await list.save();
}

export async function fetchLists() {
    const listQuery = new Parse.Query(List);
    listQuery.equalTo("owner", Parse.User.current());
    return await listQuery.find();
}