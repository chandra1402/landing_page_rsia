<template>
	<div :class="appTheme" class="pt-0.5">
		<!-- App header -->
		<AppHeader />

		<!-- Render active component contents with vue transition -->
		<transition name="fade" mode="out-in">
			<router-view :theme="appTheme" />
		</transition>

		<!-- Floating WhatsApp button -->
		<div class="float relative">
			<i class="fa fa-whatsapp my-float" @click="toggleMenu"></i>
			<span class="hidden text-xs absolute -top-8 right-0 text-white">WhatsApp</span>
			<!-- Menu options -->
			<transition enter-active-class="transform transition duration-500 ease-custom"
				enter-class="-translate-y-1/2 scale-y-0 opacity-0"
				enter-to-class="translate-y-0 scale-y-100 opacity-100"
				leave-active-class="transform transition duration-300 ease-custom"
				leave-class="translate-y-0 scale-y-100 opacity-100"
				leave-to-class="translate-y-1/2 scale-y-0 opacity-0">
				<div class="menu absolute bg-white p-2 rounded-lg shadow-md" v-if="isMenuOpen">
					<a href="https://api.whatsapp.com/send?phone=51955081075&text=Hola%21%20Quisiera%20m%C3%A1s%20informaci%C3%B3n%20sobre%20Varela%202."
						target="_blank"
						class="font-general-medium block px-4 py-2 text-sm text-gray-800 hover:bg-gray-200 transition-colors duration-300">Telekonsultasi</a>
					<a href="https://www.example.com/link2" target="_blank"
						class="font-general-medium block px-4 py-2 text-sm text-gray-800 hover:bg-gray-200 transition-colors duration-300">WhatsApp</a>
				</div>
			</transition>
		</div>

		<!-- Scroll to top -->
		<back-to-top visibleoffset="500" right="30px" bottom="20px" class="shadow-lg">
			<i data-feather="chevron-up"></i>
		</back-to-top>

		<!-- App footer -->
		<AppFooter />
	</div>
</template>

<script>
import feather from 'feather-icons';
import AppHeader from './components/shared/AppHeader';
import AppFooter from './components/shared/AppFooter';

export default {
	components: {
		AppHeader,
		AppFooter,
	},
	data() {
		return {
			appTheme: localStorage.getItem('theme'),
			isMenuOpen: false,
		};
	},
	mounted() {
		feather.replace();
		document.addEventListener('click', this.handleClickOutsideFloat);
	},
	beforeUnmount() {
		// Remove the click event listener when the component is destroyed
		document.removeEventListener('click', this.handleClickOutsideFloat);
	},
	methods: {
		toggleMenu() {
			this.isMenuOpen = !this.isMenuOpen;
		},
		handleClickOutsideFloat(event) {
			const floatButton = this.$el.querySelector('.float');
			if (floatButton && !floatButton.contains(event.target)) {
				// Close the menu if it's open
				if (this.isMenuOpen) {
					this.isMenuOpen = false;
				}
			}
		}
	}
};
</script>

<style scoped>
.float {
	position: fixed;
	width: 60px;
	height: 60px;
	bottom: 75px;
	right: 25px;
	background-color: #25d366;
	color: #fff;
	border-radius: 50px;
	text-align: center;
	font-size: 30px;
	line-height: 60px;
	box-shadow: 2px 2px 3px #999;
	cursor: pointer;
	z-index: 100;
	/* Menyembunyikan tanda biru (outline) saat tombol diklik */
	outline: none;
}

.my-float {
	outline: none;
}

.float:focus-visible {
	box-shadow: 0 0 0 3px rgba(0, 0, 0, 0.5);
	/* Atur bayangan (shadow) saat tombol mendapatkan fokus */
}

.float:hover {
	background-color: #128c7e;
}

.menu {
	bottom: calc(100% + 10px);
	right: 25px;
}

.menu a {
	display: block;
	color: #000;
	text-decoration: none;
	padding: 8px 12px;
	transition: background-color 0.3s ease;
}

.menu a:hover {
	background-color: #f0f0f0;
}

#app {
	font-family: Avenir, Helvetica, Arial, sans-serif;
	-webkit-font-smoothing: antialiased;
	-moz-osx-font-smoothing: grayscale;
	text-align: center;
}

.vue-back-to-top {
	@apply p-2 bg-colorPrimaryDark hover:bg-colorPrimaryLight text-white transition duration-500 ease-in-out transform hover:-translate-y-1 hover:scale-110;
	border-radius: 50%;
	font-size: 22px;
	line-height: 22px;
}

.fade-enter-active {
	animation: coming 0.4s;
	animation-delay: 0.2s;
	opacity: 0;
}

.fade-leave-active {
	animation: going 0.4s;
}

@keyframes going {
	from {
		transform: translateX(0);
	}

	to {
		transform: translateX(-10px);
		opacity: 0;
	}
}

@keyframes coming {
	from {
		transform: translateX(-10px);
		opacity: 0;
	}

	to {
		transform: translateX(0px);
		opacity: 1;
	}
}
</style>