let products = 0;
let clickPower = 1;
let passiveIncome = 0;
let upgrades = [
    { name: 'Закурить сижку', count: 0, baseCost: 50, power: 1, desc: 'Мудрость через дым' },
    { name: 'Бахнуть пивка', count: 0, baseCost: 100, power: 2, desc: 'Инсайты под градусом' },
    { name: 'Наорать на команду', count: 0, baseCost: 500, power: 10, desc: 'Мотивация через страх' },
    { name: 'Врезать СЕО', count: 0, baseCost: 2000, power: 50, desc: 'Оптимизация хаоса' }
];

const productCount = document.getElementById('product-count');
const clickPowerDisplay = document.getElementById('click-power');
const passiveIncomeDisplay = document.getElementById('passive-income');
const upgradeGrid = document.getElementById('upgrade-grid');
const statusText = document.getElementById('status');

// Инициализация улучшений
function initUpgrades() {
    upgradeGrid.innerHTML = '';
    upgrades.forEach((upgrade, index) => {
        const card = document.createElement('div');
        card.className = 'upgrade-card';

        const name = document.createElement('h3');
        name.textContent = `${upgrade.name} (x${upgrade.count})`;

        const desc = document.createElement('p');
        desc.textContent = upgrade.desc;

        const cost = document.createElement('p');
        cost.textContent = `Стоимость: ${upgrade.baseCost} 💼`;

        const btn = document.createElement('button');
        btn.textContent = 'Купить';
        btn.addEventListener('click', () => buyUpgrade(index));

        card.appendChild(name);
        card.appendChild(desc);
        card.appendChild(cost);
        card.appendChild(btn);
        upgradeGrid.appendChild(card);
    });
}

// Клик по кнопке
document.getElementById('click-btn').addEventListener('click', () => {
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
        showStatus(`❌ Недостаточно продуктов для ${upgrade.name}`, 1500);
    }
}

// Обновление пассивного дохода
function updatePassiveIncome() {
    passiveIncome = upgrades.reduce((sum, u) => sum + u.count * u.power, 0);
    passiveIncomeDisplay.textContent = `🧠 Автоматический доход: ${passiveIncome} продуктов/сек`;
}

// Обновление интерфейса
function updateDisplay() {
    productCount.textContent = `📦 Продукты: ${Math.floor(products)}`;
    clickPowerDisplay.textContent = `⚡ Сила создания: ${clickPower}`;
}

// Тик пассивного дохода
setInterval(() => {
    products += passiveIncome;
    updateDisplay();
}, 1000);

// Статус
function showStatus(message, duration) {
    statusText.textContent = message;
    setTimeout(() => {
        statusText.textContent = '📢 Лена всегда знает, как добиться результата!';
    }, duration);
}

// Инициализация
initUpgrades();
updatePassiveIncome();
updateDisplay();
