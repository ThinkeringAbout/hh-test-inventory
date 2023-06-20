<script setup lang="ts"></script>
<template>
  <div class="content_container info">
    <img src="../assets/info.jpg" alt="" />
    <h1>Lorem ipsum</h1>
    <p>
      Lorem ipsum dolor, sit amet consectetur adipisicing elit. Tenetur enim
      quasi repellendus laboriosam ab. Velit laudantium quibusdam minima
      pariatur voluptates cumque quas! Dolores rerum perspiciatis nisi incidunt
      ea in assumenda?
    </p>
  </div>
</template>

<style lang="scss">
.info {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 25px;
  padding: 25px;
  h1 {
    font-size: 24px;
    color: #fff;
  }
  p {
    font-size: 20px;
    color: #fff;
    text-align: center;
    line-height: 3rem;
  }
  img {
    height: 45%;
    width: 100%;
  }
}
</style>
