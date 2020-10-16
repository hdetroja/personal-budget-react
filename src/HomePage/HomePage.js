import React, { useEffect, useState } from 'react';
import axios from "axios";
import * as d3 from 'd3';
import { pie, arc } from 'd3-shape';
import { scaleOrdinal } from 'd3-scale';
import { Pie } from 'react-chartjs-2';

function HomePage() {
    var d3jsData = {};
  const [State, dataSource]=useState({});
  var labels=[];
  var data=[];
  
  const getBudget = () => {
    axios.get('http://localhost:3000/budget')
    .then(function (res) {
        for(var i = 0; i<res.data.myBudget.length; i++) {
            data[i] = res.data.myBudget[i].budget;
            labels[i] = res.data.myBudget[i].title;
            d3jsData[res.data.myBudget[i].title] = res.data.myBudget[i].budget; 
        }
        dataSource({
          datasets: [
              {
                  data: data,
                  backgroundColor: [
                    '#ffcd56',
                    '#ff6384',
                    '#36a2eb',
                    '#fd6b19',
                    "#46b535",
                    "#05e2f1",
                    "#552bec",
                    "red",
                    "blue",
                    "green"
                ],
              }
          ],
          labels:labels
      });
      createC(d3jsData);
    });
  };
  
  function createC(d3jsData)
  {
    var width = 550;
    var height = 550;
    var margin = 100;
    var radius = Math.min(width, height) / 2 - margin;

    var svg = d3.select('#d3js')
          .append('svg')
            .attr('width', width)
            .attr('height', height)
            .append('g')
            .attr('transform', 'translate(' + width / 2 + ',' + height / 2 + ')');

    var color = scaleOrdinal()
          .domain(data)
          .range([
            '#ffcd56',
            '#ff6384',
            '#36a2eb',
            '#fd6b19',
            "#46b535",
            "#05e2f1",
            "#552bec",
            "red",
            "blue",
            "green"
        ],);

    var ring = pie()
          .sort(null)
          .value(function(d) {return d.value; });
    var data_ready = ring(d3.entries(d3jsData));

    var angle = arc()
          .innerRadius(radius * 0.3)
          .outerRadius(radius * 0.8);

    var outerArc = arc()
          .innerRadius(radius * 0.9)
          .outerRadius(radius * 0.9);

    svg
          .selectAll('allSlices')
          .data(data_ready)
          .enter()
          .append('path')
          .attr('d', angle)
          .attr('fill', function(d){ return(color(d.data.key)); })
          .attr('stroke', 'white')
          .style('stroke-width', '2px')
          .style('opacity', 0.7);

    svg
          .selectAll('allPolylines')
          .data(data_ready)
          .enter()
          .append('polyline')
            .attr('stroke', 'black')
            .style('fill', 'none')
            .attr('stroke-width', 1)
            .attr('points', function(d) {
              var posA = angle.centroid(d);
              var posB = outerArc.centroid(d);
              var posC = outerArc.centroid(d);
              var midAngle = d.startAngle + (d.endAngle - d.startAngle) / 2;
              posC[0] = radius * 0.95 * (midAngle < Math.PI ? 1 : -1);
              return [posA, posB, posC];
            });

    svg
          .selectAll('allLabels')
          .data(data_ready)
          .enter()
          .append('text')
            .text( function(d) { console.log(d.data.key) ; return d.data.key; } )
            .attr('transform', function(d) {
                var pos = outerArc.centroid(d);
                var midAngle = d.startAngle + (d.endAngle - d.startAngle) / 2;
                pos[0] = radius * 0.99 * (midAngle < Math.PI ? 1 : -1);
                return 'translate(' + pos + ')';
            })
            .style('text-anchor', function(d) {
                var midAngle = d.startAngle + (d.endAngle - d.startAngle) / 2;
                return (midAngle < Math.PI ? 'start' : 'end');
            });
  }
  useEffect(()=>{
    getBudget();
    // eslint-disable-next-line
  },[]);
  return (
    <main className="center" id="main">
            <div className="page-area">
                <article>
                    <Pie height="500" width="400" data={State}/>
                </article>
                <article>
                    <div id = "d3js"/>
                </article>
                <article>
                <h1>Stay on track</h1>
                <p>
                    Do you know where you are spending your money? If you really stop to track it down,
                    you would get surprised! Proper budget management depends on real data... and this
                    app will help you with that!
                </p>
                </article>
            <article>
                <h1>Alerts</h1>
                <p>
                    What if your clothing budget ended? You will get an alert. The goal is to never go over the budget.
                </p>
            </article>
    
            <article>
                <h1>Results</h1>
                <p>
                    People who stick to a financial plan, budgeting every expense, get out of debt faster!
                    Also, they to live happier lives... since they expend without guilt or fear... 
                    because they know it is all good and accounted for.
                </p>
            </article>
    
            <article>
                <h1>Free</h1>
                <p>
                    This app is free!!! And you are the only one holding your data!
                </p>
            </article>
    
            <article>
                <h1>Stay on track</h1>
                <p>
                    Do you know where you are spending your money? If you really stop to track it down,
                    you would get surprised! Proper budget management depends on real data... and this
                    app will help you with that!
                </p>
            </article>
    
            <article>
                <h1>Alerts</h1>
                <p>
                    What if your clothing budget ended? You will get an alert. The goal is to never go over the budget.
                </p>
            </article>
            </div>
    </main>
  );
}

export default HomePage;
