// Questo è Node.js, per il Repurposing Engine

// NOTA: Richiede il Buffer per gestire la decodifica Base64 di Netlify
const { Buffer } = require('buffer');

exports.handler = async (event, context) => {
    // La chiave API è passata in modo sicuro come variabile d'ambiente
    const GEMINI_API_KEY = process.env.GEMINI_API_KEY; 
    
    // Controlli di sicurezza e metodo
    if (event.httpMethod !== "POST") {
        return { statusCode: 405, body: "Metodo non permesso" };
    }
    if (!GEMINI_API_KEY) {
        return { statusCode: 500, body: "Chiave API Gemini non configurata nel backend." };
    }

    try {
        // --- LOGICA DI ESTRAZIONE DATI ROBUSTA (Correzione Errore 500) ---
        const body = event.isBase64Encoded ? 
                     Buffer.from(event.body, 'base64').toString() : 
                     event.body;
        const { videoLink } = JSON.parse(body);

        // --- LOGICA DI AUTOMAZIONE COMPLESSA (Simulazione Placeholder) ---
        
        const transcriptionText = "Il mercato dei dati è in evoluzione. L'automazione è la chiave per superare i colli di bottiglia e ottimizzare il tempo del team. Con la giusta combinazione di n8n, API e modelli di qualificazione, le aziende possono trasformare il lead flow in una macchina prevedibile.";

        // Simuliamo l'output strutturato che Gemini restituirebbe:
        const simulatedOutput = {
            status: "success",
            title: `Analisi dei contenuti per: ${videoLink}`,
            transcription: transcriptionText,
            shortIdeas: [
                { id: 1, text: '3 Motivi per cui il tuo CRM è lento - Focus sull\'integrazione di n8n.' },
                { id: 2, text: 'Il segreto di un Lead Score efficace - Animazione sul processo di qualificazione AI.' },
                { id: 3, text: 'Il Futuro è l\'Automazione dei Contenuti - Estratto chiave sulla riduzione del carico di lavoro.' }
            ],
            linkedinPost: `🚨 STOP ai colli di bottiglia manuali!\nIl nostro ultimo video mostra come un'automazione intelligente può rendere il tuo flusso di lead prevedibile. La chiave non è solo il dato, ma il sistema dinamico dietro.\n✅ Ho usato l'AI per identificare i momenti chiave e creare questi spunti veloci.\n#DataAutomation #BusinessAutomation #n8n #AI`,
            infographicLink: "#"
        };
        
        // Restituisce il risultato strutturato al frontend
        return {
            statusCode: 200,
            body: JSON.stringify(simulatedOutput),
        };

    } catch (error) {
        return { statusCode: 500, body: JSON.stringify({ error: "Errore nell'esecuzione della funzione: " + error.message }) };
    }
};
