"use strict";

window.addEventListener('load' , () => {
	const Loaders = document.querySelector('#Loader');
	if(Loaders){
		Loaders.remove();
	}
})

document.addEventListener('DOMContentLoaded', function () {
  var imgContainers = document.querySelectorAll('.business__imgs');
  if (!imgContainers.length) {
    return; // .business__imgs 요소가 없으면 스크립트를 실행하지 않음
  }
  imgContainers.forEach(function (imgContainer) {
    // 모든 img 요소를 선택합니다.
    var imgElements = imgContainer.querySelectorAll('img[data-src]');
    //console.log(imgElements.length);
    // 로더 표시 함수
    var showLoader = function showLoader(img) {
      var loader = document.createElement('div');
      loader.classList.add('loader');
      loader.innerText = 'Loading...';
      img.parentNode.appendChild(loader);
    };
    // 로더 제거 함수
    var hideLoader = function hideLoader(img) {
      var loader = img.parentNode.querySelector('.loader');
      if (loader) loader.remove();
    };

    // 이미지 로딩 완료 핸들러
    var onImageLoad = function onImageLoad(event) {
      var img = event.target;
      hideLoader(img);
    };

    // 이미지 로딩 에러 핸들러
    var onImageError = function onImageError(event) {
      var img = event.target;
      hideLoader(img);
      img.alt = '';
    };

    // 각 이미지 요소에 대해 처리합니다.
    imgElements.forEach(function (img) {
      var dataSrc = img.getAttribute('data-src');
      if (dataSrc) {
        var newSrc = !document.querySelector('.solution') ? "/assets/images/business/".concat(dataSrc) : "/assets/images/solution/".concat(dataSrc);

        // 로더를 표시합니다.
        showLoader(img);

        // 이벤트 리스너를 추가합니다.
        img.addEventListener('load', onImageLoad);
        img.addEventListener('error', onImageError);

        // src 속성을 설정하여 이미지를 로드합니다.
        img.setAttribute('src', newSrc);
        gsap.fromTo(img, {
          opacity: 0,
          scale: 1.2
        }, {
          opacity: 1,
          scale: 1,
          duration: 1,
          scrollTrigger: {
            trigger: img,
            start: 'top bottom-=200',
            //end : 'bottom bottom',
            scrub: false
          }
        });
      }
    });
  });
});
"use strict";

document.addEventListener('DOMContentLoaded', function () {
  // GSAP과 ScrollTrigger를 등록합니다.
  gsap.registerPlugin(ScrollTrigger, ScrollToPlugin);
  var cardsWrap = document.querySelector('.cards__wrap');
  if (!cardsWrap) return;
  var cardsItem = document.querySelectorAll('.cards__figure');
  gsap.set('.cards__wrap', {
    clearProps: 'all'
  });
  gsap.set(cardsWrap, {
    height: cardsWrap.scrollHeight
  });
  var totalItems = cardsItem.length;
  var progressArray = new Array(totalItems).fill(0);
  function updateProgressBar() {
    var totalProgress = progressArray.reduce(function (sum, progress) {
      return sum + progress;
    }, 0) / totalItems;
    var progressPercentage = totalProgress * 100;
    document.querySelector('.progress__bar--gage').style.width = "".concat(progressPercentage, "%");
  }
  cardsItem.forEach(function (image, idx) {
    set_scroll_image(image, idx);
  });
  function set_scroll_image(image, imageNo) {
    gsap.to(image, {
      y: -240,
      scrollTrigger: {
        id: "st-promotion-image-".concat(imageNo),
        trigger: image,
        start: 'top bottom',
        end: 'bottom center',
        scrub: 0.5,
        onUpdate: function onUpdate(self) {
          // 개별 이미지의 진행률을 저장합니다.
          progressArray[imageNo] = self.progress;
          updateProgressBar(); // 전체 진행률을 업데이트합니다.
        },
        onLeave: function onLeave(self) {
          // 스크롤이 앞으로 이동할 때 진행률을 업데이트합니다.
          progressArray[imageNo] = 1;
          updateProgressBar();
        },
        onLeaveBack: function onLeaveBack(self) {
          // 스크롤이 뒤로 이동할 때 진행률을 업데이트합니다.
          progressArray[imageNo] = 0;
          updateProgressBar();
        },
        onEnterBack: function onEnterBack(self) {
          // 스크롤이 뒤에서 다시 앞으로 이동할 때 진행률을 업데이트합니다.
          progressArray[imageNo] = self.progress;
          updateProgressBar();
        }
      }
    });
  }
});
"use strict";

//import * as validate from './validation.js';

var mediaScreen = {
  sm: 576,
  md: 768,
  lg: 1000,
  xl: 1440,
  xxl: 1660
};
var body = document.body;
var header = document.getElementById('header');
var btnMobile = document.getElementById('btnMobile');
var gnbItems = document.querySelectorAll('#gnb > li');
var mobileMenuUL = document.querySelector('ul.mobile-menu');
var mobileMenus = document.querySelectorAll('ul.mobile-menu .menuitem');
var dropdownButtons = document.querySelectorAll(".dropdownButton");
var handleMobileButtonClick = function handleMobileButtonClick() {
  btnMobile.classList.toggle('active');
  body.classList.toggle('mobile-active');
};
mobileMenuUL.addEventListener('click', function (event) {
  if (event.target && event.target.classList.contains('menuitem')) {
    event.preventDefault();
    var parentLi = event.target.parentElement;
    var siblings = parentLi.parentElement.children;
    Array.prototype.forEach.call(siblings, function (sibling) {
      if (sibling !== parentLi) {
        sibling.classList.remove('active');
      }
    });
    parentLi.classList.toggle('active');
  }
});
var handleGnbItemMouseOver = function handleGnbItemMouseOver() {
  header.classList.add('open');
};
var handleGnbItemMouseOut = function handleGnbItemMouseOut() {
  header.classList.remove('open');
};
var handleDropdownButtonClick = function handleDropdownButtonClick(button, dropdownMenu, menuItems) {
  var isOpen = false;
  var toggleDropdown = function toggleDropdown() {
    isOpen = !isOpen;
    button.setAttribute("aria-expanded", isOpen);
    //dropdownMenu.style.display = isOpen ? "block" : "none";
  };
  button.addEventListener("click", function (event) {
    event.stopPropagation();
    toggleDropdown();
  });
  button.addEventListener("keydown", function (event) {
    if (event.key === "ArrowDown") {
      event.preventDefault();
      if (!isOpen) toggleDropdown();
      menuItems[0].focus();
    }
  });
  menuItems.forEach(function (item, index) {
    item.addEventListener("keydown", function (event) {
      var _handleKeyDown$event$;
      var handleKeyDown = {
        ArrowDown: function ArrowDown() {
          event.preventDefault();
          menuItems[(index + 1) % menuItems.length].focus();
        },
        ArrowUp: function ArrowUp() {
          event.preventDefault();
          menuItems[(index - 1 + menuItems.length) % menuItems.length].focus();
        },
        Escape: function Escape() {
          toggleDropdown();
          button.focus();
        }
      };
      (_handleKeyDown$event$ = handleKeyDown[event.key]) === null || _handleKeyDown$event$ === void 0 || _handleKeyDown$event$.call(handleKeyDown);
    });
    item.addEventListener("click", function () {
      button.textContent = item.textContent;
      toggleDropdown();
    });
  });
  document.addEventListener("click", function (event) {
    if (!button.contains(event.target) && !dropdownMenu.contains(event.target)) {
      if (isOpen) {
        toggleDropdown();
      }
    }
  });
};

// 헤더 스크롤 이벤트
function headers() {
  var header = document.querySelector('.header');
  var breadcrumb = document.querySelector('.breadcrumb');
  var breadcrumbTop = header.offsetHeight;
  var lastScrollY = window.pageYOffset || document.documentElement.scrollTop;
  function updateScrollDirection() {
    var currentScrollY = window.pageYOffset || document.documentElement.scrollTop;
    var isScrollingDown = currentScrollY > lastScrollY;
    if (header.classList.contains('_sub') && breadcrumb) {
      if (currentScrollY >= breadcrumbTop) {
        if (isScrollingDown) {
          header.classList.add('hide');
          header.classList.remove('up');
        } else {
          header.classList.remove('hide');
          if (currentScrollY > 0) {
            header.classList.add('up');
          } else {
            header.classList.remove('up');
          }
        }
      } else {
        header.classList.remove('hide', 'up');
      }
    } else {
      if (isScrollingDown) {
        header.classList.add('hide');
        header.classList.remove('up');
      } else {
        header.classList.remove('hide');
        if (currentScrollY > 0) {
          header.classList.add('up');
        } else {
          header.classList.remove('up');
        }
      }
    }
    lastScrollY = currentScrollY;
  }

  // 초기 스크롤 상태 반영
  document.addEventListener('DOMContentLoaded', function () {
    lastScrollY = window.pageYOffset || document.documentElement.scrollTop;
    // 초기 스크롤 상태 반영
    if (header.classList.contains('_sub') && breadcrumb) {
      var _breadcrumbTop = breadcrumb.getBoundingClientRect().top + window.scrollY;
      if (lastScrollY >= _breadcrumbTop) {
        header.classList.add('up hide');
      } else {
        header.classList.remove('up hide');
      }
    } else {
      if (lastScrollY > 50) {
        header.classList.add('up hide');
      } else {
        header.classList.remove('up hide');
      }
    }
  });

  // 스크롤 이벤트 리스너 추가
  window.addEventListener('scroll', updateScrollDirection);
}

// gnb copy => mobile paste
function updateMobileMenu() {
  // gnb 아이디를 가진 ul 태그를 선택
  var gnbUl = document.getElementById('gnb');
  // mobile-menu 클래스를 가진 ul 태그를 선택
  var mobileMenuUl = document.querySelector('ul.mobile-menu');
  if (!mobileMenuUl) return;
  // gnbUl의 자식 요소들을 모두 가져오기
  var gnbChildren = gnbUl.innerHTML;
  // mobileMenuUl에 gnbUl의 자식 요소들을 추가
  mobileMenuUl.innerHTML = gnbChildren;

  // gnb--li1 클래스를 가진 모든 li 요소 선택
  var gnbLiElements = document.querySelectorAll('#gnb .gnb--li1');
  var firstListUl = document.querySelector('ul.first-list');
  if (firstListUl == null) return;
  gnbLiElements.forEach(function (gnbLi) {
    var firstATag = gnbLi.querySelector('a'); // 첫 번째 a 태그 선택
    if (firstATag) {
      var newLi = document.createElement('li'); // 새로운 li 요소 생성
      newLi.appendChild(firstATag.cloneNode(true)); // a 태그를 복사하여 li에 추가
      firstListUl.appendChild(newLi); // 새로운 ul에 li 추가
    }
  });
}
// 서브 페이지 맨처음 intro 및 메뉴 active 설정
(function pageTitles() {
  var ulElement = document.querySelector('[data-page-title]');
  if (!ulElement) return;
  var liElements = ulElement.querySelectorAll('li');
  var pageTitle = ulElement.getAttribute('data-page-title');
  liElements.forEach(function (li) {
    if (li.textContent.trim() === pageTitle) {
      li.classList.add('_current');
    }
  });
  var introTitleElement = document.querySelector('.page_title');
  introTitleElement.textContent = pageTitle;

  // current
  var pageConentWrap = document.querySelector('[data-layout]');
  var pageConentTitle = pageConentWrap.getAttribute('data-current');
  var introBgElement = document.querySelector('.intro--banner_bg');
  introBgElement.classList.add('_' + pageConentTitle);
})();
var breadCrumbDrop = function breadCrumbDrop() {
  var breadCrumbButton = document.querySelector('.breadcrumb--menu_drop .trigger');
  var breadCrumbButton2 = document.querySelector('.breadcrumb--sub_list button');
  var breadCrumbMenu = document.querySelector('.first-list');
  if (breadCrumbMenu == null) return;
  breadCrumbButton.addEventListener('click', function () {
    breadCrumbButton.classList.toggle('_open');
  });
  breadCrumbButton2.addEventListener('click', function () {
    breadCrumbButton2.classList.toggle('_open');
  });
};
var smoothscroll = {
  passive: function passive() {
    var supportsPassive = false;
    try {
      document.addEventListener('test', null, {
        get passive() {
          supportsPassive = true;
        }
      });
    } catch (e) {}
    return supportsPassive;
  },
  init: function init() {
    var userAgent = navigator.userAgent.toLowerCase();
    var isMobile = /iphone|ipod|android|blackberry|mini|windows\sce|palm/i.test(userAgent);
    var isMac = /macintosh|mac os x/i.test(userAgent);
    var isWindows = /windows/i.test(userAgent);
    var isLinux = /linux/i.test(userAgent);
    if (isMobile || isMac) return;

    //if (document.documentElement.classList.contains('mobile') || document.documentElement.classList.contains('mac')) return;

    if (this.passive()) {
      window.addEventListener('wheel', this.scrolling, {
        passive: false
      });
    } else {
      window.addEventListener('mousewheel', this.scrolling);
      window.addEventListener('DOMMouseScroll', this.scrolling);
    }
  },
  destroy: function destroy() {
    if (this.passive()) {
      window.removeEventListener('wheel', this.scrolling);
    } else {
      window.removeEventListener('mousewheel', this.scrolling);
      window.removeEventListener('DOMMouseScroll', this.scrolling);
    }
    gsap.killTweensOf(window, {
      scrollTo: true
    });
  },
  scrolling: function scrolling(event) {
    event.preventDefault();
    var scrollTime = 1;
    var distanceOffset = 4.5;
    var scrollDistance = window.innerHeight / distanceOffset;
    var delta = 0;
    if (smoothscroll.passive()) {
      delta = event.wheelDelta / 120 || -event.deltaY / 4;
    } else {
      if (typeof event.originalEvent.deltaY != 'undefined') {
        delta = -event.originalEvent.deltaY / 120;
      } else {
        delta = event.originalEvent.wheelDelta / 120 || -event.originalEvent.detail / 3;
      }
    }
    var scrollTop = document.documentElement.scrollTop;
    var finalScroll = scrollTop - parseInt(delta * scrollDistance);
    gsap.to(window, {
      duration: scrollTime,
      scrollTo: {
        y: finalScroll,
        autoKill: true
      },
      ease: 'power3.out',
      overwrite: 5
    });
  }
};
var init = function init() {
  smoothscroll.init();
  breadCrumbDrop();
  headers();
  updateMobileMenu();
  document.getElementById('btnTop').addEventListener('click', function () {
    gsap.to(window, {
      duration: 1,
      scrollTo: {
        y: 0,
        autoKill: true
      }
    });
  });
  btnMobile.addEventListener('click', handleMobileButtonClick);
  mobileMenus.forEach(function (menu) {
    menu.addEventListener('click', handleMobileMenuClick);
  });
  gnbItems.forEach(function (item) {
    item.addEventListener('mouseover', handleGnbItemMouseOver);
    item.addEventListener('mouseout', handleGnbItemMouseOut);
  });
  dropdownButtons.forEach(function (button) {
    var dropdownMenu = document.getElementById(button.getAttribute("aria-controls"));
    var menuItems = dropdownMenu.querySelectorAll('[role="menuitem"]');
    handleDropdownButtonClick(button, dropdownMenu, menuItems);
  });
};
document.addEventListener("DOMContentLoaded", init);
document.addEventListener("DOMContentLoaded", function () {
  // 현재 주소가 특정 URL인지 확인
  if (window.location.href === "https://www.ltmetric.com/outsider/" || window.location.href === "https://www.ltmetric.com/outsider") {
    // #header 안에 있는 모든 a 태그 선택
    var links = document.querySelectorAll("#header a");

    // 각 a 태그의 href 속성을 빈 문자열로 설정
    links.forEach(function (link) {
      link.removeAttribute("href");
    });
  }
});
"use strict";


function introBanner() {
  var isNonScroll = document.querySelector('[data-current]');
  var bannerTitle = document.querySelector('.intro--banner_title');
  var visualElement = document.querySelector('.intro--visual');
  var visualWrap = document.querySelector('.intro--banner_bg');
  var intro = document.querySelector(".intro--banner");
  if (!intro) return;
  var introHeadAction = {
    enter: function enter() {
      bannerTitle.classList.add('is-break');
      bannerTitle.style.marginTop = '0';
      bannerTitle.style.top = '45%';
      bannerTitle.style.transform = 'translateY(-50%)';
    },
    leave: function leave() {
      bannerTitle.classList.remove('is-break');
      bannerTitle.removeAttribute('style');
    }
  };
  gsap.to('.page_title', {
    scrollTrigger: {
      trigger: visualWrap,
      start: 'top 30%',
      end: 'top',
      scrub: 0.3,
      toggleClass: {
        targets: bannerTitle,
        className: 'is-active'
      }
    }
  });
  gsap.to('.sub_title_desc', {
    scrollTrigger: {
      trigger: visualWrap,
      start: 'top 30%',
      end: 'top',
      scrub: 0.3,
      toggleClass: {
        targets: bannerTitle,
        className: 'is-active'
      }
    }
  });
  gsap.to(bannerTitle, {
    scrollTrigger: {
      trigger: visualElement,
      start: function start() {
        return window.innerWidth <= 768 ? 'top 5%' : 'top 10%';
      },
      end: 'bottom',
      onEnter: function onEnter() {
        introHeadAction.enter();
      },
      onLeave: function onLeave() {
        // 클래스 추가
        bannerTitle.classList.add('is-break');

        // top 스타일을 현재 윈도우 스크롤 위치로 설정
        bannerTitle.style.top = "".concat(window.scrollY, "px");
        introHeadAction.enter();
      },
      onEnterBack: function onEnterBack() {
        introHeadAction.enter();
      },
      onLeaveBack: function onLeaveBack() {
        introHeadAction.leave();
      }
    }
  });
  
}
introBanner();
// 윈도우 리사이즈 이벤트 핸들러 추가
window.addEventListener('resize', function () {
  // ScrollTrigger.refresh() 호출
  ScrollTrigger.refresh();
});
"use strict";

document.addEventListener('DOMContentLoaded', function () {
  var alignces = document.querySelector('.special-links a');
  var aligncesClose = document.querySelector('.alliance--close');
  function Effect() {
    var EffectClassName1 = 'effect-txt';
    var EffectClassName2 = 'effect-txt02';
    var activeClassName = 'active';

    // IntersectionObserver callback function
    var callback = function callback(entries, observer) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add(activeClassName);
        } else {
          //entry.target.classList.remove(activeClassName);
        }
      });
    };

    // Create IntersectionObserver instances
    var observer1 = new IntersectionObserver(callback, {
      threshold: 0.5
    });
    var observer2 = new IntersectionObserver(callback, {
      threshold: 0.2
    });

    // Observe elements with EffectClassName1
    var elements1 = document.querySelectorAll(".".concat(EffectClassName1));
    if (elements1) {
      elements1.forEach(function (element) {
        observer1.observe(element);
      });
    }

    // Observe elements with EffectClassName2
    var elements2 = document.querySelectorAll(".".concat(EffectClassName2));
    if (elements2) {
      elements2.forEach(function (element) {
        observer2.observe(element);
      });
    }
  }

  //Effect();

  alignces.addEventListener('click', function () {
    var allianceModal = document.querySelector('.alliance');
    allianceModal.classList.add('active');
  });
  aligncesClose.addEventListener('click', function () {
    var allianceModal = document.querySelector('.alliance');
    allianceModal.classList.remove('active');
  });

  // 모든 버튼 요소를 선택합니다.
  var buttons = document.querySelectorAll('[data-trigger="modal"]');

  // 모달 열기 함수
  var openModal = function openModal(modal) {
    modal.classList.add('active');
  };

  // 모달 닫기 함수
  var closeModal = function closeModal(modal) {
    modal.classList.remove('active');
  };

  // 버튼 클릭 이벤트 리스너를 추가합니다.
  buttons.forEach(function (button) {
    button.addEventListener('click', function () {
      var target = button.getAttribute('data-target');
      var targetVideo = button.getAttribute('data-modal-type');
      var modal = document.querySelector("[data-modal=\"".concat(target, "\"]"));
      var modalBodies = modal.querySelectorAll('.modal__body');
      if (modal) {
        openModal(modal);
        if (targetVideo) {
          var existingVideo = document.getElementById('dynamicVideo');
          var sourceSrc = button.getAttribute('data-source');
          if (existingVideo) {
            existingVideo.parentNode.removeChild(existingVideo);
          }
          var video = document.createElement('video');
          video.id = 'dynamicVideo';
          video.controls = true;
          var source = document.createElement('source');
          source.src = sourceSrc;
          source.type = 'video/mp4';
          video.appendChild(source);
          document.getElementById('videoContainer').appendChild(video);
          video.play();
        }

        // 모달 닫기 버튼 이벤트 리스너를 추가합니다.
        var closeButton = modal.querySelector('.modal__close');
        if (closeButton) {
          closeButton.addEventListener('click', function () {
            return closeModal(modal);
          });
        }

        // 모달 외부 클릭 시 닫기 이벤트 리스너를 추가합니다.
        modal.addEventListener('click', function (event) {
          var clickedOutside = true;
          modalBodies.forEach(function (modalBody) {
            if (modalBody.contains(event.target)) {
              clickedOutside = false;
            }
          });
          if (clickedOutside) {
            closeModal(modal);
          }
        });
        window.addEventListener('click', function (event) {
          if (event.target === modal) {
            closeModal(modal);
          }
        });
      }
    });
  });
  window.addEventListener('resize', function () {
    if (window.innerWidth < 1240) {
      document.querySelector('.alliance').classList.remove('active');
    }
  });
});
"use strict";

var isSolution = document.querySelector('[data-current="business"]') ? true : false;
if (!isSolution) {} else {
  var bar = document.querySelector('.bar');
  document.addEventListener("DOMContentLoaded", function () {
    var insertBar = document.querySelector(".breadcrumb");
    var contents = document.getElementById("contents");
    var progressBar = document.createElement("div");
    progressBar.classList.add("bar");
    insertBar.appendChild(progressBar);
    function updateProgressBar() {
      var contentHeight = contents.scrollHeight;
      var windowHeight = window.innerHeight;
      var scrollY = window.scrollY;
      var scrollPercent = scrollY / (contentHeight - windowHeight) * 100;
      progressBar.style.width = Math.min(scrollPercent, 100) + "%";
    }
    function onResize() {
      updateProgressBar();
    }
    window.addEventListener("scroll", updateProgressBar);
    window.addEventListener("resize", onResize);

    // Initial update
    updateProgressBar();
  });
}
"use strict";

/*
    1. input value;
*/
// 이메일 직접입력 select
var dirDomain = function dirDomain(el) {
  var domainList = el;
  domainList = domainList.value;
  if (domainList === "직접입력") {
    el.previousElementSibling.value = "";
    el.disabled = false;
  } else {
    el.previousElementSibling.value = domainList;
    el.previousElementSibling.disabled = true;
  }
};
var validateForm = function validateForm(el) {
  var f = el;
  // 이메일 check
  var email = f.firstEmail.value + "@" + f.secondEmail.value;
  if (!validateEmail(email)) {
    alert("error");
    return;
  }
  function validateEmail(email) {
    var emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  }

  // 핸드폰 번호 체크
  var phoneNumber = f.phoneNumber.value;
  if (!validatePhoneNumber(phoneNumber)) {
    alert("error");
    return;
  }
  function validatePhoneNumber(phoneNumber) {
    var phoneNumberRegex = /^\d{3}-\d{3,4}-\d{4}$/;
    return phoneNumberRegex.test(phoneNumber);
  }
  //const phoneNumberRegex = /^\d{3}-\d{3,4}-\d{4}$/;
};