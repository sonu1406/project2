pipeline {
  agent any

  environment {
    REMOTE_USER = "ubuntu"
    REMOTE_HOST = "13.222.29.245"
    SSH_KEY = credentials('student-portal-ssh') 
    IMAGE = "student-portal"
  }

  stages {
    stage('Clone Repo') {
      steps {
        git 'https://github.com/sonu1406/project2.git'
      }
    }

    stage('Build React App') {
      steps {
        dir('app') {
          sh 'npm install'
          sh 'npm run build'
        }
      }
    }

    stage('Build Docker Image') {
      steps {
        sh 'docker build -t $IMAGE .'
      }
    }

    stage('Deploy to EC2') {
      steps {
        sshagent(credentials: ['student-portal-ssh']) {
          sh """
          ssh -o StrictHostKeyChecking=no $REMOTE_USER@$REMOTE_HOST << EOF
            docker stop $IMAGE || true
            docker rm $IMAGE || true
            cd ~/student-portal
            git pull
            docker build -t $IMAGE .
            docker run -d --restart unless-stopped -p 80:80 $IMAGE
          EOF
          """
        }
      }
    }
  }

  post {
    success {
      echo "✅ Deployment Success"
    }
    failure {
      echo "❌ Deployment Failed"
    }
  }
}
