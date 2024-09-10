import React, { useState } from "react";
import GridLayout from "react-grid-layout";
import "./App.css";
import "react-grid-layout/css/styles.css";
import "react-resizable/css/styles.css";
import { DndProvider, useDrag, useDrop } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";

const HorizontalCompactLayout = () => {
  const defaultLayout = {
    w: 4,
    h: 4,
    x: 0,
    y: 0,
    i: "",
    moved: false,
    static: false,
    minW: 4,
    maxW: 8,
    minH: 4,
    maxH: 12,
  };

  const textData = [
    "submitted RFQ",
    "quoted RFQ",
    "renewal quotes",
    "available quotes",
    "all returns",
    "end customer subscription",
    "licenses",
    "product catalogue"
  ];

  const [layout, setLayout] = useState([]);
  const [compactType, setCompactType] = useState("horizontal");
  const [droppedItems, setDroppedItems] = useState([]);

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
    localStorage.setItem("saved", JSON.stringify(newLayout));
  };

  const handleItemDrop = (text, monitor) => {

    const newItem = {
      ...defaultLayout,
      i: `item_${Date.now()}`,
    };

    setDroppedItems((prev) => [...prev, { text, ...newItem }]);
  };

  return (
    <div>
      <h2 style={{ marginLeft: "10px" }}>React DND</h2>
      <DndProvider backend={HTML5Backend}>
        <div className="drag-container">
          {textData?.map((item, idx) => (
            <React.Fragment key={idx}>
              <DraggableItem text={item} keyVal={idx} />
            </React.Fragment>
          ))}
        </div>
        <div style={{ margin: '10px' }}>
          <DroppableArea onDrop={handleItemDrop}>
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
              style={{
                border: "1px solid red",
                minHeight : 500,

              }}
            >
              {droppedItems?.map((item) => (
                <div
                  key={item.i}
                  data-grid={item} 
                  style={{
                    border: "1px solid black",
                    textAlign : 'center',
                  }}
                >
                  {item.text} 
                </div>
              ))}
            </GridLayout>
          </DroppableArea>
        </div>
      </DndProvider>
    </div>
  );
};

export default HorizontalCompactLayout;

const DraggableItem = ({ text, keyVal }) => {
  const [{ isDragging }, drag] = useDrag(() => ({
    type: "text",
    item: { text },
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
  }));
  return (
    <div
      ref={drag}
      key={keyVal}
      style={{
        backgroundColor: isDragging ? "lightgreen" : "lightgrey",
        border: "1px solid black",
        margin: "0 5px",
        padding: 10,
      }}
    >
      {text}
    </div>
  );
};

const DroppableArea = ({ children, onDrop }) => {
  const [{ isOver }, drop] = useDrop(() => ({
    accept: "text",
    drop: (item) => onDrop(item.text),
    collect: (monitor) => ({
      isOver: monitor.isOver(),
    }),
  }));

  return (
    <div
      ref={drop}
      style={{
        backgroundColor: isOver ? "lightblue" : "white",
        minHeight: "100px",
        margin: "10px",
      }}
    >
      {children}
    </div>
  );
};
