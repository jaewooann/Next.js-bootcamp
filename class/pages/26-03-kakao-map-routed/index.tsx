// import Head from "next/head";
import { useEffect } from "react";

declare const window: typeof globalThis & {
  kakao: any
}

export default function KakaoMapPage() {

  useEffect(() => {
    const script = document.createElement('script'); // <script></script>
    script.src = '//dapi.kakao.com/v2/maps/sdk.js?autoload=false&appkey=eeeee83a22f8ac60414dc765f1900f71';
    document.head.appendChild(script);

    script.onload = () => {
      window.kakao.maps.load(function() {
        const container = document.getElementById('map'); // 지도를 담을 영역의 DOM 레퍼런스
        const options = { // 지도를 생성할 때 필요한 기본 옵션
          center: new window.kakao.maps.LatLng(37.305625, 126.852330), // 지도의 중심좌표.
          level: 3 // 지도의 레벨(확대, 축소 정도)
        };
        
        const map = new window.kakao.maps.Map(container, options); // 지도 생성 및 객체 리턴
        console.log(map);

        // 마커가 표시될 위치입니다 
        const markerPosition  = new window.kakao.maps.LatLng(37.305625, 126.852330); 

        // 마커를 생성합니다
        const marker = new window.kakao.maps.Marker({
            position: markerPosition
        });

        // 마커가 지도 위에 표시되도록 설정합니다
        marker.setMap(map);
      })
    }
  }, []);
  

  return (
    <>
      {/* <Head>
        <script 
          type="text/javascript" 
          src="//dapi.kakao.com/v2/maps/sdk.js?appkey=eeeee83a22f8ac60414dc765f1900f71"
        ></>
      </Head> */}
      <div id="map" style={{width: '500px', height: '400px'}}></div>
    </>
  );
}