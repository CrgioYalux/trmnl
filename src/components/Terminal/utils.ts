const createPrompt = (location: string, user: string = 'usr', symbol: string = '$') => `${user}:${location}${symbol}`;

const setInput = (value: string, prompt: string) => `${prompt}${value.slice(prompt.length)}`;

export {
    createPrompt,
    setInput
}
