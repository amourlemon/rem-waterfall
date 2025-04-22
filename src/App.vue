<template>
  <div id="app">
    <div class="header">
      <h1>RemWaterfall Demo</h1>
      <div class="controls">
        <div class="control-item">
          <label>列数：</label>
          <input 
            type="number" 
            :value="column" 
            @input="column = parseInt($event.target.value) || 1" 
            min="1" 
            max="20"
          >
        </div>
        <div class="control-item">
          <label>间距：</label>
          <input 
            type="number" 
            :value="gutter" 
            @input="gutter = parseFloat($event.target.value) || 0" 
            min="0" 
            step="0.1"
          >
        </div>
        <div class="control-item">
          <label>项目宽度：</label>
          <input 
            type="number" 
            :value="itemWidth" 
            @input="itemWidth = parseInt($event.target.value) || 1" 
            min="1" 
            step="1"
          >
        </div>
        <div class="control-item">
          <label>根字体大小：</label>
          <input 
            type="number" 
            :value="rootFontSize" 
            @input="updateRootFontSize($event.target.value)" 
            min="12" 
            max="40"
            step="1"
          >
        </div>
      </div>
    </div>

    <rem-waterfall
      :list="items"
      :column="column"
      :gutter="gutter"
      :item-width="itemWidth"
      @load="onImageLoad"
      @error="onImageError"
    >
      <template #default="{ item }">
        <div class="waterfall-item-content">
          <img :src="item.cover" :alt="item.title">
          <div class="item-info">
            <h3>{{ item.title }}</h3>
            <p>{{ item.description }}</p>
          </div>
        </div>
      </template>
      <template #empty>
        <div class="empty-state">
          <p>暂无数据</p>
        </div>
      </template>
    </rem-waterfall>
  </div>
</template>

<script>
import RemWaterfall from './components/RemWaterfall.vue'

export default {
  name: 'App',
  components: {
    RemWaterfall
  },
  data() {
    return {
      column: 4,
      gutter: 1,
      itemWidth: 10,
      rootFontSize: 16,
      items: Array.from({ length: 100 }, (_, index) => ({
        id: index + 1,
        cover: `https://picsum.photos/800/600?random=${index + 1}`,
        title: `图片${index + 1}`,
        description: `这是第${index + 1}张示例图片`,
        width: 800,
        height: 900 * (Math.random() + 1)
      }))
    }
  },
  methods: {
    onImageLoad(item) {
      console.log('图片加载成功:', item)
    },
    onImageError(item) {
      console.error('图片加载失败:', item)
    },
    updateRootFontSize(value) {
      const size = parseInt(value) || 16;
      this.rootFontSize = size;
      document.documentElement.style.fontSize = `${size}px`;
    }
  }
}
</script>

<style lang="less">
html {
  font-size: 16px;
}

#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
  padding: 20px;
  max-width: 1200px;
  margin: 0 auto;

  .header {
    margin-bottom: 20px;
    text-align: center;

    h1 {
      margin-bottom: 20px;
    }

    .controls {
      display: flex;
      justify-content: center;
      gap: 20px;
      margin-bottom: 20px;

      .control-item {
        display: flex;
        align-items: center;
        gap: 10px;

        label {
          font-weight: bold;
        }

        input {
          width: 60px;
          padding: 5px;
          border: 1px solid #ddd;
          border-radius: 4px;
        }
      }
    }
  }

  .waterfall-item-content {
    background: #fff;
    border-radius: 8px;
    overflow: hidden;
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
    transition: transform 0.3s ease;
    height: 100%;
    display: flex;
    flex-direction: column;

    &:hover {
      transform: translateY(-5px);
    }

    img {
      width: 100%;
      height: auto;
      display: block;
      flex-shrink: 0;
    }

    .item-info {
      padding: 10px;
      flex: 1;
      display: flex;
      flex-direction: column;
      justify-content: space-between;

      h3 {
        margin: 0 0 5px;
        font-size: 16px;
        line-height: 1.2;
      }

      p {
        margin: 0;
        font-size: 14px;
        color: #666;
        line-height: 1.4;
      }
    }
  }

  .empty-state {
    text-align: center;
    padding: 40px;
    color: #999;
  }
}
</style>
