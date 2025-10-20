// --- Quiz Data ---

const quizModules = [
    {
        id: 'password_power', // Unique ID for this module
        title: 'Password Power',
        isLocked: false, // Start unlocked
        questions: [
            {
                questionText: 'Which of these passwords is the strongest?',
                options: ['password123', 'FluffyCat!', 'MyDogFido19', 'Tr@v3l!ngSun#25'],
                correctAnswerIndex: 3,
                explanation: 'Strong passwords are long and mix uppercase, lowercase, numbers, and symbols. Avoid common words or personal info.'
            },
            {
                questionText: 'It\'s okay to use the same strong password for multiple websites.',
                options: ['True', 'False'],
                correctAnswerIndex: 1,
                explanation: 'Using unique passwords prevents hackers from accessing multiple accounts if one site is breached.'
            },
            {
                questionText: 'What is the BEST way to remember many strong, unique passwords?',
                options: ['Write them on a sticky note', 'Use a secure Password Manager app', 'Use the same simple pattern', 'Tell a trusted friend'],
                correctAnswerIndex: 1,
                explanation: 'Password managers create and store strong, unique passwords securely. You only need to remember the master password.'
            },
            {
                questionText: 'Including your birthday or pet\'s name makes a password secure.',
                options: ['True', 'False'],
                correctAnswerIndex: 1,
                explanation: 'Personal info is easily guessed or found online, making passwords much weaker.'
            },
            {
                questionText: 'How often should you ideally change important passwords (email, banking)?',
                options: ['Never, if strong', 'Once every few years', 'Every few months or if breached', 'Every day'],
                correctAnswerIndex: 2,
                explanation: 'Regularly changing important passwords (every 3-6 months) reduces risk if your password was stolen unknowingly.'
            },
            {
                questionText: '`P@$$wOrd` is a strong password because it uses symbols.',
                options: ['True', 'False'],
                correctAnswerIndex: 1,
                explanation: 'Simply replacing letters in common words with symbols (like @ for a, $ for s) is easily guessed by hacking tools.'
            }
        ]
    },
    {
        id: 'phishing_phobia',
        title: 'Phishing Phobia',
        isLocked: true,
        // --- CORRECTED QUESTIONS ARRAY START ---
        questions: [
            {
                questionText: 'What is the main goal of a phishing email?',
                options: ['To install a virus', 'To steal personal information (passwords, bank details)', 'To sell you a product', 'To update your software'],
                correctAnswerIndex: 1,
                explanation: 'Phishing scams try to trick you into revealing sensitive data like login credentials or financial information by pretending to be legitimate.'
            },
            {
                questionText: 'A login page link in an email looks real, but the website address (URL) is slightly misspelled (e.g., paypa1.com instead of paypal.com). Is it safe?',
                options: ['Yes, it looks close enough', 'No, misspelled URLs are a major red flag for phishing'],
                correctAnswerIndex: 1,
                explanation: 'Scammers often use URLs that look very similar to real ones. Always check the address bar carefully before entering login details.'
            },
            {
                questionText: 'An email urgently asks you to click a link and verify your account or face suspension. What should you do?',
                options: ['Click the link immediately to fix it', 'Ignore it completely', 'Go to the official website *manually* (don\'t click the link) and log in there to check for issues', 'Reply with your password to prove it\'s you'],
                correctAnswerIndex: 2,
                explanation: 'Never click urgent links in emails. Go directly to the official website or app yourself to check your account status securely.'
            },
            {
                questionText: 'You receive a text message (SMS) saying you won a prize and need to click a link to claim it. This is likely:',
                options: ['A legitimate contest winning', 'A type of phishing called "Smishing"', 'A system update notification', 'A message from a friend'],
                correctAnswerIndex: 1,
                explanation: 'Phishing attempts via text message are called "Smishing". Be very suspicious of unexpected prizes requiring you to click links or provide info.'
            },
            {
                questionText: 'Is it generally safe to provide personal information if an email has the company\'s official logo?',
                options: ['Yes, the logo proves it\'s real', 'No, logos can be easily copied and used in fake emails'],
                correctAnswerIndex: 1,
                explanation: 'Logos, formatting, and sender names can all be faked. Don\'t rely on visuals alone; check links and sender addresses carefully.'
            }
        ] // --- CORRECTED QUESTIONS ARRAY END ---
    },
    {
        id: 'wifi_wisdom',
        title: 'Wi-Fi Wisdom',
        isLocked: true,
        questions: [
    {
        questionText: 'When connecting to public Wi-Fi (cafe, airport), what is the safest practice?',
        options: ['Connecting immediately if it has no password', 'Using a VPN (Virtual Private Network)', 'Only visiting well-known websites', 'Asking the staff if it\'s secure'],
        correctAnswerIndex: 1,
        explanation: 'Public Wi-Fi can be insecure. A VPN encrypts your traffic, making it much harder for others on the network to snoop on your activity.'
    },
    {
        questionText: 'Is a Wi-Fi network named "Free Public WiFi" automatically safe to use?',
        options: ['Yes, the name implies it is official', 'No, hackers can create fake networks with convincing names'],
        correctAnswerIndex: 1,
        explanation: 'Be wary of generic network names. Hackers can set up "evil twin" hotspots to trick users into connecting to their malicious network.'
    },
    {
        questionText: 'Your home Wi-Fi network should be protected with:',
        options: ['No password for easy access', 'The default password from the router manufacturer', 'A strong, unique password and WPA2 or WPA3 encryption', 'Hiding the network name (SSID) only'],
        correctAnswerIndex: 2,
        explanation: 'Always change the default router password and use strong WPA2 or WPA3 encryption. Hiding the SSID offers very little real security.'
    },
    {
        questionText: 'Should you allow your devices to automatically connect to any open Wi-Fi network they find?',
        options: ['Yes, it\'s convenient', 'No, this can connect you to unsafe networks without you realizing'],
        correctAnswerIndex: 1,
        explanation: 'Disable the "auto-connect to open networks" feature on your devices to prevent accidentally joining potentially malicious hotspots.'
    },
    {
        questionText: 'What does HTTPS (the lock icon 🔒 in your browser address bar) indicate when using Wi-Fi?',
        options: ['The Wi-Fi network itself is secure', 'Your connection *to that specific website* is encrypted', 'The website is free of viruses', 'Your device is hidden from others on the network'],
        correctAnswerIndex: 1,
        explanation: 'HTTPS encrypts the data between your browser and the website you are visiting, protecting it even on insecure Wi-Fi. It doesn\'t secure the Wi-Fi itself.'
    }
] // Make sure this closing bracket is correct] // Add questions later
    },
    {
        id: 'malware_basics',
        title: 'Malware Basics',
        isLocked: true,
        questions: [
    {
        questionText: 'What does "Malware" stand for?',
        options: ['Malicious Hardware', 'Malfunctioning Software', 'Malicious Software', 'Manual Software'],
        correctAnswerIndex: 2,
        explanation: 'Malware is short for Malicious Software – programs designed to harm or exploit computer systems.'
    },
    {
        questionText: 'Which type of malware encrypts your files and demands payment for their release?',
        options: ['Virus', 'Spyware', 'Adware', 'Ransomware'],
        correctAnswerIndex: 3,
        explanation: 'Ransomware holds your data hostage by encrypting it and demands a ransom (payment) for the decryption key.'
    },
    {
        questionText: 'A program that looks legitimate but secretly contains malicious code is known as a:',
        options: ['Worm', 'Trojan Horse', 'Rootkit', 'Botnet'],
        correctAnswerIndex: 1,
        explanation: 'Like the mythical Greek trick, a Trojan Horse disguises malware as a desirable program to trick users into installing it.'
    },
    {
        questionText: 'What is the primary way computer viruses typically spread?',
        options: ['Through Wi-Fi signals', 'By attaching themselves to legitimate files or programs', 'Via Bluetooth connections', 'Through overheating'],
        correctAnswerIndex: 1,
        explanation: 'Viruses need a host program or file to spread. They activate when the host file is executed, then replicate and infect other files.'
    },
    {
        questionText: 'Software that secretly monitors your computer activity and collects personal information is called:',
        options: ['Adware', 'Ransomware', 'Spyware', 'Firewall'],
        correctAnswerIndex: 2,
        explanation: 'Spyware is designed to spy on your activities, potentially stealing passwords, browsing habits, or keystrokes.'
    }
] // Make sure this closing bracket is correct] // Add questions later
    }
    // Add more module objects here later
];