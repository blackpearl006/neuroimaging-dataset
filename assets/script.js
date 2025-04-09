new Vue({
    el: '#app',
    data() {
        return {
            datasets: [],
            showModal: false,
            selectedDataset: {}
        };
    },
    mounted() {
        fetch('assets/datasets.csv')
            .then(response => response.text())
            .then(data => {
                this.datasets = this.parseCSV(data);
            });
    },
    methods: {
        parseCSV(data) {
            const rows = data.split('\n').slice(1);
            return rows.map(row => {
                const [name, sexRatio, participants, description, images] = row.split(',');
                return { name, sexRatio, participants, description, images };
            });
        },
        viewDetails(dataset) {
            this.selectedDataset = dataset;
            this.showModal = true;
        },
        closeModal() {
            this.showModal = false;
        },
        hoverCard(dataset) {
            dataset.hovered = true;
        },
        leaveCard(dataset) {
            dataset.hovered = false;
        }
    }
});
