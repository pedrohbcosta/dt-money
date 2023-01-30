import { Header } from "../../components/Header";
import { Summary } from "../../components/Summay";
import { TransactionContainer } from "./styles";

export function Transactions() {
  return (
    <TransactionContainer>
      <Header/>
      <Summary/>
    </TransactionContainer>
  )
}