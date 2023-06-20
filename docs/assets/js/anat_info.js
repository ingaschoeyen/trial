// params
var filepath="/assets/json/anatomical_structures.json"
// read out information
function fetch_info(obj_id){
  fetch(filepath)
  .then(response => {
    return response.json();
  })
                     
  let info = response[obj_id].information,
      params = response[obj_id].parameters;
  return {info, params};
}
//  add them to output
function format_info(){
    
}

function anat_info(obj_id){
      

}
