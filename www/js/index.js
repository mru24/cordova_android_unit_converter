var app = {
    async init() {
        console.log("Converter App READY");
        
        this.jq = $;
        this.fixed = 3;
        this.calc = '';
        // this.inputNumber = this.jq('input[type="number"]');
        // this.inputNumber.bind('keyup change click',(e)=>{
        //     this.inputNumber.val(this.inputNumber.val());
        // });
        // this.inputNumber.length>0?this.initInputTypeNumber():'';

        this.trigger = this.jq('.trigger');
        this.trigger.on('click',(e)=>{
            this.jq(e.currentTarget)
                .toggleClass('active')
                .next('.hidden').slideToggle();
        })

        this.fuelSourceSelect = this.jq('#fuelSource');
        this.fuelTargetSelect = this.jq('#fuelTarget');
        this.fuelSourceInput = this.jq('#inputFuelSource');
        this.fuelTargetInput = this.jq('#inputFuelTarget');

        await this.fuelConverter(this.fuelSourceSelect,this.fuelTargetSelect);

        await this.nbpApi();
    
    },
    setupDate(offset) {
        if(!offset) offset = 0;
        let date = new Date(Date.now() - (offset) * 3600 * 1000);
        let year = date.getFullYear();
        let month = date.getMonth() + 1;
        let day = (date.getDate() < 10 ? '0' : '') + date.getDate();
        return year+'-'+month+'-'+day;
    },
    async fuelConverter(s,t) {
        await this.selectUnits(s,t);
        s.on('change',()=>{ this.selectUnits(s,t); });
        t.on('change',()=>{ this.selectUnits(s,t); });
    },
    async selectUnits(s,t) {
        // console.log(s.val(),t.val());
        if(s.val() != t.val()) {
            if(s.val() == 'mpg' && t.val() == 'l/100km') {
                this.calc = 282.48093627967 / this.fuelSourceInput.val();
                this.calculate(this.calc);
                this.fuelSourceInput.on('input',()=>{
                    this.calc = 282.48093627967 / this.fuelSourceInput.val();
                    this.calculate(this.calc);
                });
            }
            else if(s.val() == 'mpg' && t.val() == 'km/l') {
                this.calc = this.fuelSourceInput.val() * 0.35400619;
                this.calculate(this.calc);
                this.fuelSourceInput.on('input',()=>{
                    this.calc = this.fuelSourceInput.val() * 0.35400619;
                    this.calculate(this.calc);
                });
            }
            else if(s.val() == 'mpg' && t.val() == 'mi/l') {
                this.calc = this.fuelSourceInput.val() * 0.2199692483397;
                this.calculate(this.calc);
                this.fuelSourceInput.on('input',()=>{
                    this.calc = this.fuelSourceInput.val() * 0.2199692483397;
                    this.calculate(this.calc);
                });
            }            
            else if(s.val() == 'l/100km' && t.val() == 'mpg') {
                this.calc = 282.48093627967 / this.fuelSourceInput.val();
                this.calculate(this.calc);
                this.fuelSourceInput.on('input',()=>{
                    this.calc = 282.48093627967 / this.fuelSourceInput.val();
                    this.calculate(this.calc);
                });
            }
            else if(s.val() == 'l/100km' && t.val() == 'km/l') {
                this.calc = 100 / this.fuelSourceInput.val();
                this.calculate(this.calc);
                this.fuelSourceInput.on('input',()=>{
                    this.calc = 100 / this.fuelSourceInput.val();
                    this.calculate(this.calc);
                });
            }
            else if(s.val() == 'l/100km' && t.val() == 'mi/l') {
                this.calc =  62.137119223734 / this.fuelSourceInput.val();
                this.calculate(this.calc);
                this.fuelSourceInput.on('input',()=>{
                    this.calc =  62.137119223734 / this.fuelSourceInput.val();
                    this.calculate(this.calc);
                });
            }            
            else if(s.val() == 'km/l' && t.val() == 'mpg') {
                this.calc = this.fuelSourceInput.val() * 2.825;
                this.calculate(this.calc);
                this.fuelSourceInput.on('input',()=>{
                    this.calc = this.fuelSourceInput.val() * 2.825;
                    this.calculate(this.calc);
                });
            }
            else if(s.val() == 'km/l' && t.val() == 'mi/l') {
                this.calc = this.fuelSourceInput.val() * 0.62137119223734;
                this.calculate(this.calc);
                this.fuelSourceInput.on('input',()=>{
                    this.calc = this.fuelSourceInput.val() * 0.62137119223734;
                    this.calculate(this.calc);
                });
            }
            else if(s.val() == 'km/l' && t.val() == 'l/100km') {
                this.calc = 100 / this.fuelSourceInput.val();
                this.calculate(this.calc);
                this.fuelSourceInput.on('input',()=>{
                    this.calc = 100 / this.fuelSourceInput.val();
                    this.calculate(this.calc);
                });
            }
            else if(s.val() == 'mi/l' && t.val() == 'km/l') {
                this.calc = this.fuelSourceInput.val() * 1.609344;
                this.calculate(this.calc);
                this.fuelSourceInput.on('input',()=>{
                    this.calc = this.fuelSourceInput.val() * 1.609344;
                    this.calculate(this.calc);
                });
            }
            else if(s.val() == 'mi/l' && t.val() == 'mpg') {
                this.calc = this.fuelSourceInput.val() * 4.5460899991607;
                this.calculate(this.calc);
                this.fuelSourceInput.on('input',()=>{
                    this.calc = this.fuelSourceInput.val() * 4.5460899991607;
                    this.calculate(this.calc);
                });
            }
            else if(s.val() == 'mi/l' && t.val() == 'l/100km') {
                this.calc =  62.137119223734 / this.fuelSourceInput.val();
                this.calculate(this.calc);
                this.fuelSourceInput.on('input',()=>{
                    this.calc = 62.137119223734 / this.fuelSourceInput.val();
                    this.calculate(this.calc);
                });
            }
            else {
                console.log("ERROR");
                this.fuelTargetInput.val('');
            }
        } else {
            console.log("Error");
            this.fuelTargetInput.val('');
        }
    },
    async calculate(calc) {        
        if(calc > 0) {
            this.fuelTargetInput.val(this.fixedNum(calc));
        }    
        if(calc == Infinity) {
            this.fuelTargetInput.val('');
        }
    },
    fixedNum(n) {
        return n.toFixed(this.fixed);
    },
    async nbpApi() {
        // https://api.nbp.pl/#info
        let url = `https://api.nbp.pl/api/exchangerates/rates/C/GBP`;
        let result = await this.readApi(url);
        let avgurl = `https://api.nbp.pl/api/exchangerates/rates/A/GBP`;
        let avgresult = await this.readApi(avgurl);        
        let histurl = `http://api.nbp.pl/api/exchangerates/rates/c/gbp/${this.setupDate(24*60)}/${this.setupDate()}/`;
        let histresult = await this.readApi(histurl);
        console.log(histresult);
        html = '';
        html += `<h3>${result.code}</h3>`;
        html += `<p class="f19">Mid: ${avgresult.rates[0].mid} PLN</p>`;
        html += `<p class="f19">Bid: ${result.rates[0].bid} PLN</p>`;
        html += `<p class="f19">Ask: ${result.rates[0].ask} PLN</p>`;
        html += `<p class="f14">Date: ${result.rates[0].effectiveDate}</p>`;
        this.jq('.currency #gbp').html(html);

        hhtml = '';
        hhtml += `<div class="history-container">`;
        histresult.rates.slice().reverse().forEach(res => {
            
            hhtml += `<div class="grid grid-2">`;
            hhtml +=    `<p class="day f14">`;
            hhtml +=         `<span class="bid">bid:</span>`;
            hhtml +=         `<span class="ask">ask:</span>`;
            hhtml +=         `<span class="ask">date:</span>`;
            hhtml +=    `</p>`;
            hhtml +=    `<p class="day f14">`;
            hhtml +=         `<span class="bid">${res.bid} PLN</span>`;
            hhtml +=         `<span class="ask">${res.ask} PLN</span>`;
            hhtml +=         `<span class="ask pl20">${res.effectiveDate}</span>`;
            hhtml +=    `</p>`;
            hhtml += `</div>`;
        });
        hhtml += `</div>`;
        this.jq('#history').html(hhtml);

        this.calculateCurrency(result.rates[0].ask);
    },
    calculateCurrency(rate) {
        let value = this.jq('#inputCurrencySource').val() * rate;
        this.jq('#inputCurrencyTarget').val(value.toFixed(2));
        this.jq('#inputCurrencySource').on('input',()=>{
            let value = this.jq('#inputCurrencySource').val() * rate;
            this.jq('#inputCurrencyTarget').val(value.toFixed(2));
        });
    },
    initInputTypeNumber() {
        this.inputNumber
            .wrap('<div class="ITN-container"></div>')
            .before('<span class="downITNbtn">-</span>')
            .after('<span class="upITNbtn">+</span>');
        let val = this.inputNumber.val();
        this.jq(document).on('click','.downITNbtn',(e)=>{
            if(val > 1) {
                val--;
                this.inputNumber.val(val);
            }
        })
        this.jq(document).on('click','.upITNbtn',(e)=>{
            if(val > 0) {
                val++;
                this.inputNumber.val(val);
            }
        })
    },    
    async readApi(url) {
        try {
            const response = await fetch(url);
            const result = await response.json();
            console.log("API RESULT: ",result);
            return result;
        } catch (error) {
            console.error(error);
        }        
    },
}

document.addEventListener("deviceready", onDeviceReady, false);
function onDeviceReady() {
    app.init();
}
app.init();


