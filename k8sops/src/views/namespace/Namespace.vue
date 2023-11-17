<template>
    <el-row>
        <el-col :span="24">
            <div class="grid-content bg-purple">
                <el-table :data="namespacesItem" :header-cell-style="{ background: '#e6e7e9' }">
                    <el-table-column label="Name" width="200">
                        <template #default="scope">
                            <div style="display: flex; align-items: center">
                                <el-icon>
                                    <timer />
                                </el-icon>
                                <span style="margin-left: 10px">{{ scope.row.name }}</span>
                            </div>
                        </template>
                    </el-table-column>
                    <el-table-column label="Lables" width="360" align="center">
                        <template #default="scope">
                            <el-tag size="small" v-for="(v, k) in scope.row.labels " :key="k">{{ k }}:{{ v
                            }}<br></el-tag>
                        </template>
                    </el-table-column>
                    <el-table-column label="Status" prop="status" width="180" />
                    <el-table-column label="Age" prop="age" width="180" />
                    <el-table-column label="Operations" width="320">
                        <template #default="scope">
                            <el-button type="primary" icon="Edit" plain
                                @click="dialogFormVisible = true, handleEdit(scope.$index, scope.row)" />
                            <el-popconfirm width="230" confirm-button-text="OK" cancel-button-text="No, Thanks"
                                icon="InfoFilled" icon-color="#626AEF" title="Are you sure to delete this?"
                                @confirm="handleDelete(scope.row)"><template #reference>
                                    <el-button type="danger" icon="Delete" plain />
                                </template>
                            </el-popconfirm>
                        </template>
                    </el-table-column>
                </el-table>
                <el-dialog v-model="dialogFormVisible" title="实例详情/json" center>
                    <json-editor-vue v-loading="bookingLoad" :show-btns="false" :mode="'code'" style="height:400px"
                        lang="zh" class="editor" v-model="data" height="400px" />
                    <template #footer>
                        <span class="dialog-footer">
                            <el-button type="primary" @click="dialogFormVisible = false, updateNamespace()">更新</el-button>
                            <el-button @click="dialogFormVisible = false">
                                取消
                            </el-button>
                        </span>
                    </template>
                </el-dialog>
            </div>
            <el-button type="primary" @click="dialogcreatens = true">
                创建名称空间
            </el-button>
            <el-dialog v-model="dialogcreatens" title="创建名称空间" center>
                <el-form :model="form">
                    <el-form-item label="名称" :label-width="formLabelWidth">
                        <el-input v-model="form.newnamespaces" autocomplete="off" />
                    </el-form-item>
                </el-form>
                <template #footer>
                    <span class="dialog-footer">
                        <el-button type="primary" @click="dialogcreatens = false, createNamespace()">确认创建</el-button>
                        <el-button type="danger" @click="dialogcreatens = false">
                            取消
                        </el-button>
                    </span>
                </template>
            </el-dialog>
        </el-col>
    </el-row>
</template>

<script scoped>
import { ElLoading } from 'element-plus'
import JsonEditorVue from 'json-editor-vue3'
export default {
    inject: ['reload'],
    components: {
        JsonEditorVue
    },
    data() {
        return {
            data: {},
            namespacesItem: [],
            dialogFormVisible: false,
            dialogcreatens: false,
            form: {
                name: '',
                region: '',
                date1: '',
                date2: '',
                delivery: false,
                type: [],
                resource: '',
                desc: '',
                newnamespaces: '',
            },
            formLabelWidth: '140px'
        }
    },
    created() {
        this.getNamespaces()
    },
    methods: {
        handleEdit(index, row) {
            console.log(index, row);
            this.$ajax({
                method: 'get',
                url: '/namespaces/detail',
                params: {
                    namespace_name: row.name
                }
            }).then((res) => {
                this.data = res.data
                console.log(res.data);
            }).catch(function (res) {
                console.log(res.data);
            })
        },
        handleDelete(row) {
            this.$ajax({
                method: 'delete',
                url: '/namespaces/delete',
                params: {
                    namespace_name: row.name
                }
            }
            ).then((res) => {
                this.Loading("Deleting")
                this.$message({
                    showClose: true,
                    message: res.msg,
                    type: 'warning'
                });
            }).catch(function (res) {
                console.log(res);
            })
            this.reload()

        },
        getNamespaces() {
            this.$ajax({
                method: 'get',
                url: '/namespaces/list',
            }).then((res) => {
                this.namespacesItem = res.data.item
            }).catch(function (res) {
                console.log(res);
            })
        },
        createNamespace() {
            this.$ajax.post(
                '/namespaces/create',
                {
                    namespace_name: this.form.newnamespaces
                },
            ).then((res) => {
                this.Loading("Creating")
                this.$message({
                    message: res.msg,
                    type: 'success'
                });
                console.log(res)
            }).catch(function (res) {
                console.log(res);
            })
            this.reload()
        },
        updateNamespace() {
            this.Loading("Updateing")
            this.$ajax.put(
                '/namespaces/update',
                {
                    data: this.data
                },
            ).then((res) => {
                this.$message({
                    showClose: true,
                    message: res.msg,
                    type: 'success'
                });
                console.log(res)
            }).catch((res) => {
                this.$message({
                    showClose: true,
                    message: res.msg + res.reason,
                    type: 'error'
                });
                console.log(res);
            })
            this.reload()
        },
        Loading(msg) {
            const loading = ElLoading.service({
                lock: true,
                text: msg,
                background: 'rgba(0, 0, 0, 0.7)',
            })
            setTimeout(() => {
                loading.close()
            }, 2000)
        }
    }
}
</script>

<style>
.el-row {
    margin-bottom: 10px;

    &:last-child {
        margin-bottom: 0;
    }
}

.el-col {
    border-radius: 4px;
}

.bg-purple {
    background: #f0f2f5;
    box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1)
}

.grid-content {
    border-radius: 4px;
    min-height: 10px;
}

.el-table,
.el-table__expanded-cell {
    padding: 10px;
    background-color: transparent;
}

.el-table th,
.el-table tr {
    background-color: transparent;
}

.el-button--text {
    margin-right: 15px;
}

.el-select {
    width: 300px;
}

.el-input {
    width: 400px;
}

.dialog-footer button:first-child {
    margin-right: 10px;
}

.el-dialog--center .el-dialog__body {
    min-height: 400px;
}
</style>