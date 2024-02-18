var app = {
    async init() {
        console.log("Converter App READY");

        setTimeout(()=>{ this.jq('#app .cover').addClass('fadeout'); },2500);
        
        this.jq = $;
        this.calc = '';

        this.trigger = this.jq('.trigger');
        this.trigger.on('click',(e)=>{
            this.jq(e.currentTarget)
                .toggleClass('active')
                .next('.hidden').slideToggle();
        })    
    },
    roundNum(n,r) {
        return n.toFixed(r);
    },
}

document.addEventListener("deviceready", onDeviceReady, false);
function onDeviceReady() {
    // app.init();
    // fuel.init();
    // converter.init();
    // rates.init();
}

app.init();
fuel.init();
converter.init();
rates.init();


