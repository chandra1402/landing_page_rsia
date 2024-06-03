<script>
import feather from 'feather-icons';
import ProjectsFilter from './ProjectsFilter.vue';
import ProjectSingle from './ProjectSingle.vue';
import projects from '../../data/projects';
import { urlApi } from '../../urls.js';
import axios from 'axios';

// import { TabulatorFull as Tabulator } from 'tabulator-tables'; //import Tabulator library
export default {
	components: { ProjectSingle, ProjectsFilter },
	data: () => {
		return {
			projects,
			projectsHeading: 'Jadwal Dokter',
			selectedCategory: '',
			searchProject: '',
			jadwal: [],
			totalPages: null,
			perPage: 5,
			currentPage: 1,


		};
	},
	computed: {
		// Get the filtered projects
		filteredProjects() {
			if (this.selectedCategory) {
				return this.filterProjectsByCategory();
			} else if (this.searchProject) {
				return this.filterProjectsBySearch();
			}
			return this.projects;
		},
	},
	mounted() {
		feather.replace();
		this.getJadwalToday()
	},
	methods: {
		async getJadwalToday() {
			try {
				const response = await axios.get(`${urlApi}api/masterdokter/get-all-jadwal?size=${this.perPage}`);
				console.log(response.data.data.last_page);
				this.jadwal = response.data.data.data;
				this.totalPages = response.data.data.last_page;
			} catch (error) {
				console.error('Error fetching data:', error);
			}
		},
		// Filter projects by category
		filterProjectsByCategory() {
			return this.projects.filter((item) => {
				let category =
					item.category.charAt(0).toUpperCase() +
					item.category.slice(1);
				console.log(category);
				return category.includes(this.selectedCategory);
			});
		},
		// Filter projects by title search
		filterProjectsBySearch() {
			let project = new RegExp(this.searchProject, 'i');
			return this.projects.filter((el) => el.title.match(project));
		},
		convertTimeFormat(time) {
			// Memisahkan jam, menit, dan detik dari waktuAwal
			const [jam, menit] = time.split(":").slice(0, 2);

			// Menggabungkan jam dan menit menjadi format waktu yang diinginkan
			return `${jam}:${menit}`;
		}
	},

};
</script>

<template>
	<!-- Projects grid -->
	<section class="pt-10 sm:pt-14">
		<!-- Projects grid title -->
		<div class="text-center">
			<p
				class="font-general-semibold text-2xl sm:text-5xl font-semibold mb-2 text-ternary-dark dark:text-ternary-light">
				{{ projectsHeading }}
			</p>
		</div>

		<!-- Filter and search projects -->
		<div class="mt-10 sm:mt-10">

			<div class="
					flex
					justify-between
					border-b border-primary-light
					dark:border-secondary-dark
					pb-3
					gap-2
				">
				<div class="flex justify-between gap-2">
					<span class="
							hidden
							sm:block
							bg-primary-light
							dark:bg-ternary-dark
							p-2.5
							shadow-sm
							rounded-xl
							cursor-pointer
							">
						<i data-feather="search" class="text-ternary-dark dark:text-ternary-light"></i>
					</span>
					<input v-model="searchProject" class="font-general-medium
						pl-3
						pr-1
						sm:px-4
						py-2
						border-1 border-gray-200
						dark:border-secondary-dark
						rounded-lg
						text-sm
						sm:text-md
						bg-secondary-light
						dark:bg-ternary-dark
						text-primary-dark
						dark:text-ternary-light
						" id="name" name="name" type="search" required="" placeholder="Cari Dokter" aria-label="Name" />
				</div>
				<ProjectsFilter v-if="isVisible = false" @filter="selectedCategory = $event" />
			</div>
		</div>
		<div class="overflow-x-auto">
			<table class="min-w-full divide-y divide-gray-200">
				<!-- Table header -->
				<thead class="bg-gray-50">
					<tr>
						<th scope="col"
							class="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">
							No
						</th>
						<th scope="col"
							class="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">
							Dokter
						</th>
						<th scope="col"
							class="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">
							Poli
						</th>
						<th scope="col"
							class="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">
							Hari
						</th>
						<th scope="col"
							class="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">
							Jam
						</th>
					</tr>
				</thead>
				<!-- Table body -->
				<tbody class="bg-white divide-y divide-gray-200">
					<tr v-for="(user, index) in jadwal" :key="index">
						<td class="px-6 py-4 whitespace-nowrap text-center">
							<!-- User email -->
							<div class="text-sm text-gray-900">{{ index + 1 }}</div>
						</td>
						<td class="px-6 py-4 whitespace-nowrap">
							<div class="flex items-center">
								<div class="ml-4">
									<!-- User name -->
									<div class="text-sm font-medium text-gray-900">{{ user.nm_dokter }}</div>
								</div>
							</div>
						</td>
						<td class="px-6 py-4 whitespace-nowrap">
							<!-- User email -->
							<div class="text-sm text-gray-900">{{ user.nm_poli }}</div>
						</td>
						<td class="px-6 py-4 whitespace-nowrap">
							<!-- User role -->
							<div class="text-sm text-gray-900">{{ user.hari_kerja }}</div>
						</td>
						<td class="px-6 py-4 whitespace-nowrap">
							<!-- User role -->
							<div class="text-sm text-gray-900">{{ convertTimeFormat(user.jam_mulai) }} - {{
					convertTimeFormat(user.jam_selesai) }}</div>
						</td>
					</tr>
				</tbody>
			</table>
		</div>

		<!-- Pagination -->
		<nav class="flex items-center justify-between border-t border-gray-200 px-4 py-3 sm:px-6">
			<div class="flex-1 flex justify-between">
				<!-- Tombol navigasi untuk pergi ke halaman sebelumnya -->
				<button @click="prevPage" :disabled="currentPage === 1"
					:class="{ 'cursor-not-allowed opacity-50': currentPage === 1 }"
					class="relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50">
					Previous
				</button>
				<div class="mt-2 sm:flex-1 sm:flex sm:items-center sm:justify-center">
					<p class="text-sm text-gray-700">
						Page <span class="font-medium">{{ currentPage }}</span> of <span class="font-medium">{{
					totalPages
				}}</span>
					</p>
				</div>
				<!-- Tombol navigasi untuk pergi ke halaman selanjutnya -->
				<button @click="nextPage" :disabled="currentPage === totalPages"
					:class="{ 'cursor-not-allowed opacity-50': currentPage === totalPages }"
					class="ml-3 relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50">
					Next
				</button>
			</div>

		</nav>
		<!-- Projects grid -->
		<div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 mt-6 sm:gap-10">
			<ProjectSingle v-for="project in filteredProjects" :key="project.id" :project="project" />
		</div>
	</section>
</template>

<style scoped></style>
