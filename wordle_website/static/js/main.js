document.addEventListener('DOMContentLoaded', () => {
    word = "סקסים"
    const grid = document.querySelector('.grid');
    const keys = document.querySelectorAll('.key');
    let currentRow = 0;
    let currentCell = 0;

    // Handle keypress events
    document.addEventListener('keydown', (e) => {
        const key = getKeyFromEvent(e);
        handleKeyPress(key);
    });

    // Handle button clicks
    keys.forEach(button => {
        button.addEventListener('click', () => {
            const key = button.getAttribute('data-key');
            if (key) {
                handleKeyPress(key);
            }
        });
    });

    function getKeyFromEvent(e) {
        if (e.key === 'Enter') {
            return 'Enter';
        } else if (e.key === 'Backspace') {
            return 'Backspace';
        } else {
            return e.key; // For Hebrew letters
        }
    }

   function handleKeyPress(key) {
    if (key === 'Enter') {
        // Handle enter key logic
        if (currentCell === 5) {

            let cells=[]
            let isCorrect =true;

            for(let i =0; i<5; i++){
                cells.push(getCell(currentRow,i));
            }
             let letters_in_word = Array.from(word);




            const result = cells.filter((word,index) => word.textContent ===letters_in_word[index]);

            cells.forEach((element,index) =>{
            //if there are more letters in the actual word then the answer given no more yellow boys
                const num_letters_in_result = (result.filter(x => x.textContent===element.textContent)).length;
                const num_letters_in_word = (letters_in_word.filter(x => x===element.textContent)).length;
                const num_letters_in_cells= (cells.filter(x => x.textContent===element.textContent)).length;
                const is_yellow = (num_letters_in_word>=num_letters_in_cells)
                if(letters_in_word.includes(element.textContent)){
                    element.classList.add("yellow_letter");
                }else if(element.textContent!==letters_in_word[index]){
                    element.classList.add("wrong_letter");
                }
                if(num_letters_in_word==num_letters_in_result){
                    element.classList.remove("yellow_letter");
                    element.classList.add("wrong_letter");

                }
            });


            if(result.length!=5){
            isCorrect=false;
            }
            result.forEach((element) =>{
            element.classList.add("correct");
             element.classList.remove("wrong_letter");
            });


            currentRow++;
            currentCell = 0;

            console.log(cells)

        }
    } else if (key === 'Backspace') {
        // Handle backspace logic
        if (currentCell > 0) {
            currentCell--;
            const cell = getCell(currentRow, currentCell);
            cell.textContent = '';
        }
    } else if (/^[א-ת]$/.test(key)) {
        // Handle letter key logic
        if (currentCell < 5) {
            const cell = getCell(currentRow, currentCell);
            cell.textContent = key;
            cell.style.direction = 'rtl'; // Ensure text is right-to-left
            currentCell++;
        }
    }
}


    function getCell(row, cell) {
        return grid.children[row].children[4-cell];
    }
});