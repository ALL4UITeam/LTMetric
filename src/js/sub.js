
window.addEventListener("load", () => {
    setTimeout(() => {
        const target = document.querySelector(".intro--depth");
        if (target) {
            target.scrollIntoView({
                behavior: "smooth",
                block: "start" // 요소의 시작 부분이 화면 맨 위에 오도록
            });
        }
    }, 2000); // 2초 후 실행
});

if (document.querySelector('.page_title')) {
    const pageMainTitle = document.querySelector('.page_title');
    const pageSubDesc = document.querySelector('.sub_title_desc');

    // 글자 span으로 감싸기
    const text = pageMainTitle.textContent.trim();
    pageMainTitle.textContent = ''; // 기존 텍스트 비움
    text.split('').forEach(char => {
        const span = document.createElement('span');
        span.textContent = char;
        span.style.display = 'inline-block';
        span.style.transform = 'translateY(100%)'; // 초기 아래 위치
        pageMainTitle.appendChild(span);
    });

    // GSAP 타이틀 애니메이션
    gsap.to(".page_title span", {
        y: 0,
        duration: 1,
        stagger: 0.09,
        ease: "power3.out",
        onComplete: () => {
            gsap.fromTo(pageSubDesc,
                { y: 0, opacity: 0, filter: "blur(10px)" },
                { y: 0, opacity: 1, duration: 1, ease: "power3.out", filter: "blur(0px)" }
            );
        }
    });
    gsap.fromTo(".intro--banner-background",
        { clipPath: "circle(0% at 50% 50%)" },
        { clipPath: "circle(100% at 50% 50%)", duration: 1.3, ease: "power3.out" }
    );
}