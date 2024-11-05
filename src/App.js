import React, { Suspense, useEffect, useRef } from 'react';
import AppRouter from './Routes.tsx';
import './App.css';

console.log('%c조심하세요!', 'color:red; font-size:40px;');
console.log('%c누군가 이 곳이나 주소창에 어떤 스크립트를 붙여넣으라고 한다면 여러분들의 계정 정보를 탈취하거나 조작하기 위한 목적일 수 있습니다. 어떤 기능을 하는지 모르는 코드일 경우 절대 이 곳에 붙여넣지 마세요!', 'font-size:15px;');

function App() {
  const containerRef = useRef(null);

  const scaleContainer = () => {
    if (containerRef.current) {
      // 화면 크기에 맞춰 scale 조정
      const scaleX = window.innerWidth / 360;
      const scaleY = window.innerHeight / 740;
      const scale = Math.min(scaleX, scaleY, 1); // 최대 배율을 1로 제한하여 스크롤 방지

      containerRef.current.style.transform = `scale(${scale})`;
      containerRef.current.style.transformOrigin = 'top left';

      // 상단 고정 및 수평 중앙 배치를 위한 left 계산
      const left = (window.innerWidth - 360 * scale) / 2;

      containerRef.current.style.position = 'absolute';
      containerRef.current.style.left = `${left}px`;
      containerRef.current.style.top = `0px`; // 상단에 고정
    }
  };

  useEffect(() => {
    scaleContainer();
    window.addEventListener('resize', scaleContainer);

    return () => {
      window.removeEventListener('resize', scaleContainer);
    };
  }, []);

  return (
      <div
        ref={containerRef}
        className="container" // 스타일은 index.css나 App.css에 추가 가능
      >
        <div className="App">
          <main>
            <Suspense fallback={<div>로딩중...</div>}>
              <AppRouter />
            </Suspense>
          </main>
        </div>
      </div>
  );
}

export default App;