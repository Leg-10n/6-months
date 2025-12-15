        const RELATIONSHIP_START = '2025-06-21T16:46:00';
        const CHAT_CONVERSATION = [
            { text: 'Hey', delay: 800 },
            { text: 'Do you remember this?', delay: 1500 },
            { type: 'image', delay: 1000 },
            { text: 'Our First Movie Date 🫣', delay: 1800 },
            { text: "I don't think I ever said this properly", delay: 2000 },
            { text: 'How much these six months have meant to me', delay: 1500 },
            { text: 'So I made something for you', delay: 1800 },
            { text: 'Happy 6 months, love', delay: 1200 },
            { text: 'I love you so much 💜', delay: 1500 },
            { text: 'Click the button when you\'re ready', delay: 1200 }
        ];

        let counterInterval;

        function updateCounter() {
            const startDate = new Date(RELATIONSHIP_START);
            const now = new Date();
            const diff = now - startDate;
            document.getElementById('days').textContent = Math.floor(diff / (1000 * 60 * 60 * 24));
            document.getElementById('hours').textContent = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)).toString().padStart(2, '0');
            document.getElementById('minutes').textContent = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60)).toString().padStart(2, '0');
            document.getElementById('seconds').textContent = Math.floor((diff % (1000 * 60)) / 1000).toString().padStart(2, '0');
        }

        function startCounter() {
            updateCounter();
            counterInterval = setInterval(updateCounter, 1000);
        }

        function showSection(sectionId) {
            document.querySelectorAll('.section').forEach(s => s.classList.remove('active'));
            document.getElementById(sectionId).classList.add('active');
            
            if (sectionId === 'landing') startCounter();
            else if (sectionId === 'chat') { 
                clearInterval(counterInterval); 
                startChatSequence(); 
            }
        }

        async function startChatSequence() {
            const container = document.getElementById('messages');
            const btn = document.getElementById('photos-btn');
            
            // Only clear and restart if empty, or reset if needed
            if (container.children.length > 0) return; 
            
            container.innerHTML = '';
            btn.style.display = 'none';

            for (const msg of CHAT_CONVERSATION) {
                await new Promise(r => setTimeout(r, msg.delay));
                
                if (msg.type === 'image') {
                    const div = document.createElement('div');
                    div.className = 'message message-image';
                    div.innerHTML = '<img src="resouces/Snapchat-2077372259.jpg" alt="Our special moment">';
                    container.appendChild(div);
                } else {
                    const div = document.createElement('div');
                    div.className = 'message';
                    div.innerHTML = '<span class="typing-indicator">...</span>';
                    container.appendChild(div);
                    div.classList.add('typing');
                    
                    await new Promise(r => setTimeout(r, 600));
                    
                    div.classList.remove('typing');
                    div.textContent = msg.text;
                }
                container.scrollTop = container.scrollHeight;
            }
            await new Promise(r => setTimeout(r, 1000));
            btn.style.display = 'inline-block';
            
            // Auto scroll one last time
            container.scrollTop = container.scrollHeight;
        }

        // Card flip logic
        document.querySelector('.card-stack').addEventListener('click', function() {
            const stack = this;
            if (stack.classList.contains('flipped')) return;
            
            stack.classList.add('flipped');
            
            setTimeout(() => {
                // Move the first card to the bottom of the stack
                stack.appendChild(stack.firstElementChild);
                stack.classList.remove('flipped');
            }, 600);
        });

        // Event Listeners for buttons
        document.getElementById('continue-btn').addEventListener('click', () => showSection('chat'));
        document.getElementById('photos-btn').addEventListener('click', () => showSection('photos'));
        document.getElementById('cards-btn').addEventListener('click', () => showSection('cards'));
        
        // Start
        showSection('landing');