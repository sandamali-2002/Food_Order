pipeline {
    agent any

    environment {
        CI = 'true'
    }

    stages {
        stage('Deploy') {
            steps {
                script {
                    echo 'Stopping existing containers...'
                    sh 'docker-compose down || true'
                    
                    echo 'Starting services with Docker Compose...'
                    sh 'docker-compose up -d --build'
                    
                    echo 'Deployment completed!'
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
