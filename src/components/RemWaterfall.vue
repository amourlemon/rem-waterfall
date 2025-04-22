<template>
  <div class="rem-waterfall" ref="container">
    <div v-if="list.length === 0" class="no-data">
      <slot name="empty">
        暂无数据
      </slot>
    </div>
    <div v-else class="waterfall-list">
      <div
        v-for="(item, index) in waterfallList"
        :key="item.id"
        class="waterfall-item"
        :style="{
          top: item.top + 'rem',
          left: item.left + 'rem',
          width: item.width + 'rem',
          height: item.height + 'rem'
        }"
      >
        <slot :item="item" :index="index">
          <img 
            :src="getImageUrl(item)" 
            :style="{ width: '100%', height: '100%', objectFit: 'cover' }"
            @load="onImageLoad"
            @error="onImageError"
          />
        </slot>
      </div>
    </div>
  </div>
</template>

<script>
import { debounce } from 'lodash';

export default {
  name: 'RemWaterfall',
  props: {
    list: {
      type: Array,
      default: () => []
    },
    column: {
      type: Number,
      default: 4
    },
    gutter: {
      type: Number,
      default: 1
    },
    itemWidth: {
      type: Number,
      default: 10
    },
    imageField: {
      type: [String, Function],
      default: 'cover'
    },
    widthField: {
      type: [String, Function],
      default: 'width'
    },
    heightField: {
      type: [String, Function],
      default: 'height'
    },
    parentId: {
        type: String,
        default: 'id'
    }
  },
  data() {
    return {
      waterfallList: [],
      colHeights: [],
      errorImages: new Set()
    };
  },
  watch: {
    list: {
      handler: 'updateLayout',
      immediate: true
    },
    column: {
      handler: 'updateLayout',
      immediate: true
    },
    gutter: {
      handler: 'updateLayout',
      immediate: true
    },
    itemWidth: {
      handler: 'updateLayout',
      immediate: true
    }
  },
  mounted() {
    this.init();
    window.addEventListener('resize', this.handleResize);
  },
  beforeDestroy() {
    window.removeEventListener('resize', this.handleResize);
  },
  methods: {
    init() {
      this.updateLayout();
    },
    getImageUrl(item) {
      if (typeof this.imageField === 'function') {
        return this.imageField(item);
      }
      return item[this.imageField];
    },
    getWidth(item) {
      if (typeof this.widthField === 'function') {
        return this.widthField(item);
      }
      return item[this.widthField];
    },
    getHeight(item) {
      if (typeof this.heightField === 'function') {
        return this.heightField(item);
      }
      return item[this.heightField];
    },
    updateLayout() {
      if (!this.list.length) return;
      this.colHeights = new Array(this.column).fill(0);
      this.waterfallList = this.list.map(item => {
        const minHeight = Math.min(...this.colHeights);
        const minIndex = this.colHeights.indexOf(minHeight);
        
        const itemWidth = this.itemWidth;
        const originalWidth = this.getWidth(item);
        const originalHeight = this.getHeight(item);
        
        const itemHeight = originalHeight 
          ? (originalHeight / originalWidth) * itemWidth 
          : itemWidth;
        
        const left = minIndex * (itemWidth + this.gutter);
        const top = minHeight;
        
        this.colHeights[minIndex] += itemHeight + this.gutter;
        
        const existingItem = this.waterfallList.find(existing => existing.id === item.id);
        const imageLoading = existingItem ? existingItem.imageLoading : true;
        
        return {
          ...item,
          imageLoading,
          width: itemWidth,
          height: itemHeight,
          left,
          top
        };
      });
    },
    handleResize: debounce(function() {
      this.updateLayout();
    }, 100),
    onImageLoad(e) {
      const img = e.target;
      const item = this.waterfallList.find(item => this.getImageUrl(item) === img.src);
      if (item) {
        const height = (img.naturalHeight / img.naturalWidth) * item.width;
        item.height = height;
        this.updateLayout();
      }
    },
    onImageError(e) {
      const img = e.target;
      this.errorImages.add(img.src);
      img.src = 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiB2aWV3Qm94PSIwIDAgMTAwIDEwMCIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cmVjdCB3aWR0aD0iMTAwIiBoZWlnaHQ9IjEwMCIgZmlsbD0iI2YwZjBmMCIvPjx0ZXh0IHg9IjUwIiB5PSI1MCIgZm9udC1mYW1pbHk9IkFyaWFsIiBmb250LXNpemU9IjE0IiBmaWxsPSIjOTk5IiB0ZXh0LWFuY2hvcj0ibWlkZGxlIiBkeT0iLjNlbSI+SW1hZ2UgTG9hZCBGYWlsZWQ8L3RleHQ+PC9zdmc+';
    }
  }
};
</script>

<style lang="less" scoped>
.rem-waterfall {
  position: relative;
  width: 100%;

  .skeleton-item {
    width: 100%;
    height: 100%;
    background: #f0f0f0;
    border-radius: 4px;
    overflow: hidden;
  
    .skeleton-image {
      width: 100%;
      height: 100%;
      background: linear-gradient(90deg, #f0f0f0 25%, #e0e0e0 37%, #f0f0f0 63%);
      background-size: 400% 100%;
      animation: skeleton-loading 1.4s ease infinite;
    }
  }

@keyframes skeleton-loading {
  0% {
    background-position: 100% 0;
  }
  100% {
    background-position: 0 0;
  }
}
  
  .waterfall-list {
    position: relative;
    width: 100%;
    // margin: 0 -0.5rem;
  }
  
  .waterfall-item {
    position: absolute;
    transition: all 0.3s ease;
    // margin: 0.5rem;
  }
  
  .no-data {
    text-align: center;
    padding: 2rem;
    color: #999;
  }
}
</style> 
