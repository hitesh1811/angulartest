pipeline {
    agent any

    environment {
        EC2_HOST = 'ubuntu@your-ec2-ip'
        SSH_KEY = 'ec2-key'
        APP_DIR = '/var/www/angulartest'
    }

    stages {
        stage('Clone') {
            steps {
                git credentialsId: 'your-github-cred-id', url: 'git@github.com:hitesh1811/angulartest.git', branch: 'main'
            }
        }

        stage('Build Angular') {
            steps {
                sh 'npm install'
                sh 'ng build --configuration production'
            }
        }

        stage('Deploy to EC2') {
            steps {
                sshagent (credentials: ["${SSH_KEY}"]) {
                    sh """
                        ssh -o StrictHostKeyChecking=no ${EC2_HOST} 'cd ${APP_DIR} && git pull && npm install && ng build --configuration production && pm2 restart angulartest'
                    """
                }
            }
        }
    }

    post {
        success {
            echo 'Deployment Successful!'
        }
        failure {
            echo 'Deployment Failed!'
        }
    }
}
