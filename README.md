# Node.js CI/CD Pipeline

This repository contains a simple Node.js application along with a CI/CD pipeline setup using GitLab CI/CD. The pipeline automates the process of running tests, building a Docker image, and deploying the application to a Kubernetes cluster. Notifications are sent via email on deployment success or failure.

## Project Structure

- `index.js`: A simple Express-based Node.js application.
- `package.json`: Contains project metadata and dependencies, including `jest` for testing and `supertest` for HTTP assertions.
- `Dockerfile`: A Dockerfile to build the application image and run it in a container.
- `test/app.test.js`: A test file that uses `jest` and `supertest` to test the application.
- `k8s/deployment.yaml`: Kubernetes Deployment configuration for deploying the application.
- `k8s/service.yaml`: Kubernetes Service configuration to expose the application.
- `.gitlab-ci.yml`: GitLab CI/CD configuration file defining the build, test, dockerize, and deploy stages.

## Approach

The CI/CD pipeline is designed to automate the following processes:

### 1. Running Tests
   The pipeline runs tests automatically on pull requests to ensure that the application behaves as expected. The tests are defined in the `test/app.test.js` file using `jest` and `supertest`. The following command is executed to run the tests:
   ```
   npm test 
   ```

### 2. Building and Pushing Docker Image
After successful test execution, the pipeline builds a Docker image of the application using the Dockerfile in the root directory. The image is then pushed to Docker Hub using the following steps: 
```
docker build -t <DOCKER_IMAGE> .
docker login -u $DOCKER_USERNAME -p $DOCKER_PASSWORD
docker push <DOCKER_IMAGE>
```
Replace <DOCKER_IMAGE> with your Docker Hub username and repository.

### 3. Deploying to Kubernetes
The pipeline deploys the built Docker image to a Kubernetes cluster. Kubernetes YAML files (deployment.yaml and service.yaml) define the deployment and service resources for the application. The pipeline uses kubectl to apply these configurations:
```
kubectl apply -f k8s/deployment.yaml
kubectl apply -f k8s/service.yaml
```
This deploys the application in the specified Kubernetes namespace.

### 4. Notifications
Email notifications are configured to notify the team upon the success or failure of the deployment. The GitLab pipeline sends an email using the configured email recipient in the .gitlab-ci.yml file.

## Setup Instructions

### 1. Clone the repository:
```
git clone https://github.com/jayesh-devre/nodejs-cicd-pipeline.git
cd nodejs-cicd-pipeline
```

### 2. Install dependencies:
```
npm install
```

### 3. Run tests locally:
```
npm test
```

### 4. Build Docker image locally:
```
docker build -t my-node-app .
```

### 5. Apply Kubernetes configurations locally:
```
kubectl apply -f k8s/deployment.yaml
kubectl apply -f k8s/service.yaml
```

### 6. Set up GitLab CI/CD pipeline by pushing to the main branch:
```
git push -u origin main
```
## Pipeline Stages
The GitLab CI/CD pipeline includes the following stages:

#### 1. Build: Installs project dependencies.
#### 2. Test: Runs the unit tests using Jest.
#### 3. Dockerize: Builds and pushes the Docker image to Docker Hub.
#### 4. Deploy: Deploys the application to a Kubernetes cluster.

## Dependencies

#### Node.js
#### Docker
#### kubernetes
#### GitLab CI/CD
#### Jest and Supertest for testing

## Notes

1. Ensure that the Docker Hub credentials (DOCKER_USERNAME and DOCKER_PASSWORD) are securely stored in GitLab CI/CD variables.

2. Update the Kubernetes configuration (k8s/deployment.yaml and k8s/service.yaml) with your specific requirements, such as image name and Kubernetes namespace.

3. Ensure your Kubernetes setup (kubectl) and Docker are running properly before applying the configurations.











