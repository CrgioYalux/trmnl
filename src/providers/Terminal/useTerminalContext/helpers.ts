function sliceFirstWord(sentence: string): { firstWord: string, rest: string | null } {
    const trimmed = sentence.trim();
    const firstSpaceIndex = trimmed.indexOf(' ');

    if (firstSpaceIndex !== -1)
        return {
            firstWord: trimmed.slice(0, firstSpaceIndex),
            rest: trimmed.slice(firstSpaceIndex).trim(),
        }

    return {
        firstWord: trimmed,
        rest: null,
    };
}

const createPrompt = (location: string, user: string = 'usr', symbol: string = '$'): string => `${user}:${location}${symbol}`;

export { 
    sliceFirstWord,
    createPrompt,
}

