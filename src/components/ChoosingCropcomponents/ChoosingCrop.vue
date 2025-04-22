<template>
  <div id="app">
    <!-- 顶部快捷栏 -->
    <div class="top-bar">
      <a href="#">登录</a>
      <a href="#">注册</a>
      <a href="#">收藏</a>
      <a href="#">购物车</a>
    </div>

    <!-- 中部导航栏 -->
    <div class="nav-bar">
      <div class="logo">🌱 小农铺</div>
      <div class="nav-menu">
        <a href="#">首页</a>
        <a href="#">新品</a>
        <a href="#">热卖</a>
        <a href="#">活动</a>
        <a href="#">联系我们</a>
      </div>
      <el-input placeholder="搜索农产品..." style="width: 300px;"></el-input>
    </div>

    <!-- 主体区域 -->
    <div class="main-container">
      <!-- 左侧菜单 -->
      <div class="left-menu">
        <el-menu :default-active="activeIndex" @select="handleMenuSelect">
          <el-menu-item index="0"><i class="el-icon-s-opportunity"></i><span slot="title">蔬菜</span></el-menu-item>
          <el-menu-item index="1"><i class="el-icon-s-goods"></i><span slot="title">水果</span></el-menu-item>
          <el-menu-item index="2"><i class="el-icon-s-cooperation"></i><span slot="title">中药材</span></el-menu-item>
          <el-menu-item index="3"><i class="el-icon-s-claim"></i><span slot="title">粮油</span></el-menu-item>
        </el-menu>
      </div>

      <!-- 中部内容区 -->
      <div class="content-area">
       <div class="left-content">
         <!-- 轮播图 -->
         <div v-if="activePanel === 'carousel'" class="carousel-container">
          <el-carousel height="300px" interval="3000" arrow="hover">
            <el-carousel-item v-for="(item, index) in carouselImages" :key="index">
              <img :src="item" alt="轮播图" />
            </el-carousel-item>
          </el-carousel>
        </div>

        <!-- 类目展开区 -->
        <div v-if="activePanel === 'category'" class="category-panel">
          <div class="category-title">{{ categoryTitle }} 分类</div>
          <div v-for="group in categoryData" class="category-item">
            <strong>{{ group.title }}：</strong>
            <span v-for="item in group.items" style="margin-right: 10px;">{{ item }}</span>
          </div>
        </div>

       </div>

        <!-- 右侧1/3区域 -->
        <div class="right-content">
          <!-- 新闻搜索框 -->
          <!-- <div class="news-search">
            <el-input placeholder="搜索新闻..." style="width: 400px;"></el-input>
          </div> -->

          <!-- 新闻轮播 -->
          <div class="news-carousel">
            <h4>最新资讯</h4>
            <el-carousel height="200px" direction="vertical" :autoplay="true" indicator-position="none">
              <el-carousel-item v-for="(item, i) in newsList" :key="i">
                <div class="news-item">{{ item }}</div>
              </el-carousel-item>
            </el-carousel>
          </div>
        </div>


      </div>
    </div>

    <!-- 新鲜好物区 -->
    <h3 style="padding-left: 30px;">新鲜好物</h3>
    <div class="product-list">
      <div class="product-card" v-for="(item, i) in goodThings" :key="i">
        <img :src="item.img" />
        <h4>{{ item.title }}</h4>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'HomePage',
  data() {
    return {
      activePanel: 'carousel',
      activeIndex: '0',
      categoryTitle: '',
      categoryMap: {
        0: { title: '蔬菜', data: [{ title: '叶菜类', items: ['白菜', '菠菜', '油菜'] }, { title: '根茎类', items: ['土豆', '胡萝卜'] }] },
        1: { title: '水果', data: [{ title: '热带水果', items: ['芒果', '香蕉'] }, { title: '本地水果', items: ['苹果', '梨'] }] },
        2: { title: '中药材', data: [{ title: '常见药材', items: ['人参', '当归', '枸杞'] }] },
        3: { title: '粮油', data: [{ title: '食用油', items: ['花生油', '菜籽油'] }, { title: '谷类', items: ['小米', '大米'] }] }
      },
      categoryData: [],
      carouselImages: [
        'https://img2.baidu.com/it/u=4234205294,2081726764&fm=253&fmt=auto&app=138&f=JPEG?w=800&h=400',
        'https://img2.baidu.com/it/u=3623028890,2444601035&fm=253&fmt=auto&app=138&f=JPEG?w=800&h=400',
        'https://img1.baidu.com/it/u=2666232990,3891015706&fm=253&fmt=auto&app=138&f=JPEG?w=800&h=400'
      ],
      goodThings: [
        { title: '新鲜白菜', img: 'https://img2.baidu.com/it/u=3842320186,1437451322&fm=253&fmt=auto&app=120&f=JPEG?w=400&h=400' },
        { title: '香甜苹果', img: 'https://img2.baidu.com/it/u=3030648998,4111670935&fm=253&fmt=auto&app=138&f=JPEG?w=400&h=400' },
        { title: '农家鸡蛋', img: 'https://img2.baidu.com/it/u=3358465413,3892561393&fm=253&fmt=auto&app=138&f=JPEG?w=400&h=400' }
      ]
    };
  },
  methods: {
    handleMenuSelect(index) {
      const category = this.categoryMap[index];
      this.activeIndex = index;
      this.categoryTitle = category.title;
      this.categoryData = category.data;
      this.activePanel = 'category';
    }
  }
}
</script>

<style>
body {
  margin: 0;
  font-family: "Helvetica Neue", Arial, sans-serif;
}

.top-bar {
  background: #333;
  color: white;
  padding: 10px 30px;
  display: flex;
  justify-content: flex-end;
}

.top-bar a {
  color: white;
  margin-left: 20px;
  text-decoration: none;
}

.nav-bar {
  display: flex;
  align-items: center;
  padding: 15px 30px;
  border-bottom: 1px solid #eee;
}

.logo {
  font-size: 24px;
  font-weight: bold;
  margin-right: 40px;
}

.nav-menu {
  flex: 1;
}

.nav-menu a {
  margin: 0 15px;
  color: #333;
  text-decoration: none;
}

.main-container {
  display: flex;
  padding: 20px;
}

.left-menu {
  width: 200px;
  transition: width 0.3s;
}

.content-area {
  flex: 1;
  padding-left: 20px;
  display: flex;
  flex-wrap: wrap;
  gap: 20px;
  overflow: hidden;
  width: 100%;
}

.category-panel {
  padding: 10px;
  background: #f9f9f9;
  width: 730px;
}

.category-title {
  font-size: 18px;
  font-weight: bold;
  margin-bottom: 10px;
}

.category-item {
  margin-bottom: 15px;
}

.category-item strong {
  display: inline-block;
  width: 80px;
}

.product-list {
  display: flex;
  gap: 20px;
  flex-wrap: wrap;
  padding: 0 20px 30px;
}

.product-card {
  width: 200px;
  border: 1px solid #eee;
  padding: 10px;
  border-radius: 4px;
  background: white;
}

.product-card img {
  width: 100%;
  height: 120px;
  object-fit: cover;
}

.product-card h4 {
  margin: 10px 0 0;
  font-size: 16px;
}

.carousel-container {
  height: 300px;
  width: 750px;
  overflow: hidden;
  border-radius: 4px;
}

.el-carousel__item img {
  width: 100%;
  height: 300px;
  object-fit: cover;
}



.left-content {
  flex: 2;
  min-width: 60%;
}
.right-content {
  flex: 1;
  min-width: 300px;
  display: flex;
  flex-direction: column;
  gap: 2vw;
  overflow: hidden;
}
.horizontal-nav {
  margin-bottom: 20px;
}
/* .news-search {
  margin-bottom: 0;
  width: 100%;
  transform: translateZ(0);
} */
.news-carousel {
  background: #f9f9f9;
  padding: 15px;
  border-radius: 4px;
  width: 100%;
  height: 250px;
  transform: translateZ(0);
  overflow: hidden;
  will-change: transform;
}
.news-carousel h4 {
  margin: 0 0 10px 0;
  color: #333;
  font-size: 16px;
  width: 100%;
}
.news-item {
  height: 200px;
  display: flex;
  align-items: center;
  justify-content: center;
}

@media (max-width: 1200px) {
  .content-area {
    flex-direction: column;
  }
  .left-content,
  .right-content {
    width: 100%;
    flex: none;
  }
  .news-search,
  .news-carousel {
    margin-left: 0;
  }
}

@media (max-width: 768px) {
  .right-content {
    padding: 0 3vw;
  }
  .news-carousel {
    height: auto;
    min-height: 200px;
  }
  .carousel-container,
  .category-panel {
    width: 100%;
  }
}

</style>