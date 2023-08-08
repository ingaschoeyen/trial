var filepath = "assets/json/References.json";
var network_div = document.getElementById("network");
var options_div = document.getElementById("options");
var references_div = document.getElementById("references");

console.log('network script loaded');


async function query_refs(){
    try {
        const response = await fetch(filepath, {
          method: 'GET',
          credentials: 'same-origin'
        });
        const references = await response.json();
        return references;
      } catch (error) {
        console.error(error);
      }
}

async function sort_nodes(){
    let sorted_nodes = [];
    let formatted_nodes = [];
    let refs = await query_refs();
    console.log(refs);
    // get list of unique keywords, but exclude specific keywords
    let keyword_list = [];
    let keyword_count = {};
    let excluded_keywords = ["review", "chapter", "textbook"];
    // create output
    for(ref_id in refs){    
        let ref_format = {id: ref_id, marker:{radius: 5}, color:"#7becb2"};
        formatted_nodes.push(ref_format);
        let keywords = refs[ref_id].keywords;
        for (const keyword of keywords) {
            if (!excluded_keywords.includes(keyword)) { // Check if keyword is in the excluded set
                if (!keyword_list.includes(keyword)) {
                    keyword_list.push(keyword);
                    keyword_count[keyword] = 1;
                    let keyword_format = { id: keyword, marker: { radius: 30 }, color: "#E8544E" };
                    formatted_nodes.push(keyword_format);
                }
                else{
                    keyword_count[keyword]++;
                }
            }
        }
    }
    // Calculate scaling factor for node size
    const maxCount = Math.max(...Object.values(keyword_count));
    const minCount = Math.min(...Object.values(keyword_count));
    const sizeRange = 20; // You can adjust this value to set the maximum size of the nodes
    
    // Adjust the marker size in formatted_nodes based on keyword count
    for (const keyword of keyword_list) {
        const count = keyword_count[keyword];
        const scaledSize = (count - minCount) / (maxCount - minCount) * sizeRange;
        const keywordNode = formatted_nodes.find(node => node.id === keyword);
        if (keywordNode) {
            keywordNode.marker.radius = 1 + scaledSize; // Adjust the radius with base size 10
        }
    }


    // sorted nodes: [from, to]
    for (const keyword of keyword_list){
        for (const ref_id in refs){
            if (refs[ref_id].keywords.includes(keyword)){
                let node_pair = [keyword, ref_id];
                sorted_nodes.push(node_pair);
            }
        }
    }
    console.log('nodes sorted');
    console.log(sorted_nodes);
    return {node_pairs: sorted_nodes,
        node_format: formatted_nodes}
}


async function load_network(){
    var network_div = document.getElementById('network');
    console.log('load network called');
    const nodes_out = await sort_nodes();
    let node_pairs = nodes_out.node_pairs;
    let node_formats = nodes_out.node_format;
    console.log('sorted notes retrieved');
    Highcharts.chart(
        network_div,
        {
            chart: {
                type: 'networkgraph',
                marginTop: 20
            },
            title:{
                text: 'Network of the Literature'
            },
            plotOptions: {
                networkgraph: {
                    keys: ["from", "to"],
                    // layoutAlgorithm: {
                    //     enableSimulation: true,
                    //     integration: "verlet",
                    //     linkLength: 80
                    // }
                }
            },
            series: [{
                marker: {
                    radius: 13
                },
                dataLabels: {
                    enabled: true,
                    linkFormat: '',
                    allowOverlap: true,
                    style: {
                        textOutline:false
                    }
                },
                data: node_pairs,
                nodes: node_formats
            }]
        });
}

// tooltip: {
//     formatter: function () {
//       var info = "";
//       switch (this.color) {
//         case dirDist50:
//           console.log(dirDist50);
//           info = "is an aiport <b>more than 50</b> direct distinations";
//           break;
//         case dirDist10:
//           console.log(dirDist10);
//           info = "is an aiport <b>more than 10</b> direct distinations";
//           break;
//         case dirDistLess10:
//           console.log(dirDistLess10);
//           info = "is an aiport <b>less than 10</b> direct distinations";
//           break;
//       }
//       return "<b>" + this.key + "</b>: " + info;
//     }
// }

