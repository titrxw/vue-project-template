<template>
<div class="screen">
  <div class="search-sort">
    <section class="sort_container">
				<slot></slot>
    </section>
  </div>
	<slot name="list"></slot>
</div>
</template>
<script>
export default {
  data () {
    return {}
  }
}
</script>
<style>
.screen{
	height:100%;
}
.sort_container{
		background-color: #fff;
		border-bottom: 0.025rem solid #f1f1f1;
		position: fixed;
		top: 2.7rem;
		right: 0;
		width: 100%;
		display: flex;
		z-index: 13;
		box-sizing: border-box;
	}
</style>
