<template>
  <div class="modal-card" style="width: auto">
    <header class="modal-card-head">
      <p class="modal-card-title">Info</p>
    </header>
    <section class="modal-card-body">
      <slot></slot>
      <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Expedita recusandae laborum, culpa deleniti nisi minus magni. Ea in est eaque quidem voluptatem recusandae animi mollitia! At laborum culpa sequi dicta.</p>
    </section>
    <footer class="modal-card-foot">
      <button class="button" type="button" @click="$parent.close()">Close</button>
    </footer>
  </div>
</template>

<script>
export default {};
</script>

<style scoped>
</style>