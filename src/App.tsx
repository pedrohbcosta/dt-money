import { ThemeProvider } from "styled-components";
import { Transactions } from "./Pages/Transactions";
import { GlobalStyle } from "./styles/global";
import { defaultTheme } from "./styles/themes/default";

export function App() {

  return (
    <ThemeProvider theme={defaultTheme}>
      <Transactions/>
      <GlobalStyle />
    </ThemeProvider>
  )
}
