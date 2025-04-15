const tasks = [
    { question: "Wo _____ (sein) du gestern?", answer: "warst" },
    { question: "Ich _____ (sein) gestern zu Hause.", answer: "war" },
    { question: "Leider _____ (haben) wir gestern keine Zeit.", answer: "hatten" },
    { question: "Gestern _____ (sein) wir im Kino.", answer: "waren" },
    { question: "Anna _____ (haben) früher viel Arbeit.", answer: "hatte" },
    { question: "Heute _____ (sein) es kalt.", answer: "ist" },
    { question: "____ (haben) du früher viele Freunde?", answer: "Hattest" },
    { question: "____ (sein) du heute krank?", answer: "Bist" },
    { question: "Wo _____ (sein) ihr gestern Nachmittag?", answer: "wart" },
    { question: "Heute _____ (sein) ich sehr müde.", answer: "bin" },
    { question: "Olli und Claudia _____ (haben) heute keine Zeit.", answer: "haben" },
    { question: "Früher _____ (haben) ich kein Geld.", answer: "hatte" },
    { question: "Jetzt _____ (sein) ihr in Deutschland.", answer: "seid" },
    { question: "Früher _____ (sein) Manos arbeitslos.", answer: "war" },
    { question: "Heute _____ (sein) wir am Abend zu Hause.", answer: "sind" },
    { question: "Jetzt _____ (haben) ich keine Arbeit.", answer: "habe" },
    { question: "Jetzt _____ (haben) Lara viele Freunde.", answer: "hat" },
    { question: "_____ (haben) ihr gestern auch so schlechtes Wetter?", answer: "Hattet" }
];

const container = document.getElementById("cardsContainer");
const fireworks = document.getElementById("fireworks");

function shuffle(array) {
    return array.sort(() => Math.random() - 0.5);
}

function createCards(tasks) {
    container.innerHTML = "";

    shuffle(tasks).forEach(task => {
        const card = document.createElement("div");
        card.classList.add("card");

        card.innerHTML = `
            <div class="card-inner">
                <div class="card-front">${task.question}</div>
                <div class="card-back">
                    <p>${task.answer}</p>
                    <div>
                        <button class="correctBtn">✅</button>
                        <button class="wrongBtn">❌</button>
                    </div>
                </div>
            </div>
        `;

        // Klicken auf die Karte dreht sie um, wenn sie noch nicht umgedreht ist
        card.addEventListener("click", () => {
            if (!card.classList.contains("flipped")) {
                card.classList.add("flipped");
            }
        });

        // Beim "Richtig"-Button entfernen wir die Karte
        card.querySelector(".correctBtn").onclick = (e) => {
            e.stopPropagation(); // Verhindert, dass das Klicken auf den Button auch das Klicken auf die Karte auslöst
            card.remove();
            checkEnd();
        };

        // Beim "Falsch"-Button soll die Karte nach 1 Sekunde wieder umgedreht und neu positioniert werden
        card.querySelector(".wrongBtn").onclick = (e) => {
            e.stopPropagation();
            setTimeout(() => {
                card.classList.remove("flipped");
                repositionCard(card);
            }, 1000);
        };

        container.appendChild(card);
    });
}

// Diese Funktion entfernt die Karte aus dem Container und fügt sie an einer zufälligen Position wieder ein.
function repositionCard(card) {
    // Zuerst entfernen wir die Karte aus dem Container
    container.removeChild(card);
    // Bestimme die Anzahl der aktuell vorhandenen Karten
    const children = container.children;
    // Wähle einen zufälligen Index zwischen 0 und der Anzahl der vorhandenen Karten (inklusive Möglichkeit, am Ende einzufügen)
    const randomIndex = Math.floor(Math.random() * (children.length + 1));
    if (randomIndex === children.length) {
        container.appendChild(card);
    } else {
        container.insertBefore(card, children[randomIndex]);
    }
}

// Überprüft, ob alle Karten entfernt wurden und das Feuerwerk angezeigt werden soll.
function checkEnd() {
    if (container.children.length === 0) {
        fireworks.style.display = "block";
        setTimeout(() => { fireworks.style.display = "none"; }, 4000);
    }
}

createCards(tasks);