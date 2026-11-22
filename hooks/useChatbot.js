import { useState, useCallback } from 'react';
import { functions } from '../lib/appwrite'; // assuming SDK is initialized here

export default function useChatbot() {
  const [response, setResponse] = useState(null);
  const [loading, setLoading]   = useState(false);
  const [error, setError]       = useState(null);

  const sendPrompt = useCallback(async (promptText) => {
    setLoading(true);
    setError(null);
    setResponse(null);

    try {
      const execution = await functions.createExecution(
        '68bf09ca0034fd33e5e0',
        JSON.stringify({ prompt: promptText }),
        false // async = false to wait for result
      );
      //console.log(JSON.stringify(execution, null, 2))
      const result = JSON.parse(execution.responseBody);
      //console.log(JSON.stringify(result.completion, null, 2))

      setResponse(result);
    } catch (err) {
      setError(err);
    } finally {
      setLoading(false);
    }
  }, []);

  return { response, loading, error, sendPrompt };
}
