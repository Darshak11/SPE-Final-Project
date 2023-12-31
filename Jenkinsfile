pipeline {
    environment {
        backend = 'auction-spring:latest' // Specify your backend Docker image name/tag
        frontend = 'auction-frontend:latest' // Specify your frontend Docker image name/tag
        mysqlImage = 'mysql:latest' // Specify the MySQL Docker image
        mysqlContainerName = 'mysql-container' // Specify the name for your MySQL container
        MYSQL_ROOT_PASSWORD = 'password'
        MYSQL_PORT = '3306'
        docker_image = ''
       
    }
   
    agent any

    stages {
       
        stage('Stage 0: Pull MySQL Docker Image') {
            steps {
                echo 'Pulling MySQL Docker image from DockerHub'
                script {
                    docker.withRegistry('', 'DockerHubCred') {
                        docker.image("${mysqlImage}").pull()
                    }
                }
            }
        }
        stage('Stage 0.1: Run MySQL Container') {
            steps {
                script {
                    sh 'docker container inspect mysqldb >/dev/null 2>&1 && docker container stop mysqldb && docker container rm mysqldb || true'
                    sh 'docker run --name mysqldb -p 3306:3306 -e MYSQL_ROOT_PASSWORD=${MYSQL_ROOT_PASSWORD} -d -v "/var/lib/mysql" mysql:latest'
                    sh 'sleep 30'
                }
            }
        }
       
        stage('Stage 1: Git Clone') {
            steps {
                echo 'Cloning the Git repository'
                git branch: 'master', url: 'https://github.com/Darshak11/SPE-Final-Project.git'
            }
        }

        stage('Stage 2: Build Spring Boot backend') {
            steps {
                echo 'Building Spring Boot backend'
                dir('auction'){
                    sh 'mvn clean install'
                }
            }
        }
       
        stage('Stage 3: Build backend Docker Image') {
            steps {
                echo 'Building backend Docker image'
                dir('auction'){
                    echo 'Changing to auction directory'
                    sh "docker build -t dolo650/${backend} ."
                }
                
            }
        }

        stage('Stage 4: Build frontend Docker image') {
            steps {
                echo 'Building frontend Docker image'
                dir('auction-frontend') {
                    echo 'Changing to auction-frontend directory'
                    sh "docker build -t dolo650/${frontend} ."
                }
            }
        }

        stage('Stage 5: Push backend Docker image to DockerHub') {
            steps {
                echo 'Pushing backend Docker image to DockerHub'
                script {
                    docker.withRegistry('', 'DockerHubCred') {
                        sh 'docker push dolo650/${backend}'
                    }
                }
            }
        }
       
        stage('Stage 6: Push frontend Docker image to DockerHub') {
            steps {
                echo 'Pushing frontend Docker image to DockerHub'
                script {
                    docker.withRegistry('', 'DockerHubCred') {
                        sh 'docker push dolo650/${frontend}'
                    }
                }
            }
}

        stage('Stage 7: Clean docker images') {
            steps {
                script {
                    sh 'docker container prune -f'
                    sh 'docker image prune -f'
                }
            }
        }

        stage('Stage 8: Ansible Deployment') {
            steps {
                dir('Deployment'){
                    sh 'docker container inspect mysqldb >/dev/null 2>&1 && docker container stop mysqldb && docker container rm mysqldb || true'
                    sh 'ansible-playbook -i inventory deploy.yml'
                }
            }
        }
    }
}