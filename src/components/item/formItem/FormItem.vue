<template>
  <el-tabs
      v-if="componentData.dataType === 'Tabs'"
      v-bind="componentData.attr || {}"
      v-model="activeIndex"
  >
      <AttrContainer :attrData="componentData.children" />
  </el-tabs>
  <el-tab-pane
      v-else-if="componentData.dataType === 'TabPane'"
      :label="componentData.name"
      :name="index"
      :key="index"
  >
    <AttrContainer :attrData="componentData.children" />
  </el-tab-pane>
  <el-collapse
      v-else-if="componentData.dataType === 'Collapse'"
      v-model="activeIndex"
  >
    <AttrContainer :attrData="componentData.children" />
  </el-collapse>
  <el-collapse-item
      v-else-if="componentData.dataType === 'CollapsePane'"
      :title="componentData.name"
      :name="index"
  >
    <AttrContainer :attrData="componentData.children" />
  </el-collapse-item>
  <el-radio
      v-else-if="componentData.dataType === 'RadioItem'"
      :label="componentData.value"
      size="large"
  >
    {{ componentData.name }}
  </el-radio>
  <el-radio-button
      v-else-if="componentData.dataType === 'RadioButtonItem'"
      :label="componentData.value"
      size="small"
  >
    {{ componentData.name }}
  </el-radio-button>
  <div class="formItem" v-else-if="componentData.dataType === 'Slider'">
    <span class="formTitle" v-show="componentData.name">{{ componentData.name }}</span>
    <div class="formContent">
      <el-slider v-model="formValue" v-bind="componentData.attr" />
    </div>
    <span class="ml-2 w-12 text-center text-sm leading-8">{{ formValue }}{{ componentData.label }}</span>
  </div>
  <div class="formItem" v-else-if="componentData.dataType === 'String'">
    <span class="formTitle" v-show="componentData.name">{{ componentData.name }}</span>
    <div class="formContent">
      <el-input v-model="formValue" v-bind="componentData.attr" />
    </div>
  </div>
  <div class="formItem" v-else-if="componentData.dataType === 'Number'">
    <span class="formTitle" v-show="componentData.name">{{ componentData.name }}</span>
    <div class="formContent">
      <el-input-number v-model="formValue" v-bind="componentData.attr" />
    </div>
  </div>
  <div class="formItem" v-else-if="componentData.dataType === 'Radio'">
    <span class="formTitle" v-show="componentData.name">{{ componentData.name }}</span>
    <div class="formContent">
      <el-radio-group v-model="formValue" v-bind="componentData.attr">
        <AttrContainer :attrData="componentData.children" />
      </el-radio-group>
    </div>
  </div>
  <div class="formItem" v-else-if="componentData.dataType === 'RadioButton'">
    <span class="formTitle" v-show="componentData.name">{{ componentData.name }}</span>
    <div class="formContent">
      <el-radio-group v-model="formValue" v-bind="componentData.attr">
        <AttrContainer :attrData="componentData.children" />
      </el-radio-group>
    </div>
  </div>
  <div class="formItem" v-else-if="componentData.dataType === 'Boolean'">
    <span class="formTitle" v-show="componentData.name">{{ componentData.name }}</span>
    <div class="formContent">
      <el-switch v-model="formValue" v-bind="componentData.attr" />
    </div>
  </div>
  <div class="formItem" v-else-if="componentData.dataType === 'TextArea'">
    <span class="formTitle" v-show="componentData.name">{{ componentData.name }}</span>
    <div class="formContent">
      <el-input
          v-model="formValue"
          v-bind="componentData.attr"
          type="textarea"
      />
    </div>
  </div>
  <div class="formItem" v-else-if="componentData.dataType === 'Color'">
    <span class="formTitle" v-show="componentData.name">{{ componentData.name }}</span>
    <div class="formContent">
      <ColorPicker v-model="formValue" v-bind="componentData.attr" />
    </div>
  </div>
  <div class="formItem" v-else-if="componentData.dataType === 'Flex'">
    <span class="formTitle" v-show="componentData.name">{{ componentData.name }}</span>
    <div class="formContentFlex">
        <AttrContainer :attrData="componentData.children" :style="{ width: `${96 / componentData.attr.col}%` }" />
    </div>
  </div>
</template>

<script setup lang="ts">
  import ColorPicker from '@/components/item/formItem/color/ColorPicker.vue';
  import AttrContainer from '@/components/item/formItem/AttrContainer.vue';
  import { ref, computed } from 'vue';
  import { useTrackAttrState } from '@/stores/trackAttribute';
  import { useTrackState } from '@/stores/trackState';
  const props = defineProps({
    componentData: {
      type: Object,
      default() {
        return {};
      }
    },
    index: {
      type: Number,
      default: 0
    }
  });
  const trackStore = useTrackState();
  const attrStore = useTrackAttrState();
  const activeIndex = ref(props.componentData.defaultValue); // 内部状态
  const selectTrack = ref(trackStore.selectResource);
  const formValue = computed({
    get() {
      if (selectTrack.value && attrStore.trackAttrMap[selectTrack.value.id]) {
        const attrData = attrStore.trackAttrMap[selectTrack.value.id][props.componentData.mappingKey];
        if (attrData === undefined && props.componentData.defaultValue !== undefined) {
          attrStore.setTrackAttr(selectTrack.value.id, {
            [props.componentData.mappingKey]: props.componentData.defaultValue
          });
          return props.componentData.defaultValue;
        }
        return attrData;
      } else {
        return null;
      }
    },
    set(value) {
      if (selectTrack.value && props.componentData.mappingKey) {
        attrStore.setTrackAttr(selectTrack.value.id, {
          [props.componentData.mappingKey]: value
        });
      }
    }
  });
</script>

<style scoped>
  .formItem {
    @apply w-full leading-8 flex flex-row grow-0 shrink-0 mb-2 justify-start items-start;
  }
  .formTitle{
    @apply w-20 text-sm block leading-8 pl-2 pr-3 text-left dark:text-gray-200 text-gray-600 shrink-0;
  }
  .formContent{
    @apply min-h-8 leading-8 flex-1 flex flex-row items-center;
  }
  .formContentFlex{
    @apply flex flex-row flex-wrap flex-1 overflow-x-hidden shrink-0 justify-between
  }
  .formContentFlex .formTitle{
    @apply w-auto pl-0 pr-2;
  }
  .formContentFlex .formItem{
    @apply mb-0;
  }
</style>