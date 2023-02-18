// dom : innerHTML 이 갱신될 노드
// target : 목표 숫자
// second : 총 몇초가 걸릴 지?
// term : 몇 씩 증가 할 지? -> 15
//count term : 한 term에 몇이 증가해야 하는 지? -> second, term으로 계산해서 넣어주기

export const countUP = (dom, target, second, term = 15) => {
    // dom.innerHTML 갱식
    // innHTML이 n초를 간격으로 갱신
    // value += 10
    if(!dom || isNaN(Number(target)) || isNaN(Number(second)) || isNaN(Number(term))) return;

    const countTerm = Math.floor(target / second) * (term / 1000);
    let nowNumber = 0;


    // target / second -> 1초에 몇 씩 증가할 지?

    //target : 900
    //second : 9
    // 1초 -> 100
    // term초 -> 몇 씩 증가해야 할까? -> {target/second}*{term/1000}
    // term 0.1초 -> 10
    // 100 x 0.1 

        const timerID =  setInterval(() => { //브라우저 내부에 타이머가 돌아감 -> 자원을 쓰고 있음
        if(nowNumber >= target){
            nowNumber = target;
            clearInterval(timerID) //브라우저의 자원 소모 멈추기 (애니메이션 멈춤)
            return;
        }
        nowNumber += countTerm;
        dom.innerHTML = `${nowNumber.toLocaleString()}`;
    }, term); // n초 마다 해당 함수 실행
};