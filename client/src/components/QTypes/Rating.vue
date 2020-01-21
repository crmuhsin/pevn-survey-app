<template>
<span>
    <span v-if="setter">
        <span class="form-group">
            <div class="range-slider">
                <input class="range-slider__range" type="range" :min="choices.min" :max="choices.max" v-model="send_value">
                <span class="range-slider__value">{{send_value}}</span>
            </div>
            <div class="row mt-1">
                <span class="col-3"> MinValue:</span>
                <input type="number" v-model="choices.min" class="form-control form-control-sm col-3">
            </div>
            <div class="row mt-1">
                <span class="col-3"> MaxValue:</span>
                <input type="number" v-model="choices.max" class="form-control form-control-sm col-3">
            </div>
        </span>
    </span>
    <span v-else>
        <span class="form-group">
            <div class="range-slider">
                <input class="range-slider__range" type="range" :min="choices.min" :max="choices.max" v-model="send_value">
                <span class="range-slider__value">{{send_value}}</span>
            </div>
        </span>
    </span>
</span>
</template>

<script>
export default {
    props: {
        setter: {
            type: Boolean,
            required: true,
            note: 'is Setter or is Getter',
        },
        choices: {
            type: Object,
            required: true,
            note: 'Choice Object',
        },
        answer: {
            type: String,
            required: false,
            note: 'answer',
        }
    },    
    data(){
        return {
            send_value: 0,
            error: '',
            button_disable: false,
        }
    },
    created(){
        this.send_value = this.choices.min;
    },
    watch:{
        send_value(){
            this.$emit("sendValue", this.send_value);
        },
        button_disable(){
            this.$emit("buttonDisable", this.button_disable);
        }
    }
}
</script>

<style scoped>
.range-slider {
  width: 100%;
}

.range-slider__range {
  -webkit-appearance: none;
  width: calc(100% - (73px));
  height: 10px;
  border-radius: 5px;
  background: #d7dcdf;
  outline: none;
  padding: 0;
  margin: 0;
}
.range-slider__range::-webkit-slider-thumb {
  -webkit-appearance: none;
          appearance: none;
  width: 20px;
  height: 20px;
  border-radius: 50%;
  background: #2c3e50;
  cursor: pointer;
  transition: background .15s ease-in-out;
}
.range-slider__range::-webkit-slider-thumb:hover {
  background: #1abc9c;
}
.range-slider__range:active::-webkit-slider-thumb {
  background: #1abc9c;
}
.range-slider__range::-moz-range-thumb {
  width: 20px;
  height: 20px;
  border: 0;
  border-radius: 50%;
  background: #2c3e50;
  cursor: pointer;
  transition: background .15s ease-in-out;
}
.range-slider__range::-moz-range-thumb:hover {
  background: #1abc9c;
}
.range-slider__range:active::-moz-range-thumb {
  background: #1abc9c;
}
.range-slider__range:focus::-webkit-slider-thumb {
  box-shadow: 0 0 0 3px #fff, 0 0 0 6px #1abc9c;
}

.range-slider__value {
  display: inline-block;
  position: relative;
  width: 60px;
  color: #fff;
  line-height: 20px;
  text-align: center;
  border-radius: 3px;
  background: #2c3e50;
  padding: 5px 10px;
  margin-left: 8px;
}
.range-slider__value:after {
  position: absolute;
  top: 8px;
  left: -7px;
  width: 0;
  height: 0;
  border-top: 7px solid transparent;
  border-right: 7px solid #2c3e50;
  border-bottom: 7px solid transparent;
  content: '';
}

::-moz-range-track {
  background: #d7dcdf;
  border: 0;
}

input::-moz-focus-inner,
input::-moz-focus-outer {
  border: 0;
}
</style>