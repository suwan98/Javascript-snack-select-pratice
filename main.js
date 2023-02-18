import { setMbtiSection } from './module/mbtiSection.js';
import { setResultContainer, setSelectButton, setSelectCards } from './module/selectCard.js';
import { setShareURLButton } from './module/share.js';
import { setTebMenu } from './module/tabMenu.js';
import { countUP } from './utils/countUP.js';


const data = {
  participate : 150090090,
};

const participateDOM = document.getElementById('participate-number');
countUP(participateDOM, data.participate, 3);

setTebMenu();
setSelectCards();
setSelectButton();

setResultContainer();
setMbtiSection();
setShareURLButton();