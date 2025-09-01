pipeline {
    agent any

    environment {
        EC2_HOST = 'ubuntu@3.110.94.223'
        SSH_KEY = 'ec2-key-angular'
        APP_DIR = '/var/www/angulartest'
        DIST_DIR = 'dist/to-do-list/browser' // or adjust if your build path is different
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
                sh 'npx ng build --configuration production'
            }
        }

        stage('Deploy to EC2') {
            steps {
                sshagent (credentials: ["${SSH_KEY}"]) {
                    sh """
                        # Clean old files on EC2
                        ssh -o StrictHostKeyChecking=no ${EC2_HOST} 'rm -rf ${APP_DIR}/dist && mkdir -p ${APP_DIR}/dist'
                        
                        # Copy built files from Jenkins to EC2
                        scp -o StrictHostKeyChecking=no -r ${DIST_DIR}/* ${EC2_HOST}:${APP_DIR}/dist
                        
                        # Restart PM2 to serve the new build
                        ssh -o StrictHostKeyChecking=no ${EC2_HOST} 'pm2 restart angulartest || pm2 serve ${APP_DIR}/dist 3000 --spa --name angulartest'
                    """
                }
            }
        }
    }

    post {
        success {
            echo '✅ Deployment Successful!'
        }
        failure {
            echo '❌ Deployment Failed!'
        }
    }
}
