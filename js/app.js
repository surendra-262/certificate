var DEF={wings:["Law & Order","Armed Reserve (AR)","Traffic","Intelligence","CID","Special Branch","Cyber Crime","Women Protection","Training (APPA)","Sports"],
tpl:[
{id:"t1",name:"Appreciation Certificate",k:"c",title:"Certificate of Appreciation",te:"",pre:"This certificate is proudly presented to",body:"in grateful appreciation of outstanding dedication, professionalism and commendable service during {event}."},
{id:"t2",name:"Commemoration Certificate",k:"c",title:"Certificate of Commemoration",te:"",pre:"This certificate is presented in honour of",body:"in commemoration of {event}, and in remembrance of the sacrifice and service that inspire us all."},
{id:"t3",name:"Training Completion Certificate",k:"c",title:"Certificate of Training Completion",te:"",pre:"This is to certify that",body:"has successfully completed the training programme \"{event}\" conducted by {wing} wing and has met all the requirements of the course."},
{id:"t4",name:"Sports Winner Certificate",k:"c",title:"Certificate of Achievement",te:"",pre:"This certificate is awarded to",body:"for securing {result} in {event}, showing excellent skill, discipline and sportsmanship."},
{id:"t5",name:"Sports Participation Certificate",k:"c",title:"Certificate of Participation",te:"",pre:"This certificate is presented to",body:"for active participation in {event}."},
{id:"t6",name:"Meritorious Service Certificate",k:"c",title:"Certificate of Meritorious Service",te:"",pre:"This certificate is presented to",body:"in recognition of years of dedicated and meritorious service to the department and the people of Andhra Pradesh."},
{id:"t7",name:"Appreciation Letter",k:"l",title:"Appreciation for outstanding work in {event}",te:"",pre:"Dear {name},",body:"I am pleased to appreciate your dedicated work and outstanding performance in {event}. Your commitment reflects the highest traditions of the {wing} wing of Andhra Pradesh Police and sets an example for others.\n\nKeep up the good work."},
{id:"t8",name:"Commemoration Letter",k:"l",title:"Commemoration of {event}",te:"",pre:"Dear {name},",body:"On the occasion of {event}, we remember with deep respect the sacrifice and service of our brave personnel. The {wing} wing joins the entire department in paying tribute.\n\nYour presence and contribution made this commemoration meaningful."}
]};
var S=load();
function cleanStr(s,n){s=String(s==null?"":s);if(s.length>n)s=s.slice(0,n);return s}
function sanitizeStore(o){try{if(!o||typeof o!=="object")return null;if(!Array.isArray(o.wings)||!Array.isArray(o.tpl))return null;var wings=o.wings.filter(function(w){return typeof w==="string"&&w.trim()}).map(function(w){return cleanStr(w.trim(),80)}).slice(0,60);var tpl=o.tpl.filter(function(t){return t&&typeof t==="object"&&typeof t.name==="string"&&t.name.trim()}).map(function(t){return{id:cleanStr(String(t.id||("t"+Math.random().toString(36).slice(2))),40).replace(/[^a-zA-Z0-9_\-]/g,"")||("t"+Date.now()),name:cleanStr(t.name.trim(),80),k:t.k==="l"?"l":"c",title:cleanStr(t.title||"",160),te:cleanStr(t.te||"",160),pre:cleanStr(t.pre||"",200),body:cleanStr(t.body||"",2000)}}).slice(0,60);if(!wings.length||tpl.length<1)return null;return{wings:wings,tpl:tpl}}catch(e){return null}}
function load(){try{var s=localStorage.getItem(K);if(s){var o=JSON.parse(s);var c=sanitizeStore(o);if(c)return c}}catch(e){}return JSON.parse(JSON.stringify(DEF))}
function save(){try{localStorage.setItem(K,JSON.stringify(S))}catch(e){}}
var $=function(i){return document.getElementById(i)};
var edited=false,editId=null,editedFields={};
var ADMIN_PIN="AP2026";var adminOK=false;
function setLogo(src){if(typeof src!=="string"||src.indexOf("data:image/")!==0)return;if(src.indexOf("data:image/svg")===0)return;document.querySelectorAll("[data-logo]").forEach(function(d){d.textContent="";var im=document.createElement("img");im.alt="Logo";im.src=src;d.appendChild(im)})}
function fill(s){return (s||"").replace(/\{name\}/g,$("name").value).replace(/\{event\}/g,$("event").value||"the programme").replace(/\{wing\}/g,$("wing").value).replace(/\{result\}/g,$("result").value||"a distinguished position")}
function fmt(d){if(!d)return"";var p=d.split("-");return p[2]+"-"+p[1]+"-"+p[0]}
function cur(){return S.tpl.filter(function(t){return t.id===$("tpl").value})[0]||S.tpl[0]}
function opts(sel,items,val){sel.textContent="";items.forEach(function(i){var o=document.createElement("option");o.value=i[0];o.textContent=i[1];sel.appendChild(o)});if(val)sel.value=val}
function esc(s){return String(s==null?"":s).replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;").replace(/"/g,"&quot;").replace(/'/g,"&#39;")}
function lists(){
 opts($("wing"),S.wings.map(function(w){return[w,w]}),$("wing").value);
 var tv=$("tpl").value;
 var sel=$("tpl");sel.textContent="";
 ["c","l"].forEach(function(k){var g2=document.createElement("optgroup");g2.label=(k==="c"?"Certificates":"Letters");S.tpl.filter(function(t){return t.k===k}).forEach(function(t){var o=document.createElement("option");o.value=t.id;o.textContent=t.name;g2.appendChild(o)});sel.appendChild(g2)});
 if(tv)sel.value=tv;
 var av=$("aSel").value;
 opts($("aSel"),S.tpl.map(function(t){return[t.id,t.name]}),av);
 $("wingsTxt").value=S.wings.join("\n");
}
function render(){
 var T=cur(),L=T.k==="l";
 if(!edited)$("body").value=T.body;
 var body=fill($("body").value);
 $("cert").className=(L?"letter ":"")+($("border").value==="b-classic"?"":$("border").value);
 $("pg").textContent="@page{size:A4 "+(L?"portrait":"landscape")+";margin:0}";
 document.querySelectorAll(".corg").forEach(function(e){e.textContent=$("org").value});
 document.querySelectorAll(".cw").forEach(function(e){e.textContent=$("wing").value});
 if(!editedFields.ctitle)$("ctitle").textContent=T.title;
 if(!editedFields.ctitleTe)$("ctitleTe").textContent=T.te||"";
 if(!editedFields.cpre)$("cpre").textContent=fill(T.pre);
 var cert=$("cert");
 cert.style.setProperty("--c-title",$("cTitle").value);
 cert.style.setProperty("--c-accent",$("cAccent").value);
 cert.style.setProperty("--c-border",$("cBorder").value);
 cert.style.setProperty("--c-body",$("cBody").value);
 cert.style.setProperty("--c-bg",$("cBg").value);
 $("cname").textContent=$("name").value;$("cname").style.color=$("nameColor").value;
 $("lname").style.color=$("nameColor").value;
 $("cdesig").textContent=$("desig").value;
 $("cbody").textContent=body;
 $("cdate").textContent="Date: "+fmt($("date").value);$("cplace").textContent="Place: "+$("place").value;
 $("cissuer").textContent=$("issuer").value;$("cno").textContent="No. "+$("cno2").value;
 $("lref").textContent="Ref: "+$("cno2").value;$("ldate").textContent="Date: "+fmt($("date").value)+", "+$("place").value;
 $("lname").textContent=$("name").value;$("ldesig").textContent=$("desig").value;
 if(!editedFields.lsub)$("lsub").textContent="Sub: "+fill(T.title);
 if(!editedFields.lsal)$("lsal").textContent=fill(T.pre);
 $("lbody").textContent=body;
 $("lissuer").textContent=$("issuer").value;
 updateQR();
 applyCustomBg();
 fit();
}
function fit(){
 var L=$("cert").classList.contains("letter"),W=L?794:1123,H=L?1123:794;
 var s=Math.min(1,$("stage").clientWidth/W);
 $("scaler").style.transform="scale("+s+")";$("stage").style.height=(H*s)+"px";
}
function all(){lists();render()}
["name","desig","event","result","date","place","issuer","cno2","org","nameColor","cTitle","cAccent","cBorder","cBody","cBg"].forEach(function(id){$(id).addEventListener("input",function(){if(id==="event"||id==="result")edited=false;render()})});
$("cReset").addEventListener("click",function(){
 $("cTitle").value="#14213d";$("cAccent").value="#b8892b";$("cBorder").value="#14213d";
 $("cBody").value="#14213d";$("cBg").value="#fffdf6";$("nameColor").value="#14213d";
 render();
});
$("wing").addEventListener("change",render);
$("border").addEventListener("change",render);
$("body").addEventListener("input",function(){edited=true;render()});
$("tpl").addEventListener("change",function(){edited=false;editedFields={};render()});
$("logo").addEventListener("change",function(e){var f=e.target.files[0];if(!f)return;if(!/^image\/(png|jpeg|jpg|webp|gif)$/i.test(f.type||"")){alert("Only PNG / JPG / WebP / GIF image allowed. SVG not allowed for security.");e.target.value="";return}if(f.size>2*1024*1024){alert("Image too large (max 2MB).");e.target.value="";return}var r=new FileReader();r.onload=function(){setLogo(r.result)};r.readAsDataURL(f)});
function setWmark(src){if(typeof src!=="string"||src.indexOf("data:image/")!==0)return;if(src.indexOf("data:image/svg")===0)return;var im=$("wmarkimg");if(im)im.src=src;applyWmark()}
function applyWmark(){var show=$("wmarkshow")?$("wmarkshow").checked:true;var op=$("wmarkop")?parseInt($("wmarkop").value,10)||8:8;var w=$("wmark");if(!w)return;w.style.display=show?"block":"none";w.style.opacity=(op/100).toString()}
$("wmarkfile").addEventListener("change",function(e){var f=e.target.files[0];if(!f)return;if(!/^image\/(png|jpeg|jpg|webp)$/i.test(f.type||"")){alert("Watermark ki PNG / JPG / WebP pettandi. SVG blocked.");e.target.value="";return}if(f.size>2*1024*1024){alert("Watermark image too large (max 2MB).");e.target.value="";return}var r=new FileReader();r.onload=function(){setWmark(r.result)};r.readAsDataURL(f)});
$("wmarkclear").addEventListener("click",function(){$("wmarkfile").value="";setWmark(LOGO);if($("wmarkop"))$("wmarkop").value="8";if($("wmarkshow"))$("wmarkshow").checked=true;applyWmark()});
$("wmarkop").addEventListener("input",applyWmark);
$("wmarkshow").addEventListener("change",applyWmark);
var sigData=null;
function setSig(src){if(typeof src!=="string"||src.indexOf("data:image/")!==0)return;if(src.indexOf("data:image/svg")===0)return;sigData=src;["csig","lsigimg"].forEach(function(id){var im=$(id);if(im)im.src=src});applySigVis()}
function applySigVis(){var show=$("sigshow")?$("sigshow").checked:true;var sz=$("sigsize")?parseInt($("sigsize").value,10)||56:56;["csig","lsigimg"].forEach(function(id){var im=$(id);if(!im)return;im.style.display=(show&&sigData)?"block":"none";im.style.margin="0 auto 2px";im.style.maxHeight=(id==="csig"?sz:(sz+8))+"px"})}
$("sigfile").addEventListener("change",function(e){var f=e.target.files[0];if(!f)return;if(!/^image\/(png|jpeg|jpg|webp|gif)$/i.test(f.type||"")){alert("Only PNG / JPG / WebP / GIF allowed. SVG blocked for security.");e.target.value="";return}if(f.size>1024*1024){alert("Signature too large (max 1MB). Transparent PNG best.");e.target.value="";return}var r=new FileReader();r.onload=function(){setSig(r.result)};r.readAsDataURL(f)});
$("sigclear").addEventListener("click",function(){sigData=null;$("sigfile").value="";["csig","lsigimg"].forEach(function(id){var im=$(id);if(im){im.removeAttribute("src");im.style.display="none"}})});
$("sigsize").addEventListener("input",applySigVis);
$("sigshow").addEventListener("change",applySigVis);
$("qrshow").addEventListener("change",render);
var customBg=null;
function applyCustomBg(){try{var on=!!customBg&&$("bguse")&&$("bguse").checked&&$("border").value==="b-custom";var bg=$("custombg"),sh=$("bgshade");if(bg)bg.style.display=on?"block":"none";if(on){var im=$("custombgimg");if(im&&(!im.src||im.getAttribute("data-k")!==String(customBg.length))){im.src=customBg;im.setAttribute("data-k",String(customBg.length))}}if(sh){var op=$("bgshadeop")?parseInt($("bgshadeop").value,10)||0:0;sh.style.display=(on&&op>0)?"block":"none";sh.style.background="rgba(255,253,246,"+(op/100).toString()+")"}}catch(e){}}
$("bgfile").addEventListener("change",function(e){var f=e.target.files[0];if(!f)return;if(!/^image\/(png|jpeg|jpg|webp)$/i.test(f.type||"")){alert("Template ki PNG / JPG / WebP image pettandi.");e.target.value="";return}if(f.size>3*1024*1024){alert("Template image too large (max 3MB). Small size download chesukondi.");e.target.value="";return}var r=new FileReader();r.onload=function(){if(typeof r.result!=="string"||r.result.indexOf("data:image/")!==0)return;customBg=r.result;var im=$("custombgimg");if(im){im.removeAttribute("data-k")}if($("bguse"))$("bguse").checked=true;$("border").value="b-custom";render()};r.readAsDataURL(f)});
$("bgclear").addEventListener("click",function(){customBg=null;$("bgfile").value="";var im=$("custombgimg");if(im){im.removeAttribute("src");im.removeAttribute("data-k")}if($("bguse"))$("bguse").checked=false;if($("border").value==="b-custom")$("border").value="b-stripe";render()});
$("bguse").addEventListener("change",render);
$("bgshadeop").addEventListener("input",applyCustomBg);
var QR_SALT="AP-POLICE-2026";var qrC=null,qrL=null;var REGK="appc_reg_v1";
function djb2(s){var h=5381;for(var i=0;i<s.length;i++){h=((h<<5)+h+s.charCodeAt(i))>>>0}return("0000000"+h.toString(16)).slice(-8).toUpperCase()}
function certHash(ref,nm,ev,dt){return djb2(QR_SALT+"|"+cleanStr(ref,60).trim()+"|"+cleanStr(nm,80).trim().toLowerCase()+"|"+cleanStr(ev,120).trim().toLowerCase()+"|"+cleanStr(dt,20).trim())}
function qrText(){var ref=$("cno2").value.trim()||"NO-REF";var h=certHash($("cno2").value,$("name").value,$("event").value,$("date").value);return "APPOLICE|"+ref+"|"+h}
function updateQR(){try{var show=$("qrshow")?$("qrshow").checked:true;["cqrbox","lqrbox"].forEach(function(id){var b=$(id);if(b)b.style.display=show?"block":"none"});if(!show)return;var txt=qrText();if(typeof QRCode==="undefined")return;if(!qrC&&$("cqr")){try{$("cqr").textContent="";qrC=new QRCode($("cqr"),{text:txt,width:72,height:72,correctLevel:QRCode.CorrectLevel.M})}catch(e){qrC=null}}else if(qrC){try{qrC.clear();qrC.makeCode(txt)}catch(e){}}if(!qrL&&$("lqr")){try{$("lqr").textContent="";qrL=new QRCode($("lqr"),{text:txt,width:72,height:72,correctLevel:QRCode.CorrectLevel.M})}catch(e){qrL=null}}else if(qrL){try{qrL.clear();qrL.makeCode(txt)}catch(e){}}if($("cqrref"))$("cqrref").textContent=$("cno2").value;if($("lqrref"))$("lqrref").textContent=$("cno2").value}catch(e){}}
function regLoad(){try{var s=localStorage.getItem(REGK);if(!s)return[];var a=JSON.parse(s);return Array.isArray(a)?a:[]}catch(e){return[]}}
function regSave(a){try{localStorage.setItem(REGK,JSON.stringify(a.slice(-5000)))}catch(e){}}
function regAdd(e){try{if(!e||!e.ref)return;var a=regLoad();var i=-1;for(var k=0;k<a.length;k++){if(a[k].ref===e.ref){i=k;break}}if(i>=0)a[i]=e;else a.push(e);regSave(a)}catch(e){}}
function regAddFromCurrent(){try{regAdd({ref:cleanStr($("cno2").value,60).trim(),name:cleanStr($("name").value,80),event:cleanStr($("event").value,120),wing:cleanStr($("wing").value,80),tpl:cur().name,date:$("date").value,hash:certHash($("cno2").value,$("name").value,$("event").value,$("date").value),ts:new Date().toISOString()})}catch(e){}}
function regFind(ref){ref=String(ref||"").trim().toLowerCase();var a=regLoad();for(var i=a.length-1;i>=0;i--){if(String(a[i].ref||"").trim().toLowerCase()===ref)return a[i]}return null}
function parseQRtxt(t){t=String(t||"").trim();var m=t.split("|");if(m.length<3||m[0]!=="APPOLICE")return null;return{ref:m[1].trim(),hash:m[2].trim().toUpperCase()}}
function regRender(){try{var a=regLoad();$("regcount").textContent=a.length+" certificates in this browser register.";var tbl=$("regtable");if(!tbl)return;tbl.textContent="";var cols=["ref","name","event","wing","date","hash"];var tr=document.createElement("tr");cols.forEach(function(c){var th=document.createElement("th");th.textContent=c;tr.appendChild(th)});tbl.appendChild(tr);a.slice(-10).reverse().forEach(function(r){var row=document.createElement("tr");cols.forEach(function(c){var td=document.createElement("td");td.textContent=r[c]||"";row.appendChild(td)});tbl.appendChild(row)})}catch(e){}}
$("print").addEventListener("click",function(){
 try{window.print()}
 catch(e){
  $("pdfMsg").style.display="block";
  $("pdfMsg").textContent="Browser print isn't available here — please use the Download PDF button instead.";
 }
});
var _downloadsNS,_downloadsChecked=false;
async function getDownloads(){
 if(_downloadsChecked)return _downloadsNS;
 _downloadsChecked=true;
 try{_downloadsNS=(window.claude&&window.claude.use)?await window.claude.use("downloads"):null}
 catch(e){_downloadsNS=null}
 return _downloadsNS;
}
async function saveFile(filename,blob){
 try{
  if(window.claude&&window.claude.use){
   try{var dl=await window.claude.use("downloads");if(dl){await dl.save({filename:filename,data:blob});return true}}catch(e){var code=e&&e.code;if(code==="declined")return false}
  }
 }catch(e){}
 try{
  var url=URL.createObjectURL(blob);
  var a=document.createElement("a");a.href=url;a.download=filename;document.body.appendChild(a);a.click();
  setTimeout(function(){try{URL.revokeObjectURL(url)}catch(x){}try{a.remove()}catch(x){}},3000);
  if($("pdfMsg"))$("pdfMsg").style.display="none";
  return true;
 }catch(err){
  $("pdfMsg").style.display="block";
  $("pdfMsg").textContent="Could not save ("+((err&&err.message)||"error")+"). Print button use chesi 'Save as PDF' cheyandi.";
  return false;
 }
}
async function downloadSinglePdf(){
 var btn=$("dlpdf");
 try{
  if(typeof html2canvas==="undefined"||typeof window.jspdf==="undefined"){
   $("pdfMsg").style.display="block";
   $("pdfMsg").textContent="PDF tools are still loading — please wait a few seconds and try again.";
   return;
  }
  btn.disabled=true;var oldTxt=btn.textContent;btn.textContent="Preparing PDF…";
  $("pdfMsg").style.display="none";
  var node=$("cert");
  var canvas=await html2canvas(node,{scale:2,useCORS:true,backgroundColor:"#fffdf6"});
  var img=canvas.toDataURL("image/jpeg",0.92);
  var L=node.classList.contains("letter");
  var pdf=new window.jspdf.jsPDF({orientation:L?"portrait":"landscape",unit:"px",format:"a4"});
  var pw=pdf.internal.pageSize.getWidth(),ph=pdf.internal.pageSize.getHeight();
  pdf.addImage(img,"JPEG",0,0,pw,ph);
  var fname=($("name").value||"certificate").replace(/[^a-z0-9]+/gi,"_").replace(/^_+|_+$/g,"")||"certificate";
  regAddFromCurrent();
  await saveFile(fname+".pdf",pdf.output("blob"));
  btn.textContent=oldTxt;btn.disabled=false;
 }catch(err){
  $("pdfMsg").style.display="block";
  $("pdfMsg").textContent="Could not generate the PDF ("+(err&&err.message?err.message:"unknown error")+"). Please try the Print button instead.";
  btn.disabled=false;btn.textContent="Download PDF";
 }
}
$("dlpdf").addEventListener("click",downloadSinglePdf);
$("next").addEventListener("click",function(){
 $("name").value="";$("desig").value="";$("name").focus();
 var m=$("cno2").value.match(/^(.*?)(\d+)$/);
 if(m){var n=String(parseInt(m[2],10)+1);while(n.length<m[2].length)n="0"+n;$("cno2").value=m[1]+n}
 render();
});
function tabTo(which){
 if(which==="a"&&!adminOK){var p=null;try{p=prompt("Admin PIN enter cheyandi:")}catch(e){p=null}if(p!==ADMIN_PIN){alert("Wrong PIN.");return}adminOK=true;}
 document.body.classList.toggle("isadmin",which==="a");
 document.body.classList.toggle("isbulk",which==="b");
 document.body.classList.toggle("isverify",which==="v");
 $("tGen").classList.toggle("on",which==="g");
 $("tAdm").classList.toggle("on",which==="a");
 $("tBulk").classList.toggle("on",which==="b");
 $("tVer").classList.toggle("on",which==="v");
 if(which==="g")all();
 if(which==="a")loadEd();
 if(which==="b"){var T=cur();$("bInfo").textContent=T.name+" ("+$("wing").value+")"}
 if(which==="v")regRender();
}
["ctitle","ctitleTe","cpre","lsub","lsal"].forEach(function(id){
 $(id).addEventListener("input",function(){editedFields[id]=true});
});
$("saveAsTpl").addEventListener("click",function(){
 var t=cur();
 t.title=cleanStr($("ctitle").textContent.trim(),160);
 t.te=cleanStr($("ctitleTe").textContent.trim(),160);
 t.pre=cleanStr($("cpre").textContent.trim(),200);
 t.body=cleanStr($("body").value,2000);
 save();editedFields={};edited=false;lists();render();
 alert('Saved — "'+t.name+'" will now use this wording by default.');
});
$("resetText").addEventListener("click",function(){editedFields={};edited=false;render()});
$("tGen").addEventListener("click",function(){tabTo("g")});
$("tAdm").addEventListener("click",function(){tabTo("a")});
$("tBulk").addEventListener("click",function(){tabTo("b")});
$("tVer").addEventListener("click",function(){tabTo("v")});
$("vfill").addEventListener("click",function(){var p=parseQRtxt($("vqr").value);if(!p){alert("QR text format tappu. Example: APPOLICE|APP/2026/001|XXXXXXXX");return}$("vref").value=p.ref;var f=regFind(p.ref);if(f){$("vname").value=f.name||"";$("vevent").value=f.event||"";$("vdate").value=f.date||""}});
$("vgo").addEventListener("click",function(){var msg=$("vmsg");msg.className="note";var qrRaw=$("vqr").value.trim();var ref=$("vref").value.trim()||(parseQRtxt(qrRaw)||{}).ref||"";var nm=$("vname").value,ev=$("vevent").value,dt=$("vdate").value;if(!ref){msg.textContent="Ref No ivvandi.";return}if(!nm||!ev||!dt){msg.textContent="Name + Event + Date kuda ivvandi (hash check kosam).";return}var calc=certHash(ref,nm,ev,dt);var found=regFind(ref);var qrHash=qrRaw?(parseQRtxt(qrRaw)||{}).hash:null;if(qrHash&&qrHash!==calc){msg.className="note bad";msg.textContent="FAIL: QR hash mismatch - details marchinattu unnayi (tamper suspect). Expected "+calc+", got "+qrHash;return}if(found&&found.hash!==calc){msg.className="note bad";msg.textContent="FAIL: Register record tho match avvaledu. Register hash "+found.hash+", ippudu "+calc+" - details verify cheyandi.";return}if(found&&found.hash===calc){msg.className="note ok";msg.textContent="VALID: "+found.ref+" | "+found.name+" | "+found.event+" - register + hash rendu OK.";return}msg.className="note";msg.textContent="PARTIAL: Hash OK ("+calc+"), kani ee browser register lo ref ledhu. Vere device lo issue chesi undavachhu - details correct ayithe OK."});
$("regexp").addEventListener("click",function(){var a=regLoad();if(!a.length){alert("Register empty.");return}var csv="Ref,Name,Event,Wing,Template,Date,Hash,IssuedAt\n"+a.map(function(r){return[r.ref,r.name,r.event,r.wing,r.tpl,r.date,r.hash,r.ts].map(function(x){return'"'+String(x||"").replace(/"/g,'""')+'"'}).join(",")}).join("\n");var b=new Blob([csv],{type:"text/csv"});var u=URL.createObjectURL(b);var l=document.createElement("a");l.href=u;l.download="certificate_register.csv";document.body.appendChild(l);l.click();setTimeout(function(){URL.revokeObjectURL(u);l.remove()},500)});
$("regclr").addEventListener("click",function(){if(!confirm("Register clear cheyala?"))return;regSave([]);regRender()});
function loadEd(){
 var t=S.tpl.filter(function(x){return x.id===$("aSel").value})[0];if(!t)return;editId=t.id;
 $("tName").value=t.name;$("tKind").value=t.k;$("tTitle").value=t.title;$("tTe").value=t.te||"";$("tPre").value=t.pre;$("tBody").value=t.body;
}
$("aSel").addEventListener("change",loadEd);
$("saveWings").addEventListener("click",function(){S.wings=$("wingsTxt").value.split("\n").map(function(x){return x.trim().slice(0,80)}).filter(Boolean).slice(0,60);if(!S.wings.length){alert("At least one wing required.");return}save();lists();alert("Wings saved")});
$("tSave").addEventListener("click",function(){
 var t={id:cleanStr(editId||("t"+Date.now()),40).replace(/[^a-zA-Z0-9_\-]/g,"")||("t"+Date.now()),name:cleanStr($("tName").value||"Untitled",80),k:$("tKind").value==="l"?"l":"c",title:cleanStr($("tTitle").value,160),te:cleanStr($("tTe").value,160),pre:cleanStr($("tPre").value,200),body:cleanStr($("tBody").value,2000)};
 if(!t.name.trim()||S.tpl.length>=60&&S.tpl.map(function(x){return x.id}).indexOf(t.id)<0){alert("Template limit reached (60).");return}
 var i=S.tpl.map(function(x){return x.id}).indexOf(t.id);
 if(i>=0)S.tpl[i]=t;else S.tpl.push(t);
 save();lists();$("aSel").value=t.id;editId=t.id;alert("Template saved")});
$("tNew").addEventListener("click",function(){editId=null;["tName","tTitle","tTe","tPre","tBody"].forEach(function(i){$(i).value=""});$("tName").focus()});
$("tDel").addEventListener("click",function(){
 if(!editId||S.tpl.length<2)return;if(!confirm("Delete this template?"))return;
 S.tpl=S.tpl.filter(function(x){return x.id!==editId});save();lists();loadEd()});
$("exp").addEventListener("click",function(){$("io").value=JSON.stringify(S)});
$("imp").addEventListener("click",function(){try{var txt=$("io").value;if(!txt||txt.length>200000)throw 0;var o=JSON.parse(txt);var c=sanitizeStore(o);if(!c)throw 0;S=c;save();lists();loadEd();alert("Imported")}catch(e){alert("That JSON isn't valid. Please check and try again.")}});
$("reset").addEventListener("click",function(){if(confirm("Anni defaults ki reset cheyala?")){S=JSON.parse(JSON.stringify(DEF));save();lists();loadEd()}});
var bRows=[];
function normHeader(h){
 h=(h||"").toString().trim().toLowerCase();
 if(/name/.test(h))return"name";
 if(/type|template|certificate ?type/.test(h))return"type";
 if(/^wing$|wing name/.test(h))return"wing";
 if(/desig|rank|unit/.test(h))return"desig";
 if(/event|program/.test(h))return"event";
 if(/result|position|rank_pos|prize/.test(h))return"result";
 if(/date/.test(h))return"date";
 if(/place|location/.test(h))return"place";
 if(/mail/.test(h))return"email";
 return null;
}
function rowsFromAOA(aoa){
 if(!aoa.length)return[];
 if(aoa.length>1002)aoa=aoa.slice(0,1002);
 var heads=aoa[0].map(normHeader);
 var out=[];
 for(var i=1;i<aoa.length;i++){
  var r=aoa[i];if(!r||!r.length)continue;
  var o={};heads.forEach(function(h,idx){if(h&&r[idx]!=null&&r[idx]!=="")o[h]=cleanStr(r[idx],200)});
  if(o.name)out.push(o);
  if(out.length>=1000)break;
 }
 return out;
}
function parseCSV(text){
 if(!text||text.length>500000)return[];
 var lines=text.split(/\r?\n/).filter(function(l){return l.trim()!==""}).slice(0,1001);
 return rowsFromAOA(lines.map(function(l){return l.split(",").map(function(c){return c.trim().slice(0,200)})}));
}
function matchTemplate(txt){
 if(!txt)return null;
 var q=txt.toString().trim().toLowerCase();
 return S.tpl.filter(function(t){return t.name.toLowerCase()===q})[0]
   || S.tpl.filter(function(t){return t.name.toLowerCase().indexOf(q)>-1||q.indexOf(t.name.toLowerCase())>-1})[0]
   || null;
}
function matchWing(txt){
 if(!txt)return null;
 var q=txt.toString().trim().toLowerCase();
 return S.wings.filter(function(w){return w.toLowerCase()===q})[0]
   || S.wings.filter(function(w){return w.toLowerCase().indexOf(q)>-1||q.indexOf(w.toLowerCase())>-1})[0]
   || null;
}
function showPreview(){
 $("bPrevWrap").style.display=bRows.length?"block":"none";
 $("bCount").textContent=bRows.length+" recipients loaded.";
 var cols=["name","type","wing","desig","event","result","date","place","email"];
 var tbl=$("bTable");tbl.textContent="";
 var tr=document.createElement("tr");cols.forEach(function(c){var th=document.createElement("th");th.textContent=c;tr.appendChild(th)});tbl.appendChild(tr);
 bRows.slice(0,8).forEach(function(r){var row=document.createElement("tr");cols.forEach(function(c){var td=document.createElement("td");td.textContent=r[c]||"";row.appendChild(td)});tbl.appendChild(row)});
 if(bRows.length>8){var mr=document.createElement("tr");var md=document.createElement("td");md.colSpan=9;md.className="note";md.textContent="+ "+(bRows.length-8)+" more…";mr.appendChild(md);tbl.appendChild(mr)}
}
$("bFile").addEventListener("change",function(e){
 var f=e.target.files[0];if(!f)return;
 if(f.size>5*1024*1024){alert("File too large (max 5MB).");e.target.value="";return}
 if(!/\.(xlsx|xls|csv)$/i.test(f.name)){alert("Only .xlsx / .xls / .csv allowed.");e.target.value="";return}
 var r=new FileReader();
 r.onload=function(){
  if(/\.csv$/i.test(f.name)){bRows=parseCSV(r.result)}
  else{var wb=XLSX.read(new Uint8Array(r.result),{type:"array"});var ws=wb.Sheets[wb.SheetNames[0]];var aoa=XLSX.utils.sheet_to_json(ws,{header:1});bRows=rowsFromAOA(aoa)}
  showPreview();
 };
 if(/\.csv$/i.test(f.name))r.readAsText(f);else r.readAsArrayBuffer(f);
});
$("bParse").addEventListener("click",function(){
 if($("bPaste").value.trim()){if($("bPaste").value.length>500000){alert("Pasted data too large.");return}bRows=parseCSV($("bPaste").value);showPreview()}
});
async function bGenerate(){
 if(!bRows.length)return;
 var savedName=$("name").value,savedDesig=$("desig").value,savedEvent=$("event").value,savedResult=$("result").value,
     savedDate=$("date").value,savedPlace=$("place").value,savedCno=$("cno2").value,savedBodyEdited=edited,savedBody=$("body").value;
 var zip=new JSZip();
 $("bProg").style.display="block";$("bGo").disabled=true;
 // The certificate preview sits inside the Generate tab, which is display:none while on Bulk.
 // html2canvas can't capture a display:none element (it renders blank), so make it render
 // off-screen instead of hidden for the duration of the capture, then restore the Bulk view.
 var gen=document.querySelector(".gen");
 var prevGenStyle=gen.getAttribute("style")||"";
 gen.style.cssText="display:block!important;position:fixed;left:-99999px;top:0;";
 var baseCno=$("cno2").value.match(/^(.*?)(\d+)$/);
 var savedTpl=$("tpl").value,savedWing=$("wing").value;
 for(var i=0;i<bRows.length;i++){
  var r=bRows[i];
  $("name").value=r.name||"";
  $("desig").value=r.desig||savedDesig;
  $("event").value=r.event||savedEvent;
  $("result").value=r.result||savedResult;
  $("date").value=r.date&&/^\d{4}-\d{2}-\d{2}$/.test(r.date)?r.date:savedDate;
  $("place").value=r.place||savedPlace;
  var tMatch=matchTemplate(r.type);$("tpl").value=tMatch?tMatch.id:savedTpl;
  var wMatch=matchWing(r.wing);$("wing").value=wMatch||savedWing;
  if(baseCno){var n=String(parseInt(baseCno[2],10)+i);while(n.length<baseCno[2].length)n="0"+n;$("cno2").value=baseCno[1]+n}
  edited=false;editedFields={};render();updateQR();
  await new Promise(function(res){setTimeout(res,120)});
  var node=$("cert");
  var canvas=await html2canvas(node,{scale:2,useCORS:true,backgroundColor:"#fffdf6"});
  var img=canvas.toDataURL("image/jpeg",0.92);
  var L=node.classList.contains("letter");
  var pdf=new window.jspdf.jsPDF({orientation:L?"portrait":"landscape",unit:"px",format:"a4"});
  var pw=pdf.internal.pageSize.getWidth(),ph=pdf.internal.pageSize.getHeight();
  pdf.addImage(img,"JPEG",0,0,pw,ph);
  var fname=(r.name||"certificate").replace(/[^a-z0-9]+/gi,"_").replace(/^_+|_+$/g,"")||("cert_"+(i+1));
  zip.file(fname+".pdf",pdf.output("blob"));
  regAddFromCurrent();
  $("bProgTxt").textContent="Generating "+(i+1)+" / "+bRows.length+" — "+(r.name||"");
  $("bFill").style.width=Math.round(((i+1)/bRows.length)*100)+"%";
 }
 $("name").value=savedName;$("desig").value=savedDesig;$("event").value=savedEvent;$("result").value=savedResult;
 $("date").value=savedDate;$("place").value=savedPlace;$("cno2").value=savedCno;edited=savedBodyEdited;$("body").value=savedBody;
 $("tpl").value=savedTpl;$("wing").value=savedWing;render();
 gen.setAttribute("style",prevGenStyle);
 var blob=await zip.generateAsync({type:"blob"});
 var ok=await saveFile("AP_Police_Certificates.zip",blob);
 $("bProgTxt").textContent=ok?("Done — "+bRows.length+" PDFs saved in the ZIP."):("Generated "+bRows.length+" PDFs, but could not save: "+$("pdfMsg").textContent);
 $("bGo").disabled=false;
}
$("bGo").addEventListener("click",bGenerate);
window.addEventListener("resize",fit);
$("date").value=new Date().toISOString().slice(0,10);
setLogo(LOGO);setWmark(LOGO);lists();render();applyWmark();