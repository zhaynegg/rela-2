import React from "react";
import "../styles/Note.css";

function Note({ note, onDelete, currentUser }) {
    const formattedDate = new Date(note.created_at).toLocaleDateString("en-US");
    const isMine = currentUser === note.author.username;

    return (
        <div className={`note-wrapper ${isMine ? "mine" : "theirs"}`}>
            <div className="note-container">
                <p className="note-author">{note.author.username}</p>
                <p className="note-title">{note.title}</p>
                <p className="note-content">{note.content}</p>
                <p className="note-date">{formattedDate}</p>
                {isMine && (
                    <button className="delete-button" onClick={() => onDelete(note.id)}>
                        Delete
                    </button>
                )}
            </div>
        </div>
    );
}

export default Note;
