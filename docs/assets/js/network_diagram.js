var filepath = "json/References.json";
var network_div = document.getElementById("network");
var options_div = document.getElementById("options");
var references_div = document.getElementById("references");

console.log('script loaded');


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

function sort_nodes(){
    let sorted_nodes = [];
    let formatted_nodes = [];
    let refs = query_refs();
    // get list of unique keywords, but exclude specific keywords
    let keyword_list = [];
    let excluded_keywords = ["review", "chapter", "textbook"];
    // create output
    for(ref_id in refs){    
        let ref_format = {id: ref_id, marker:{radius: 10}, color:"#7becb2"};
        formatted_nodes += ref_format;
        for (const keyword in refs[ref_id].keywords){
            if ((!(keyword in keyword_list)) && (!(keyword in excluded_keywords))){
                keyword_list += keyword;
                let keyword_format = {id: keyword, marker:{radius:30}, color: "#E8544E"}
                formatted_nodes += keyword_format;
            }
        }
    }
    // sorted nodes: [from, to]
    for (const keyword in keyword_list){
        for (const ref_id in refs){
            if (keyword in refs[ref_id].keywords){
                let node_pair = [keyword, ref_id];
                sorted_nodes += node_pair;
            }
        }
    }
    return {node_pairs: sorted_nodes,
        node_format: formatted_nodes}
}


function load_network(){
    var network_div = document.getElementById('network');
    console.log('load network called');
    const nodes_out = get_nodes();
    let node_pairs = nodes_out.node_pairs;
    let node_formats = nodes_out.node_format;
    Highcharts,chart(
        network_div,
        {
            chart: {
                type: "networkgraph",
                marginTop: 20
            },
            tooltip: {

            },
            plotOptions: {
                networkgraph: {
                    keys: ["from", "to"],
                    layoutAlgorithm: {
                        enableSimulation: true,
                        integration: "verlet",
                        linkLength: 80
                    }
                }
            },
            series : {
                marker: {
                    radius: 13
                },
                dataLabels: {
                    enabled: true,
                    linkFormat: "",
                    allowOverlap: true,
                    style: {
                        textOutline:false
                    }
                },
                data: node_pairs,
                nodes: node_formats
            }
        }
    )
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