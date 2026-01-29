pipeline {
    agent any

    tools {
        nodejs 'node' 
    }

    environment {
        // If the tool name above is not configured in Jenkins, this will fail.
        // Ensure "Global Tool Configuration" -> "NodeJS" has an installation named "node".
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
