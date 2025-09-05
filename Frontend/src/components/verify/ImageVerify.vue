<script setup lang="ts">


</script>

<template>
    <div class="wrapper">
        <img src="../../../public/unnamed.webp" alt="mailCheckbox"/>
            <div class="bg">
                <div class="check"></div>
            </div>
    </div>
</template>


<style scoped>

.wrapper{
    width: 100px;
    position: relative;
    
}

.wrapper img{
width: 100px;
}


.bg {
  position: absolute;
  bottom: 0px;
  right: 0;
  width: 53px;
  height: 53px;
  border-radius: 50%; /* rond */
  background: #fff; /* bleu clair en fond */
  display: flex;
  align-items: center;
  justify-content: center;
}

.check {
  width: 20px;
  height: 10px;
  border-left: 8px solid #1a73e8; 
  border-bottom: 8px solid #1a73e8;
  transform: rotate(-45deg);
  margin-bottom: 5px;
}
</style>