     // 获取所有DOM元素
const p = document.getElementById('outer');
const logisticsInfo = document.getElementById('enter');
const dhenter = document.getElementById('dhenter');
const dhouter = document.getElementById('dhouter');
const ysouter = document.getElementById('ysouter');
const yxenter = document.getElementById('yxenter');
const yxouter = document.getElementById('yxouter');
const kfenter = document.getElementById('kfenter');
const skuenter = document.getElementById('skuenter');
const skuouter = document.getElementById('skuouter');
const yqenter = document.getElementById('yqenter');
const yqouter = document.getElementById('yqouter');
const number = document.getElementById('number');
const copyButton = document.getElementById('copyOrderBtn');
const pmouter = document.getElementById('pmouter');
const difpriceouter = document.getElementById('difpriceOuter');
const difpriceEnter = document.getElementById('difpriceEnter');
const difpriceTimeEnter = document.getElementById('difpriceTimeEnter');

// 单号更新函数
function updateOrderNumber() {
    dhouter.textContent = dhenter.value || "等待输入";
}

function updateOrderCode() {
    // 定义字符集（0-9, A-Z）
    const charset = '0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    
    if (!dhenter.value) {
        ysouter.textContent = "等待输入";
        return;
    }
    
    try {
        const bigIntOrder = BigInt(dhenter.value);
        const remainder = Number(bigIntOrder % 46656n);
        
        // 计算36进制表示的三个位
        const high = Math.floor(remainder / 1296);
        const mid = Math.floor((remainder % 1296) / 36);
        const low = remainder % 36;
        
        // 组合成三位代码
        const orderCode = charset[high] + charset[mid] + charset[low];
        ysouter.textContent = (kfenter.value || "") + (yxenter.value || "") + orderCode;
    } catch (e) {
        ysouter.textContent = "单号格式错误";
        console.error("订单号处理错误:", e);
    }
}

// 物流时间解析函数
function updateLogisticsTime() {
    const text = logisticsInfo.value;
    const pattern = /已下单[\s\S]*?(\d{4}-\d{2}-\d{2}\s\d{2}:\d{2}:\d{2})[\s\S]*?商品已经下单/m;
    const match = text.match(pattern);
    const realTime = getCurrentDateTime();
    p.textContent = match ? match[1] : realTime;
    p.className = match ? "highlight" : "";
}

function updateGame() {
    yxouter.textContent = yxenter.options[yxenter.selectedIndex].text;
}

function updateSku() {
    skuouter.textContent = (skuenter.value || "") + (yxenter.value=='S'?difpriceTimeEnter.value+"min":"") + (number.value ? "×" + number.value : "");
}

// 更新备注函数 - 修复版
async function updateYq() {
    const pmText = await updatePriceAndFee();
    yqouter.textContent = yqenter.value
        ? (pmText ? `${yqenter.value}，${pmText}` : yqenter.value)
        : "";
}

// 自动选择夜间补贴
function autoSelectNightSubsidy() {
    const now = new Date();
    const hours = now.getHours();
    const nightOption = document.querySelector('#difpriceEnter option[value="night_subsidy"]');
    
    if (hours >= 1 && hours < 6) {
        if (!nightOption.selected) nightOption.selected = true;
    } else {
        if (nightOption.selected) nightOption.selected = false;
    }
}

let localTotal;
let localPm;
// 统一的价格和跑单费更新函数
// 统一的价格和跑单费更新函数 - 修复版
async function updatePriceAndFee() {
    autoSelectNightSubsidy();
    
    const selectedServices = Array.from(difpriceEnter.selectedOptions).map(opt => opt.value);
    const selectedTime = difpriceTimeEnter.value;
    const requestData = {
        selectedServices,
        selectedTime,
        quantity: number.value ? parseInt(number.value) : 1
    };

    try {
        // 发送POST请求
        const response = await fetch('https://api.jsodinfo.xyz/api/difprice', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(requestData)
        });
        
        const data = await response.json();
        
        // 显示响应
        if (data.success) {
            // 正确的解构赋值方式
            const { total: lcTotal = 0, pm: lcPm = 0 } = data;
            
            // 更新局部变量
            const localTotal = lcTotal;
            const localPm = lcPm;
            
            difpriceouter.textContent = "¥" + localTotal.toFixed(2);
            
            const selectedOptions = Array.from(difpriceEnter.selectedOptions);
            const selectedValues = selectedOptions.map(option => option.textContent);
            const result = selectedValues.join(', ');
            
            const pmText = localPm > 0 ? `${result}+${localPm}` : result;
            pmouter.textContent = pmText;
            
            return pmText;
        } else {
            console.error("API请求失败:", data.message);
            return "";
        }
    } catch (error) {
        console.error("请求失败:", error);
        alert(`请求失败: ${error.message}`);
        return "";
    }
}

// 复制订单信息功能
function copyOrderInfo() {
  // ...前面的代码不变...
  const infoLines = [
        `惊殊：编号：${ysouter.textContent}`,
        `订单号：${dhouter.textContent}`,
        `游戏名：${yxouter.textContent}`,
        `sku规格：${skuouter.textContent}`,
        `创建时间：${p.textContent}`,
        `店铺：惊殊网游数娱`,
`${yqouter.textContent}${pmouter.textContent}`
    ];
    
    const infoText = infoLines.join('\n');
    
    // 创建临时textarea进行复制
    const tempTextArea = document.createElement('textarea');
    tempTextArea.value = infoText;
    document.body.appendChild(tempTextArea);
    tempTextArea.select();
  try {
    const successful = document.execCommand('copy');
    if (successful) {
      // 克隆原始SVG并修改（保留原始尺寸）
      /* const originalSvg = copyButton.querySelector('svg').cloneNode(true);
      originalSvg.innerHTML = `<polyline points="20 6 9 17 4 12"></polyline>`;
      
      // 只替换文本内容，保留SVG结构
      copyButton.innerHTML = '';
      copyButton.appendChild(originalSvg);
      copyButton.appendChild(document.createTextNode('已复制'));
copyButton.classList.add('copied', 'copied-animation');
     
      // 2秒后恢复
      setTimeout(() => {
        copyButton.innerHTML = `
          <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
            <rect x="9" y="9" width="13" height="13" rx="2" ry="2"></rect>
            <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"></path>
          </svg>
          复制订单信息
        `;
        copyButton.classList.remove('copied', 'copied-animation');
      }, 2000);
*/
    }
  } catch (err) {
console.error('复制失败:', err);
        alert('复制失败，请手动复制文本。');
  }
 document.body.removeChild(tempTextArea);
}

function getCurrentDateTime() {
  const now = new Date();

  // 获取日期和时间组件
  const year = now.getFullYear();
  const month = String(now.getMonth() + 1).padStart(2, '0'); // 月份从0开始，需+1
  const day = String(now.getDate()).padStart(2, '0');
  const hours = String(now.getHours()).padStart(2, '0');
  const minutes = String(now.getMinutes()).padStart(2, '0');
  const seconds = String(now.getSeconds()).padStart(2, '0');

  // 组合成目标格式
  return `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;
}

// 初始化所有功能
function initSystem() {
    // 绑定事件监听
    dhenter.addEventListener('input', function(event){
updateOrderNumber();
updateOrderCode();
});

    logisticsInfo.addEventListener('input', updateLogisticsTime);

// 使用事件委托统一处理所有表单元素的 input 和 change 事件
document.addEventListener('input', handleFormEvent);
document.addEventListener('change', handleFormEvent);

let debounceTimer;
function handleFormEvent(event) {
  if (!event.target.matches('input, select, textarea')) return;
  
  // 500ms防抖
  clearTimeout(debounceTimer);
  debounceTimer = setTimeout(updateLogisticsTime, 500);
}

    yxenter.addEventListener('change', updateGame);
    yxenter.addEventListener('change',function(event){
      updateOrderCode();
       updateSku();
});
    kfenter.addEventListener('input', updateOrderCode);
    skuenter.addEventListener('input', updateSku);
    yqenter.addEventListener('input', updateYq);
    
    number.addEventListener('input', function(event) {
        updateSku();
        updatePriceAndFee();
    });
    
   /* copyButton.addEventListener('click', copyOrderInfo); */
    
    // 差价系统事件监听
    difpriceEnter.addEventListener('change', function(event) {
        updatePriceAndFee();
        updateYq();
    });
    
    difpriceTimeEnter.addEventListener('change', function(event) {
        updatePriceAndFee();
        updateYq();
        updateSku();
    });
    
    // 初始化显示
    updateOrderNumber();
    updateLogisticsTime();
    updateOrderCode();
    updateGame();
    updateSku();
    updatePriceAndFee(); // 初始化价格系统
    updateYq();
    getCurrentDateTime();
}

// 确保DOM加载完成后初始化
document.addEventListener('DOMContentLoaded', initSystem);

const saveButton = document.getElementById('saveButton');
        
        saveButton.addEventListener('click', function() {
            // 切换到保存中状态
            this.classList.remove('saved');
            this.classList.add('saving');
            
            // 模拟保存过程（2秒）
            setTimeout(() => {
                // 切换到已保存状态
                this.classList.remove('saving');
                this.classList.add('saved');
                
                // 3秒后恢复原始状态
                setTimeout(() => {
                    this.classList.remove('saved');
                }, 3000);
            }, 2000);
});

// 替换为你的Supabase项目URL和公钥
document.addEventListener('DOMContentLoaded', function() {
            // 初始化Supabase
            const supabaseUrl = 'https://qccrhtfficbcjkzvgfvq.supabase.co';
            const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InFjY3JodGZmaWNiY2prenZnZnZxIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTM5Njk5MTAsImV4cCI6MjA2OTU0NTkxMH0.UXqa7RsC38lfiDMvdC9DpWq7F1ZduqE3wBcTRFaht1o';
            
            // 使用全局的supabase对象来创建客户端
            window.supabase = supabase.createClient(supabaseUrl, supabaseKey);

if (!window.supabase) {
                console.error('Supabase未初始化');
                return;
            }
});            
async function addOrder(){
    const order = {
        order_code: ysouter.textContent,
        order_sigh: dhouter.textContent,
        order_game: yxouter.textContent,
        order_sku: skuouter.textContent,
        order_createTime:p.textContent,
        order_request:yqouter.textContent,
        order_pmouter:pmouter.textContent
    };
    try {
        const {data, error} = await window.supabase
        .from('js_order_info')
        .insert([order]);
        if (error) throw error;
        
        console.log('添加订单成功:', data);
        alert('保存复制成功！');
    } catch (error) {
        console.error('添加订单失败:', error);
        alert('保存失败: ' + error.message);
    }
}

saveButton.addEventListener('click', addOrder);
saveButton.addEventListener('click', copyOrderInfo);
