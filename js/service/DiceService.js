export default class DiceService{
    
    rollDice(img){
        let rand = Math.floor(Math.random() * 6)+1;
        img.src = "./assets/images/de" + rand + ".png";
        return rand;
    }

}