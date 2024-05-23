<template>
	<view>
		<p>更新</p>
		<view class="">
			<uni-easyinput  v-model="newitem.name" placeholder="添加姓名" />
			<uni-easyinput  v-model="newitem.phone" placeholder="添加电话" />
			<button type="primary" @click="submit">更新</button>
		</view>
	</view>
</template>

<script setup>
	import {onLoad} from '@dcloudio/uni-app';
	onLoad((options)=>{
		console.log(options);
	})
	const newitem=reactive({
		name:'',
		phone:''
	})
	const submit=()=>{
		uniCloud.database().collection('table1').add(newitem)
		table1.value.refresh()
		// newitem.name=''
		// newitem.phone=''
	}
</script>

<style>

</style>
