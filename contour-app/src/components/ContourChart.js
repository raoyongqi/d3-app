// src/components/ContourChart.js
import React, { useEffect, useRef } from 'react';
import * as d3 from 'd3';

const ContourChart = ({ data }) => {
  const ref = useRef();

  useEffect(() => {
    const n = data.width;
    const m = data.height;
    const width = 928;
    const height = Math.round(m / n * width);
    const path = d3.geoPath().projection(d3.geoIdentity().scale(width / n));
    const contours = d3.contours().size([n, m]);
    const color = d3.scaleSequential(d3.interpolateTurbo).domain(d3.extent(data.values)).nice();

    const svg = d3.select(ref.current)
      .attr("width", width)
      .attr("height", height)
      .attr("viewBox", `0 0 ${width} ${height}`)
      .attr("style", "max-width: 100%; height: auto;");

    svg.selectAll("*").remove(); // Clear previous content

    svg.append("g")
      .attr("stroke", "black")
      .selectAll("path")
      .data(color.ticks(20).map(threshold => contours.contour(data.values, threshold)))
      .join("path")
      .attr("d", path)
      .attr("fill", d => color(d.value));

    // Add a color legend
    const legend = svg.append("g")
      .attr("transform", `translate(${width - 50}, 20)`);

    const legendScale = d3.scaleLinear()
      .domain(d3.extent(data.values))
      .range([0, 300]);

    const legendAxis = d3.axisRight(legendScale)
      .ticks(6);

    legend.selectAll("rect")
      .data(d3.range(0, 1, 0.01))
      .join("rect")
      .attr("x", 0)
      .attr("y", d => legendScale(d * d3.max(data.values)))
      .attr("width", 20)
      .attr("height", 5)
      .attr("fill", d => color(d * d3.max(data.values)));

    legend.append("g")
      .attr("transform", "translate(20, 0)")
      .call(legendAxis);
  }, [data]);

  return (
    <svg ref={ref}></svg>
  );
};

export default ContourChart;
