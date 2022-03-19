import * as d3 from "d3";
import { useEffect, useRef } from "react";
import styles from "./Chart.module.scss";

type ChartData = {
  value: number;
  date: Date;
};

type ChartSVG = d3.Selection<SVGGElement, unknown, null, undefined>;
type XScale = d3.ScaleTime<number, number, never>;
type YScale = d3.ScaleLinear<number, number, never>;

// Credits: D3 chart initialization code from https://www.freecodecamp.org/news/how-to-build-historical-price-charts-with-d3-js-72214aaf6ba3/
const Chart: React.FC<{ data: ChartData[] }> = ({ data }) => {
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    initializeChart(data);
  }, [data]);

  const initializeChart = (data: ChartData[]) => {
    ref.current!.innerHTML = "";
    const margin = { top: 50, right: 50, bottom: 50, left: 50 };
    const { clientWidth, clientHeight } = ref.current!;
    const width = clientWidth - margin.left - margin.right;
    const height = clientHeight - margin.top - margin.bottom;
    const svg: ChartSVG = d3
      .select(ref.current)
      .append("svg")
      .attr("width", clientWidth)
      .attr("height", clientHeight)
      .call(responsivefy)
      .append("g")
      .attr("transform", `translate(${margin.left}, ${margin.top})`);

    const { xScale, yScale } = populateAxes(svg, width, height);
    populateData(svg, xScale, yScale);
    renderCrosshair(svg, width, height, xScale, yScale);
  };

  const responsivefy = (
    svg: d3.Selection<SVGSVGElement, unknown, null, undefined>
  ) => {
    // get container + svg aspect ratio
    const container = d3.select(svg.node()!.parentNode as any),
      width = parseInt(svg.style("width")),
      height = parseInt(svg.style("height")),
      aspect = width / height;

    // get width of container and resize svg to fit it
    const resize = () => {
      var targetWidth = parseInt(container.style("width"));
      svg.attr("width", targetWidth);
      svg.attr("height", Math.round(targetWidth / aspect));
    };

    // add viewBox and preserveAspectRatio properties,
    // and call resize so that svg resizes on inital page load
    svg
      .attr("viewBox", "0 0 " + width + " " + height)
      .attr("perserveAspectRatio", "xMinYMid")
      .call(resize);

    // to register multiple listeners for same event type,
    // you need to add namespace, i.e., 'click.foo'
    // necessary if you call invoke this function for multiple svgs
    // api docs: https://github.com/mbostock/d3/wiki/Selections#on
    // TODO: Issue, this is a memory leak currently due to not removing event listeners
    d3.select(window).on("resize." + container.attr("id"), resize);
  };

  const populateAxes = (svg: ChartSVG, width: number, height: number) => {
    const xMin = d3.min(data, (d) => d.date)!;
    const xMax = d3.max(data, (d) => d.date)!;
    const yMin = d3.min(data, (d) => d.value)!;
    const yMax = d3.max(data, (d) => d.value)!;
    const xScale = d3.scaleTime().domain([xMin, xMax]).range([0, width]);
    const yScale = d3
      .scaleLinear()
      .domain([yMin - 5, yMax])
      .range([height, 0]);

    svg
      .append("g")
      .attr("id", "xAxis")
      .attr("transform", `translate(0, ${height})`)
      .call(d3.axisBottom(xScale));
    svg
      .append("g")
      .attr("id", "yAxis")
      .attr("transform", `translate(${width}, 0)`)
      .call(d3.axisRight(yScale));

    return { xScale, yScale };
  };

  const populateData = (svg: ChartSVG, xScale: XScale, yScale: YScale) => {
    const line = d3
      .line<ChartData>()
      .x((d: ChartData) => {
        return xScale(d.date);
      })
      .y((d: ChartData) => {
        return yScale(d.value);
      });

    svg
      .append("path")
      .data([data])
      .style("fill", "none")
      .attr("id", "priceChart")
      .attr("stroke", "steelblue")
      .attr("stroke-width", "1.5")
      .attr("d", line);
  };

  const renderCrosshair = (
    svg: ChartSVG,
    width: number,
    height: number,
    xScale: XScale,
    yScale: YScale
  ) => {
    const bisectDate = d3.bisector((d: ChartData) => d.date).left;
    const generateCrosshair = (event: MouseEvent) => {
      //returns corresponding value from the domain
      const correspondingDate = xScale.invert(d3.pointer(event)[0]);
      //gets insertion point
      const i = bisectDate(data, correspondingDate, 1);
      console.log(i, data);
      const d0 = data[i - 1];
      const d1 = data[i] || d0;
      const currentPoint =
        correspondingDate.getTime() - d0.date.getTime() >
        d1.date.getTime() - correspondingDate.getTime()
          ? d1
          : d0;

      focus.attr(
        "transform",
        `translate(
          ${xScale(currentPoint.date)},
          ${yScale(currentPoint.value)})`
      );
      focus
        .select("line.x")
        .attr("x1", -xScale(currentPoint.date))
        .attr("x2", width - xScale(currentPoint.date))
        .attr("y1", 0)
        .attr("y2", 0);
      focus
        .select("line.y")
        .attr("x1", 0)
        .attr("x2", 0)
        .attr("y1", -yScale(currentPoint.value))
        .attr("y2", height - yScale(currentPoint.value));
      // updateLegends(currentPoint);
    };

    const focus = svg
      .append("g")
      .attr("class", "focus")
      .style("display", "none");
    focus.append("circle").attr("r", 4.5);
    focus.append("line").classed("x", true);
    focus.append("line").classed("y", true);
    svg
      .append("rect")
      .attr("class", "overlay")
      .attr("width", width)
      .attr("height", height)
      .on("mouseover", () => focus.style("display", null))
      .on("mouseout", () => focus.style("display", "none"))
      .on("mousemove", generateCrosshair);
    d3.select(".overlay").style("fill", "none");
    d3.select(".overlay").style("pointer-events", "all");
    d3.selectAll(".focus line").style("fill", "none");
    d3.selectAll(".focus line").style("stroke", "#67809f");
    d3.selectAll(".focus line").style("stroke-width", "1.5px");
    d3.selectAll(".focus line").style("stroke-dasharray", "3 3");

    // const updateLegends = (currentData) => {
    //   d3.selectAll(".lineLegend").remove();
    //   const legendKeys = Object.keys(data[0]);
    //   const lineLegend = svg
    //     .selectAll(".lineLegend")
    //     .data(legendKeys)
    //     .enter()
    //     .append("g")
    //     .attr("class", "lineLegend")
    //     .attr("transform", (d, i) => {
    //       return `translate(0, ${i * 20})`;
    //     });
    //   lineLegend
    //     .append("text")
    //     .text((d) => {
    //       if (d === "date") {
    //         return `${d}: ${currentData[d].toLocaleDateString()}`;
    //       } else if (
    //         d === "high" ||
    //         d === "low" ||
    //         d === "open" ||
    //         d === "close"
    //       ) {
    //         return `${d}: ${currentData[d].toFixed(2)}`;
    //       } else {
    //         return `${d}: ${currentData[d]}`;
    //       }
    //     })
    //     .style("fill", "white")
    //     .attr("transform", "translate(15,9)");
    // };
  };

  return <div className={styles.chart} ref={ref} />;
};

export default Chart;
