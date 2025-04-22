# RemWaterfall

一个基于 Vue.js 的响应式瀑布流布局组件。

## 特性

- 响应式瀑布流布局
- 支持自定义项目渲染
- 图片加载失败处理
- 可自定义列数和间距
- 支持 rem 单位布局

## 安装

```bash
npm install rem-waterfall
# 或
yarn add rem-waterfall
```

## 使用示例

```vue
<template>
  <rem-waterfall
    :list="items"
    :column="4"
    :gutter="1"
    :item-width="10"
  >
    <template #default="{ item }">
      <div class="custom-item">
        <img :src="item.cover" />
        <h3>{{ item.title }}</h3>
      </div>
    </template>
  </rem-waterfall>
</template>

<script>
import RemWaterfall from 'rem-waterfall'

export default {
  components: {
    RemWaterfall
  },
  data() {
    return {
      items: [
        {
          id: 1,
          cover: 'path/to/image.jpg',
          title: '项目1',
          width: 800,
          height: 600
        },
        // ... 更多项目
      ]
    }
  }
}
</script>
```

## 属性说明

| 属性 | 类型 | 默认值 | 说明 |
|------|------|---------|-------------|
| list | Array | [] | 要显示的项目列表 |
| column | Number | 4 | 列数 |
| gutter | Number | 1 | 项目之间的间距（rem单位） |
| itemWidth | Number | 10 | 每个项目的宽度（rem单位） |
| imageField | String/Function | 'cover' | 获取图片URL的字段名或函数 |
| widthField | String/Function | 'width' | 获取图片宽度的字段名或函数 |
| heightField | String/Function | 'height' | 获取图片高度的字段名或函数 |
| parentId | String | 'id' | 项目唯一标识符的字段名 |

## 事件

| 事件名 | 参数 | 说明 |
|-------|------------|-------------|
| load | (item) | 图片加载完成时触发 |
| error | (item) | 图片加载失败时触发 |

## 插槽

| 名称 | 参数 | 说明 |
|------|-------|-------------|
| default | { item, index } | 自定义项目渲染 |
| empty | - | 列表为空时显示的内容 |

## 注意事项

1. 项目数据中的 `width` 和 `height` 字段应该包含图片和内容区域的总高度
2. 组件使用 rem 单位进行布局，请确保在根元素上设置了合适的 `font-size`
3. 建议在移动端使用时，根据屏幕宽度动态调整 `column` 和 `itemWidth` 的值

## 示例数据格式

```javascript
{
  id: 1,
  cover: 'path/to/image.jpg',
  title: '项目标题',
  description: '项目描述',
  width: 800,  // 图片原始宽度
  height: 900  // 图片原始高度（包含内容区域）
}
```

## 许可证

MIT 