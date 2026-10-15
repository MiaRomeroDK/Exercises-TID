import Parse from "parse";

const List = Parse.Object.extend("List");

const ListMember = Parse.Object.extend("ListMember");
const TodoItem = Parse.Object.extend("TodoItem");

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
  const ownedQuery = new Parse.Query(List);
  ownedQuery.equalTo("owner", Parse.User.current());

  const memberQuery = new Parse.Query(ListMember);
  memberQuery.equalTo("user", Parse.User.current());
  memberQuery.include("list");

  const ownedLists = await ownedQuery.find();
  const memberships = await memberQuery.find();

  const sharedLists = memberships.map((membership) =>
    membership.get("list")
  );

  return [...ownedLists, ...sharedLists];
}

export async function shareList(list, friend) {
    const member = new ListMember();

    member.set("list", list);
    member.set("user", friend);

    const memberACL = new Parse.ACL(Parse.User.current());
    memberACL.setReadAccess(friend, true);
    memberACL.setWriteAccess(friend, true);
    member.setACL(memberACL);

    const acl = list.getACL();
    acl.setReadAccess(friend, true);
    list.setACL(acl);

    const todos = await new Parse.Query(TodoItem)
        .equalTo("list", list)
        .find();

    todos.forEach((todo) => todo.setACL(acl));

    await Parse.Object.saveAll([member, list, ...todos]);
}