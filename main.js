let url = "https://raw.githubusercontent.com/freeCodeCamp/ProjectReferenceData/master/GDP-data.json"

const makeChart = (object) => {
    let w = 1000;
    let h = 600;
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
            .style('background-color', 'white')
            
   

    const xScale = d3.scaleLinear()
    .domain( [0, values.length-1] )
    .range( [padding, w - padding] )

    
    
    const yScale = d3.scaleLinear()
    .domain([0, maxGDP])
    .range([0, h-2*padding])

    const dateArray= values.map((item)=> {
        return new Date(item[0])
    })

    const xAxisScale = d3.scaleTime()
                        .domain([d3.min(dateArray), d3.max(dateArray)])
                        .range([padding, w-padding])
    const yAxisScale = d3.scaleLinear()
                        .domain([0,maxGDP])
                        .range([h-padding, padding])

    
    // add title
    svg.append("text")
    .attr("x", 420)
    .attr("y", 80)
    .attr("width",50)
    .attr("height",50)
    .attr("id","title")
    .text("USA GDP")
    .style("font-size", "34px")

    let tooltip = d3.select("#chart")
    .append("div")
    .attr("id", "tooltip")
    .style("visibility", "hidden")
    .style("width", "100px")
    .style("height", "auto")
    .style("position", "absolute")
    


    svg.selectAll('rect')
            .data(values)
            .enter()
            .append('rect')
            .attr("class","bar")
            .attr("x", (d,i)=> xScale(i))
            .attr('y', (d,i) => h- yScale(d[1]) - padding   )
     
            .attr("height", (d)=> yScale(d[1])  )
            .attr("width", (w - padding - padding) / values.length )
            .attr("fill","navy")
            
            .attr("data-date", (d)=> {
                return d[0]
            })
            .attr("data-gdp", (d)=> d[1])
            .on("mouseover", (e,d) => {
                tooltip.transition()
                .style("visibility", "visible")

                tooltip.html(`<p>${d[0]} <br> ${d[1]}</p>`)

                tooltip.attr("data-date",d[0])
                tooltip.attr("data-gdp", d[1])
                
                .style("top", "400px")
                .style("left", `${d3.pointer(e)[0] + 30}px` )

                console.log( d3.pointer(e) )
               
                
                
               
    
            })
            .on("mouseout", (e,d) => {
                tooltip.transition()
                .style("visibility", "hidden")
            })
 
            // create axises   
        let xAxis = d3.axisBottom(xAxisScale)
        

        svg.append("g")
        
        .call(xAxis)
        .attr('id', 'x-axis')
        .attr('class', 'tick')
        .attr("transform", `translate(0, ${h-padding})`)
        


        const yAxis = d3.axisLeft(yAxisScale);

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



