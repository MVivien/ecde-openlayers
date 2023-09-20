import { useRef, useEffect } from "react";
import Plotly from "plotly.js-basic-dist-min";

export default function SubApp() {
  const graph = useRef(null);
  useEffect(() => {
    if (graph.current) return; // initialize graph only once
    Plotly.newPlot("graph", {
      data: [{ y: [1, 2, 3] }],
      layout: { height: 400 },
    });
  }, []);

  return <div id="graph" style={{ width: "100%" }} />;
}
