import React from "react";
import Shape from "./Shape";

function Canvas({ shapes, onCanvasClick, onShapeDoubleClick, selectedShape, onShapeMove }) {
    const handleClick = (e) => {
        const rect = e.currentTarget.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        onCanvasClick(x, y);
    };

    return (
        <div className="canvas" onClick={handleClick}>
            {shapes.map((shape) => (
                <Shape
                    key={shape.id}
                    {...shape}
                    selectedShape={selectedShape}
                    onDoubleClick={() => onShapeDoubleClick(shape.id)}
                    onShapeMove={onShapeMove}
                />
            ))}
            <span className="canvas-label">Canvas</span>
        </div>
    );
}

export default Canvas;
