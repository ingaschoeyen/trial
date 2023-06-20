var filepath = "../assets/json/References.json";

async function call_references(){ 
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

async function sort_references(){
  const references = await call_references();
  console.log('references queried');
  var referencesArray = Object.entries(references);
  // sort references according to option (default year)
  let sort_option_selected = document.getElementById('sort_opt').value;
  if(sort_option_selected==="year"){
    referencesArray.sort(function(a, b){
      var referenceA = a[1];
      var referenceB = b[1];
      return referenceB.year - referenceA.year;
    });
  }
  else if(sort_option_selected==="alphabetic"){
    referencesArray.sort(function(a, b) {
      var uniqueIdA = a[0];
      var uniqueIdB = b[0];
      return uniqueIdA.localeCompare(uniqueIdB);
    });
  }
  else if(sort_option_selected==="structure"){
    alert("not implemented yet");
    return references;
  }
  else{
    alert("Unexpected Sorting Option");
    return references;
  }
  const sorted_references = Object.fromEntries(referencesArray);
  console.log(sorted_references);
  return sorted_references;
}

async function create_ref_display(){
  var references = await sort_references();
  var references_div = document.getElementById("references-container");
  console.log("new function at work, format adjusted");
  for( const ref_key in references){
//     create ref container
    const ref_div = document.createElement('div');
    ref_div.setAttribute('id', ref_key);
    ref_div.setAttribute('class', 'reference');
    //     get authors
    let authors = [];
    let name = '';
    if('editor' in references[ref_key]){
      references[ref_key].editor.forEach((element, index)=>{
        let author = element.family + ', ' + element.given.charAt(0) + '.';
        authors[index] = author;
      });
      if(authors.length <= 3){
        for(i=0;i<authors.length;i++){
          name += authors[i];
          if(i<(authors.length-1)){
            name += ', ';
          }
        }
      }
      else{
        name = authors[0] + ' et al.';
      }
    }
    else{
      references[ref_key].author.forEach((element, index)=>{
        let author = element.family + ', ' + element.given.charAt(0) + '. ';
        authors[index] = author;
      });
      if(authors.length <= 3){
        for(i=0;i<authors.length;i++){
          name += authors[i];
          if(i<(authors.length-1)){
            name += ', ';
          }
        }
      }
      else{
        name = authors[0] + ' et al.';
      }
    }
    var ref_title_div = document.createElement('div');
    var ref_title_id = ref_key + '-title';
    ref_title_div.setAttribute('class', 'ref_title');
    ref_title_div.setAttribute('id', ref_title_id);
    ref_title_div.appendChild(document.createTextNode(name));
//     get year
    ref_title_div.appendChild(document.createTextNode(' ('+references[ref_key].issued['date-parts'][0][0] + ') '));
//     get title
    ref_title_div.appendChild(document.createTextNode(references[ref_key].title));
    ref_div.appendChild(ref_title_div);
    
    let ref_cont_div = document.createElement('div');
    ref_cont_div.appendChild(document.createTextNode('Authors: '));
    ref_cont_div.appendChild(document.createTextNode(authors));
//     append DOI and Keywords
    ref_cont_div.appendChild(document.createElement('br'));
    ref_cont_div.appendChild(document.createTextNode('\nDOI:' ));
    var link = document.createElement('a');
    link.setAttribute('href', references[ref_key].URL);
    link.setAttribute('target', '_blank');
    link.appendChild(document.createTextNode(references[ref_key].DOI));
    ref_cont_div.appendChild(link);
    ref_cont_div.appendChild(document.createElement('br'));
    ref_cont_div.appendChild(document.createTextNode('\nKeywords: ' ));
    let keywords = '';
    for(i=0;i<references[ref_key].keywords.length; i++){
      keywords += references[ref_key].keywords[i];
      if(i<(references[ref_key].keywords.length-1)){
        keywords += ', ';
      }
    }
    ref_cont_div.appendChild(document.createTextNode(keywords));
    ref_cont_div.setAttribute('class', 'ref_cont');
    ref_div.appendChild(ref_cont_div);
    references_div.appendChild(ref_div);
  }
  
}

function searchRefs() {
  var input = document.getElementById("Search");
  var filter = input.value.toLowerCase();
  var nodes = document.getElementsByClassName('reference');

  for (i = 0; i < nodes.length; i++) {
    if (nodes[i].innerText.toLowerCase().includes(filter)) {
      nodes[i].style.display = "block";
    } else {
      nodes[i].style.display = "none";
    }
  }
}

