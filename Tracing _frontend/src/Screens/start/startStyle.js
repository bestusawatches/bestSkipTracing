import { styled } from "styled-components";

export const StartScreenWrapper = styled.div`
  background: #01122e;
  height: 100vh;
  width: 100vw;
  display: flex;
  flex-direction: row;
  overflow: hidden;
  @media (max-width: 550px) {
    flex-direction: column;
  }
`;

export const StartScreenLeft = styled.div`
  color: #000;
  background-color: #ffffff;
  font-family: Poppins-Regular;
  font-size: 72px;
  font-style: normal;
  font-weight: 500;
  flex-basis: 65%; /* Takes 60% of the width */
  flex-grow: 1;

  @media (max-width: 550px) {
    flex-basis: 100%; /* Takes full width in mobile */
  }
`;

export const StartScreenRight = styled.div`
  color: #000;
  background-color: #0a6a7c;
  font-family: Poppins-Regular;
  font-style: normal;
  font-weight: 500;
  flex-basis: 35%; /* Takes 40% of the width */
  flex-grow: 1;

  @media (max-width: 550px) {
    flex-basis: 100%; /* Takes full width in mobile */
  }
`;

export const StartScreenLogo = styled.div`
  margin-top: 2vh;
  margin-left: 40%;
`;

export const StartScreenContent = styled.div`
  color: #000;
  font-family: Poppins-Regular;
  font-size: 76px;
  width: 40%;
  margin-top: 20vh;
  margin-left: 5vw;
  font-style: normal;
  font-weight: 500;
  line-height: 114.5%; /* 82.44px */

  @media (max-width: 1600px) {
    font-size: 56px;
  }

  @media (max-width: 1200px) {
    font-size: 46px;
  }

  @media (max-width: 1000px) {
    font-size: 36px;
  }

  @media (max-width: 550px) {
    width: 90%;
    font-size: 36px;
    margin-top: 0px;
  }
`;

export const StartScreenParagraph = styled.div`
  color: #01122e;
  font-family: Poppins-Regular;
  font-size: 22px;
  width: 40%;
  margin-top: 30px;
  margin-left: 5vw;
  font-style: normal;
  font-weight: 500;
  line-height: 114.5%; /* 82.44px */
  @media (max-width: 550px) {
    width: 90%;
  }

  @media (max-width: 1200px) {
    font-size: 16px;
  }
`;



export const StartScreenVector4 = styled.div`
  top: 15%;
  left : 50%;
  @media (max-width: 550px) {
    width: 60%;
  }
}
`;

export const StartScreenBack = styled.div`
  position: absolute;
  z-index: 999;
  img{
    height: 70vh;
    width: 50vw;
  }
  
  @media (max-width: 786px) and (min-width: 540px) {
    margin-left: 15vw;
    img{
      width: 70vw;
    }
    
  }

  @media (max-width: 540px){
    margin-left: 10vw;
    img{
      width: 80vw;
    }
  }
}
`;

export const StartScreenMan1 = styled.div`
  position: absolute;
  // margin-top : 45%;
  margin-left : 11vw;
  img{
    height: 65vh;
    width: 30vw;
    z-index: 0;
  }

  @media (max-width: 786px) and (min-width: 540px) {
    margin-left : 25vw;
    img{
      height: 65vh;
      width: 50vw;
      z-index: 0;
    }
  }

  @media (max-width: 540px) {
    margin-left : 10vw;
    img{
      height: 65vh;
      width: 80vw;
      z-index: 0;
    }
  }
}
`;

export const StartScreenMan2 = styled.div`
  position: absolute;
  // margin-top : 45%;
  margin-left : 45vw;
  
  img{
    height: 100vh;
    width: 55vw;
  }

  @media (max-width: 786px) {
    width: 0vw;
    img{
      height: 100vh;
      width: 0vw;
    }
  }

}
`;

export const StartScreenCall1 = styled.button`
  width: 15vw;
  height: 10vh;
  padding: 10px;
  justify-content: center;
  align-items: center;
  gap: 10px;
  border-radius: 8px;
  border: 1px solid #0a6a7c;
  font-family: Poppins-Regular;
  font-size: 30px;
  margin-top: 80vh;
  margin-left: 30vw;
  color: #fff;

  &:active {
    background-color: #01122e;
    color: #000;
  }

  &:hover {
    background-color: #01122e;
    color: #000;
  }

  @media (max-width: 1300px) {
    font-size: 16px;
  }

  @media (max-width: 786px) {
    font-size: 16px;
  }

  @media (max-width: 540px) {
    font-size: 14px;
    width: 30vw;
    margin-left: 15vw;
  }
`;

export const StartScreenHelp = styled.button`
  width: 15vw;
  height: 10vh;
  padding: 10px;
  justify-content: center;
  align-items: center;
  gap: 10px;
  border-radius: 8px;
  border: 1px solid #0a6a7c;
  font-family: Poppins-Regular;
  font-size: 30px;
  margin-top: 80vh;
  margin-left: 10vw;
  color: #fff;

  &:active {
    background-color: #01122e;
    color: #000;
  }

  &:hover {
    background-color: #01122e;
    color: #000;
  }

  @media (max-width: 1300px) {
    font-size: 16px;
  }

  @media (max-width: 786px) {
    font-size: 12px;
  }

  @media (max-width: 540px) {
    font-size: 14px;
    width: 30vw;
  }
`;

export const OutCircle = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  position: absolute;
  width: 16vh;
  height: 16vh;
  left: -8vh;
  top: 52vh;
  border-radius: 50%;
  background-color: #0a6a7c;

  @media (max-width: 1500px) {
    width: 12vh;
    height: 12vh;
    left: -6vh;
  }

  @media (max-width: 1300px) {
    width: 10vh;
    height: 10vh;
    left: -5vh;
  }

  @media (max-width: 1300px) {
    width: 10vh;
    height: 10vh;
    left: -5vh;
  }
`;

export const InnerCircle = styled.div`
  position: relative;
  width: 80%;
  height: 80%;
  border-radius: 50%;
  background-color: white;
`;

export const IconCircle = styled.div`
  img {
    position: "absolute",
    width: "80%",
    height: "80%",
    top: "10%",
    left: "10%",
  }
`;
