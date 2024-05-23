"use strict";const e=require("../../common/vendor.js"),t={__name:"dtPicker",props:{timestamp:{type:Number,default:0},emptyText:{type:String,default:""},placeholder:{type:String,default:""}},emits:["dtPickerChanged"],setup(t,{emit:a}){const l=t,r=a,u=(new Date).getTime(),n=e.ref([]);let o=null,v="",i=null,d=null;const m=e.ref([0,0,0]),c=e.ref();e.onBeforeMount((()=>{const e=[""],t=[l.emptyText];for(let a=0;a<20;a++){e.push(f(u+864e5*a,"YYYY-MM-dd"));let l=f(u+864e5*a,"M月d日");0==a&&(l+=" （今天）"),1==a&&(l+=" （明天）"),2==a&&(l+=" （后天）"),t.push(l);const r=["00","01","02","03","04","05","06","07","08","09","10","11","12","13","14","15","16","17","18","19","20","21","22","23"],m=["00","01","02","03","04","05","06","07","08","09","10","11","12","13","14","15","16","17","18","19","20","21","22","23","24","25","26","27","28","29","30","31","32","33","34","35","36","37","38","39","40","41","42","43","44","45","46","47","48","49","50","51","52","53","54","55","56","57","58","59"],c=[];c[0]=t,c[1]=r,c[2]=m,n.value=c,o=e,v=t,i=r,d=m}}));const s=()=>{c.value=h();var e=o[m.value[0]],t=i[m.value[1]],a=d[m.value[2]],l="";e&&(l=e+" "+t+":"+a);var u=0;l&&(u=new Date(l.replace(/-/g,"/")).getTime()),r("dtPickerChanged",{detail:{value:u}})},p=e=>{var t=m.value;t[e.detail.column]=e.detail.value,m.value=t},f=(e,t)=>{const a=new Date;return a.setTime(e),a.VP_FORMAT(t)},h=()=>{var e=v[m.value[0]],t=i[m.value[1]],a=d[m.value[2]];return""==o[m.value[0]]?e:e+" "+t+":"+a};return console.log(l,"props"),e.watch(l.timestamp,(t=>{(t=>{if(o){if(t>0)var a=o,l=i,r=d;t<u&&(t=u);for(var n=f(t,"YYYY-MM-dd"),v=f(t,"hh"),s=f(t,"mm"),p=e.toRaw(m.value),g=0;g<a.length;g++)if(n==a[g]){p[0]=g;break}for(g=0;g<l.length;g++)if(v==l[g]){p[1]=g;break}for(g=0;g<r.length;g++)if(s==r[g]){p[2]=g;break}m.value=p,c.value=h()}})(t)}),{immediate:!0}),(a,l)=>({a:t.placeholder,b:c.value,c:e.o(s),d:e.o(p),e:m.value,f:n.value})}};wx.createComponent(t);