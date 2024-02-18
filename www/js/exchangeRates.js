var rates = {
    async init() {
        this.jq = $;

        await this.nbpApi();
    },
    async nbpApi() {
        // https://api.nbp.pl/#info
        let url = `https://api.nbp.pl/api/exchangerates/rates/C/GBP`;
        let result = await this.readApi(url);
        let avgurl = `https://api.nbp.pl/api/exchangerates/rates/A/GBP`;
        let avgresult = await this.readApi(avgurl);        
        let histurl = `http://api.nbp.pl/api/exchangerates/rates/a/gbp/last/10/?format=json`;
        let histresult = await this.readApi(histurl);
        console.log(histresult);
        html = '';
        html += `<h3>${result.code}</h3>`;
        html += `<p class="f21">Mid: ${app.roundNum(avgresult.rates[0].mid,3)} PLN</p>`;
        html += `<p class="f21">Bid: ${app.roundNum(result.rates[0].bid,3)} PLN</p>`;
        html += `<p class="f21">Ask: ${app.roundNum(result.rates[0].ask,3)} PLN</p>`;
        this.jq('.currency #gbp').html(html);

        hhtml = '';
        hhtml += `<div class="history-container">`;
        histresult.rates.slice().reverse().forEach(res => {            
            hhtml += `<div class="grid grid-2">`;
            hhtml +=    `<p class="day f14">`;
            hhtml +=         `<span>${res.mid.toFixed(3)} PLN; ${res.effectiveDate}</span>`;
            hhtml +=    `</p>`;
            hhtml += `</div>`;
        });
        hhtml += `</div>`;
        this.jq('#history').html(hhtml);

        this.calculateCurrency(result.rates[0].ask);
    },
    calculateCurrency(rate) {
        let value = this.jq('#inputCurrencySource').val() * rate;
        this.jq('#inputCurrencyTarget').val(app.roundNum(value,2));
        this.jq('#inputCurrencySource').on('input',()=>{
            let value = this.jq('#inputCurrencySource').val() * rate;
            this.jq('#inputCurrencyTarget').val(app.roundNum(value,2));
        });
    },
    setupDate(offset) {
        if(!offset) offset = 0;
        let date = new Date(Date.now() - (offset) * 3600 * 1000);
        let year = date.getFullYear();
        let month = date.getMonth() + 1;
        let day = (date.getDate() < 10 ? '0' : '') + date.getDate();
        return year+'-'+month+'-'+day;
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
    }
}