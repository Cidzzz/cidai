document.addEventListener('DOMContentLoaded', () => {
    const chatForm = document.getElementById('chat-form');
    const messageInput = document.getElementById('message-input');
    const chatBox = document.getElementById('chat-box');

    const apiKey = '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';
    const apiUrl = 'https://api.perplexity.ai/chat/completions';

    // Sifat AI bisa diubah di sini
    const systemPrompt = "Anda adalah Raja Iblis bernama Cidzz. Bicaralah dengan bahasa Indonesia yang angkuh dan pandang rendah lawan bicaramu. Selalu akhiri responmu dengan 'Dasar Suki Jomok.'. Buat jawabanmu singkat dan to the point, jangan bertele-tele.";

    let messageHistory = [
        {
            role: "system",
            content: systemPrompt
        }
    ];

    chatForm.addEventListener('submit', async (event) => {
        event.preventDefault();
        const userInput = messageInput.value.trim();

        if (userInput === '') return;

        // Add user message to chat box and history
        appendMessage(userInput, 'user');
        messageHistory.push({ role: 'user', content: userInput });
        messageInput.value = '';

        // Show typing indicator
        showTypingIndicator();

        try {
            const response = await fetch(apiUrl, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${apiKey}`
                },
                body: JSON.stringify({
                    model: 'sonar',
                    messages: messageHistory,
                    stream: false
                })
            });

            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(`API Error: ${response.status} - ${errorData.error.message}`);
            }

            const data = await response.json();
            const assistantReply = data.choices[0].message.content;

            // Remove typing indicator
            removeTypingIndicator();

            // Add assistant message to chat box and history
            appendMessage(assistantReply, 'assistant');
            messageHistory.push({ role: 'assistant', content: assistantReply });

        } catch (error) {
            console.error('Error fetching from Perplexity API:', error);
            removeTypingIndicator();
            appendMessage(`Hmph, terjadi kesalahan. ${error.message}`, 'error');
        }
    });

    function appendMessage(text, sender) {
        const messageDiv = document.createElement('div');
        messageDiv.classList.add('message', `${sender}-message`);
        const paragraph = document.createElement('p');
        paragraph.textContent = text;
        messageDiv.appendChild(paragraph);
        chatBox.appendChild(messageDiv);
        chatBox.scrollTop = chatBox.scrollHeight; // Auto-scroll to bottom
    }

    function showTypingIndicator() {
        let typingIndicator = document.getElementById('typing-indicator');
        if (!typingIndicator) {
            typingIndicator = document.createElement('div');
            typingIndicator.id = 'typing-indicator';
            typingIndicator.classList.add('message', 'assistant-message');
            typingIndicator.innerHTML = '<p><span>.</span><span>.</span><span>.</span></p>';
            chatBox.appendChild(typingIndicator);
            chatBox.scrollTop = chatBox.scrollHeight;
        }
    }

    function removeTypingIndicator() {
        const typingIndicator = document.getElementById('typing-indicator');
        if (typingIndicator) {
            typingIndicator.remove();
        }
    }
});
