# RemWaterfall

A responsive waterfall layout component for Vue.js.

## Features

- Responsive waterfall layout
- Support for custom item rendering
- Error handling for images
- Customizable columns and gutters
- Support for rem units

## Installation

```bash
npm install rem-waterfall
# or
yarn add rem-waterfall
```

## Usage

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
          title: 'Item 1',
          width: 800,
          height: 600
        },
        // ... more items
      ]
    }
  }
}
</script>
```

## Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| list | Array | [] | List of items to display |
| column | Number | 4 | Number of columns |
| gutter | Number | 1 | Gap between items in rem |
| itemWidth | Number | 10 | Width of each item in rem |
| imageField | String/Function | 'cover' | Field name or function to get image URL |
| widthField | String/Function | 'width' | Field name or function to get image width |
| heightField | String/Function | 'height' | Field name or function to get image height |
| parentId | String | 'id' | Field name for item unique identifier |

## Events

| Event | Parameters | Description |
|-------|------------|-------------|
| load | (item) | Triggered when an image is loaded |
| error | (item) | Triggered when an image fails to load |

## Slots

| Name | Props | Description |
|------|-------|-------------|
| default | { item, index } | Custom item rendering |
| empty | - | Content to display when list is empty |

## Notes

1. The `width` and `height` fields in the item data should include both the image and content area height
2. The component uses rem units for layout, make sure to set an appropriate `font-size` on the root element
3. For mobile usage, it's recommended to dynamically adjust `column` and `itemWidth` based on screen width

## Example Data Format

```javascript
{
  id: 1,
  cover: 'path/to/image.jpg',
  title: 'Item Title',
  description: 'Item Description',
  width: 800,  // Original image width
  height: 900  // Total height including content area
}
```

## License

MIT
