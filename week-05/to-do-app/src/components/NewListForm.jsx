import { useState } from "react";

export default function NewListForm({ onAdd }) {
    const [listName, setListName] = useState("");

    function handleSubmit(event) {
        event.preventDefault();

        onAdd(listName);

        setListName("");
    }

    return (
        <form onSubmit={handleSubmit}>
            <input 
                value={listName}
                onChange={(event) => setListName(event.target.value)}
                placeholder="New list"
            />
            <button disabled={listName.trim().length === 0}>
               Add new list
            </button>
        </form>
    )
}