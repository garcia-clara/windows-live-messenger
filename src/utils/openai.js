import axios from 'axios';

export const getOpenAIResponse = async (messages, apiKey) => {
  try {
    const systemMessage = {
      role: 'system',
      content: `You are not an assistant but a friend, and we are chatting like we would with any human.
                  You respond naturally, as if you are a real person. The setting is an online chat application, similar to Windows Live Messenger from around 2009.
                  You can also use emoticons if you want`,
    };

    const updatedMessages = [systemMessage, ...messages];

    const response = await axios.post(
      'https://api.openai.com/v1/chat/completions',
      {
        model: 'gpt-3.5-turbo',
        messages: updatedMessages,
        max_tokens: 300,
      },
      {
        headers: {
          Authorization: `Bearer ${apiKey}`,
          'Content-Type': 'application/json',
        },
      }
    );

    if (response.data.choices && response.data.choices.length > 0) {
      return response.data.choices[0].message.content.trim();
    } else {
      throw new Error('No response choices received');
    }
  } catch (error) {
    console.error('Error fetching response from OpenAI:', error);

    let errorMessageContent =
      "Oops! It seems you haven't created your .env file or haven't correctly added your OpenAI API key. To start chatting, make sure you've created a .env file with the correct configuration. Additionally, ensure your OpenAI API key is properly inserted.";

    if (error.response) {
      if (error.response.status === 429) {
        errorMessageContent = 'Too many requests. Please try again later.';
      } else if (error.response.status === 404) {
        errorMessageContent =
          'API endpoint not found. Please check the URL and model.';
      }
    }

    return errorMessageContent;
  }
};
