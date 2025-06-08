import React, { useRef } from "react";

function Header({ title, setTitle, onExport, onImport }) {
    const fileInput = useRef();

    const handleFileChange = (e) => {
        const file = e.target.files[0];
        if (!file) return;
        const reader = new FileReader();
        reader.onload = (evt) => onImport(evt.target.result);
        reader.readAsText(file);
    };

    return (
        <header className="header">
            <input
                className="title-input"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
            />
            <div>
                <button className="btn" onClick={onExport}>Export</button>
                <button
                    className="btn"
                    onClick={() => fileInput.current.click()}
                >
                    Import
                </button>
                <input
                    type="file"
                    accept="application/json"
                    ref={fileInput}
                    style={{ display: "none" }}
                    onChange={handleFileChange}
                />
            </div>
        </header>
    );
}

export default Header;
