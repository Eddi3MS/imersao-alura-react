import { createGlobalStyle } from "styled-components";
import "@fontsource/roboto";

const GlobalStyles = createGlobalStyle`
/* Box sizing rules ** Remove default margin */
*,
*::before,
*::after {
  box-sizing: border-box;
  margin: 0;
}


/* Set core root defaults */
html:focus-within {
  scroll-behavior: smooth;
}

/* Set core body defaults */
body {
  text-rendering: optimizeSpeed;
  line-height: 1.5;
}

html,
body,
#__next {
  height: 100vh;
  display: flex;
  flex: 1;
}
#__next {
  flex: 1;
}

#__next > * {
  flex: 1;
}


/* Make images easier to work with */
img,
picture {
  max-width: 100%;
  display: block;
}


:root { 
  --primary-050: #E3F9E5;
  --primary-100: #C1EAC5;
  --primary-200: #A3D9A5;
  --primary-300: #7BC47F;
  --primary-400: #57AE5B;
  --primary-500: #3F9142;
  --primary-600: #2F8132;
  --primary-700: #207227;
  --primary-800: #0E5814;
  --primary-900: #05400A;
    
      
  --neutrals-000: #FFFFFF;
  --neutrals-050: #F5F7FA;
  --neutrals-100: #E4E7EB;
  --neutrals-200: #CBD2D9;
  --neutrals-300: #9AA5B1;
  --neutrals-400: #52667A;
  --neutrals-500: #313D49;
  --neutrals-600: #29333D;
  --neutrals-700: #212931;
  --neutrals-800: #181F25;
  --neutrals-900: #101418;
  --neutrals-999: #080A0C;
}
  body {
    margin: 0;
    padding: 0;
    background-image: url('/bg.png');
    background-repeat: no-repeat;
    background-size: cover;
    font-family: 'Roboto', Helvetica, Sans-Serif;
  }
`;

export default GlobalStyles;
