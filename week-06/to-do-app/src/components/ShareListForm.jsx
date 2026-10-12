import { useState } from "react";

export default function ShareListForm({ onShare, error}) {
    const [name, setName] = useState("");

    async function handleSubmit(event) {
        event.preventDefault();

        await onShare(name);
        setName("");
    }

    return (
        <form onSubmit={handleSubmit}>
            <input
                value={name}
                onChange={(event) => setName(event.target.value)}
                placeholder="Username"
            />
            <button disabled={name.trim().length === 0}>
                Share this list
            </button>
            {error && <p>{error}</p>}
        </form>
    )
}