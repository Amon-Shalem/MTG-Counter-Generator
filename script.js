document.addEventListener('DOMContentLoaded', () => {
    // 綁定 DOM 元素
    const generateBtn = document.getElementById('generateBtn');
    const printBtn = document.getElementById('printBtn');
    const resetAllBtn = document.getElementById('resetAllBtn');
    const counterGrid = document.getElementById('counterGrid');
    const colsInput = document.getElementById('colsInput');
    const rowsInput = document.getElementById('rowsInput');
    const counterInputs = document.querySelectorAll('.counter-input input[type="number"]');

    // 綁定 Token DOM
    const tokenKeyword = document.getElementById('tokenKeyword');
    const tokenPower = document.getElementById('tokenPower');
    const tokenToughness = document.getElementById('tokenToughness');
    const tokenQty = document.getElementById('tokenQty');
    const addTokenBtn = document.getElementById('addTokenBtn');
    const tokenListContainer = document.getElementById('tokenListContainer');
    
    let customTokens = []; // 儲存使用者自訂的 tokens

    // 指示物字典 (改用本地圖庫，等待使用者重新命名對應圖示)與顯示名稱
    const keywordData = {
        'deathtouch': { name: 'Deathtouch' },
        'defender': { name: 'Defender' },
        'double-strike': { name: 'Double Strike' },
        'enchant': { name: 'Enchant' },
        'equip': { name: 'Equip' },
        'first-strike': { name: 'First Strike' },
        'flash': { name: 'Flash' },
        'flying': { name: 'Flying' },
        'haste': { name: 'Haste' },
        'hexproof': { name: 'Hexproof' },
        'indestructible': { name: 'Indestructible' },
        'liftlink': { name: 'Lifelink' },
        'menace': { name: 'Menace' },
        'protection': { name: 'Protection' },
        'prowess': { name: 'Prowess' },
        'reach': { name: 'Reach' },
        'scry': { name: 'Scry' },
        'stun': { name: 'Stun' },
        'trample': { name: 'Trample' },
        'vigilance': { name: 'Vigilance' },
        'ward': { name: 'Ward' }
    };

    // 初始化 Token 選單
    Object.keys(keywordData).forEach(key => {
        const opt = document.createElement('option');
        opt.value = key;
        opt.innerText = keywordData[key].name;
        tokenKeyword.appendChild(opt);
    });

    // 渲染衍生物指示物
    function createTokenCounter(tokenData) {
        const type = tokenData.type;
        const data = keywordData[type] || { name: 'Token' };
        
        const item = document.createElement('div');
        item.className = 'counter-item token-type';
        
        const ptP = tokenData.power !== '' ? tokenData.power : '*';
        const ptT = tokenData.toughness !== '' ? tokenData.toughness : '*';

        // 加入正中央大 P/T
        const ptDiv = document.createElement('div');
        ptDiv.className = 'token-main-pt';
        ptDiv.innerText = `${ptP} / ${ptT}`;
        item.appendChild(ptDiv);

        // 如果有選能力，才在右下角放上縮小的機制標記
        if (type !== 'none') {
            const subInner = document.createElement('div');
            subInner.className = 'token-sub-keyword';

            const iconImg = document.createElement('img');
            iconImg.className = 'icon-img';
            
            if (typeof AppConfig !== 'undefined' && AppConfig.useOpenSourceIcons && AppConfig.openSourceIcons[type]) {
                iconImg.src = AppConfig.openSourceIcons[type];
            } else {
                iconImg.src = `icons/${type}.png`;
            }
            
            iconImg.alt = data.name;
            iconImg.onerror = function() {
                this.style.display = 'none';
            };

            subInner.appendChild(iconImg);
            item.appendChild(subInner);
        }

        return item;
    }

    // 渲染數值型指示物 (全新的 3D 折疊面板風格)
    function createPointCounter(type) {
        const item = document.createElement('div');
        item.className = 'counter-item';
        
        const pointInner = document.createElement('div');
        pointInner.className = `counter-point ${type}`;
        
        const val = type === 'plusOne' ? '+1' : '-1';
        
        // 建立左側板
        const leftPanel = document.createElement('div');
        leftPanel.className = 'panel left';
        leftPanel.innerHTML = `<span class="val">${val}</span><span class="watermark">${val}</span>`;
        
        // 建立右側板
        const rightPanel = document.createElement('div');
        rightPanel.className = 'panel right';
        rightPanel.innerHTML = `<span class="val">${val}</span><span class="watermark">${val}</span>`;

        pointInner.appendChild(leftPanel);
        pointInner.appendChild(rightPanel);
        item.appendChild(pointInner);
        return item;
    }

    // 渲染機制型指示物
    function createKeywordCounter(type) {
        const data = keywordData[type] || { name: type, icon: '❓' };
        
        const item = document.createElement('div');
        item.className = 'counter-item';
        
        const keywordInner = document.createElement('div');
        keywordInner.className = 'counter-keyword';

        const iconImg = document.createElement('img');
        iconImg.className = 'icon-img';
        
        if (typeof AppConfig !== 'undefined' && AppConfig.useOpenSourceIcons && AppConfig.openSourceIcons[type]) {
            iconImg.src = AppConfig.openSourceIcons[type];
        } else {
            iconImg.src = `icons/${type}.png`;
        }
        
        iconImg.alt = data.name;
        iconImg.onerror = function() {
            this.style.display = 'none'; // 找不到對應圖片就隱藏
        };
        
        const nameSpan = document.createElement('span');
        nameSpan.className = 'name';
        nameSpan.innerText = data.name;

        keywordInner.appendChild(iconImg);
        keywordInner.appendChild(nameSpan);
        item.appendChild(keywordInner);
        return item;
    }

    // 更新預覽邏輯
    function renderTokenList() {
        tokenListContainer.innerHTML = '';
        const isZH = document.documentElement.lang === 'zh-TW';
        
        customTokens.forEach((t, index) => {
            const li = document.createElement('li');
            const abilityNoneStr = isZH ? '無能力' : 'None';
            const deleteStr = isZH ? '刪除' : 'Delete';
            const abilityStr = t.type === 'none' ? abilityNoneStr : keywordData[t.type].name;
            const ptStr = (t.power !== '' || t.toughness !== '') ? `(${t.power || 0}/${t.toughness || 0})` : '';
            li.innerHTML = `<span>${abilityStr} ${ptStr} x${t.qty}</span> <button data-index="${index}">${deleteStr}</button>`;
            
            li.querySelector('button').addEventListener('click', (e) => {
                const idx = parseInt(e.target.getAttribute('data-index'), 10);
                customTokens.splice(idx, 1);
                renderTokenList();
                updatePreview();
            });
            tokenListContainer.appendChild(li);
        });
    }

    addTokenBtn.addEventListener('click', () => {
        const type = tokenKeyword.value;
        const power = tokenPower.value;
        const toughness = tokenToughness.value;
        const qty = parseInt(tokenQty.value, 10) || 1;
        
        customTokens.push({ type, power, toughness, qty });
        renderTokenList();
        updatePreview();
    });

    // 更新預覽邏輯
    function updatePreview() {
        // 1. 清空目前網格
        counterGrid.innerHTML = '';
        
        // 2. 更新網格 CSS 設定
        const cols = parseInt(colsInput.value, 10) || 4;
        const rows = parseInt(rowsInput.value, 10) || 5;
        
        counterGrid.style.gridTemplateColumns = `repeat(${cols}, 1fr)`;
        // 高度已經交由 css aspect-ratio 決定，確保正方形
        // counterGrid.style.gridTemplateRows = `repeat(${rows}, 1fr)`;

        // 3. 收集所有要生成的指示物並加入陣列
        let countersToGenerate = [];

        counterInputs.forEach(input => {
            const type = input.getAttribute('data-type');
            const count = parseInt(input.value, 10) || 0;
            
            for (let i = 0; i < count; i++) {
                countersToGenerate.push({ kind: 'normal', type: type });
            }
        });

        // 加入 token 陣列
        customTokens.forEach(t => {
            for (let i = 0; i < t.qty; i++) {
                countersToGenerate.push({ kind: 'token', data: t });
            }
        });

        // 4. 計算最大容量
        const maxCapacity = cols * rows;
        if (countersToGenerate.length > maxCapacity) {
            const isZH = document.documentElement.lang === 'zh-TW';
            if (isZH) {
                alert(`目前設定的指示物數量 (${countersToGenerate.length}) 超過了版面容量 (${maxCapacity})！\n將截斷多餘的指示物。如果需要排滿請調整行數列數。`);
            } else {
                alert(`Current counters (${countersToGenerate.length}) exceed the grid capacity (${maxCapacity})!\nExcess counters will be truncated. Adjust rows/cols to fit more.`);
            }
            countersToGenerate = countersToGenerate.slice(0, maxCapacity);
        }

        // 5. 將指示物渲染到畫面
        countersToGenerate.forEach(config => {
            let el;
            if (config.kind === 'normal') {
                const type = config.type;
                if (type === 'plusOne' || type === 'minusOne') {
                    el = createPointCounter(type);
                } else {
                    el = createKeywordCounter(type);
                }
            } else if (config.kind === 'token') {
                el = createTokenCounter(config.data);
            }
            counterGrid.appendChild(el);
        });

        // 6. 如果數量不足，填補空白格以維持網格正確性 (為了虛線邊框的對齊)
        const emptySlots = maxCapacity - countersToGenerate.length;
        for (let i = 0; i < emptySlots; i++) {
            const emptyItem = document.createElement('div');
            emptyItem.className = 'counter-item empty';
            counterGrid.appendChild(emptyItem);
        }
    }

    // 事件監聽
    generateBtn.addEventListener('click', updatePreview);
    
    // 當欄位改變時自動更新 (選擇性，可以提升 UX)
    counterInputs.forEach(input => {
        input.addEventListener('change', updatePreview);
    });
    colsInput.addEventListener('change', updatePreview);
    rowsInput.addEventListener('change', updatePreview);

    printBtn.addEventListener('click', () => {
        window.print();
    });

    resetAllBtn.addEventListener('click', () => {
        // 1. 將所有一般的數量歸零
        counterInputs.forEach(input => {
            input.value = 0;
        });
        
        // 2. 清空自訂衍生物清單
        customTokens = [];
        renderTokenList();
        
        // 3. 更新預覽畫面
        updatePreview();
    });

    // 初始載入時先渲染一次
    updatePreview();
});
