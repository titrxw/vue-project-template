<template>
    <span :class="wrapClasses" :style="value == this.trueValue ? trueStyle : falseStyle" @click="toggle">
        <input type="hidden" :name="name" :value="currentValue">
        <span :class="innerClasses">
            <slot name="open" v-if="currentValue === trueValue"></slot>
            <slot name="close" v-if="currentValue === falseValue"></slot>
        </span>
    </span>
</template>
<script>
    const prefixCls = 'my-switch';
    function oneOf (value, validList) {
        for (let i = 0; i < validList.length; i++) {
            if (value === validList[i]) {
                return true;
            }
        }
        return false;
    }
    export default {
        name: 'my-witch',
        props: {
            value: {
                type: [String, Number, Boolean],
                default: false
            },
            trueValue: {
                type: [String, Number, Boolean],
                default: true
            },
            falseValue: {
                type: [String, Number, Boolean],
                default: false
            },
            disabled: {
                type: Boolean,
                default: false
            },
            size: {
                validator (value) {
                    return oneOf(value, ['large', 'small', 'default']);
                }
            },
            trueColor: {
              type: String,
              default: '#2d8cf0'
            },
            falseColor: {
              type: String,
              default: '#f3f3f3'
            },
            name: {
                type: String
            }
        },
        data () {
            return {
                currentValue: this.value,
                trueStyle: '',
                falseStyle: ''
            };
        },
        computed: {
            wrapClasses () {
                return [
                    `${prefixCls}`,
                    {
                        [`${prefixCls}-checked`]: this.currentValue === this.trueValue,
                        [`${prefixCls}-disabled`]: this.disabled,
                        [`${prefixCls}-${this.size}`]: !!this.size
                    }
                ];
            },
            innerClasses () {
                return `${prefixCls}-inner`;
            }
        },
        methods: {
            toggle () {
                if (this.disabled) {
                    return false;
                }
                const checked = this.currentValue === this.trueValue ? this.falseValue : this.trueValue;
                this.currentValue = checked;
                this.$emit('input', checked);
                this.$emit('on-change', checked);
            }
        },
        watch: {
            value (val) {
                if (val !== this.trueValue && val !== this.falseValue) {
                    throw 'Value should be trueValue or falseValue.';
                }
                this.currentValue = val;
            }
        },
        mounted: function () {
          this.trueStyle = 'background:' + this.trueColor + ';border-color:' + this.trueColor + ';';
          this.falseStyle = 'background:' + this.falseColor + ';border-color:' + this.falseColor + ';';
        }
    };
</script>
<style lang="less">

.my-switch {
    display: inline-block;
    width: 48px;
    height: 24px;
    line-height: 22px;
    border-radius: 24px;
    vertical-align: middle;
    border: 1px solid #ccc;
    background-color: #ccc;
    position: relative;
    cursor: pointer;
    user-select: none;
    transition: all .2s ease-in-out;

    &-inner {
        color: #fff;
        font-size: 12px;
        position: absolute;
        left: 21px;

        i {
            width: 12px;
            height: 12px;
            text-align: center;
        }
    }

    &:after {
        content: '';
        width: 20px;
        height: 20px;
        border-radius: 20px;
        background-color: #fff;
        position: absolute;
        left: 1px;
        top: 1px;
        cursor: pointer;
        transition: left .2s ease-in-out, width .2s ease-in-out;
    }

    &:active:after {
        width: 26px;
    }

    &:focus {
        box-shadow: 0 0 0 2px fade(#2d8cf0, 20%);
        outline: 0;
    }

    &:focus:hover {
        box-shadow: none;
    }

    &-small {
        width: 24px;
        height: 12px;
        line-height: 10px;
        &:after {
            width: 10px;
            height: 10px;
            top: 0;
            left: 0;
        }
        &:active:after {
            width: 14px;
        }
    }

    &-small&-checked:after {
        left: 12px;
    }

    &-small:active&-checked:after {
        left: 8px;
    }

    &-large{
        width: 60px;
        &:active:after {
            width: 26px;
        }
    }

    &-large:active:after {
        width: 32px;
    }

    &-large&-checked:after {
        left: 37px;
    }

    &-large:active&-checked:after {
        left: 25px;
    }

    &-checked {
        border-color: #2d8cf0;
        background-color: #2d8cf0;

        .my-switch-inner {
            left: 8px;
        }

        &:after {
            left: 25px;
        }

        &:active:after {
            left: 19px;
        }
    }

    &-disabled {
        cursor: not-allowed;
        background: #f3f3f3;
        border-color: #f3f3f3;

        &:after {
            background: #ccc;
            cursor: not-allowed;
        }

        .my-switch-inner {
            color: #ccc;
        }
    }
}

</style>

