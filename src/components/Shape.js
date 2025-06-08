import React, { useEffect, useState } from "react";

const SIZE = 48;

function Shape({ type, x, y, onDoubleClick, selectedShape, id, onShapeMove }) {
    const [dragging, setDragging] = useState(false);
    const [offset, setOffset] = useState({ x: 0, y: 0 });

    // Track and update dragging position
    useEffect(() => {
        const handleMouseMove = (e) => {
            if (!dragging) return;

            const canvas = document.querySelector(".canvas");
            if (!canvas) return;

            const rect = canvas.getBoundingClientRect();
            const newX = e.clientX - rect.left - offset.x + SIZE / 2;
            const newY = e.clientY - rect.top - offset.y + SIZE / 2;
            onShapeMove(id, newX, newY);
        };

        const handleMouseUp = () => {
            if (dragging) setDragging(false);
        };

        if (dragging) {
            window.addEventListener("mousemove", handleMouseMove);
            window.addEventListener("mouseup", handleMouseUp);
        }

        return () => {
            window.removeEventListener("mousemove", handleMouseMove);
            window.removeEventListener("mouseup", handleMouseUp);
        };
    }, [dragging, offset, id, onShapeMove]);

    const handleMouseDown = (e) => {
        if (selectedShape !== null) return;
        e.stopPropagation();

        const rect = e.currentTarget.getBoundingClientRect();
        setOffset({
            x: e.clientX - rect.left,
            y: e.clientY - rect.top,
        });

        setDragging(true);
    };

    const svgProps = {
        onMouseDown: handleMouseDown,
        onDoubleClick,
        style: {
            position: "absolute",
            left: x - SIZE / 2,
            top: y - SIZE / 2,
            cursor: selectedShape === null ? "move" : "pointer",
            width: SIZE,
            height: SIZE,
            overflow: "visible",
        },
    };

    switch (type) {
        case "circle":
            return (
                <svg {...svgProps} viewBox="0 0 48 48">
                    <circle
                        cx="24"
                        cy="24"
                        r="22"
                        fill="transparent"
                        stroke="black"
                        strokeWidth="2"
                    />
                </svg>
            );

        case "square":
            return (
                <svg {...svgProps} viewBox="0 0 48 48">
                    <rect
                        x="2"
                        y="2"
                        width="44"
                        height="44"
                        fill="transparent"
                        stroke="black"
                        strokeWidth="2"
                    />
                </svg>
            );

        case "triangle":
            return (
                <svg {...svgProps} viewBox="0 0 48 48">
                    <polygon
                        points="24,0 48,48 0,48"
                        fill="transparent"
                        stroke="black"
                        strokeWidth="2"
                    />
                </svg>
            );

        default:
            return null;
    }
}

export default Shape;
