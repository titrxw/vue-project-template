<template>
    <div :class="[prefixCls]">
        <div
            :class="classes"
            @click="handleClick">
            <input v-if="capture"
                :multiple="multiple"
                :capture="capture"
                :disabled="disabled"
                ref="input"
                type="file"
                :class="[prefixCls + '-input']"
                @change="handleChange"
                :accept="accept">
            <input v-else
                :multiple="multiple"
                :disabled="disabled"
                ref="input"
                type="file"
                :class="[prefixCls + '-input']"
                @change="handleChange"
                :accept="accept">
            <slot></slot>
        </div>
        <slot name="tip"></slot>
    </div>
</template>
<script>
    import ajax from '../ajax';
    const prefixCls = 'stars-upload';

    export default {
        name: 'stars-upload',
        props: {
            multiple: {
                type: Boolean,
                default: false
            },
            capture: {
                type: String,
                default: ''
            },
            disabled: {
                type: Boolean,
                default () {
                    return false;
                }
            },
            action: {
                type: String,
                required: true
            },
            headers: {
                type: Object,
                default () {
                    return {};
                }
            },
            data: {
                type: Object
            },
            name: {
                type: String,
                default: 'file'
            },
            withCredentials: {
                type: Boolean,
                default: false
            },
            format: {
                type: Array,
                default () {
                    return [];
                }
            },
            accept: {
                type: String
            },
            maxSize: {
                type: Number
            },
            minSize: {
                type: Number
            },
            beforeUpload: {
                type: Function,
                default () {
                    return {};
                }
            },
            onProgress: {
                type: Function,
                default () {
                    return {};
                }
            },
            onSuccess: {
                type: Function,
                default () {
                    return {};
                }
            },
            onError: {
                type: Function,
                default () {
                    return {};
                }
            },
            onExceededSize: {
                type: Function,
                default () {
                    return {};
                }
            },
            onMinSize: {
                type: Function,
                default () {
                    return {};
                }
            },
            onFormatError: {
                type: Function,
                default () {
                    return {};
                }
            }
        },
        data () {
            return {
                prefixCls: prefixCls,
                dragOver: false,
                fileList: [],
                tempIndex: 1
            };
        },
        computed: {
            classes () {
                return [
                    `${prefixCls}`,
                    `${prefixCls}-select`
                ];
            }
        },
        methods: {
            handleClick () {
                this.$refs.input.click();
            },
            handleChange (e) {
                const files = e.target.files;

                if (!files) {
                    return;
                }
                this.$emit('on-start')
                this.uploadFiles(files);
                this.$refs.input.value = null;
            },
            uploadFiles (files) {
                let postFiles = Array.prototype.slice.call(files);
                // postFiles = postFiles.slice(0, 1);

                if (postFiles.length === 0) return;

                // 添加图片压缩
                let _this = this
                postFiles.forEach(file => {
                    if (_this.format.length) {
                        const _file_format = file.name.split('.').pop().toLocaleLowerCase();
                        const checked = _this.format.some(item => item.toLocaleLowerCase() === _file_format);
                        if (!checked) {
                            _this.onFormatError(file, _this.fileList);
                            return false;
                        }
                    }
                    
                    _this.upload(file);
                });
            },
            upload (file) {
                // check maxSize
                if (!this.beforeUpload) {
                    return this.post(file);
                }

                file.uid = Date.now() + this.tempIndex++;
                const before = this.beforeUpload(file);
                if (before && before.then) {
                    before.then(processedFile => {
                        if (Object.prototype.toString.call(processedFile) === '[object File]') {
                            this.post(processedFile);
                        } else if (Object.prototype.toString.call(processedFile) === '[object Object]') {
                            processedFile.name = file.name
                            var aafile = new File([processedFile.file], file.name);
                            aafile.uid = file.uid
                            this.post(aafile);
                        } else {
                            this.post(file);
                        }
                    }).catch(function (err) {
                        this.handleError(err, '图片压缩处理失败', file);
                    });
                } else if (before !== false) {
                    this.post(file);
                } else {
                    // this.$emit('cancel', file);
                }
            },
            post (file) {
                if (this.maxSize) {
                    if (file.size > this.maxSize * 1024) {
                        this.onExceededSize(file, this.fileList);
                        return false;
                    }
                }
                if (this.minSize > 0) {
                    if (file.size < this.maxSize * 1024) {
                        this.onMinSize(file, this.fileList);
                        return false;
                    }
                }
                // check format
                this.handleStart(file);

                ajax({
                    headers: this.headers,
                    withCredentials: this.withCredentials,
                    file: file,
                    data: this.data,
                    filename: this.name,
                    action: this.action,
                    onProgress: e => {
                        this.handleProgress(e, file);
                    },
                    onSuccess: res => {
                        this.handleSuccess(res, file);
                    },
                    onError: (err, response) => {
                        this.handleError(err, response, file);
                    }
                });
            },
            handleProgress (e, file) {
                const _file = this.getFile(file);
                this.onProgress(e, _file, this.fileList);
                _file.percentage = e.percent || 0;
            },
            handleStart (file) {
                if (!file.uid) {
                    file.uid = Date.now() + this.tempIndex++;
                }
                
                const _file = {
                    name: file.name,
                    size: file.size,
                    percentage: 0,
                    uid: file.uid,
                    showProgress: true
                };

                this.fileList.push(_file);
            },
            getFile (file) {
                const fileList = this.fileList;
                let target;
                fileList.every(item => {
                    target = file.uid === item.uid ? item : null;
                    return !target;
                });
                return target;
            },
            handleSuccess (res, file) {
                const _file = this.getFile(file);
                if (_file) {
                    _file.response = res;
                    this.onSuccess(res, _file, this.fileList);
                }
            },
            handleError (err, response, file) {
                const _file = this.getFile(file);
                const fileList = this.fileList;

                fileList.splice(fileList.indexOf(_file), 1);

                this.onError(err, response, file);
            }
        }
    };
</script>
<style scoped>
.stars-upload {
float: left;
}
.stars-upload-select{
    width: 100%;
}
.stars-upload input[type="file"]{
    display: none;
}
</style>