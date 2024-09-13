<template>
	<div class="home_view">
		<div class="projectTitle">欢迎使用 {{projectName}}</div>
		<div class="count_list">
			<el-collapse-transition v-if="btnAuth('xueshengchengji','首页总数')">
				<el-card v-show="countTypeList.closexueshengchengjiCountType" class="card_view">
					<template #header>
						<div class="index_card_head">
							<div class="card_head_title">
								学生成绩
							</div>
							<div class="card_head_right">
								<el-icon @click="countTypeClick('hiddenxueshengchengjiCountType')" class="showIcons"
									:class="countTypeList.hiddenxueshengchengjiCountType?'showIcons1':''">
									<ArrowUpBold />
								</el-icon>
								<el-icon @click="countTypeClick('closexueshengchengjiCountType')" class="closeIcons">
									<CloseBold />
								</el-icon>
							</div>
							
						</div>
					</template>
					<el-collapse-transition>
						<div class="count_item" v-show="countTypeList.hiddenxueshengchengjiCountType">
							<div class="count_title">学生成绩总数</div>
							<div class="count_num">{{xueshengchengjiCount}}</div>
						</div>
					</el-collapse-transition>
				</el-card>
			</el-collapse-transition>
		</div>
		<div class="card_list">
			<el-collapse-transition v-if="btnAuth('xueshengchengji','首页统计')">
				<el-card v-show="cardTypeList.closexueshengchengjiChartType1" class="card_view">
					<template #header>
						<div class="index_card_head">
							<div class="card_head_title">
								学生成绩
							</div>
							<div class="card_head_right">
								<el-icon @click="cardTypeClick('hiddenxueshengchengjiChartType1')" class="showIcons"
									:class="cardTypeList.hiddenxueshengchengjiChartType1?'showIcons1':''">
									<ArrowUpBold />
								</el-icon>
								<el-icon @click="cardTypeClick('closexueshengchengjiChartType1')" class="closeIcons">
									<CloseBold />
								</el-icon>
							</div>
						</div>
					</template>
					<el-collapse-transition>
						<div class="card_item" v-show="cardTypeList.hiddenxueshengchengjiChartType1">
							<div id="xueshengchengjichengjiEchart1" style="width: 100%;height: 400px;"></div>
						</div>
					</el-collapse-transition>
				</el-card>
			</el-collapse-transition>
		</div>
	</div>
</template>

<script setup>
	import {
		inject,
		nextTick,
		ref,
		getCurrentInstance
	} from 'vue';
	const context = getCurrentInstance()?.appContext.config.globalProperties;
	const projectName = context.$project.projectName
	const countTypeList = ref({
	})
	const getCountList=()=>{
		countTypeList.value.closexueshengchengjiCountType = true
		countTypeList.value.hiddenxueshengchengjiCountType = true
		if(btnAuth('xueshengchengji','首页总数')){
			getxueshengchengjiCount()
		}
	}
	const xueshengchengjiCount = ref(0)
	const getxueshengchengjiCount = () => {
		context?.$http({
			url:'xueshengchengji/count',
			method: 'get'
		}).then(res=>{
			xueshengchengjiCount.value = res.data.data
		})
	}
	const countTypeClick = (e) => {
		countTypeList.value[e] = !countTypeList.value[e]
	}
	const init=()=>{
		getCountList()
		getCardList()
	}
	//权限验证
	const btnAuth = (e,a)=>{
		return context?.$toolUtil.isAuth(e,a)
	}
	let echarts = inject("echarts")
	const cardTypeClick = (e) =>{
		cardTypeList.value[e] = !cardTypeList.value[e]
		setTimeout(()=>{
			getCardList()
		},1000)
	}
	const cardTypeList = ref({
		closexueshengchengjiChartType1: true,
		hiddenxueshengchengjiChartType1: true,
	})
	const getCardList = () => {
		if(btnAuth('xueshengchengji','首页统计')){
			getxueshengchengjiChart1()
		}
	}
	const getxueshengchengjiChart1 = () => {
		nextTick(()=>{
			var chengjiEchart1 = echarts.init(document.getElementById("xueshengchengjichengjiEchart1"),'macarons');
			context?.$http({
				url: "xueshengchengji/sectionStat/chengji/kechengmingcheng",
				method: "get",
			}).then(obj=>{
				let res = obj.data.data
				let xAxis = [];
				let yAxis1 = [];
				let yAxis2 = [];
				let yAxis3 = [];
				let yAxis4 = [];
				let pArray = []
				for(let i=0;i<res.length;i++){
				    xAxis.push(res[i].kechengmingcheng);
					yAxis1.push(parseFloat((res[i].不及格)));
					yAxis2.push(parseFloat((res[i].及格)));
					yAxis3.push(parseFloat((res[i].良)));
					yAxis4.push(parseFloat((res[i].优)));
					pArray.push({
					    name: res[i].chengji
					})
				}
				var option = {};
                option = {
                    title: {
                        text: '成绩统计',
                        left: 'center'
                    },
                    legend: {
						data: [
							'不及格',
							'及格',
							'良',
							'优',
                        ],
						left: 'center',
						bottom: 10,     
                    },
                    tooltip: {
                      trigger: 'axis'
                    },
                    xAxis: {
                        type: 'category',
                        data: xAxis,
                        axisLabel: {
                            rotate: 40
                        }
                    },
                    yAxis: {
                        type: 'value'
                    },
                    series: [
						{
							name: '不及格',
							data: yAxis1,
							type: 'bar'
						},
						{
							name: '及格',
							data: yAxis2,
							type: 'bar'
						},
						{
							name: '良',
							data: yAxis3,
							type: 'bar'
						},
						{
							name: '优',
							data: yAxis4,
							type: 'bar'
						},
                    ],
                };
				chengjiEchart1.clear()
				// 使用刚指定的配置项和数据显示图表。
				chengjiEchart1.setOption(option);
				//根据窗口的大小变动图表
				chengjiEchart1.resize();
			})
		})
	}
	init()
</script>
<style lang="scss">
	.projectTitle{
		padding: 20px 0;
		font-weight: bold;
		display: flex;
		width: 100%;
		font-size: 30px;
		justify-content: center;
		align-items: center;
		height: 50%;
	}

	.showIcons {
		transition: transform 0.3s;
		margin-right: 10px;
	}

	.showIcons1 {
		transform: rotate(-180deg);
	}
	
	// 总数盒子
	.count_list{
		padding: 0 0 20px;
		display: flex;
		width: 100%;
		justify-content: center;
		align-items: flex-start;
		flex-wrap: wrap;
		// 总数card
		.card_view {
			border: 0px solid #e4e7ed;
			border-radius: 10px;
			box-shadow: none;
			margin: 0 10px 10px;
			flex: 1;
			background: linear-gradient(90deg, #E3EDF9 0%, #D9E6F7 100%);
			width: 100%;
			position: relative;
			box-sizing: border-box;
			height: auto;
			// card头部
			.el-card__header {
				border: 1px solid #e4e7ed;
				padding: 7px 20px;
				left: 0;
				background: #62B8FF;
				bottom: 0;
				width: 100%;
				border-width: 0;
				position: absolute;
				// 头部盒子
				.index_card_head {
					display: flex;
					width: 100%;
					justify-content: space-between;
					align-items: center;
					// 标题
					.card_head_title {
						color: #868686;
						font-weight: bold;
						font-size: 14px;
					}
					// 按钮盒子
					.card_head_right {
						display: flex;
						align-items: center;
						// 按钮
						.el-icon {
							cursor: pointer;
							color: #868686;
							font-weight: bold;
							font-size: 12px;
						}
					}
				}
			}
			// body
			.el-card__body {
				padding: 0;
				// body盒子
				.count_item{
					padding: 30px 20px 60px;
					flex-direction: column-reverse;
					display: flex;
					// 总数标题
					.count_title{
						color: #3753A2;
						font-weight: bold;
						font-size: 16px;
						line-height: 1;
						order: 1;
					}
					// 总数数字
					.count_num{
						color: #3753A2;
						font-weight: bold;
						font-size: 50px;
						line-height: 1.5;
						order: 2;
					}
				}
			}
		}
	}
	// 首页盒子
	.home_view {
	}
	// 统计图盒子
	.card_list {
		padding: 0 0 20px;
		display: flex;
		width: 100%;
		justify-content: center;
		align-items: flex-start;
		flex-wrap: wrap;
		// 统计图card
		.card_view {
			border: 0px solid #e4e7ed;
			border-radius: 10px;
			box-shadow: none;
			margin: 0 10px 10px;
			flex: 1;
			background: linear-gradient(90deg, #E3EDF9 0%, #D9E6F7 100%);
			width: 100%;
			position: relative;
			box-sizing: border-box;
			height: auto;
			// 头部
			.el-card__header {
				border: 0px solid #e4e7ed;
				padding: 7px 20px;
				left: 0;
				bottom: 0;
				background: #62B8FF;
				width: 100%;
				border-width: 0;
				position: absolute;
				// 头部盒子
				.index_card_head {
					display: flex;
					width: 100%;
					justify-content: space-between;
					align-items: center;
					// 标题
					.card_head_title {
						color: #868686;
						font-weight: bold;
						font-size: 14px;
					}
					// 按钮盒子
					.card_head_right {
						display: flex;
						align-items: center;
						// 按钮
						.el-icon{
							cursor: pointer;
							color: #868686;
							font-weight: bold;
							font-size: 12px;
						}
					}
				}
			}
			// body
			.el-card__body {
				padding: 0;
				// body盒子
				.card_item{
					padding: 30px;
					text-align: center;
				}
			}
		}
	}
</style>
