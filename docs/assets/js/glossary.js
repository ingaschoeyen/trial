var filepath = '../json/glossary.json';


async function get_entries(){
    try {
        const response = await fetch(filepath, {
          method: 'GET',
          credentials: 'same-origin'
        });
        const entries = await response.json();
        return entries;
      } catch (error) {
        console.error(error);
      }
}

function sort_items(){
    const items = get_entries();
    console.log('items queried');
    console.log(items);
    var itemsArray = Object.entries(items);
    itemsArray.sort(function(a, b) {
    var uniqueIdA = a[0];
    var uniqueIdB = b[0];
    return uniqueIdA.localeCompare(uniqueIdB);
    });
    const sorted_items = Object.fromEntries(itemsArray);
    console.log(sorted_items);
    return sorted_items;
  }
  

function create_gloss_display(){
    let items = sort_items();
    var gloss_div = document.getElementById('items');
    for (glossID in items){
        let item_div = document.createElement('div');
        item_div.setAttribute('class', 'gloss_item');
        let item_tit = document.createElement('div');
        item_tit.setAttribute('class', 'gloss_tit');
        item_tit.appendChild(document.createTextNode(items[glossID].title));
        item_div.appendChild(item_tit);
        let item_rel = document.createElement('div');
        item_rel.setAttribute('class', 'gloss_rel');
        let rel_con = '';
        items[glossID].related.forEach((element, index)=>{
            rel_con += element;
            if(!(index = items[gloss_div.related.length])){
                rel_con += ', ';
            }
        });
        item_rel.appendChild(document.createTextNode(rel_con));
        item_div.appendChild(item_rel);
        let item_con = document.createElement('div');
        item_con.setAttribute('class', 'gloss_con');
        item_con.appendChild(document.createTextNode(items[glossID].description));
        item_div.appendChild(item_con);
        gloss_div.appendChild();
    }
}

function searchGloss() {
    var input = document.getElementById("Search");
    var filter = input.value.toLowerCase();
    var nodes = document.getElementsByClassName('gloss');
  
    for (i = 0; i < nodes.length; i++) {
      if (nodes[i].innerText.toLowerCase().includes(filter)) {
        nodes[i].style.display = "block";
      } else {
        nodes[i].style.display = "none";
      }
    }
  }