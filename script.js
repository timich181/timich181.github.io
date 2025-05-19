// Игровые переменные
let products = 0;
let passiveIncome = 0;

// Улучшения (возвращены оригинальные названия)
let upgrades = [
    { name: 'Закурить сижку', count: 0, baseCost: 50, power: 1, desc: 'Мудрость через дым' },
    { name: 'Бахнуть пивка', count: 0, baseCost: 100, power: 2, desc: 'Инсайты под градусом' },
    { name: 'Наорать на команду', count: 0, baseCost: 500, power: 10, desc: 'Мотивация через страх' },
    { name: 'Врезать СЕО', count: 0, baseCost: 2000, power: 50, desc: 'Оптимизация хаоса' }
];

// Загрузка сохранённого прогресса
function loadGame() {
    const saved = localStorage.getItem('lenaGame');
    if (saved) {
        const data = JSON.parse(saved);
        products = data.products;
        passiveIncome = data.passiveIncome;
        upgrades = data.upgrades;
    }
}

// Сохранение прогресса
function saveGame() {
    const data = {
        products,
        passiveIncome,
        upgrades
    };
    localStorage.setItem('lenaGame', JSON.stringify(data));
}

// Ссылки на DOM-элементы
const productCountEl = document.getElementById('product-count-large');
const incomeTextEl = document.getElementById('income-text');
const clickBtnEl = document.getElementById('click-btn');
const upgradeGridEl = document.getElementById('upgrade-grid');

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

        const cost = document.createElement('div');
        cost.className = 'upgrade-cost';
        cost.textContent = `${upgrade.baseCost} 💼`;

        info.appendChild(name);
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
    products += 1; // Фиксированная сила = 1
    updateDisplay();
    saveGame();
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
        saveGame();
    }
}

// Обновление пассивного дохода
function updatePassiveIncome() {
    passiveIncome = upgrades.reduce((sum, u) => sum + u.count * u.power, 0);
    incomeTextEl.textContent = `+${passiveIncome}/сек`;
}

// Обновление интерфейса
function updateDisplay() {
    productCountEl.textContent = `${Math.floor(products)}`;
}

// Тик пассивного дохода
setInterval(() => {
    products += passiveIncome;
    updateDisplay();
    saveGame();
}, 1000);

// Инициализация игры
loadGame(); // Загружаем сохранённый прогресс
initUpgrades();
updatePassiveIncome();
updateDisplay();
