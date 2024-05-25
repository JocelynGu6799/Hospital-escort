<template>
	<view>
<!-- 	
		<button @click="testco">请求云对象</button>
		<unicloud-db ref='table1' v-slot:default="{data, loading, error, options}" collection="table1" >
			<view v-if="error">{{error.message}}</view>
			<view v-else>
				<uni-list>
					<uni-list-item v-for="item in data" :title="item.name" :note="item.phone" :key="item._id"   @longpress="removeitem(item._id)">
						<p @click="myupdate(item)">更改</p>
					</uni-list-item>
					
				</uni-list>
			</view>
		</unicloud-db>
		<view class="">
			<uni-easyinput  v-model="newitem.name" placeholder="添加姓名" />
			<uni-easyinput  v-model="newitem.phone" placeholder="添加电话" />
			<button type="primary" @click="submit">提交新的人</button>
		</view>
		 -->


	</view>
</template>

<script setup>
	import { reactive, ref } from 'vue';
import mynavbar from '@/components/navbar/navbar.vue'
	const testco = async () => {
		const helloco = uniCloud.importObject('myobj') // 导入云对象
		try {
			const res = await helloco.sum(1, 2) //导入云对象后就可以直接调用该对象的sum方法了，注意使用异步await
			console.log('云服务sum',res) // 结果是3
		} catch (e) {
			console.log('云服务错误',e)
		}
	}
	const table1=ref()
	const removeitem=(id)=>{
		table1.value.remove(id)
		
		console.log('table1.value',table1.value);
	}
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
	const myupdate=(item)=>{
		console.log('更新');
		// uni.navigateTo({
		// 	url:'./update/update'+JSON.stringify(item),
		// 	fail(err) {
		// 		console.log(err);
		// 	}
			
		// })
	}
</script>

<style>

</style>