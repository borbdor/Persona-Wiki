// js/planner.js
document.addEventListener("DOMContentLoaded", () => {
    const roster = [
        { name: "Orpheus", game: "P3", role: "Attacker", arcana: "Fool" },
        { name: "Thanatos", game: "P3", role: "Attacker", arcana: "Death" },
        { name: "Izanagi", game: "P4", role: "Attacker", arcana: "Fool" },
        { name: "Kaguya", game: "P4", role: "Healer", arcana: "Moon" },
        { name: "Arsène", game: "P5", role: "Attacker", arcana: "Fool" },
        { name: "Morgana", game: "P5", role: "Healer", arcana: "Magician" },
        { name: "Yoshitsune", game: "P5", role: "Attacker", arcana: "Tower" },
        { name: "Maya", game: "P2", role: "Support", arcana: "Moon" },
        { name: "Tatsuya", game: "P2", role: "Attacker", arcana: "Sun" }
    ];

    const maxTeamSize = 4;
    const listContainer = document.getElementById("persona-list");
    const teamContainer = document.getElementById("team-list");
    const filterSelect = document.getElementById("gameFilter");
    const statsSpan = document.getElementById("team-stats");

    const team = [];

    function renderRoster() {
        listContainer.innerHTML = "";
        const filter = filterSelect.value;
        const filtered = roster.filter(p =>
            filter === "ALL" ? true : p.game === filter
        );

        filtered.forEach(p => {
            const card = document.createElement("article");
            card.className = "card";

            const header = document.createElement("div");
            header.className = "card-header";

            const title = document.createElement("h3");
            title.textContent = p.name;

            const tags = document.createElement("div");
            const gameTag = document.createElement("span");
            gameTag.className = "tag";
            gameTag.textContent = p.game;

            const roleTag = document.createElement("span");
            roleTag.className = "tag";
            roleTag.textContent = p.role;

            tags.appendChild(gameTag);
            tags.appendChild(roleTag);

            header.appendChild(title);
            header.appendChild(tags);

            const meta = document.createElement("p");
            meta.textContent = `Arcana: ${p.arcana}`;

            const button = document.createElement("button");
            button.className = "button";
            button.type = "button";
            button.textContent = "Add to team";
            button.addEventListener("click", () => addToTeam(p));

            card.appendChild(header);
            card.appendChild(meta);
            card.appendChild(button);
            listContainer.appendChild(card);
        });
    }

    function addToTeam(persona) {
        if (team.length >= maxTeamSize) {
            alert("Your team is full (max 4 Personas).");
            return;
        }
        if (team.includes(persona)) {
            alert("This Persona is already in your team.");
            return;
        }
        team.push(persona);
        renderTeam();
    }

    function removeFromTeam(index) {
        team.splice(index, 1);
        renderTeam();
    }

    function renderTeam() {
        teamContainer.innerHTML = "";
        if (team.length === 0) {
            teamContainer.textContent = "Your team is empty. Add some Personas!";
            statsSpan.textContent = "";
            return;
        }

        let attackers = 0;
        let healers = 0;
        let supports = 0;

        team.forEach((p, index) => {
            if (p.role === "Attacker") attackers++;
            if (p.role === "Healer") healers++;
            if (p.role === "Support") supports++;

            const row = document.createElement("div");
            row.className = "card";

            const header = document.createElement("div");
            header.className = "card-header";

            const name = document.createElement("strong");
            name.textContent = p.name;

            const badge = document.createElement("span");
            badge.className = "badge";
            badge.textContent = `${p.game} • ${p.role}`;

            header.appendChild(name);
            header.appendChild(badge);

            const removeBtn = document.createElement("button");
            removeBtn.className = "button";
            removeBtn.type = "button";
            removeBtn.textContent = "Remove";
            removeBtn.addEventListener("click", () => removeFromTeam(index));

            row.appendChild(header);
            row.appendChild(removeBtn);
            teamContainer.appendChild(row);
        });

        statsSpan.textContent =
            `Team size: ${team.length}/${maxTeamSize} – ` +
            `Attackers: ${attackers}, Healers: ${healers}, Supports: ${supports}`;
    }

    filterSelect.addEventListener("change", renderRoster);

    renderRoster();
    renderTeam();
});
