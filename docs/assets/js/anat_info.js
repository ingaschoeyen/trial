// params
var filepath="/assets/json/anatomical_structures.json"
// read out information
async function fetch_info(obj_id){
  try {
    const response = await fetch(filepath, {
      method: 'GET',
      credentials: 'same-origin'
    });
    const entries = await response.json();
    let info = entries[obj_id].information,
    params = entries[obj_id].parameters;
    return {info, params};
  } 
  catch (error) {
      console.error(error);
  }                    
}
//  add them to output
async function format_content(obj_id){
    let info, params = await fetch_info(obj_id);
    let info_text = "";
    let params_text = "";
    for (let key in info){
      info_text += key + ": " + info.key + "<br>";
    }
    for (let key in params){
      params_text += key + ": " + params.key + "<br>";
    }
    return {info_text, params_text};
}

async function anat_info(obj_id){
  let info_div = document.getElementById('info_content');
  let param_div = document.getElementById('param_content');
  info_div.innerHTML = '';
  param_div.innerHTML = '';
  console.log('anat_info_called');
  let infos, params = await format_content(obj_id); 
  console.log('infos: ' + infos);
  console.log('params: ' + params);
  info_div.appendChild(document.createTextNode(infos));
  param_div.appendChild(document.createTextNode(params));

}
