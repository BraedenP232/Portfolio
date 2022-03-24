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
btn.addEventListener('click', function onClick(event) {
    // 👇️ change background color
    document.body.style.background = 'var(--background-color)';
  
    // 👇️ optionally change text color
    // document.body.style.color = 'white';
    btn.style.display = 'none';
  });