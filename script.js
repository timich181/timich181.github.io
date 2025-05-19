// Игровые переменные
let products = 0;
let clickPower = 1;
let passiveIncome = 0;

// Улучшения
let upgrades = [
    { name: 'Закурить сижку', count: 0, baseCost: 50, power: 1 },
    { name: 'Бахнуть пивка', count: 0, baseCost: 100, power: 2 },
    { name: 'Наорать на команду', count: 0, baseCost: 500, power: 10 },
    { name: 'Уебать СЕО', count: 0, baseCost: 2000, power: 50 }
];

// Ссылки на DOM-элементы
const productCountEl = document.getElementById('product-count');
const clickPowerEl = document.getElementById('click-power');
const passiveIncomeEl = document.getElementById('passive-income');
const upgradeGridEl = document.getElementById('upgrade-grid');
const statusTextEl = document.getElementById('status');
const clickBtnEl = document.getElementById('click-btn');

// Инициализация улучшений
function initUpgrades() {
    upgradeGridEl.innerHTML = '';
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

        info.appendChild(name);
        info.appendChild(count);
        info.appendChild(cost);

        const btn = document.createElement('button');
        btn.className = 'upgrade-btn';
        btn.textContent = 'Купить';
        btn.addEventListener('click', () => buyUpgrade(index));

        card.appendChild(info);
        card.appendChild(btn);
        upgradeGridEl.appendChild(card);
    });
}

// Обработка клика
clickBtnEl.addEventListener('click', () => {
    products += clickPower;
    updateDisplay();
    showStatus(`✨ +${clickPower} продуктов!`, 1000);
});

// Покупка улучшения
function buyUpgrade(index) {
    const upgrade = upgrades[index];
    if (products >= upgrade.baseCost) {
        products -= upgrade.baseCost;
        upgrade.count++;
        upgrade.baseCost = Math.floor(upgrade.baseCost * 1.6);
        passiveIncome += upgrade.power;
        updatePassiveIncome();
        updateDisplay();
        initUpgrades();
        showStatus(`👩💻 Куплен ${upgrade.name}`, 1500);
    } else {
        showStatus(`❌ Недостаточно для ${upgrade.name}`, 1500);
    }
}

// Обновление пассивного дохода
function updatePassiveIncome() {
    passiveIncome = upgrades.reduce((sum, u) => sum + u.count * u.power, 0);
    passiveIncomeEl.textContent = `🧠 Доход: ${passiveIncome}`;
}

// Обновление интерфейса
function updateDisplay() {
    productCountEl.textContent = `📦 Продукты: ${Math.floor(products)}`;
    clickPowerEl.textContent = `⚡ Сила: ${clickPower}`;
}

// Тик пассивного дохода
setInterval(() => {
    products += passiveIncome;
    updateDisplay();
}, 1000);

// Статус
function showStatus(message, duration) {
    statusTextEl.textContent = message;
    setTimeout(() => {
        statusTextEl.textContent = '📢 Лена всегда знает, как добиться результата!';
    }, duration);
}

// Инициализация игры
initUpgrades();
updatePassiveIncome();
updateDisplay();
