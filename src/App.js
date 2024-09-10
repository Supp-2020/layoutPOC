import React, { useState, useEffect } from "react";
import GridLayout from "react-grid-layout";
import "./App.css";
import "react-grid-layout/css/styles.css";
import "react-resizable/css/styles.css";

let initialLayout = {
  w: 4,
  h: 4,
  x: 0,
  y: 0,
  minW: 4,
  maxW: 8,
  minH: 4,
  maxH: 8,
};

const textData = [
  "submitted RFQ",
  "quoted RFQ",
  "renewal quotes",
  "available quotes",
  "all returns",
  "end customer subscription",
  "licenses",
  "product catalogue",
];

const HorizontalCompactLayout = () => {
  const [droppedItems, setDroppedItems] = useState([]);
  const [layout, setLayout] = useState([]);
  const [submitLayout, setSubmitLayout] = useState([]);
  const [compactType, setCompactType] = useState("vertical");
  const [draggedItem, setDraggedItem] = useState(null);

  useEffect(() => {
    const savedLayout = localStorage.getItem("saved");
    if (savedLayout) {
      const parsedLayout = JSON.parse(savedLayout);
      setDroppedItems(parsedLayout);
      setLayout(parsedLayout);
    }
  }, []);

  const handleLayoutChange = (newLayout) => {
    const updatedItems = newLayout.map((layoutItem, index) => {
      const currentItem = droppedItems[index];
      
      return {
        ...currentItem,
        ...layoutItem,
      };
    });

    setDroppedItems(updatedItems);
    setLayout(newLayout);
    localStorage.setItem("saved", JSON.stringify(updatedItems));
  };

  const handleReset = () => {
    localStorage.removeItem("saved");
    window.location.assign("/");
  };

  const handleSubmit = () => {
    setSubmitLayout(layout);
  };

  const handleDragStart = (item) => {
    setDraggedItem(item);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    if (!draggedItem) return;

    const boundingRect = e.target.getBoundingClientRect();
    const x = Math.floor((e.clientX - boundingRect.left) / 100); 
    const y = Math.floor((e.clientY - boundingRect.top) / 30); 

    const newItem = {
      ...initialLayout,
      x: x,
      y: y,
    };

    setLayout((prev) => [...prev, newItem]);
    setDroppedItems((prev) => [...prev, { ...newItem, text: draggedItem }]);
    setDraggedItem(null);
  };

  const handleDragOver = (e) => {
    e.preventDefault();
    setTimeout(() => {
      if(compactType === "horizontal"){
        setCompactType("vertical")
      } else {
        setCompactType("horizontal")
      }
    },800)
  };

  return (
    <div>
      <button
        style={{ marginLeft: "10px", marginTop: "10px" }}
        onClick={() => setCompactType("vertical")}
      >
        {"vertical"}
      </button>
      <button
        style={{ marginLeft: "10px", marginTop: "10px" }}
        onClick={() => setCompactType("horizontal")}
      >
        {"horizontal"}
      </button>
      <button
        style={{ marginLeft: "10px", marginTop: "10px" }}
        onClick={() => handleReset()}
      >
        {"reset"}
      </button>
      <h2 style={{ marginLeft: "10px" }}>{compactType} Compaction Example</h2>
      <div className="drag-container">
        {textData.map((item, idx) => (
          <div
            key={idx}
            draggable
            onDragStart={() => handleDragStart(item)}
            style={{
              backgroundColor: "lightgrey",
              border: "1px solid black",
              margin: "0 5px",
              padding: 10,
              cursor: "move",
            }}
          >
            {item}
          </div>
        ))}
      </div>
      <div
        className="drop-zone"
        onDrop={handleDrop}
        onDragOver={handleDragOver}
        style={{
          minHeight : 500,
          width: 1200,
          position: "relative",
          border: "1px solid red",
          margin: "auto",
        }}
      >
        <GridLayout
          className="layout"
          layout={layout}
          cols={12}
          rowHeight={30}
          width={1200}
          compactType={compactType}
          onLayoutChange={(newLayout) => handleLayoutChange(newLayout)}
          autoSize={true}
          resizeHandles={["s", "e", "n", "w"]}
        >
          {droppedItems.map((item, idx) => (
            <div key={idx} className="card" data-grid={item}>
              <div className="cart-title">{item.text}</div>
            </div>
          ))}
        </GridLayout>
      </div>
      <button style={{ marginLeft: "30px" }} onClick={() => handleSubmit()}>
        {"Submit"}
      </button>
      {submitLayout.length ? (
        <div>
          <h2 style={{ marginLeft: "10px" }}>Preview of Layout</h2>
          <GridLayout
            className="layout"
            layout={submitLayout}
            cols={12}
            rowHeight={30}
            width={1200}
            isDraggable={false}
            isResizable={false}
          >
            {submitLayout.map((item) => (
              <div key={item.i} className="card">
                <div className="cart-title">{item.text}</div>
              </div>
            ))}
          </GridLayout>
        </div>
      ) : null}
    </div>
  );
};

export default HorizontalCompactLayout;
