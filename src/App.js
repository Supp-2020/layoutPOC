import React, { useState } from "react";
import GridLayout from "react-grid-layout";
import "react-grid-layout/css/styles.css";
import "react-resizable/css/styles.css";
let intiallayout = [
  {w: 4, h: 4, x: 0, y: 0, i: "a", moved: false, static: false},
  {w: 4, h: 4, x: 4, y: 0, i: "b", moved: false, static: false},
  {w: 4, h: 4, x: 8, y: 0, i: "c", moved: false, static: false},
  {w: 4, h: 4, x: 0, y: 4, i: "d", moved: false, static: false},
  {w: 4, h: 4, x: 4, y: 4, i: "e", moved: false, static: false},
  {w: 4, h: 4, x: 8, y: 4, i: "f", moved: false, static: false},
  {w: 4, h: 4, x: 0, y: 8, i: "g", moved: false, static: false},
  {w: 4, h: 4, x: 4, y: 8, i: "h", moved: false, static: false},
];

const HorizontalCompactLayout = () => {
  const ls = localStorage.getItem("saved");
  if (ls) {
    intiallayout = JSON.parse(ls);
  }
  const [layout, setLayout] = useState(intiallayout);
  const [compactType, setCompactType] = useState("vertical");

  const handleLayoutChange = (newLayout) => {
    setLayout(newLayout);  // Update the layout state with new positions
    localStorage.setItem("saved", JSON.stringify(newLayout));
    console.log("Updated Layout:", newLayout);  // Log the updated layout
  };

  return (
    <div>
      <button onClick={() => setCompactType("vertical")}>{"vertical"}</button>
      <button onClick={() => setCompactType("horizontal")}>{"horizontal"}</button>
      <h2>{compactType} Compaction Example</h2>
      <GridLayout
        className="layout"
        layout={layout}
        cols={12}
        rowHeight={30}
        width={1200}
        compactType="vertical"
        onLayoutChange={(newLayout) => handleLayoutChange(newLayout)}
        autoSize={true}
        resizeHandles={['s','e','n',"w"]}
      >
        <div key="a" style={{ border: "1px solid black" }}>Item A</div>
        <div key="b" style={{ border: "1px solid black" }}>Item B</div>
        <div key="c" style={{ border: "1px solid black" }}>Item C</div>
        <div key="d" style={{ border: "1px solid black" }}>Item D</div>
        <div key="e" style={{ border: "1px solid black" }}>Item E</div>
        <div key="f" style={{ border: "1px solid black" }}>Item f</div>
        <div key="g" style={{ border: "1px solid black" }}>Item g</div>
        <div key="h" style={{ border: "1px solid black" }}>Item h</div>
      </GridLayout>
    </div>
  );
};

export default HorizontalCompactLayout;
