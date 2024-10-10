(function ($) {
    'use strict';
  
// Add this to your existing scripts.js file or create a new one
    console.log("Script started");
    console.log("jQuery version:", $.fn.jquery);

//transition for pages
 /*    
document.addEventListener('DOMContentLoaded', function() {
  // Load the Lottie library
  const script = document.createElement('script');
  script.src = 'https://cdnjs.cloudflare.com/ajax/libs/lottie-web/5.7.14/lottie.min.js';
  document.head.appendChild(script);

  script.onload = function() {
      // Create the overlay element
      const overlay = document.createElement('div');
      overlay.id = 'page-transition-overlay';
      
      // Create a container for the Lottie animation
      const lottieContainer = document.createElement('div');
      lottieContainer.id = 'transition-lottie-container';
      
      // Append elements
      overlay.appendChild(lottieContainer);
      document.body.appendChild(overlay);

      // Initialize Lottie animation
      const animation = lottie.loadAnimation({
          container: lottieContainer,
          renderer: 'svg',
          loop: true,
          autoplay: false,
          path: './assets/loading.json' // Path to your Lottie JSON file
      });

      // Function to handle page transitions
      function handlePageTransition(event) {
          const target = event.target.closest('a');
          if (!target) return;

          const href = target.getAttribute('href');
          if (!href || href.startsWith('#') || href.includes(':')) return; // Ignore non-links, hash links, and external links

          event.preventDefault();
          overlay.classList.add('active');
          animation.play(); // Start the Lottie animation

          setTimeout(() => {
              window.location.href = href;
          }, 100); // Adjust this time as needed
      }

      // Add click event listener to all links
      document.body.addEventListener('click', handlePageTransition);
  };
}); */

// END Transition Pages

    $(function () {
      console.log("DOM ready");
      $("#navbar").load("/components/navbar.html", function(response, status, xhr) {
        console.log("Load attempt completed");
        if (status == "error") {
          console.log("Error loading navbar:", xhr.status, xhr.statusText);
        }
      });
    });
    $(function () {
      console.log("DOM ready");
      $("#navbar3").load("/components/navbar3.html", function(response, status, xhr) {
        console.log("Load attempt completed");
        if (status == "error") {
          console.log("Error loading navbar3:", xhr.status, xhr.statusText);
        }
      });
    });
    $(function () {
      console.log("DOM ready");
      $("#blog").load("/components/blog.html", function(response, status, xhr) {
        console.log("Load attempt completed");
        if (status == "error") {
          console.log("Error loading blog:", xhr.status, xhr.statusText);
        }
      });
    });
    $(function () {
      console.log("DOM ready");
      $("#navbar2").load("/components/navbar2.html", function(response, status, xhr) {
        console.log("Load attempt completed");
        if (status == "error") {
          console.log("Error loading navbar2:", xhr.status, xhr.statusText);
        }
      });
    });
    $(function () {
      console.log("DOM ready");
      $("#header").load("/components/header.html", function(response, status, xhr) {
        console.log("Load attempt completed");
        if (status == "error") {
          console.log("Error loading navbar:", xhr.status, xhr.statusText);
        }
      });
    });
    $(function () {
      console.log("DOM ready");
      $("#footer").load("/components/footer.html", function(response, status, xhr) {
        console.log("Load attempt completed");
        if (status == "error") {
          console.log("Error loading footer:", xhr.status, xhr.statusText);
        }
      });
    });
    $(function () {
      console.log("DOM ready");
      $("#calltoaction").load("/components/sections/calltoaction.html", function(response, status, xhr) {
        console.log("Load attempt completed");
        if (status == "error") {
          console.log("Error loading call_to_action:", xhr.status, xhr.statusText);
        }
      });
    });
    $(function () {
      console.log("DOM ready");
      $("#blogsection").load("/components/sections/blogsection.html", function(response, status, xhr) {
        console.log("Load attempt completed");
        if (status == "error") {
          console.log("Error loading call_to_action:", xhr.status, xhr.statusText);
        }
      });
    });
    $(function () {
      console.log("DOM ready");
      $("#testimonial").load("/components/sections/testimonial.html", function(response, status, xhr) {
        console.log("Load attempt completed");
        if (status == "error") {
          console.log("Error loading call_to_action:", xhr.status, xhr.statusText);
        }
      });
    });
    $(function () {
      console.log("DOM ready");
      $("#features").load("/components/sections/features.html", function(response, status, xhr) {
        console.log("Load attempt completed");
        if (status == "error") {
          console.log("Error loading call_to_action:", xhr.status, xhr.statusText);
        }
      });
    });  





})(jQuery);