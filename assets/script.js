new Vue({
    el: '#app',
    data() {
        return {
            datasets: []
        };
    },
    mounted() {
        // Fetch the CSV file from the assets folder
        fetch('assets/datasets.csv')
            .then(response => response.text())
            .then(data => {
                this.datasets = this.parseCSV(data);
            });
    },
    methods: {
        parseCSV(data) {
            const rows = data.split('\n').slice(1); // Skip header row
            return rows.map(row => {
                const [name, sexRatio, participants, description, images] = row.split(',');
                return { name, sexRatio, participants, description, images };
            });
        },
        viewDetails(dataset) {
            alert(`Dataset Details:\nName: ${dataset.name}\nDescription: ${dataset.description}`);
        }
    }
  });
  