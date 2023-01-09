function sliceFirstWord(sentence: string) {
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

export { 
    sliceFirstWord,
}
