import { styled } from "styled-components";

export const StartScreenCall = styled.div`
  width: 24%;
  height: 15%;
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
  border: 2px solid var(--primary, #997ea4);
  img {
    position: absolute;
    border-radius: 190px;
    border: 2px solid var(--primary, #0a6a7c);
    display: flex;
    flex-direction: row;
    flex-wrap: nowrap;
    align-items: center;
    justify-content: center;
    cursor: pointer;
  }

  @media (max-width: 1600px) {
    font-size: 18px;
  }

  @media (max-width: 1400px) {
    font-size: 16px;
  }

  @media (max-width: 1000px) {
    width: 40vw;
    font-size: 16px;
  }
  // &:active {
  //   background-color: #ccc;
  // }

  // &:hover {
  //   background-color: #ccc;
  // }

  // @media (max-width: 550px) {
  //   width: 90%;
  // }

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
