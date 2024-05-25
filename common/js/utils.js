class Utils{
	constructor(){
		this.baseUrl='http://159.75.169.224:7300/pz'
	}
	getUserInfo(){
		uni.login({
			success:(res)=>{
				console.log("userinfo",res);
				this.myrequest({
					myurl:'/auth/wxLogin',
					data:{
						code:res.code
						// code:0
					},
					mysuccess:resdata=>{
						console.log('我的成功数据',resdata);
					}
				})
			}
		})
	}
	myrequest(options={myloading:false}){
		if(!options.myurl){
			console.log('请求错误');
			return false
		}
		if(options.myloading){
			this.showmyLoading()
			uni.setStorageSync('ifloading',true)//说明正在loading
		}
		uni.request({
			url:this.baseUrl+options.myurl,
			data:options.data?options.data:{},
			header:options.header?options.header:{},
			method:options.method?options.method:'GET',//默认get
			success:res=>{
				uni.hideLoading()
				uni.setStorageSync('ifloading',false)
				// console.log('requestres',res);
				if(res.data.code!==10000){
					if(options.myfail && typeof options.myfail==='function'){
						options.myfail(res)
					}
				}else{
					if(options.mysuccess && typeof options.mysuccess==='function'){
						options.mysuccess(res.data)
					}
				}
				
			},
			fail:err=>{
				options.myfail(err)
				uni.hideLoading()
				uni.setStorageSync('ifloading',false)
			}
			
		})
	}
	showmyLoading(){
		if(uni.getStorageSync('ifloading')){
			uni.hideLoading()
			// uni.setStorageSync('ifloading',false)
		}
		uni.showLoading({
			title:'正在努力加载中...',
			// success() {
			// 	uni.setStorageSync('ifloading',true)
			// },
			// fail() {
			// 	uni.setStorageSync('ifloading',false)
			// }
			
		})
		
	}
}
export default new Utils()