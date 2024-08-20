import React, { useState } from "react";
import GridLayout from "react-grid-layout";
import "./App.css";
// import { Responsive, WidthProvider } from "react-grid-layout";
// const ResponsiveGridLayout = WidthProvider(Responsive);
import "react-grid-layout/css/styles.css";
import "react-resizable/css/styles.css";
let intiallayout = [
  { w: 4, h: 4, x: 0, y: 0, i: "a", moved: false, static: false },
  { w: 4, h: 4, x: 4, y: 0, i: "b", moved: false, static: false },
  { w: 4, h: 4, x: 8, y: 0, i: "c", moved: false, static: false },
  { w: 4, h: 4, x: 0, y: 4, i: "d", moved: false, static: false },
  { w: 4, h: 4, x: 4, y: 4, i: "e", moved: false, static: false },
  { w: 4, h: 4, x: 8, y: 4, i: "f", moved: false, static: false },
  { w: 4, h: 4, x: 0, y: 8, i: "g", moved: false, static: false },
  { w: 4, h: 4, x: 4, y: 8, i: "h", moved: false, static: false },
];

const HorizontalCompactLayout = () => {
  const ls = localStorage.getItem("saved");
  if (ls) {
    intiallayout = JSON.parse(ls);
  }
  const [layout, setLayout] = useState(intiallayout);
  const [submitLayout, setSubmitLayout] = useState([]);
  const [compactType, setCompactType] = useState("vertical");

  const handleLayoutChange = (newLayout) => {
    setLayout(newLayout); // Update the layout state with new positions
    localStorage.setItem("saved", JSON.stringify(newLayout));
    console.log("Updated Layout:", newLayout); // Log the updated layout
  };

  const handleReset = () => {
    localStorage.removeItem("saved");
    window.location.assign("/");
  };

  const handleSubmit = () => {
    setSubmitLayout(layout);
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
      <div>
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
          <div key="a" className="card">
            <div className="card-widget">Widget 1</div>
            <div className="cart-title">Request for Quotes</div>
          </div>
          <div key="b" className="card">
            <div className="card-widget">Widget 2</div>
            <div className="cart-title">All Carts</div>
          </div>
          <div key="c" className="card">
            <div className="card-widget">Widget 3</div>
            <div className="cart-title">Available Quotes</div>
          </div>
          <div key="d" className="card">
            <div className="card-widget">Widget 4</div>
            <div className="cart-title">Renewal Quotes</div>
          </div>
          <div key="e" className="card">
            <div className="card-widget">Widget 5</div>
            <div className="cart-title">All Orders</div>
          </div>
          <div key="f" className="card">
            <div className="card-widget">Widget 6</div>
            <div className="cart-title">Shipment and Deliveries</div>
          </div>
          <div key="g" className="card">
            <div className="card-widget">Widget 7</div>
            <div className="cart-title">Manage Subscriptions</div>
          </div>
          <div key="h" className="card">
            <div className="card-widget">Widget 8</div>
            <div className="cart-title">Catalogue</div>
          </div>
        </GridLayout>
      </div>
      <button style={{ marginLeft: "30px" }} onClick={() => handleSubmit()}>
        {"Submit"}
      </button>
      {submitLayout?.length ? (
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
            <div key="a" className="card">
              <div className="card-widget">Widget 1</div>
              <div className="cart-title">Request for Quotes</div>
            </div>
            <div key="b" className="card">
              <div className="card-widget">Widget 2</div>
              <div className="cart-title">All Carts</div>
            </div>
            <div key="c" className="card">
              <div className="card-widget">Widget 3</div>
              <div className="cart-title">Available Quotes</div>
            </div>
            <div key="d" className="card">
              <div className="card-widget">Widget 4</div>
              <div className="cart-title">Renewal Quotes</div>
            </div>
            <div key="e" className="card">
              <div className="card-widget">Widget 5</div>
              <div className="cart-title">All Orders</div>
            </div>
            <div key="f" className="card">
              <div className="card-widget">Widget 6</div>
              <div className="cart-title">Shipment and Deliveries</div>
            </div>
            <div key="g" className="card">
              <div className="card-widget">Widget 7</div>
              <div className="cart-title">Manage Subscriptions</div>
            </div>
            <div key="h" className="card">
              <div className="card-widget">Widget 8</div>
              <div className="cart-title">Catalogue</div>
            </div>
          </GridLayout>
        </div>
      ) : null}
    </div>
  );
};

export default HorizontalCompactLayout;
