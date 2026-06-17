document.addEventListener("DOMContentLoaded", function () {
  var menuBtn = document.getElementById("menu-btn");
  var mobileMenu = document.getElementById("mobile-menu");

  if (menuBtn && mobileMenu) {
    menuBtn.addEventListener("click", function () {
      menuBtn.classList.toggle("close");
      mobileMenu.classList.toggle("active");
      document.body.classList.toggle("overflow");
    });
  }

  var video = document.querySelector(".slide video");
  if (video) {
    video.src =
      window.innerWidth < 768
        ? "./assets/m-50-min.mp4"
        : "./assets/d-50-min.mp4";
  }
});

(function () {
  var el = document.querySelector(".hero-title");
  if (!el) return;

  var text = el.textContent.trim();
  var words = text.split(" ");

  el.innerHTML = "";
  var elements = [];
  for (var i = 0; i < words.length; i++) {
    var word = document.createElement("div");
    word.style.display = "none";
    word.style.opacity = "0";
    word.style.transition = "opacity 500ms";
    word.textContent = words[i] + (i + 1 === words.length ? "" : " ");
    el.appendChild(word);
    elements.push(word);
  }

  var WORD_DELAY = 400;

  function fadeIn(element, done) {
    element.style.display = "";
    // force reflow so the transition runs
    void element.offsetWidth;
    element.style.opacity = "1";
    setTimeout(done, 500);
  }

  function nextWord(i) {
    fadeIn(elements[i], function () {
      var next = i + 1;
      if (elements.length > next) {
        setTimeout(function () {
          nextWord(next);
        }, WORD_DELAY);
      }
    });
  }

  setTimeout(function () {
    nextWord(0);
  }, 1000);
})();
