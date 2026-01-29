pipeline {
    agent any

    tools {
        nodejs 'node'
    }

    environment {
        CI = 'true'
        DOCKER_HUB_REPO = 'chandimasandamali'
    }

    stages {
        stage('Build Frontend') {
            steps {
                echo 'Building Frontend...'
                dir('frontend') {
                    sh 'npm install'
                    sh 'npm run build'
                }
            }
        }
        stage('Build Backend') {
            steps {
                echo 'Installing Backend dependencies...'
                dir('Backend') {
                    sh 'npm install'
                }
            }
        }
        stage('Docker Build & Push') {
            steps {
                script {
                    withCredentials([usernamePassword(credentialsId: 'dockerhub-credentials', passwordVariable: 'DOCKER_PASS', usernameVariable: 'DOCKER_USER')]) {
                        sh 'echo $DOCKER_PASS | docker login -u $DOCKER_USER --password-stdin'
                        
                        // Backend
                        sh "docker build -t ${DOCKER_HUB_REPO}/backend:latest ./Backend"
                        sh "docker push ${DOCKER_HUB_REPO}/backend:latest"

                        // Frontend
                        sh "docker build -t ${DOCKER_HUB_REPO}/frontend:latest ./frontend"
                        sh "docker push ${DOCKER_HUB_REPO}/frontend:latest"
                    }
                }
            }
        }
    }

    post {
        success {
            echo 'Pipeline succeeded!'
        }
        failure {
            echo 'Pipeline failed!'
        }
    }
}
