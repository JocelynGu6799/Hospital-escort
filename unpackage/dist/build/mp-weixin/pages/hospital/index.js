"use strict";const e=require("../../common/vendor.js");if(!Array){(e.resolveComponent("navbar")+e.resolveComponent("share"))()}Math||((()=>"../../components/navbar/navbar.js")+(()=>"../../components/share/share.js"))();const a={__name:"index",setup(a){e.onBeforeMount((()=>{o()}));const t=e.ref(0),n=e.ref(0),o=async()=>{await e.index.getSystemInfo();const a=await e.index.getSystemInfo();console.log("res",a),t.value=2*a.statusBarHeight,"ios"==!e.index.getSystemInfoSync().platform?n.value=96:n.value=88},l=getApp(),r=e.ref({}),s=e.ref([]);e.onLoad((e=>{l.globalData.utils.myrequest({myurl:"/Hospital/index",data:{hid:e.hid},mysuccess:e=>{console.log("医院详情页数据",e),r.value=e.data.hospital,s.value=e.data.services}})}));const i=e.ref(!1),u=()=>{i.value=!0},v=()=>{const a=d(r.value.lng,r.value.lat);requirePlugin("routePlan");let t=l.globalData.name,n=JSON.stringify({name:r.value.name,latitude:a.lat,longitude:a.lng});e.index.navigateTo({url:"plugin://routePlan/index?key=MMCBZ-J6NLL-TLOPM-E7C2C-SJ4OV-J2BPO&referer="+t+"&endPoint="+n})},d=(e,a)=>{let t=52.35987755982988,n=e-.0065,o=a-.006,l=Math.sqrt(n*n+o*o)-2e-5*Math.sin(o*t),r=Math.atan2(o,n)-3e-6*Math.cos(n*t);return{lng:l*Math.cos(r),lat:l*Math.sin(r)}},c=a=>{e.index.navigateTo({url:"/pages/service/index?hid="+r.value.id+"&svid="+a.currentTarget.dataset.svid})};return(a,o)=>({a:e.p({myBackground:"none"}),b:r.value.avatar_url,c:r.value.avatar_url,d:e.t(r.value.name),e:e.t(r.value.rank),f:e.t(r.value.label),g:e.o(u),h:e.t(r.value.city),i:e.t(r.value.district),j:e.t(r.value.address),k:e.o(v),l:e.f(s.value,((a,t,n)=>e.e({a:1==a.use_switch},1==a.use_switch?{b:a.logo_image?a.logo_image_url:"./static/images/avatar.jpg",c:e.t(a.name),d:e.t(a.intro),e:e.t(a.price)}:{},{f:e.o(c,t),g:a.id,h:t}))),m:e.s("position:absolute;top:"+(n.value+t.value)+"rpx;padding-top:65rpx;overflow:hidden;width:100%;"),n:e.p({shareModal:i.value})})}};wx.createPage(a);