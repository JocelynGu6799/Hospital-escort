<template>
	<view>
		<view class="od-banner">
			<image class="od-banner-icon" src="../../static/images/od_bg_icon.png" mode="widthFix" />
			<view class="od-jd od-jd-0">
				<view class="od-jd-out">
					<view class="od-jd-in"></view>
				</view>
				<view class="vp-flex od-jd-text">
					<view class="vp-flex_1">
						<text class="od-jd-st-0">填写订单</text>
					</view>
					<view class="vp-flex_1">
						<text class="od-jd-st-10">在线支付</text>
					</view>
					<view class="vp-flex_1">
						<text class="od-jd-st-20">专人服务</text>
					</view>
					<view class="vp-flex_1">
						<text class="od-jd-st-30">服务完成</text>
					</view>
				</view>
			</view>
		</view>
		<view class="pub-box">
			<view class="pub-box-bd">
				<view class="weui-cell weui-cell_input">
					<view class="weui-cell__hd">
						<image class="serv-icon"
							:src="service.icon_image ? service.icon_image_url : '../../static/images/avatar.jpg'">
						</image>
					</view>
					<view class="weui-cell__bd">
						<text class="serv-name">{{ service.name }}</text>
					</view>
					<view class="weui-cell__ft">
						<view class="f5 ic_info" @click="handleTap">服务内容</view>
					</view>
				</view>
			</view>
		</view>
		<block v-if="service.stype == 10 || service.stype == 15 || service.stype == 20">
			<view class="pub-box">
				<view class="pub-box-bd">
					<view class="weui-cell weui-cell_input">
						<view class="weui-cell__hd">
							<view class="weui-label">就诊医院</view>
						</view>
						<view class="weui-cell__bd"></view>
						<view class="weui-cell__ft weui-cell__ft_in-access">
							<view>
								<picker @change="onHospitalChange" :value="hospital_index" :range="hospitals"
									range-key="name">
									<input type="text" :disabled="true" placeholder="请选择要就诊的医院"
										:value="hospitals[hospital_index].name" placeholder-class="vp-placeholder" />
								</picker>
							</view>
						</view>
					</view>
					<view class="weui-cell weui-cell_input">
						<view class="weui-cell__hd">
							<view class="weui-label">就诊时间</view>
						</view>
						<view class="weui-cell__bd"></view>
						<view class="weui-cell__ft weui-cell__ft_in-access">
							<view>
								<dtPicker @dtPickerChanged="onStartTimeChanged" :timestamp="order.starttime"
									placeholder="请选择就诊时间"></dtPicker>
							</view>
						</view>
					</view>
					<view class="weui-cell weui-cell_input" @click="onClientChange">
						<view class="weui-cell__hd">
							<view class="weui-label">就诊人</view>
						</view>
						<view class="weui-cell__bd"></view>
						<view class="weui-cell__ft weui-cell__ft_in-access">
							<view>
								<input class="weui-input" placeholder-class="vp-placeholder" placeholder="请选择就诊人"
									style="text-align: right;" :disabled="true" :value="client.name" type="text">
							</view>
						</view>
					</view>
					<block v-if="service.stype == 15">
						<!-- 接送陪诊 -->
						<view class="weui-cell weui-cell_input">
							<view class="weui-cell__hd">接送地址</view>
							<view class="weui-cell__bd">
								<input class="weui-input" name="receiveAddress" style="text-align: right"
									placeholder-class="vp-placeholder" placeholder="请填写就诊人所在地址"
									v-model="order.receiveAddress" />
							</view>
						</view>
					</block>

					<view class="weui-cell weui-cell_input">
						<view class="weui-cell__hd">联系电话</view>
						<view class="weui-cell__bd">
							<input class="weui-input" type="number" name="tel" style="text-align: right"
								placeholder-class="vp-placeholder" placeholder="请填写您的联系电话" v-model="order.tel" />
						</view>
					</view>

				</view>
			</view>
			<view class="pub-box">
				<view class="pub-box-tt">服务需求</view>
				<view class="pub-box-bd">
					<view class="weui-cell weui-cell_input">
						<view class="weui-cell__bd">
							<textarea name="demand" auto-height placeholder="请简单描述您要就诊的科室.."
								placeholder-class="vp-placeholder" style="min-height: 150rpx" v-model="order.demand" />
						</view>
					</view>
				</view>
			</view>

		</block>
		<block v-if="service.stype == 30 || service.stype == 40">
			<!-- 送取结果,代跑取药 -->
			<view class="pub-box">
				<view class="pub-box-bd">
					<view class="weui-cell weui-cell_input">
						<view class="weui-cell__hd">
							<view class="weui-label">所在医院</view>
						</view>
						<view class="weui-cell__bd"></view>
						<view class="weui-cell__ft weui-cell__ft_in-access">
							<view>
								<picker @change="onHospitalChange" :value="hospital_index" :range="hospitals"
									range-key="name">
									<input type="text" :disabled="true" placeholder="请选择就诊所在医院"
										:value="hospitals[hospital_index].name" placeholder-class="vp-placeholder" />
								</picker>
							</view>
						</view>
					</view>

					<view class="weui-cell weui-cell_input">
						<view class="weui-cell__hd">
							<view class="weui-label">服务时间</view>
						</view>
						<view class="weui-cell__bd"></view>
						<view class="weui-cell__ft weui-cell__ft_in-access">
							<view>
								<dtPicker @dtPickerChanged="onStartTimeChanged" :timestamp="order.starttime"
									placeholder="请选择期望服务时间"></dtPicker>
							</view>
						</view>
					</view>

					<view class="weui-cell weui-cell_input" @click="onAddressChange">
						<view class="weui-cell__hd">
							<view class="weui-label">收件信息</view>
						</view>
						<view class="weui-cell__bd"></view>
						<view class="weui-cell__ft weui-cell__ft_in-access">
							<input class="weui-input" :disabled="true" style="text-align: right"
								placeholder-class="vp-placeholder" placeholder="请选择收件信息" :value="
		                                                            order.address.userName
		                                                                ? order.address.userName + '(' + order.address.cityName + order.address.countyName + order.address.detailInfo + ')'
		                                                                : ''
		                                                        " />
							<!-- {{order.address?(order.address.userName+'('+order.address.telNumber+')'):''}} -->
						</view>
					</view>
					<view class="weui-cell weui-cell_input">
						<view class="weui-cell__hd">联系电话</view>
						<view class="weui-cell__bd">
							<input class="weui-input" type="number" name="tel" style="text-align: right"
								placeholder-class="vp-placeholder" placeholder="请填写您的联系电话" v-model="order.tel" />
						</view>
					</view>
				</view>
			</view>

			<view class="pub-box">
				<view class="pub-box-tt">服务需求</view>
				<view class="pub-box-bd">
					<view class="weui-cell weui-cell_input">
						<view class="weui-cell__bd">
							<textarea name="demand" auto-height placeholder="如有其他服务要求请在此填写.."
								placeholder-class="vp-placeholder" style="min-height: 150rpx" v-model="order.demand" />
						</view>
					</view>
				</view>
			</view>
		</block>
		<view style="height: 300rpx"></view>
		<!-- 悬浮提交按钮 -->
		<view class="vp-foot">
			<view style="background: #ffffff; padding: 20rpx">
				<view class="xieyi" style="text-align: center">
					<text :class="'is_xieyi ' + (is_xieyi ? 'is_xieyi_on' : '')" @click="onXieyiChange">我已阅读并同意</text>
					<navigator :url="cfg.page_xy">《用户协议》</navigator>
					<text>和</text>
					<navigator :url="cfg.page_fw">《服务协议》</navigator>
				</view>
				<view>
					<button :class="'btnp ' + (is_xieyi ? '' : 'btnp-disabled')" @click="submit">
						确认下单
						<block v-if="order.price > 0">（支付{{ order.price }}元）</block>
					</button>
				</view>
			</view>
		</view>
		<uni-popup ref="popup" type="center" :is-mask-click="false" background-color="#fff">
			<view class="popup-content">
				<view class="group">
					<input class="uni-input" type="tel" v-model="validMobile.phone" placeholder="手机号" />
				</view>
				<view class="group">
					<input class="uni-input" v-model="validMobile.validCode" placeholder="验证码" />
					<text class="valid-text" @click="countdownChange">{{countdown.validText}}</text>
				</view>
			</view>
			<view class="btns">
				<view class="cancal" @click="cancel">取消</view>
				<view class="ok" @click="ok">确定</view>
			</view>
		</uni-popup>
		<uni-popup ref="qrcodePopup" type="center" :is-mask-click="false" background-color="#fff">
			<view class="pay-box">
				<image @click="payment" src="../static/images/modal_closer.png" style="display:block;width:30rpx;height:30rpx"></image>
				<view class="text-center">微信支付</view>
				<canvas id="qrcode" canvas-id="qrcode" style="width: 300rpx;height: 300rpx"></canvas>
				<view class="text-center">请用本人微信扫描以上二维码</view>
			</view>
		</uni-popup>
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
	import UQRCode from 'uqrcodejs';
	const app = getApp()


	const service = ref({})

	onLoad((options) => {
		console.log('options', options);
		mainLoad(options)

	})
	const hospitals = ref([])
	const hospital_index = ref(0)
	const order = reactive({
		"address": {
			"cityName": "",
			"countyName": "",
			"detailInfo": "",
			"userName": ""
		},
		"demand": "",
		"hospital_id": 0,
		"hospital_name": "",
		"receiveAddress": "",
		"service_code": "",
		"service_id": 0,
		"service_name": "",
		"service_stype": "",
		"starttime": 0,
		"tel": "",
		"client": {
			"age": 0,
			"mobile": "",
			"name": "",
			"sex": 0
		},
		price: 0
	})
	const mainLoad = (options) => {
		app.globalData.utils.myrequest({
			myurl: '/Service/order',
			data: {
				svid: options.svid
			},
			mysuccess: (res) => {
				console.log('详情页数据', res);
				service.value = res.data.service
				console.log('service', service.value);
				hospitals.value = res.data.hospitals
				console.log('hospitals', hospitals.value);
				hospital_index.value = hospitals.value.findIndex((item) => {
					return item.id == options.hid
				})
				order.price = hospitals.value[hospital_index.value].service_price
				order.hospital_id = hospitals.value[hospital_index.value].id
				order.hospital_name = hospitals.value[hospital_index.value].name
				// console.log('order.price', order.price);
				// const hospitaldata=toRaw(hospitals.value)
				// if(options.hid>0){
				// 	for(let i=0;i<hospitaldata.length;i++){
				// 		// console.log("hospitaldata[i].id options.hid",hospitaldata[i].id,options.hid);
				// 		if (hospitaldata[i].id==options.hid){
				// 			hospital_index.value=i
				// 			break
				// 		}
				// 	}
				// }

				// console.log('hospital_index', hospital_index.value);
				// console.log('order.price', order.price);


			}
		})


	}

	const onHospitalChange = (e) => {
		// console.log("change",e);
		hospital_index.value = e.detail.value
		order.price = hospitals.value[hospital_index.value].service_price
		order.hospital_id = hospitals.value[hospital_index.value].id
		order.hospital_name = hospitals.value[hospital_index.value].name
		// console.log('order.price', order.price);
	}
	const onStartTimeChanged = (obj) => {
		console.log('时间', obj);
		order.starttime = obj.detail.value //把当前订单的starttime设置为picker传过来的值
	}
	const client = reactive({
		name: '',
		age: 1,
		mobile: '',
		sex: 0
	})
	const onClientChange = () => {
		uni.navigateTo({
			url: '../clients/index?act=select'
		})
	}
	uni.$on('changeClient', (data) => {
		// console.log("name",name);
		client.name = data.name
		client.age = data.age
		client.mobile = data.mobile
		client.sex = data.sex
		order.client.name = data.name
		order.client.age = data.age
		order.client.mobile = data.mobile
		order.client.sex = data.sex
	})
	const cfg = reactive({
		page_xy: '',
		page_fw: ''
	})
	const is_xieyi = ref(false)
	const onXieyiChange = () => {
		is_xieyi.value = !is_xieyi.value
	}

	const onAddressChange = () => {
		uni.chooseAddress({
			success(res) {
				console.log('成功地址', res);
				order.address.userName = res.userName
				order.address.cityName = res.cityName
				order.address.countyName = res.countyName
				order.address.detailInfo = res.detailInfo
			},
			fail(res) {
				console.log('失败地址', res);
			}
		})
	}
	const validMobile = reactive({
		validCode: '',
		phone: ''
	})
	const countdown = reactive({
		validText: '获取验证码',
		time: 30
	})
	const popup = ref()
	let flag = true
	const countdownChange = () => {
		if (flag === false) {
			return uni.showToast({
				title: '别重复点',
				icon: 'error'
			})
		}

		// 定义手机号的正则表达式，以支持常见的手机号格式
		const phoneRegex = /^(?:(?:\+|00)86)?1\d{10}$/;

		if (!phoneRegex.test(validMobile.phone)) {
			return uni.showToast({
				title: '手机号不合法',
				icon: 'error'
			})
		}
		flag = false
		app.globalData.utils.myrequest({
			myurl: '/get/code',
			method: 'POST',
			data: {
				tel: validMobile.phone
			},
			mysuccess: (res) => {
				console.log('验证码信息', res);
				uni.showToast({
					title: '验证码已发送,注意查收',
					duration: 1200,
					icon: 'none'
				})

			},
			myfail: (err) => {
				console.log('我的错误提示', err);
				return uni.showToast({
					title: '验证码获取失败',
					icon: 'error'
				})
			}
		})


		let timer = setInterval(() => {

			if (countdown.time <= 0) {
				countdown.validText = '获取验证码'
				countdown.time = 30
				flag = true
				clearInterval(timer)
			} else {
				countdown.validText = `剩余${countdown.time}秒`
				countdown.time -= 1
			}
		}, 1000)

	}
	const cancel = () => {
		popup.value.close()
	}
	const ok = () => {
		if (!validMobile.phone || !validMobile.validCode) {
			return uni.showToast({
				title: '输入不完整',
				duration: 1200,
				icon: 'error'
			})
		}
		app.globalData.utils.myrequest({
			myurl: '/user/authentication',
			method: 'POST',
			data: {
				tel: validMobile.phone,
				code: validMobile.validCode
			},
			mysuccess: (res) => {
				console.log('验证码验证信息', res);
				uni.showToast({
					title: res.msg,
					duration: 1200,
					icon: 'none'
				})
				uni.setStorageSync('token', res.data.token)
				popup.value.close()
				// createOrder()
			},
			myfail: (err) => {
				console.log('我的验证码错误提示', err);
				return uni.showToast({
					title: err.data.msg ? err.data.msg : '验证码错误',
					icon: 'none'
				})
			}
		})



	}
	const submit = () => {
		if (!is_xieyi.value) {
			return uni.showToast({
				title: '请勾选协议',
				duration: 1200,
				icon: 'error'
			})
		}
		// console.log( 'token信息',uni.getStorageSync('token'));
		if (!uni.getStorageSync('token')) {
			popup.value.open('center')
			return
		}
		createOrder()

	}
	const qrcodePopup=ref()
	const createOrder = () => {
		order.service_code = service.value.code
		order.service_id = service.value.id
		order.service_name = service.value.name
		order.service_stype = service.value.stype
		console.log("订单信息", order);
		app.globalData.utils.myrequest({
			myurl: '/pay/createOrder',
			method: 'POST',
			data: order,
			header:{token:uni.getStorageSync('token')},
			mysuccess: (res) => {
				console.log('订单提交信息', res);
				// uni.showToast({
				// 	title: '订单已提交',
				// 	duration: 1200,
				// 	icon: 'success'
				// })
				
				qrcodePopup.value.open('center')
				const qr=new UQRCode()
				// 设置二维码内容
				qr.data = res.wx_code;
				// 设置二维码大小，必须与canvas设置的宽高一致
				qr.size = 200;
				// 调用制作二维码方法
				qr.make();
				// 获取canvas元素
				// var canvas = document.getElementById("qrcode");
				// // 获取canvas上下文
				// var canvasContext = canvas.getContext("2d");
				var canvasContext =uni.createCanvasContext('qrcode')
				// 设置uQRCode实例的canvas上下文
				qr.canvasContext = canvasContext;
				// 调用绘制方法将二维码图案绘制到canvas上
				qr.drawCanvas();
			},
			myfail: (err) => {
				console.log('订单提交错误信息', err);
				return uni.showToast({
					title:'订单提交错误',
					icon: 'error'
				})
			}
		})
		
	}
	const payment=()=>{
		uni.switchTab({
			url:'../myorder/index'
		})
	}
</script>

<style>
	@import url(./index.css);
</style>