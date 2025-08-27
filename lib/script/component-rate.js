$(document).ready(function(){
  let url = new URL(document.location).searchParams;
let oriGroup = 1;
let oriType = "rate";
let oriCompid = url.get("compid");
let str = {
  type: oriType,
  group: oriGroup,
  compid: oriCompid,
  }
let jsonstr = JSON.stringify(str,null,4);
console.log(jsonstr);
});
