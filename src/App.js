import React, { useState } from "react";
import Header from "./components/Header";
import Sidebar from "./components/Sidebar";
import Canvas from "./components/Canvas";
import Footer from "./components/Footer";
import "./styles/styles.css";

const SHAPES = ["circle", "square", "triangle"];

function App() {
  const [title, setTitle] = useState("Untitled Painting");
  const [selectedShape, setSelectedShape] = useState(null);
  const [shapes, setShapes] = useState([]);

  const handleCanvasClick = (x, y) => {
    if (selectedShape) {
      setShapes([...shapes, { type: selectedShape, x, y, id: Date.now() }]);
    }
  };

  const handleShapeDoubleClick = (id) => {
    setShapes(shapes.filter((shape) => shape.id !== id));
  };

  const handleShapeMove = (id, newX, newY) => {
    setShapes((prevShapes) =>
        prevShapes.map((shape) =>
            shape.id === id ? { ...shape, x: newX, y: newY } : shape
        )
    );
  };

  const handleExport = () => {
    const data = JSON.stringify({ title, shapes }, null, 2);
    const blob = new Blob([data], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `${title}.json`;
    a.click();
  };

  const handleImport = (json) => {
    try {
      const data = JSON.parse(json);
      setTitle(data.title || "Untitled Painting");
      setShapes(data.shapes || []);
    } catch (e) {
      alert("Invalid JSON!");
    }
  };

  const shapeCounts = SHAPES.reduce((acc, type) => {
    acc[type] = shapes.filter((s) => s.type === type).length;
    return acc;
  }, {});

  return (
      <div className="app-container">
        <Header
            title={title}
            setTitle={setTitle}
            onExport={handleExport}
            onImport={handleImport}
        />
        <div className="main-content">
          <Sidebar
              selectedShape={selectedShape}
              setSelectedShape={setSelectedShape}
          />
          <Canvas
              shapes={shapes}
              onCanvasClick={handleCanvasClick}
              onShapeDoubleClick={handleShapeDoubleClick}
              selectedShape={selectedShape}
              onShapeMove={handleShapeMove}
          />
        </div>
        <Footer shapeCounts={shapeCounts} />
      </div>
  );
}

export default App;
