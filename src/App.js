import React, { Suspense } from "react";
import { Analytics } from "@vercel/analytics/react";
import "./App.css";
import AppRouter from "./Routes.tsx";

console.log("%c조심하세요!", "color:red; font-size:40px;");
console.log(
  "%c누군가 이 곳이나 주소창에 어떤 스크립트를 붙여넣으라고 한다면 여러분들의 계정 정보를 탈취하거나 조작하기 위한 목적일 수 있습니다. 어떤 기능을 하는지 모르는 코드일 경우 절대 이 곳에 붙여넣지 마세요!",
  "font-size:15px;"
);

function App() {
  document.oncontextmenu = function () {
    return false;
  };

  return (
    <div className="container">
      <div className="App">
        <main>
          <Suspense fallback={<div>로딩중...</div>}>
            <AppRouter />
            <Analytics />
          </Suspense>
        </main>
      </div>
    </div>
  );
}

export default App;
