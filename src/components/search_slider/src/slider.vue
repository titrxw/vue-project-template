<template>
    <section class="search_slider_container">
			<section class="tab">
				<div class="search_slider_item_container" @click="chooseType(iindex)" v-for="(item, iindex) in screenList" :key="iindex">
					<div :class="{'search_slider_item' : (screenList.length - 1) !== iindex}">
						<span :class="{category_title: iindex == index && index >= 0}" :style="iindex == index && index >= 0 ? 'color:' + color : ''">{{ item.text }}</span>
						<svg width="10" height="10" xmlns="http://www.w3.org/2000/svg" version="1.1" v-if="iindex == index && index >= 0" :style="'fill:' + color" class="active_search_slider_icon">
							<polygon points="0,3 10,3 5,8"/>
						</svg>
						<svg width="10" height="10" xmlns="http://www.w3.org/2000/svg" version="1.1" v-else class="search_slider_icon">
							<polygon points="0,3 10,3 5,8"/>
						</svg>
					</div>
				</div>
			</section>
			<section class="search-history margin-top-common" v-show="active === false && tmpHistory.length > 0">
				<div class="history-item" v-for="(item, index) in tmpHistory" :key="index" v-if="item !== ''">
					<span class="item">{{ item }}</span>
					<span class="del-item" @click="delHistory(index)">x</span>
				</div>
			</section>
			<section class="search_slider_content">
				<slot></slot>
			</section>
      <slot name="masker"></slot>
			<div class="masker" v-show="active && sysMasker" @click="close">
			</div>
			<section class="list" :class="tmpHistory.length > 0 ? '': 'margin-top-common'">
				<slot name="list"></slot>
			</section>
    </section>
</template>
<script>
export default {
	name: 'yd-search-slider',
	props: {
		value: {
			type: Number,
			default: -1
		},
		history: {
			type: Array,
			default: function () {
				return []
			}
    },
    color: {
      type: String,
      default: '#a565ff'
    }
	},
  data () {
    return {
			screenList: [],
			panels: [],
			active: false,
			tmpHistory: [],
			index: -1
		}
	},
	methods: {
		close () {
			this.active = false
			this.chooseType(-1)
    },
		addItem (itemData) {
			this.screenList.push({
				text: itemData.text
			})
			this.$children[this.screenList.length - 1].setIndex(this.screenList.length - 1)
		},
		getPanels() {
			return this.$children.filter(item => item.$options.name === 'yd-screen-item');
		},
		chooseType (index) {
			let panels = this.getPanels()
      if (index >= 0) {
				panels[index].active = true
				this.active = true
				this.index = index
				this.$emit('input', index)
			}
			panels.forEach((panel, pindex) => {
				if (pindex !== index) {
					panel.active = false
				}
			})
			this.$emit('on-item-click', index)
		},
		delHistory (index) {
			this.tmpHistory = this.tmpHistory.slice(0, index).concat(this.tmpHistory.slice(index + 1))
			this.$emit('on-history-update')
    },
		setItemText (index, val) {
			this.$set(this.screenList, index, {
				text: val
			})
		}
	},
	computed: {
		sysMasker () {
      if (this.$slots['masker']) {
        return false;
      }
      return true;
		}
	},
	watch: {
		history (val) {
			this.tmpHistory = val
		}
	},
	mounted: function () {
		this.tmpHistory = this.history
	}
}
</script>
<style lang="less" scoped>
@border-color: #f1f1f1;
.search_slider_container{
	background-color: #fff;
	border-bottom: 0.025rem solid @border-color;
	right: 0;
	width: 100%;
	z-index: 13;
	box-sizing: border-box;
	height: 100%;
	overflow: hidden;
	.tab{
		display: flex;
		position: absolute;
		width: 100%;
		z-index: 115;
		height: .8rem;
		border-bottom:1px solid @border-color;
		.search_slider_item_container{
			width: 100%;
			height: 100%;
			position: relative;
			z-index: 14;
			background-color: #fff;
			box-sizing: border-box;
			padding-top: .25rem;
			text-align: center;
			padding-bottom: .25rem;
			overflow: hidden;
			.search_slider_item{
				height: .4rem;
				border-right: 0.025rem solid @border-color;
				text-overflow: ellipsis;
				white-space: nowrap;
				overflow: hidden;
				svg{
					vertical-align: middle;
					transition: all .3s;
				}
				.search_slider_icon{
					fill:#666;
				}
				.active_search_slider_icon{
					transform: rotate(180deg);
				}
			}
		}
	}
	.search_slider_content{
		z-index: 100;
		height: auto;
	}
	.masker{
		position: fixed;
		width: 100%;
		left: 0px;
		height: 100%;
		background: rgba(0,0,0,0.5);
		z-index: 11;
	}
	.list, .search-history{
		position: relative;
	}
	.list{
		z-index: 1;
		height: 100%;
		overflow: auto;
	}
	.search-history{
		width: 100%;
		padding: 0.1rem;
		background: #fff;
		display: flex;
		overflow: hidden;
		overflow-x: auto;
		border-bottom: 1px solid @border-color;
		height: 43px;
		.history-item{
			height: 24px;
			margin-left:2px;
			margin-top:3px;
			background: #fff;
			display: flex;
			border-radius: 5px;
			padding: 4px;
    	padding-top: 3px;
			border: 1px solid @border-color;
		}
		.del-item{
			margin-left: 5px;
			color: #bbb;
		}
	}
	.margin-top-common{
		margin-top:.8rem;
	}
}

</style>
