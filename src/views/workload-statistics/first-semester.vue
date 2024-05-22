<template>
  <el-form ref="form" :model="form" label-position="top">
    <h2 style="text-align: center">{{ currentYear }}年上学期 (春2月至8月)</h2>
    <div>
      <h3>一、本科授课（学时=课堂讲课学时 + 课内实习学时）</h3>
      <el-row :gutter="20">
        <el-col :span="5">
          <el-form-item label="课程">
            <el-input v-model="form.underCourses[0].courseName" placeholder="请输入课程名称" clearable />
          </el-form-item>
        </el-col>
        <el-col :span="5">
          <el-form-item label="班级">
            <el-input v-model="form.underCourses[0].className" placeholder="请输入班级名称" clearable />
          </el-form-item>
        </el-col>
        <el-col :span="5">
          <el-form-item label="学时数">
            <el-input-number
              v-model="form.underCourses[0].duration"
              :step="4"
              controls-position="right"
              :min="1"
            />
          </el-form-item>
        </el-col>
        <el-col :span="5">
          <el-form-item label="人数">
            <el-input-number
              v-model="form.underCourses[0].stuNumber"
              :step="1"
              controls-position="right"
              :min="1"
            />
          </el-form-item>
        </el-col>
        <el-col :span="2">
          <el-form-item label="小计">
            <strong>{{ (form.underCourses[0].duration*(90+form.underCourses[0].stuNumber)/120).toFixed(1) }}</strong>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row :gutter="20">
        <el-col :span="5">
          <el-input v-model="form.underCourses[1].courseName" placeholder="请输入课程名称" clearable />
        </el-col>
        <el-col :span="5">
          <el-form-item>
            <el-input v-model="form.underCourses[1].className" placeholder="请输入班级名称" clearable />
          </el-form-item>
        </el-col>
        <el-col :span="5">
          <el-input-number
            v-model="form.underCourses[1].duration"
            :step="4"
            controls-position="right"
            :min="1"
          />
        </el-col>
        <el-col :span="5">
          <el-input-number
            v-model="form.underCourses[1].stuNumber"
            :step="1"
            controls-position="right"
            :min="1"
          />
        </el-col>
        <el-col :span="2">
          <el-form-item>
            <strong>{{ (form.underCourses[1].duration*(90+form.underCourses[1].stuNumber)/120).toFixed(1) }}</strong>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row :gutter="20">
        <el-col :span="5">
          <el-form-item>
            <el-input v-model="form.underCourses[2].courseName" placeholder="请输入课程名称" clearable />
          </el-form-item>
        </el-col>
        <el-col :span="5">
          <el-form-item>
            <el-input v-model="form.underCourses[2].className" placeholder="请输入班级名称" clearable />
          </el-form-item>
        </el-col>
        <el-col :span="5">
          <el-input-number
            v-model="form.underCourses[2].duration"
            :step="4"
            controls-position="right"
            :min="1"
          />
        </el-col>
        <el-col :span="5">
          <el-input-number
            v-model="form.underCourses[2].stuNumber"
            :step="1"
            controls-position="right"
            :min="1"
          />
        </el-col>
        <el-col :span="2">
          <el-form-item>
            <strong>{{ (form.underCourses[2].duration*(90+form.underCourses[2].stuNumber)/120).toFixed(1) }}</strong>
          </el-form-item>
        </el-col>
      </el-row>
    </div>

    <el-divider />

    <div>
      <h3>二、课程设计 系数=（软件0.8；硬件0.9）</h3>
      <el-row :gutter="20">
        <el-col :span="5">
          <el-form-item label="课程">
            <el-input v-model="form.designCourses[0].courseName" placeholder="请输入课程名称" clearable />
          </el-form-item>
        </el-col>
        <el-col :span="5">
          <el-form-item label="班级">
            <el-input v-model="form.designCourses[0].className" placeholder="请输入班级名称" clearable />
          </el-form-item>
        </el-col>
        <el-col :span="4">
          <el-form-item label="周数">
            <el-input-number
              v-model="form.designCourses[0].duration"
              :step="1"
              :min="1"
              size="mini"
            />
          </el-form-item>
        </el-col>
        <el-col :span="4">
          <el-form-item label="人数">
            <el-input-number
              v-model="form.designCourses[0].stuNumber"
              :step="1"
              size="mini"
              :min="1"
            />
          </el-form-item>
        </el-col>
        <el-col :span="4">
          <el-form-item label="类型">
            <el-select v-model="form.designCourses[0].type" placeholder="请选择">
              <el-option
                v-for="item in designCourseTypes"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              />
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="2">
          <el-form-item label="小计">
            <strong>{{ (90+form.designCourses[0].stuNumber)/120*form.designCourses[0].duration*24*form.designCourses[0].type }}</strong>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row :gutter="20">
        <el-col :span="5">
          <el-input v-model="form.designCourses[1].courseName" placeholder="请输入课程名称" clearable />
        </el-col>
        <el-col :span="5">
          <el-form-item>
            <el-input v-model="form.designCourses[1].className" placeholder="请输入班级名称" clearable />
          </el-form-item>
        </el-col>
        <el-col :span="4">
          <el-input-number
            v-model="form.designCourses[1].duration"
            :step="4"
            controls-position="right"
            :min="1"
          />
        </el-col>
        <el-col :span="4">
          <el-input-number
            v-model="form.designCourses[1].stuNumber"
            :step="1"
            controls-position="right"
            :min="1"
          />
        </el-col>
      </el-row>
    </div>
    <el-divider />

    <div>
      <h3>三、开新课、对标金课、双语授课、英文授课、给外聘教师助课 系数=（2/3、1/4、1/4、1/2、1/3）</h3>
      <el-row :gutter="20">
        <el-col :span="5">
          <el-form-item label="课程">
            <el-input v-model="form.underCourses[0].courseName" placeholder="请输入课程名" clearable />
          </el-form-item>
        </el-col>
        <el-col :span="5">
          <el-form-item label="班级">
            <el-input v-model="form.underCourses[0].className" placeholder="请输入班级名" clearable />
          </el-form-item>
        </el-col>
        <el-col :span="4">
          <el-form-item label="学时数">
            <el-input-number
              v-model="form.underCourses[0].duration"
              :step="4"
              controls-position="right"
              :min="1"
            />
          </el-form-item>
        </el-col>
        <el-col :span="4">
          <el-form-item label="人数">
            <el-input-number
              v-model="form.underCourses[0].stuNumber"
              :step="1"
              controls-position="right"
              :min="1"
            />
          </el-form-item>
        </el-col>
        <el-col :span="2">
          <el-form-item label="小计">
            <!-- <el-input disabled="true" /> -->
          </el-form-item>
        </el-col>
      </el-row>
    </div>
    <el-divider />
    <h3>四、研究生教学</h3>
    <el-row :gutter="20">
      <el-col :span="5">
        <el-form-item label="课程">
          <el-input />
        </el-form-item>
      </el-col>
      <el-col :span="5">
        <el-form-item label="班级">
          <el-input />
        </el-form-item>
      </el-col>
      <el-col :span="4">
        <el-form-item label="学时">
          <el-input-number size="small" :step="4" controls-position="right" :min="1" />
        </el-form-item>
      </el-col>
      <el-col :span="4">
        <el-form-item label="人数">
          <el-input-number size="small" :step="1" controls-position="right" :min="1" />
        </el-form-item>
      </el-col>
    </el-row>
    <el-row :gutter="20">
      <el-col :span="5">
        <el-input />
      </el-col>
      <el-col :span="5">
        <el-form-item>
          <el-input />
        </el-form-item>
      </el-col>
      <el-col :span="4">
        <el-form-item>
          <el-input-number size="small" :step="4" controls-position="right" :min="1" />
        </el-form-item>
      </el-col>
      <el-col :span="4">
        <el-form-item>
          <el-input-number size="small" :step="1" controls-position="right" :min="1" />
        </el-form-item>
      </el-col>
    </el-row>
    <h3>五、 毕业设计</h3>
  </el-form>
</template>

<script>
export default {
  data() {
    return {
      currentYear: new Date().getFullYear(),
      form: {
        underCourses: [
          { courseName: 'java', className: '', duration: 1, stuNumber: 1 },
          { courseName: 'c++', className: '', duration: 2, stuNumber: 2 },
          { courseName: 'python', className: '', duration: 3, stuNumber: 3 }
        ],
        designCourses: [
          { courseName: 'java', className: '', duration: 1, type: 1, stuNumber: 1 },
          { courseName: 'c++', className: '', duration: 2, type: 2, stuNumber: 2 }
        ]
      },
      designCourseTypes: [{
        value: 0.8,
        label: '软件'
      },
      {
        value: 0.9,
        label: '硬件'
      }
      ]
    }
  },
  methods: {
    submitForm(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          alert('submit!')
        } else {
          console.log('error submit!!')
          return false
        }
      })
    },
    resetForm(formName) {
      this.$refs[formName].resetFields()
    },
    handleChange(value) {
      console.log(value)
    }
  }
}
</script>

<style>
.el-row {
  margin-bottom: 10px;
  padding-left: 2%
}

.el-col {
  border-radius: 4px;
  /* margin-right: 5px; */
}
</style>
