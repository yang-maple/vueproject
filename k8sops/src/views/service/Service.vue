<template>
    <el-row>
        <el-col :span="24">
            <div class="grid-content bg-purple">
                <el-col :span="24">
                    <el-row>
                        <el-col :span="2">
                            <div class="grid-content3 ep-bg-purple">名称空间</div>
                        </el-col>
                        <el-col :span="4">
                            <div class="grid-content2 ep-bg-purple">
                                <el-select v-model="namespace" filterable placeholder="Select"
                                    @visible-change="getnsselect()" @change="getSevices()" clearable>
                                    <el-option v-for="item in nslist" :key="item.namespace" :label="item.label"
                                        :value="item.namespace" />
                                </el-select>
                            </div>
                        </el-col>
                        <el-col :span="6">
                            <div class="grid-content1 ep-bg-purple">
                                <el-button type="primary" @click="dialogcreatens = true" style="margin-left: 18px;">
                                    创建Sevices 资源
                                </el-button>
                            </div>
                        </el-col>
                        <el-col :span="6">

                        </el-col>
                        <el-col :span="6">
                            <div class="grid-content1 ep-bg-purple">
                                <el-input v-model="filter_name" placeholder="Please input" class="input-with-select"
                                    clearable>
                                    <template #prepend>
                                        <el-button icon="Search" @click="getSevices()" />
                                    </template>
                                </el-input>
                            </div>
                        </el-col>
                    </el-row>
                </el-col>
                <el-table :data="serviceItem" :header-cell-style="{ background: '#e6e7e9' }" size="small">
                    <el-table-column label="Name" prop="name" width="220" align="center">
                        <template #default="scope">
                            <div style="display: flex; align-items: center">
                                <el-icon>
                                    <timer />
                                </el-icon>
                                <span style="margin-left: 10px">{{ scope.row.name }}</span>
                            </div>
                        </template>
                    </el-table-column>
                    <el-table-column label="Namespace" prop="namespace" width="150" align="center" />
                    <el-table-column label="labels" width="300" align="center">
                        <template #default="scope">
                            <el-tag size="small" v-for="(v, k) in scope.row.labels " :key="k">{{ k }}:{{ v
                            }}<br></el-tag>
                        </template>
                    </el-table-column>
                    <el-table-column label="Type" prop="type" width="110" align="center" />
                    <el-table-column label="ClusterIP" prop="cluster_ip" width="110" align="center" />
                    <el-table-column label="ExternalIP" width="110" align="center">
                        <template #default="scope">
                            <div v-for="(v, k) in scope.row.external_ip " :key="k">{{ v }}<br></div>
                        </template>
                    </el-table-column>
                    <el-table-column label="Age" prop="age" width="50" align="center" />
                    <el-table-column label="Operations" min-width="180" align="center">
                        <template #default="scope">
                            <el-dropdown>
                                <el-button type="primary">
                                    Operate<el-icon class="el-icon--right"><arrow-down /></el-icon>
                                </el-button>
                                <template #dropdown>
                                    <el-dropdown-menu>
                                        <el-dropdown-item icon="Edit"
                                            @click="dialogFormVisible = true, handleEdit(scope.row.namespace, scope.row.name)">编辑</el-dropdown-item>
                                        <el-dropdown-item icon="Delete"
                                            @click="messageboxOperate(scope.row, 'delete')">删除</el-dropdown-item>
                                    </el-dropdown-menu>
                                </template>
                            </el-dropdown>
                        </template>
                    </el-table-column>
                </el-table>
                <el-dialog v-model="dialogFormVisible" title="实例详情/json" center>
                    <json-editor-vue :show-btns="false" :mode="'code'" style="height:400px" lang="zh" class="editor"
                        v-model="data" height="400px" />
                    <template #footer>
                        <span class="dialog-footer">
                            <el-button type="primary"
                                @click="dialogFormVisible = false, handleUpdate(this.data.metadata.namespace)">更新</el-button>
                            <el-button @click="dialogFormVisible = false">
                                取消
                            </el-button>
                        </span>
                    </template>
                </el-dialog>
                <el-row>
                    <el-col :span="6">
                        <div class="grid-content ep-bg-purple" />
                    </el-col>
                    <el-col :span="6">
                        <div class="grid-content ep-bg-purple-light" />
                    </el-col>
                    <el-col :span="4">
                        <div class="grid-content ep-bg-purple" />
                    </el-col>
                    <el-col :span="8">
                        <div class="demo-pagination-block">
                            <el-pagination v-model:current-page="page" v-model:page-size="limit" :page-sizes="page_size"
                                :pager-count="5" small background layout="sizes, prev, pager, next" :total="total"
                                @size-change="handleSizeChange" @current-change="handleCurrentChange" />
                        </div>
                    </el-col>
                </el-row>
            </div>

            <el-dialog v-model="dialogcreatens" title="创建资源" center>
                <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm"
                    status-icon>
                    <el-form-item label="名称" prop="name" style="width: 80%;">
                        <el-input v-model="ruleForm.name"></el-input>
                    </el-form-item>
                    <el-form-item label="名称空间" prop="namespace" style="width: 80%;">
                        <el-select v-model="ruleForm.namespace" placeholder="请选择名称空间" @visible-change="getnsselect()">
                            <el-option v-for="item in nslist" :key="item.namespace" :label="item.label"
                                :value="item.namespace" v-show="item.label != 'All'" />
                        </el-select>
                    </el-form-item>
                    <el-form-item label="标签" prop="labels" style="width: 80%;">
                        <el-input v-model="ruleForm.labels"></el-input>
                    </el-form-item>
                    <el-form-item label="类型" prop="type" style="width: 80%;">
                        <el-select v-model="ruleForm.type" placeholder="请选择服务类型">
                            <el-option v-for="item in typelist" :key="item.value" :label="item.label" :value="item.value" />
                        </el-select>
                    </el-form-item>

                    <el-form-item v-for="(service, index) in ruleForm.service_ports" :label="'端口' + (index + 1)"
                        :key="service.key">
                        <el-form-item label="容器名称" prop="port_name" style="width: 70%;">
                            <el-input v-model="service.port_name"></el-input>
                        </el-form-item>
                        <el-form-item label="服务端口" prop="ports" style="width: 70%;">
                            <el-input v-model.number="service.port"></el-input>
                        </el-form-item>
                        <el-form-item label="协议" prop="resource" style="width: 70%;">
                            <el-radio-group v-model="service.protocol">
                                <el-radio label="TCP"></el-radio>
                                <el-radio label="UDP"></el-radio>
                            </el-radio-group>
                        </el-form-item>
                        <el-form-item label="暴露端口" style="width: 70%;">
                            <el-input type="number" v-model.number="service.target_port"></el-input>
                        </el-form-item>
                        <el-form-item label="访问端口" style="width: 70%;"
                            v-show="ruleForm.type == 'NodePort' || ruleForm.type == 'LoadBalancer'">
                            <el-input type="number" v-model.number="service.node_port"></el-input>
                        </el-form-item>
                        <el-form-item style="width: 80%;">
                            <el-tooltip placement="right"><template #content> 删除端口 </template>
                                <el-button @click.prevent="removeService(service)" type="danger" icon="Minus" size="small"
                                    circle />
                            </el-tooltip>
                        </el-form-item>
                    </el-form-item>
                    <el-form-item>
                        <el-tooltip placement="right"><template #content> 新增端口 </template>
                            <el-button @click="addService" type="success" circle icon="Plus" size="small"></el-button>
                        </el-tooltip>
                    </el-form-item>
                    <el-form-item>
                        <el-button type="primary" @click="submitForm('ruleForm')">立即创建</el-button>
                        <el-button @click="resetForm('ruleForm')">立即重置</el-button>
                        <el-button type="danger" @click="dialogcreatens = false">
                            取消
                        </el-button>
                    </el-form-item>
                </el-form>
            </el-dialog>
        </el-col>
    </el-row>
</template>

<script scoped>
import { ElFormItem, ElLoading } from 'element-plus'
import JsonEditorVue from 'json-editor-vue3'
export default {
    inject: ['reload'],
    components: {
        JsonEditorVue,
    },
    data() {
        return {
            data: {
                metadata: {},
            },
            dialogFormVisible: false,
            dialogcreatens: false,
            serviceItem: [],
            filter_name: '',
            namespace: '',
            limit: 10,
            page: 1,
            nslist: [],
            total: 0,
            page_size: [1, 10, 20, 50, 100],
            typelist: [
                {
                    value: 'ClusterIP',
                    label: 'ClusterIP'
                },
                {
                    value: 'NodePort',
                    label: 'NodePort'
                },
                {
                    value: 'LoadBalancer',
                    label: 'LoadBalancer'
                }
            ],
            ruleForm: {
                name: null,
                namespace: null,
                labels: {},
                type: null,
                service_ports: [],
            },
            rules: {
                name: [
                    { required: true, message: '请输入资源名称', trigger: 'change' },
                    { min: 3, max: 10, message: '长度在 3 到 10 个字符', trigger: 'change' }
                ],
                namespace: [
                    { required: true, message: '请选择名称空间', trigger: 'change' }
                ],
                resource: [
                    { message: '请选择一种协议', trigger: 'change' }
                ],
                type: [
                    { required: true, message: '请选择一种服务类型', trigger: 'change' }
                ],
            }
        }
    },
    created() {
        this.getSevices()
    },
    methods: {
        getSevices() {
            this.$ajax({
                method: 'get',
                url: '/svc/list',
                params: {
                    filter_name: this.filter_name,
                    namespace: this.namespace,
                    limit: this.limit,
                    page: this.page,
                }
            }).then((res) => {
                this.total = res.data.total
                this.serviceItem = res.data.item
            }).catch(function (res) {
                console.log(res);
            })
        },
        createService() {
            this.$ajax.post(
                '/svc/create',
                {
                    data: this.ruleForm
                },
            ).then((res) => {
                this.Loading("Creating")
                this.$message({
                    message: res.msg,
                    type: 'success'
                });

            }).catch((res) => {
                this.$message({
                    message: res.msg,
                    type: 'error'
                });
            })
        },
        Loading(msg) {
            const loading = ElLoading.service({
                lock: true,
                text: msg + ".....",
                background: 'rgba(0, 0, 0, 0.7)',
            })
            setTimeout(() => {
                loading.close()
            }, 2000)
            this.reload()
        },
        getnsselect() {
            if (this.nslist == "") {
                this.nslist.push({ 'namespace': '', 'label': "All" })
                this.$ajax({
                    method: 'get',
                    url: '/namespaces/list',
                }).then((res) => {
                    res.data.item.forEach(v => {
                        this.nslist.push({ 'namespace': v.name, 'label': v.name })
                    })
                }).catch((res) => {
                    console.log(res.data)
                })
            }
        },
        handleSizeChange(limit) {
            this.limit = limit
            this.getSevices()
        },
        handleCurrentChange(page) {
            this.page = page
            this.getSevices()
        },
        handleEdit(namespace, name) {
            this.$ajax({
                method: 'get',
                url: '/svc/detail',
                params: {
                    service_name: name,
                    namespace: namespace
                }
            }).then((res) => {
                this.data = res.data
                console.log(res.data);
            }).catch(function (res) {
                console.log(res.data);
            })
        },
        handleDelete(namespace, name) {
            this.$ajax({
                method: 'delete',
                url: '/svc/delete',
                params: {
                    namespace: namespace,
                    service_name: name
                }
            }
            ).then((res) => {
                this.Loading("Deleting")
                this.$message({
                    showClose: true,
                    message: res.msg,
                    type: 'warning'
                });
            }).catch((res) => {
                this.$message({
                    showClose: true,
                    message: res.reason,
                    type: 'error'
                });
            })

        },
        handleUpdate(namespace) {
            this.$ajax.put(
                '/svc/update',
                {
                    namespace: namespace,
                    data: this.data
                },
            ).then((res) => {
                this.Loading("Updateing")
                this.$message({
                    showClose: true,
                    message: res.msg,
                    type: 'success'
                });
                console.log(res)
            }).catch((res) => {
                this.$message({
                    showClose: true,
                    message: res.reason,
                    type: 'error'
                });
            })
        },
        messageboxOperate(row, name) {
            this.$confirm(`是否${name}实例${row.name}`, '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
            }).then(() => {
                this.handleDelete(row.namespace, row.name)
            }).catch(() => {
                this.$message({
                    type: 'info',
                    message: '已取消删除'
                });
            });
        },
        submitForm(formName) {
            this.$refs[formName].validate((valid) => {
                if (valid) {
                    this.dialogcreatens = false
                    console.log(this.ruleForm)
                    this.createService()
                } else {
                    return false;
                }
            });
        },
        resetForm(formName) {
            this.$refs[formName].resetFields();
        },
        addService() {
            this.ruleForm.service_ports.push({
                port_name: null,
                port: null,
                protocol: null,
                target_port: null,
                node_port: null
            })
        },
        removeService(item) {
            console.log(item)
            var index = this.ruleForm.service_ports.indexOf(item)
            if (index !== -1) {
                this.ruleForm.service_ports.splice(index, 1)
            }
        },
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
    padding: 10px;
}

.el-row:last-child {
    margin-bottom: 0;
}

.grid-content1 {

    border-radius: 4px;
}

.grid-content2 {

    border-radius: 4px;
}

.grid-content3 {
    margin-top: 5px;
    margin-left: 20px;
}

.grid-content3 .el-select {
    width: 100px;
}

.el-table,
.el-table__expanded-cell {
    margin-top: 5px;
    background-color: transparent;
}

.el-table th,
.el-table tr {

    background-color: transparent;
}

.el-button--text {
    margin-right: 15px;
}


.dialog-footer button:first-child {
    margin-right: 10px;
}

.el-dialog--center {
    min-height: 400px;
    min-width: 200px;
}

.el-dialog__body {
    min-height: 300px;
}

.demo-pagination-block+.demo-pagination-block {
    float: right;
    margin-right: 10px;
    margin-top: 10px;
}


/* .el-form-item__content .el-input {
    width: 500px;
} */
</style>