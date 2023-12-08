import { styled } from "styled-components";

export const StartScreenCall = styled.div`
  width: 250px;
  height: 50px;
  justify-content: center;
  align-items: center;
  gap: 10px;
  position: absolute;
  display: flex;
  font-family: Poppins-Regular;
  font-size: 24px;
  font-style: normal;
  font-weight: 500;
  color: #0a6a7c;
  background-color: #fff;
  box-sizing: border-box;
  border-radius: 20px;
  border: 2px solid var(--primary, #f6eff9);
  img {
    width: 50px;
    hegith: 50px;
  }

  // &:active {
  //   background-color: #ccc;
  // }

  // &:hover {
  //   background-color: #ccc;
  // }

  @media (max-width: 550px) {
    width: 90%;
  }

  div {
    position: absolute;
    margin-top: 140px;
    font-family: Poppins-Regular;
    font-size: 24px;
    font-style: normal;
    font-weight: 500;
    font-color: #0a6a7c;
  }
`;
