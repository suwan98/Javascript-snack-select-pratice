// anchor-to-select
// anchor-to-result
// anchor-to-mbti

// paritcipate-seciton
// resutl-seciton
// mbti-seciton


const selectAnchorMenuDOM = document.getElementById('anchor-to-select');
const resultAnchorMenuDOM = document.getElementById('anchor-to-result');
const mbtiAnchorMenuDOM = document.getElementById('anchor-to-mbti');

const setScrollHandler = (anchorDOM, targetDOM) => {
    anchorDOM.onclick = () => {
        const selectSectionDOM = document.getElementById('participate-section');
        const scrollTargetY = targetDOM.offsetTop;
        window.scroll({
            top: scrollTargetY, 
            left : 0,
            behavior : 'smooth',
        });
        };
}

const selectSectionDOM = document.getElementById('participate-section');
const resultSectionDOM = document.getElementById('result-section');
const mbtiSectionDOM = document.getElementById('mbti-section');


export const setTebMenu = () => {
    
    
    setScrollHandler(selectAnchorMenuDOM, selectSectionDOM);
    setScrollHandler(resultAnchorMenuDOM,  resultSectionDOM);
    setScrollHandler(mbtiAnchorMenuDOM, mbtiSectionDOM);
    

    
} ;