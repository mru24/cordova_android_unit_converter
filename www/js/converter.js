var converter = {
    async init() {
        this.jq = $;

        setTimeout(()=>{ this.jq('#app .cover').addClass('fadeout'); },2500);

        this.getInfo = '';
        this.result = '';
        await this.setupUnits();

        this.selector = this.jq('#selectUnits select');
        this.selector.on('change',(e)=>{ this.selectUnits(e); });

        this.jq('#fromValue').on('change',(e)=>{ this.calculate(e); });
    },    
    async setupUnits() {
        const url = `https://unitconversion.p.rapidapi.com/info`;
        this.getInfo = await this.readApi(url);
        this.generateUnitSelector(this.getInfo);
    },
    async generateUnitSelector(res) {
        if(res.units) {
            html = '';
            html += `<p>`;
            html += `<select id="selectUnits">`;
            for(fromUnit in res.units) {
                html += `<option value="${fromUnit}">${fromUnit}</option>`;
            }
            html += `</select>`;
            html += `</p>`;
            this.jq('#selectUnits').html(html);
        }
        html = '';
    },
    async selectUnits(e) {
        this.generateFromUnits(this.jq(e.currentTarget).val());
        this.generateToUnits(this.jq(e.currentTarget).val());
    },
    async generateFromUnits(val) {
        html = '';
        html += `<p>`;
        html += `<select>`;
        this.getInfo.units[val].forEach(unit => {
            html += `<option value="${unit}">${unit}</option>`;
        });
        html += `</select>`;
        html += `</p>`;
        this.jq('#fromUnits').html(html);
        html = '';
        this.jq('#fromUnits select').on('change',()=>{ this.calculate(); });
    },
    async generateToUnits(val) {
        html = '';
        html += `<p>`;
        html += `<select>`;
        this.getInfo.units[val].forEach(unit => {
            html += `<option value="${unit}">${unit}</option>`;
        });
        html += `</select>`;
        html += `</p>`;
        this.jq('#toUnits').html(html);
        html = '';
        this.jq('#toUnits select').bind('change keyup',()=>{ this.calculate(); });
    },
    async calculate(e) {
        let url = '';
        let from = this.jq('#fromUnits select').val();
        let to = this.jq('#toUnits select').val();
        let val = '';
        if(e > 1) {
            val = e;
        } else {
            val = this.jq('#fromValue').val();
        }
        if(this.selector.val()) {
            let select = this.selector.val();
            url = `https://unitconversion.p.rapidapi.com/${select}/${from}/${to}/${val}`;
            this.result = await this.readApi(url)
            this.jq('#toValue').val(this.result.roundedResult);
        }
    },
    async readApi(url) {
        const options = {
            method: 'GET',
            headers: {
                'X-RapidAPI-Key': '9af8a7bb2cmshd185d928c7f5a24p131605jsn50ba27212ca6',
                'X-RapidAPI-Host': 'unitconversion.p.rapidapi.com'
            }
        };
        try {
            const response = await fetch(url, options);
            const result = await response.json();
            console.log(result);
            return result;
        } catch (error) {
            console.error(error);
        }
    },
}

document.addEventListener("deviceready", onDeviceReady, false);
function onDeviceReady() {
    converter.init();
}
converter.init();