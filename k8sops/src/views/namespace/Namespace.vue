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
                    <el-table-column label="Operations" width="">
                        <template #default="scope">
                            <el-button type="primary" icon="Edit" plain
                                @click="dialogFormVisible = true, handleEdit(scope.$index, scope.row)" />
                            <el-button type="danger" icon="Delete" plain @click="handleDelete(scope.$index, scope.row)" />
                        </template>
                    </el-table-column>
                </el-table>
                <el-dialog v-model="dialogFormVisible" title="Shipping address">
                    <el-form :model="form">
                        <el-form-item label="Promotion name" :label-width="formLabelWidth">
                            <el-input v-model="form.name" autocomplete="off" />
                        </el-form-item>
                        <el-form-item label="Zones" :label-width="formLabelWidth">
                            <el-select v-model="form.region" placeholder="Please select a zone">
                                <el-option label="Zone No.1" value="shanghai" />
                                <el-option label="Zone No.2" value="beijing" />
                            </el-select>
                        </el-form-item>
                    </el-form>
                    <template #footer>
                        <span class="dialog-footer">
                            <el-button @click="dialogFormVisible = false">Cancel</el-button>
                            <el-button type="primary" @click="dialogFormVisible = false">
                                Confirm
                            </el-button>
                        </span>
                    </template>
                </el-dialog>
            </div>
        </el-col>
    </el-row>
</template>

<script scoped>
export default {
    data() {
        return {
            namespacesItem: [],
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
                console.log(res.data)
            }).catch(function (res) {
                console.log(res.data);
            })
        },
        handleDelete(index, row) {
            console.log(index, row);
        },
        getNamespaces() {
            this.$ajax({
                method: 'get',
                url: '/namespaces/list',
            }).then((res) => {
                this.namespacesItem = res.data.item
                console.log(this.namespacesItem)
            }).catch(function (res) {
                console.log(res);
            })
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
    width: 300px;
}

.dialog-footer button:first-child {
    margin-right: 10px;
}
</style>