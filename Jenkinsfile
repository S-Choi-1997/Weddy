
pipeline {
    agent any

    environment {
        // Docker Hub
        DOCKERHUB_CREDENTIALS = credentials('docker-hub-credentials') // Docker Hub 자격 증명

        // Mattermost 알림 설정
        MATTERMOST_ENDPOINT = 'https://meeting.ssafy.com/hooks/yzzezkburpdd9gcac4fdzkaguo'
        MATTERMOST_CHANNEL = 'c203-jenkins'

        // Docker 이미지 이름
        CACHE_SCHEDULER_IMAGE = 'siokim002/weddy_cache_scheduler'
        COMMON_LIB_IMAGE = 'siokim002/weddy_common_lib'
        GATEWAY_IMAGE = 'siokim002/weddy_gateway'
        PRODUCT_IMAGE = 'siokim002/weddy_product'
        SCHEDULE_IMAGE = 'siokim002/weddy_schedule'
        USER_IMAGE = 'siokim002/weddy_user'
        FRONTEND_IMAGE = 'siokim002/weddy_frontend'

        // GitOps 저장소 주소
        GITOPS_REPO = 'git@github.com:zion0425/weddy_gitops.git' 

        // Credentials
        GITOPS_CREDENTIALS = 'gitops_pk' // Jenkins에 등록된 GitOps 배포 키의 Credential ID
        GITLAB_CREDENTIALS = 'gitlab' // GitLab 자격 증명 ID
    }

    options {
        buildDiscarder(logRotator(numToKeepStr: '3'))
    }

    stages {
        stage('Start Notification') {
            steps {
                script {
                    sendNotification('warning', '빌드 시작')
                }
            }
        }

        stage('Checkout') {
            steps {
                script {
                    // 소스 코드 체크아웃
                    git url: 'https://lab.ssafy.com/s11-final/S11P31C203.git', branch: 'release', credentialsId: GITLAB_CREDENTIALS

                    // 변경된 파일 목록 가져오기
                    def changes = sh(script: "git diff --name-only HEAD~1 HEAD", returnStdout: true).trim()
                    println "Changed files:\n${changes}"

                    // 변경된 서비스 확인
                    changedServices = []
                    if (changes.contains('frontend/')) {
                        changedServices.add('frontend')
                    }
                    if (changes.contains('backend/')) {
                        if (changes.contains('cacheScheduler/')) {
                            changedServices.add('cacheScheduler')
                        }
                        if (changes.contains('common-lib/')) {
                            changedServices.add('common-lib')
                        }
                        if (changes.contains('gateway/')) {
                            changedServices.add('gateway')
                        }
                        if (changes.contains('product/')) {
                            changedServices.add('product')
                        }
                        if (changes.contains('schedule/')) {
                            changedServices.add('schedule')
                        }
                        if (changes.contains('user/')) {
                            changedServices.add('user')
                        }
                    }
                    println "Changed services: ${changedServices}"
                }
            }
        }

        stage('Build and Push Docker Images') {
            steps {
                script {
                    // Docker Hub 로그인
                    sh 'echo $DOCKERHUB_CREDENTIALS_PSW | docker login -u $DOCKERHUB_CREDENTIALS_USR --password-stdin'

                    for (service in changedServices) {
                        def imageName = ""
                        def dirPath = ""
                        if (service == 'frontend') {
                            imageName = FRONTEND_IMAGE
                            dirPath = 'frontend'
                        } else if (service == 'cacheScheduler') {
                            imageName = CACHE_SCHEDULER_IMAGE
                            dirPath = 'backend/cacheScheduler'
                        } else if (service == 'common-lib') {
                            imageName = COMMON_LIB_IMAGE
                            dirPath = 'backend/common-lib'
                        } else if (service == 'gateway') {
                            imageName = GATEWAY_IMAGE
                            dirPath = 'backend/gateway'
                        } else if (service == 'product') {
                            imageName = PRODUCT_IMAGE
                            dirPath = 'backend/product'
                        } else if (service == 'schedule') {
                            imageName = SCHEDULE_IMAGE
                            dirPath = 'backend/schedule'
                        } else if (service == 'user') {
                            imageName = USER_IMAGE
                            dirPath = 'backend/user'
                        }

                        // Docker 이미지 빌드
                        dir(dirPath) {
                            if (service != 'frontend') {
                                sh 'chmod +x ./gradlew'
                                sh './gradlew clean build -x test'
                            }
                            sh "docker build --no-cache -t ${imageName}:${env.BUILD_NUMBER} ."
                        }

                        // Docker 이미지 푸시
                        sh "docker push ${imageName}:${env.BUILD_NUMBER}"
                    }
                }
            }
        }

        stage('Update GitOps Repo') {
            steps {
                script {
                    sshagent (credentials: [GITOPS_CREDENTIALS]) {
                        dir('gitops') {
                            // GitOps 저장소 클론
                            sh 'git clone -b main git@github.com:zion0425/sinbi_gitops.git .'

                            for (service in changedServices) {
                                def imageName = ""
                                def deploymentFile = ""
                                if (service == 'frontend') {
                                    imageName = FRONTEND_IMAGE
                                    deploymentFile = 'frontend-deployment.yaml'
                                } else if (service == 'cacheScheduler') {
                                    imageName = CACHE_SCHEDULER_IMAGE
                                    deploymentFile = 'cache-scheduler-deployment.yaml'
                                } else if (service == 'common-lib') {
                                    imageName = COMMON_LIB_IMAGE
                                    deploymentFile = 'common-lib-deployment.yaml'
                                } else if (service == 'gateway') {
                                    imageName = GATEWAY_IMAGE
                                    deploymentFile = 'gateway-deployment.yaml'
                                } else if (service == 'product') {
                                    imageName = PRODUCT_IMAGE
                                    deploymentFile = 'product-deployment.yaml'
                                } else if (service == 'schedule') {
                                    imageName = SCHEDULE_IMAGE
                                    deploymentFile = 'schedule-deployment.yaml'
                                } else if (service == 'user') {
                                    imageName = USER_IMAGE
                                    deploymentFile = 'user-deployment.yaml'
                                }

                                // deployment.yaml 파일의 이미지 태그 업데이트
                                sh """
                                sed -i 's#image: .*#image: ${imageName}:${env.BUILD_NUMBER}#' ${deploymentFile}
                                """
                            }

                            // 변경 사항 커밋 및 푸시
                            sh """
                            git config user.name "Jenkins"
                            git config user.email "jenkins@gitops.com"
                            git add .
                            git commit -m "Update images for services: ${changedServices.join(', ')}"
                            git push origin main
                            """
                        }
                    }
                }
            }
        }
    }

    post {
        success {
            script {
                sendNotification('good', '빌드 성공')
                cleanWs()
            }
        }
        failure {
            script {
                sendNotification('danger', '빌드 실패')
                cleanWs()
            }
        }
    }
}

def sendNotification(String color, String status) {
    def gitCommitterName = sh(script: "git log -1 --pretty=format:'%an'", returnStdout: true).trim()
    def gitCommitMessage = sh(script: "git log -1 --pretty=%B", returnStdout: true).trim()
    
    mattermostSend(
        color: color,
        message: """${status}: 빌드 번호 #${env.BUILD_NUMBER}
커밋 작성자: ${gitCommitterName}
커밋 메시지: ${gitCommitMessage}
(<${env.BUILD_URL}|빌드 상세 정보>)""",
        endpoint: MATTERMOST_ENDPOINT,
        channel: MATTERMOST_CHANNEL
    )
}

