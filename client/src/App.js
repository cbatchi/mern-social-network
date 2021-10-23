import { ThemeProvider } from 'styled-components';
import { GlobalStyles } from "./components/styles/GlobalStyles.styled";
import theme from "./components/styles/Theme.styled";

const App = () => {
  return <ThemeProvider theme={theme}>
    <GlobalStyles />
    
  </ThemeProvider>
}

export default App;
