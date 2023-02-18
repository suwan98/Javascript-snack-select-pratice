import { appendChildrenList,makeDOMwithProperties} from '../utils/dom.js';
import{SELECT_RESULT_KEY} from '../constants/result.js'

const cardInfoList = [
    {
        id : 1,
        imgSrc :  '/js_basic_event/public/assets/초꼬북칩.jpeg',
        name : '초코꼬북칩',
        description : '맛있는 초코 꼬북 칩'
    },
    {
        id : 2,
        imgSrc : '/js_basic_event/public/assets/나쵸.jpeg',
        name : '나쵸',
        description : '맛있는 초코 꼬북 칩'
    },
    {
        id : 3,
        imgSrc : '/js_basic_event/public/assets/허니버터칩.jpeg',
        name : '허니버터칩',
        description : '맛있는 초코 꼬북 칩'
    },
    {
        id : 4,
        imgSrc : '/js_basic_event/public/assets/홈런볼.jpeg',
        name : '홈런볼',
        description : '맛있는 초코 꼬북 칩'
    },
    
]

export const snackCardList = document.getElementsByClassName('snack-card-list')[0];
const selectButtonDOM = document.getElementsByClassName('participate-button')[0];
const [notyetContainerDOM, resultContainerDOM] = document.getElementsByClassName('result-container')
const [ , resultImageDOM, resultNameDOM, resultDescriptionDOM, selectRetryDOM ] = resultContainerDOM.children;

const getSelectedCard = () => {
    return document.getElementsByClassName('select')[0];
};

const getCardById = (id) => {
    return document.getElementById(`select-${id}`);
}

const handleSelectCard = (cardId) => {
    //카드를 선택했다는 표시를 하는 함수
    //1. 이미 선택되어 있던 카드는 선택 해지
    //2. 현재 선택한 카드를 선택
    const originalSelectedCard = getSelectedCard();
    originalSelectedCard?.classList.remove('select');
  
    const newSelectedCard = getCardById(cardId);
    newSelectedCard.classList.add('select');
};

const getSelectCardDOM = ({
    id,
    imgSrc,
    name,
    description ,
}) => {
    const snackCardDOM = makeDOMwithProperties('button',{
        id : `select-${id}`,
        className : 'snack-card',
        onclick : () => handleSelectCard(id),
    });

    const imageDOM = makeDOMwithProperties('img', {
        src : imgSrc,
        alt : name,
    });
    const descriptionContainerDOM = makeDOMwithProperties('div', {
        className : 'snack-description'
    });
    const nameDOM = makeDOMwithProperties('div',  {
        innerHTML : name,
    });
    const descriptionDOM  = makeDOMwithProperties('div', {
        innerHTML : description,
    });

    appendChildrenList(descriptionContainerDOM, [nameDOM,descriptionDOM]);
    appendChildrenList(snackCardDOM,[imageDOM, descriptionContainerDOM]);

    return snackCardDOM;
};


export const setSelectCards = () => {
    // 기존의 snackCardList의 자식요소를 받아와서 -> 순회하면서 없애주기
    const originalSnackCards = Object.assign( [],snackCardList.children); //배열로 바꿔주는 함수
    originalSnackCards.forEach((snackCard) => snackCard.remove());

    cardInfoList.forEach((cardinfo) => {
     const selectCardDOM = getSelectCardDOM(cardinfo);
     snackCardList.appendChild(selectCardDOM);
    });

    const cardId = Number(localStorage.getItem(SELECT_RESULT_KEY));
    if(!cardId || isNaN(cardId)) return;

    handleSelectCard(cardId);

};

export const setSelectButton = () => {
    // 1.버튼 돔을 받아오기 2. 해당 돔을 온클릭 핸들러를 등록하기 온클릭 핸들러는 선택된 카드를 
    // 아이디를 찾고 그다음 선택된 카드의 아이디를 보고 로컬스토리지에 해당 아이디를 저장하는 역할
    // 선택된 카드의 id가 없을 땐 선택된 카드가 없다는 경고창을 띄워준다
    selectButtonDOM.onclick = () => {
        const selectedCard = getSelectedCard();
        if(!selectedCard){
            alert("선택된 카드가 없습니다");
            return;
        }
        const cardId = selectedCard.id.split('-')?.[1];
        localStorage.setItem(SELECT_RESULT_KEY, cardId);
        setResultContainer();
    };
};

const initialize = () => {
    // 과자가 선택되기 전으로 되돌려 주는 ㅎ마수
    //1. localStorage 의 선택된 카드아이디를 삭제
    //2. selectCard의 Dom을 다시 구성
    //3. resultContainer의 Dom도 다시 구성

    localStorage.removeItem(SELECT_RESULT_KEY);
    setSelectCards();
    setResultContainer();

    const selectSecitonDOM = document.getElementById('participate-section');
    const scrollTargetY = selectButtonDOM.offsetTop;
        window.scroll({
            top: scrollTargetY, 
            left : 0,
            behavior : 'smooth',
        });
};

export const setResultContainer = ( ) => {
    // 리졸트 구역에 선택된 과자를 노출 시키는 함수
    //1. 선택된 아이디를 로컬스토러지부터 받아오기
    //2. 받아온 아이디가 저장되어 있다면 ! 현재 표시되고 있는 notyetContainer를 없애고 resultContainer를 보여주기

    const selectedId = Number(localStorage.getItem(SELECT_RESULT_KEY));
    
    const isSelected = !!selectedId;
    if(!isSelected){
        //notyetContainer를 들어내고 resultContainer를 숨긴다
        notyetContainerDOM.style.display = 'block';
        resultContainerDOM.style.display = 'none';
        return;
    }
    notyetContainerDOM.style.display = 'none';
    resultContainerDOM.style.display = 'flex';

    const cardInfo =  cardInfoList.find((info) => info.id === selectedId);

    resultImageDOM.src = cardInfo.imgSrc;
    resultImageDOM.alt = cardInfo.name;
    resultNameDOM.innerHTML = cardInfo.name;
    resultDescriptionDOM.innerHTML = cardInfo.description;

    //다시하기 버튼구현
    selectRetryDOM.onclick = initialize;

}