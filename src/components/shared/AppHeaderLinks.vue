<template>
	<div :class="isOpen ? 'block' : 'hidden'"
		class="m-0 sm:ml-4 mt-5 sm:mt-3 sm:flex p-5 sm:p-0 justify-center items-center shadow-lg sm:shadow-none">
		<router-link to="/projects"
			class="font-general-medium block text-left text-lg font-medium text-primary-dark dark:text-ternary-light hover:text-colorPrimaryDark dark:hover:text-colorPrimaryLight sm:mx-4 mb-2 sm:py-2"
			aria-label="Projects">Home</router-link>
		<router-link to="/about"
			class="font-general-medium block text-left text-lg font-medium text-primary-dark dark:text-ternary-light hover:text-colorPrimaryDark dark:hover:text-colorPrimaryLight sm:mx-4 mb-2 sm:py-2 border-t-2 pt-3 sm:pt-2 sm:border-t-0 border-primary-light dark:border-secondary-dark"
			aria-label="About Me">Jadwal Dokter</router-link>
		<div class="relative mr-5">
			<button
				class="font-general-medium text-left text-lg font-medium text-primary-dark dark:text-ternary-light hover:text-colorPrimaryDark dark:hover:text-colorPrimaryLight sm:mx-4 mb-2 sm:py-2 border-t-2 pt-3 sm:pt-2 sm:border-t-0 border-primary-light dark:border-secondary-dark flex items-center justify-between w-full"
				@click="isOptionsExpanded = !isOptionsExpanded" @blur="isOptionsExpanded = false">
				<span>Profile RS</span>
				<svg fill="none" viewBox="0 0 24 24" stroke="currentColor"
					class="h-4 w-4 transform transition-transform duration-200 ease-in-out"
					:class="isOptionsExpanded ? 'rotate-180' : 'rotate-0'">
					<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7" />
				</svg>
			</button>
			<transition enter-active-class="transform transition duration-500 ease-custom"
				enter-class="-translate-y-1/2 scale-y-0 opacity-0"
				enter-to-class="translate-y-0 scale-y-100 opacity-100"
				leave-active-class="transform transition duration-300 ease-custom"
				leave-class="translate-y-0 scale-y-100 opacity-100"
				leave-to-class="-translate-y-1/2 scale-y-0 opacity-0">
				<ul v-show="isOptionsExpanded" ref="dropdown"
					class="absolute left-0 right-0 mt-2 bg-white divide-y rounded-lg shadow-lg overflow-hidden z-50">
					<li><a href="#" @click="showModal"
							class="font-general-medium block px-4 py-2 text-sm text-gray-800 hover:bg-gray-200 transition-colors duration-300">Profile
							RSI Widyaningsih</a></li>
					<li><a href="#"
							class="font-general-medium block px-4 py-2 text-sm text-gray-800 hover:bg-gray-200 transition-colors duration-300">Visi
							Misi</a></li>
					<li><a href="#"
							class="font-general-medium block px-4 py-2 text-sm text-gray-800 hover:bg-gray-200 transition-colors duration-300">Kontak</a>
					</li>
				</ul>
			</transition>
		</div>
		<router-link to="/about"
			class="font-general-medium block text-left text-lg font-medium text-primary-dark dark:text-ternary-light hover:text-colorPrimaryDark dark:hover:text-colorPrimaryLight sm:mx-4 mb-2 sm:py-2 border-t-2 pt-3 sm:pt-2 sm:border-t-0 border-primary-light dark:border-secondary-dark"
			aria-label="About Me">Karir</router-link>
		<div class="border-t-2 pt-3 sm:pt-0 sm:border-t-0 border-primary-light dark:border-secondary-dark">
			<button
				class="font-general-medium sm:hidden block text-left text-md font-medium bg-colorPrimaryDark hover:bg-colorPrimaryLight text-white shadow-md rounded-md px-4 py-2 mt-2 duration-500"
				@click="showModal" aria-label="Daftar Online Button">
				Daftar Online
			</button>
		</div>
	</div>
</template>

<script>
export default {
	props: {
		showModal: {
			type: Function,
			default: () => { }
		},
		isOpen: {
			type: Boolean,
			default: false
		}
	},
	data() {
		return {
			isOpenDropdown: false,
			isOptionsExpanded: false,
			selectedOption: "Daftar Online",
			options: ["Daftar Online", "Telekonsultasi"]
		};
	},
	methods: {
		setOption(option) {
			this.selectedOption = option;
			this.isOptionsExpanded = false;
		},
		toggleDropdown() {
			this.isOpenDropdown = !this.isOpenDropdown;
			console.log('Clicked outside dropdown' + this.isOpenDropdown);
		},
		handleClickOutside(event) {
			const dropdownElement = this.$refs.dropdown;
			if (dropdownElement && !dropdownElement.contains(event.target)) {
				console.log('Event target:', event.target);
				this.isOpenDropdown = false;
				console.log('isOpenDropdown set to false:', this.isOpenDropdown);
			}
		}
	},
	mounted() {
		document.addEventListener('click', this.handleClickOutside);
	},
	beforeUnmount() {
		document.removeEventListener('click', this.handleClickOutside);
	}
};
</script>

<style scoped></style>