function initUpgrades() {
    const upgradeGrid = document.getElementById('upgrade-grid');
    upgradeGrid.innerHTML = '';

    upgrades.forEach((upgrade, index) => {
        const card = document.createElement('div');
        card.className = 'upgrade-card';

        const info = document.createElement('div');
        info.className = 'upgrade-info';

        const name = document.createElement('h3');
        name.textContent = upgrade.name;

        const count = document.createElement('div');
        count.className = 'count';
        count.textContent = `x${upgrade.count}`;

        const cost = document.createElement('div');
        cost.className = 'upgrade-cost';
        cost.textContent = `${upgrade.baseCost} 💼`;

        const btn = document.createElement('button');
        btn.className = 'upgrade-btn';
        btn.textContent = 'Купить';
        btn.addEventListener('click', () => buyUpgrade(index));

        info.appendChild(name);
        info.appendChild(count);
        info.appendChild(cost);

        card.appendChild(info);
        card.appendChild(btn);
        upgradeGrid.appendChild(card);
    });
}
