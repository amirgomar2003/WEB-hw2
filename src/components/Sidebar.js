import React from "react";

const SHAPES = [
    { type: "circle", label: "دایره" },
    { type: "square", label: "مربع" },
    { type: "triangle", label: "مثلث" },
];

function Sidebar({ selectedShape, setSelectedShape }) {
    return (
        <aside className="sidebar">
            <h3>Tools</h3>
            <div className="tools">
                {SHAPES.map((shape) => (
                    <button
                        key={shape.type}
                        className={`tool-btn ${selectedShape === shape.type ? "selected" : ""}`}
                        onClick={() => {selectedShape === shape.type ? setSelectedShape(null) : setSelectedShape(shape.type)}}
                        title={shape.label}
                    >
                        {shape.type === "circle" && <div className="shape-icon circle"></div>}
                        {shape.type === "square" && <div className="shape-icon square"></div>}
                        {shape.type === "triangle" && <div className="shape-icon triangle"></div>}
                    </button>
                ))}
            </div>
        </aside>
    );
}

export default Sidebar;
