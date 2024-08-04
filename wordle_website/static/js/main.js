document.addEventListener('DOMContentLoaded', () => {
    const grid = document.querySelector('.grid');
    const keys = document.querySelectorAll('.key');
    let currentRow = 0;
    let currentCell = 0;

    // Handle keypress events
    document.addEventListener('keydown', (e) => {
        const key = e.key.toUpperCase();
        handleKeyPress(key);
    });

    // Handle button clicks
    keys.forEach(button => {
        button.addEventListener('click', () => {
            const key = button.getAttribute('data-key').toUpperCase();
            handleKeyPress(key);
        });
    });

    function handleKeyPress(key) {
        if (key === 'ENTER') {
            // Handle enter key logic
            if (currentCell === 5) {
                currentRow++;
                currentCell = 0;
            }
        } else if (key === 'BACKSPACE') {
            // Handle backspace logic
            if (currentCell > 0) {
                currentCell--;
                const cell = getCell(currentRow, currentCell);
                cell.textContent = '';
            }
        } else if (/^[A-Z]$/.test(key)) {
            // Handle letter key logic
            if (currentCell < 5) {
                const cell = getCell(currentRow, currentCell);
                cell.textContent = key;
                currentCell++;
            }
        }
    }

    function getCell(row, cell) {
        return grid.children[row].children[cell];
    }
});
