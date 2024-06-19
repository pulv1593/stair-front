'use client';
import React ,{ useEffect } from 'react';
;import { useSearchParams,useRouter } from 'next/navigation'

const KakaoCallback: React.FC = () => {
  const code = useSearchParams();
  const BACKEND_URL = 'http://localhost:3000/reqlogin';
  const router = useRouter();
  function changeUrlToDummy() {
    const dummyUrl = "/dummy-url";
    history.replaceState(null, '', dummyUrl);
}
  useEffect(() => {
    if (code) {
      const codeValue = code.get("code");
      if(codeValue) {
        console.log("code:", codeValue.substring(1))
      } else {
        console.log("code 값이 정의되지 않았습니다.");
      }
    } else {
      console.log("code 객체가 정의되지 않았습니다.");
    }
    window.onload = changeUrlToDummy;


    const kakaoLogin = async () => {

        const response = await fetch(`http://localhost:3000/reqlogin`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({ access_code: code.get("code") })
        })
        .then((res)=>{return res.json();})
        
        localStorage.setItem('access_token',response.data);
        console.log("성공:",response);
        
        // 로그인 성공 시 리디렉션
        setTimeout(() => {
          router.push('/main');
        }, 100);
      
    };

    if (code && BACKEND_URL) {
      kakaoLogin();
    }
  } ,[code, BACKEND_URL,router]);

  return (
    // <div className="bg-white w-full h-full">

    //   <button className="absolute bg-slate-500 w-[200px] h-[200px] top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 "   >
    //     <div className="flex items-center">
    //     <svg className="animate-spin h-[70px] w-[70px] rounded-full white"viewBox='0 0 70 70'>
    //       <circle cx="10" cy="10" r="40" fill="gray"/>
    //       <circle cx="35" cy="35" r="30" fill="#800080"/>
    //     </svg>
    //       <div>로그인중....</div>
    //     </div>
    //   </button> 
    // </div>
    <div role="status">
    <svg aria-hidden="true" className="w-8 h-8 text-gray-200 animate-spin dark:text-gray-600 fill-blue-600" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor"/>
        <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentFill"/>
    </svg>
    <span className="sr-only">Loading...</span>
  </div>
  );
};



export default KakaoCallback;