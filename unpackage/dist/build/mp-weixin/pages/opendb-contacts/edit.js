"use strict";const e=require("../../common/vendor.js"),t=require("../../js_sdk/validator/opendb-contacts.js"),a=e.Ws.database();function o(e){let a={};for(let o in t.validator)e.indexOf(o)>-1&&(a[o]=t.validator[o]);return a}const n={data(){let e={username:"",gender:0,mobile:"",email:"",comment:"",create_date:null};return{formData:e,formOptions:{gender_localdata:[{text:"未知",value:0},{text:"男",value:1},{text:"女",value:2}]},rules:{...o(Object.keys(e))}}},onLoad(e){if(e.id){const t=e.id;this.formDataId=t,this.getDetail(t)}},onReady(){this.$refs.form.setRules(this.rules)},methods:{submit(){e.index.showLoading({mask:!0}),this.$refs.form.validate().then((e=>this.submitForm(e))).catch((()=>{})).finally((()=>{e.index.hideLoading()}))},submitForm(t){return a.collection("opendb-contacts").doc(this.formDataId).update(t).then((t=>{e.index.showToast({icon:"none",title:"修改成功"}),this.getOpenerEventChannel().emit("refreshData"),setTimeout((()=>e.index.navigateBack()),500)})).catch((t=>{e.index.showModal({content:t.message||"请求服务失败",showCancel:!1})}))},getDetail(t){e.index.showLoading({mask:!0}),a.collection("opendb-contacts").doc(t).field("username,gender,mobile,email,comment,create_date").get().then((e=>{const t=e.result.data[0];t&&(this.formData=t)})).catch((t=>{e.index.showModal({content:t.message||"请求服务失败",showCancel:!1})})).finally((()=>{e.index.hideLoading()}))}}};if(!Array){(e.resolveComponent("uni-easyinput")+e.resolveComponent("uni-forms-item")+e.resolveComponent("uni-data-checkbox")+e.resolveComponent("uni-datetime-picker")+e.resolveComponent("uni-forms"))()}Math||((()=>"../../uni_modules/uni-easyinput/components/uni-easyinput/uni-easyinput.js")+(()=>"../../uni_modules/uni-forms/components/uni-forms-item/uni-forms-item.js")+(()=>"../../uni_modules/uni-data-checkbox/components/uni-data-checkbox/uni-data-checkbox.js")+(()=>"../../uni_modules/uni-datetime-picker/components/uni-datetime-picker/uni-datetime-picker.js")+(()=>"../../uni_modules/uni-forms/components/uni-forms/uni-forms.js"))();const i=e._export_sfc(n,[["render",function(t,a,o,n,i,m){return{a:e.o((e=>i.formData.username=e)),b:e.p({placeholder:"姓名",trim:"both",modelValue:i.formData.username}),c:e.p({name:"username",label:"姓名",required:!0}),d:e.o((e=>i.formData.gender=e)),e:e.p({localdata:i.formOptions.gender_localdata,modelValue:i.formData.gender}),f:e.p({name:"gender",label:"性别"}),g:e.o((e=>i.formData.mobile=e)),h:e.p({placeholder:"电话",trim:"both",modelValue:i.formData.mobile}),i:e.p({name:"mobile",label:"电话",required:!0}),j:e.o((e=>i.formData.email=e)),k:e.p({placeholder:"邮箱地址",trim:"both",modelValue:i.formData.email}),l:e.p({name:"email",label:"邮箱"}),m:e.o([e=>i.formData.comment=e.detail.value,e=>t.binddata("comment",e.detail.value)]),n:i.formData.comment,o:e.p({name:"comment",label:"备注"}),p:e.o((e=>i.formData.create_date=e)),q:e.p({"return-type":"timestamp",modelValue:i.formData.create_date}),r:e.p({name:"create_date",label:""}),s:e.o(((...e)=>m.submit&&m.submit(...e))),t:e.sr("form","fecebf5e-0"),v:e.p({model:i.formData,"validate-trigger":"submit","err-show-type":"toast"})}}]]);wx.createPage(i);