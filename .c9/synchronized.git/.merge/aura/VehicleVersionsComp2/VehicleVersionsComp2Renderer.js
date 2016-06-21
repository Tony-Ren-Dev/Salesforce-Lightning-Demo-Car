({
    render : function(cmp, helper) {
        var ret = this.superRender();
        console.log('render');
        
        // do custom rendering here
        return ret;
    },
    rerender  : function (component, helper){
        
        console.log('Enter rerender');
        
       return this.superRerender();
        
        /*
        var html5Slider = component.find('html5');//document.getElementById('html5')////document.getElementById('html5');
        console.log(html5Slider);
        
        
        noUiSlider.create(html5Slider, {
            start: [ 10, 30 ],
            connect: true,
            range: {
                'min': -20,
                'max': 40
            }
        });
        
        var select = document.getElementById('input-select');
        
        // Append the option elements
        for ( var i = -20; i <= 40; i++ ){
            
            var option = document.createElement("option");
            option.text = i;
            option.value = i;
            
            select.appendChild(option);
        }
        
        var inputNumber = document.getElementById('input-number');
        
        html5Slider.noUiSlider.on('update', function( values, handle ) {
            
            var value = values[handle];
            
            if ( handle ) {
                inputNumber.value = value;
            } else {
                select.value = Math.round(value);
            }
        });
        
        select.addEventListener('change', function(){
            html5Slider.noUiSlider.set([this.value, null]);
        });
        
        inputNumber.addEventListener('change', function(){
            html5Slider.noUiSlider.set([null, this.value]);
        });
        */
        
        
        
    },
    afterRender: function (component, helper) {
        this.superAfterRender();
       // component.set('v.Displaybtn', true);
        // interact with the DOM here
    },
})