import { ThemeProvider } from '@material-ui/core/styles';
import { createTheme } from '@material-ui/core';
import DataVisualization from './Screens/DataVisualization';

const App = () => {

  // #29314F - sec

  const theme = createTheme({
    palette: {
      type: "dark",
      primary: {
        main: "#111936",
        card: "#29314F",
        text: "#FFFFFF",
      },
      secondary: {
        main: "#1A223F",
        text: "#FFFFFF",
      },
    },
  });

  return (
    <ThemeProvider theme={theme}>
      <DataVisualization />
    </ThemeProvider>
  );
}

export default App;
