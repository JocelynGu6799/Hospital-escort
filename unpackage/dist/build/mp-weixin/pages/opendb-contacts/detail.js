"use strict";const e=require("../../common/vendor.js"),o=require("../../js_sdk/validator/opendb-contacts.js");e.Ws.database();const n={data:()=>({queryWhere:"",collectionList:"opendb-contacts",loadMore:{contentdown:"",contentrefresh:"",contentnomore:""},options:{...o.enumConverter}}),onLoad(e){this._id=e.id},onReady(){this._id&&(this.queryWhere='_id=="'+this._id+'"')},methods:{handleUpdate(){e.index.navigateTo({url:"./edit?id="+this._id,events:{refreshData:()=>{this.$refs.udb.loadData({clear:!0})}}})},handleDelete(){this.$refs.udb.remove(this._id,{success:o=>{e.index.navigateTo({url:"./list"})}})}}};if(!Array){(e.resolveComponent("uni-load-more")+e.resolveComponent("uni-link")+e.resolveComponent("uni-dateformat")+e.resolveComponent("unicloud-db"))()}Math||((()=>"../../uni_modules/uni-load-more/components/uni-load-more/uni-load-more.js")+(()=>"../../uni_modules/uni-link/components/uni-link/uni-link.js")+(()=>"../../uni_modules/uni-dateformat/components/uni-dateformat/uni-dateformat.js")+(()=>"../../node-modules/@dcloudio/uni-components/lib/unicloud-db/unicloud-db.js"))();const t=e._export_sfc(n,[["render",function(o,n,t,a,d,i){return{a:e.w((({data:o,loading:n,error:t,options:a},i,r)=>e.e({a:t},t?{b:e.t(t.message)}:n?{d:"4a845f58-1-"+r+",4a845f58-0",e:e.p({contentText:d.loadMore,status:"loading"})}:o?{g:e.t(o.username),h:e.t(a.gender_valuetotext[o.gender]),i:e.t(o.mobile),j:"4a845f58-2-"+r+",4a845f58-0",k:e.p({href:"mailto:"+o.email,text:o.email}),l:e.t(o.comment),m:"4a845f58-3-"+r+",4a845f58-0",n:e.p({threshold:[0,0],date:o.create_date})}:{},{c:n,f:o,o:r,p:i})),{name:"d",path:"a",vueId:"4a845f58-0"}),b:e.sr("udb","4a845f58-0"),c:e.p({options:d.options,collection:d.collectionList,field:"username,gender,mobile,email,comment,create_date",where:d.queryWhere,getone:!0,manual:!0}),d:e.o(((...e)=>i.handleUpdate&&i.handleUpdate(...e))),e:e.o(((...e)=>i.handleDelete&&i.handleDelete(...e)))}}]]);wx.createPage(t);