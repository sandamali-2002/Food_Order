pipeline {
    agent any    // run on any available Jenkins agent

    environment {
        // define environment variables if needed
        NODE_ENV = 'development'
    }

    stages {
        stage('Build') {
            steps {
                echo 'Building the project...'
                sh 'npm install'   // command to build (for Node.js)
            }
        }
        stage('Test') {
            steps {
                echo 'Running tests...'
                sh 'npm test'
            }
        }
        stage('Deploy') {
            steps {
                echo 'Deploying project...'
                // example command to deploy
                sh 'scp -r * user@server:/path/to/deploy'
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
