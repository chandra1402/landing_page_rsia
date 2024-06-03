<template>
	<section class="flex flex-col sm:justify-between items-center sm:flex-row mt-20 sm:mt-10">
		<div class="relative w-full slide">
			<!-- Your carousel content -->

			<div class="carousel-inner relative overflow-hidden w-full">
				<div v-for="(img, i) in images" :key="i"
					:class="['carousel-item absolute inset-0 transform transition-opacity duration-500 ease-in-out', { 'opacity-100': active === i, 'opacity-0': active !== i }]">
					<div class="card bg-white border border-gray-200 shadow-lg rounded-lg my-4 mx-auto p-4">
						<div class="relative">
							<img v-show="loaded[i]" class="block w-full h-auto object-cover rounded-lg" :src="img"
								:alt="'Slide ' + (i + 1)" @load="onImageLoad(i)" @error="onImageError(i)" />
							<div v-show="!loaded[i]"
								class="flex items-center justify-center h-64 w-full bg-gray-200 rounded-lg">
								<svg class="animate-spin h-10 w-10 text-colorPrimaryDark"
									xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
									<circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor"
										stroke-width="4"></circle>
									<path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8H4z"></path>
								</svg>
							</div>
						</div>
					</div>
					<div
						class="carousel-indicators absolute bottom-0 left-0 right-0 flex h-24 justify-center items-center">
						<ol class="z-50 flex w-4/12 justify-center">
							<li v-for="(img, i) in images" :key="i" @click="clickSlider(i)"
								:class="['md:w-4 md:h-4 bg-gray-300 rounded-full cursor-pointer mx-2', { 'bg-gray-500': active === i }]">
							</li>
						</ol>
					</div>

				</div>

			</div>

			<div :class="['left-4 top-1/2 absolute -translate-y-1/2 inset-0 transform transition-opacity']">
				<button @click="handlePrev"
					class="absolute left-4 top-1/2 transform -translate-y-1/2 bg-colorPrimaryDark hover:bg-colorPrimaryLight p-2 rounded-full z-50">
					<svg class="w-6 h-6 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"
						stroke="currentColor">
						<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7" />
					</svg>

				</button>
				<button @click="handleNext"
					class="absolute  right-4 top-1/2 transform -translate-y-1/2 bg-colorPrimaryDark hover:bg-colorPrimaryLight p-2 rounded-full z-50">
					<svg class="w-6 h-6 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"
						stroke="currentColor">
						<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7" />
					</svg>
				</button>
			</div>

		</div>

	</section>
</template>

<script>
import { ref, onMounted, watchEffect } from 'vue';
import feather from 'feather-icons';

export default {
	name: 'Home',
	setup() {
		const theme = ref(localStorage.getItem('theme') || 'light');
		const images = ref([
			'https://picsum.photos/id/237/1024/800',
			'https://picsum.photos/id/238/1024/800',
			'https://picsum.photos/id/239/1024/800',
		]);
		const loaded = ref([false, false, false]);
		const active = ref(0);
		let intervalId;

		const startCarousel = () => {
			intervalId = setInterval(() => {
				active.value = (active.value + 1) % images.value.length;
			}, 5000);
		};

		const stopCarousel = () => {
			clearInterval(intervalId);
		};

		const handleNext = () => {
			stopCarousel();
			active.value = (active.value + 1) % images.value.length;
			startCarousel();
		};

		const handlePrev = () => {
			stopCarousel();
			active.value = (active.value - 1 + images.value.length) % images.value.length;
			startCarousel();
		};
		const clickSlider = (index) => {
			stopCarousel();
			active.value = index;
			startCarousel();
		};


		const onImageLoad = (index) => {
			loaded.value[index] = true;
		};

		const onImageError = (index) => {
			console.error(`Failed to load image at index ${index}`);
			loaded.value[index] = true; // Handle the error by setting loaded to true
		};

		onMounted(() => {
			feather.replace();
			theme.value = localStorage.getItem('theme') || 'light';
			startCarousel();
		});

		watchEffect(() => {
			feather.replace();
		});

		return {
			theme,
			images,
			loaded,
			active,
			handleNext,
			handlePrev,
			onImageLoad,
			onImageError,
			clickSlider,
		};
	},
};
</script>

<style scoped>
.carousel-indicators {
	bottom: 0;
}

.carousel-item {
	float: left;
	position: relative;
	display: block;
	width: 100%;
	margin-right: -100%;
	backface-visibility: hidden;
}

.carousel-item.left-0 {
	left: 0;
}

.card {
	width: 100%;
	margin: auto;
	border-radius: 8px;
	box-sizing: border-box;
}
</style>
