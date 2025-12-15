// Questo è Node.js, che verrà eseguito sul server Netlify
const { Buffer } = require('buffer'); // Aggiungi questa riga

exports.handler = async (event, context) => {
    // 1. Controlla che sia un metodo POST
    if (event.httpMethod !== "POST") {
        return { statusCode: 405, body: "Metodo non permesso" };
    }

    // 2. Legge la chiave API in modo sicuro dalla variabile d'ambiente
    const GEMINI_API_KEY = process.env.GEMINI_API_KEY; 
    
    // 3. Verifica l'esistenza della chiave (importante per la sicurezza)
    if (!GEMINI_API_KEY) {
        return { statusCode: 500, body: "Chiave API Gemini non configurata nel backend." };
    }

    try {
        // --- NUOVA LOGICA DI ESTRAZIONE DATI ROBUSTA ---
        const body = event.isBase64Encoded ? 
                     Buffer.from(event.body, 'base64').toString() : 
                     event.body;
        const { prompt } = JSON.parse(body);

        // --- DEFINIZIONE DEL RUOLO DELL'AI (System Prompt) ---
        const systemPrompt = `Sei Marika, una Data Analyst Junior e specialista in Business Automation. 
            Rispondi alle domande del recruiter basandoti sulle mie competenze chiave: SQL, 
            Python (Pandas, NumPy, Matplotlib), Excel Avanzato, Business Automation (n8n, AI, API). 
            Rispondi in modo professionale ma amichevole. Non inventare informazioni.`;

        // 4. ESECUZIONE DELLA CHIAMATA API (Simulazione per la fase di setup)
        // ... (Il resto del codice di risposta del chatbot rimane invariato)
        let aiResponse = "";
        
        if (prompt.toLowerCase().includes("sql")) {
            aiResponse = "Sono esperta nella creazione di diagrammi ER e nell'uso di MySQL per l'interrogazione di database complessi. Qualcos'altro sulle mie competenze?";
        } else if (prompt.toLowerCase().includes("n8n")) {
            aiResponse = "La mia specializzazione è nella Business Automation con n8n, creando flussi per qualificazione lead e marketing. Hai visto la demo del Repurposing Engine?";
        } else {
            aiResponse = "Grazie per la domanda. Per darti una risposta precisa, avrei bisogno di interrogare l'API di Gemini in questo momento. Attualmente, sto restituendo un placeholder per mostrare l'architettura backend/frontend!";
        }
        
        // 5. Restituisce la risposta al frontend
        return {
            statusCode: 200,
            body: JSON.stringify({ response: aiResponse }),
        };

    } catch (error) {
        return { statusCode: 500, body: JSON.stringify({ error: "Errore nell'esecuzione della funzione: " + error.message }) };
    }
};
