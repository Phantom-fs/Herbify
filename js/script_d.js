document.addEventListener('DOMContentLoaded', () => {
    const imageUpload = document.getElementById('imageUpload');
    const predictButton = document.getElementById('predictButton');
    const processedImageContainer = document.querySelector('.processed-image-container');
    const predictionsContainer = document.querySelector('.predictions-container');
    const barGraph = document.getElementById('barGraph');
    const predictionsContainerBar = document.querySelector('.predictions-container-bar');

    predictButton.addEventListener('click', () => {
        // if no image is selected, return
        if (!imageUpload.files.length) {
            return;
        }

        // the file is not an image, return
        if (!['image/jpeg', 'image/jpg', 'image/png'].includes(imageUpload.files[0].type)) {
            alert('Please upload an image file (jpg or png)');
            return;
        }

        predictButton.disabled = true;
        predictButton.textContent = 'Predicting...';

        const preUrl = 'https://herb-v1-755f674883eb.herokuapp.com/pre_image';
        const url = "https://herb-v1-755f674883eb.herokuapp.com/predict"

        const file = imageUpload.files[0];
        const reader = new FileReader();

        reader.onloadend = () => {
            const imageBytes = new Uint8Array(reader.result);
            const formData = new FormData();
            formData.append('file', new Blob([imageBytes], { type: 'image/jpeg' }), file.name);

            fetch(preUrl, {
                method: 'POST',
                body: formData
            })
            .then(response => response.json())
            .then(data => {
                const processedImage = document.getElementById('processedImage');
                processedImage.src = `data:image/jpeg;base64,${data.preprocessed_image}`;
                processedImageContainer.classList.remove('hidden');
            })
            .catch(error => {
                console.error('Error:', error);
            })
            .finally(() => {
                predictButton.disabled = false;
                predictButton.textContent = 'Predict';
            });

            
            fetch(url, {
                method: 'POST',
                body: formData
            })
            .then(response => response.json())
            .then(data => {
                const predictionsList = document.getElementById('predictionsList');
                
                predictionsList.innerHTML = '';

                // if the model is not confident enough, return
                if (data.probabilities[0] < 0.2) {
                    alert('The model is not confident enough to make a prediction. Please try another image.');
                    return;
                }

                // data in JSON format {'class_labels': top5_labels, 'probabilities': top5}
                for (let i = 0; i < data.class_labels.length; i++) {
                    const row = document.createElement('tr');

                    // Label cell
                    const labelCell = document.createElement('td');
                    labelCell.textContent = data.class_labels[i];
                    row.appendChild(labelCell);

                    // Probability cell
                    const probabilityPercentage = (data.probabilities[i] * 100).toFixed(2); // Convert to percentage and round to 2 decimal points
                    const probabilityCell = document.createElement('td');
                    probabilityCell.textContent = `${probabilityPercentage}%`;
                    row.appendChild(probabilityCell);

                    predictionsList.appendChild(row);
                }

                predictionsContainer.classList.remove('hidden');


                // --------------- Bar Graph ---------------
                barGraph.innerHTML = '';

                // data in JSON format {'class_labels': top5_labels, 'probabilities': top5}
                for (let i = 0; i < data.class_labels.length; i++) {
                    const bar = document.createElement('div');
                    bar.className = 'bar';

                    // Bar Label
                    const label = document.createElement('div');
                    label.className = 'bar-label';
                    label.textContent = data.class_labels[i];
                    bar.appendChild(label);

                    // Bar Percentage
                    const probabilityPercentage = (data.probabilities[i] * 100).toFixed(2); // Convert to percentage and round to 2 decimal points
                    const percentage = document.createElement('div');
                    percentage.className = 'bar-percentage';
                    percentage.style.width = `${probabilityPercentage}%`;
                    bar.appendChild(percentage);

                    // Bar Value
                    const value = document.createElement('div');
                    value.className = 'bar-value';
                    value.textContent = `${probabilityPercentage}%`;
                    value.style.width = '60px';
                    bar.appendChild(value);

                    barGraph.appendChild(bar);
                }

                // Show the predictions bar container
                predictionsContainerBar.classList.remove('hidden');

            })
            .catch(error => {
                console.error('Error:', error);
            })
            .finally(() => {
                predictButton.disabled = false;
                predictButton.textContent = 'Predict';
            });
        };

        if (file) {
            reader.readAsArrayBuffer(file);
        }
    });
});