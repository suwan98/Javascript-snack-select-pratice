
const mbtiQuestionDOM = document.getElementsByClassName("mbti-question")[0];
const [yesButton,noButton] = document.getElementsByClassName('mbti-select')[0].children;
const [ selectDOM, pendingDOM, resultDOM] = document.getElementsByClassName('mbti-container');
const mbtiResultTitleDOM = document.getElementsByClassName('mbti-result')[0];
const mbtiResultDescriptionDOM = document.getElementsByClassName('mbti-description')[0];
const mbtiRetryButton = document.getElementsByClassName('mbti-retry-button')[0];

const mbtiQuestionList = [
    '짠 과자가 단 과자보다 좋다',
    '봉지 과자가 박스 과자 보다 좋다',
    '과자를 뜯으면 한번에 다 먹는다',
];

const getMbtiResult = (resultValue) => {
    //결과를 받아서 결과 정보를 반환해주는 함수
    //결과 정보의 형태는 
    
    switch(resultValue) {
        case 0:
          return {
            title: "과자 어린이 (A 유형)",
            description: "과자 어린이 (A 유형) 설명"
          };
        case 1:
          return {
            title: "과자 초심자 (B 유형)",
            description: "과자 초심자 (B 유형) 설명"
          };
        case 2:
          return {
            title: "과자 중급자 (C 유형)",
            description: "과자 중급자 (C 유형) 설명"
          };
        case 3:
        default:
          return {
            title: "과자 고수 (D 유형)",
            description: "과자 고수 (D 유형) 설명"
          }
      }

};



let currentRound = 0;
let resultValue = 0;
const maxRound = mbtiQuestionList.length; //3

const setPendingSection = () => {
    //pendingDOM을 나타내게 한 후 3초뒤에 없어지게함
    pendingDOM.style.display = 'block';
    selectDOM.style.display = 'none';
    
    setTimeout(() => {
        pendingDOM.style.display = 'none';
        resultDOM.style.display = 'block';
    }, 2000);
};

const initialize = () => {
    //currentRound = 0; resultValue = 0;
    //setMbtiSection
    //result -> none
    //select -> display

    currentRound = 0;
    resultValue = 0;
    selectDOM.style.display = 'block';
    pendingDOM.style.display = 'none';
    resultDOM.style.display = 'none';
}

const setResultSection = () => {
    //setResultSection에 들어갈 결과 정보들을 DOM에 주입하는 함수
    const {title, description} = getMbtiResult(resultValue);
    mbtiResultTitleDOM.innerHTML = title;
    mbtiResultDescriptionDOM.innerHTML = description;

    mbtiRetryButton.onclick =initialize;
};
export const setMbtiSection = () => {
    if(currentRound === maxRound){
        setPendingSection();
        setResultSection();
        return;
    } 
        
    selectDOM.style.display = 'block';

   mbtiQuestionDOM.innerHTML = mbtiQuestionList[currentRound++]; //code가 실행된 후 증감연산자 실행
   yesButton.onclick = () => {
    resultValue++;
    setMbtiSection();
   };
   noButton.onclick = () => {
    setMbtiSection();
   }
};

