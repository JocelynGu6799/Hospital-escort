<script>
	import Utils from './common/js/utils.js';
	export default {
		onLaunch: function() {
			// const app = getApp()
			// console.log('App Launch')
			// app.globalData.utils.myrequest({
			// 		myurl: '/app/init',
			// 		mysuccess: (res) => {
			// 			console.log('appinit',res);
			// 			uni.setStorageSync('cfg',res.data.cfg)
					
			// 		}
			// 	})
			
		},
		onShow: function() {
			console.log('App Show')
		},
		onHide: function() {
			console.log('App Hide')
		},
		globalData:{
			utils:Utils,
			orders_filt:''
		}
	}
</script>

<style>
	/*每个页面公共css */
	@import url("app.css");
</style>
