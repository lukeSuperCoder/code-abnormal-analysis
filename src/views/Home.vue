<template>
    <div class="main">
        <el-card class="card">
          <div slot="header">
            <div class="title">缺陷定位</div>
          </div>
          <code-view v-show="isCode" @submitCode="showAbn"></code-view>
          <abnormal-view v-show="!isCode" :data="abnormalData"></abnormal-view>
        </el-card>
    </div>
</template>

<script>
import CodeView from './common/codeView.vue'
import abnormalView from './common/abnormalView.vue'
export default {
  name: "Home",
  components: { CodeView, abnormalView },
  data() {
    return {
      isCode: true,
      abnormalData: ''
    };
  },
  created() {
  },
  mounted() {
  },
  methods: {
    showAbn(data) {
      this.abnormalData = data;
      this.isCode = false;
    }
  },
  beforeDestroy() {
  },
};
</script>
<style lang="scss" scoped>
.main {
  width: 80vw;
  height: 100vh;
  .card {
    width: 100%;
    height: 100%;
    .title {
      font-size: 20px;
      font-weight: 600;
    }
  }
}
</style>
