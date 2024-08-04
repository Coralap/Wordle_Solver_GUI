async function getWords() {
    try {
        const response = await fetch('/words/');
        const words = await response.json();
        // console.log(words[10]);
        return words;
    } catch (err) {
        console.error('Error fetching words:', err);
        return [];
    }
}

const words = await getWords();

export { words };