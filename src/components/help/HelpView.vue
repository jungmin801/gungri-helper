<template>
  <section class="mx-auto max-w-3xl">
    <!-- Header -->
    <header class="mb-8">
      <h1 class="text-center text-4xl font-extrabold tracking-tight md:text-3xl">도움말</h1>
      <p class="mt-2 text-center text-sm text-gray-500">궁리 도우미 사용 방법 안내</p>
    </header>

    <!-- Content -->
    <div class="space-y-10">
      <!-- 1) What is -->
      <section class="rounded-xl border bg-white p-6 shadow-sm">
        <h2 class="mb-3 text-xl font-bold">궁리 도우미란?</h2>

        <div class="space-y-4 leading-relaxed text-gray-800">
          <p>
            <span class="font-semibold">궁리 도우미</span>는 영어 표현을 “외워두는 것”에서 끝내지
            않고, <span class="font-semibold">실제로 떠올리고 말해보는 연습</span>을 돕기 위한
            도구입니다.
          </p>

          <p>
            메인북의 <span class="font-semibold">Useful Expressions</span>와
            <span class="font-semibold">Grammar Focus</span>에 있는 표현들 중에서
            <span class="font-semibold">두 개의 표현</span>을 랜덤으로 뽑고,
            <span class="font-semibold">상황(장소)</span>과
            <span class="font-semibold">대상(상대)</span>도 함께 랜덤으로 제시합니다.
          </p>

          <p>
            이렇게 주어진 조합을 바탕으로 짧은 문장이나 글을 직접 만들어보며 연습할 수 있습니다.
          </p>

          <div class="rounded-lg border border-blue-100 bg-blue-50 p-4">
            <p class="text-sm text-blue-900">
              목적은 이미 배웠지만 실제로 말하거나 떠올리지 못하는
              <span class="font-semibold">‘죽은 표현들’을 최소화</span>하고, 아웃풋 연습에 도움을
              주는 것입니다.
            </p>
          </div>
        </div>
      </section>

      <!-- 2) Storage -->
      <section class="rounded-xl border bg-white p-6 shadow-sm">
        <h2 class="mb-3 text-xl font-bold">데이터 저장에 대해</h2>

        <div class="space-y-4 leading-relaxed text-gray-800">
          <p>
            궁리 도우미의 기록은
            <span class="font-semibold">서버가 아니라 브라우저에 직접 저장</span>됩니다. 따라서
            기록은 <span class="font-semibold">현재 사용 중인 기기와 브라우저에만 저장</span>됩니다.
          </p>

          <p>
            브라우저의 저장공간이 가득 차면 새로운 기록이 저장되지 않을 수 있습니다. 이 경우에는
            <span class="font-semibold">저장된 목록에서 불필요한 기록을 삭제</span>한 뒤 다시
            시도해주세요.
          </p>

          <div class="rounded-lg border border-amber-100 bg-amber-50 p-4">
            <p class="text-sm text-amber-900">
              필요하다면 기록을 <span class="font-semibold">캡처하거나 복사</span>해서 Anki, Notion
              등 본인이 사용하는 노트 앱/학습 도구로 옮겨 따로 저장하고 활용하셔도 좋습니다.
            </p>
          </div>
        </div>
      </section>

      <!-- 3) Sync -->
      <section class="rounded-xl border bg-white p-6 shadow-sm">
        <h2 class="mb-3 text-xl font-bold">동기화에 대해</h2>

        <div class="space-y-4 leading-relaxed text-gray-800">
          <p>
            이 앱은
            <span class="font-semibold"
              >서버를 사용하지 않기 때문에 자동 동기화를 지원하지 않습니다.</span
            >
          </p>
        </div>
      </section>
    </div>
  </section>
</template>
