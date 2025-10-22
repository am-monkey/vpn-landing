$(function () {
  $("#menu-btn").on("click", function () {
    $(this).toggleClass("close");
    $("#mobile-menu").toggleClass("active");
    $("body").toggleClass("overflow");
  });

  var video = $(".slide video");

  var WindowWidth = $(window).width();

  if (WindowWidth < 768) {
    video.attr("src", "./assets/m-50-min.mp4");
  } else {
    video.attr("src", "./assets/d-50-min.mp4");
  }
});

function findVideos() {
  let videos = document.querySelectorAll(".video");

  for (let i = 0; i < videos.length; i++) {
    setupVideo(videos[i]);
  }
}

function setupVideo(video) {
  let link = video.querySelector(".video__link");
  let id = parseMediaURL(link);

  video.addEventListener("click", () => {
    let iframe = createIframe(id);

    link.remove();
    video.appendChild(iframe);
  });

  link.removeAttribute("href");
  video.classList.add("video--enabled");
}

function parseMediaURL(link) {
  let regexp =
    /^.*((youtu.be\/)|(v\/)|(\/u\/\w\/)|(embed\/)|(watch\?))\??v?=?([^#&?]*).*/;
  let url = link.href;
  let match = url.match(regexp);

  return match && match[7].length == 11 ? match[7] : "";
}

function createIframe(id) {
  let iframe = document.createElement("iframe");

  iframe.setAttribute("allowfullscreen", "");
  iframe.setAttribute("allow", "autoplay");
  iframe.setAttribute("src", generateURL(id));
  iframe.classList.add("video__media");

  return iframe;
}

function generateURL(id) {
  let query = "?rel=0&showinfo=0&autoplay=1";

  return "https://www.youtube.com/embed/" + id + query;
}

findVideos();

var $el = $(".hero-title:first"),
  text = $.trim($el.text()),
  words = text.split(" "),
  html = "";

for (var i = 0; i < words.length; i++) {
  html +=
    '<div style="display:none">' +
    words[i] +
    (i + 1 === words.length ? "" : " ") +
    "</div>";
}
elements = $el.html(html).children();

function text_to_time(text) {
  // implement your function
  times = [100, 1000, 2000];
  return times[text.length];
}

function next_word(i, _elements) {
  element = _elements[i];
  element = $(element);

  element.fadeIn(500, function () {
    i = i + 1;
    if (_elements.length > i) {
      time = text_to_time($(_elements[i]).text());
      setTimeout(function () {
        next_word(i, _elements);
      }, time);
    }
  });
}

setTimeout(function () {
  next_word(0, elements);
}, 1000);
