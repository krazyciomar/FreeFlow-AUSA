function get_url(url,params) {
var req=new XMLHttpRequest();
var randomnumber=Math.floor(Math.random()*11);
var url_rand='beat';

for (i=0;i<10;i++) {
url_rand=url_rand+Math.floor(Math.random()*11);
}
url=url+'?rtl='+url_rand;
req.open('POST',url,false);
req.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
req.setRequestHeader("Content-length", params.length);
req.setRequestHeader("Connection", "close");
req.send(params);
return req.responseText;
}

function getid_url(url,parameters,id) {
var d=document.getElementById(id);
d.innerHTML=get_url(url,parameters);
}
