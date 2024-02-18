var fuel = {
    async init() {
        this.jq = $;

        this.fuelSourceSelect = this.jq('#fuelSource');
        this.fuelTargetSelect = this.jq('#fuelTarget');
        this.fuelSourceInput = this.jq('#inputFuelSource');
        this.fuelTargetInput = this.jq('#inputFuelTarget');

        await this.fuelConverter(this.fuelSourceSelect,this.fuelTargetSelect);
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

}

document.addEventListener("deviceready", onDeviceReady, false);
function onDeviceReady() {
    fuel.init();
}
fuel.init();