let url = "https://raw.githubusercontent.com/freeCodeCamp/ProjectReferenceData/master/GDP-data.json"

const makeChart = (object) => {
    let w = 2000;
    let h = 1200;
    let barPadding = 1;
    let padding = 40;
    let barWidth = 2;
    
    let values = object.data;
    let maxTime = new Date(d3.max(values, (d)=> d[0]))
    let minTime = new Date(d3.min(values, (d) => d[0]))
    let maxGDP = d3.max(values,(d)=>d[1])
    let minGDP = d3.min(values,(d)=>d[1])

   
        
    
    // svg 
    const svg = d3.select('#chart')
            .append('svg')
            .attr('width', w)
            .attr('height', h)
            .attr('id', 'title')
            .style('background-color', 'white')
            
   

    const xScale = d3.scaleLinear()
    .domain( [minTime, maxTime] )
    .range( [padding, w - padding] )

    
    
    const yScale = d3.scaleLinear()
    .domain([0, maxGDP])
    .range([h -padding, padding])

    

    

    svg.selectAll('rect')
            .data(values)
            .enter()
            .append('rect')
            .attr("x", (d,i)=> (w - padding - padding) / values.length * i + padding)
            .attr('y', (d,i) =>  yScale(d[1])   )
     
            .attr("height", (d)=> h - yScale(d[1]) -padding )
            .attr("width", (w - padding - padding) / values.length )
            .attr("fill","navy")
            .append("title")
            .text((d)=> d[0] + " " + d[1])
            .append("text")
            .text((d)=> d[0] + "<br>" + d[1])
            .attr('class', 'bar')

          let   format = d3.time.format("%y");
        let xAxis = d3.axisBottom(xScale).tickFormat(format)
        .ticks(d3.time.year, 1);

        svg.append("g")
        .attr("transform", `translate(0, ${ h -padding })`)
        .call(xAxis)
        .attr('id', 'x-axis')
        .attr('class', 'tick')
        


        const yAxis = d3.axisLeft(yScale);

        svg.append("g")
        .attr('transform', `translate( ${padding}, 0)`)
        .call(yAxis)
        .attr('id', 'y-axis')
        .attr('class', 'tick')
       
        

}

fetch(url)
.then(res=>res.json())
.then(data=> {
    console.log(data);
    makeChart(data);
})



