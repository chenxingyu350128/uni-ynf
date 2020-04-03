<template>
	<view :class="'col-'+col">		
			<slot></slot>
	</view>	
</template>

<script>
	export default {
		name: 'Col',
		props: {
			col: {
				type: [Number, String]
			}         
		}
	}
</script>

<style scoped lang="scss">
	@for $i from 1 through 100 {
		.col-#{$i} {
			width: $i/100*100%
		}
	}

</style>
