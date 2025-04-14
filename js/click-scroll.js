var sectionArray = [1, 2, 3, 4];

// Function to handle scroll events and update active classes
function updateActiveNavLinks() {
  $.each(sectionArray, function (index, value) {
    var offsetSection = $("#" + "section_" + value).offset().top - 75;
    var docScroll = $(document).scrollTop();
    var docScroll1 = docScroll + 1;
    var sectionBottom = offsetSection + $("#section_" + value).outerHeight();

    if (docScroll1 >= offsetSection && docScroll < sectionBottom) {
      // Update active classes in both navbar and footer
      $(".navbar-nav .nav-item .nav-link, .footer-links .click-scroll")
        .removeClass("active")
        .addClass("right-to-left");
      $(
        ".navbar-nav .nav-item .nav-link:link, .footer-links .click-scroll"
      ).addClass("inactive");

      // Set active class for header nav
      $(".navbar-nav .nav-item .nav-link")
        .eq(index)
        .addClass("active")
        .removeClass("right-to-left inactive");

      // Set active class for footer nav based on data-index
      $(".footer-links .click-scroll[data-index='" + index + "']")
        .addClass("active")
        .removeClass("right-to-left inactive");
    }
  });
}

// Initialize scroll event
$(document).scroll(updateActiveNavLinks);

// Handle click events for all click-scroll links
$(".click-scroll").click(function (e) {
  e.preventDefault();

  // Get the index from data attribute
  var index = $(this).data("index");
  var sectionValue = sectionArray[index];

  // Check if it's mobile view (width <= 768px)
  var isMobile = window.innerWidth <= 768;

  // Apply extra 50px offset only for mobile view
  var defaultOffset = 75;
  var mobileExtraOffset = 50;
  var totalOffset = isMobile
    ? defaultOffset - mobileExtraOffset
    : defaultOffset;

  var offsetClick =
    $("#" + "section_" + sectionValue).offset().top - totalOffset;

  $("html, body").animate(
    {
      scrollTop: offsetClick,
    },
    250
  );

  // Close the offcanvas when a nav link is clicked on mobile
  var offcanvas = bootstrap.Offcanvas.getInstance(
    document.getElementById("mobileNavbar")
  );
  if (offcanvas) {
    offcanvas.hide();
  }
});

$(document).ready(function () {
  // Initialize all nav link states
  $(
    ".navbar-nav .nav-item .nav-link:link, .footer-links .click-scroll"
  ).addClass("inactive");
  $(".navbar-nav .nav-item .nav-link")
    .eq(0)
    .addClass("active")
    .removeClass("inactive");
  $(".footer-links .click-scroll[data-index='0']")
    .addClass("active")
    .removeClass("inactive");

  // Run once to set initial states
  updateActiveNavLinks();
});
