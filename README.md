# Encrypt-pixels

## How to install it locally

### Frontend

1. Go to the frontend dir

```bash
cd frontend/
```

2. Install all the packages

```bash
npm install
```

3. Run the server

```bash
npm run dev
```

### Backend

1. Go to backend dir

```bash
cd backend/
```

2. Install all the required packages

```bash
pip install -r requirements.txt
```

3. Run the `main.py` file

```bash
python main.py
```

# Devfolio

## Project name

Encrypt pixels

## Tagline

Protect every pixels of your data with encrypt pixels

## Problem it solves

In contemporary healthcare practices, the seamless transfer of medical images between different medical centers has become imperative for the exchange of knowledge and experiences. This process not only facilitates patient follow-up when transitioning between centers but also ensures the continuity of patient research studies, even if the patient relocates to a new medical facility. When medical images are transmitted between centers, the paramount concern is safeguarding patient information from unauthorized manipulation. This is a top priority for electronic medical centers, necessitating the implementation of robust security measures.

Encryption and decryption, as a technique for embedding and extracting information within medical data, have garnered significant attention. To thwart potential attackers from extracting or manipulating the watermark, it is crafted in alignment with the objectives of the encryption and decryption program, adding complexity and uniqueness to its content.

## Challenges we ran into

Implementing machine learning with FastAPI for extracting medication data from medical images (such as iris and X-rays) presented several challenges:

1. **Model Integration:** Integrating machine learning models into FastAPI required careful consideration of architecture, deployment, and framework compatibility.

2. **Data Preprocessing:** Extracting medication data from diverse medical images involved challenges in standardizing input data through robust preprocessing techniques.

3. **Model Training and Optimization:** Balancing model accuracy with resource constraints and response time in a real-time API environment was a key challenge.

4. **Security and Privacy:** Ensuring data security and privacy, especially with sensitive medical images, demanded a robust approach.

5. **Handling Image Variations:** Addressing variations in image quality due to equipment differences and patient-specific factors posed challenges.

6. **Scalability:** Optimizing the FastAPI application for scalability and efficient handling of concurrent requests required careful design.

7. **User Interface Design:** Designing a user-friendly interface for healthcare professionals and ensuring accessibility presented challenges.

Despite these challenges, the project aimed to create a robust solution, leveraging machine learning to extract medication data accurately from diverse medical images securely and efficiently.

## Technologies we use

Our project utilizes Python for versatility and TensorFlow for machine learning. Amazon S3 manages secure storage, and bchlib ensures data integrity. FastAPI powers the backend, MongoDB serves as our NoSQL database, and Next.js enhances the frontend. Tailwind CSS refines aesthetics, while Shadcn adds advanced visual effects. This streamlined tech stack seamlessly integrates machine learning, cloud storage, web development, and data management for an efficient and optimal solution.
