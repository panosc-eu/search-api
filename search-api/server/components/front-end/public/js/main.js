var vm = new Vue({
	el: "#app",
	data: {
		freeTextSearch: "",
		searchResult: []				
	},
	methods: {
		handleFreeTextSearch: function() {
			axios.get("/api/Datasets").then(res => this.searchResult = res.data);
		}
	}
});
