<template>
    <div class="editor">
      <!-- 左侧头像 + 右侧输入 -->
      <div class="input-section">
        <img class="avatar" :src="defaultAvatar" alt="avatar" />
  
        <div class="content-box">
          <el-input
            v-model="content"
            placeholder="说点什么..."
            type="textarea"
            :rows="3"
            @keyup.enter.exact="submit"
          />
  
          <!-- 图片上传 & 预览 -->
          <div class="image-area">
            <div class="image-item" v-if="imageUrl">
              <img :src="imageUrl" />
              <div class="delete-img" @click="removeImage"></div>
            </div>
  
            <label class="image-add" for="imageInput">
              <span>＋</span>
            </label>
            <input
              id="imageInput"
              type="file"
              accept="image/*"
              @change="handleImage"
              style="display: none"
            />
          </div>
  
          <!-- 发送按钮 -->
          <el-button type="primary" @click="submit" class="send-btn">发送</el-button>
        </div>
      </div>
    </div>
  </template>
  
  <script setup>
  import { ref } from 'vue'
  
  const emit = defineEmits(['submit'])
  const content = ref('')
  const imageUrl = ref('')
  const defaultAvatar = 'https://img0.baidu.com/it/u=3830277602,4062044302&fm=253&fmt=auto&app=138&f=JPEG?w=500&h=500'
  
  const handleImage = (e) => {
    const file = e.target.files[0]
    if (file) {
      const reader = new FileReader()
      reader.onload = () => {
        imageUrl.value = reader.result
      }
      reader.readAsDataURL(file)
    }
  }
  
  const removeImage = () => {
    imageUrl.value = ''
  }
  
  const submit = () => {
    if (content.value.trim() || imageUrl.value) { // If there's content or image, submit
      emit('submit', {
        id: Date.now(),
        username: '匿名用户',
        avatar: defaultAvatar,
        content: content.value,
        image: imageUrl.value,
        time: new Date().toLocaleString(),
        liked: false,
        replies: []
      })
      content.value = ''
      imageUrl.value = ''
    }
  }
  </script>
  
  <style scoped>
  .editor {
    display: flex;
    flex-direction: column;
    gap: 10px;
  }
  
  .input-section {
    display: flex;
    align-items: flex-start;
    gap: 10px;
  }
  
  .avatar {
    width: 40px;
    height: 40px;
    border-radius: 50%;
    object-fit: cover;
  }
  
  .content-box {
    flex: 1;
    max-width: 400px;
  }
  
  .image-area {
    display: flex;
    gap: 10px;
    margin-top: 5px;
    flex-wrap: wrap;
  }
  
  .image-item {
    position: relative;
    width: 200px; /* Adjusted to make the image a rectangle */
    height: 120px; /* Adjusted to make the image a rectangle */
    overflow: hidden;
  }
  
  .image-item img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    border: 1px solid #ddd;
  }
  
  .delete-img {
    position: absolute;
    top: -6px;
    right: -6px;
    color: white;
    font-size: 12px;
    width: 16px;
    height: 16px;
    border-radius: 0;
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;
  }
  
  .image-add {
    width: 80px;
    height: 80px;
    border: 1px dashed #bbb;
    display: flex;
    align-items: center;
    justify-content: center;
    color: #999;
    font-size: 24px;
    cursor: pointer;
    border-radius: 4px;
  }
  
  .send-btn {
    margin-top: 8px;
  }
  </style>
  