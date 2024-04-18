# HERBIFY (Herb Identification Website)

## Overview

Herbs have been utilized for centuries for their medicinal properties and culinary uses. Our website aims to help users identify over 90 types of common herbs found worldwide. By simply uploading a photo of the herb you wish to identify, our deep learning model will accurately classify the herb, providing you with the top 5 predictions made by the model.

## Features

- **Herb Identification**: Upload a photo of a herb to identify it from over 90 common types.
- **Leaf Extracted Picture**: View the processed leaf-extracted image, with white background.
- **Top 5 Predictions**: View the top 5 predictions made by our CNN model.
- **User-Friendly Interface**: Easy-to-use interface designed for seamless navigation.
- **Security**: Multiple exception cases are covered.

## Technologies Used

- **Frontend**: HTML, CSS, JavaScript
- **Backend**: Python based server
- **Model**: Transfer Learning applied PyTorch Pretrained CNN Model
- **Application Server**: Deployed on Heroku (web server + model API)

## How It Works

1. **Upload Photo**: Navigate to the website and upload a clear photo of the herb you want to identify.
2. **Processed Image**: A series of meticulous preprocessing steps is applied to the uploaded image, and the processed image is displayed.
3. **Prediction**: Our deep learning model will process the image and provide the top 5 predictions for the herb's identity.
4. **View Results**: Browse through the predictions to identify the herb accurately.

## Team
- ***[Farhan Sheth](https://www.linkedin.com/in/farhan-sheth/)***
- ***[Manvendra Jasra](https://www.linkedin.com/in/manvendra-jasra/)***
- ***[Ishika Chatter](https://www.linkedin.com/in/ishika-chatter/)***

### The code for the deployed Application server on heroku is available on the [Herbify Application Server](https://github.com/Phantom-fs/Herbify-Application-Server) repository.