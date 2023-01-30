import { HeaderContainer, HeaderContent, NewTransactionButton } from "./styles";

import dtLogo from "../../assets/dtLogo.svg";

export function Header() {
  return (
    <HeaderContainer>
      <HeaderContent>
        <img src={ dtLogo } alt="" />
        
        <NewTransactionButton>Nova transação</NewTransactionButton>
      </HeaderContent>
    </HeaderContainer>
  )
}