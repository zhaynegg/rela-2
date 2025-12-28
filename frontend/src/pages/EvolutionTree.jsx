import { useState, useEffect } from "react";
import api from "../api";
import Note from "../components/Note"
import "../styles/EvolutionTree.css"

function EvolutionTree() {
    const [notes, setNotes] = useState([]);
    const [content, setContent] = useState("");
    const [title, setTitle] = useState("");
    const [created_at, setDate] = useState("");
    const [me, setMe] = useState(null);

    useEffect(() => {
        getNotes();
        getMe();
    }, []);

    const getMe = () => {
        api
            .get("/api/me/")
            .then((res) => res.data)
            .then((data) => {
                setMe(data.username);
                console.log(data);
            })
            .catch((err) => alert(err));
    }
    const getNotes = () => {
        api
            .get("/api/notes/")
            .then((res) => res.data)
            .then((data) => {
                setNotes(data);
                console.log(data);
            })
            .catch((err) => alert(err));
    };

    const deleteNote = (id) => {
        api
            .delete(`/api/notes/delete/${id}/`)
            .then((res) => {
                if (res.status === 204) alert("Note deleted!");
                else alert("Failed to delete note.");
                getNotes();
            })
            .catch((error) => alert(error));
    };

    const createNote = (e) => {
        e.preventDefault();
        api
            .post("/api/notes/", { content, title, created_at})
            .then((res) => {
                if (res.status === 201) alert("Note created!");
                else alert("Failed to make note.");
                getNotes();
            })
            .catch((err) => alert(err));
    };
    return (
        <div>
            <nav class="navbar">
            <div class="logo">MySite</div>
            <ul class="nav-links">
                <li><a href="/">Home</a></li>
                <li><a href="/evolution-tree">Evolution tree</a></li>
                <li><a href="/interactive-games">Interactive games</a></li>
                <li><a href="/users">Connection</a></li>
                <li><a href="/logout">Logout</a></li>
            </ul>
            </nav>
            <center><h2>Create a memory</h2></center>
            <form onSubmit={createNote}>
                <label htmlFor="title">Title:</label>
                <br />
                <input
                    type="text"
                    id="title"
                    name="title"
                    required
                    onChange={(e) => setTitle(e.target.value)}
                    value={title}
                />
                <label htmlFor="content">Content:</label>
                <br />
                <textarea
                    id="content"
                    name="content"
                    required
                    value={content}
                    onChange={(e) => setContent(e.target.value)}
                ></textarea>
                <input
                    type="date"
                    id="created_at"
                    name="created_at"
                    value={created_at}
                    onChange={(e) => setDate(e.target.value)}
                    required
                />
                <br />
                <input
                    type="submit"
                    value="Submit"
                ></input>
            </form>

            <div class="notes-container">
                <center><h2>Tree of events</h2></center>
                {notes.map((note) => (
                    <Note note={note} onDelete={deleteNote} key={note.id} currentUser = {me}/>
                ))}
            </div>
        </div>
    );
}

export default EvolutionTree;