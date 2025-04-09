new Vue({
    el: '#app',
    data() {
        return {
            datasets: [],
            showModal: false,
            selectedDataset: null, // Use null instead of an empty object for clarity
        };
    },
    mounted() {
        this.loadDatasets();
    },
    methods: {
        async loadDatasets() {
            try {
                const response = await fetch('assets/DATASET_3T_count.csv');
                const data = await response.text();
                this.datasets = this.parseCSV(data);
            } catch (error) {
                console.error('Error loading datasets:', error);
            }
        },
        parseCSV(data) {
            const rows = data.split('\n').slice(1).filter(row => row.trim() !== '');
            return rows.map(row => {
                const columns = row.split(',');
                if (columns.length < 13) {
                    console.warn('Skipping malformed row:', row);
                    return null;
                }
                const [DATASET, CDRGLOB, SUBJECT, SCANS, MALES, FEMALES, MINAGE, MAXAGE, MEANAGE, STD, Median, Q25, Q75, LINK] = columns;
                return { 
                    name: DATASET?.trim() || 'Unknown', 
                    cdrGlobal: CDRGLOB?.trim() || 'N/A',
                    subject: SUBJECT?.trim() || 'N/A',
                    scans: SCANS?.trim() || 'N/A',
                    males: MALES?.trim() || 'N/A',
                    females: FEMALES?.trim() || 'N/A',
                    minAge: parseFloat(MINAGE)?.toFixed(2) || 'N/A',
                    maxAge: parseFloat(MAXAGE)?.toFixed(2) || 'N/A',
                    meanAge: parseFloat(MEANAGE)?.toFixed(2) || 'N/A',
                    stdDev: parseFloat(STD)?.toFixed(2) || 'N/A',
                    median: parseFloat(Median)?.toFixed(2) || 'N/A',
                    q25: parseFloat(Q25)?.toFixed(2) || 'N/A',
                    q75: parseFloat(Q75)?.toFixed(2) || 'N/A',
                    link: LINK?.trim() || 'N/A',
                    hovered: false // Add hovered property directly
                };
            }).filter(dataset => dataset !== null);
        },
        parseCSV_old(data) {
            const rows = data.split('\n').slice(1).filter(row => row.trim() !== '');
            return rows.map(row => {
                const [name, sexRatio, participants, description, images] = row.split(',');
                return { 
                    name: name.trim(), 
                    sexRatio: sexRatio.trim(), 
                    participants: participants.trim(), 
                    description: description.trim(), 
                    images: images.trim(), 
                    hovered: false // Add hovered property directly
                };
            });
        },
        viewDetails(dataset) {
            this.selectedDataset = dataset;
            this.showModal = true;
        },
        closeModal() {
            this.showModal = false;
            this.selectedDataset = null; // Clear selected dataset when modal is closed
        },
        toggleHover(dataset, isHovered) {
            dataset.hovered = isHovered;
        }
    }
});
