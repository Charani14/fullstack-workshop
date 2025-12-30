// Using const
const messages = ['Hello', 'from', 'external', 'file'];

// Arrow function
const formatMessage = (words) => {
    // Using array method (map)
    const formattedWords = words.map(word => word.toUpperCase());

    // Using template literal
    return `Message: ${formattedWords.join(' ')}`;
};

// Strict equality check
if (messages.length === 4) {
    console.log(formatMessage(messages));
}
