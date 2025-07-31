# 카카오 로그인

- CRA 로 생성한 경우
  - 환경설정 즉, `.env` 사용법이 다름
- Vite 로 리액트 프로젝트 생성한 경우
  - 환경설정 즉, `.env` 사용법이 다름

## 1. 카카오 개발자 등록하기/로그인하기

- https://developers.kakao.com/
- https://developers.kakao.com/docs/latest/ko/kakaologin/rest-api

## 2. 새로운 애플리케이션 등록하기

- 상단의 주메뉴에서 `앱` 선택 후 이동
  <img width="1075" height="303" alt="Image" src="https://github.com/user-attachments/assets/1ad5b19a-1fab-496d-9c8f-53339a66c1ae" />
- 내용 작성하기
  <img width="502" height="592" alt="Image" src="https://github.com/user-attachments/assets/8f241138-c866-42f3-8087-5008964c4e8b" />
  - 이미지 생성 필수
    <img width="504" height="677" alt="Image" src="https://github.com/user-attachments/assets/11c3bf64-097e-4148-8187-7211d3da3de8" />
- 목록 확인하기
  <img width="902" height="429" alt="Image" src="https://github.com/user-attachments/assets/e2a4e507-343c-44bd-a5bc-d71c2fc93b65" />
- 비지앱 등록하기
  <img width="1069" height="599" alt="Image" src="https://github.com/user-attachments/assets/fa644173-a4fb-43ae-8bd2-ef9276a52c89" />
- 인증하기
  <img width="1063" height="524" alt="Image" src="https://github.com/user-attachments/assets/065c0c08-d73b-4e0a-9f33-820d40b9b15e" />
- 비즈앱전환
  <img width="1061" height="518" alt="Image" src="https://github.com/user-attachments/assets/0360e492-fb22-45f4-89e0-8ffa731c8a51" />
  <img width="702" height="554" alt="Image" src="https://github.com/user-attachments/assets/75101a66-be09-4b80-aac5-fba713a3ae45" />
- 노출되면 안되는 앱키
  <img width="574" height="308" alt="Image" src="https://github.com/user-attachments/assets/1d4f9b06-db38-4e5e-8452-31a0afd3800f" />

## 3. Rest API 및 JS 키 관리

- `외부노출 금지`
- / 폴더에 `.env` 파일 생성
- `생성되는 파일 위치 절대 주의`
  <img width="228" height="282" alt="Image" src="https://github.com/user-attachments/assets/e185c602-515e-4dd8-a692-58a2a889a071" />

### 3.1. 접두어는 `REACT_APP_` 으로 `약속`됨

- ex) Next,js 프로젝트에서는 `NEXT_APP_` 으로 약속됨
- ex) Vite 프로젝트에서는 `VITE_` 로 약속됨

```txt
REACT_APP_KKO_LOGIN_REST_API_KEY=본인키3fb9c8ae6c2c1dc88969f27062241506
REACT_APP_KKO_LOGIN_JS_API_KEY=본인키398dec0df6353dc751ad6509d63af960
```

### 3.2. `.gitignore` 확인

- `.env` 내용으로 작성확인
  <img width="504" height="489" alt="Image" src="https://github.com/user-attachments/assets/1893952c-24cc-4316-bc6c-252c444873d3" />

## 4. 카카오 로그인 플랫폼 설정하기

- 리다이렉트 URI
  <img width="1048" height="670" alt="Image" src="https://github.com/user-attachments/assets/15327f33-2a6e-4baa-b59e-fd6a9f818f5c" />

### 4.1. 리다이렉트 URL 설정

- http://localhost:3000 : CRA 버전
- http://localhost:5173 : Vite 버전
- https://www.도메인.com : 개인 도메인

<img width="472" height="350" alt="Image" src="https://github.com/user-attachments/assets/d6dd7060-f434-4143-a90e-e0ef945764c7" />
- 사용 설정 ON
<img width="539" height="204" alt="Image" src="https://github.com/user-attachments/assets/a0a4b921-4e18-4636-b423-e51b7b726701" />

## 5. 동의항목 설정

<img width="1027" height="256" alt="Image" src="https://github.com/user-attachments/assets/50ddb7fe-6621-4677-b06f-d6c8d3c3c463" />

<img width="424" height="494" alt="Image" src="https://github.com/user-attachments/assets/bfd75e5f-608c-41e4-ac86-c26b43d363d8" />

<img width="1020" height="264" alt="Image" src="https://github.com/user-attachments/assets/21a21388-82a8-4ef6-af6e-efc2f1014bcd" />

## 6. 카카오 로그인 구현

- /src/kko 폴더 생성
- /src/kko/kkoapi.js 파일 생성

### 6.1. 1단계

```js
// git에 key 값 공개금지
const rest_api_key = process.env.REACT_APP_KKO_LOGIN_REST_API_KEY;

// 카카오 로그인 성공시 이동할 URL
const redirect_uri = "http://localhost:3000/member/kko";

// 카카오 로그인시 API 호출 경로 : token 활용
const auth_code_path = "https://kauth.kakao.com/oauth/authorize";

// 카카오 로그인 이후 사용자 정보 API 경로
const kko_user_api = "https://kapi.kakao.com/v2/user/me";

// 카카오 로그인 시도시 활용할 URL 자동 생성
export const getKakaoLoginLink = () => {
  const kakaoURL = `${auth_code_path}?client_id=${rest_api_key}&redirect_uri=${redirect_uri}&response_type=code`;
  return kakaoURL;
};
```

### 6.2. 2단계 : Access Token 활용

- 정보 호출

```js
// access 토큰 요청
const access_token_url = `https://kauth.kakao.com/oauth/token`;
export const getAccessToken = async authCode => {
  const params = new URLSearchParams({
    grant_type: "authorization_code",
    client_id: rest_api_key,
    redirect_uri: redirect_uri,
    code: authCode,
  });

  const response = await fetch(access_token_url, {
    method: "POST",
    headers: {
      "Content-Type": "application/x-www-form-urlencoded;charset=utf-8",
    },
    body: params.toString(),
  });

  if (!response.ok) {
    const errorData = await response.json();
    console.error("토큰 요청 실패:", errorData);
    throw new Error("Access Token 요청 실패");
  }

  const data = await response.json();
  return data.access_token;
};

// 사용자 정보 요청
export const getMemberWithAccessToken = async accessToken => {
  try {
    const response = await fetch(kko_user_api, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${accessToken}`,
        "Content-Type": "application/x-www-form-urlencoded;charset=utf-8",
      },
    });

    if (!response.ok) {
      const errorData = await response.json();
      console.error("사용자 정보 요청 실패:", errorData);
      return errorData;
    }

    const userData = await response.json();
    console.log(userData);
    return userData;
  } catch (error) {
    console.error("fetch 에러:", error);
    return error;
  }
};
```

### 6.3. 전체 코드 (`추후 axios 로 변경 권장`)

```js
// git에 key 값 공개금지
const rest_api_key = process.env.REACT_APP_KKO_LOGIN_REST_API_KEY;

// 카카오 로그인 성공시 이동할 URL
const redirect_uri = "http://localhost:3000/member/kko";

// 카카오 로그인시 API 호출 경로 : token 활용
const auth_code_path = "https://kauth.kakao.com/oauth/authorize";

// 카카오 로그인 이후 사용자 정보 API 경로
const kko_user_api = "https://kapi.kakao.com/v2/user/me";

// 카카오 로그인 시도시 활용할 URL 자동 생성
export const getKakaoLoginLink = () => {
  const kakaoURL = `${auth_code_path}?client_id=${rest_api_key}&redirect_uri=${redirect_uri}&response_type=code`;
  return kakaoURL;
};

// access 토큰 요청
const access_token_url = `https://kauth.kakao.com/oauth/token`;
export const getAccessToken = async authCode => {
  const params = new URLSearchParams({
    grant_type: "authorization_code",
    client_id: rest_api_key,
    redirect_uri: redirect_uri,
    code: authCode,
  });

  const response = await fetch(access_token_url, {
    method: "POST",
    headers: {
      "Content-Type": "application/x-www-form-urlencoded;charset=utf-8",
    },
    body: params.toString(),
  });

  if (!response.ok) {
    const errorData = await response.json();
    console.error("토큰 요청 실패:", errorData);
    throw new Error("Access Token 요청 실패");
  }

  const data = await response.json();
  return data.access_token;
};

// 사용자 정보 요청
export const getMemberWithAccessToken = async accessToken => {
  try {
    const response = await fetch(kko_user_api, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${accessToken}`,
        "Content-Type": "application/x-www-form-urlencoded;charset=utf-8",
      },
    });

    if (!response.ok) {
      const errorData = await response.json();
      console.error("사용자 정보 요청 실패:", errorData);
      return errorData;
    }

    const userData = await response.json();
    console.log(userData);
    return userData;
  } catch (error) {
    console.error("fetch 에러:", error);
    return error;
  }
};
```

## 6.4. 코드 반영

- /src/pages/LoginPage.jsx 파일 생성

```jsx
import { Link } from "react-router-dom";
import { getKakaoLoginLink } from "../kko/kkoapi";

function LoginPage() {
  // 카카오 로그인 URL 만들기
  const kkoLoginUrl = getKakaoLoginLink();
  console.log(kkoLoginUrl);
  return (
    <div>
      <h1>LoginPage</h1>
      <Link to={kkoLoginUrl}>카카오 로그인</Link>
    </div>
  );
}

export default LoginPage;
```

- /src/pages/member 폴더 생성
- /src/pages/member/After.jsx 파일 생성

```jsx
import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { getAccessToken, getMemberWithAccessToken } from "../../kko/kkoapi";

const After = () => {
  // 사용자 정보 관리
  const [userInfo, setUserInfo] = useState(null);

  // 카카오 인증키 알아내기
  const [URLSearchParams, setURLSearchParams] = useSearchParams();
  const authCode = URLSearchParams.get("code");

  // 인가 키를 받아서 액세스 토큰을 요청한다.
  const getAccessTokenCall = async () => {
    const accessKey = await getAccessToken(authCode);
    // console.log("accessKey : ", accessKey);
    // 사용자 정보 호출
    const info = await getMemberWithAccessToken(accessKey);
    console.log(info);
    setUserInfo(info);
  };

  useEffect(() => {
    getAccessTokenCall();
  }, [authCode]);
  return (
    <div>
      <h1>KKO 로그인 후 </h1>
      <h2>{authCode}</h2>
      <div>닉네임 : {userInfo?.kakao_account.profile.nickname}</div>
      <div>이메일 : {userInfo?.kakao_account.email}</div>
      <div>
        <img src={userInfo?.kakao_account.profile.thumbnail_image_url} />
      </div>
    </div>
  );
};

export default After;
```

### 6.4.1. Router 셋팅

- /src/App.js

```js
import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import LoginPage from "./pages/LoginPage";
import After from "./member/After";

function App() {
  return (
    <Router>
      <LoginPage />
      <Routes>
        <Route path="/member/kko" element={<After />}></Route>
      </Routes>
    </Router>
  );
}

export default App;
```

## 7. Recoil 활용해 보기

- /src/atoms/kkoLoginAtom.js 파일 생성

```js
import { atom } from "recoil";

const KKOLoginAtom = atom({
  key: "KKOLoginAtom",
  default: { id: "", nickname: "", thumbnail_image_url: "", email: "" },
});
```

## 8. 로그아웃 처리

```jsx
import { Link, useNavigate } from "react-router-dom";
import { getKakaoLoginLink } from "../kko/kkoapi";
import { useRecoilState } from "recoil";
import { KKOLoginAtom } from "../atoms/kkoLoginAtom";

function LoginPage() {
  const navigate = useNavigate();
  // Recoil State 로 전역 상태 활용하기
  const [userInfo, setUserInfo] = useRecoilState(KKOLoginAtom);
  // 카카오 로그인 URL 만들기
  const kkoLoginUrl = getKakaoLoginLink();
  //   console.log(kkoLoginUrl);
  const logOut = () => {
    setUserInfo({
      id: "",
      nickname: "",
      email: "",
      thumbnail_image_url: "",
    });
    navigate("/");
  };
  return (
    <div>
      <h1>LoginPage</h1>
      {userInfo.id ? (
        <button onClick={logOut}>로그아웃</button>
      ) : (
        <Link to={kkoLoginUrl}>카카오 로그인</Link>
      )}
    </div>
  );
}

export default LoginPage;
```

## 9. 로그인 없이 페이지 접근시 처리

- 강제로 navigate("/login")
- 조건문으로 안내메시지 및 버튼으로 이동권장
