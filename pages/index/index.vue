<template>
	<view>
		<mynavbar :isHome="true"></mynavbar>
		<view :style="`margin-top:${statusheight+navconheight}rpx;`">
			<view class="weui-cell" style="background: #fff9eb;">
				<view class="weui-cell__hd">
					<image src="../../static/images/ic_myapp.png"
						style="display: block;width: 40rpx;height: 40rpx;margin-right: 14rpx;"></image>
				</view>
				<view class="weui-cell__bd">
					<text style="color: #be9719;font-size: 13px;">右上角添加到我的小程序</text>
				</view>
				<view class="weui-cell__ft">
					<image src="../../static/images/modal_closer.png" style="display: block;width: 15px;height: 15px;">
					</image>
				</view>
			</view>
		</view>
		<view class="index-swiper">
			<swiper class="swiper" circular :indicator-dots="true" :autoplay="true" :interval="2000" duration="500">
				<swiper-item v-if="myslides.length>0" v-for="(item,index) in myslides" :key="index">
					<image :src="item.pic_image_url" mode="widthFix" show-menu-by-longpress data-index="index"></image>
				</swiper-item>

			</swiper>
		</view>
		<view class="nav2-list" v-if="mynav2s.length>0">
			<block v-for="(item,index) in mynav2s" :key="index">
				<view class="nav2-item" :data-index="index" @click="onNav2Tap(item,index)">
					<view class="nav2-pic">
						<image :src="item.pic_image_url" mode="widthFix"></image>
					</view>
				</view>
			</block>

		</view>
		<view class="nav-list" v-if="mynavs.length>0">
			<block v-for="(item,index) in mynavs" :key="index">
				<view class="nav-item" :data-index="index" @click="onNav2Tap(item,index)">
					<view class="nav-pic">
						<image :src="item.pic_image_url" mode="widthFix"></image>
					</view>
					<view class="nav_text" :style="`color:${item.tcolor?item.tcolor:''}`">
						{{item.title}}
					</view>
				</view>
			</block>
		</view>
		<view class="weui-cell hosp-item weui-cell_access" v-for="(item,index) in myhospitals" :key="item.id" :data-hid="item.id" @click="toHospital(item,index)">
			<view class="weui-cell__hd">
				<image class="hosp-avatar" mode="aspectFit"
					:src="item.avatar?item.avatar_url:'../../static/images/avatar.jpg'"></image>
			</view>
			<view class="weui-cell__bd">
				<view class="hosp-name">
					{{item.name}}
				</view>
				<view class="hosp-line">
					<text class="hosp-rank">{{item.rank}}</text>
					<text class="hosp-label">{{item.label}}</text>
				</view>
				<view class="hosp-line">
					<text class="hosp-intro">{{item.intro}}</text>
				</view>
			</view>

		</view>

	</view>
</template>

<script setup>
	import {
		onLoad
	} from '@dcloudio/uni-app';
	import {
		ref,onBeforeMount
	} from 'vue';
	import mynavbar from '@/components/navbar/navbar.vue'
	// import {re} from 'vue';
	const navigateto = () => {
		uni.navigateTo({
			url: '/pages/mysearch/index'
		})
	}
	const app = getApp()
	const myslides = ref([])
	const mynav2s = ref([])
	const mynavs = ref([])
	onBeforeMount(() => {
		setNavSize()
		
	})
	const statusheight = ref(0) //状态栏高度
	const navconheight = ref(0) //内容高度
	const setNavSize = async () => {
		const {
			system,
			statusBarHeight
		} = await uni.getSystemInfo()
		const res = await uni.getSystemInfo()
		console.log('res', res);
		statusheight.value = res.statusBarHeight * 2
		if (!uni.getSystemInfoSync().platform == "ios") {
			navconheight.value = 96
		} else {
			navconheight.value = 88
		}
	}
	const myhospitals = ref([])
	onLoad(() => {
		
		app.globalData.utils.getUserInfo()
		app.globalData.utils.myrequest({
			myurl: '/app/init',
			mysuccess: (res) => {
				// console.log('initdata',res);
				let {
					id
				} = res.data.area
				// console.log('id',id);
				app.globalData.utils.myrequest({
					myurl: '/Index/index',
					data: {
						aid: id
					},
					mysuccess: (indexres) => {
						console.log('indexres', indexres);
						let {
							slides,
							nav2s,
							navs,
							hospitals
						} = indexres.data
						// console.log('slides',slides);
						myslides.value = slides
						mynav2s.value = nav2s
						mynav2s.value = nav2s
						mynavs.value = navs
						myhospitals.value = hospitals
						// console.log('nav2s.value', mynav2s.value);
						// console.log('navs.value', mynavs.value);
						uni.setStorageSync('cfg',res.data.cfg)

					}
				})

			}
		})
	})
	const onNav2Tap = (item, index) => {
		if (item.stype === '1') {
			uni.navigateTo({
				url: item.stype_link
			})
		}

	}
	const toHospital=(item,index)=>{
		uni.navigateTo({
			url: '/pages/hospital/index?hid='+item.id
		})
	}
</script>

<style>
	page {
		background-color: white;
	}

	.content {
		/* display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center; */
	}

	.neirong {
		margin-top: 100px;
	}

	.index-swiper {
		padding: 20rpx 20rpx 0 20rpx;
		overflow: hidden;
	}

	.index-swiper swiper {
		height: 320rpx;
		overflow: hidden;
		border-radius: 10rpx;
		background-color: violet
	}

	.index-swiper swiper-item image {
		width: 100%;
	}

	.nav2-list {
		margin: 10rpx 20rpx 0 20rpx;
	}

	.nav2-list::after {
		content: '';
		display: block;
		height: 0;
		line-height: 0;
		clear: both;
		visibility: hidden;
	}

	.nav2-item {
		float: left;
		margin-top: 20rpx;
		width: 50%;
		text-align: center;
		box-sizing: border-box;
		padding: 0 5rpx;
	}

	.nav2-pic {
		width: 100%;
	}

	.nav2-pic image {
		display: block;
		width: 100%;
	}

	.nav-list::after {
		content: '';
		display: block;
		height: 0;
		line-height: 0;
		clear: both;
		visibility: hidden;
	}

	.nav-item {
		float: left;
		margin-top: 20rpx;
		width: 20%;
		text-align: center;
		padding: 10rpx 0;
	}

	.nav-pic image {
		display: block;
		margin: 0 auto;
		width: 110rpx;
		height: 110rpx;
	}

	.nav-text {
		font-size: 24rpx;
		font-weight: bold;
		white-space: nowrap;
		overflow: hidden;
	}

	.hosp-list {
		margin: 10rpx 0 0 0;
		background: none;
	}

	.hosp-list::before {
		display: none;
	}

	.hosp-list::after {
		display: none;
	}

	.hosp-item {
		-webkit-box-align: stretch;
		-webkit-align-items: stretch;
		align-items: stretch;
		padding: 20rpx;
		margin: 20rpx;
		border-radius: 10rpx;
		overflow: hidden;
		box-shadow: 0 1px 6px 0 rgba(0, 0, 0, 0.04), 0 1px 6px 0 rgba(0, 0, 0, 0.04);
	}

	.hosp-item::before {
		display: none;
	}

	.hosp-item::after {
		display: none;
	}

	.hosp-name {
		font-weight: bold;
		font-size: 34rpx;
	}

	.hosp-avatar {
		display: block;
		width: 200rpx;
		height: 180rpx;
		border-radius: 10rpx;
		overflow: hidden;
		margin-right: 20rpx;
	}

	.hosp-line {
		margin-top: 5rpx;
	}

	.hosp-line text {
		font-size: 26rpx;
	}

	.hosp-rank {
		font-weight: bold;
		color: #0bb585;
		margin-right: 15rpx;
	}

	.hosp-label {
		font-weight: bold;
		color: #0ca7ae;
		margin-right: 15rpx;
	}

	.hosp-intro {
		color: #999999;
	}
</style>