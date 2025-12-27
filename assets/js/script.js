// script.js - Main JavaScript file for portfolio site

$(document).ready(function () {
  // Initialize Magnific Popup for image links
  $(".popup-link").magnificPopup({
    type: "image",
    closeOnContentClick: true,
    mainClass: "mfp-fade",
    removalDelay: 300,
    image: {
      verticalFit: true,
    },
  });

  // FAQ Interaction Handlers
  $(document).on("click", ".question", function () {
    $(".answer").hide();
    const answerHtml = $(this).next(".answer").html();

    $(".answer-view")
      .stop(true, true)
      .fadeOut(150, function () {
        $(this).html(
          '<button class="close-answer"><i class="bi bi-x"></i></button><div>' +
            answerHtml +
            "</div>"
        );
        $(this).fadeIn(250);
      });
  });

  $(document).on("click", ".close-answer", function (e) {
    e.stopPropagation();
    $(".answer-view").fadeOut(250, function () {
      $(this).empty();
    });
  });
});

// WhatsApp Redirection Logic
function setupWhatsAppRedirection() {
  const $wa = $("#wa-link");
  const desktopLink = $wa.data("desktop-link");
  const mobileLink = $wa.attr("href");

  function isMobileUA() {
    return /android|webos|iphone|ipad|ipod|blackberry|iemobile|opera mini/i.test(
      navigator.userAgent
    );
  }

  // Screen width check in rem converted to px (40rem * 16 = 640px)
  function isSmallScreen() {
    return window.matchMedia("(max-width: 40rem)").matches;
  }

  // If user NOT on mobile user agent AND screen width is NOT less than 40rem => desktop
  if (!isMobileUA() && !isSmallScreen()) {
    $wa.attr("href", desktopLink);
  } else {
    $wa.attr("href", mobileLink);
  }
}

// Initialize WhatsApp redirection on load
setupWhatsAppRedirection();

// Tooltip Functionality
$(document).ready(function () {
  $("a[data-tooltip-text]").hover(
    function (e) {
      const tooltipText = $(this).attr("data-tooltip-text");
      const $tooltip = $('<span class="custom-tooltip"></span>').text(
        tooltipText
      );
      $("body").append($tooltip);

      const offset = $(this).offset();
      const width = $(this).outerWidth();
      const height = $(this).outerHeight();

      $tooltip.css({
        top: offset.top + height / 2 - $tooltip.outerHeight() / 2,
        left: offset.left + width + 10,
        opacity: 1,
      });
    },
    function () {
      $(".custom-tooltip").remove();
    }
  );
});

// Back to Top Button Functionality
$(document).ready(function () {
  // Show/hide button on scroll
  $(window).scroll(function () {
    if ($(this).scrollTop() > 200) {
      $("#backToTop").fadeIn();
    } else {
      $("#backToTop").fadeOut();
    }
  });

  // Smooth scroll to top
  $("#backToTop").click(function (e) {
    e.preventDefault();
    $("html, body").animate({ scrollTop: 0 }, 600);
  });
});

// Reveal on Scroll Functionality
document.addEventListener("DOMContentLoaded", function () {
  const revealElements = document.querySelectorAll(".reveal-on-scroll");

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("visible");
        }
      });
    },
    {
      threshold: 0.1,
    }
  );

  revealElements.forEach((el) => observer.observe(el));
});
