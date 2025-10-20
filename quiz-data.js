// --- Quiz Data ---

const quizModules = [
    {
        id: 'password_power', // Unique ID for this module
        title: 'Password Power',
        isLocked: false, // Start unlocked
        // --- Lesson Text for Password Power ---
        lessonText: `
**What Makes a Strong Password?**

Think of your password as the key to your online accounts (email, banking, social media). A weak key is easy to copy or break! Strong passwords act like complex keys that are much harder for hackers or guessing software to figure out.

**Key Ingredients for Strength:**

* **Length:** Longer is better! Aim for at least 12 characters, but 15+ is ideal.
* **Mix it Up:** Use a combination of:
    * Uppercase letters (A-Z)
    * Lowercase letters (a-z)
    * Numbers (0-9)
    * Symbols (!@#$%^&*()_+-=[]{};':",./<>?)
* **Avoid the Obvious:** NEVER use common words ("password", "123456"), your name, birthday, pet's name, or easily guessable information. Even replacing letters with symbols in common words (like \`P@$$wOrd\`) is often easy for hackers to crack.

**Why Use UNIQUE Passwords?**

Imagine using the same key for your house, car, and office. If someone steals that one key, they get access to everything! It's the same online. If you reuse a password and one website gets hacked, criminals will try that stolen password on your email, bank, and other important accounts. **Always use a different, strong password for every important website or app.**

**How to Manage Many Passwords? Use a Password Manager!**

Remembering dozens of complex, unique passwords is impossible for humans. That's where Password Manager apps come in.

* They generate very strong, random passwords for you.
* They securely store all your passwords.
* You only need to remember ONE strong master password to unlock the manager.
* Many can even automatically fill in passwords on websites and apps.

Using a password manager is the *best* way to stay secure online with strong, unique passwords for all your accounts.
        `, // End of lessonText
        // --- Questions for Password Power ---
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
        // --- Lesson Text for Phishing Phobia ---
        lessonText: `
**What is Phishing?** 🎣

Phishing is a type of online scam where criminals try to trick you into giving them sensitive information. They often pretend to be legitimate companies, banks, or even people you know. Their goal is usually to steal passwords, account numbers, or personal details.

**Common Phishing Tactics:**

* **Fake Emails/Messages:** Emails, texts (Smishing), or social media messages that look like they're from a real company, asking you to click a link or download an attachment.
* **Sense of Urgency:** Messages often create panic, saying your account is suspended, you won a prize you must claim *now*, or there's a security alert requiring immediate action.
* **Suspicious Links:** Links might look real but lead to fake websites. Hover over links (on desktop) to see the actual destination URL before clicking. Be wary of slightly misspelled URLs (e.g., \`paypa1.com\`).
* **Requests for Information:** Legitimate companies rarely ask for passwords, full credit card numbers, or other sensitive data via email or text.
* **Generic Greetings:** Phishing emails often use vague greetings like "Dear Customer" instead of your actual name.
* **Fake Logos/Formatting:** Scammers easily copy logos and email designs to make their fakes look convincing. Don't trust an email just because it looks official.

**How to Stay Safe:**

* **Be Skeptical:** Treat unsolicited messages asking for info or immediate action with suspicion.
* **Don't Click Suspicious Links:** If an email asks you to log in or check something, go to the official website *manually* by typing the address in your browser or using a saved bookmark. Do *not* use the link in the email.
* **Check Sender Address:** Examine the sender's email address closely. Is it *exactly* the official domain, or is it slightly off or a random address?
* **Never Provide Sensitive Info via Email/Text:** If unsure, contact the company through their official phone number or website.
        `, // End Phishing lesson
        // --- Questions for Phishing Phobia ---
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
        ]
    },
    {
        id: 'wifi_wisdom',
        title: 'Wi-Fi Wisdom',
        isLocked: true,
        // --- Lesson Text for Wi-Fi Wisdom ---
        lessonText: `
**Understanding Wi-Fi Security** 📶

Wireless networks offer great convenience, but unsecured ones can expose your data. Understanding the risks helps you connect safely.

**Public Wi-Fi Risks:**

* **Open Networks:** Networks that don't require a password (like in many cafes or airports) are often unencrypted. This means anyone else on the network with basic tools could potentially see the websites you visit or data you send (unless the website itself uses HTTPS).
* **Fake Hotspots ("Evil Twins"):** Hackers can set up fake Wi-Fi networks with convincing names (e.g., "Free Airport WiFi"). If you connect, they can monitor your traffic or redirect you to fake login pages.

**Best Practices for Public Wi-Fi:**

* **Use a VPN:** A Virtual Private Network encrypts *all* your internet traffic, creating a secure tunnel even over insecure networks. This is the **best** way to protect yourself on public Wi-Fi.
* **Check Network Names:** Be wary of generic names. If possible, confirm the official network name with staff.
* **Avoid Sensitive Activities:** Try not to log into banking, email, or other critical accounts on public Wi-Fi unless you are using a VPN.
* **Look for HTTPS:** Ensure websites you visit use HTTPS (look for the lock icon 🔒 in the address bar). This encrypts your connection *to that specific site*, but a VPN protects *everything*.
* **Disable Auto-Connect:** Turn off the feature on your phone or laptop that automatically connects to known or open Wi-Fi networks. Connect manually when needed.

**Securing Your Home Wi-Fi:**

* **Strong Password:** Change the default administrator password on your router immediately.
* **WPA2/WPA3 Encryption:** Use the strongest available encryption (WPA3 is best, WPA2 is common and still strong). Avoid older, insecure methods like WEP or WPA.
* **Unique Network Name (SSID):** Change the default network name. Hiding it doesn't add much security.
* **Keep Router Firmware Updated:** Updates often include security patches.
        `, // End Wi-Fi lesson
        // --- Questions for Wi-Fi Wisdom ---
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
        ]
    },
    {
        id: 'malware_basics',
        title: 'Malware Basics',
        isLocked: true,
        // --- Lesson Text for Malware Basics ---
        lessonText: `
**What is Malware?** 👾

Malware is short for **Malicious Software**. It's any software intentionally designed to cause damage to a computer, server, client, or network, or to steal information.

**Common Types of Malware:**

* **Viruses:** Programs that attach themselves to legitimate files or programs. They need a host to spread and activate when the host file is run. They can corrupt files, slow down your system, or display messages.
* **Worms:** Similar to viruses, but they can spread *by themselves* across networks without needing a host file or human interaction (like clicking an attachment). They often exploit security vulnerabilities.
* **Trojan Horses (Trojans):** Malware disguised as legitimate software. You might download a free game or utility, but it secretly contains malicious code that activates when you run the program. Trojans don't replicate themselves but can install other malware or create backdoors for hackers.
* **Ransomware:** Nasty malware that encrypts your important files (documents, photos) making them unusable. It then demands a ransom payment (often in cryptocurrency) in exchange for the decryption key. Paying doesn't guarantee you'll get your files back.
* **Spyware:** Software that secretly monitors your activity, collects personal information (like passwords, browsing habits, keystrokes), and sends it to a third party without your consent.
* **Adware:** Software that automatically displays or downloads unwanted advertisements (pop-ups, banners). While often just annoying, some adware can also contain spyware.

**How Malware Spreads:**

* Email attachments
* Malicious downloads from websites
* Infected USB drives
* Fake software updates
* Exploiting software vulnerabilities

**Basic Protection:**

* Use reputable antivirus/anti-malware software and keep it updated.
* Be cautious about opening email attachments or clicking links from unknown senders.
* Only download software from trusted sources.
* Keep your operating system and applications updated with security patches.
* Back up your important files regularly!
        `, // End Malware lesson
        // --- Questions for Malware Basics ---
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
        ]
    }
    // Add more module objects here later
];