(function ($) {
    'use strict';
  
// Add this to your existing scripts.js file or create a new one
    console.log("Script started");
    console.log("jQuery version:", $.fn.jquery);

//transition for pages
    
document.addEventListener('DOMContentLoaded', function() {
    // Create the overlay element
    const overlay = document.createElement('div');
    overlay.id = 'page-transition-overlay';
    
    // Create a container for the GIF
    const gifContainer = document.createElement('div');
    gifContainer.id = 'transition-gif-container';
    
    // Create an img element for the GIF
    const gifImage = document.createElement('img');
    gifImage.src = '/assets/loading.gif'; // Update this path
    gifImage.alt = 'Loading';
    
    // Append elements
    gifContainer.appendChild(gifImage);
    overlay.appendChild(gifContainer);
    document.body.appendChild(overlay);
  
    // Function to handle page transitions
    function handlePageTransition(event) {
      const target = event.target.closest('a');
      if (!target) return;
  
      const href = target.getAttribute('href');
      if (!href || href.startsWith('#') || href.includes(':')) return; // Ignore non-links, hash links, and external links
  
      event.preventDefault();
      overlay.classList.add('active');
  
      setTimeout(() => {
        window.location.href = href;
      }, 1000); // Adjust this time as needed
    }
  
    // Add click event listener to all links
    document.body.addEventListener('click', handlePageTransition);
  });


// END Transition Pages

    $(function () {
      console.log("DOM ready");
      $("#navbar").load("components/navbar.html", function(response, status, xhr) {
        console.log("Load attempt completed");
        if (status == "error") {
          console.log("Error loading navbar:", xhr.status, xhr.statusText);
        }
      });
    });
  





})(jQuery);