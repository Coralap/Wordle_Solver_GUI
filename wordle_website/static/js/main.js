document.addEventListener('DOMContentLoaded', () => {
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
            currentRow++;
            currentCell = 0;
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