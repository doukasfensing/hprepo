// Ensure the DOM is fully loaded
$(document).ready(function() {
    let bubbleTimeout; // Variable to hold the timeout ID
    let typingTimeout; // Variable to hold the typing timeout ID
  
    // Function to start the typewriter animation
    function typeWriter(text, element, delay = 100) {
      let index = 0;
      element.text(''); // Clear any existing text
  
      function type() {
        if (index < text.length) {
          element.append(text.charAt(index));
          index++;
          typingTimeout = setTimeout(type, delay);
        } else {
          // After typing completes, add the cursor
          element.after('<span id="cursor">|</span>');
        }
      }
  
      type();
    }
  
    // Function to initiate the bubble and typing
    function activateBubble() {
      $('.bubble').addClass('active');
      const bubbleText = $('#bubble-text');
      typeWriter('Will you be my boyfriend?', bubbleText, 100); // Adjust delay as needed
    }
  
    // Function to deactivate the bubble
    function deactivateBubble() {
      $('.bubble').removeClass('active');
      $('#bubble-text').text(''); // Clear the text
      $('#cursor').remove(); // Remove the cursor if present
      clearTimeout(typingTimeout); // Clear any ongoing typing
    }
  
    // Toggle button functionality
    $('.js-toggle').on('click', function(){
      $('.map-base').toggleClass('active');
  
      // Remove the bubble's active class when map is closed
      if (!$('.map-base').hasClass('active')) {
        deactivateBubble();
        clearTimeout(bubbleTimeout); // Clear any existing timeout
      } else {
        // Activate the bubble after 18 seconds
        bubbleTimeout = setTimeout(function() {
          activateBubble();
        }, 18000); // 18000 milliseconds = 18 seconds
      }
    });
  
    // Initialization of speech recognition starts here
    const artyom = new Artyom();
    var commands = [
      {
        indexes: ["I solemnly swear that I'm up to no good", "up to no good"],
        action: function() {
          $('.map-base').addClass('active');
  
          // Activate the bubble after 18 seconds
          bubbleTimeout = setTimeout(function() {
            activateBubble();
          }, 18000);
        }
      },
      {
        indexes: ["mischief managed"],
        action: function() {
          $('.map-base').removeClass('active');
          deactivateBubble();
          clearTimeout(bubbleTimeout); // Clear any existing timeout
        }
      }
    ];
  
    artyom.addCommands(commands);
  
    function startContinuousArtyom(){
      artyom.fatality();
  
      setTimeout(function(){
        artyom.initialize({
          lang: "en-GB",
          continuous: true,
          listen: true, 
          debug: true, // Enable debug for better feedback
          speed: 1
        }).then(function(){
          console.log("Artyom is ready to work!");
        });
      }, 250);
    }
  
    startContinuousArtyom();
  
    // Close bubble when close button is clicked
    $('.close-bubble').on('click', function() {
      deactivateBubble();
      clearTimeout(bubbleTimeout); // Prevent the bubble from reappearing
    });
  });