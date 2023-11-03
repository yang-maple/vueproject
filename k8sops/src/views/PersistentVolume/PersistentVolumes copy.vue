<template>
    <el-table :data="tableData" style="width: 100%">
        <el-table-column label="Date" width="180">
            <template #default="scope">
                <div style="display: flex; align-items: center">
                    <el-icon>
                        <timer />
                    </el-icon>
                    <span style="margin-left: 10px">{{ scope.row.date }}</span>
                </div>
            </template>
        </el-table-column>
        <el-table-column label="Name" width="180">
            <template #default="scope">
                <el-popover effect="light" trigger="hover" placement="top" width="auto">
                    <template #default>
                        <div>name: {{ scope.row.name }}</div>
                        <div>address: {{ scope.row.address }}</div>
                    </template>
                    <template #reference>
                        <el-tag>{{ scope.row.name }}</el-tag>
                    </template>
                </el-popover>
            </template>
        </el-table-column>
        <el-table-column label="Operations">
            <template #default="scope">
                <el-button text @click="dialogFormVisible = true">
                    open a Form nested Dialog
                </el-button>
                <el-button size="small" type="danger" @click="handleDelete(scope.row)">
                    Delete
                </el-button>
            </template>
        </el-table-column>
    </el-table>
    <el-dialog v-model="dialogFormVisible" title="Shipping address">
        <template>
            <div>
                <codemirror v-model="code" :options="options"></codemirror>
            </div>
        </template>
        <template #footer>
            <span class="dialog-footer">
                <el-button @click="dialogFormVisible = false">Cancel</el-button>
                <el-button type="primary" @click="dialogFormVisible = false">
                    Confirm
                </el-button>
            </span>
        </template>
    </el-dialog>
</template>

<script>
import { ElLoading } from 'element-plus';
export default {
    inject: ['reload'],
    data() {
        return {
            dialogFormVisible: false,
            form: {
                name: '',
                region: '',
                date1: '',
                date2: '',
                delivery: false,
                type: [],
                resource: '',
                desc: ''
            },
            formLabelWidth: '140px',
            tableData: [{
                date: '2016-05-02',
                name: '王小虎',
                address: '上海市普陀区金沙江路 1518 弄'
            }, {
                date: '2016-05-04',
                name: '王小虎',
                address: '上海市普陀区金沙江路 1517 弄'
            }, {
                date: '2016-05-01',
                name: '王小虎',
                address: '上海市普陀区金沙江路 1519 弄'
            }, {
                date: '2016-05-03',
                name: '王小虎',
                address: '上海市普陀区金沙江路 1516 弄'
            }],
            jsonData: {
                total: 25,
                limit: 10,
                skip: 0,
            },
            code: '',
            options: {
                tabSize: 2,
                mode: 'yaml',
                theme: 'material',
                lineNumbers: true,
                line: true,
                foldGutter: true,
                gutters: ['CodeMirror-linenumbers', 'CodeMirror-foldgutter'],
                autoCloseBrackets: true,
                matchBrackets: true,
                showCursorWhenSelecting: true,
                autofocus: true,
                extraKeys: {
                    'Ctrl-Space': 'autocomplete',
                    'Ctrl-Q': function (cm) {
                        cm.foldCode(cm.getCursor())
                    },
                    'Ctrl-/': 'toggleComment',
                },
            },
        };
    },
    created() {
        this.test()
    },
    methods: {
        handleDelete(row) {
            console.log(row)
            const loading = ElLoading.service({
                lock: true,
                text: 'Loading',
                background: 'rgba(0, 0, 0, 0.7)',
            })
            setTimeout(() => {
                loading.close()
            }, 2000)
            this.tableData[0].name = "123321"
            this.reload()
        },
        test() {
            console.log("aabbc")
        }
    }
};
</script>

<style>
.el-button--text {
    margin-right: 15px;
}

.el-select {
    width: 300px;
}

.el-input {
    width: 300px;
}

.dialog-footer button:first-child {
    margin-right: 10px;
}
</style>