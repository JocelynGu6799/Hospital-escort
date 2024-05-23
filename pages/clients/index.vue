<template>
	<view >
		<view class="cell-box" v-for="(item, index) in clients" :key="index">
		    <view class="weui-cell" @click="onClientSelected" :data-index="index">
		        <view class="weui-cell__bd">
		            <view>
		                <text style="font-weight: bold">{{ item.name }}</text>
		            </view>
		            <view>
		                <text :class="'sext' + item.sex">{{ item.sex == 1 ? '男' : '女' }}</text>
		                <text style="margin-left: 10rpx">{{ item.age }}周岁</text>
		                <text style="margin-left: 10rpx">{{ item.mobile }}</text>
		            </view>
		        </view>
		        <view class="weui-cell__ft">
		            <text v-if="act == 'select'" style="
		                display: inline-block;
		                padding: 15rpx 30rpx;
		                border: 1rpx solid #0bb584;
		                color: #0bb584;
		                font-weight: bold;
		                border-radius: 10rpx;
		                font-size: 28rpx;
		                overflow: hidden;
		            ">
		                选择
		            </text>
		            <text v-else @click="removeClient" :data-id="item.id" style="
		                display: inline-block;
		                padding: 15rpx 30rpx;
		                border: 1rpx solid #eeeeee;
		                color: #f13e6d;
		                border-radius: 10rpx;
		                font-size: 28rpx;
		                overflow: hidden;
		            ">
		                移除
		            </text>
		        </view>
		    </view>
		</view>
		
	</view>
	
	
</template>

<script setup>
	import {
		reactive,
		ref,
		toRaw
	} from 'vue';
	import {
		onLoad
	} from '@dcloudio/uni-app';
	const app = getApp()
	const act=ref('')
	const clients=ref([])
	onLoad((options)=>{
		act.value=options.act
		console.log('就诊人options',options);
		if(options.act==='select'){
			uni.setNavigationBarTitle({
				title:'请选择就诊人'
			})
		}else{
			uni.setNavigationBarTitle({
				title:'管理就诊人'
			})
		}
		app.globalData.utils.myrequest({
			myurl: '/User/clients',
			mysuccess: (indexres) => {
				console.log('就诊人页面数据', indexres);
				clients.value=indexres.data.clients
				
			}
		})
		
	})
	const onClientSelected=(e)=>{
		console.log('selectmaninfo',e);
		uni.$emit('changeClient',clients.value[e.currentTarget.dataset.index])
		uni.navigateBack()
	}
	const removeClient=()=>{
		
	}
</script>

<style>

</style>
