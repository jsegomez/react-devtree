export const isValidHttpsUrl = (url: string): boolean => {
    try {
        const urlObj = new URL(url);
        return urlObj.protocol === 'https:';
    } catch {
        return false;
    }
}

// Alternativa con regex simple (si prefieres regex)
export const isValidHttpsUrlRegex = (url: string): boolean => {
    const httpsRegex = /^https:\/\/[^\s]+\.[^\s]{2,}$/;
    return httpsRegex.test(url);
}