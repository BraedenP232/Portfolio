// get the element
const element = document.getElementById('info_click')
// set isdark to true or false once
var isdark = (window?.matchMedia('(prefers-color-scheme: dark)').matches)
// always checking if the element is clicked
element.addEventListener("click", () => {
    function toggleDarkMode() {
          if (isdark) {
            // reset style
            document.documentElement.style.display = 'none';
            // if dark mode is on, set to light mode css
            document.head.insertAdjacentHTML(
            'beforeend',
            '<link rel="stylesheet" href="css/light.css" onload="document.documentElement.style.display = \'\'">',
            // toggle variable because user's device will still be in dark mode
            isdark = false
          );
          } else {
            // reset style
            document.documentElement.style.display = 'none';
            // if light mode is on, set to dark mode css
            document.head.insertAdjacentHTML(
            'beforeend',
            '<link rel="stylesheet" href="css/dark.css" onload="document.documentElement.style.display = \'\'">',
            // toggle variable because user's device will still be in light mode
            isdark = true
            
          );
          }
        
      }
    toggleDarkMode()
});


// Function to set background to constant color due to distraction
// Color still varies by dark/light mode
const btn = document.getElementById('distraction')
var toggled = false;
btn.addEventListener('click', function onClick(event) {
  if (!toggled) {
     // 👇️ change background color
     document.body.style = '-webkit-transition: --background-color 1000ms linear;-ms-transition: --background-color 1000ms linear;transition: --background-color 1000ms linear;'
     document.body.style.background = 'var(--background-color)';
    
     // 👇️ optionally change text color
     // document.body.style.color = 'white';

     // boolean variable set to true for toggling simple background
     toggled = true
    //  btn.style.display = 'none';
  } else {
    // toggle back to animated gradient.
    document.body.style.background = 'var(--gradient)';
    document.body.style = 'animation: gradient 15s ease infinite;'

    // boolean variable set to true for toggling simple background
    toggled = false
  }
  });