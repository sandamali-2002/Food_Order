pipeline {
    agent any

    tools {
        nodejs 'node'
    }

    environment {
        CI = 'true'
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
