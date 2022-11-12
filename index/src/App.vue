<template>
	<el-backtop :right="30" :bottom="80" />
	<el-card shadow="hover" class="box-card">
		<template #header>
			<div class="card-header">
				<el-row :gutter="0">
					<!-- 首页 -->
					<el-col :span="8" align="left">
						<el-link href="https://bencky1017.github.io/" :underline="false" target="_blank">
							<el-tooltip effect="dark" :content="backhome" placement="right">
								<el-button>{{home}}</el-button>
							</el-tooltip>
						</el-link>
					</el-col>
					<!-- 标题 -->
					<el-col :span="8" align="center">
						<el-link href="/">
							<div class="header_title">{{header_title}}</div>
						</el-link>
					</el-col>
					<!-- 保存 -->
					<el-col :span="4" align="right">
						<el-button class="button" type="primary" v-if="isSave" @click="save_yes(),isSave=0">
							<el-icon class="el-icon--left hidden-sm-and-down"><Checked /></el-icon>{{save}}
						</el-button>
					</el-col>
					<!-- 选项 -->
					<el-col :span="4" align="right">
						<el-dropdown trigger="click" :hide-on-click="true" v-if="!isSave">
							<el-button class="button">{{option}}
								<el-icon class="el-icon--right hidden-sm-and-down"><arrow-down /></el-icon>
							</el-button>
							<template #dropdown>
								<el-dropdown-menu>
									<el-dropdown-item @click="isSave=1">
										<el-icon><Edit /></el-icon>{{edit}}
									</el-dropdown-item>
									<el-dropdown-item divided>
										<el-icon><InfoFilled /></el-icon>{{help}}
									</el-dropdown-item>
								</el-dropdown-menu>
							</template>
						</el-dropdown>
						<el-button v-if="isSave" @click="save_cancel(),isSave=0">
							<el-icon class="el-icon--left hidden-sm-and-down"><Close /></el-icon>{{cancel}}
						</el-button>
					</el-col>
					<!-- 结束 -->
				</el-row>
			</div>
		</template><!-- <el-divider /> -->

		<!-- 追更表卡片 -->
		<div class="common-layout">
			<el-space direction="vertical" size="large" :fill="true">
				<el-card class="inner-box-card"
					v-for="(item,index) in week"
					:key="index"
					:cardindex="index"
					shadow="always">
					<template #header>
						<el-row justify="space-between">
							<el-col :span='4'></el-col>
							<el-col :span='4'>{{item}}</el-col>
							<el-col :span='4'>
								<el-button class="button-edit" type="primary" v-if="isSave"
									@click="isDisplay[index]=true,isEdit=true">{{edit}}</el-button>
							</el-col>
						</el-row>
					</template>
					<el-space class="inner-box-list" wrap :size="12">
						<el-link v-for="(subitem,subindex) in gridData[index].list" :key="subindex"
							:href="subitem.link" target="_blank" :underline="false">
							<el-badge value="new">
								<el-button type="primary" plain>{{subitem.name}}</el-button>
							</el-badge>
						</el-link>
					</el-space>
				</el-card>
			</el-space>
		</div>
	</el-card>

	<el-dialog v-for="(item,index) in week" :key="index"
		v-model="isDisplay[index]"
		align-center
		:show-close="false" 
		:close-on-click-modal="!false"
		:draggable='!true'>
		<!-- 表头自定义 -->
		<template #header>
			<el-row justify="space-between" style="align-items: center">
				<el-col :span="3" />
				<el-col :span="8">
					<h2>{{item}}剧集表</h2>
				</el-col>
				<el-col :span="3">
					<el-button type="info"
						@click="isDisplay[index]=!true,isEdit=true" text size="large">
						<el-icon><Close /></el-icon>
					</el-button>
				</el-col>
			</el-row>
		</template>
		
		<el-table :data="gridData[index].list" style="width: 100%;height: 300px;" scrollbar-always-on>
			<!-- 名称栏 -->
			<el-table-column prop="name" label="名称">
				<template #default="scope">
					<el-tooltip effect="dark" :content="scope.row.name" placement="left">
						<el-input v-if="isEdit" v-model="scope.row.name" size="small" disabled></el-input>
						<el-input v-else v-model="scope.row.name" size="small" clearable maxlength="10"></el-input>
					</el-tooltip>
				</template>
			</el-table-column>
			<!-- 链接栏 -->
			<el-table-column prop="link" label="链接">
				<template #default="scope">
					<el-input v-if="isEdit" v-model="scope.row.link" size="small" disabled></el-input>
					<el-input v-else v-model="scope.row.link" size="small" clearable></el-input>
				</template>
			</el-table-column>
			<!-- 操作栏 -->
			<el-table-column prop="delete" label="操作" width="100">
				<!-- 编辑保存按钮 -->
				<template #header>
					<el-button class="el-icon--left" type="primary" size="small" v-if="isEdit"
						@click="isEdit=!isEdit"><el-icon><Edit /></el-icon>{{edit}}
					</el-button>
					<el-button class="el-icon--left" type="primary" size="small" v-else
						@click="isEdit=!isEdit,save_yes()"><el-icon><Select /></el-icon>{{save}}
					</el-button>
				</template>
				<!-- 删除按钮 -->
				<template #default="scope">
					<!-- <el-button type="primary" size="small" @click="handleEdit(scope.$index, scope.row),isEdit=!isEdit"><el-icon><Edit v-if="isEdit"/><Select v-else/></el-icon></el-button> -->
					<el-button class="el-icon--left" type="danger" size="small"
						@click="delrow(index,scope.$index)"
						:disabled="isEdit">
						<el-icon><CloseBold /></el-icon>{{delete}}
					</el-button>
				</template>
			</el-table-column>
		</el-table>
		<el-button style="width: 100%" v-if="isEdit" @click="addrow(index),isEdit=!true" disabled>{{additem}}</el-button>
		<el-button style="width: 100%" v-else @click="addrow(index),isEdit=!true">{{additem}}</el-button>
	</el-dialog>
</template>


<script>
	// import {Edit} from '@element-plus/icons-vue'
	import '../node_modules/element-plus/theme-chalk/display.css' //基于断点的隐藏类
	import {ElMessage} from 'element-plus' //Message 消息提示
	import {ref} from 'vue'

	export default {
		data() {
			return {
				home: '吟风极客',
				backhome: "回到首页",
				header_title: "追剧日历",
				option: "选项",
				save: "保存",
				cancel: "取消",
				edit: '编辑',
				delete: '删除',
				help: '帮助',
				additem: '添加记录',
				week: ['周日', '周一', '周二', '周三', '周四', '周五', '周六'],
				isSave: !true,
				isEdit: true,
				dialogFormVisible: false,
				dialogTableVisible: false,
				isDisplay:ref([false,false,false,false,false,false,false]),

				// data:[
				// 	{
				// 		Sun:'',
				// 		Mon:'',
				// 		Tues:'',
				// 		Wed:'',
				// 		Thur:'',
				// 		Fri:'',
				// 		Sat:''
				// 	}
				// ],

				gridData: ref([{
						week: "周日",
						// data:new Date().getDate(),
						data: false,
						list: [{
								date: '2016-05-02',
								name: '懒猫的狮子倒影',
								link: 'https://www.baidu.com/'
							},
							{
								date: '2016-05-04',
								name: '懒猫的狮子倒影',
								link: 'https://element-plus.gitee.io/zh-CN/component/space.html#space-属性'
							}
						]
					},
					{
						week: "周一",
						data: false,
						list: [{
								date: '2016-05-04',
								name: '懒猫的狮子倒影',
								link: 'https://element-plus.gitee.io/zh-CN/component/space.html#space-属性'
							},
							{
								date: '2016-05-03',
								name: '非谷',
								link: 'https://www.baidu.com/'
							},
							{
								date: '2016-05-01',
								name: '非谷',
								link: 'https://www.baidu.com/'
							},
							{
								date: '2016-05-03',
								name: '非谷',
								link: 'https://www.baidu.com/'
							}
						]
					},
					{
						week: "周二",
						data: false,
						list: [{
							date: '2016-05-05',
							name: '非谷',
							link: 'https://www.baidu.com/'
						}]
					},
					{
						week: "周三",
						data: false,
						list: [{
								date: '2016-05-01',
								name: '非谷',
								link: 'https://www.baidu.com/'
							},
							{
								date: '2016-05-03',
								name: '非谷',
								link: 'https://www.baidu.com/'
							}
						]
					},
					{
						week: "周四",
						data: false,
						list: [{
							date: '2018-05-04',
							name: '懒猫的狮子倒影',
							link: 'https://element-plus.gitee.io/zh-CN/component/space.html#space-属性'
						}]
					},
					{
						week: "周五",
						data: false,
						list: [{
								date: '2019-10-15',
								name: '懒猫的狮子倒影',
								link: 'https://element-plus.gitee.io/zh-CN/component/space.html#space-属性'
							},
							{
								date: '2016-05-03',
								name: '非谷',
								link: 'https://www.baidu.com/'
							}
						]
					},
					{
						week: "周六",
						data: false,
						list: [{
								date: '2018-12-15',
								name: '懒猫的狮子倒影',
								link: 'https://element-plus.gitee.io/zh-CN/component/space.html#space-属性'
							},
							{
								date: '2016-05-03',
								name: '非谷',
								link: 'https://www.baidu.com/'
							},
							{
								date: '2016-05-01',
								name: '非谷',
								link: 'https://www.baidu.com/'
							},
							{
								date: '2016-05-03',
								name: '非谷',
								link: 'https://www.baidu.com/'
							}
						]
					}
				])
			}
		},
		methods: {
			getitem() {

			},
			setitem() {

			},
			save_yes() {
				ElMessage({
					type: 'success',
					message: '保存成功！',
					icon: '',
					showClose: false,
					grouping: true
				})
			},
			save_cancel() {
				ElMessage({
					type: 'error',
					message: '取消编辑！',
					icon: '',
					showClose: false,
					grouping: true
				})
			},
			handleEdit(index, row) {
				console.log(index, row)
			},
			addrow(index) {
				var list = {
					date: this.date,
					name: this.name,
					link: this.link
				}
				this.gridData[index].list.push(list)
			},
			delrow(index,row) {
				console.log(index),
				console.log(row),
				this.gridData[index].list.splice(row, 1)
			},
		},
	}
</script>

<style>
	.box-card {
		min-width: 450px;
		max-width: 600px;
		/* background: url('assets/bg.jpg') repeat fixed center;
		filter: blur(0px); */
	}

	.header_title {
		font-size: 32px;
		line-height: 32px;
		font-weight: bold;
		text-align: center;
		color: var(--el-color-primary, #409eff, #73AEFF);
		user-select: none;
	}

	.inner-box-card .button-edit {
		height: 30.9px;
		/* 强行控制高度为32px */
	}

	.inner-box-card .el-card__header .el-col {
		line-height: 32px;
		text-align: center;
	}

	.inner-box-card .el-card__header .el-row {
		/* padding: 0px 20px; */
	}

	.inner-box-card .el-card__header {
		/* width: 580px; */
		max-width: 558px;
		padding: 10px 10px;
	}

	.inner-box-card .el-card__body {
		min-width: 360px;
	}

	.inner-box-list .el-button {
		/* max-width: 80px; */
	}

	.el-badge__content.is-fixed {
		position: absolute;
		top: 0;
		right: calc(10px + var(--el-badge-size)/ 2);
		transform: translateY(-50%) translateX(100%);
		z-index: 1;
	}


	.el-row,
	.el-col,
	.el-button,
	.el-link,
	.el-dropdown,
	.el-dropdown-menu__item,
	.el-message,
	.el-dialog__header,
	.el-popper {
		user-select: none;
	}

	.el-dialog {
		min-width: 450px;
	}

	.el-table__cell {
		word-wrap: normal;
	}

	.el-dialog__body {
		padding-top: 0px;
	}
</style>
