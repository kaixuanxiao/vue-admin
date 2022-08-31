<template>
  <div class="page-header">
    <span :class="{ 'page-header__title': true, 'has-content': hasContent }">{{ title }}</span>
    <span class="page-header__content">
      <span v-if="content" class="content__text">{{ content }}</span>
      <slot name="content"></slot>
    </span>
    <span class="page-header__append">
      <slot name="append"></slot>
    </span>
  </div>
</template>

<script>
export default {
  name: 'PageHeader',
  props: {
    title: {
      type: String,
      required: true,
    },
    content: String,
  },
  computed: {
    hasContent() {
      return !!this.content || !!this.$slots.content
    },
  },
  mounted() {
    console.log(this.hasContent, this.$slots)
  },
}
</script>

<style lang="scss" scoped>
.page-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 36px;
  margin-bottom: 24px;
  color: #333333;
}
.page-header__title,
.page-header__content,
.page-header__append {
  display: inline-block;
}
.page-header__title {
  position: relative;
  font-size: 20px;
  padding-right: 30px;
  margin-right: 20px;
  &.has-content::after {
    content: ' ';
    position: absolute;
    right: 0;
    top: 50%;
    transform: translateY(-50%);
    display: inline-block;
    width: 1px;
    height: 1em;
    background-color: #979797;
  }
}
.page-header__content {
  flex-grow: 1;
  .content_text {
    margin: 0 10px;
    font-size: 14px;
  }
}
</style>
