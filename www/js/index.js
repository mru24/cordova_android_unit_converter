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
    // app.init();
}
app.init();


