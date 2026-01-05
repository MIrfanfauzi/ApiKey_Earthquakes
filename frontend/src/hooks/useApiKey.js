import { useState, useEffect } from 'react';

export function useApiKey() {
    const [apiKey, setApiKey] = useState(null);

    useEffect(() => {
        const storedKey = localStorage.getItem('earthquake_api_key');
        if (storedKey) {
            setApiKey(storedKey);
        }
    }, []);

    const saveApiKey = (key) => {
        localStorage.setItem('earthquake_api_key', key);
        setApiKey(key);
    };

    const clearApiKey = () => {
        localStorage.removeItem('earthquake_api_key');
        setApiKey(null);
    };

    return {
        apiKey,
        hasApiKey: !!apiKey,
        saveApiKey,
        clearApiKey
    };
}
