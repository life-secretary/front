# 인생비서(Life Secretary)
### 처음 살아보는 나를 위한 앱, 인생비서

### 🔖 Table of Contents 
- [Installation](#-installation)
- [About Project](#-about-project)
- [Work Schedule](#-work-schedule)
- [FE Contributor](#-fe-contributor)
- [FE Tech Stack](#-fe-tech-stack)
- [Docs](#-docs)

<br/>

## 🍽️ Installation
#### iOS
##### Setting up
```
npm install
cd ios
pod install
```
##### Running on Simulator
```
npm run ios -- --simulator="{sumulator name}" 
```
##### Running on Device
```
npm run-ios --device "{device name}"
```

<br/>

## 📢 About Project
인생비서는 생애주기에 맞춰 유용한 콘텐츠를 제공하고 자유롭게 할 일을 관리할 수 있는 앱 서비스입니다.  

#### 스플래시(Splash)
- 공지, 업데이트 안내, 네트워크 오류 팝업

#### 회원가입/로그인(Signup/Login)
- OAuth Login(Kakao, Google)
- 신규 회원 가입 절차
  - 사용자 동의
  - 닉네임 입력
  - 설문조사 입력
    - 연령층, 성별, 알고 싶은 분야, 직업군, 결혼 및 자녀 정보

#### 홈(Home)
- 분야 리스트 
  - 전체, 경제, 법, 환경, 자기계발, 건강, 문화, 기타
- Image Carousel
  - 추천 콘텐츠   
- 콘텐츠 리스트 
  - 유사한 사용자가 읽고 있는 콘텐츠
  - 분야별로 인기 많은 콘텐츠
  - 최근 업데이트 콘텐츠
- 설문조사 입력 수정
  - 성별, 알고 싶은 분야, 직업군, 결혼 및 자녀 정보
  
#### 콘텐츠(Content)
- 콘텐츠 조회 
  - 분야별 콘텐츠 리스트 
    - 조회순/저장순/최신순 필터 
  - 콘텐츠 관련 할일 리스트
    - 저장순/최신순 필터
    - 할일 추가 기능
- 콘텐츠 상세
  - 스크랩
  - 연관된 할일 추가
  - 연관 콘텐츠 추천  

#### 검색(Search)
- 키워드 검색
  - 콘텐츠/할일 검색 결과 리스트   
- 최근 검색어
- 인기 검색어

#### 할일(Todo)
- 나의 할 일 조회
  - 할일 리스트
  - 진행중/완료
- 나의 할일 생성 
- 나의 할일 상세
  - 나의 할일 수정
  - 나의 할일 삭제
  - 나의 할일 완료
- 나의 할일 세부 항목
  - 세부 할일 생성
  - 세부 할일 수정
  - 세부 할일 삭제
  - 세부 할일 완료

#### 저장(Scrap)
- 스크랩 콘텐츠 리스트
- 스크랩 콘텐츠 리스트 편집

#### 관리(Setting)
- 내 정보
  - 내 정보 수정
  - 알고 싶은 분야(관심사) 재입력
  - 로그아웃
  - 회원탈퇴
- 공지사항
- 1:1 문의
- 개인정보 처리방침
- 서비스 이용약관
- 오픈소스 라이선스
- 버전 정보
- 서비스 소개

<br/>

## ⏰ Work Schedule
- 기획, 디자인 : 2023. 12 ~ 2024. 02  
- MVP 개발 : 2024. 02 ~ 2024. 07

<br/>

## 🧑‍💻 FE Contributor
- [김지혜(Jihye Kim)](https://github.com/bebe217) - 스플래시, 회원가입/로그인
- [안 솔(Sol Ahn)](https://github.com/devsoladev) - 홈, 할일, 저장, 관리
- [이승연(Seungyeon Lee)](https://github.com/ciocio97) - 콘텐츠, 검색

<br/>

## 🛠️ FE Tech Stack
- Languages : TypeScript, JavaScript
- Frameworks : React Native(iOS)
- State Management : Recoil, React-Query
- Libraries : React Navigation, Axios
- Testing : TestFlight
- IDE : Visual Studio Code, Xcode

<br/>

## 🚀 Trouble Shooting

<br/>

## 🗂️ Docs
[Figma Design](https://www.figma.com/file/h8SpZASVBd1qGoSdR6WKGn/%5BApp%5D-2024.01_%EC%9D%B8%EC%83%9D%EB%B9%84%EC%84%9C?type=design&node-id=0-1&mode=design&t=CCKhLLVnv9kBlj8P-0) <br/>
[Swagger API Doc](https://www.life-secretary.com/api/swagger-ui/index.html#/notice-controller/createNotice) <br/>
[Github Projects Kanban Board](https://github.com/orgs/life-secretary/projects/1)

